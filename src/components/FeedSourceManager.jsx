import React, { useState } from 'react';
import { 
  X, 
  Rss, 
  Plus, 
  ExternalLink, 
  Check, 
  AlertCircle, 
  RefreshCw,
  Clock,
  Building
} from 'lucide-react';

export default function FeedSourceManager({
  isOpen,
  onClose,
  feeds,
  onToggleFeed,
  onAddFeed,
  onRefreshAll
}) {
  if (!isOpen) return null;

  const [feedName, setFeedName] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [feedUrl, setFeedUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedName.trim() || !feedUrl.trim()) {
      setErrorMsg('フィード名とURLは必須です');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await onAddFeed({
        name: feedName.trim(),
        agency: agencyName.trim() || '公的機関',
        url: feedUrl.trim()
      });
      setSuccessMsg('新しいフィードを追加しました');
      setFeedName('');
      setAgencyName('');
      setFeedUrl('');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.message || 'フィードの追加に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 transform transition-all flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Rss className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                官公庁・公的RSSフィード連携管理
              </h2>
              <p className="text-xs text-slate-500">
                自動取得する各省庁・自治体のオープンデータ/RSSを管理
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Registered Feeds List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                登録済みフィード一覧 ({feeds.length}件)
              </h3>
              <button
                onClick={onRefreshAll}
                className="text-xs text-gov-blue-600 hover:text-gov-blue-800 flex items-center gap-1 font-medium"
              >
                <RefreshCw className="w-3 h-3" />
                <span>一括最新同期</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {feeds.map((feed) => (
                <div
                  key={feed.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
                    feed.enabled 
                      ? 'bg-white border-slate-200 hover:border-slate-300' 
                      : 'bg-slate-50 border-slate-100 opacity-60'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-800 truncate">
                        {feed.name}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                        {feed.agency}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="truncate max-w-[280px] font-mono text-[10px]">
                        {feed.url}
                      </span>
                      {feed.lastUpdated && (
                        <span className="flex items-center gap-0.5 flex-shrink-0 text-[10px]">
                          <Clock className="w-2.5 h-2.5" />
                          {feed.lastUpdated}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Toggle Enabled Switch */}
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={feed.enabled}
                      onChange={() => onToggleFeed(feed.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gov-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Add Custom Feed Form */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-gov-blue-600" />
              自治体・独自RSSフィードの新規追加
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              都道府県、市町村、裁判所、独立行政法人などの公開RSSフィードURLを追加できます。
            </p>

            {errorMsg && (
              <div className="mb-3 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg flex items-center gap-1.5">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    フィード名 *
                  </label>
                  <input
                    type="text"
                    required
                    value={feedName}
                    onChange={(e) => setFeedName(e.target.value)}
                    placeholder="例: 東京都 報道発表"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    機関・自治体名
                  </label>
                  <input
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="例: 東京都庁"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  RSS / Atom URL *
                </label>
                <input
                  type="url"
                  required
                  value={feedUrl}
                  onChange={(e) => setFeedUrl(e.target.value)}
                  placeholder="https://www.metro.tokyo.lg.jp/rss/news.xml"
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-blue-500 font-mono"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gov-blue-700 hover:bg-gov-blue-800 text-white text-xs font-bold rounded-lg shadow-sm transition disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? '追加中...' : 'フィードを追加して同期'}</span>
                </button>
              </div>
            </form>
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
