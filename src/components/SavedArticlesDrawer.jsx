import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  Download, 
  Copy, 
  CheckCircle2, 
  Search, 
  Tag, 
  ExternalLink,
  Calendar,
  Star,
  FileSpreadsheet,
  FileCode,
  BookOpen
} from 'lucide-react';
import { 
  exportBookmarksToMarkdown, 
  exportBookmarksToCSV 
} from '../services/api';

export default function SavedArticlesDrawer({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onOpenDetail,
  onUpdateBookmarkDetails
}) {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [copied, setCopied] = useState(false);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(bookmarks.flatMap(b => b.userTags || []))
  );

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter((item) => {
    const matchesSearch = 
      !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.userNote && item.userNote.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.agency.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = 
      selectedTag === 'all' || 
      (item.userTags && item.userTags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  // Handle Export Markdown
  const handleExportMarkdown = () => {
    const md = exportBookmarksToMarkdown(bookmarks);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `官公庁保存施策リスト_${new Date().toISOString().slice(0, 10)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Export CSV
  const handleExportCSV = () => {
    const csv = exportBookmarksToCSV(bookmarks);
    // Add BOM for Japanese Excel compatibility
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `官公庁保存施策_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyMarkdown = () => {
    const md = exportBookmarksToMarkdown(bookmarks);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-amber-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>後で見直す記事・保存リスト</span>
                <span className="text-xs bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full">
                  {bookmarks.length}件
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                メモやタグで整理し、企画書やレポート用に出力できます
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

        {/* Toolbar (Export / Search / Tags) */}
        <div className="p-4 border-b border-slate-100 bg-white space-y-3">
          {/* Export Actions Bar */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-500">エクスポート:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyMarkdown}
                disabled={bookmarks.length === 0}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition disabled:opacity-40"
                title="Markdownでクリップボードにコピー"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'コピー完了' : 'MDコピー'}</span>
              </button>

              <button
                onClick={handleExportMarkdown}
                disabled={bookmarks.length === 0}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition disabled:opacity-40"
                title="Markdownファイルとして保存"
              >
                <FileCode className="w-3.5 h-3.5 text-gov-blue-600" />
                <span>MD保存</span>
              </button>

              <button
                onClick={handleExportCSV}
                disabled={bookmarks.length === 0}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition disabled:opacity-40"
                title="Excel/CSV形式でダウンロード"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>CSV保存</span>
              </button>
            </div>
          </div>

          {/* Search inside Bookmarks */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="保存記事またはメモ内を検索..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-blue-500"
            />
          </div>

          {/* Filter by Tag Pills */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 text-[11px] flex-shrink-0">タグ:</span>
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition ${
                  selectedTag === 'all'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                すべて
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition flex-shrink-0 ${
                    selectedTag === tag
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <Bookmark className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
              <p className="text-sm font-medium">
                {bookmarks.length === 0 
                  ? '保存した記事はまだありません' 
                  : '検索条件に一致する保存記事がありません'}
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                記事カード右上のしおりマークをクリックすると、ここに保存されていつでも見直せます。
              </p>
            </div>
          ) : (
            filteredBookmarks.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 hover:border-amber-300 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition space-y-2 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-800">
                      {item.agency}
                    </span>
                    {item.rating > 1 && (
                      <div className="flex items-center">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onOpenDetail(item)}
                      className="text-xs text-gov-blue-600 hover:text-gov-blue-800 font-medium px-2 py-0.5 rounded hover:bg-gov-blue-50 transition"
                    >
                      詳細・メモ編集
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                      title="保存から削除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 
                  onClick={() => onOpenDetail(item)}
                  className="text-sm font-bold text-slate-900 group-hover:text-gov-blue-700 cursor-pointer line-clamp-2 leading-snug"
                >
                  {item.title}
                </h3>

                {/* User Memo Display if exists */}
                {item.userNote && (
                  <div className="bg-amber-50/70 border border-amber-200/70 rounded-lg p-2 text-xs text-slate-700">
                    <span className="font-bold text-amber-900 text-[10px] block mb-0.5">📌 マイメモ:</span>
                    <p className="line-clamp-2">{item.userNote}</p>
                  </div>
                )}

                {/* Tags and Saved Date */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <div className="flex flex-wrap gap-1">
                    {(item.userTags || []).map((t, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded text-[10px]">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span>保存: {new Date(item.savedAt).toLocaleDateString('ja-JP')}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>保存データはブラウザに自動保存されます</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition font-medium"
          >
            閉じる
          </button>
        </div>

      </div>
    </div>
  );
}
