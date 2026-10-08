import React from 'react';
import { X, History, ExternalLink, Calendar, Trash2 } from 'lucide-react';

export default function HistoryModal({
  isOpen,
  onClose,
  history,
  onOpenDetail,
  onClearHistory
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 transform transition-all flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                最近チェックした施策・記事の履歴
              </h2>
              <p className="text-xs text-slate-500">
                直近閲覧した官公庁情報の履歴 ({history.length}件)
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
        <div className="p-6 overflow-y-auto space-y-2 flex-1">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-xs">閲覧履歴はまだありません</p>
            </div>
          ) : (
            history.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onOpenDetail(item);
                  onClose();
                }}
                className="p-3 rounded-xl border border-slate-200 hover:border-gov-blue-300 hover:bg-slate-50 transition cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded">
                      {item.agency}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      閲覧: {new Date(item.viewedAt).toLocaleTimeString('ja-JP')}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-gov-blue-700 truncate">
                    {item.title}
                  </h4>
                </div>
                <span className="text-xs text-gov-blue-600 font-medium group-hover:translate-x-0.5 transition">
                  →
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>履歴を消去</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition"
          >
            閉じる
          </button>
        </div>

      </div>
    </div>
  );
}
