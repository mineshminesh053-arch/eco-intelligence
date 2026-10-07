import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  Clock, 
  Recycle, 
  AlertCircle, 
  Filter, 
  Share2, 
  Bookmark, 
  BookmarkCheck,
  CheckCircle2,
  Trash2,
  Cpu,
  Leaf,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { fetchLiveWasteFlashNews } from '../services/flashNewsService';
import FlashNewsTicker from '../components/FlashNewsTicker';

export default function NewsView() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { id: 'All', label: 'All Waste News', icon: Recycle },
    { id: 'Solid Waste & Landfill', label: 'Solid Waste & Landfills', icon: Trash2 },
    { id: 'Recycling & Circular Economy', label: 'Recycling & Circular', icon: Sparkles },
    { id: 'Plastic Waste', label: 'Plastic Waste', icon: Layers },
    { id: 'E-Waste & Electronics', label: 'E-Waste & Batteries', icon: Cpu },
    { id: 'Organic & Composting', label: 'Organic & Composting', icon: Leaf },
  ];

  const loadNews = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetchLiveWasteFlashNews(isManualRefresh);
      if (res.success && res.data.length > 0) {
        setArticles(res.data);
        setError(null);
      } else {
        setError(res.error || 'No latest waste-management news available right now.');
      }
    } catch (err) {
      setError('Unable to load the latest news. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  useEffect(() => {
    loadNews(false);
    // Periodically refresh news every 5 minutes
    const interval = setInterval(() => {
      loadNews(true);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleBookmark = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleShare = (e, article) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${article.title}\nRead more: ${article.url}`);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredArticles = articles.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-view-container" style={{ padding: '24px 28px' }}>
      {/* Top Banner Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              Live Waste Management Flash News
            </h1>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              background: '#ef4444',
              color: 'white',
              borderRadius: '20px',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              boxShadow: '0 2px 6px rgba(239, 68, 68, 0.3)'
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'white', display: 'inline-block', animation: 'pulse-pin 1.5s infinite' }}></span>
              LIVE FEED
            </span>
          </div>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time, verified news strictly covering municipal sanitation, recycling initiatives, circular economy, and waste reduction.
          </p>
        </div>

        {/* Live Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {lastUpdated && (
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Updated: <strong>{lastUpdated}</strong>
            </span>
          )}
          <button
            onClick={() => loadNews(true)}
            disabled={loading || refreshing}
            className="btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} className={refreshing ? 'spin-animation' : ''} />
            <span>{refreshing ? 'Fetching Live...' : 'Refresh Feed'}</span>
          </button>
        </div>
      </div>

      {/* Embedded Live Flash News Ticker */}
      <FlashNewsTicker />

      {/* Search & Category Filter Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px 0 26px 0' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', maxWidth: '640px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search live waste topics (e.g. e-waste, recycling plant, landfills, plastic bans, composting)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 16px 11px 42px',
              borderRadius: '10px',
              border: '1px solid var(--border-light)',
              fontSize: '0.88rem',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-dark)',
              outline: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '20px',
                  border: isSelected ? '1px solid var(--primary-blue)' : '1px solid var(--border-light)',
                  background: isSelected ? 'var(--primary-blue)' : 'var(--bg-card)',
                  color: isSelected ? 'white' : 'var(--text-subtle)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 2px 6px rgba(37,99,235,0.25)' : 'none'
                }}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading Skeleton State */}
      {loading ? (
        <div className="flash-news-grid">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="flash-news-card skeleton-card">
              <div className="skeleton-image"></div>
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="skeleton-line" style={{ width: '40%' }}></div>
                <div className="skeleton-line" style={{ width: '85%', height: '18px' }}></div>
                <div className="skeleton-line" style={{ width: '100%' }}></div>
                <div className="skeleton-line" style={{ width: '70%' }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : error && articles.length === 0 ? (
        /* Error State */
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--bg-card)',
          borderRadius: '16px',
          border: '1px solid var(--border-light)',
          maxWidth: '560px',
          margin: '30px auto'
        }}>
          <AlertCircle size={48} color="#ef4444" style={{ marginBottom: '14px' }} />
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '8px' }}>
            Unable to load the latest news. Please try again later.
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '18px' }}>
            The live waste management news feed could not be reached right now.
          </p>
          <button onClick={() => loadNews(true)} className="btn-primary" style={{ padding: '8px 18px' }}>
            <RefreshCw size={15} />
            <span>Try Again</span>
          </button>
        </div>
      ) : filteredArticles.length === 0 ? (
        /* Empty State */
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--bg-card)',
          borderRadius: '16px',
          border: '1px solid var(--border-light)',
          maxWidth: '560px',
          margin: '30px auto'
        }}>
          <Recycle size={48} color="var(--primary-blue)" style={{ marginBottom: '14px' }} />
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '8px' }}>
            No latest waste-management news available right now.
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '18px' }}>
            Try resetting your search query or choosing another category filter.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="btn-primary"
            style={{ padding: '8px 18px' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* Image-First Flash News Cards Grid */
        <div className="flash-news-grid">
          {filteredArticles.map((article) => (
            <article key={article.id} className="flash-news-card">
              {/* 1. Clickable News Image Container */}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flash-image-link"
                title={`Click to read original article: ${article.title}`}
                aria-label={`Read article: ${article.title}`}
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="flash-news-img"
                  loading="lazy"
                  onError={(e) => {
                    // Safe fallback if external image fails
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                {/* 🔴 Flash News Overlay Badge */}
                <div className="flash-news-badge-overlay">
                  <span className="badge-pulse-dot"></span>
                  <Flame size={12} />
                  <span>FLASH NEWS</span>
                </div>
                {/* External link hover indicator */}
                <div className="image-hover-overlay">
                  <ExternalLink size={20} color="white" />
                  <span>Read Article</span>
                </div>
              </a>

              {/* Card Body Content */}
              <div className="flash-card-body">
                <div>
                  {/* Category & Meta */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="flash-category-tag">
                      ♻️ {article.category}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={12} />
                      {article.relativeTime}
                    </span>
                  </div>

                  {/* Clickable Headline */}
                  <h2 className="flash-headline">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={article.title}
                      className="headline-link"
                    >
                      {article.title}
                    </a>
                  </h2>

                  {/* 1-2 Sentence Short Summary */}
                  <p className="flash-summary">
                    {article.summary}
                  </p>
                </div>

                {/* Card Footer: Source & Clickable Read More */}
                <div className="flash-card-footer">
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Source: <strong style={{ color: 'var(--text-dark)' }}>{article.source}</strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={(e) => toggleBookmark(e, article.id)}
                      className="icon-action-btn"
                      title="Bookmark Article"
                      aria-label="Bookmark article"
                    >
                      {bookmarkedIds.has(article.id) ? (
                        <BookmarkCheck size={16} color="var(--primary-blue)" />
                      ) : (
                        <Bookmark size={16} />
                      )}
                    </button>

                    <button
                      onClick={(e) => handleShare(e, article)}
                      className="icon-action-btn"
                      title="Share Article Link"
                      aria-label="Share article"
                    >
                      {copiedId === article.id ? (
                        <CheckCircle2 size={16} color="#16a34a" />
                      ) : (
                        <Share2 size={16} />
                      )}
                    </button>

                    {/* Exact Clickable Read More Button */}
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more-btn"
                      title={`Read full article on ${article.source}`}
                    >
                      <span>READ MORE</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
