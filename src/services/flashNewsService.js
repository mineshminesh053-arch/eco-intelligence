/**
 * Live Waste Management Flash News Service
 * Aggregates, filters, and formats real-time news exclusively related to waste management.
 */

// Targeted Waste Management & Recycling RSS Feeds
const LIVE_FEEDS = [
  { url: 'https://www.wastedive.com/feeds/news/', source: 'Waste Dive', defaultCategory: 'Solid Waste & Landfill' },
  { url: 'https://www.theguardian.com/environment/waste/rss', source: 'The Guardian Waste', defaultCategory: 'Municipal & Industrial Waste' },
  { url: 'https://www.theguardian.com/environment/recycling/rss', source: 'The Guardian Recycling', defaultCategory: 'Recycling & Materials' },
  { url: 'https://www.sciencedaily.com/rss/earth_climate/recycling_and_waste.xml', source: 'ScienceDaily Waste & Recycling', defaultCategory: 'Waste Innovation & Science' }
];

// Strict Waste Management Keywords Filter
const WASTE_MANAGEMENT_KEYWORDS = [
  'waste',
  'solid waste',
  'recycl',
  'landfill',
  'garbage',
  'trash',
  'dump',
  'dumping',
  'e-waste',
  'electronic waste',
  'plastic waste',
  'microplastic',
  'compost',
  'organic waste',
  'food waste',
  'waste-to-energy',
  'biomedical waste',
  'hazardous waste',
  'industrial waste',
  'construction waste',
  'demolition waste',
  'rubble',
  'debris',
  'scrap',
  'circular economy',
  'sanitation',
  'litter',
  'refuse',
  'zero waste',
  'incinerat',
  'upcycl',
  'effluent',
  'pollution'
];

// Fallback high-quality curated waste management images by category if an RSS feed does not provide an image
const CATEGORY_FALLBACK_IMAGES = {
  'Plastic Waste': 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=900&q=80',
  'E-Waste & Electronics': 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=80',
  'Organic & Composting': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80',
  'Solid Waste & Landfill': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80',
  'Recycling & Circular Economy': 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=900&q=80',
  'Hazardous & Biomedical': 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=900&q=80',
  'Default': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80'
};

function assignCategory(title, description) {
  const text = (title + ' ' + (description || '')).toLowerCase();
  if (text.includes('e-waste') || text.includes('electronic') || text.includes('battery') || text.includes('phone') || text.includes('circuit')) {
    return 'E-Waste & Electronics';
  }
  if (text.includes('plastic') || text.includes('pet') || text.includes('microplastic') || text.includes('packaging')) {
    return 'Plastic Waste';
  }
  if (text.includes('compost') || text.includes('organic') || text.includes('food scrap') || text.includes('food waste')) {
    return 'Organic & Composting';
  }
  if (text.includes('landfill') || text.includes('dump') || text.includes('rubble') || text.includes('debris') || text.includes('solid waste')) {
    return 'Solid Waste & Landfill';
  }
  if (text.includes('hazard') || text.includes('chemical') || text.includes('biomedical') || text.includes('toxic') || text.includes('methane')) {
    return 'Hazardous & Biomedical';
  }
  return 'Recycling & Circular Economy';
}

function isStrictlyWasteRelated(title, description) {
  const text = (title + ' ' + (description || '')).toLowerCase();
  return WASTE_MANAGEMENT_KEYWORDS.some(keyword => text.includes(keyword));
}

function extractImage(item, category) {
  if (item.enclosure && item.enclosure.link && typeof item.enclosure.link === 'string') {
    return item.enclosure.link;
  }
  if (item.thumbnail && typeof item.thumbnail === 'string') {
    // Upscale Guardian thumbnails if present
    return item.thumbnail.replace(/width=\d+/i, 'width=800');
  }
  if (item.description && typeof item.description === 'string') {
    const match = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match && match[1]) {
      return match[1];
    }
  }
  return CATEGORY_FALLBACK_IMAGES[category] || CATEGORY_FALLBACK_IMAGES['Default'];
}

function sanitizeText(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function formatRelativeTime(dateString) {
  if (!dateString) return 'Today';
  try {
    const pubDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - pubDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return pubDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return 'Recent';
  }
}

// In-memory / session cache
const CACHE_KEY = 'ecobot_waste_flash_news_cache';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function fetchLiveWasteFlashNews(forceRefresh = false) {
  // Check cache if not forcing refresh
  if (!forceRefresh) {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(data) && data.length > 0) {
          return { success: true, data, fromCache: true };
        }
      }
    } catch (e) {
      // Ignore cache parse errors
    }
  }

  const allArticles = [];
  const seenUrls = new Set();
  const seenTitles = new Set();

  for (const feed of LIVE_FEEDS) {
    try {
      const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
      const response = await fetch(rss2jsonUrl);

      if (response.ok) {
        const payload = await response.json();
        if (payload.status === 'ok' && Array.isArray(payload.items)) {
          for (const item of payload.items) {
            if (!item.title || !item.link) continue;

            const cleanTitle = sanitizeText(item.title);
            const cleanDesc = sanitizeText(item.description || item.content || '');

            // Strict waste-management verification
            if (!isStrictlyWasteRelated(cleanTitle, cleanDesc)) continue;

            // Deduplicate
            const normalizedTitle = cleanTitle.toLowerCase();
            if (seenUrls.has(item.link) || seenTitles.has(normalizedTitle)) continue;

            seenUrls.add(item.link);
            seenTitles.add(normalizedTitle);

            const category = assignCategory(cleanTitle, cleanDesc);
            const imageUrl = extractImage(item, category);
            const relativeTime = formatRelativeTime(item.pubDate);

            allArticles.push({
              id: `flash-${seenUrls.size}-${Math.random().toString(36).slice(2, 7)}`,
              title: cleanTitle,
              summary: cleanDesc.length > 175 ? cleanDesc.slice(0, 175).trim() + '...' : cleanDesc,
              url: item.link,
              imageUrl: imageUrl,
              source: feed.source,
              category: category,
              pubDate: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Today',
              relativeTime: relativeTime,
              timestamp: item.pubDate ? new Date(item.pubDate).getTime() : Date.now()
            });
          }
        }
      }
    } catch (err) {
      console.warn(`Flash news fetch skipped for ${feed.source}:`, err.message);
    }
  }

  // Sort newest first
  allArticles.sort((a, b) => b.timestamp - a.timestamp);

  if (allArticles.length > 0) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: allArticles
      }));
    } catch (e) {
      // Storage quota or private mode fallback
    }
    return { success: true, data: allArticles, fromCache: false };
  }

  // If no articles fetched via online feed, return error
  return { success: false, data: [], error: 'Unable to load the latest news. Please try again later.' };
}
