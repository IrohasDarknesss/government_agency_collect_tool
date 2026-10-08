// 官公庁の大量アーカイブデータ生成・統合モジュール (120件超)

import { INITIAL_ARTICLES } from './mockGovData';

const HISTORICAL_TEMPLATES = [
  // 経産省・中企庁
  {
    agency: '経済産業省・中小企業庁',
    agencyCode: 'meti',
    category: 'subsidy',
    type: 'grant',
    topics: [
      { title: '「中堅・中小企業の賃上げに向けた省力化等の大規模成長投資補助金」第2次公募採択結果', tag: '大規模成長投資', imp: 'high' },
      { title: '「小規模事業者持続化補助金」第17回公募要領の公表（販路開拓・インボイス特例）', tag: '持続化補助金', imp: 'high' },
      { title: '「事業再構築補助金」採択案件の進捗管理および事業化状況報告の手引き', tag: '事業再構築', imp: 'medium' },
      { title: '「サプライチェーン強靭化・国内投資拡大支援事業」公募開始', tag: '国内投資', imp: 'high' },
      { title: '「下請中小企業・振興法」に基づく振興基準の改正および自主行動計画の遵守状況', tag: '下請振興基準', imp: 'normal' },
      { title: '中小企業向けサイバーセキュリティお助け隊サービス第4期登録製品一覧', tag: 'お助け隊', imp: 'normal' },
      { title: 'GXサプライチェーン構築に向けた水素・アンモニア導入支援補助金の第3次公募', tag: '水素・アンモニア', imp: 'medium' },
    ]
  },
  // デジタル庁
  {
    agency: 'デジタル庁',
    agencyCode: 'digital',
    category: 'digital',
    type: 'press',
    topics: [
      { title: '「ガバメントソリューションサービス（GSS）」全省庁展開の完了および利用状況', tag: 'GSS', imp: 'medium' },
      { title: '「マイナンバーカード対面確認アプリ」事業者向け無償提供の開始について', tag: '対面確認アプリ', imp: 'high' },
      { title: 'デジタル原則に照らしたアナログ規制（目視・常駐・定期検査等）の一括見直し達成率98%公表', tag: 'アナログ規制撤廃', imp: 'high' },
      { title: '「デジタル公共財（DPG）」の整備方針および自治体OSS活用ガイドライン', tag: 'デジタル公共財', imp: 'normal' },
      { title: '公的個人認証サービス（JPKI）の民間利用事業者数が1,000社を突破', tag: 'JPKI', imp: 'medium' },
      { title: 'マイナ保険証利用促進に向けた医療機関・薬局向け集中取組月間の実施結果', tag: 'マイナ保険証', imp: 'high' },
    ]
  },
  // 厚生労働省
  {
    agency: '厚生労働省',
    agencyCode: 'mhlw',
    category: 'labor',
    type: 'law',
    topics: [
      { title: '「労働安全衛生規則」改正に伴う化学物質管理者・保護具着用管理者の選任義務化フォローアップ', tag: '化学物質管理', imp: 'medium' },
      { title: '「育児・介護休業法」改正に伴う男性育休取得状況の公表義務拡大（300人超企業へ）', tag: '男性育休', imp: 'high' },
      { title: '「裁量労働制」実務運用指針に基づく労使委員会決議届の届出状況と定期報告', tag: '裁量労働制', imp: 'normal' },
      { title: '「人材開発支援助成金（人への投資促進コース）」申請受付状況および優良活用事例集', tag: '人への投資', imp: 'high' },
      { title: '令和8年度 地域別最低賃金額改定の全国答申結果（全国加重平均1,055円へ）', tag: '最低賃金改定', imp: 'high' },
      { title: '高年齢雇用継続給付の給付率見直し（15%から10%へ引下げ）の実務対応手引き', tag: '高年齢雇用継続', imp: 'medium' },
    ]
  },
  // 総務省
  {
    agency: '総務省',
    agencyCode: 'mic',
    category: 'digital',
    type: 'stat',
    topics: [
      { title: '「通信利用動向調査（令和7年調査・令和8年公表結果）」テレワーク導入率およびクラウド利用率推移', tag: '通信利用動向', imp: 'normal' },
      { title: '「情報通信白書 令和8年版」の公表〜生成AIがもたらす社会変革と我が国の課題〜', tag: '情報通信白書', imp: 'high' },
      { title: '地方公務員のテレワーク・サテライトオフィス勤務の実施状況に関する調査結果', tag: '公務員テレワーク', imp: 'normal' },
      { title: '地域デジタル基盤活用推進事業（実証事業・補助金）採択候補の決定', tag: '地域デジタル基盤', imp: 'medium' },
      { title: 'ふるさと納税制度におけるポイント付与見直し方針および指定基準の告示', tag: 'ふるさと納税', imp: 'high' },
    ]
  },
  // 首相官邸・内閣府
  {
    agency: '首相官邸・内閣府',
    agencyCode: 'kantei',
    category: 'economy',
    type: 'council',
    topics: [
      { title: '第12回 規制改革推進会議の開催結果（医療・教育・モビリティ分野の規制緩和提言）', tag: '規制改革推進会議', imp: 'high' },
      { title: '令和8年度 経済財政運営と改革の基本方針（骨太の方針2026）の閣議決定', tag: '骨太の方針', imp: 'high' },
      { title: '「スタートアップ育成5か年計画」推進状況レビューおよびユニコーン創出進捗', tag: 'スタートアップ5か年', imp: 'medium' },
      { title: '孤独・孤立対策推進法に基づく重点計画の見直しおよび官民プラットフォーム全国大会', tag: '孤独・孤立対策', imp: 'normal' },
      { title: '総合海洋政策大綱に基づく洋上風力発電促進区域の新規指定について', tag: '洋上風力', imp: 'medium' },
    ]
  },
  // 金融庁
  {
    agency: '金融庁',
    agencyCode: 'fsa',
    category: 'economy',
    type: 'law',
    topics: [
      { title: '「新NISA（少額投資非課税制度）」買付額・口座開設状況（2026年6月末時点）の公表', tag: '新NISA', imp: 'high' },
      { title: '企業内容等の開示に関する内閣府令改正（四半期開示の簡素化・半期報告書への一本化）', tag: '四半期開示見直し', imp: 'high' },
      { title: '中小企業向け事業承継ファンドへの出資円滑化に関する銀行等監督指針の改正', tag: '事業承継ファンド', imp: 'normal' },
      { title: '金融機関におけるサイバーセキュリティ自己評価ツール（Delta）利用結果報告', tag: '金融サイバー', imp: 'medium' },
    ]
  },
  // 環境省
  {
    agency: '環境省',
    agencyCode: 'moe',
    category: 'green',
    type: 'grant',
    topics: [
      { title: '「二酸化炭素排出抑制対策事業費等補助金（民間建築物ZEB化）」追加公募要領', tag: 'ZEB補助金', imp: 'high' },
      { title: '令和8年度 脱炭素先行地域（第5弾選定地域）の決定について', tag: '脱炭素先行地域', imp: 'high' },
      { title: '国立公園オフィシャルパートナーシッププログラムの新規締結企業発表', tag: '国立公園', imp: 'normal' },
      { title: 'PFAS（有機フッ素化合物）に関する全国水質測定結果および暫定目標値の評価', tag: 'PFAS', imp: 'high' },
    ]
  },
  // 国土交通省
  {
    agency: '国土交通省',
    agencyCode: 'mlit',
    category: 'safety',
    type: 'press',
    topics: [
      { title: '「建設DX（i-Construction 2.0）」現場の省人化3割に向けた新技術導入指針', tag: '建設DX', imp: 'high' },
      { title: '「物流2024年問題」フォローアップ調査〜荷待ち時間削減と適正運賃収受の実態〜', tag: '物流問題', imp: 'high' },
      { title: '道路橋定期点検結果（全国73万橋の健全性評価）および修繕代行制度の適用状況', tag: 'インフラ老朽化', imp: 'normal' },
      { title: '「地域モビリティ転換推進事業」全国のライドシェア導入自治体の実証データ公表', tag: '日本版ライドシェア', imp: 'high' },
    ]
  },
  // 文部科学省
  {
    agency: '文部科学省',
    agencyCode: 'mext',
    category: 'education',
    type: 'press',
    topics: [
      { title: '「高等教育の修学支援新制度（授業料等減免・給付型奨学金）」多子世帯全額無償化の申請案内', tag: '大学無償化', imp: 'high' },
      { title: '教員の処遇改善に向けた給特法見直し（教職調整額を10%へ引上げ）に関する法案要綱', tag: '給特法見直し', imp: 'high' },
      { title: '次世代スーパーコンピュータ「富岳NEXT」基本設計方針および産学利用計画', tag: 'スーパーコンピュータ', imp: 'normal' },
      { title: '国立大学法人等の業務実績評価結果および運営費交付金重点配分結果の公表', tag: '国立大学法人', imp: 'normal' },
    ]
  },
  // こども家庭庁
  {
    agency: 'こども家庭庁',
    agencyCode: 'cfa',
    category: 'education',
    type: 'press',
    topics: [
      { title: '「こども未来戦略」に基づく子育て応援手当・妊産婦等包括相談支援の全国実施状況', tag: 'こども未来戦略', imp: 'high' },
      { title: 'こども性暴力防止法（日本版DBS）の施行に向けた民間教育事業者等向け認証基準案', tag: '日本版DBS', imp: 'high' },
      { title: 'ヤングケアラー支援に関する自治体ネットワーク強化等モデル事業の公募', tag: 'ヤングケアラー', imp: 'medium' },
    ]
  }
];

// Generate dynamic historical items to guarantee over 100 high-quality articles
export function generateFullGovDataset() {
  const baseArticles = [...INITIAL_ARTICLES];
  const generated = [];
  let counter = 101;

  const dates = [
    '2026-09-05', '2026-09-03', '2026-08-28', '2026-08-22', '2026-08-15',
    '2026-08-08', '2026-08-01', '2026-07-25', '2026-07-18', '2026-07-10',
    '2026-07-01', '2026-06-25', '2026-06-15', '2026-06-01', '2026-05-20'
  ];

  HISTORICAL_TEMPLATES.forEach((template, tIdx) => {
    template.topics.forEach((topic, itemIdx) => {
      const dateStr = dates[(tIdx * 3 + itemIdx) % dates.length];
      const hour = String(9 + ((itemIdx * 2) % 9)).padStart(2, '0');
      const min = itemIdx % 2 === 0 ? '00' : '30';
      const fullDate = `${dateStr}T${hour}:${min}:00+09:00`;

      generated.push({
        id: `gov-archive-${counter++}`,
        title: topic.title,
        agency: template.agency,
        agencyCode: template.agencyCode,
        category: template.category,
        type: template.type,
        publishedAt: fullDate,
        summary: `${template.agency}が公表した「${topic.title}」に関する公式資料です。関係者・事業者に向けた具体的な実施基準、公募要領、支援制度の適用条件、または統計分析の詳細が盛り込まれています。`,
        detailedPoints: [
          `${template.agency}所管の重要政策・施策アナウンスです`,
          `対象分野：${topic.tag}に関する制度改正および実務指針`,
          '各省庁の公式ページまたはPDF公表資料にて詳細要件をご確認いただけます'
        ],
        targetAudience: '全国の企業経営者・実務担当者、地方自治体、関係機関、国民一般',
        url: `https://www.e-gov.go.jp/news/archive/${dateStr.replace(/-/g, '')}_${template.agencyCode}_${counter}`,
        tags: [topic.tag, template.agency.split('・')[0], '公式発表', '政策アーカイブ'],
        importance: topic.imp || 'normal',
        source: 'curated'
      });
    });
  });

  return [...baseArticles, ...generated];
}

export const ALL_GOV_ARTICLES = generateFullGovDataset();
