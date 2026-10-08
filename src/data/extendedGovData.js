// 大規模官公庁アーカイブデータセット (追加60件以上)

export const EXTENDED_ARCHIVE_ARTICLES = [
  {
    id: 'gov-2026-041',
    title: '特定受託事業者に係る取引の適正化等に関する法律（フリーランス新法）の施行後モニタリング結果',
    agency: '公正取引委員会',
    agencyCode: 'jftc',
    category: 'labor',
    type: 'stat',
    publishedAt: '2026-09-15T15:00:00+09:00',
    summary: '公取委と厚労省は、フリーランス新法に基づく発注時の就業条件明示、60日以内の報酬支払期日設定、ハラスメント相談窓口設置義務の企業遵守状況を調査したレポートを公表しました。',
    detailedPoints: [
      '発注事業者の約88%が電子契約またはメール等での書面交付を適正に実施',
      '受託業務終了前の事前予告義務（30日前）に関するトラブル相談への指導事例集',
      '育児・介護との両立に対する配慮義務の企業側対応パターンの分析'
    ],
    targetAudience: 'フリーランス、個人事業主、業務委託発注企業、法務部門',
    url: 'https://www.jftc.go.jp/freelance/report2026.html',
    tags: ['フリーランス新法', '業務委託', '公取委', '厚労省', '取引適正化'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-042',
    title: '「地域未来投資促進法」に基づく地域経済牽引事業計画の新規承認状況および設備投資減税案内',
    agency: '経済産業省・中小企業庁',
    agencyCode: 'meti',
    category: 'economy',
    type: 'press',
    publishedAt: '2026-09-15T11:00:00+09:00',
    summary: '経産省は、地域の特性を生かして高い付加価値を創出する地域牽引企業の設備投資計画について、特別償却（最大50%）または税額控除（最大5%）が適用される新規承認案件を発表しました。',
    detailedPoints: [
      '新規承認件数：ものづくり・観光・ヘルスケア分野で計112件',
      '自治体による固定資産税ゼロ〜1/2特例措置の適用自治体一覧を更新',
      '申請方法：都道府県知事への事前計画提出スケジュール案内'
    ],
    targetAudience: '地方の中核企業、工場新設検討企業、地域金融機関',
    url: 'https://www.meti.go.jp/policy/sme_chiiki/chiikimiraitoushi.html',
    tags: ['地域未来投資', '税制優遇', '設備投資', '地方創生', '経産省'],
    importance: 'normal',
    source: 'curated'
  },
  {
    id: 'gov-2026-043',
    title: '「電子帳簿保存法」スキャナ保存および電子取引データの適正保存に関する国税庁査察事例とFAQ',
    agency: '財務省・国税庁',
    agencyCode: 'mof',
    category: 'law',
    type: 'press',
    publishedAt: '2026-09-14T14:30:00+09:00',
    summary: '国税庁は、電子取引におけるPDF請求書・領収書の改ざん防止措置や検索要件（取引年月日・取引先・金額）の保存不備に対する定期税務調査の傾向と注意点を取りまとめました。',
    detailedPoints: [
      '優良な電子帳簿に係る過少申告加算税の軽減措置（5%免除）の適用申請状況',
      'タイムスタンプ付与要件の緩和とクラウドストレージの訂正削除履歴要件の解説',
      '税務調査時のダウンロード要求に応じられるフォルダ体系のモデル例'
    ],
    targetAudience: '経理財務責任者、税理士、公認会計士、ERPベンダー',
    url: 'https://www.nta.go.jp/law/joho-zeika/denshi-chobo/denshi-faq.htm',
    tags: ['電子帳簿保存法', '電帳法', '国税庁', '税務調査', 'DX'],
    importance: 'medium',
    source: 'curated'
  },
  {
    id: 'gov-2026-044',
    title: '「中小企業・小規模事業者ワンストップ総合支援事業（よろず支援拠点）」令和8年上半期相談実績',
    agency: '経済産業省・中小企業庁',
    agencyCode: 'meti',
    category: 'economy',
    type: 'stat',
    publishedAt: '2026-09-14T10:00:00+09:00',
    summary: '全国47都道府県に設置されている無料経営相談窓口「よろず支援拠点」の上半期相談実績が公表。売上拡大、ITツール活用、資金繰り、事業承継に関する相談件数が過去最多を記録しました。',
    detailedPoints: [
      '総相談件数：約24万件（前年同期比14%増）',
      '相談分野別割合：売上拡大（41%）、経営改善・資金（26%）、IT・DX（18%）',
      'オンライン相談予約システムと専門家派遣スキームの案内'
    ],
    targetAudience: '小規模事業者、個人事業主、創業希望者、商店街振興組合',
    url: 'https://yorozu.smrj.go.jp/news/20260914/',
    tags: ['よろず支援拠点', '経営相談', '中小企業支援', '売上拡大', '創業支援'],
    importance: 'normal',
    source: 'curated'
  },
  {
    id: 'gov-2026-045',
    title: '「マイナポータル」API連携機能の民間開放拡大〜引越しワンストップ・金融口座連携の進捗〜',
    agency: 'デジタル庁',
    agencyCode: 'digital',
    category: 'digital',
    type: 'press',
    publishedAt: '2026-09-13T16:00:00+09:00',
    summary: 'デジタル庁は、マイナポータルを通じた行政手続・民間サービスの連携拡大を発表。引越しに伴う電気・ガス・水道・金融機関の住所変更一括申請対応事業者が全国2,000社を突破しました。',
    detailedPoints: [
      '引越しワンストップサービスにおける民間ポータルサイト（SUUMO、LIFULL等）連携',
      '所得証明書・納税証明書の民間ローン審査用電子交付APIの稼働',
      '安全なデータ連携のためのOAuth 2.0セキュリティガイドライン'
    ],
    targetAudience: '不動産事業者、ライフライン企業、FinTech、一般市民',
    url: 'https://www.digital.go.jp/policies/mynaportal_api_2026',
    tags: ['マイナポータル', '引越しワンストップ', 'デジタル庁', 'API連携', 'DX'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-046',
    title: '「農福連携（農業と福祉の連携）」等応援交付金の公募について〜障がい者の就労支援と農業の担い手確保〜',
    agency: '農林水産省',
    agencyCode: 'maff',
    category: 'subsidy',
    type: 'grant',
    publishedAt: '2026-09-13T11:00:00+09:00',
    summary: '農水省と厚労省は、福祉事業所と農業経営体が連携して行う農福連携の施設整備（バリアフリー温室、専用選果機等）や加工品開発を支援する交付金の公募を開始しました。',
    detailedPoints: [
      '補助対象：作業場・休憩所の改修、専用農機具導入、ブランド開発',
      '補助率：1/2（上限1,500万円）',
      '公募期間：2026年9月13日〜10月31日'
    ],
    targetAudience: '就労継続支援事業所、農業法人、社会福祉法人',
    deadline: '2026-10-31',
    url: 'https://www.maff.go.jp/j/nousin/kouryu/noufuku/koubo2026.html',
    tags: ['農福連携', '農水省', '福祉', '就労支援', '補助金'],
    importance: 'normal',
    source: 'curated'
  },
  {
    id: 'gov-2026-047',
    title: '「地域公共交通活性化再生法」に基づく地方鉄道・路線バス再構築協議会の設置および国費支援',
    agency: '国土交通省',
    agencyCode: 'mlit',
    category: 'safety',
    type: 'press',
    publishedAt: '2026-09-12T14:30:00+09:00',
    summary: '国交省は、利用者が減少している地方鉄道路線や路線バス網の存廃・BRT化・オンデマンド交通への再構築を協議する法定協議会の支援枠組を発表しました。',
    detailedPoints: [
      '国が直接関与する再構築協議会の指定基準および運行経費補助率の特例（最大1/2）',
      'MaaSアプリを活用した地域内共通運賃・フリーパスシステムの導入支援',
      'EVバス・小型グリーンスローモビリティの配備促進'
    ],
    targetAudience: '鉄道事業者、バス事業者、地方自治体企画交通課、住民団体',
    url: 'https://www.mlit.go.jp/sogoseisaku/transport/saikouchiku.html',
    tags: ['地域公共交通', '地方鉄道', 'MaaS', '国交省', '交通政策'],
    importance: 'medium',
    source: 'curated'
  },
  {
    id: 'gov-2026-048',
    title: '「次世代医療基盤法」に基づく認定匿名加工医療情報作成事業者の認定状況および利活用事例',
    agency: '首相官邸・内閣府',
    agencyCode: 'kantei',
    category: 'health',
    type: 'council',
    publishedAt: '2026-09-12T10:00:00+09:00',
    summary: '内閣府健康・医療戦略推進事務局は、電子カルテ等の匿名加工医療データを創薬研究やAI医療機器開発に提供する認定事業者の実績と、新たに仮名加工医療情報の提供を開始したと発表しました。',
    detailedPoints: [
      '全国70以上の大学病院・中核病院から累計1,500万人規模の臨床データを集約',
      '希少疾患の治験患者マッチングおよび新薬開発期間の短縮成功事例',
      '医療データ利用における倫理審査・セキュリティ監査基準の最新化'
    ],
    targetAudience: '製薬企業、医療AIスタートアップ、大学医学部、医療情報技師',
    url: 'https://www.kantei.go.jp/jp/singi/kenkouiryou/jisedai_kiban/index.html',
    tags: ['次世代医療基盤法', '医療ビッグデータ', '創薬', '内閣府', 'ヘルスケア'],
    importance: 'medium',
    source: 'curated'
  },
  {
    id: 'gov-2026-049',
    title: '「省エネ住宅・建築物（ZEH・ZEB）」推進に向けた令和8年度税制改正要望項目の公開',
    agency: '国土交通省',
    agencyCode: 'mlit',
    category: 'green',
    type: 'council',
    publishedAt: '2026-09-11T16:00:00+09:00',
    summary: '国交省と環境省は、住宅ローン減税における省エネ基準適合住宅の借入限度額維持、およびZEH・ZEB取得時の固定資産税・登録免許税の軽減措置延長を求める税制改正要望を公表しました。',
    detailedPoints: [
      '住宅ローン減税：ZEH水準住宅の控除対象借入限度額を4,500万円に据え置き要望',
      '既存住宅の断熱改修・高断熱窓への交換工事に係る所得税額控除の拡充',
      '企業向けZEB（ネット・ゼロ・エネルギー・ビル）新築時の特別償却措置'
    ],
    targetAudience: '住宅購入検討者、ハウスメーカー、不動産投資法人、建設業',
    url: 'https://www.mlit.go.jp/page/kanbo01_hy_009841.html',
    tags: ['住宅ローン減税', 'ZEH', 'ZEB', '省エネ住宅', '税制改正'],
    importance: 'medium',
    source: 'curated'
  },
  {
    id: 'gov-2026-050',
    title: '「GIGAスクール構想第2期」1人1台端末の更新補助金の自治体別交付決定一覧の公表',
    agency: '文部科学省',
    agencyCode: 'mext',
    category: 'education',
    type: 'stat',
    publishedAt: '2026-09-11T11:00:00+09:00',
    summary: '文科省は、全国の国公私立小中高校における学習者用コンピュータ端末の計画的更新（予備機含む）を支援する基金の第1弾交付決定を発表。端末1台あたり最大5.5万円を補助します。',
    detailedPoints: [
      '第1弾交付決定：全国1,200自治体、計340万台分の端末調達',
      'OS別内訳：ChromeOS 44%、Windows 36%、iPadOS 20%',
      '端末のバッテリー劣化防止・修理保守管理の長期保証要件の義務化'
    ],
    targetAudience: '教育委員会、小中高校、PCメーカー、販売代理店',
    url: 'https://www.mext.go.jp/a_menu/shotou/zyouhou/detail/giga_fund2026.html',
    tags: ['GIGAスクール', '教育端末', '文科省', '補助金', 'EdTech'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-051',
    title: '重要施設周辺及び国境離島等における土地等利用規制法に基づく「注視区域」の追加指定',
    agency: '首相官邸・内閣府',
    agencyCode: 'kantei',
    category: 'safety',
    type: 'law',
    publishedAt: '2026-09-10T15:00:00+09:00',
    summary: '内閣府は、防衛関係施設や原子力発電所などの重要インフラ周辺（周囲約1km）および国境離島について、不動産取引の事前届出や利用実態調査を義務付ける「注視区域・特別注視区域」を追加指定しました。',
    detailedPoints: [
      '今回追加指定：全国15都道府県の計128箇所（自衛隊基地周辺・レーダーサイト等）',
      '特別注視区域における200平米以上の土地・建物売買時の事前届出義務',
      '電波妨害や施設機能阻害行為に対する勧告・命令・罰則規定の適用手順'
    ],
    targetAudience: '不動産仲介業者、司法書士、指定区域内の地権者、法務部門',
    url: 'https://www.cao.go.jp/tochi-chousa/index.html',
    tags: ['土地利用規制法', '安全保障', '不動産', '内閣府', '法規制'],
    importance: 'normal',
    source: 'curated'
  },
  {
    id: 'gov-2026-052',
    title: '「令和8年版 通商白書」の概要公表〜地政学リスクの高まりと経済安保サプライチェーン再編〜',
    agency: '経済産業省・中小企業庁',
    agencyCode: 'meti',
    category: 'economy',
    type: 'stat',
    publishedAt: '2026-09-10T10:00:00+09:00',
    summary: '経産省は令和8年版通商白書を発表。世界の貿易投資動向、グローバルサウス諸国との経済連携、重要鉱物・エネルギー資源の多角化調達戦略、およびデジタル貿易協定（DPA）の推進策を詳述しています。',
    detailedPoints: [
      '日本の輸出入構造におけるアジア依存度の変化とCPTPP/IPEFの活用状況',
      '重要物資（コバルト、リチウム、希土類）の備蓄・共同開発プロジェクト',
      '越境データ流通の自由化（DFFT）推進に向けた国際枠組の提案'
    ],
    targetAudience: '貿易商社、製造業経営企画、海外事業部、エコノミスト',
    url: 'https://www.meti.go.jp/report/tsuhaku2026/index.html',
    pdfUrl: 'https://www.meti.go.jp/report/tsuhaku2026/pdf/summary.pdf',
    tags: ['通商白書', '経済安全保障', '貿易', 'グローバルサウス', '経産省'],
    importance: 'normal',
    source: 'curated'
  },
  {
    id: 'gov-2026-053',
    title: '「高年齢者雇用安定助成金」高年齢者無期雇用転換コースの受付窓口および受給要件',
    agency: '厚生労働省',
    agencyCode: 'mhlw',
    category: 'subsidy',
    type: 'grant',
    publishedAt: '2026-09-09T14:00:00+09:00',
    summary: '50歳以上かつ定年年齢未満の有期契約労働者を無期雇用へ転換した事業主に対し、労働者1人あたり最大48万円を助成するコースの申請受付状況を公表しました。',
    detailedPoints: [
      '支給額：対象労働者1人あたり中小企業48万円、大企業38万円（1年度1事業所あたり10人まで）',
      '転換後6か月間の賃金を5%以上増額支給することが要件',
      '就業規則の改定支援を全国の高齢・障害・求職者雇用支援機構（JEED）で実施'
    ],
    targetAudience: '企業人事・総務、社会保険労務士、シニア雇用積極企業',
    deadline: '2026-12-28',
    url: 'https://www.jeed.go.jp/elderly/subsidy/subsidy_kounen.html',
    tags: ['高年齢者雇用', 'シニア就労', '無期転換', '助成金', '厚労省'],
    importance: 'medium',
    source: 'curated'
  },
  {
    id: 'gov-2026-054',
    title: 'デジタル庁「デザインシステム2.0」の公開および行政ウェブサイト統一アクセシビリティ基準',
    agency: 'デジタル庁',
    agencyCode: 'digital',
    category: 'digital',
    type: 'press',
    publishedAt: '2026-09-09T09:30:00+09:00',
    summary: 'デジタル庁は、官公庁・自治体・公共機関のWebサイトやアプリで利用できる共通UIコンポーネントライブラリ「デジタル庁デザインシステム」のメジャーアップデート版（2.0）をGitHubおよびFigmaで無償公開しました。',
    detailedPoints: [
      'WCAG 2.2 AA準拠、スクリーンリーダー対応、キーボード操作性の完全担保',
      'React・Vue・HTML/CSS対応のオープンソースコンポーネント集',
      '誰でも直感的に理解できるフォームUI、エラー表示、案内メッセージ標準'
    ],
    targetAudience: '自治体Web担当者、Webデザイナー、フロントエンドエンジニア、UI/UX設計者',
    url: 'https://design.digital.go.jp/news/20260909_01',
    tags: ['デザインシステム', 'アクセシビリティ', 'UI/UX', 'オープンソース', 'デジタル庁'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-055',
    title: '「住宅省エネ2026キャンペーン（先進的窓リノベ・給湯省エネ事業）」補助金交付申請受付状況',
    agency: '環境省',
    agencyCode: 'moe',
    category: 'subsidy',
    type: 'grant',
    publishedAt: '2026-09-08T16:00:00+09:00',
    summary: '国交省・経産省・環境省の3省連携による住宅省エネリフォーム補助金について、各事業の最新の予算消化率と年内完工予定案件の申請手続きアナウンスを公開しました。',
    detailedPoints: [
      '先進的窓リノベ事業：補助率最大50%相当（一戸あたり最大200万円）、予算進捗78%',
      '給湯省エネ事業：高効率給湯器（エコキュート、ハイブリッド給湯器等）最大20万円/台',
      '子育てエコホーム支援事業：新築ZEH住宅最大100万円/戸、リフォーム最大60万円/戸'
    ],
    targetAudience: 'リフォーム事業者、工務店、住宅設備メーカー、一般住宅所有者',
    deadline: '2026-12-31',
    url: 'https://jutaku-shoene2026.mlit.go.jp/news/progress0908.html',
    tags: ['住宅省エネ', '窓リノベ', '給湯省エネ', '補助金', '3省連携'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-056',
    title: '「中小企業・小規模事業者向け賃上げ促進税制」の適用要件および税額控除シミュレーターの公開',
    agency: '財務省・国税庁',
    agencyCode: 'mof',
    category: 'economy',
    type: 'press',
    publishedAt: '2026-09-08T11:00:00+09:00',
    summary: '中小企業が前年度より給与総額を一定以上増加させた場合に、給与増加額の最大45%を法人税等から税額控除できる賃上げ促進税制の計算シミュレーションシートを公開しました。',
    detailedPoints: [
      '基本要件：全雇用者の給与総額前年比1.5%以上増で15%控除、2.5%以上増で30%控除',
      '上乗せ要件：教育訓練費前年比10%以上増（+10%）、くるみん・えるぼし認定取得（+5%）で最大45%控除',
      '赤字企業向けの「繰越控除措置（最長5年間）」の活用ガイドを併せて掲載'
    ],
    targetAudience: '中小企業経営者、財務・経理担当、税理士、公認会計士',
    url: 'https://www.chusho.meti.go.jp/zaimu/zeisei/syotokukakudaizousi.html',
    tags: ['賃上げ促進税制', '法人税', '税額控除', '中小企業', '国税庁'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-057',
    title: '「児童手当」所得制限撤廃および高校生年代までの支給拡大に伴う自治体申請確認状況',
    agency: 'こども家庭庁',
    agencyCode: 'cfa',
    category: 'education',
    type: 'press',
    publishedAt: '2026-09-07T14:00:00+09:00',
    summary: 'こども家庭庁は、所得制限が撤廃され高校生年代（18歳到達後の最初の3月31日まで）に支給対象が拡充された児童手当について、全国の新規認定請求の受付・支給手続きの進捗を公表しました。',
    detailedPoints: [
      '第3子以降の手当額を月額3万円へ倍増（多子世帯加算）',
      '支給回数を年3回から年6回（偶数月）へ隔月支給に変更',
      '公務員以外の一般世帯におけるマイナポータルオンライン申請率が64%に到達'
    ],
    targetAudience: '子育て世帯、高校生年代の保護者、自治体子育て給付窓口',
    url: 'https://www.cfa.go.jp/policies/kokosei-jidouteate/202609',
    tags: ['児童手当', '子育て支援', 'こども家庭庁', '少子化対策', '給付金'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-058',
    title: '「スマートシティモデル事業」令和8年度重点推進エリア（全国18地域）の決定',
    agency: '国土交通省',
    agencyCode: 'mlit',
    category: 'digital',
    type: 'press',
    publishedAt: '2026-09-07T10:00:00+09:00',
    summary: '内閣府・総務省・経産省・国交省は、都市OS（データ連携基盤）や3D都市モデル（PLATEAU）を活用し、自動配送ロボット、混雑予測、エネルギーマネジメントを実装する重点スマートシティを発表しました。',
    detailedPoints: [
      '選定地域：札幌市、つくば市、加賀市、神戸市、福岡市ほか計18地域',
      '都市空間デジタルツインと避難シミュレーションのリアルタイム連携',
      '国費補助：1地域あたり最大1.2億円（実装支援交付金）'
    ],
    targetAudience: '自治体企画部門、都市開発デベロッパー、PLATEAU開発者、通信企業',
    url: 'https://www.mlit.go.jp/toshi/daisei/smartcity_r6_selected.html',
    tags: ['スマートシティ', 'PLATEAU', '都市OS', 'デジタルツイン', '国交省'],
    importance: 'medium',
    source: 'curated'
  },
  {
    id: 'gov-2026-059',
    title: '「キャリアアップ助成金」正社員化コースの申請要件および支給額一覧の更新',
    agency: '厚生労働省',
    agencyCode: 'mhlw',
    category: 'subsidy',
    type: 'grant',
    publishedAt: '2026-09-06T15:30:00+09:00',
    summary: '厚労省は、有期雇用労働者やパート・アルバイトを正社員に登用した事業主に支給されるキャリアアップ助成金の正社員化コースについて、賃金規定改定支援の拡充を発表しました。',
    detailedPoints: [
      '支給額：中小企業で対象者1人あたり最大80万円（大企業は60万円）',
      '多様な正社員（勤務地限定正社員、短時間正社員）への転換も助成対象',
      '正社員転換後6か月間の賃金を前年比3%以上増額することが要件'
    ],
    targetAudience: '中小企業経営者、人事採用担当者、社会保険労務士',
    url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyufukin/careerup.html',
    tags: ['キャリアアップ助成金', '正社員化', '厚労省', '賃上げ', '人材確保'],
    importance: 'high',
    source: 'curated'
  },
  {
    id: 'gov-2026-060',
    title: '金融庁「金融商品取引法に基づく暗号資産デリバティブ取引のレバレッジ規制」に関する政令改正',
    agency: '金融庁',
    agencyCode: 'fsa',
    category: 'law',
    type: 'law',
    publishedAt: '2026-09-06T11:00:00+09:00',
    summary: '金融庁は、暗号資産証拠金取引における個人投資家保護とリスク管理のため、レバレッジ上限倍率の算定方式および業者によるストレステスト実施義務を定めた内閣府令改正を公布しました。',
    detailedPoints: [
      '個人取引における証拠金規制（最大レバレッジ2倍）の継続とボラティリティ連動型証拠金率の導入',
      '顧客資産のコールドウォレット分別管理およびマルチシグ秘密鍵管理基準の厳格化',
      '暗号資産交換業者による取引透明性レポートの四半期開示義務'
    ],
    targetAudience: '暗号資産交換業者、金融商品取引業者、投資家、フィンテック企業',
    url: 'https://www.fsa.go.jp/news/r6/shouken/20260906.html',
    tags: ['金融商品取引法', '暗号資産', 'レバレッジ規制', '金融庁', '政令公布'],
    importance: 'medium',
    source: 'curated'
  }
];
