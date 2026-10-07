import React from 'react';
import { 
  MessageSquare, 
  AlertTriangle, 
  Search, 
  BarChart3, 
  BookOpen, 
  Plus, 
  Recycle, 
  Leaf,
  CheckCircle2, 
  MapPin,
  Sparkles,
  Newspaper,
  Sun,
  Moon
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onNewChat, chatHistory, theme, toggleTheme }) {
  const navItems = [
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare, badge: 'AI' },
    { id: 'solutions', label: 'Waste Solutions', icon: Sparkles, badge: 'Featured' },
    { id: 'report', label: 'Report Waste', icon: AlertTriangle, badge: 'Task' },
    { id: 'track', label: 'Track Report Status', icon: Search },
    { id: 'analytics', label: 'Live Map & Analytics', icon: BarChart3 },
    { id: 'news', label: 'Flash News', icon: Newspaper, badge: 'Live' },
    { id: 'guide', label: 'Disposal & Recycling Guide', icon: BookOpen },
  ];

  return (
    <aside className="sidebar">
      {/* Gentle & Professional Brand Header */}
      <div className="sidebar-header">
        <a href="#chat" className="brand-logo" onClick={(e) => { e.preventDefault(); setActiveTab('chat'); }}>
          <div className="brand-icon">
            <Leaf size={19} strokeWidth={2.2} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              fontWeight: 800, 
              fontSize: '0.95rem', 
              letterSpacing: '0.04em', 
              color: 'var(--text-dark)',
              lineHeight: 1.2
            }}>
              <span style={{ color: '#10b981' }}>ECO</span> - INTELLIGENCE
            </div>
            <div style={{ 
              fontSize: '0.67rem', 
              fontWeight: 500, 
              color: 'var(--text-muted)', 
              letterSpacing: '0.02em',
              marginTop: '1px'
            }}>
              Smart Sustainability Platform
            </div>
          </div>
        </a>
      </div>

      {/* New Chat Button */}
      <button className="new-chat-btn" onClick={() => { setActiveTab('chat'); onNewChat(); }}>
        <Plus size={18} />
        <span>New AI Session</span>
      </button>

      {/* Main Navigation */}
      <div className="sidebar-nav">
        <div className="nav-section-title">Navigation & Tools</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className={`nav-icon-plate ${item.id}`}>
                <Icon size={16} strokeWidth={2.2} />
              </div>
              <span style={{ flex: 1, fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
              {item.badge && (
                <span 
                  style={{ 
                    fontSize: '0.65rem', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    background: item.badge === 'Live' ? '#fee2e2' : (item.badge === 'New' ? '#dcfce7' : (isActive ? 'var(--primary-blue)' : 'var(--bg-card-subtle)')),
                    color: item.badge === 'Live' ? '#dc2626' : (item.badge === 'New' ? '#16a34a' : (isActive ? 'white' : 'var(--text-muted)')),
                    fontWeight: 700
                  }}
                >
                  {item.badge === 'Live' ? '🔴 Live' : item.badge}
                </span>
              )}
            </div>
          );
        })}

        {/* Recent Chat History */}
        <div className="nav-section-title" style={{ marginTop: '20px' }}>Recent AI Chats</div>
        {chatHistory && chatHistory.length > 0 ? (
          chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="nav-item"
              style={{ fontSize: '0.82rem', padding: '8px 12px', color: 'var(--text-muted)' }}
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare size={14} style={{ opacity: 0.7 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {chat.title}
              </span>
            </div>
          ))
        ) : (
          <div style={{ padding: '8px 16px', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
            No recent sessions
          </div>
        )}
      </div>

      {/* Footer Info & Quick Theme Toggle */}
      <div className="sidebar-footer">
        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.78rem',
            fontWeight: 500,
            padding: '4px 6px',
            borderRadius: '6px'
          }}
          title={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
        >
          {theme === 'dark' ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#64748b" />}
          <span>{theme === 'dark' ? 'Day' : 'Night'} Mode</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#94a3b8' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
          <span>Online</span>
        </div>
      </div>
    </aside>
  );
}


