import { EXTENDED_ARCHIVE_ARTICLES } from './extendedGovData.js';

export const AGENCIES = [
  { id: 'all', name: '全省庁・機関', shortName: '全機関', color: 'bg-slate-700 text-white' },
  { id: 'digital', name: 'デジタル庁', shortName: 'デジタル庁', color: 'bg-indigo-600 text-white', icon: 'Cpu' },
  { id: 'meti', name: '経済産業省・中小企業庁', shortName: '経産省/中企庁', color: 'bg-blue-600 text-white', icon: 'TrendingUp' },
  { id: 'mhlw', name: '厚生労働省', shortName: '厚労省', color: 'bg-rose-600 text-white', icon: 'HeartHandshake' },
  { id: 'mic', name: '総務省', shortName: '総務省', color: 'bg-amber-600 text-white', icon: 'Radio' },
  { id: 'kantei', name: '首相官邸・内閣府', shortName: '官邸/内閣府', color: 'bg-emerald-700 text-white', icon: 'Building2' },
  { id: 'cfa', name: 'こども家庭庁', shortName: 'こども家庭庁', color: 'bg-orange-500 text-white', icon: 'Baby' },
  { id: 'fsa', name: '金融庁', shortName: '金融庁', color: 'bg-teal-600 text-white', icon: 'Banknote' },
  { id: 'mlit', name: '国土交通省', shortName: '国交省', color: 'bg-cyan-700 text-white', icon: 'MapPin' },
  { id: 'mext', name: '文部科学省', shortName: '文科省', color: 'bg-purple-600 text-white', icon: 'GraduationCap' },
  { id: 'moe', name: '環境省', shortName: '環境省', color: 'bg-green-600 text-white', icon: 'Leaf' },
  { id: 'mof', name: '財務省・国税庁', shortName: '財務省/国税庁', color: 'bg-stone-700 text-white', icon: 'Coins' },
  { id: 'maff', name: '農林水産省', shortName: '農水省', color: 'bg-lime-700 text-white', icon: 'Sprout' },
  { id: 'ppc', name: '個人情報保護委員会', shortName: '個情委', color: 'bg-slate-800 text-white', icon: 'ShieldCheck' },
  { id: 'jftc', name: '公正取引委員会', shortName: '公取委', color: 'bg-red-800 text-white', icon: 'Scale' }
];

export const CATEGORIES = [
  { id: 'all', label: 'すべてのジャンル', icon: 'Globe' },
  { id: 'digital', label: '💻 デジタル・IT・AI', icon: 'Cpu', color: 'text-indigo-600 border-indigo-200 bg-indigo-50' },
  { id: 'subsidy', label: '💰 補助金・助成金・支援', icon: 'Coins', color: 'text-amber-700 border-amber-200 bg-amber-50' },
  { id: 'economy', label: '💼 経済・産業・中小企業', icon: 'TrendingUp', color: 'text-blue-700 border-blue-200 bg-blue-50' },
  { id: 'labor', label: '👥 雇用・労働・人事労務', icon: 'Briefcase', color: 'text-rose-700 border-rose-200 bg-rose-50' },
  { id: 'law', label: '⚖️ 法令・規制改革・パブコメ', icon: 'Scale', color: 'text-purple-700 border-purple-200 bg-purple-50' },
  { id: 'health', label: '🏥 医療・年金・社会保障', icon: 'HeartPulse', color: 'text-emerald-700 border-emerald-200 bg-emerald-50' },
  { id: 'green', label: '🌍 環境・GX・エネルギー', icon: 'Leaf', color: 'text-green-700 border-green-200 bg-green-50' },
  { id: 'education', label: '🎓 子育て・教育・人材育成', icon: 'GraduationCap', color: 'text-cyan-700 border-cyan-200 bg-cyan-50' },
  { id: 'safety', label: '🛡️ 防災・安全・行政一般', icon: 'ShieldAlert', color: 'text-slate-700 border-slate-200 bg-slate-100' },
];

export const INFO_TYPES = [
  { id: 'all', label: '全種別' },
  { id: 'press', label: '報道発表・リリース', badgeColor: 'bg-blue-100 text-blue-800' },
  { id: 'grant', label: '補助金・公募情報', badgeColor: 'bg-amber-100 text-amber-800' },
  { id: 'council', label: '審議会・検討会資料', badgeColor: 'bg-purple-100 text-purple-800' },
  { id: 'stat', label: '統計・白書・調査', badgeColor: 'bg-emerald-100 text-emerald-800' },
  { id: 'pubcom', label: 'パブリックコメント', badgeColor: 'bg-rose-100 text-rose-800' },
  { id: 'law', label: '政省令公布・施行', badgeColor: 'bg-slate-100 text-slate-800' }
];

export const DEFAULT_FEEDS = [
  {
    id: 'digital-news',
    name: 'デジタル庁 新着報道発表',
    agency: 'デジタル庁',
    url: 'https://www.digital.go.jp/rss/news.xml',
    enabled: true,
    lastUpdated: '2026-10-04 14:00'
  },
  {
    id: 'meti-news',
    name: '経済産業省 ニュースリリース',
    agency: '経済産業省・中小企業庁',
    url: 'https://www.meti.go.jp/press/index.xml',
    enabled: true,
    lastUpdated: '2026-10-04 13:45'
  },
  {
    id: 'mhlw-news',
    name: '厚生労働省 報道発表資料',
    agency: '厚生労働省',
    url: 'https://www.mhlw.go.jp/stf/news.rdf',
    enabled: true,
    lastUpdated: '2026-10-04 13:30'
  },
  {
    id: 'mic-news',
    name: '総務省 報道資料',
    agency: '総務省',
    url: 'https://www.soumu.go.jp/news.rdf',
    enabled: true,
    lastUpdated: '2026-10-04 12:10'
  },
  {
    id: 'kantei-news',
    name: '首相官邸 ヘッドラインニュース',
    agency: '首相官邸・内閣府',
    url: 'https://www.kantei.go.jp/jp/headline/rss/headline.rdf',
    enabled: true,
    lastUpdated: '2026-10-04 11:20'
  },
  {
    id: 'fsa-news',
    name: '金融庁 報道発表',
    agency: '金融庁',
    url: 'https://www.fsa.go.jp/news/rss.xml',
    enabled: true,
    lastUpdated: '2026-10-04 10:00'
  }
];

// Combine base items (1-40) with extended archive items (41-60) + generated historical depth (61-100+)
export const INITIAL_ARTICLES = [
  // 1-10
  {
    id: 'gov-2026-001',
    title: '「中小企業省力化投資補助金」第4期公募要領の公表について〜IoT・AIによる人手不足解消・省人化設備導入を強力支援〜',
    agency: '経済産業省・中小企業庁',
    agencyCode: 'meti',
    category: 'subsidy',
    type: 'grant',
    publishedAt: '2026-10-04T11:00:00+09:00',
    summary: '人手不足に悩む中小企業・小規模事業者向けに、カタログから選ぶだけの簡単申請で省力化設備（自動倉庫、配膳ロボット、AI検査装置等）の導入費用を最大1,500万円（補助率1/2〜2/3）補助する第4期公募要領が発表されました。',
    detailedPoints: [
      '補助上限額：従業員数に応じて200万円〜最大1,500万円（賃上げ達成で上限引き上げ特例あり）',
      '対象製品：事前登録された「カタログ掲載製品」から選定するため事業計画書作成負担を大幅軽減',
      '申請受付期間：2026年10月15日〜2026年12月1日 17:00まで'
    ],
    targetAudience: '全国の中小企業・小規模事業者（製造業・宿泊飲食・小売・物流など）',
    deadline: '2026-12-01',
    url: 'https://www.meti.go.jp/press/2026/10/20261003001/20261003001.html',
    pdfUrl: 'https://www.meti.go.jp/press/2026/10/20261003001/20261003001-1.pdf',
    tags: ['補助金', '人手不足対策', 'IoT・ロボット', '中小企業支援', '省力化'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-002',
    title: '自治体情報システムの標準化移行完了状況および2026年度ガバメントクラウド活用ガイドライン改訂版の公表',
    agency: 'デジタル庁',
    agencyCode: 'digital',
    category: 'digital',
    type: 'press',
    publishedAt: '2026-10-04T09:30:00+09:00',
    summary: 'デジタル庁は全国自治体の基幹20業務システムにおける標準化進捗状況を公表。併せて、生成AIセキュリティ要件やマルチクラウド運用を盛り込んだ「ガバメントクラウド運用管理ガイドライン2026年秋版」を策定しました。',
    detailedPoints: [
      '全国自治体の89%で標準準拠システムへの移行または実証テストが順調に推移',
      '官公庁向け生成AI利用におけるプロンプト保護およびデータ越境規制の新ガイドラインを明文化',
      '自治体向けマイナンバーカード連携API基盤の刷新により窓口待ち時間を平均40%削減へ'
    ],
    targetAudience: '地方自治体情報システム部門、ITベンダー、行政書士',
    url: 'https://www.digital.go.jp/news/20261003_01',
    pdfUrl: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/20261003_govcloud_guide.pdf',
    tags: ['自治体DX', 'ガバメントクラウド', '生成AI', '標準化', 'セキュリティ'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-003',
    title: '2026年10月からの「短時間労働者に対する社会保険適用拡大」実務対応チェックリストおよび助成金のご案内',
    agency: '厚生労働省',
    agencyCode: 'mhlw',
    category: 'labor',
    type: 'press',
    publishedAt: '2026-10-03T16:00:00+09:00',
    summary: '厚生労働省は、事業所規模要件が撤廃され従業員10人以上の事業所へ適用が広がった短時間労働者の社会保険加入について、企業担当者向け相談窓口の拡充と「キャリアアップ助成金（社会保険適用時処遇改善コース）」の申請受付状況を発表しました。',
    detailedPoints: [
      '週所定20時間以上勤務かつ月額賃金8.8万円以上の短時間労働者が対象',
      '手取り減を防止するため手当支給や賃上げを行った企業へ労働者1人あたり最大50万円の助成金支給',
      'オンライン無料診断ツールおよび個別相談会を全国各労働局にて随時開催中'
    ],
    targetAudience: '企業人事・労務担当者、社労士、パート・アルバイト雇用事業者',
    deadline: '2026-11-30',
    url: 'https://www.mhlw.go.jp/stf/press/20261002_02.html',
    pdfUrl: 'https://www.mhlw.go.jp/content/11600000/001234567.pdf',
    tags: ['社会保険', '年収の壁', 'キャリアアップ助成金', '労務管理', 'パート雇用'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-004',
    title: '行政手続における本人確認手続の見直しに関するパブリックコメント（意見公募）の開始について',
    agency: 'デジタル庁',
    agencyCode: 'digital',
    category: 'law',
    type: 'pubcom',
    publishedAt: '2026-10-03T14:15:00+09:00',
    summary: 'スマートフォン搭載のマイナンバー電子証明書を用いたオンライン本人確認（eKYC）の普及に伴い、対面手続における署名押印撤廃および顔認証併用ルールの策定に関する政令改正案への意見募集が開始されました。',
    detailedPoints: [
      'スマホ搭載マイナンバーカードの利用可能アプリ拡大に向けたAPI開放要件',
      '本人確認書類としての健康保険証終了に伴う資格確認書・マイナ保険証の確認規定の整備',
      '意見募集期間：2026年10月2日〜2026年11月2日まで'
    ],
    targetAudience: '国民一般、IT事業者、金融機関、法曹関係者',
    deadline: '2026-11-02',
    url: 'https://public-comment.e-gov.go.jp/servlet/Public?CLASSNAME=PCMMSTDETAIL&id=2026100201',
    tags: ['パブコメ', 'マイナンバー', '本人確認', '規制改革', '法令'],
    importance: 'medium',
    source: 'curated'
  },
  {
    id: 'gov-2026-005',
    title: '「地域脱炭素移行・再エネ推進交付金（重点対策加速化事業）」令和8年度第2次公募の開始',
    agency: '環境省',
    agencyCode: 'moe',
    category: 'green',
    type: 'grant',
    publishedAt: '2026-10-03T10:00:00+09:00',
    summary: '環境省は地方自治体および民間事業者・地域エネルギー会社と連携した太陽光発電、蓄電池、EV公用車、省エネ建築物（ZEB）の導入を推進する重点対策交付金の第2次公募を開始しました。',
    detailedPoints: [
      '補助対象：自家消費型太陽光、地域マイクログリッド、EV充電インフラ、未利用熱活用',
      '補助率：事業区分に応じて1/2〜2/3、重点対策地域モデル事業は最大10億円',
      '公募期間：2026年10月2日〜11月20日締切'
    ],
    targetAudience: '地方公共団体、地域新電力、再エネ設備施工事業者',
    deadline: '2026-11-20',
    url: 'https://www.env.go.jp/press/press_02654.html',
    pdfUrl: 'https://www.env.go.jp/press/files/jp/124567.pdf',
    tags: ['GX', '脱炭素', '再エネ', '地域創生', '太陽光・蓄電池'],
    importance: 'medium',
    source: 'curated'
  },
  {
    id: 'gov-2026-006',
    title: '第8回 新しい資本主義実現会議の開催結果および重点投資分野アクションプラン改訂版について',
    agency: '首相官邸・内閣府',
    agencyCode: 'kantei',
    category: 'economy',
    type: 'council',
    publishedAt: '2026-10-02T18:00:00+09:00',
    summary: '内閣官房は第8回新しい資本主義実現会議を開催し、先端半導体、AIインフラ、リスキリング支援、賃上げ税制の拡充に関する次年度概算要求重点項目の総括を取りまとめました。',
    detailedPoints: [
      '国内半導体製造拠点および次世代量子コンピュータ開発への追加投資枠組を確定',
      '中小企業の構造的賃上げを促す税制優遇（控除率最大45%）の適用要件を継続緩和',
      '個人のリスキリング教育訓練給付金を拡充し、IT・データサイエンス講座を強化'
    ],
    targetAudience: '経営者、経済団体、研究機関、一般国民',
    url: 'https://www.cas.go.jp/jp/seisaku/atarashii_sihonsyugi/index.html',
    pdfUrl: 'https://www.cas.go.jp/jp/seisaku/atarashii_sihonsyugi/pdf/actionplan2026_rev.pdf',
    tags: ['経済政策', '賃上げ', '半導体・AI', 'リスキリング', '内閣官房'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-007',
    title: '「こども誰でも通園制度」本格運用開始に伴う事業者向け補助要綱および利用ガイドラインの公表',
    agency: 'こども家庭庁',
    agencyCode: 'cfa',
    category: 'education',
    type: 'press',
    publishedAt: '2026-10-02T13:30:00+09:00',
    summary: '全国の0歳6か月〜2歳児の未就園児を対象に、親の就労要件を問わず月一定時間まで保育所等を利用できる「こども誰でも通園制度」の本格運用ガイドラインと受入施設への人件費・設備改修支援策が公表されました。',
    detailedPoints: [
      '利用上限：子ども1人あたり月10時間を基本とし自治体独自の拡充が可能',
      '受入施設への加算措置：保育士配置基準に応じた補助単価および予約システム導入補助',
      'スマホアプリを通じた空き枠検索・予約機能の全国共通プラットフォーム要件を提示'
    ],
    targetAudience: '認可保育所、認定こども園、小規模保育事業者、子育て世帯',
    url: 'https://www.cfa.go.jp/policies/kodomo-daremo/guideline2026',
    pdfUrl: 'https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/daremo_guideline.pdf',
    tags: ['子育て支援', 'こども家庭庁', '保育所', '少子化対策', '補助金'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-008',
    title: '暗号資産・ステーブルコインに関する決済業務規制の見直し報告書および資金決済法改正作業部会の資料公表',
    agency: '金融庁',
    agencyCode: 'fsa',
    category: 'economy',
    type: 'council',
    publishedAt: '2026-10-02T11:00:00+09:00',
    summary: '金融審議会資金決済制度等ワーキング・グループは、企業間決済における国内発行型ステーブルコインの利用円滑化、およびWeb3事業者の海外展開を支援するための資本要件・信託保全ルール見直しの中間整理を公表しました。',
    detailedPoints: [
      '銀行・信託会社・資金移動業者によるステーブルコイン発行・流通枠組の統一的解釈',
      'アンチマネーロンダリング（AML/CFT）遵守と取引追跡技術要件の明確化',
      '金融機関によるトークン化預金の実証実験環境の整備方針'
    ],
    targetAudience: 'フィンテック企業、暗号資産交換業者、金融機関、Web3開発者',
    url: 'https://www.fsa.go.jp/singi/singi_kinyu/kessai_wg/siryou/20261001.html',
    pdfUrl: 'https://www.fsa.go.jp/singi/singi_kinyu/kessai_wg/siryou/20261001/01.pdf',
    tags: ['金融規制', 'Web3', 'ステーブルコイン', 'フィンテック', '資金決済法'],
    importance: 'medium',
    source: 'curated'
  },
  {
    id: 'gov-2026-009',
    title: '令和8年8月分 労働力調査（基本集計）結果公表〜完全失業率2.4%、就業者数は過去最高水準を更新〜',
    agency: '総務省',
    agencyCode: 'mic',
    category: 'labor',
    type: 'stat',
    publishedAt: '2026-10-01T08:30:00+09:00',
    summary: '総務省統計局が発表した最新の労働力調査によると、就業者数は6,812万人（前年同月比35万人増）となり、シニア層および女性の就労率上昇を背景に堅調な推移を示しました。有効求人倍率との連動分析も公開。',
    detailedPoints: [
      '完全失業率は季節調整値で2.4%（前月比0.1ポイント低下）',
      '正規の職員・従業員数は3,640万人で前年同月比28万人増加（連続プラス傾向）',
      '産業別では「医療・福祉」および「情報通信業」での就業者数増加が顕著'
    ],
    targetAudience: 'エコノミスト、企業経営企画、人事部門、報道関係者',
    url: 'https://www.stat.go.jp/data/roudou/sokuhou/tsuki/index.html',
    tags: ['統計データ', '雇用統計', '失業率', '経済指標', '総務省統計局'],
    importance: 'normal',
    source: 'curated'
  },
  {
    id: 'gov-2026-010',
    title: '建築物省エネ法に基づく「省エネ基準適合義務化」完全実施に伴う設計・確認申請Q&A集の更新',
    agency: '国土交通省',
    agencyCode: 'mlit',
    category: 'green',
    type: 'law',
    publishedAt: '2026-10-01T15:00:00+09:00',
    summary: '原則すべての新築住宅・非住宅建築物に省エネ基準適合が義務付けられたことに伴い、国交省は設計者・建築主からの頻出質問（断熱材仕様、ZEH水準計算、既存不適格改修特例）をまとめた実務Q&Aを最新化しました。',
    detailedPoints: [
      '住宅トップランナー基準の引き上げ動向と一次エネルギー消費量計算ツールの更新',
      '木造戸建て住宅における壁量計算・構造確認との一体的申請手続きの合理化手順',
      '省エネリフォーム補助金（子育てエコホーム支援事業等）との併用要件を整理'
    ],
    targetAudience: '建築士、ハウスメーカー、工務店、不動産デベロッパー',
    url: 'https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk4_000103.html',
    pdfUrl: 'https://www.mlit.go.jp/jutakukentiku/house/content/qa2026.pdf',
    tags: ['省エネ法', '住宅・建築', '脱炭素', 'ZEH', '国交省規制'],
    importance: 'medium',
    source: 'curated'
  },
  ...EXTENDED_ARCHIVE_ARTICLES
];
