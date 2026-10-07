import React from 'react';
import { MessageSquare, AlertTriangle, Search, BarChart3, BookOpen, PlusCircle, Newspaper, Sun, Moon, Video, VideoOff } from 'lucide-react';

export default function TopHeader({ activeTab, setActiveTab, theme, toggleTheme, videoPlaying, toggleVideoPlayback }) {
  const getTitle = () => {
    switch(activeTab) {
      case 'chat': return 'ECO - INTELLIGENCE Assistant';
      case 'solutions': return '✨ Waste Solutions & Video Guides';
      case 'report': return 'Task: Submit Waste Incident Report';
      case 'track': return 'Task: Live Incident Tracker';
      case 'analytics': return 'Task: Live Map & Sanitation Analytics';
      case 'news': return 'Live Waste Management Flash News';
      case 'guide': return 'Task: Waste Disposal & Bin Guidelines';
      default: return 'ECO - INTELLIGENCE Platform';
    }
  };

  const tabs = [
    { id: 'chat', label: 'AI Chat' },
    { id: 'solutions', label: '✨ Solutions' },
    { id: 'report', label: 'Report Form' },
    { id: 'track', label: 'Track Status' },
    { id: 'analytics', label: 'Live Map' },
    { id: 'news', label: 'Flash News' },
    { id: 'guide', label: 'Guide' },
  ];

  return (
    <header className="top-header">
      <div className="page-title-badge">
        <h1 className="page-title">{getTitle()}</h1>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span>Municipal Bot Connected</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Background Video Toggle */}
        {toggleVideoPlayback && (
          <button
            onClick={toggleVideoPlayback}
            className="theme-toggle-btn"
            title={videoPlaying ? 'Pause Animated Background Video' : 'Play Animated Background Video'}
            aria-label="Toggle Background Video"
            style={{ padding: '6px 10px', gap: '6px' }}
          >
            {videoPlaying ? (
              <>
                <Video size={15} color="var(--primary-blue)" />
                <span style={{ fontSize: '0.8rem' }}>Video ON</span>
              </>
            ) : (
              <>
                <VideoOff size={15} color="var(--text-muted)" />
                <span style={{ fontSize: '0.8rem' }}>Video OFF</span>
              </>
            )}
          </button>
        )}

        {/* Day & Night Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={theme === 'dark' ? 'Switch to Day (Light) Mode' : 'Switch to Night (Dark) Mode'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun size={16} color="#fbbf24" />
              <span>Day Mode</span>
            </>
          ) : (
            <>
              <Moon size={16} color="#64748b" />
              <span>Night Mode</span>
            </>
          )}
        </button>

        {activeTab !== 'report' && (
          <button 
            className="btn-primary" 
            onClick={() => setActiveTab('report')}
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            <PlusCircle size={16} />
            <span>Report Waste</span>
          </button>
        )}

        <div style={{ display: 'flex', background: 'var(--bg-card-subtle)', padding: '4px', borderRadius: '8px', gap: '2px', border: '1px solid var(--border-light)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                border: 'none',
                background: activeTab === tab.id ? 'var(--bg-card)' : 'transparent',
                color: activeTab === tab.id ? 'var(--primary-blue)' : 'var(--text-muted)',
                padding: '6px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: 13,
                boxShadow: activeTab === tab.id ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}


