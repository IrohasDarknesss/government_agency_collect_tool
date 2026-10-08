import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Plus, 
  Trash2, 
  Tag, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';

const SUGGESTED_KEYWORDS = [
  '補助金', '助成金', '生成AI', 'DX', 'マイナンバー', 
  '賃上げ', 'リスキリング', 'インボイス', '省エネ', '子育て支援'
];

export default function KeywordAlertModal({
  isOpen,
  onClose,
  alertKeywords,
  onSaveAlerts,
  onApplyKeywordFilter
}) {
  if (!isOpen) return null;

  const [inputVal, setInputVal] = useState('');
  const [keywords, setKeywords] = useState([...alertKeywords]);

  const handleAdd = (word) => {
    const trimmed = (word || inputVal).trim();
    if (!trimmed) return;
    if (!keywords.includes(trimmed)) {
      const updated = [...keywords, trimmed];
      setKeywords(updated);
      onSaveAlerts(updated);
    }
    setInputVal('');
  };

  const handleRemove = (word) => {
    const updated = keywords.filter(k => k !== word);
    setKeywords(updated);
    onSaveAlerts(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 transform transition-all flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                注目キーワード・アラート通知設定
              </h2>
              <p className="text-xs text-slate-500">
                登録した単語が含まれる新着施策にアラートバッジが付きます
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Add Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              新しい注目キーワードを追加
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                placeholder="例: サイバーセキュリティ, 給付金, 半導体"
                className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => handleAdd()}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>追加</span>
              </button>
            </div>
          </div>

          {/* Active Keywords */}
          <div>
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
              <span>登録中キーワード ({keywords.length}個)</span>
              <span className="text-[11px] text-slate-400 font-normal">クリックで即座に絞り込み検索</span>
            </div>

            {keywords.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl text-center">
                登録中のキーワードはありません
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <div
                    key={kw}
                    className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-1.5 rounded-lg shadow-2xs group"
                  >
                    <span 
                      onClick={() => {
                        onApplyKeywordFilter(kw);
                        onClose();
                      }}
                      className="cursor-pointer hover:underline font-bold"
                      title="このキーワードで記事を検索"
                    >
                      {kw}
                    </span>
                    <button
                      onClick={() => handleRemove(kw)}
                      className="text-amber-500 hover:text-rose-600 transition"
                      title="削除"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-2">おすすめの頻出官公庁キーワード:</span>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_KEYWORDS.filter(k => !keywords.includes(k)).map((sug) => (
                <button
                  key={sug}
                  onClick={() => handleAdd(sug)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full transition flex items-center gap-1"
                >
                  <Plus className="w-3 h-3 text-slate-400" />
                  <span>{sug}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-start gap-2 text-xs text-slate-600">
            <Info className="w-4 h-4 text-gov-blue-600 flex-shrink-0 mt-0.5" />
            <span>
              キーワードはブラウザに安全に保存され、新着フィード取得時に自動で一致判定が行われます。
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition"
          >
            完了
          </button>
        </div>

      </div>
    </div>
  );
}
