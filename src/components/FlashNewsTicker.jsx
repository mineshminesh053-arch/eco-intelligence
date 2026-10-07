import React, { useState, useEffect } from 'react';
import { Flame, ExternalLink, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';
import { fetchLiveWasteFlashNews } from '../services/flashNewsService';

export default function FlashNewsTicker() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadTickerNews() {
      try {
        const res = await fetchLiveWasteFlashNews(false);
        if (isMounted) {
          if (res.success && res.data.length > 0) {
            setArticles(res.data);
            setError(null);
          } else {
            setError('Unable to load live news ticker.');
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load news ticker.');
          setLoading(false);
        }
      }
    }

    loadTickerNews();
    // Refresh periodically every 5 minutes
    const interval = setInterval(loadTickerNews, 5 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flash-news-ticker-bar">
        <div className="ticker-badge">
          <span className="ticker-pulse-dot"></span>
          <span>FLASH NEWS</span>
        </div>
        <div className="ticker-content" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
          Loading real-time waste management flash updates...
        </div>
      </div>
    );
  }

  if (error || articles.length === 0) {
    return null; // Gracefully stay hidden if no ticker items
  }

  // Display top 8 flash items
  const tickerItems = articles.slice(0, 8);

  return (
    <div className="flash-news-ticker-bar" role="region" aria-label="Waste Management Flash News Ticker">
      <div className="ticker-badge">
        <span className="ticker-pulse-dot"></span>
        <Flame size={13} style={{ marginRight: '2px' }} />
        <span>FLASH NEWS</span>
      </div>

      <div className="ticker-track-container">
        <div className="ticker-track">
          {tickerItems.concat(tickerItems).map((article, idx) => (
            <a
              key={`${article.id}-${idx}`}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ticker-item"
              title={`Read: ${article.title} (${article.source})`}
            >
              <span className="ticker-item-category">♻️ {article.category}</span>
              <span className="ticker-item-title">{article.title}</span>
              <span className="ticker-item-source">• {article.source}</span>
              <ChevronRight size={12} className="ticker-arrow" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
