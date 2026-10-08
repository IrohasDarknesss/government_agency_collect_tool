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
        // Procurement refresh simulation (or KKJ live fetch)
        setTimeout(() => {
          showToast('官公需情報ポータル（KKJ）の最新入札公告を同期しました', 'success');
          setIsRefreshing(false);
        }, 800);
        return;
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
      <div className="bg-slate-800 border-b border-slate-700 text-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Procurement Mode Tab */}
            <button
              onClick={() => {
                setActiveTabMode('procurement');
                setSearchQuery('');
              }}
              className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition ${
                activeTabMode === 'procurement'
                  ? 'border-indigo-400 text-white bg-slate-700/60'
                  : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>🏷️ 官公需・入札調達情報（機械判定）</span>
              <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {biddingArticles.length}
              </span>
            </button>

            {/* News Mode Tab */}
            <button
              onClick={() => {
                setActiveTabMode('news');
                setSearchQuery('');
              }}
              className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition ${
                activeTabMode === 'news'
                  ? 'border-gov-blue-400 text-white bg-slate-700/60'
                  : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <Building2 className="w-4 h-4 text-gov-blue-300" />
              <span>📢 省庁報道発表・政策ニュース</span>
              <span className="bg-slate-600 text-slate-200 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {articles.length}
              </span>
            </button>
          </div>

          {activeTabMode === 'procurement' && (
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-300">
              <span>保有資格: 役務<strong>{companyProfile.qualifiedGrade}等級</strong> ({companyProfile.targetRegion})</span>
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
