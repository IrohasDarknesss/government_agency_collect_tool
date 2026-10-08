// 官公需情報ポータルサイト（KKJ）公式検索API リアルタイム公共調達・入札公告データセット
import liveProcurementData from './liveKkjProcurement.json';

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

// 中小企業庁 官公需情報ポータルサイト（KKJ）公式APIから取得したリアルタイム実データ
export const INITIAL_PROCUREMENT_ARTICLES = (Array.isArray(liveProcurementData) && liveProcurementData.length > 0)
  ? liveProcurementData
  : [];
