import React from 'react';
import { 
  TrendingUp, 
  Coins, 
  Scale, 
  Building2, 
  Calendar,
  Sparkles
} from 'lucide-react';

export default function StatsBar({ 
  articles, 
  onQuickFilterType, 
  onQuickFilterImportance,
  selectedType,
  onlyImportant
}) {
  const subsidyCount = articles.filter(a => a.type === 'grant').length;
  const lawCount = articles.filter(a => a.type === 'law' || a.type === 'pubcom').length;
  const importantCount = articles.filter(a => a.importance === 'high').length;
  const uniqueAgencies = new Set(articles.map(a => a.agency)).size;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        {/* Total Announcements Card */}
        <button
          onClick={() => onQuickFilterType('all')}
          className={`p-3 rounded-xl border text-left transition duration-150 flex items-center justify-between ${
            selectedType === 'all' && !onlyImportant
              ? 'bg-gov-blue-50 border-gov-blue-300 ring-1 ring-gov-blue-400'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">現在収載発表数</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-slate-900">{articles.length}</span>
              <span className="text-xs text-slate-500">件</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-gov-blue-100 text-gov-blue-700 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
        </button>

        {/* Subsidy / Grants Card */}
        <button
          onClick={() => onQuickFilterType('grant')}
          className={`p-3 rounded-xl border text-left transition duration-150 flex items-center justify-between ${
            selectedType === 'grant'
              ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-400'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">補助金・助成金公募</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-amber-700">{subsidyCount}</span>
              <span className="text-xs text-slate-500">件</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
            <Coins className="w-4 h-4" />
          </div>
        </button>

        {/* Laws & Regulations Card */}
        <button
          onClick={() => onQuickFilterType('law')}
          className={`p-3 rounded-xl border text-left transition duration-150 flex items-center justify-between ${
            selectedType === 'law'
              ? 'bg-purple-50 border-purple-300 ring-1 ring-purple-400'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">法令公布・パブコメ</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-purple-700">{lawCount}</span>
              <span className="text-xs text-slate-500">件</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
            <Scale className="w-4 h-4" />
          </div>
        </button>

        {/* Important Policies Card */}
        <button
          onClick={onQuickFilterImportance}
          className={`p-3 rounded-xl border text-left transition duration-150 flex items-center justify-between ${
            onlyImportant
              ? 'bg-rose-50 border-rose-300 ring-1 ring-rose-400'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">注目・重要施策</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black text-rose-600">{importantCount}</span>
              <span className="text-xs text-slate-500">件</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
        </button>

      </div>
    </div>
  );
}
