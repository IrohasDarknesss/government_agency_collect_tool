import React from 'react';
import { 
  Bookmark, 
  ExternalLink, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Coins, 
  ShieldCheck, 
  Building
} from 'lucide-react';
import { calculateBidMatchScore } from '../services/bidMatchingEngine';

export default function BidArticleCard({
  article,
  profile,
  isBookmarked,
  onToggleBookmark,
  onOpenDetail,
  searchQuery
}) {
  const matchResult = calculateBidMatchScore(article, profile);
  const { score, decision, decisionLabel, decisionColor, leadDays, matchReasons, riskFactors } = matchResult;

  // Highlight helper
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

  // Score color styling
  let scoreBadgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
  if (score >= 80) {
    scoreBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-400';
  } else if (score >= 60) {
    scoreBadgeColor = 'bg-amber-50 text-amber-800 border-amber-300';
  }

  // Submission deadline formatting
  const deadlineDate = new Date(article.submissionDeadline);
  const formattedDeadline = !isNaN(deadlineDate.getTime())
    ? `${deadlineDate.getMonth() + 1}/${deadlineDate.getDate()} (${['日','月','火','水','木','金','土'][deadlineDate.getDay()]}) ${String(deadlineDate.getHours()).padStart(2, '0')}:${String(deadlineDate.getMinutes()).padStart(2, '0')}`
    : '近日締切';

  return (
    <article className="group bg-white rounded-xl border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden relative">
      {/* Top Header Row */}
      <div className="p-4 pb-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Match Score Badge */}
            <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1 shadow-2xs ${scoreBadgeColor}`}>
              <span>🎯 適合度</span>
              <span className="font-mono text-sm">{score}%</span>
            </div>

            {/* Go / No-Go Decision Badge */}
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${decisionColor}`}>
              {decision === 'Go' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
              {decision === 'Review' && <AlertTriangle className="w-3 h-3 text-amber-600" />}
              {decision === 'No-Go' && <XCircle className="w-3 h-3 text-slate-500" />}
              <span>{decisionLabel}</span>
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(article)}
            className={`p-1.5 rounded-lg border transition duration-150 ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600 hover:bg-amber-100'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            title={isBookmarked ? '検討中リストから解除' : '後で検討（保存）'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Agency and Procurement Type */}
        <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500">
          <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
            {article.agency}
          </span>
          <span className="text-slate-400 text-[11px] truncate">
            {article.procurementType}
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onOpenDetail(article)}
          className="text-base font-bold text-slate-900 group-hover:text-indigo-600 leading-snug cursor-pointer transition line-clamp-2 mb-2"
        >
          {highlightText(article.title, searchQuery)}
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
          {highlightText(article.summary, searchQuery)}
        </p>

        {/* Key Matching Reasons Snippet */}
        {matchReasons.length > 0 && (
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-2 mb-2 text-[11px] text-emerald-900 flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{matchReasons[0]}</span>
          </div>
        )}

        {/* Qualification & Budget Row */}
        <div className="mt-auto pt-2 grid grid-cols-2 gap-2 text-xs border-t border-slate-100 text-slate-600">
          <div className="flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3 h-3 text-indigo-500 flex-shrink-0" />
            <span className="truncate">要件: 役務<strong>{article.qualifiedGrade}等級</strong></span>
          </div>
          <div className="flex items-center gap-1 text-[11px] justify-end">
            <Coins className="w-3 h-3 text-amber-600 flex-shrink-0" />
            <span className="truncate">{article.budgetEstimate || '規模記載なし'}</span>
          </div>
        </div>
      </div>

      {/* Footer Deadline Bar */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Clock className={`w-3.5 h-3.5 ${leadDays <= 7 ? 'text-rose-600' : 'text-slate-400'}`} />
          <span className="text-[11px]">
            提出締切: <strong>{formattedDeadline}</strong>
          </span>
          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
            leadDays <= 7 ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
          }`}>
            残{leadDays}日
          </span>
        </div>

        <button
          onClick={() => onOpenDetail(article)}
          className="text-indigo-600 hover:text-indigo-800 font-bold text-xs flex items-center gap-0.5"
        >
          <span>判定レポート・仕様書</span>
          <span>→</span>
        </button>
      </div>
    </article>
  );
}
