import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  ShieldCheck, 
  Award, 
  Target, 
  Sliders, 
  FileText, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function BiddingFaqModal({
  isOpen,
  onClose,
  onOpenProfileModal
}) {
  if (!isOpen) return null;

  // Active accordion state
  const [openSection, setOpenSection] = useState('grades'); // 'grades', 'why_profile', 'scoring', 'kkj', 'steps'

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 transform transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>官公需・入札調達 よくある質問（FAQ）＆ガイド</span>
                <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded font-mono font-bold">
                  初めての方へ
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                資格等級（A〜D）の意味、自社設定の理由、適合スコアの計算方法を解説します
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-700 text-xs">
          
          {/* Quick Summary Banner */}
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-indigo-950 text-sm">
                入札初心者でも3分でわかるポイント
              </h3>
              <p className="text-indigo-800 leading-relaxed text-xs">
                官公庁の仕事は、法律上<strong>「企業ごとに決められた資格等級（A〜D）」</strong>に合致しない案件には応募できません。当ツールは、<strong>自社の保有資格や得意分野を一度設定するだけで、全国数万件の案件から「自社が受注できる案件」だけを機械判定（0〜100%）</strong>して抽出します。
              </p>
            </div>
          </div>

          {/* Accordion 1: A〜D等級とは？ */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => toggleSection('grades')}
              className="w-full px-4 py-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition font-bold text-slate-900 text-sm"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Q1. 「A等級・B等級・C等級・D等級」とは何ですか？</span>
              </div>
              {openSection === 'grades' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openSection === 'grades' && (
              <div className="p-4 border-t border-slate-200 bg-white space-y-3 leading-relaxed">
                <p>
                  国の全府省庁（デジタル庁、経産省、厚労省等）の入札に参加するための国家共通ライセンス<strong>「全省庁統一資格（競争参加資格）」</strong>におけるランク付けのことです。
                </p>
                <p>
                  企業の年間売上、自己資本額、決算内容によって<strong>A・B・C・Dの4段階</strong>に格付けされ、案件の予算規模に応じて発注機関が「参加できる等級」を指定します。
                </p>

                {/* Table of Grades */}
                <div className="overflow-x-auto rounded-lg border border-slate-200 mt-2">
                  <table className="w-full text-[11px] text-left border-collapse">
                    <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2 border-r border-slate-200">等級</th>
                        <th className="p-2 border-r border-slate-200">主な対象企業</th>
                        <th className="p-2 border-r border-slate-200">役務・システム案件の予算規模</th>
                        <th className="p-2">特徴と難易度</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="p-2 font-bold text-rose-700 border-r border-slate-200">A等級</td>
                        <td className="p-2 border-r border-slate-200">大企業、大手SIer、総合コンサル</td>
                        <td className="p-2 border-r border-slate-200">3,000万円以上 〜 数億円規模</td>
                        <td className="p-2">基幹系刷新など超大型案件。中小企業は単独参加不可（大手専用）</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2 font-bold text-amber-700 border-r border-slate-200">B等級</td>
                        <td className="p-2 border-r border-slate-200">中堅IT企業、準大手ベンダー</td>
                        <td className="p-2 border-r border-slate-200">1,500万円 〜 3,000万円程度</td>
                        <td className="p-2">省庁中規模システム開発や大規模調査研究</td>
                      </tr>
                      <tr className="hover:bg-indigo-50/50 bg-indigo-50/20">
                        <td className="p-2 font-bold text-indigo-700 border-r border-slate-200 flex items-center gap-1">
                          <span>C等級</span>
                          <span className="text-[9px] bg-indigo-100 text-indigo-800 px-1 rounded">初期値</span>
                        </td>
                        <td className="p-2 border-r border-slate-200 font-bold text-indigo-950">
                          一般的な中小IT企業、DXベンチャー
                        </td>
                        <td className="p-2 border-r border-slate-200 font-bold text-indigo-950">
                          数百万円 〜 1,500万円程度
                        </td>
                        <td className="p-2 text-indigo-900">
                          <strong>中小IT企業にとって最大の主戦場。</strong>案件数が最も多く受注しやすい
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-2 font-bold text-emerald-700 border-r border-slate-200">D等級</td>
                        <td className="p-2 border-r border-slate-200">小規模企業、創業期ベンチャー</td>
                        <td className="p-2 border-r border-slate-200">数百万円未満の少額案件</td>
                        <td className="p-2">Web改修や小規模保守。大企業が参加してこないため穴場</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  ⚠️ <strong>注意点:</strong> 公告に「A等級以上」と書かれている案件には、C等級の企業は応募書類すら受理されません（門前払い）。逆に「C等級以上」の案件には、C・B・A等級の企業が参加できます。
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: なぜ「現在の自社設定: C等級」と設定しているのか？ */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => toggleSection('why_profile')}
              className="w-full px-4 py-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition font-bold text-slate-900 text-sm"
            >
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>Q2. なぜ「現在の自社設定: C等級」と設定しているのですか？</span>
              </div>
              {openSection === 'why_profile' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openSection === 'why_profile' && (
              <div className="p-4 border-t border-slate-200 bg-white space-y-3 leading-relaxed">
                <p>
                  <strong>「自社が法的に応募できる案件か、門前払いになる案件か」をシステムが自動で振り分けるため</strong>に設定しています。
                </p>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-800">
                    設定している具体的な理由：
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    <li>
                      <strong>応募資格の自動照合:</strong> 自社が持っていない等級（例: A等級限定案件）は、内容がどんなに魅力的でも応募不可なため、機械的にスコアを落とし「No-Go（見送り）」と判定します。
                    </li>
                    <li>
                      <strong>自社の主戦場（C等級案件）の即時抽出:</strong> 自社等級に適合する案件を優先して上位にスコアリングします。
                    </li>
                    <li>
                      <strong>初期値がC等級の理由:</strong> 一般的な中小IT企業やWebソリューション開発会社が取得している最も標準的な等級であるため、初期値としてセットしています。
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                  <div>
                    <span className="font-bold text-indigo-900">自社の実際の保有資格に合わせて変更できます</span>
                    <p className="text-[11px] text-indigo-700">すでにB等級をお持ちの場合や、D等級のスタートアップの場合は変更可能です。</p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenProfileModal();
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition text-xs shrink-0"
                  >
                    自社設定を変更する
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: 適合度スコア（0〜100%）の計算ロジック */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => toggleSection('scoring')}
              className="w-full px-4 py-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition font-bold text-slate-900 text-sm"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Q3. 適合度スコア（0〜100%）と「Go / Review / No-Go」はどう決まる？</span>
              </div>
              {openSection === 'scoring' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openSection === 'scoring' && (
              <div className="p-4 border-t border-slate-200 bg-white space-y-3 leading-relaxed">
                <p>
                  案件が入ってきた瞬間に、自社プロファイルと案件本文を突合し、**合計100点満点**で加点・減点評価します：
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-800">1. 得意分野キーワード（最大45点）</span>
                    <p className="text-slate-500 mt-0.5">システム、開発、クラウド、AI、Webなど、自社が受注したい領域に合致するほど加点。</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-800">2. 資格等級の一致（最大30点）</span>
                    <p className="text-slate-500 mt-0.5">自社の保有等級で参加できる案件に満額加点。資格不足は大幅減点。</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-800">3. 地域適合（最大15点）</span>
                    <p className="text-slate-500 mt-0.5">自社の営業主力エリア（例: 関東）または全国対象の案件に加点。</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-800">4. 準備リードタイム（最大10点）</span>
                    <p className="text-slate-500 mt-0.5">締切まで10日以上の余裕がある案件に加点。直前案件はリスク警告。</p>
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-lg text-rose-900 text-[11px]">
                  ⛔ <strong>除外キーワード（一発ペナルティ）:</strong> 「清掃」「工事」「給食」など、自社と無関係な業種の単語が含まれる場合は自動で **10%（No-Go）** に落とされます。
                </div>

                {/* Decision types */}
                <div className="flex flex-col sm:flex-row gap-2 pt-1 text-[11px]">
                  <div className="flex-1 bg-emerald-50 border border-emerald-200 p-2 rounded-lg">
                    <span className="font-bold text-emerald-800">🎯 Go（応札推奨）: スコア80%以上</span>
                    <p className="text-emerald-700 text-[10px]">自社の資格・強みと合致し、勝算が高い本命案件。</p>
                  </div>
                  <div className="flex-1 bg-amber-50 border border-amber-200 p-2 rounded-lg">
                    <span className="font-bold text-amber-800">⚠️ Review（要検討）: スコア50〜79%</span>
                    <p className="text-amber-700 text-[10px]">参加可能だが一部条件（納期や地域）の精査が必要。</p>
                  </div>
                  <div className="flex-1 bg-slate-100 border border-slate-200 p-2 rounded-lg">
                    <span className="font-bold text-slate-700">❌ No-Go（見送り）: スコア50%未満</span>
                    <p className="text-slate-600 text-[10px]">資格不適合または除外対象業種のため見送り。</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 4: 官公需ポータル（KKJ）公式APIについて */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => toggleSection('kkj')}
              className="w-full px-4 py-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition font-bold text-slate-900 text-sm"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-600" />
                <span>Q4. 「官公需情報ポータル（KKJ）」とは？データはどこから取っている？</span>
              </div>
              {openSection === 'kkj' ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openSection === 'kkj' && (
              <div className="p-4 border-t border-slate-200 bg-white space-y-2.5 leading-relaxed">
                <p>
                  中小企業庁が運営する、国や地方自治体、独立行政法人、国立大学等の入札公告を網羅した<strong>国の公式情報ポータル</strong>です。
                </p>
                <p>
                  当ツールは、中小企業庁が提供する<strong>公式検索API（https://www.kkj.go.jp/api/）</strong>と直接通信しており、毎日全国で公示される生データをリアルタイムで収集しています。
                </p>
                <p className="text-[11px] text-slate-500">
                  ※各案件の「仕様書PDF」や「公式公告」リンクを押すと、発注元機関のサーバーにある本物の仕様書PDFが直接開きます。
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenProfileModal();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
            <span>自社プロファイル設定を開く</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition shadow-xs"
          >
            閉じる
          </button>
        </div>

      </div>
    </div>
  );
}
