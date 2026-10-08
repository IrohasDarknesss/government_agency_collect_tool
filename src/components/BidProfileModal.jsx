import React, { useState } from 'react';
import { X, Sliders, ShieldCheck, Target, Ban, Clock, Save, RotateCcw, Check } from 'lucide-react';
import { DEFAULT_COMPANY_PROFILE } from '../services/bidMatchingEngine';

export default function BidProfileModal({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) {
  if (!isOpen) return null;

  const [companyName, setCompanyName] = useState(profile.companyName || '');
  const [qualifiedGrade, setQualifiedGrade] = useState(profile.qualifiedGrade || 'C');
  const [targetRegion, setTargetRegion] = useState(profile.targetRegion || 'kanto');
  const [targetKeywordsStr, setTargetKeywordsStr] = useState((profile.targetKeywords || []).join(', '));
  const [excludedKeywordsStr, setExcludedKeywordsStr] = useState((profile.excludedKeywords || []).join(', '));
  const [minLeadDays, setMinLeadDays] = useState(profile.minLeadDays || 10);
  const [autoFilterThreshold, setAutoFilterThreshold] = useState(profile.autoFilterThreshold || 80);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      companyName,
      qualifiedGrade,
      targetRegion,
      targetKeywords: targetKeywordsStr.split(',').map(s => s.trim()).filter(Boolean),
      excludedKeywords: excludedKeywordsStr.split(',').map(s => s.trim()).filter(Boolean),
      minLeadDays: Number(minLeadDays) || 10,
      autoFilterThreshold: Number(autoFilterThreshold) || 80
    };
    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    setCompanyName(DEFAULT_COMPANY_PROFILE.companyName);
    setQualifiedGrade(DEFAULT_COMPANY_PROFILE.qualifiedGrade);
    setTargetRegion(DEFAULT_COMPANY_PROFILE.targetRegion);
    setTargetKeywordsStr(DEFAULT_COMPANY_PROFILE.targetKeywords.join(', '));
    setExcludedKeywordsStr(DEFAULT_COMPANY_PROFILE.excludedKeywords.join(', '));
    setMinLeadDays(DEFAULT_COMPANY_PROFILE.minLeadDays);
    setAutoFilterThreshold(DEFAULT_COMPANY_PROFILE.autoFilterThreshold);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 transform transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                自社プロファイル設定（機械的適合度・判定基準）
              </h2>
              <p className="text-xs text-slate-500">
                保有資格や得意分野を登録すると、新着入札案件の適合スコアが自動算出されます
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

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Company Name */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              組織名 / 事業部名
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Qualification Grade & Region */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                全省庁統一資格（役務の提供等）の保有等級
              </label>
              <select
                value={qualifiedGrade}
                onChange={(e) => setQualifiedGrade(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="A">A等級（大規模・総合案件）</option>
                <option value="B">B等級（中〜大規模案件）</option>
                <option value="C">C等級（中〜小規模案件・標準）</option>
                <option value="D">D等級（小規模案件・スタートアップ）</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                主力営業地域
              </label>
              <select
                value={targetRegion}
                onChange={(e) => setTargetRegion(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="kanto">関東・甲信越（東京・神奈川等）</option>
                <option value="kinki">近畿（大阪・京都・兵庫等）</option>
                <option value="chubu">東海・中部</option>
                <option value="kyushu">九州・沖縄</option>
                <option value="tohoku">東北</option>
                <option value="all">全国（地域不問）</option>
              </select>
            </div>
          </div>

          {/* Target Keywords */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              受注ターゲットキーワード（カンマ区切り）
            </label>
            <textarea
              rows={2}
              value={targetKeywordsStr}
              onChange={(e) => setTargetKeywordsStr(e.target.value)}
              placeholder="例: AI, 生成AI, Web, クラウド, システム開発, DX, データ分析"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="text-[11px] text-slate-400">
              ※これらの単語が案件名や仕様書概要に含まれると、適合度スコアが加算されます。
            </span>
          </div>

          {/* Excluded Keywords */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Ban className="w-3.5 h-3.5 text-rose-600" />
              除外キーワード（自社で対応不可・入札しない分野）
            </label>
            <input
              type="text"
              value={excludedKeywordsStr}
              onChange={(e) => setExcludedKeywordsStr(e.target.value)}
              placeholder="例: 清掃, 警備, 工事, 印刷, 配送, 給食"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="text-[11px] text-slate-400">
              ※これらの単語が含まれる案件は、自動的に「見送り（No-Go）」へ判定されます。
            </span>
          </div>

          {/* Thresholds */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                最低限必要な準備日数（日）
              </label>
              <input
                type="number"
                min={1}
                max={60}
                value={minLeadDays}
                onChange={(e) => setMinLeadDays(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
              <span className="text-[10px] text-slate-400">締切までこの日数未満は「準備期間逼迫」警告</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                高適合判定しきい値（%）
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={50}
                  max={95}
                  step={5}
                  value={autoFilterThreshold}
                  onChange={(e) => setAutoFilterThreshold(e.target.value)}
                  className="flex-1 cursor-pointer accent-indigo-600"
                />
                <span className="font-bold text-indigo-700 font-mono text-sm w-10 text-right">
                  {autoFilterThreshold}%
                </span>
              </div>
              <span className="text-[10px] text-slate-400">「自社適合案件のみ」ボタンでの絞り込み基準</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-slate-500 hover:text-slate-700 text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>初期値に戻す</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
              <span>{savedSuccess ? '保存完了' : 'プロファイル保存'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
