import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  FileText, 
  Bookmark, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Coins, 
  ShieldCheck, 
  Building,
  Copy,
  Save,
  Check
} from 'lucide-react';
import { calculateBidMatchScore } from '../services/bidMatchingEngine';

export default function BidDetailModal({
  article,
  profile,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  bookmarkData
}) {
  if (!isOpen || !article) return null;

  const matchResult = calculateBidMatchScore(article, profile);
  const { score, decision, decisionLabel, decisionColor, leadDays, matchReasons, riskFactors } = matchResult;

  const [note, setNote] = useState(bookmarkData?.userNote || '');
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleCopySummary = () => {
    const text = `【入札案件名】${article.title}
発注機関: ${article.agency}
調達方式: ${article.procurementType}
要件資格: ${article.qualifiedGrade}等級
入札締切: ${article.submissionDeadline}
機械判定: ${decisionLabel} (適合度${score}%)
URL: ${article.officialUrl || article.specDocUrl}

概要:
${article.summary}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveMemo = () => {
    onToggleBookmark(article, note);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 transform transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-white">
              {article.agency}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-800">
              {article.procurementType}
            </span>
            <div className={`px-2.5 py-0.5 rounded text-xs font-bold border flex items-center gap-1 ${decisionColor}`}>
              {decision === 'Go' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              {decision === 'Review' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
              {decision === 'No-Go' && <XCircle className="w-3.5 h-3.5 text-slate-500" />}
              <span>{decisionLabel} (適合度 {score}%)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
              title="案件要約をコピー"
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
              title={isBookmarked ? '検討中から解除' : '検討中リストへ保存'}
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-700">
          {/* Title & Timeline */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {article.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                情報源: <strong>{article.portalSource}</strong>
              </span>
              <span className="flex items-center gap-1 font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                <Clock className="w-3.5 h-3.5 text-rose-600" />
                入札書提出締切: {article.submissionDeadline}（残{leadDays}日）
              </span>
            </div>
          </div>

          {/* Machine Decision Card (Go/No-Go Report) */}
          <div className="bg-gradient-to-r from-slate-50 to-indigo-50/40 border border-indigo-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span>🤖 機械的判定レポート（自社プロファイル照合結果）</span>
              </span>
              <span className="font-bold text-indigo-700 font-mono text-base">
                マッチ度 {score}%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Positive Factors */}
              <div className="bg-white p-3 rounded-lg border border-emerald-200">
                <span className="font-bold text-emerald-800 flex items-center gap-1 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  適合要因（ポジティブ）
                </span>
                <ul className="space-y-1 text-slate-600">
                  {matchReasons.length > 0 ? (
                    matchReasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-500">•</span>
                        <span>{r}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-400">特になし</li>
                  )}
                </ul>
              </div>

              {/* Risk / Disqualification Factors */}
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-700 flex items-center gap-1 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  リスク・要件ギャップ（留意点）
                </span>
                <ul className="space-y-1 text-slate-600">
                  {riskFactors.length > 0 ? (
                    riskFactors.map((rf, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-rose-500">•</span>
                        <span>{rf}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-emerald-600 font-medium">特筆すべきリスク・資格不一致なし</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Schedule Dates Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">公告公表日</span>
              <span className="font-mono text-xs font-bold text-slate-800">
                {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">質問提出期限</span>
              <span className="font-mono text-xs font-bold text-amber-700">
                {article.clarificationDeadline ? new Date(article.clarificationDeadline).toLocaleDateString('ja-JP') : '随時'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">入札書受領期限</span>
              <span className="font-mono text-xs font-bold text-rose-700">
                {new Date(article.submissionDeadline).toLocaleDateString('ja-JP')}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">開札日</span>
              <span className="font-mono text-xs font-bold text-slate-800">
                {article.openingDate ? new Date(article.openingDate).toLocaleDateString('ja-JP') : '後日通知'}
              </span>
            </div>
          </div>

          {/* Key Requirements & Budget */}
          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              仕様書の主要要件・業務内容
            </h4>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
              <p className="leading-relaxed whitespace-pre-line text-slate-700">
                {article.summary}
              </p>
              {article.keyRequirements && article.keyRequirements.length > 0 && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-700 block mb-1.5">【必須要件・技術要件】</span>
                  <ul className="space-y-1">
                    {article.keyRequirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[9px] mt-0.5">
                          {i + 1}
                        </span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Official Document Links */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {article.specDocUrl && (
              <a
                href={article.specDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>調達仕様書（PDF）を閲覧</span>
              </a>
            )}

            {article.officialUrl && (
              <a
                href={article.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg border border-slate-300 transition"
              >
                <span>官公需ポータル公式公告ページ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Internal Memo Section */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
                応札検討メモ・社内共有ノート
              </span>
              {saveSuccess && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-fadeIn">
                  <Check className="w-3.5 h-3.5" />
                  保存しました
                </span>
              )}
            </div>
            <div className="space-y-2 bg-amber-50/40 border border-amber-200 rounded-xl p-3">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="社内検討メモ（例: 田中PMが仕様書確認中、質問書を10/12までに提出、パートナー企業とのJV検討 等）..."
                rows={2}
                className="w-full p-2 bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveMemo}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>メモを保存</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-slate-500 text-[11px]">
          <span>調達ID: {article.id}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
