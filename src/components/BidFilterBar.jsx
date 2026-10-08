import React from 'react';
import { 
  Target, 
  RotateCcw, 
  Sliders, 
  Filter, 
  ArrowUpDown, 
  ShieldCheck, 
  Calendar,
  CheckCircle2,
  Check,
  HelpCircle
} from 'lucide-react';
import { PROCUREMENT_CATEGORIES, PROCUREMENT_GRADES, PROCUREMENT_REGIONS } from '../data/bidProcurementData';

export default function BidFilterBar({
  onlyHighMatch,
  setOnlyHighMatch,
  matchThreshold,
  setMatchThreshold,
  selectedCategory,
  setSelectedCategory,
  selectedGrade,
  setSelectedGrade,
  selectedRegion,
  setSelectedRegion,
  selectedDecision,
  setSelectedDecision,
  sortBy,
  setSortBy,
  onResetFilters,
  onOpenProfileModal,
  onOpenFaq,
  profile,
  resultCount,
  totalCount
}) {
  const isFiltered = 
    onlyHighMatch || 
    selectedCategory !== 'all' || 
    selectedGrade !== 'all' || 
    selectedRegion !== 'all' || 
    selectedDecision !== 'all';

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-3">
        {/* Main Action Bar: High Match Toggle & Profile Settings */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-indigo-50/70 via-slate-50 to-emerald-50/50 p-2.5 rounded-xl border border-indigo-100">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* The Toggle Button requested by user */}
            <button
              onClick={() => {
                if (onlyHighMatch) {
                  setOnlyHighMatch(false);
                } else {
                  setOnlyHighMatch(true);
                  if (!matchThreshold) setMatchThreshold(80);
                }
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-2 border shadow-xs ${
                onlyHighMatch
                  ? 'bg-indigo-700 text-white border-indigo-700 ring-2 ring-indigo-300'
                  : 'bg-white hover:bg-indigo-50 text-indigo-900 border-indigo-200'
              }`}
            >
              <Target className={`w-4 h-4 ${onlyHighMatch ? 'text-white' : 'text-indigo-600'}`} />
              <span>🎯 自社適合案件のみ（{matchThreshold}%以上）</span>
              {onlyHighMatch ? (
                <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded font-mono">
                  絞込中（解除可）
                </span>
              ) : (
                <span className="text-slate-400 text-[10px] font-normal">
                  OFF（全件表示）
                </span>
              )}
            </button>

            {/* Threshold Selector - Fully synchronized with onlyHighMatch */}
            <div className={`flex items-center gap-1.5 border rounded-lg px-2.5 py-1 text-xs transition ${
              onlyHighMatch ? 'bg-indigo-50 border-indigo-300 ring-1 ring-indigo-200' : 'bg-white border-slate-200'
            }`}>
              <span className="text-slate-500 font-medium text-[11px]">適合度:</span>
              <select
                value={onlyHighMatch ? matchThreshold : 0}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val === 0) {
                    setOnlyHighMatch(false);
                  } else {
                    setMatchThreshold(val);
                    setOnlyHighMatch(true);
                  }
                }}
                className={`bg-transparent font-bold focus:outline-none cursor-pointer ${
                  onlyHighMatch ? 'text-indigo-900' : 'text-slate-600'
                }`}
              >
                <option value={0}>全件表示（絞り込みなし）</option>
                <option value={80}>🎯 80% 以上（高適合・即Go推奨）</option>
                <option value={70}>70% 以上（中〜高適合）</option>
                <option value={60}>60% 以上（広めに抽出）</option>
                <option value={50}>50% 以上（見送り以外）</option>
                <option value={90}>90% 以上（厳選案件）</option>
              </select>
            </div>
          </div>

          {/* Profile & Counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              該当 <strong className="text-indigo-700 font-bold text-sm">{resultCount}</strong> / 全 {totalCount} 件
            </span>

            {/* FAQ Guide Button */}
            {onOpenFaq && (
              <button
                onClick={onOpenFaq}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200 rounded-lg shadow-2xs transition"
                title="A〜D等級の意味や自社設定理由のFAQガイドを見る"
              >
                <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                <span>入札・等級FAQ</span>
              </button>
            )}

            {/* Profile Config Trigger */}
            <button
              onClick={onOpenProfileModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:border-indigo-400 hover:bg-slate-50 rounded-lg shadow-2xs transition"
              title="自社資格・キーワード条件を編集"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-600" />
              <span>判定プロファイル設定</span>
            </button>
          </div>
        </div>

        {/* Secondary Detailed Filters */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 text-xs text-slate-700">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">区分:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                {PROCUREMENT_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Grade */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">要求等級:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                {PROCUREMENT_GRADES.map((g) => (
                  <option key={g.id} value={g.id}>{g.label}</option>
                ))}
              </select>
            </div>

            {/* Decision Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">機械判定:</span>
              <select
                value={selectedDecision}
                onChange={(e) => setSelectedDecision(e.target.value)}
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">全判定</option>
                <option value="Go">Go（応札推奨）のみ</option>
                <option value="Review">Review（要検討）のみ</option>
                <option value="No-Go">No-Go（見送り）のみ</option>
              </select>
            </div>
          </div>

          {/* Sort & Reset */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">並び替え:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="match_desc">🎯 適合度が高い順</option>
                <option value="deadline_asc">⏰ 提出締切が近い順</option>
                <option value="published_desc">新着公告順</option>
              </select>
            </div>

            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition"
                title="絞り込みを全解除"
              >
                <RotateCcw className="w-3 h-3" />
                <span>条件解除</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
