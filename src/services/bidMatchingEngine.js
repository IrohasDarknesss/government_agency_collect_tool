// 官公需・入札公告 機械的適合度スコアリング＆Go/No-Go判定エンジン

const BID_PROFILE_STORAGE_KEY = 'govinfo_bid_profile_v1';
const BID_BOOKMARKS_STORAGE_KEY = 'govinfo_bid_bookmarks_v1';

// Default Company Profile (カスタマイズ可能)
export const DEFAULT_COMPANY_PROFILE = {
  companyName: '自社（IT・DXソリューション事業部）',
  qualifiedGrade: 'C', // 保有資格: 役務の提供等のC等級
  targetRegion: 'kanto', // 主力地域: 関東・甲信越
  targetKeywords: ['AI', '生成AI', 'Web', 'クラウド', 'システム開発', 'DX', 'ダッシュボード', 'アクセシビリティ', 'データ分析', 'IoT'],
  excludedKeywords: ['清掃', '警備', '工事', '印刷', '解体', '廃棄物', '給食'],
  minLeadDays: 10, // 最低限必要な準備日数
  autoFilterThreshold: 80 // 高適合判定しきい値 (%)
};

// Get / Save Profile
export function getCompanyProfile() {
  try {
    const stored = localStorage.getItem(BID_PROFILE_STORAGE_KEY);
    return stored ? { ...DEFAULT_COMPANY_PROFILE, ...JSON.parse(stored) } : DEFAULT_COMPANY_PROFILE;
  } catch (e) {
    return DEFAULT_COMPANY_PROFILE;
  }
}

export function saveCompanyProfile(profile) {
  localStorage.setItem(BID_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  return profile;
}

// Grade rank map (A > B > C > D)
const GRADE_RANKS = { 'A': 4, 'B': 3, 'C': 2, 'D': 1 };

// Calculate Match Score (0 - 100%) for a procurement article
export function calculateBidMatchScore(article, profile = getCompanyProfile()) {
  let score = 0;
  const matchReasons = [];
  const riskFactors = [];

  const textToScan = `${article.title} ${article.summary} ${(article.keyRequirements || []).join(' ')} ${(article.tags || []).join(' ')}`.toLowerCase();

  // 1. Exclusion keywords check (Critical Penalty)
  const foundExcluded = (profile.excludedKeywords || []).filter(kw => 
    kw.trim() && textToScan.includes(kw.trim().toLowerCase())
  );
  if (foundExcluded.length > 0) {
    riskFactors.push(`除外キーワード合致（${foundExcluded.join(', ')}）`);
    return {
      score: 10,
      gradeMatch: false,
      isExcluded: true,
      decision: 'No-Go',
      decisionLabel: '見送り推奨（除外条件）',
      decisionColor: 'bg-rose-100 text-rose-800 border-rose-200',
      matchReasons,
      riskFactors
    };
  }

  // 2. Target keywords check (Max 45 pts)
  const matchedKeywords = (profile.targetKeywords || []).filter(kw => 
    kw.trim() && textToScan.includes(kw.trim().toLowerCase())
  );
  const keywordPoints = Math.min(matchedKeywords.length * 15, 45);
  score += keywordPoints;
  if (matchedKeywords.length > 0) {
    matchReasons.push(`自社ターゲット領域に合致（${matchedKeywords.slice(0, 3).join(', ')}${matchedKeywords.length > 3 ? '等' : ''}）`);
  }

  // 3. Qualification Grade Match (Max 30 pts)
  const myRank = GRADE_RANKS[profile.qualifiedGrade] || 2; // default C
  const requiredGrade = article.qualifiedGrade || 'C';
  const requiredRank = GRADE_RANKS[requiredGrade] || 2;

  let gradeMatch = false;
  // D等級案件はCでもBでも参加可能。要求等級と自社等級の比較
  if (requiredGrade === 'D' || myRank >= requiredRank || article.requiredQualifications?.some(q => q.includes(profile.qualifiedGrade))) {
    score += 30;
    gradeMatch = true;
    matchReasons.push(`保有資格（全省庁統一資格: ${profile.qualifiedGrade}等級）で参加可能`);
  } else {
    riskFactors.push(`要資格（${requiredGrade}等級以上）に対し自社は${profile.qualifiedGrade}等級`);
  }

  // 4. Region Match (Max 15 pts)
  if (article.region === 'all' || article.region === profile.targetRegion || article.requiredQualifications?.some(q => q.includes('全国'))) {
    score += 15;
    matchReasons.push('活動可能地域（または全国対象）に適合');
  } else {
    riskFactors.push(`対象地域（${article.region}）が自社主力エリア外`);
  }

  // 5. Preparation Lead Time (Max 10 pts)
  const now = Date.now();
  const deadlineMs = new Date(article.submissionDeadline).getTime();
  const leadDays = Math.max(0, Math.round((deadlineMs - now) / (1000 * 60 * 60 * 24)));

  if (leadDays >= (profile.minLeadDays || 10)) {
    score += 10;
    matchReasons.push(`提出締切まで${leadDays}日あり、応札準備期間が十分`);
  } else if (leadDays > 0) {
    riskFactors.push(`締切まで残り${leadDays}日（準備期間が逼迫）`);
  } else {
    riskFactors.push('応募受付期間が終了しています');
  }

  // Normalize final score between 10 and 99
  const finalScore = Math.min(Math.max(score, 10), 98);

  // Determine Go / Review / No-Go
  let decision = 'Review';
  let decisionLabel = '要検討（条件確認推奨）';
  let decisionColor = 'bg-amber-100 text-amber-800 border-amber-200';

  if (finalScore >= (profile.autoFilterThreshold || 80) && gradeMatch) {
    decision = 'Go';
    decisionLabel = '応札推奨（Go）';
    decisionColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  } else if (finalScore < 50 || !gradeMatch) {
    decision = 'No-Go';
    decisionLabel = '見送り推奨（No-Go）';
    decisionColor = 'bg-slate-100 text-slate-700 border-slate-200';
  }

  return {
    score: finalScore,
    gradeMatch,
    isExcluded: false,
    decision,
    decisionLabel,
    decisionColor,
    leadDays,
    matchedKeywords,
    matchReasons,
    riskFactors
  };
}

// Bidding Bookmarks Management
export function getBidBookmarks() {
  try {
    const stored = localStorage.getItem(BID_BOOKMARKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

export function saveBidBookmark(article, userNote = '', tags = ['検討中']) {
  const bookmarks = getBidBookmarks();
  const existingIndex = bookmarks.findIndex(b => b.id === article.id);
  const updatedItem = {
    ...article,
    savedAt: new Date().toISOString(),
    userNote,
    userTags: tags
  };

  let newBookmarks;
  if (existingIndex >= 0) {
    newBookmarks = [...bookmarks];
    newBookmarks[existingIndex] = { ...newBookmarks[existingIndex], ...updatedItem };
  } else {
    newBookmarks = [updatedItem, ...bookmarks];
  }
  localStorage.setItem(BID_BOOKMARKS_STORAGE_KEY, JSON.stringify(newBookmarks));
  return newBookmarks;
}

export function removeBidBookmark(articleId) {
  const bookmarks = getBidBookmarks();
  const filtered = bookmarks.filter(b => b.id !== articleId);
  localStorage.setItem(BID_BOOKMARKS_STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
}
