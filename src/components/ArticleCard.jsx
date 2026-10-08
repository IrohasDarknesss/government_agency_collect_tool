import React from 'react';
import { 
  Bookmark, 
  ExternalLink, 
  Calendar, 
  Clock, 
  FileText, 
  Sparkles,
  AlertCircle,
  Tag
} from 'lucide-react';
import { AGENCIES, INFO_TYPES, CATEGORIES } from '../data/mockGovData';

export default function ArticleCard({
  article,
  isBookmarked,
  onToggleBookmark,
  onOpenDetail,
  searchQuery,
  alertKeywords = []
}) {
  const agencyMeta = AGENCIES.find(a => a.name === article.agency || a.id === article.agencyCode) || {
    name: article.agency,
    color: 'bg-slate-700 text-white'
  };

  const typeMeta = INFO_TYPES.find(t => t.id === article.type) || {
    label: '公的情報',
    badgeColor: 'bg-slate-100 text-slate-800'
  };

  const categoryMeta = CATEGORIES.find(c => c.id === article.category);

  // Check if article matches user's keyword alert
  const matchingAlert = alertKeywords.find(kw => 
    kw.trim() && (
      article.title.toLowerCase().includes(kw.toLowerCase()) ||
      article.summary.toLowerCase().includes(kw.toLowerCase()) ||
      (article.tags || []).some(t => t.toLowerCase().includes(kw.toLowerCase()))
    )
  );

  // Format date
  const dateObj = new Date(article.publishedAt);
  const formattedDate = !isNaN(dateObj.getTime())
    ? `${dateObj.getFullYear()}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${String(dateObj.getDate()).padStart(2, '0')}`
    : '最新公表';

  // Highlight search query in text
  const highlightText = (text, query) => {
    if (!query || !query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-amber-200 text-slate-900 rounded-xs px-0.5 font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <article className="group bg-white rounded-xl border border-slate-200 hover:border-gov-blue-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden relative">
      
      {/* Top Banner & Metadata */}
      <div className="p-4 pb-3 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Agency Badge */}
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs ${agencyMeta.color}`}>
              {article.agency}
            </span>

            {/* Information Type */}
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${typeMeta.badgeColor}`}>
              {typeMeta.label}
            </span>

            {/* Importance Pill if High */}
            {article.importance === 'high' && (
              <span className="text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" />
                重要
              </span>
            )}

            {/* Keyword Alert Match Badge */}
            {matchingAlert && (
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded flex items-center gap-1 animate-pulse">
                <AlertCircle className="w-2.5 h-2.5 text-amber-700" />
                注目「{matchingAlert}」
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(article)}
            className={`p-1.5 rounded-lg border transition duration-150 ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600 hover:bg-amber-100'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            title={isBookmarked ? '保存解除' : '後で見直す（ブックマーク）'}
            aria-label={isBookmarked ? '保存解除' : '後で見直す'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onOpenDetail(article)}
          className="text-base font-bold text-slate-900 group-hover:text-gov-blue-700 leading-snug cursor-pointer transition line-clamp-2 mb-2"
        >
          {highlightText(article.title, searchQuery)}
        </h3>

        {/* Summary Snippet */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
          {highlightText(article.summary, searchQuery)}
        </p>

        {/* Deadline indicator if present */}
        {article.deadline && (
          <div className="mt-auto mb-2 text-xs flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 rounded px-2 py-1">
            <Clock className="w-3.5 h-3.5 text-rose-600" />
            <span>申請・意見締切: <strong>{article.deadline}</strong></span>
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-2">
            {article.tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx} 
                className="text-[10px] text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Details */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          {article.pdfUrl && (
            <a
              href={article.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-700 flex items-center gap-0.5 text-[11px] font-medium"
              title="公式PDF資料を開く"
            >
              <FileText className="w-3 h-3" />
              <span>PDF</span>
            </a>
          )}

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-gov-blue-700 flex items-center gap-1 text-[11px] font-medium"
            title="各省庁の公式元記事を開く"
          >
            <span>公式元記事</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => onOpenDetail(article)}
            className="text-gov-blue-700 hover:text-gov-blue-800 font-bold text-xs pl-1"
          >
            要約・メモ →
          </button>
        </div>
      </div>

    </article>
  );
}
