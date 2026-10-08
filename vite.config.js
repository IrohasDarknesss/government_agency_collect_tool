import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Parser from 'rss-parser';
import { fetchLiveKkjProcurement } from './src/services/kkjApiServer.js';

const OFFICIAL_FEEDS = [
  {
    id: 'digital',
    name: 'デジタル庁 報道発表',
    agency: 'デジタル庁',
    agencyCode: 'digital',
    url: 'https://www.digital.go.jp/rss/news.xml',
    encoding: 'utf-8',
    enabled: true
  },
  {
    id: 'meti',
    name: '経済産業省・中小企業庁 ニュースリリース',
    agency: '経済産業省・中小企業庁',
    agencyCode: 'meti',
    url: 'https://www.meti.go.jp/press/index.xml',
    encoding: 'utf-8',
    enabled: true
  },
  {
    id: 'mhlw',
    name: '厚生労働省 報道発表資料',
    agency: '厚生労働省',
    agencyCode: 'mhlw',
    url: 'https://www.mhlw.go.jp/stf/news.rdf',
    encoding: 'shift_jis', // 厚労省RDFはShift_JIS配信
    enabled: true
  },
  {
    id: 'mic',
    name: '総務省 報道資料',
    agency: '総務省',
    agencyCode: 'mic',
    url: 'https://www.soumu.go.jp/news.rdf',
    encoding: 'shift_jis', // 総務省RDFはShift_JIS配信
    enabled: true
  },
  {
    id: 'kantei',
    name: '首相官邸 ヘッドライン',
    agency: '首相官邸・内閣府',
    agencyCode: 'kantei',
    url: 'https://www.kantei.go.jp/jp/headline/rss/headline.rdf',
    encoding: 'utf-8',
    enabled: true
  },
  {
    id: 'fsa',
    name: '金融庁 報道発表',
    agency: '金融庁',
    agencyCode: 'fsa',
    url: 'https://www.fsa.go.jp/news/rss.xml',
    encoding: 'utf-8',
    enabled: true
  },
  {
    id: 'moe',
    name: '環境省 報道発表',
    agency: '環境省',
    agencyCode: 'moe',
    url: 'https://www.env.go.jp/rss/news.xml',
    encoding: 'utf-8',
    enabled: true
  },
  {
    id: 'cfa',
    name: 'こども家庭庁 最新情報',
    agency: 'こども家庭庁',
    agencyCode: 'cfa',
    url: 'https://www.cfa.go.jp/rss/news.xml',
    encoding: 'utf-8',
    enabled: true
  },
  {
    id: 'tokyo',
    name: '東京都 報道発表',
    agency: '東京都庁',
    agencyCode: 'kantei',
    url: 'https://www.metro.tokyo.lg.jp/rss/news.xml',
    encoding: 'utf-8',
    enabled: true
  }
];

// Clean and decode HTML entities
function sanitizeHtml(str = '') {
  return str
    .replace(/<[^>]*>?/gm, '')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

// Robust encoding detector & decoder for Japanese government feeds
function decodeJapaneseXml(buffer, contentType = '', defaultHint = 'utf-8') {
  // 1. Inspect Content-Type header
  const ctMatch = contentType.match(/charset=([a-zA-Z0-9_-]+)/i);
  let detectedEncoding = ctMatch ? ctMatch[1].toLowerCase() : null;

  // 2. Inspect XML declaration from first 512 bytes (interpreted as ASCII)
  if (!detectedEncoding) {
    const headAscii = buffer.slice(0, 512).toString('latin1');
    const xmlMatch = headAscii.match(/<\?xml[^>]+encoding=["']([a-zA-Z0-9_-]+)["']/i);
    if (xmlMatch) {
      detectedEncoding = xmlMatch[1].toLowerCase();
    }
  }

  // 3. Fallback to default hint
  if (!detectedEncoding) {
    detectedEncoding = defaultHint.toLowerCase();
  }

  // Normalize common encoding names
  if (['sjis', 'shift_jis', 'shift-jis', 'x-sjis', 'cp932', 'windows-31j', 'ms932'].includes(detectedEncoding)) {
    detectedEncoding = 'shift_jis';
  } else if (['euc-jp', 'eucjp', 'x-euc-jp'].includes(detectedEncoding)) {
    detectedEncoding = 'euc-jp';
  } else {
    detectedEncoding = 'utf-8';
  }

  // Decode with detected encoding
  try {
    const decoder = new TextDecoder(detectedEncoding, { fatal: false });
    const text = decoder.decode(buffer);
    
    // Check if result has excessive replacement characters (U+FFFD), if so try fallback
    const replacementCount = (text.match(/\uFFFD/g) || []).length;
    if (replacementCount > 3) {
      const fallbackEnc = detectedEncoding === 'utf-8' ? 'shift_jis' : 'utf-8';
      const fallbackDecoder = new TextDecoder(fallbackEnc, { fatal: false });
      return fallbackDecoder.decode(buffer);
    }
    return text;
  } catch (err) {
    // Ultimate fallback
    return new TextDecoder('utf-8').decode(buffer);
  }
}

function inferCategory(title = '', desc = '') {
  const text = `${title} ${desc}`.toLowerCase();
  if (text.includes('補助金') || text.includes('助成金') || text.includes('公募') || text.includes('交付金') || text.includes('給付')) return 'subsidy';
  if (text.includes('デジタル') || text.includes('ai') || text.includes('マイナンバー') || text.includes('it') || text.includes('クラウド') || text.includes('サイバー') || text.includes('通信')) return 'digital';
  if (text.includes('労働') || text.includes('雇用') || text.includes('賃金') || text.includes('年金') || text.includes('社保') || text.includes('働き方') || text.includes('就労')) return 'labor';
  if (text.includes('経済') || text.includes('産業') || text.includes('中小企業') || text.includes('スタートアップ') || text.includes('投資') || text.includes('物価') || text.includes('貿易')) return 'economy';
  if (text.includes('パブリックコメント') || text.includes('意見公募') || text.includes('政令') || text.includes('法律') || text.includes('告示') || text.includes('基準') || text.includes('改正')) return 'law';
  if (text.includes('脱炭素') || text.includes('環境') || text.includes('エネルギー') || text.includes('再エネ') || text.includes('温暖化') || text.includes('gx') || text.includes('省エネ')) return 'green';
  if (text.includes('医療') || text.includes('健康') || text.includes('感染症') || text.includes('病院') || text.includes('介護') || text.includes('福祉') || text.includes('薬品')) return 'health';
  if (text.includes('こども') || text.includes('教育') || text.includes('学校') || text.includes('少子化') || text.includes('子育て') || text.includes('大学') || text.includes('児童')) return 'education';
  if (text.includes('防災') || text.includes('地震') || text.includes('台風') || text.includes('警察') || text.includes('消防') || text.includes('防衛') || text.includes('安全') || text.includes('気象')) return 'safety';
  return 'economy';
}

function inferType(title = '', desc = '') {
  const text = `${title} ${desc}`.toLowerCase();
  if (text.includes('公募') || text.includes('補助金') || text.includes('助成金') || text.includes('申請受付') || text.includes('募集')) return 'grant';
  if (text.includes('パブリックコメント') || text.includes('意見募集') || text.includes('意見公募')) return 'pubcom';
  if (text.includes('審議会') || text.includes('検討会') || text.includes('分科会') || text.includes('会議結果') || text.includes('部会')) return 'council';
  if (text.includes('統計') || text.includes('調査結果') || text.includes('白書') || text.includes('速報') || text.includes('報告書')) return 'stat';
  if (text.includes('公布') || text.includes('施行') || text.includes('改正') || text.includes('政令') || text.includes('法令')) return 'law';
  return 'press';
}

// Custom Vite Server Plugin with multi-encoding Japanese RSS support
function govApiPlugin() {
  const parser = new Parser({
    customFields: {
      item: [
        ['description', 'description'],
        ['content:encoded', 'contentEncoded'],
        ['dc:date', 'dcDate'],
        ['pubDate', 'pubDate'],
        ['category', 'category']
      ]
    }
  });

  let cachedArticles = [];
  let feedConfigs = [...OFFICIAL_FEEDS];
  let lastSyncTime = null;
  let syncLogs = [];

  async function syncAllFeeds() {
    const aggregated = [];
    const logs = [];

    for (const feed of feedConfigs) {
      if (!feed.enabled) continue;
      try {
        const res = await fetch(feed.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 GovInfoHub/1.0',
            'Accept': 'application/rss+xml, application/rdf+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8'
          },
          signal: AbortSignal.timeout(8000)
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const contentType = res.headers.get('content-type') || '';
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Decode XML using proper Japanese encoding detection
        const xmlString = decodeJapaneseXml(buffer, contentType, feed.encoding || 'utf-8');

        // Parse decoded XML string
        const parsed = await parser.parseString(xmlString);
        feed.lastUpdated = new Date().toLocaleString('ja-JP');

        const items = (parsed.items || []).map((item, idx) => {
          const rawTitle = item.title ? item.title.trim() : '公表文書';
          const title = sanitizeHtml(rawTitle);
          const link = item.link || feed.url;
          const rawDate = item.pubDate || item.dcDate || new Date().toISOString();
          const rawDesc = item.contentSnippet || item.description || item.contentEncoded || title;
          const desc = sanitizeHtml(rawDesc);

          const category = inferCategory(title, desc);
          const type = inferType(title, desc);

          const autoTags = [feed.agency.split('・')[0]];
          if (title.includes('補助金')) autoTags.push('補助金');
          if (title.includes('AI') || title.includes('生成AI')) autoTags.push('AI');
          if (title.includes('DX')) autoTags.push('DX');
          if (title.includes('マイナンバー')) autoTags.push('マイナンバー');
          if (title.includes('公募')) autoTags.push('公募情報');
          if (title.includes('改正') || title.includes('政令')) autoTags.push('法改正');

          return {
            id: `live-${feed.id}-${idx}-${Buffer.from(link + title).toString('base64').slice(0, 14)}`,
            title,
            agency: feed.agency,
            agencyCode: feed.agencyCode || feed.id,
            category,
            type,
            publishedAt: new Date(rawDate).toISOString(),
            summary: desc.slice(0, 350) || `${feed.agency}発表の公式アナウンスメントです。`,
            detailedPoints: [
              `${feed.agency}が公式配信（RSS/RDF）した最新の一次情報です`,
              `ジャンル分類：${category} / 種別：${type}`,
              '公表本文、添付資料、申請窓口は各府省庁の公式リンク先より直接ご確認ください'
            ],
            targetAudience: '全国の事業者、地方自治体、関係機関、国民一般',
            url: link,
            tags: autoTags,
            importance: title.includes('公募') || title.includes('重要') || title.includes('改正') || title.includes('補助金') ? 'high' : 'normal',
            source: 'official_rss_live',
            feedName: feed.name
          };
        });

        aggregated.push(...items);
        logs.push({ name: feed.name, status: 'OK', count: items.length, url: feed.url });
      } catch (err) {
        logs.push({ name: feed.name, status: `FAILED: ${err.message}`, count: 0, url: feed.url });
      }
    }

    // Deduplicate
    const seen = new Set();
    const unique = [];
    for (const item of aggregated) {
      if (!seen.has(item.url) && !seen.has(item.title)) {
        seen.add(item.url);
        seen.add(item.title);
        unique.push(item);
      }
    }

    unique.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    cachedArticles = unique;
    lastSyncTime = new Date().toISOString();
    syncLogs = logs;
    return { total: unique.length, logs, lastSyncTime };
  }

  return {
    name: 'gov-api-plugin',
    configureServer(server) {
      // Endpoint: GET /api/articles
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/articles' && req.method === 'GET') {
          if (cachedArticles.length === 0) {
            await syncAllFeeds();
          }
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({
            articles: cachedArticles,
            total: cachedArticles.length,
            lastFetchedTime: lastSyncTime,
            logs: syncLogs
          }));
          return;
        }

        // Endpoint: POST /api/feeds/refresh
        if (req.url === '/api/feeds/refresh' && req.method === 'POST') {
          const result = await syncAllFeeds();
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({
            success: true,
            message: `各省庁の公式RSSより最新${result.total}件を文字化けなく正常同期しました`,
            total: result.total,
            lastFetchedTime: result.lastSyncTime,
            logs: result.logs
          }));
          return;
        }

        // Endpoint: GET /api/feeds
        if (req.url === '/api/feeds' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({
            feeds: feedConfigs,
            lastFetchedTime: lastSyncTime,
            logs: syncLogs
          }));
          return;
        }

        // Endpoint: GET /api/procurement (KKJ official API real-time notices)
        if (req.url === '/api/procurement' && req.method === 'GET') {
          try {
            const data = await fetchLiveKkjProcurement(false);
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({
              success: true,
              articles: data.articles,
              total: data.total,
              lastFetchedTime: data.lastFetchedTime,
              source: '官公需情報ポータル（KKJ）公式API'
            }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message, articles: [] }));
          }
          return;
        }

        // Endpoint: POST /api/procurement/refresh (Force refresh from KKJ)
        if (req.url === '/api/procurement/refresh' && req.method === 'POST') {
          try {
            const data = await fetchLiveKkjProcurement(true);
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({
              success: true,
              articles: data.articles,
              total: data.total,
              lastFetchedTime: data.lastFetchedTime,
              message: `官公需情報ポータル（KKJ）公式APIより最新${data.total}件の入札公告を同期しました`
            }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message, articles: [] }));
          }
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), govApiPlugin()],
  server: {
    port: 5173,
    host: true
  },
});
