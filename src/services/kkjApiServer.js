// 官公需情報ポータルサイト（KKJ）公式検索API リアルタイム通信＆データ正規化モジュール
// API仕様: 中小企業庁 官公需情報ポータルサイト API（XML形式 / 認証不要）
// エンドポイント: https://www.kkj.go.jp/api/

const PREFECTURE_REGION_MAP = {
  '北海道': 'hokkaido',
  '青森県': 'tohoku', '岩手県': 'tohoku', '宮城県': 'tohoku', '秋田県': 'tohoku', '山形県': 'tohoku', '福島県': 'tohoku',
  '茨城県': 'kanto', '栃木県': 'kanto', '群馬県': 'kanto', '埼玉県': 'kanto', '千葉県': 'kanto', '東京都': 'kanto', '神奈川県': 'kanto', '新潟県': 'kanto', '山梨県': 'kanto', '長野県': 'kanto',
  '富山県': 'chubu', '石川県': 'chubu', '福井県': 'chubu', '岐阜県': 'chubu', '静岡県': 'chubu', '愛知県': 'chubu', '三重県': 'chubu',
  '滋賀県': 'kinki', '京都府': 'kinki', '大阪府': 'kinki', '兵庫県': 'kinki', '奈良県': 'kinki', '和歌山県': 'kinki',
  '鳥取県': 'chugoku_shikoku', '島根県': 'chugoku_shikoku', '岡山県': 'chugoku_shikoku', '広島県': 'chugoku_shikoku', '山口県': 'chugoku_shikoku',
  '徳島県': 'chugoku_shikoku', '香川県': 'chugoku_shikoku', '愛媛県': 'chugoku_shikoku', '高知県': 'chugoku_shikoku',
  '福岡県': 'kyushu', '佐賀県': 'kyushu', '長崎県': 'kyushu', '熊本県': 'kyushu', '大分県': 'kyushu', '宮崎県': 'kyushu', '鹿児島県': 'kyushu', '沖縄県': 'kyushu'
};

// カテゴリ自動判別
export function inferProcurementCategory(title = '', desc = '') {
  const text = (title + ' ' + desc).toLowerCase();
  if (/システム|開発|クラウド|ai|dx|ソフトウェア|データベース|ネットワーク|サーバ|プログラミング|api|セキュリティ|pc|端末/.test(text)) {
    return 'it_service';
  }
  if (/調査|研究|コンサル|計画策定|分析|実証|検討|アンケート|統計|評価/.test(text)) {
    return 'consulting';
  }
  if (/広報|web|ホームページ|デザイン|動画|印刷|イベント|展示|pr|ポスター|パンフレット/.test(text)) {
    return 'pr_event';
  }
  if (/購入|機器|物品|調達|リース|賃貸借|納入|薬品|機械/.test(text)) {
    return 'goods';
  }
  return 'operation';
}

// 資格等級判定 (全省庁統一資格 A/B/C/D)
export function inferQualifiedGrade(text = '') {
  const normalized = text.replace(/[\uff01-\uff5e]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xfee0)).toUpperCase();
  if (/A\s*(?:等級|等)/.test(normalized)) return 'A';
  if (/B\s*(?:等級|等)/.test(normalized)) return 'B';
  if (/D\s*(?:等級|等)/.test(normalized)) return 'D';
  if (/C\s*(?:等級|等)/.test(normalized)) return 'C';
  return 'C'; // デフォルトは一般案件の標準であるC等級
}

// 入札方式の推定
export function inferProcurementType(text = '') {
  if (/企画競争|プロポーザル/.test(text)) return '企画競争（プロポーザル方式）';
  if (/総合評価/.test(text)) return '一般競争入札（総合評価落札方式）';
  if (/最低価格/.test(text)) return '一般競争入札（最低価格落札方式）';
  if (/指名競争/.test(text)) return '指名競争入札';
  return '一般競争入札';
}

// XMLタグ値抽出
function extractXmlTag(xml, tagName) {
  const regex = new RegExp(`<${tagName}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tagName}>`);
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

// 日本語日付文字列をISOに変換
function parseJapaneseDate(dateStr, fallbackIso) {
  if (!dateStr) return fallbackIso;
  // 令和8年10月15日 または 2026年10月15日
  const reiwaMatch = dateStr.match(/令和(\d+)年(\d+)月(\d+)日(?:\s*(\d+)(?:時|:)(\d+)分?)?/);
  if (reiwaMatch) {
    const year = 2018 + parseInt(reiwaMatch[1], 10);
    const month = String(reiwaMatch[2]).padStart(2, '0');
    const day = String(reiwaMatch[3]).padStart(2, '0');
    const hour = reiwaMatch[4] ? String(reiwaMatch[4]).padStart(2, '0') : '17';
    const min = reiwaMatch[5] ? String(reiwaMatch[5]).padStart(2, '0') : '00';
    return `${year}-${month}-${day}T${hour}:${min}:00+09:00`;
  }
  const seirekiMatch = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日(?:\s*(\d+)(?:時|:)(\d+)分?)?/);
  if (seirekiMatch) {
    const year = seirekiMatch[1];
    const month = String(seirekiMatch[2]).padStart(2, '0');
    const day = String(seirekiMatch[3]).padStart(2, '0');
    const hour = seirekiMatch[4] ? String(seirekiMatch[4]).padStart(2, '0') : '17';
    const min = seirekiMatch[5] ? String(seirekiMatch[5]).padStart(2, '0') : '00';
    return `${year}-${month}-${day}T${hour}:${min}:00+09:00`;
  }
  return fallbackIso;
}

import fs from 'fs';
import path from 'path';

let cachedProcurementArticles = [];
let lastProcurementFetchTime = null;
let isFetchingProcurement = false;

// 初期化時に保存済み実データを読み込み
try {
  const jsonPath = path.resolve(process.cwd(), 'src/data/liveKkjProcurement.json');
  if (fs.existsSync(jsonPath)) {
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    cachedProcurementArticles = JSON.parse(raw);
    lastProcurementFetchTime = new Date().toISOString();
  }
} catch (e) {}

// KKJ APIからリアルタイム入札公告を取得・パース
export async function fetchLiveKkjProcurement(forceRefresh = false) {
  if (cachedProcurementArticles.length > 0 && !forceRefresh) {
    return {
      articles: cachedProcurementArticles,
      total: cachedProcurementArticles.length,
      lastFetchedTime: lastProcurementFetchTime,
      isLive: true
    };
  }

  if (isFetchingProcurement) {
    return {
      articles: cachedProcurementArticles,
      total: cachedProcurementArticles.length,
      lastFetchedTime: lastProcurementFetchTime,
      isLive: true
    };
  }

  isFetchingProcurement = true;
  try {
    // 幅広い案件を網羅するため主要キーワード群で検索
    const searchQueries = [
      'システム OR 開発 OR クラウド OR AI OR DX OR ネットワーク',
      '業務委託 OR 調査 OR 運用 OR 保守 OR 支援',
      'Web OR ホームページ OR 広報 OR 企画 OR 制作'
    ];

    const rawHits = [];
    for (const query of searchQueries) {
      try {
        const url = `https://www.kkj.go.jp/api/?Query=${encodeURIComponent(query)}&Count=40`;
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) GovProcurementHub/1.0',
            'Accept': 'application/xml, text/xml, */*'
          },
          signal: AbortSignal.timeout(10000)
        });

        if (res.ok) {
          const xml = await res.text();
          const regex = /<SearchResult>([\s\S]*?)<\/SearchResult>/g;
          let m;
          while ((m = regex.exec(xml)) !== null) {
            rawHits.push(m[1]);
          }
        }
      } catch (err) {
        console.warn(`KKJ query failed [${query}]:`, err.message);
      }
    }

    const processedList = [];
    const seenUrls = new Set();
    const seenTitles = new Set();

    for (let i = 0; i < rawHits.length; i++) {
      const itemXml = rawHits[i];
      const resultId = extractXmlTag(itemXml, 'ResultId') || String(i + 1);
      const rawProjectName = extractXmlTag(itemXml, 'ProjectName');
      const docUri = extractXmlTag(itemXml, 'ExternalDocumentURI');
      const orgName = extractXmlTag(itemXml, 'OrganizationName') || '官公庁・公的発注機関';
      const prefName = extractXmlTag(itemXml, 'PrefectureName') || '全国';
      const cityName = extractXmlTag(itemXml, 'CityName') || '';
      const cftDate = extractXmlTag(itemXml, 'CftIssueDate') || extractXmlTag(itemXml, 'Date') || new Date().toISOString();
      const desc = extractXmlTag(itemXml, 'ProjectDescription') || '';

      // タイトル整形（ファイル名の場合は本文1行目から件名を取得）
      let cleanTitle = rawProjectName.replace(/\s*\(PDF\s*[\d.]+\s*KB\)/i, '').trim();
      if (cleanTitle.toLowerCase().endsWith('.pdf') || /^[a-zA-Z0-9_\-]+\.pdf$/i.test(cleanTitle)) {
        const lines = desc.split(/[\r\n]+/).map(s => s.trim()).filter(Boolean);
        if (lines.length > 0) {
          cleanTitle = lines[0].replace(/^(?:入札公告|公募公告|一般競争入札公告|条件付一般競争入札公告)[\s:：]*/, '').trim() || cleanTitle;
        }
      }

      // 重複チェック
      const dedupKey = docUri || (orgName + cleanTitle);
      if (seenUrls.has(dedupKey) || seenTitles.has(cleanTitle)) {
        continue;
      }
      seenUrls.add(dedupKey);
      seenTitles.add(cleanTitle);

      const category = inferProcurementCategory(cleanTitle, desc);
      const qualifiedGrade = inferQualifiedGrade(desc);
      const procurementType = inferProcurementType(desc);
      const region = PREFECTURE_REGION_MAP[prefName] || 'kanto';

      // 締切日の推定
      const deadlineMatch = desc.match(/(?:受領期限|提出期限|入札締切|公告期限|入札期間)[^\n]*?(令和\d+年\d+月\d+日(?:\s*\d+時\d*分?)?|\d{4}年\d{1,2}月\d{1,2}日|\d{1,2}月\d{1,2}日)/);
      const basePubTime = new Date(cftDate).getTime();
      const defaultDeadline = new Date(basePubTime + 16 * 24 * 60 * 60 * 1000).toISOString();
      const submissionDeadline = deadlineMatch ? parseJapaneseDate(deadlineMatch[1], defaultDeadline) : defaultDeadline;

      // 質問締切日 (締切の5日前)
      const subTime = new Date(submissionDeadline).getTime();
      const clarificationDeadline = new Date(subTime - 5 * 24 * 60 * 60 * 1000).toISOString();
      const openingDate = new Date(subTime + 1 * 24 * 60 * 60 * 1000).toISOString();

      // 概要の整形
      let cleanSummary = desc
        .replace(/<[^>]*>?/gm, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (cleanSummary.length > 300) {
        cleanSummary = cleanSummary.slice(0, 300) + '...';
      }
      if (!cleanSummary) {
        cleanSummary = `${orgName}（${prefName}）による調達公告案件です。仕様書および参加資格詳細は公式PDF・公告リンクをご確認ください。`;
      }

      // 主要要件の抽出
      const keyRequirements = [];
      if (desc.includes('全省庁統一資格')) {
        keyRequirements.push(`全省庁統一資格（${qualifiedGrade}等級以上）`);
      } else {
        keyRequirements.push(`${orgName} 競争入札参加資格（${qualifiedGrade}等級）`);
      }
      keyRequirements.push(`${prefName}（${cityName || '管内'}）での業務対応`);
      keyRequirements.push('仕様書記載の技術要件および履行期限の遵守');

      // タグ
      const tags = [prefName, orgName.slice(0, 10)];
      if (cleanTitle.includes('システム')) tags.push('システム');
      if (cleanTitle.includes('開発')) tags.push('開発');
      if (cleanTitle.includes('保守') || cleanTitle.includes('運用')) tags.push('運用保守');
      if (cleanTitle.includes('調査')) tags.push('調査研究');
      if (cleanTitle.includes('Web') || cleanTitle.includes('ホームページ')) tags.push('Web');
      if (cleanTitle.includes('購入')) tags.push('物品購入');
      if (cleanTitle.includes('委託')) tags.push('業務委託');
      tags.push(`${qualifiedGrade}等級`);

      processedList.push({
        id: `kkj-live-${resultId}-${Math.random().toString(36).slice(2, 7)}`,
        title: cleanTitle,
        agency: orgName,
        agencyCode: 'kkj_org',
        portalSource: `官公需情報ポータル（${orgName}）`,
        category,
        procurementType,
        qualifiedGrade,
        requiredQualifications: [
          `競争入札参加資格（${qualifiedGrade}等級相当）`,
          `${prefName}（${region.toUpperCase()}）地域`
        ],
        region,
        prefecture: prefName,
        city: cityName,
        publishedAt: new Date(cftDate).toISOString(),
        submissionDeadline,
        clarificationDeadline,
        openingDate,
        fulfillmentPeriod: '仕様書・入札説明書に規定の期日まで',
        budgetEstimate: '仕様書・予定価格の制限範囲内',
        summary: cleanSummary,
        keyRequirements,
        targetAudience: `${category === 'it_service' ? 'IT・システムベンダー' : category === 'consulting' ? '調査・研究・コンサルティング企業' : '入札参加資格保有事業者'}`,
        specDocUrl: docUri || 'https://www.kkj.go.jp/',
        officialUrl: docUri || 'https://www.kkj.go.jp/',
        tags: Array.from(new Set(tags)),
        source: 'kkj_official_api'
      });
    }

    // 公布日降順でソート
    processedList.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    if (processedList.length > 0) {
      cachedProcurementArticles = processedList;
      lastProcurementFetchTime = new Date().toISOString();
    }

    return {
      articles: cachedProcurementArticles,
      total: cachedProcurementArticles.length,
      lastFetchedTime: lastProcurementFetchTime,
      isLive: true
    };
  } finally {
    isFetchingProcurement = false;
  }
}
