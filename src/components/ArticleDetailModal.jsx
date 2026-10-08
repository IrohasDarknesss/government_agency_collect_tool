import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  FileText, 
  Bookmark, 
  Calendar, 
  Clock, 
  Building, 
  CheckCircle2, 
  Copy, 
  Share2, 
  Save, 
  Star,
  Tag,
  AlertCircle
} from 'lucide-react';
import { AGENCIES, INFO_TYPES } from '../data/mockGovData';

export default function ArticleDetailModal({
  article,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onUpdateBookmarkDetails,
  bookmarkData
}) {
  if (!isOpen || !article) return null;

  const [note, setNote] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [rating, setRating] = useState(1);
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (bookmarkData) {
      setNote(bookmarkData.userNote || '');
      setTagsInput((bookmarkData.userTags || []).join(', '));
      setRating(bookmarkData.rating || 1);
    } else {
      setNote('');
      setTagsInput('');
      setRating(1);
    }
  }, [article, bookmarkData]);

  const agencyMeta = AGENCIES.find(a => a.name === article.agency || a.id === article.agencyCode) || {
    name: article.agency,
    color: 'bg-slate-700 text-white'
  };

  const typeMeta = INFO_TYPES.find(t => t.id === article.type) || {
    label: '公的情報',
    badgeColor: 'bg-slate-100 text-slate-800'
  };

  const handleSaveMemo = () => {
    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (!isBookmarked) {
      onToggleBookmark(article, note, parsedTags, rating);
    } else {
      onUpdateBookmarkDetails(article.id, {
        userNote: note,
        userTags: parsedTags,
        rating
      });
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleCopySummary = () => {
    const text = `【${article.agency}】${article.title}\n公表日: ${new Date(article.publishedAt).toLocaleDateString('ja-JP')}\nURL: ${article.url}\n\n概要:\n${article.summary}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dateObj = new Date(article.publishedAt);
  const formattedDate = !isNaN(dateObj.getTime())
    ? `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日 ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`
    : '最新公表';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 transform transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded shadow-2xs ${agencyMeta.color}`}>
              {article.agency}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${typeMeta.badgeColor}`}>
              {typeMeta.label}
            </span>
            {article.importance === 'high' && (
              <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                重要施策
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
              title="要約とURLをクリップボードにコピー"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onToggleBookmark(article)}
              className={`p-1.5 rounded-lg border transition ${
                isBookmarked 
                  ? 'bg-amber-100 border-amber-300 text-amber-700' 
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100'
              }`}
              title={isBookmarked ? '保存解除' : '後で見直すリストに追加'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Title */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {article.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                公表日時: {formattedDate}
              </span>
              {article.deadline && (
                <span className="flex items-center gap-1 font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  <Clock className="w-3.5 h-3.5 text-rose-600" />
                  申請・意見募集締切: {article.deadline}
                </span>
              )}
            </div>
          </div>

          {/* Official Target Audience */}
          {article.targetAudience && (
            <div className="bg-gov-blue-50 border-l-4 border-gov-blue-600 p-3 rounded-r-lg text-xs">
              <span className="font-bold text-gov-blue-900 block mb-0.5">主な対象者・関係機関</span>
              <span className="text-gov-blue-800">{article.targetAudience}</span>
            </div>
          )}

          {/* Detailed Points (Key Takeaways) */}
          {article.detailedPoints && article.detailedPoints.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gov-blue-600" />
                発表の重要ポイント（要約）
              </h4>
              <ul className="space-y-2 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700">
                {article.detailedPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-gov-blue-100 text-gov-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Summary Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              本文・概要説明
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-white border border-slate-200 rounded-lg p-3">
              {article.summary}
            </p>
          </div>

          {/* Official External Links & Documents */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-gov-blue-700 hover:bg-gov-blue-800 rounded-lg shadow-sm transition"
            >
              <span>{article.agency} 公式発表ページを見る</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {article.pdfUrl && (
              <a
                href={article.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>公表資料・PDFダウンロード</span>
              </a>
            )}
          </div>

          {/* User's Custom Memo & Note Section */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
                マイメモ・社内共有ノート（後で見直すメモ）
              </h4>
              {saveSuccess && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  保存しました
                </span>
              )}
            </div>

            <div className="space-y-3 bg-amber-50/50 border border-amber-200/80 rounded-xl p-3.5">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="この施策に関する気付き、企画書への引用予定、社内共有用メモ、締切対応メモなどを自由に記録できます..."
                rows={3}
                className="w-full text-xs text-slate-800 bg-white border border-amber-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Custom Tags */}
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="タグ（カンマ区切り: 例: 2026予算, DX推進, 来週提案）"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-blue-500"
                  />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <span className="text-slate-500 font-medium">優先度:</span>
                  {[1, 2, 3].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-0.5 text-amber-400 hover:scale-110 transition"
                    >
                      <Star className={`w-4 h-4 ${rating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>

                {/* Save Memo Button */}
                <button
                  type="button"
                  onClick={handleSaveMemo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isBookmarked ? 'メモ更新' : '保存して記録'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            ID: <span className="font-mono">{article.id}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition"
          >
            閉じる
          </button>
        </div>

      </div>
    </div>
  );
}
