import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Bookmark, 
  RefreshCw, 
  Rss, 
  Bell, 
  History,
  X,
  SlidersHorizontal,
  HelpCircle
} from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onRefresh, 
  isRefreshing, 
  savedCount, 
  onOpenSaved, 
  onOpenFeeds, 
  onOpenAlerts,
  onOpenHistory,
  onOpenFaq,
  lastFetchedTime,
  totalArticlesCount
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Notice Bar */}
      <div className="bg-gov-blue-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>日本国 官公庁オープンポータル・公式RSS連携システム</span>
            <span className="hidden md:inline text-gov-blue-100">|</span>
            <span className="hidden md:inline text-gov-blue-100 text-[11px]">
              デジタル庁・経産省・厚労省・総務省・首相官邸等 随時更新中
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-gov-blue-100">
            {lastFetchedTime && (
              <span>最終同期: {new Date(lastFetchedTime).toLocaleTimeString('ja-JP')}</span>
            )}
            <span className="bg-gov-blue-800 px-2 py-0.5 rounded font-mono">
              収載: {totalArticlesCount}件
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gov-blue-700 flex items-center justify-center text-white shadow-md group-hover:bg-gov-blue-800 transition">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-gov-blue-700 transition">
                    官公庁インフォ・ハブ
                  </h1>
                  <span className="text-[10px] font-semibold bg-gov-blue-50 text-gov-blue-700 px-1.5 py-0.5 rounded border border-gov-blue-200">
                    GovInfo JP
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  各府省庁の新着施策・補助金・法改正のワンストップ探索
                </p>
              </div>
            </a>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenSaved}
                className="relative p-2 text-slate-600 hover:text-gov-blue-700 hover:bg-slate-100 rounded-lg transition"
                title="保存済み記事"
              >
                <Bookmark className="w-5 h-5" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Input Field */}
          <div className="flex-1 max-w-xl mx-0 md:mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="キーワード検索（例: 補助金, 生成AI, マイナンバー, 労働法, 賃上げ）"
                className="w-full pl-10 pr-9 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue-500 focus:border-transparent transition placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition shadow-sm disabled:opacity-50"
              title="最新の省庁フィードを再取得"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-gov-blue-600' : ''}`} />
              <span>{isRefreshing ? '更新中...' : '最新取得'}</span>
            </button>

            {/* Keyword Alert Modal Button */}
            <button
              onClick={onOpenAlerts}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition shadow-sm"
              title="キーワードアラート設定"
            >
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              <span>アラート設定</span>
            </button>

            {/* Feed Manager Button */}
            <button
              onClick={onOpenFeeds}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition shadow-sm"
              title="省庁RSSソース管理"
            >
              <Rss className="w-3.5 h-3.5 text-orange-500" />
              <span>フィード管理</span>
            </button>

            {/* Reading History */}
            <button
              onClick={onOpenHistory}
              className="p-2 text-slate-600 hover:text-gov-blue-700 hover:bg-slate-100 rounded-lg transition"
              title="閲覧履歴"
            >
              <History className="w-4 h-4" />
            </button>

            {/* Bidding & Grade FAQ Guide */}
            {onOpenFaq && (
              <button
                onClick={onOpenFaq}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition shadow-2xs"
                title="入札・資格等級（A〜D）のFAQ＆解説ガイド"
              >
                <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                <span>入札FAQ</span>
              </button>
            )}

            {/* Saved Articles Drawer Trigger */}
            <button
              onClick={onOpenSaved}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-gov-blue-700 hover:bg-gov-blue-800 rounded-lg transition shadow-sm"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>後で見直す</span>
              <span className="bg-amber-400 text-gov-blue-900 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                {savedCount}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
