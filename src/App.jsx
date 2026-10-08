import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import ArticleCard from './components/ArticleCard';
import ArticleDetailModal from './components/ArticleDetailModal';
import SavedArticlesDrawer from './components/SavedArticlesDrawer';
import FeedSourceManager from './components/FeedSourceManager';
import KeywordAlertModal from './components/KeywordAlertModal';
import HistoryModal from './components/HistoryModal';

// Bidding & Procurement Add-on Components
import BidArticleCard from './components/BidArticleCard';
import BidDetailModal from './components/BidDetailModal';
import BidFilterBar from './components/BidFilterBar';
import BidProfileModal from './components/BidProfileModal';
import { INITIAL_PROCUREMENT_ARTICLES } from './data/bidProcurementData';
import { 
  getCompanyProfile, 
  saveCompanyProfile, 
  calculateBidMatchScore,
  getBidBookmarks,
  saveBidBookmark,
  removeBidBookmark
} from './services/bidMatchingEngine';

import {
  fetchArticles,
  triggerFeedRefresh,
  fetchFeeds,
  addCustomFeed,
  toggleFeedState,
  fetchProcurementArticles,
  triggerProcurementRefresh,
  getBookmarks,
  saveBookmark,
  removeBookmark,
  updateBookmarkDetails,
  getKeywordAlerts,
  saveKeywordAlerts,
  getReadingHistory,
  addToHistory,
  OFFICIAL_FEEDS_CONFIG
} from './services/api';
import { 
  AlertCircle, 
  CheckCircle, 
  ChevronDown, 
  HelpCircle, 
  RefreshCw, 
  Sliders, 
  Target, 
  Layers, 
  Building2, 
  FileText,
  Briefcase
} from 'lucide-react';

export default function App() {
  // App Mode State: 'news' (省庁報道発表・政策) or 'procurement' (官公需・入札公告)
  const [activeTabMode, setActiveTabMode] = useState('procurement'); // デフォルトを入札モードにしてすぐ確認可能に

  // ================= 1. News Articles States =================
  const [articles, setArticles] = useState([]);
  const [feeds, setFeeds] = useState(OFFICIAL_FEEDS_CONFIG);
  const [bookmarks, setBookmarks] = useState([]);
  const [alertKeywords, setAlertKeywords] = useState([]);
  const [history, setHistory] = useState([]);
  const [lastFetchedTime, setLastFetchedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // News Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [onlyImportant, setOnlyImportant] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(18);

  // ================= 2. Procurement (Bidding) States =================
  const [biddingArticles, setBiddingArticles] = useState(INITIAL_PROCUREMENT_ARTICLES);
  const [companyProfile, setCompanyProfile] = useState(getCompanyProfile());
  const [bidBookmarks, setBidBookmarks] = useState(getBidBookmarks());

  // Bidding Filter States
  const [onlyHighMatch, setOnlyHighMatch] = useState(false); // ボタンで絞り込み・解除
  const [matchThreshold, setMatchThreshold] = useState(80); // しきい値 (デフォルト80%)
  const [bidCategory, setBidCategory] = useState('all');
  const [bidGrade, setBidGrade] = useState('all');
  const [bidRegion, setBidRegion] = useState('all');
  const [bidDecision, setBidDecision] = useState('all');
  const [bidSortBy, setBidSortBy] = useState('match_desc'); // 適合度順

  // Modals
  const [selectedArticleDetail, setSelectedArticleDetail] = useState(null);
  const [selectedBidDetail, setSelectedBidDetail] = useState(null);
  const [isBidProfileModalOpen, setIsBidProfileModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isFeedsModalOpen, setIsFeedsModalOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Status & Feedback
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Initial Load
  useEffect(() => {
    setBookmarks(getBookmarks());
    setAlertKeywords(getKeywordAlerts());
    setHistory(getReadingHistory());
    setBidBookmarks(getBidBookmarks());
    setCompanyProfile(getCompanyProfile());

    const loadData = async () => {
      setIsLoading(true);
      try {
        const res = await fetchArticles();
        setArticles(res.articles || []);
        setLastFetchedTime(res.lastFetchedTime || new Date().toISOString());

        const loadedFeeds = await fetchFeeds();
        if (loadedFeeds.feeds && loadedFeeds.feeds.length > 0) {
          setFeeds(loadedFeeds.feeds);
        }

        // Live Procurement data from official KKJ API
        const procRes = await fetchProcurementArticles();
        if (procRes.procurementArticles && procRes.procurementArticles.length > 0) {
          setBiddingArticles(procRes.procurementArticles);
        }
      } catch (err) {
        console.error('Data load failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Force Refresh action
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (activeTabMode === 'news') {
        const res = await triggerFeedRefresh();
        const loaded = await fetchArticles();
        setArticles(loaded.articles || []);
        showToast(res.message || '省庁データを最新同期しました', 'success');
      } else {
        const res = await triggerProcurementRefresh();
        if (res.articles && res.articles.length > 0) {
          setBiddingArticles(res.articles);
          showToast(res.message || `官公需ポータル（KKJ）公式APIより最新${res.articles.length}件を同期しました`, 'success');
        } else {
          showToast('官公需ポータル（KKJ）からの最新取得に失敗しました', 'error');
        }
      }
    } catch (err) {
      showToast('最新取得中にエラーが発生しました。', 'error');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Bidding Bookmarks & Profile
  const handleToggleBidBookmark = (article, note = '') => {
    const isBookmarked = bidBookmarks.some(b => b.id === article.id);
    if (isBookmarked) {
      const updated = removeBidBookmark(article.id);
      setBidBookmarks(updated);
      showToast(`「${article.title.slice(0, 20)}...」を検討中から解除しました`);
    } else {
      const updated = saveBidBookmark(article, note);
      setBidBookmarks(updated);
      showToast(`「${article.title.slice(0, 20)}...」を検討中リストに保存しました`, 'success');
    }
  };

  const handleSaveProfile = (newProfile) => {
    saveCompanyProfile(newProfile);
    setCompanyProfile(newProfile);
    showToast('自社判定プロファイルを更新しました', 'success');
  };

  // Reset Bidding Filters
  const handleResetBidFilters = () => {
    setOnlyHighMatch(false);
    setBidCategory('all');
    setBidGrade('all');
    setBidRegion('all');
    setBidDecision('all');
    setSearchQuery('');
    setBidSortBy('match_desc');
  };

  // Feed and History Handlers
  const handleToggleFeed = async (feedId) => {
    try {
      await toggleFeedState(feedId);
      const res = await fetchFeeds();
      if (res.feeds) setFeeds(res.feeds);
      showToast('フィードの有効/無効を更新しました', 'info');
    } catch (e) {
      showToast('フィード更新に失敗しました', 'error');
    }
  };

  const handleAddFeed = async (feedData) => {
    try {
      const res = await addCustomFeed(feedData);
      if (res.success) {
        const refreshed = await fetchFeeds();
        if (refreshed.feeds) setFeeds(refreshed.feeds);
        showToast('新しいRSSフィードを登録しました', 'success');
      }
    } catch (e) {
      showToast('フィード登録に失敗しました', 'error');
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem('govinfo_history_v1');
    setHistory([]);
    showToast('閲覧履歴を消去しました', 'info');
  };

  // Filter Pipeline for Bidding Articles (Memoized)
  const filteredBiddingArticles = useMemo(() => {
    return biddingArticles.filter((item) => {
      const match = calculateBidMatchScore(item, companyProfile);

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inSummary = item.summary.toLowerCase().includes(q);
        const inAgency = item.agency.toLowerCase().includes(q);
        const inReq = (item.keyRequirements || []).some(r => r.toLowerCase().includes(q));
        if (!inTitle && !inSummary && !inAgency && !inReq) return false;
      }

      // The User-requested Toggle Button (80% or threshold match)
      if (onlyHighMatch && match.score < matchThreshold) {
        return false;
      }

      // Category
      if (bidCategory !== 'all' && item.category !== bidCategory) {
        return false;
      }

      // Grade
      if (bidGrade !== 'all' && item.qualifiedGrade !== bidGrade) {
        return false;
      }

      // Decision Filter
      if (bidDecision !== 'all' && match.decision !== bidDecision) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const matchA = calculateBidMatchScore(a, companyProfile);
      const matchB = calculateBidMatchScore(b, companyProfile);

      if (bidSortBy === 'match_desc') {
        return matchB.score - matchA.score;
      }
      if (bidSortBy === 'deadline_asc') {
        return new Date(a.submissionDeadline).getTime() - new Date(b.submissionDeadline).getTime();
      }
      if (bidSortBy === 'published_desc') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      return 0;
    });
  }, [
    biddingArticles,
    companyProfile,
    searchQuery,
    onlyHighMatch,
    matchThreshold,
    bidCategory,
    bidGrade,
    bidDecision,
    bidSortBy
  ]);

  // Filter Pipeline for News Articles
  const filteredArticles = useMemo(() => {
    return articles.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = (item.title || '').toLowerCase().includes(q);
        const inSummary = (item.summary || '').toLowerCase().includes(q);
        const inAgency = (item.agency || '').toLowerCase().includes(q);
        if (!inTitle && !inSummary && !inAgency) return false;
      }
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedAgency !== 'all' && item.agencyCode !== selectedAgency && item.agency !== selectedAgency) return false;
      if (selectedType !== 'all' && item.type !== selectedType) return false;
      if (onlyImportant && item.importance !== 'high') return false;
      return true;
    }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [articles, searchQuery, selectedCategory, selectedAgency, selectedType, onlyImportant]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 text-xs font-bold ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-800 text-white border-emerald-700' 
              : 'bg-slate-900 text-white border-slate-800'
          }`}>
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        savedCount={activeTabMode === 'procurement' ? bidBookmarks.length : bookmarks.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenFeeds={() => setIsFeedsModalOpen(true)}
        onOpenAlerts={() => setIsAlertsModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        lastFetchedTime={lastFetchedTime}
        totalArticlesCount={activeTabMode === 'procurement' ? biddingArticles.length : articles.length}
      />

      {/* Main Navigation Mode Selector (News vs Procurement) */}
      <div className="bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-1 sm:gap-3 py-1">
            {/* Procurement Mode Tab */}
            <button
              onClick={() => {
                setActiveTabMode('procurement');
                setSearchQuery('');
              }}
              className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2.5 border-b-2 transition rounded-t-lg ${
                activeTabMode === 'procurement'
                  ? 'border-indigo-400 text-white bg-slate-800 shadow-sm'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span>🏷️ 官公需・入札調達（案件獲得）</span>
                  <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    {biddingArticles.length}件
                  </span>
                </div>
                <div className="text-[10px] text-indigo-300 font-normal">
                  【営業・売上】自社適合度＆Go/No-Go判定
                </div>
              </div>
            </button>

            {/* News Mode Tab */}
            <button
              onClick={() => {
                setActiveTabMode('news');
                setSearchQuery('');
              }}
              className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2.5 border-b-2 transition rounded-t-lg ${
                activeTabMode === 'news'
                  ? 'border-gov-blue-400 text-white bg-slate-800 shadow-sm'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-4 h-4 text-gov-blue-300 shrink-0" />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span>📢 省庁報道発表・政策ニュース</span>
                  <span className="bg-slate-600 text-slate-200 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    {articles.length}件
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal">
                  【企画・情報収集】各省庁の施策・補助金速報
                </div>
              </div>
            </button>
          </div>

          {activeTabMode === 'procurement' && (
            <div className="flex items-center gap-2 text-xs text-slate-300 pb-2 md:pb-0">
              <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md text-[11px]">
                現在の自社設定: 役務<strong>{companyProfile.qualifiedGrade}等級</strong> ({companyProfile.targetRegion})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Purpose Explanation Guide Banner */}
      <div className="bg-slate-800/90 border-b border-slate-700 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          {activeTabMode === 'procurement' ? (
            <div className="flex items-center gap-2 text-slate-300">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-1.5 py-0.5 rounded text-[10px] font-bold">
                🎯 営業・受注目的
              </span>
              <span>
                国や自治体が発注する入札公告です。自社の資格や得意分野と自動照合し、<strong>「自社が受注できるか（80%以上適合）」</strong>を即座に判定します。
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-300">
              <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 px-1.5 py-0.5 rounded text-[10px] font-bold">
                📢 企画・インプット目的
              </span>
              <span>
                各省庁の公式プレスリリース・報道資料です。<strong>補助金の公募開始、法改正、業界ガイドライン策定</strong>などの最新動向を調査・把握できます。
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Mode 1: Procurement / Bidding System */}
      {activeTabMode === 'procurement' ? (
        <>
          {/* Bidding Filter Bar (Includes the 80% toggle button requested by user) */}
          <BidFilterBar
            onlyHighMatch={onlyHighMatch}
            setOnlyHighMatch={setOnlyHighMatch}
            matchThreshold={matchThreshold}
            setMatchThreshold={setMatchThreshold}
            selectedCategory={bidCategory}
            setSelectedCategory={setBidCategory}
            selectedGrade={bidGrade}
            setSelectedGrade={setBidGrade}
            selectedRegion={bidRegion}
            setSelectedRegion={setBidRegion}
            selectedDecision={bidDecision}
            setSelectedDecision={setBidDecision}
            sortBy={bidSortBy}
            setSortBy={setBidSortBy}
            onResetFilters={handleResetBidFilters}
            onOpenProfileModal={() => setIsBidProfileModalOpen(true)}
            profile={companyProfile}
            resultCount={filteredBiddingArticles.length}
            totalCount={biddingArticles.length}
          />

          {/* Main Bidding Grid */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
            {filteredBiddingArticles.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs space-y-4">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    該当する入札公告が見つかりませんでした
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    「自社適合案件のみ」絞り込みを解除するか、キーワード条件を変更してお試しください。
                  </p>
                </div>
                <button
                  onClick={handleResetBidFilters}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition"
                >
                  絞り込み条件をすべて解除して全件表示
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Data Source Notice Bar */}
                <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-950">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>
                      <strong>中小企業庁 官公需情報ポータル（KKJ）公式API リアルタイム同期中</strong>（生案件 <strong>{biddingArticles.length}件</strong> を自動判定）
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200 font-bold">
                      全国省庁・自治体の生調達データ（ファクト直結）
                    </span>
                  </div>
                </div>

                {/* Notice bar if High match is active */}
                {onlyHighMatch && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-indigo-900">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-indigo-600" />
                      <span>
                        <strong>「自社適合案件（{matchThreshold}%以上）」で絞り込み中</strong>（{filteredBiddingArticles.length}件抽出）
                      </span>
                    </div>
                    <button
                      onClick={() => setOnlyHighMatch(false)}
                      className="text-indigo-600 hover:text-indigo-800 underline font-bold"
                    >
                      絞り込みを解除して全件に戻す
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBiddingArticles.map((article) => {
                    const isBookmarked = bidBookmarks.some(b => b.id === article.id);
                    return (
                      <BidArticleCard
                        key={article.id}
                        article={article}
                        profile={companyProfile}
                        isBookmarked={isBookmarked}
                        onToggleBookmark={handleToggleBidBookmark}
                        onOpenDetail={(art) => setSelectedBidDetail(art)}
                        searchQuery={searchQuery}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </main>
        </>
      ) : (
        /* Mode 2: Traditional Gov News System (既存機能を100%維持) */
        <>
          <StatsBar
            articles={articles}
            selectedType={selectedType}
            onlyImportant={onlyImportant}
            onQuickFilterType={(type) => {
              setSelectedType(type);
              if (type === 'all') setOnlyImportant(false);
            }}
            onQuickFilterImportance={() => setOnlyImportant(!onlyImportant)}
          />

          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedAgency={selectedAgency}
            setSelectedAgency={setSelectedAgency}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onlyImportant={onlyImportant}
            setOnlyImportant={setOnlyImportant}
            onResetFilters={() => {
              setSelectedCategory('all');
              setSelectedAgency('all');
              setSelectedType('all');
              setSelectedDateRange('all');
              setOnlyImportant(false);
              setSearchQuery('');
            }}
            resultCount={filteredArticles.length}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.slice(0, displayLimit).map((article) => {
                const isBookmarked = bookmarks.some(b => b.id === article.id);
                return (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    isBookmarked={isBookmarked}
                    onToggleBookmark={(art) => {
                      const isB = bookmarks.some(b => b.id === art.id);
                      if (isB) {
                        setBookmarks(removeBookmark(art.id));
                      } else {
                        setBookmarks(saveBookmark(art));
                      }
                    }}
                    onOpenDetail={(art) => {
                      setSelectedArticleDetail(art);
                      setHistory(addToHistory(art));
                    }}
                    searchQuery={searchQuery}
                    alertKeywords={alertKeywords}
                  />
                );
              })}
            </div>
          </main>
        </>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-slate-800 flex items-center justify-center md:justify-start gap-1.5">
              <span>官公庁インフォ・ハブ (GovInfo Japan) & 官公需入札判定ナビ</span>
              <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-bold">
                入札適合判定エンジン稼働中
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              各府省庁公式RSSおよび官公需情報ポータル（KKJ）調達公告データ連携
            </p>
          </div>
        </div>
      </footer>

      {/* Bidding Modals */}
      {selectedBidDetail && (
        <BidDetailModal
          isOpen={!!selectedBidDetail}
          article={selectedBidDetail}
          profile={companyProfile}
          onClose={() => setSelectedBidDetail(null)}
          isBookmarked={bidBookmarks.some(b => b.id === selectedBidDetail.id)}
          onToggleBookmark={handleToggleBidBookmark}
          bookmarkData={bidBookmarks.find(b => b.id === selectedBidDetail.id)}
        />
      )}

      {isBidProfileModalOpen && (
        <BidProfileModal
          isOpen={isBidProfileModalOpen}
          profile={companyProfile}
          onClose={() => setIsBidProfileModalOpen(false)}
          onSaveProfile={handleSaveProfile}
        />
      )}

      {/* News Modals */}
      {selectedArticleDetail && (
        <ArticleDetailModal
          isOpen={!!selectedArticleDetail}
          article={selectedArticleDetail}
          onClose={() => setSelectedArticleDetail(null)}
          isBookmarked={bookmarks.some(b => b.id === selectedArticleDetail.id)}
          onToggleBookmark={(art, note, tags, rating) => {
            const isB = bookmarks.some(b => b.id === art.id);
            if (isB) {
              setBookmarks(removeBookmark(art.id));
            } else {
              setBookmarks(saveBookmark(art, note, tags, rating));
            }
          }}
          onUpdateBookmarkDetails={(id, updates) => setBookmarks(updateBookmarkDetails(id, updates))}
          bookmarkData={bookmarks.find(b => b.id === selectedArticleDetail.id)}
        />
      )}

      {/* Saved Drawer */}
      <SavedArticlesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        bookmarks={activeTabMode === 'procurement' ? bidBookmarks : bookmarks}
        onRemoveBookmark={(id) => {
          if (activeTabMode === 'procurement') {
            setBidBookmarks(removeBidBookmark(id));
          } else {
            setBookmarks(removeBookmark(id));
          }
        }}
        onOpenDetail={(art) => {
          if (activeTabMode === 'procurement') {
            setSelectedBidDetail(art);
          } else {
            setSelectedArticleDetail(art);
          }
        }}
        onUpdateBookmarkDetails={(id, updates) => setBookmarks(updateBookmarkDetails(id, updates))}
      />

      {/* Common Modals */}
      <FeedSourceManager
        isOpen={isFeedsModalOpen}
        onClose={() => setIsFeedsModalOpen(false)}
        feeds={feeds}
        onToggleFeed={handleToggleFeed}
        onAddFeed={handleAddFeed}
        onRefreshAll={handleRefresh}
      />
      <KeywordAlertModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        alertKeywords={alertKeywords}
        onSaveAlerts={(kws) => {
          setAlertKeywords(kws);
          saveKeywordAlerts(kws);
        }}
        onApplyKeywordFilter={(kw) => setSearchQuery(kw)}
      />
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={history}
        onOpenDetail={(art) => {
          setSelectedArticleDetail(art);
        }}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}
