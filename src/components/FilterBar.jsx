import React from 'react';
import { 
  CATEGORIES, 
  AGENCIES, 
  INFO_TYPES 
} from '../data/mockGovData';
import { 
  Filter, 
  RotateCcw, 
  Calendar, 
  ArrowUpDown,
  Building,
  Tag,
  Check
} from 'lucide-react';

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  selectedAgency,
  setSelectedAgency,
  selectedType,
  setSelectedType,
  selectedDateRange,
  setSelectedDateRange,
  sortBy,
  setSortBy,
  onlyImportant,
  setOnlyImportant,
  onResetFilters,
  resultCount
}) {
  const isFiltered = 
    selectedCategory !== 'all' || 
    selectedAgency !== 'all' || 
    selectedType !== 'all' || 
    selectedDateRange !== 'all' ||
    onlyImportant;

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-3">
        
        {/* Genre / Category Horizontal Scroll Pills */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-gov-blue-600" />
              ジャンル別絞り込み
            </span>
            <span className="text-xs text-slate-500">
              該当 <strong className="text-gov-blue-700 font-bold">{resultCount}</strong> 件
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150 flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-gov-blue-700 text-white border-gov-blue-700 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Secondary Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100 text-xs">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Agency Select */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">省庁:</span>
              <select
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                {AGENCIES.map((ag) => (
                  <option key={ag.id} value={ag.id}>
                    {ag.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Select */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">種別:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                {INFO_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Select */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">期間:</span>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">全期間</option>
                <option value="today">本日</option>
                <option value="3days">過去3日以内</option>
                <option value="week">今週 (7日以内)</option>
                <option value="month">今月 (30日以内)</option>
              </select>
            </div>

            {/* Only Important Toggle */}
            <label className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg px-2.5 py-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyImportant}
                onChange={(e) => setOnlyImportant(e.target.checked)}
                className="rounded border-slate-300 text-gov-blue-600 focus:ring-gov-blue-500 w-3.5 h-3.5"
              />
              <span className="font-medium text-slate-700">重要施策・公募のみ</span>
            </label>
          </div>

          {/* Right side: Sorting & Clear */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Sort Order */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">順序:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="date-desc">新着順</option>
                <option value="importance">重要度順</option>
                <option value="deadline">締切が近い順</option>
                <option value="title">タイトル順</option>
              </select>
            </div>

            {/* Reset Filter Button */}
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition"
                title="すべてのフィルターを解除"
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
