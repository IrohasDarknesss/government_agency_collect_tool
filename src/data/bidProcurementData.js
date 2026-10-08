// 官公需情報ポータルサイト（KKJ）準拠 公共調達・入札公告データセット

export const PROCUREMENT_CATEGORIES = [
  { id: 'all', label: 'すべての調達区分' },
  { id: 'it_service', label: '💻 IT・システム開発・運用保守' },
  { id: 'consulting', label: '📊 調査研究・コンサルティング・企画' },
  { id: 'operation', label: '👥 業務委託・事務局運営・コールセンター' },
  { id: 'goods', label: '📦 機器・物品購入・ライセンス' },
  { id: 'pr_event', label: '📢 広報・Webサイト制作・イベント' }
];

export const PROCUREMENT_GRADES = [
  { id: 'all', label: '全等級' },
  { id: 'A', label: 'A等級' },
  { id: 'B', label: 'B等級' },
  { id: 'C', label: 'C等級' },
  { id: 'D', label: 'D等級' }
];

export const PROCUREMENT_REGIONS = [
  { id: 'all', label: '全国' },
  { id: 'kanto', label: '関東・甲信越' },
  { id: 'kinki', label: '近畿' },
  { id: 'chubu', label: '東海・中部' },
  { id: 'kyushu', label: '九州・沖縄' },
  { id: 'tohoku', label: '東北' },
  { id: 'chugoku_shikoku', label: '中国・四国' },
  { id: 'hokkaido', label: '北海道' }
];

export const INITIAL_PROCUREMENT_ARTICLES = [
  {
    id: 'bid-2026-001',
    title: '令和8年度 生成AIを活用した行政文書作成支援基盤の設計・開発および実証業務',
    agency: 'デジタル庁',
    agencyCode: 'digital',
    portalSource: '官公需情報ポータル（デジタル庁 調達公告）',
    category: 'it_service',
    procurementType: '一般競争入札（総合評価落札方式）',
    qualifiedGrade: 'C', // 全省庁統一資格: 役務の提供等のC等級以上
    requiredQualifications: ['全省庁統一資格（役務の提供等）C等級以上', '関東・甲信越地域', '情報セキュリティマネジメントシステム（ISMS）認証'],
    region: 'kanto',
    publishedAt: '2026-10-06T10:00:00+09:00',
    submissionDeadline: '2026-10-27T17:00:00+09:00', // 締切まで約21日
    clarificationDeadline: '2026-10-15T12:00:00+09:00', // 質問締切
    openingDate: '2026-10-28T10:00:00+09:00', // 開札日
    fulfillmentPeriod: '契約締結日 〜 2027年3月25日',
    budgetEstimate: '約 35,000,000 円',
    summary: '行政実務における文書作成・要約・校正をセキュアに支援する生成AIモデル統合基盤のPoC開発業務。行政専用LGWAN接続要件および閉域API環境へのマルチLLM統合アーキテクチャの構築を含む。',
    keyRequirements: [
      'Azure OpenAIまたはAWS Bedrockを用いた閉域型AIオーケストレーション基盤の実装経験',
      'プロンプトインジェクション対策およびPII（個人識別情報）マスキング処理モジュール',
      '週次定例での進捗報告および自治体20拠点へのトライアル支援'
    ],
    targetAudience: 'クラウドインフラ設計・AI開発実績を有するITベンダー',
    specDocUrl: 'https://www.digital.go.jp/procurement/20261006_ai_spec.pdf',
    officialUrl: 'https://www.kkj.go.jp/search/detail?id=bid-2026-001',
    tags: ['生成AI', 'システム開発', 'クラウド', '総合評価', '役務C等級'],
    source: 'kkj_portal'
  },
  {
    id: 'bid-2026-002',
    title: '中小企業省力化・DX推進状況モニタリングダッシュボード構築およびデータ収集・可視化業務',
    agency: '経済産業省・中小企業庁',
    agencyCode: 'meti',
    portalSource: '官公需情報ポータル（中小企業庁 調達公告）',
    category: 'it_service',
    procurementType: '企画競争（プロポーザル方式）',
    qualifiedGrade: 'C',
    requiredQualifications: ['全省庁統一資格（役務の提供等）C等級またはD等級', '全国'],
    region: 'kanto',
    publishedAt: '2026-10-05T14:00:00+09:00',
    submissionDeadline: '2026-10-26T12:00:00+09:00',
    clarificationDeadline: '2026-10-14T17:00:00+09:00',
    openingDate: '2026-10-27T14:00:00+09:00',
    fulfillmentPeriod: '契約締結日 〜 2027年3月31日',
    budgetEstimate: '約 18,000,000 円',
    summary: '全国の中小企業における省力化設備導入状況・補助金申請データを集約し、地域別・業種別のDX進捗KPIをダッシュボード上で可視化するWebシステム開発および月次レポート出力業務。',
    keyRequirements: [
      'React / Next.js または Python BIツールを活用したセキュアなWebダッシュボード構築',
      '官公庁オープンデータ（CSV/API）連携機能の実装',
      'アクセス権限管理（管理者・一般職員・閲覧専用ロール）の設計'
    ],
    targetAudience: 'Web開発・データ可視化事業者',
    specDocUrl: 'https://www.chusho.meti.go.jp/procurement/20261005_dashboard_spec.pdf',
    officialUrl: 'https://www.kkj.go.jp/search/detail?id=bid-2026-002',
    tags: ['Web開発', 'データ可視化', 'ダッシュボード', '企画競争', '役務C等級'],
    source: 'kkj_portal'
  },
  {
    id: 'bid-2026-003',
    title: '令和8年度 労働力需給動向および短時間労働者処遇実態に関するアンケートWeb調査・分析委託業務',
    agency: '厚生労働省',
    agencyCode: 'mhlw',
    portalSource: '官公需情報ポータル（厚生労働省 調達公告）',
    category: 'consulting',
    procurementType: '一般競争入札（総合評価落札方式）',
    qualifiedGrade: 'B',
    requiredQualifications: ['全省庁統一資格（役務の提供等）B等級以上', '関東・甲信越地域'],
    region: 'kanto',
    publishedAt: '2026-10-04T11:00:00+09:00',
    submissionDeadline: '2026-10-23T17:00:00+09:00',
    clarificationDeadline: '2026-10-12T17:00:00+09:00',
    openingDate: '2026-10-24T11:00:00+09:00',
    fulfillmentPeriod: '契約締結日 〜 2027年2月28日',
    budgetEstimate: '約 24,000,000 円',
    summary: '全国5,000事業所を対象に、社会保険適用拡大に伴う雇用調整・手当支給の実態を把握するためのオンライン調査システム設計、実査、クロス集計および政策提言レポートの作成。',
    keyRequirements: [
      '標本抽出理論に基づく大規模統計実査の実績',
      '暗号化されたWeb回答フォームの構築と回収率向上施策の実施',
      '多変量解析および政策分析報告書の取りまとめ能力'
    ],
    targetAudience: 'シンクタンク、調査研究機関、統計コンサルタント',
    specDocUrl: 'https://www.mhlw.go.jp/procurement/20261004_survey_spec.pdf',
    officialUrl: 'https://www.kkj.go.jp/search/detail?id=bid-2026-003',
    tags: ['調査研究', 'アンケート', 'Web調査', '統計分析', '役務B等級'],
    source: 'kkj_portal'
  },
  {
    id: 'bid-2026-004',
    title: '東京都庁 都有施設における省エネルギー運用状況のIoT遠隔モニタリングシステム実証',
    agency: '東京都庁',
    agencyCode: 'kantei',
    portalSource: '官公需情報ポータル（東京都電子調達 調達公告）',
    category: 'it_service',
    procurementType: '公募型プロポーザル方式',
    qualifiedGrade: 'C',
    requiredQualifications: ['東京都競争入札参加資格（委託等）格付C以上', '情報通信部門'],
    region: 'kanto',
    publishedAt: '2026-10-03T15:00:00+09:00',
    submissionDeadline: '2026-10-20T17:00:00+09:00', // 締切まで残り12日
    clarificationDeadline: '2026-10-10T15:00:00+09:00',
    openingDate: '2026-10-21T10:00:00+09:00',
    fulfillmentPeriod: '契約締結日 〜 2027年3月15日',
    budgetEstimate: '約 12,000,000 円',
    summary: '都有施設15箇所における電力消費量・室温・CO2濃度をLPWA/LTE-Mセンサーを用いてリアルタイム集約し、空調自動最適化アルゴリズムを検証するPoC開発。',
    keyRequirements: [
      'IoTセンサー機器の手配・現地設置作業および通信インフラ構築',
      'クラウド上での時系列データ処理APIの提供',
      'エネルギー削減効果（目標15%削減）の検証分析'
    ],
    targetAudience: 'IoTソリューション事業者、エネルギーマネジメント企業',
    specDocUrl: 'https://www.metro.tokyo.lg.jp/procurement/20261003_iot_spec.pdf',
    officialUrl: 'https://www.kkj.go.jp/search/detail?id=bid-2026-004',
    tags: ['IoT', 'スマートビル', '脱炭素', '東京都', '役務C等級'],
    source: 'kkj_portal'
  },
  {
    id: 'bid-2026-005',
    title: '首相官邸・内閣府 Webサイトアクセシビリティ（JIS X 8341-3:2016 AA適合）検査・改修委託',
    agency: '首相官邸・内閣府',
    agencyCode: 'kantei',
    portalSource: '官公需情報ポータル（内閣府 調達公告）',
    category: 'pr_event',
    procurementType: '一般競争入札（最低価格落札方式）',
    qualifiedGrade: 'D', // D等級でも参加可能
    requiredQualifications: ['全省庁統一資格（役務の提供等）D等級以上', '全国'],
    region: 'kanto',
    publishedAt: '2026-10-02T11:00:00+09:00',
    submissionDeadline: '2026-10-19T14:00:00+09:00',
    clarificationDeadline: '2026-10-09T17:00:00+09:00',
    openingDate: '2026-10-20T11:00:00+09:00',
    fulfillmentPeriod: '契約締結日 〜 2027年1月31日',
    budgetEstimate: '約 4,800,000 円',
    summary: '内閣府公式Webサイト約300ページにおけるJIS X 8341-3（ウェブアクセシビリティ）等級AAへの適合状況検査、全ページ改修コードの作成およびスクリーンリーダー実機テスト。',
    keyRequirements: [
      'ウェブアクセシビリティ基盤委員会（WAIC）ガイドラインに精通していること',
      'HTML/CSS/ARIAタグの最適化修正とBefore/After評価試験成績書の納品',
      '視覚障がい者モニターによる実機読み上げ検証の実施'
    ],
    targetAudience: 'Web制作会社、フロントエンド開発企業、アクセシビリティ診断事業者',
    specDocUrl: 'https://www.cao.go.jp/procurement/20261002_a11y_spec.pdf',
    officialUrl: 'https://www.kkj.go.jp/search/detail?id=bid-2026-005',
    tags: ['Web制作', 'アクセシビリティ', 'HTML/CSS', '最低価格', '役務D等級'],
    source: 'kkj_portal'
  },
  {
    id: 'bid-2026-006',
    title: '文部科学省 次世代校務DXクラウド基盤におけるゼロトラスト認証連携API保守・運用支援',
    agency: '文部科学省',
    agencyCode: 'mext',
    portalSource: '官公教情報ポータル（文部科学省 調達公告）',
    category: 'it_service',
    procurementType: '一般競争入札（総合評価落札方式）',
    qualifiedGrade: 'B',
    requiredQualifications: ['全省庁統一資格（役務の提供等）B等級以上', '関東・甲信越地域'],
    region: 'kanto',
    publishedAt: '2026-10-01T16:00:00+09:00',
    submissionDeadline: '2026-10-22T17:00:00+09:00',
    clarificationDeadline: '2026-10-13T17:00:00+09:00',
    openingDate: '2026-10-23T14:00:00+09:00',
    fulfillmentPeriod: '契約締結日 〜 2027年3月31日',
    budgetEstimate: '約 29,000,000 円',
    summary: 'GIGAスクール構想第2期に伴う全国校務支援システム（SaaS）とIdP（Entra ID / Google Workspace）間のシングルサインオン（SSO）連携APIゲートウェイの24時間365日監視・保守業務。',
    keyRequirements: [
      'OpenID Connect / SAML 2.0認証アーキテクチャの運用保守実績',
      'インシデント発生時の1次対応（15分以内初動体制）',
      '四半期ごとの脆弱性診断およびパッチ適用マネジメント'
    ],
    targetAudience: 'クラウドMSP、ネットワークセキュリティ運用保守企業',
    specDocUrl: 'https://www.mext.go.jp/procurement/20261001_sso_spec.pdf',
    officialUrl: 'https://www.kkj.go.jp/search/detail?id=bid-2026-006',
    tags: ['クラウド運用保守', '認証API', 'セキュリティ', 'GIGAスクール', '役務B等級'],
    source: 'kkj_portal'
  },
  {
    id: 'bid-2026-007',
    title: '中央合同庁舎第4号館における日常清掃および定期ワックス清掃業務一式',
    agency: '内閣府',
    agencyCode: 'kantei',
    portalSource: '官公需情報ポータル（内閣府 調達公告）',
    category: 'operation',
    procurementType: '一般競争入札（最低価格落札方式）',
    qualifiedGrade: 'C',
    requiredQualifications: ['全省庁統一資格（建物管理等）C等級以上'],
    region: 'kanto',
    publishedAt: '2026-09-30T10:00:00+09:00',
    submissionDeadline: '2026-10-21T11:00:00+09:00',
    clarificationDeadline: '2026-10-10T12:00:00+09:00',
    openingDate: '2026-10-21T14:00:00+09:00',
    fulfillmentPeriod: '2026年11月1日 〜 2027年10月31日',
    budgetEstimate: '約 9,500,000 円',
    summary: '庁舎内執務室、廊下、階段、会議室、給湯室等の日常清掃および月次定期床面洗浄ワックス塗布作業。',
    keyRequirements: [
      'ビルクリーニング技能士の常駐配置',
      '庁舎セキュリティ入退館管理の遵守'
    ],
    targetAudience: 'ビルメンテナンス業者、清掃サービス企業',
    specDocUrl: 'https://www.cao.go.jp/procurement/20260930_cleaning_spec.pdf',
    officialUrl: 'https://www.kkj.go.jp/search/detail?id=bid-2026-007',
    tags: ['清掃', 'ビルメン', '庁舎管理', '役務C等級'],
    source: 'kkj_portal'
  },
  {
    id: 'bid-2026-008',
    title: '総務省 電波利用状況調査におけるオンライン集計システムの機能改修および性能改善業務',
    agency: '総務省',
    agencyCode: 'mic',
    portalSource: '官公需情報ポータル（総務省 調達公告）',
    category: 'it_service',
    procurementType: '一般競争入札（総合評価落札方式）',
    qualifiedGrade: 'B',
    requiredQualifications: ['全省庁統一資格（役務の提供等）B等級以上', '全国'],
    region: 'kanto',
    publishedAt: '2026-09-29T14:00:00+09:00',
    submissionDeadline: '2026-10-18T17:00:00+09:00',
    clarificationDeadline: '2026-10-08T17:00:00+09:00',
    openingDate: '2026-10-19T10:00:00+09:00',
    fulfillmentPeriod: '契約締結日 〜 2027年3月19日',
    budgetEstimate: '約 22,000,000 円',
    summary: '電波利用状況オンライン申告システムのPostgreSQLデータベースクエリ最適化、UIレスポンシブ対応、および電子証明書ログイン機能の改修業務。',
    keyRequirements: [
      'Linux / PostgreSQL環境での大規模トランザクションチューニング実績',
      '政府標準利用規約に準拠したセキュアプログラミング',
      '単体・結合テスト自動化スクリプトの納品'
    ],
    targetAudience: 'システムインテグレーター、データベースチューニング専業企業',
    specDocUrl: 'https://www.soumu.go.jp/procurement/20260929_radio_spec.pdf',
    officialUrl: 'https://www.kkj.go.jp/search/detail?id=bid-2026-008',
    tags: ['システム開発', 'PostgreSQL', 'DB最適化', '総務省', '役務B等級'],
    source: 'kkj_portal'
  }
];
