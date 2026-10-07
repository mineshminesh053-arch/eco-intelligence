import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Check, 
  X, 
  Info,
  Recycle,
  Trash2,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { WASTE_GUIDES } from '../data/mockData';

export default function GuideView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuideModal, setSelectedGuideModal] = useState(null);

  const filteredGuides = WASTE_GUIDES.filter(g => 
    g.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.binColor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="page-view-container">
      <div className="page-header" style={{ maxWidth: '800px', margin: '0 auto 20px', textAlign: 'center' }}>
        <h1>Waste Disposal & Recycling Guide</h1>
        <p>Hover any bin card to spotlight its 3D Morphic view. Click any card to inspect full centered details.</p>
      </div>

      {/* Search Input */}
      <div className="status-search-box" style={{ maxWidth: '800px', margin: '0 auto 24px' }}>
        <input 
          type="text" 
          className="form-input" 
          style={{ flex: 1 }}
          placeholder="Search items (e.g. plastic bottle, battery, food scraps, paint)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-primary">
          <Search size={16} />
          <span>Filter</span>
        </button>
      </div>

      {/* Interactive Category Grid with Morphic Focus Spotlight */}
      <div className="guide-morphic-grid" style={{ marginBottom: '36px' }}>
        {filteredGuides.map((guide) => (
          <div 
            key={guide.id} 
            className="guide-card morphic-interactive-card"
            onClick={() => setSelectedGuideModal(guide)}
            title="Click to open Centered 3D Morphicum View"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              {/* 3D Morphic Icon Plate */}
              <div 
                className="bin-morphic-plate"
                style={{ 
                  background: `linear-gradient(135deg, ${guide.binHex}, ${guide.binHex}cc)`,
                  boxShadow: `0 8px 24px ${guide.binHex}55, inset 0 1.5px 2px rgba(255,255,255,0.8), inset 0 -1.5px 2px rgba(0,0,0,0.25)`
                }}
              >
                <span className="morphic-emoji">{guide.icon}</span>
              </div>
              <span 
                className="bin-badge"
                style={{ 
                  backgroundColor: guide.binHex, 
                  color: 'white',
                  boxShadow: `0 4px 12px ${guide.binHex}44`
                }}
              >
                {guide.binColor}
              </span>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '8px 0', color: 'var(--text-dark)' }}>
              {guide.category}
            </h3>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              <strong>Accepted Items:</strong>
              <ul style={{ paddingLeft: '18px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {guide.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            </div>

            <div style={{
              background: 'var(--bg-card-subtle)',
              borderLeft: `4px solid ${guide.binHex}`,
              padding: '10px 12px',
              fontSize: '0.8rem',
              borderRadius: '0 8px 8px 0',
              color: 'var(--text-subtle)',
              marginBottom: '12px'
            }}>
              <strong>Instructions:</strong> {guide.instructions}
            </div>

            <div className="card-click-hint">
              <span>🔍 Click for Centered Morphic View</span>
              <Maximize2 size={13} />
            </div>
          </div>
        ))}
      </div>

      {/* CENTERED MORPHIC SHOWCASE MODAL */}
      {selectedGuideModal && (
        <div 
          className="morphic-modal-overlay"
          onClick={() => setSelectedGuideModal(null)}
        >
          <div 
            className="morphic-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="morphic-modal-close"
              onClick={() => setSelectedGuideModal(null)}
              title="Close modal"
            >
              ✖
            </button>

            {/* Giant Centered 3D Morphic Icon Plate */}
            <div 
              className="giant-morphic-icon-plate"
              style={{
                background: `linear-gradient(135deg, ${selectedGuideModal.binHex}, ${selectedGuideModal.binHex}dd)`,
                boxShadow: `0 16px 45px ${selectedGuideModal.binHex}66, inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.3)`
              }}
            >
              <span style={{ fontSize: '3.5rem' }}>{selectedGuideModal.icon}</span>
            </div>

            <div className="bin-badge" style={{ backgroundColor: selectedGuideModal.binHex, color: 'white', marginTop: '16px', fontSize: '0.9rem', padding: '6px 16px' }}>
              {selectedGuideModal.binColor}
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '12px', marginBottom: '8px', textAlign: 'center' }}>
              {selectedGuideModal.category}
            </h2>

            <div style={{ width: '100%', marginTop: '16px', textAlign: 'left' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '8px' }}>
                ✅ Accepted Items Checklist:
              </h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem' }}>
                {selectedGuideModal.items.map((item, idx) => (
                  <li key={idx} style={{ color: 'var(--text-dark)', fontWeight: 500 }}>{item}</li>
                ))}
              </ul>

              <div style={{
                marginTop: '16px',
                background: 'var(--bg-card-subtle)',
                borderLeft: `4px solid ${selectedGuideModal.binHex}`,
                padding: '12px 16px',
                borderRadius: '0 8px 8px 0',
                fontSize: '0.88rem'
              }}>
                <strong>Disposal Instructions:</strong>
                <p style={{ marginTop: '4px', color: 'var(--text-subtle)' }}>{selectedGuideModal.instructions}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', width: '100%' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1, padding: '10px' }}
                onClick={() => setSelectedGuideModal(null)}
              >
                Close Centered Morphic View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Municipal Waste Best Practices & Video/Image Showcase */}
      <div className="form-card" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="nav-icon-plate guide" style={{ width: 36, height: 36 }}>
              <ShieldCheck size={20} color="white" />
            </div>
            <span>Municipal Waste Best Practices & Visual Media</span>
          </h3>
          <span style={{ fontSize: '0.78rem', background: 'var(--primary-light)', color: 'var(--primary-blue)', border: '1px solid var(--primary-border)', padding: '4px 12px', borderRadius: '14px', fontWeight: 700 }}>
            🎥 Live Video & 📸 Infographics Included
          </span>
        </div>

        {/* Top 2 Columns: DO'S and DON'TS with High Contrast Text */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.35)', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.08)' }}>
            <div style={{ color: '#10b981', fontWeight: 800, fontSize: '1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Check size={20} strokeWidth={3} />
              <span>DO'S FOR CLEAN COMMUNITY</span>
            </div>
            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-dark)', fontSize: '0.9rem', fontWeight: 500 }}>
              <li>Rinse plastic & glass food containers before blue bin disposal.</li>
              <li>Separate battery & electronics into designated red e-waste boxes.</li>
              <li>Tie trash bags securely to prevent wind scatter & pest attraction.</li>
              <li>Use ECO - INTELLIGENCE to report overflowing municipal dumpsters immediately.</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.35)', boxShadow: '0 4px 16px rgba(239, 68, 68, 0.08)' }}>
            <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <X size={20} strokeWidth={3} />
              <span>DON'TS FOR ZERO WASTE</span>
            </div>
            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-dark)', fontSize: '0.9rem', fontWeight: 500 }}>
              <li>NEVER pour hazardous paint, oils, or chemicals down drain sewers.</li>
              <li>DO NOT mix sharp glass or syringes into regular organic bins.</li>
              <li>Avoid dumping bulky furniture on public sidewalks without requesting a bulk ticket.</li>
              <li>Avoid using single-use plastic bags when organic alternatives exist.</li>
            </ul>
          </div>
        </div>

        {/* Media Row: Embedded Video Guide & Visual Solution Infographic Banners */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '20px' }}>
          {/* Animated Video Guide Player Card */}
          <div style={{ background: 'var(--bg-card-subtle)', borderRadius: '16px', border: '1px solid var(--border-glass)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🎥 Animated Video Guide
              </span>
              <span style={{ fontSize: '0.68rem', background: '#dc2626', color: 'white', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                HD Video
              </span>
            </div>

            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <video 
                src="/character_sorting_waste.mp4" 
                controls 
                autoPlay 
                loop 
                muted 
                playsInline
                style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Interactive 3D character waste sorting & recycling demonstration
            </div>
          </div>

          {/* E-Waste Solution Visual Infographic Banner */}
          <div 
            style={{ 
              background: 'var(--bg-card-subtle)', 
              borderRadius: '16px', 
              border: '1px solid var(--border-glass)', 
              padding: '14px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedGuideModal({
              category: '⚡ E-Waste Management Infographic',
              binColor: 'Red Container',
              binHex: '#dc2626',
              icon: '⚡',
              items: ['Lithium Battery Terminals', 'Circuit Board Metals', 'Smartphones & Laptops'],
              instructions: 'Click to view full HD solution diagram with terminal care instructions.'
            })}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-dark)' }}>
                📸 E-Waste Diagram
              </span>
              <span style={{ fontSize: '0.68rem', background: '#2563eb', color: 'white', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                Visual
              </span>
            </div>
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '180px', border: '1px solid var(--border-light)' }}>
              <img 
                src="/ewaste_solution.jpg" 
                alt="E-Waste Solutions Infographic" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--primary-blue)', fontWeight: 600, textAlign: 'center' }}>
              🔍 Click to enlarge E-Waste Solution Infographic
            </div>
          </div>

          {/* Household Organic Waste Solution Infographic Banner */}
          <div 
            style={{ 
              background: 'var(--bg-card-subtle)', 
              borderRadius: '16px', 
              border: '1px solid var(--border-glass)', 
              padding: '14px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedGuideModal({
              category: '🌿 Household & Composting Infographic',
              binColor: 'Green Bin',
              binHex: '#10b981',
              icon: '🌿',
              items: ['30-Day Home Composting', 'Food Scraps & Dry Leaves', 'Biogas Digester'],
              instructions: 'Click to inspect step-by-step home composting and organic waste recycling.'
            })}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-dark)' }}>
                📸 Organic Waste Diagram
              </span>
              <span style={{ fontSize: '0.68rem', background: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                Visual
              </span>
            </div>
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '180px', border: '1px solid var(--border-light)' }}>
              <img 
                src="/normal_waste_solution.jpg" 
                alt="Household Waste Solutions Infographic" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600, textAlign: 'center' }}>
              🔍 Click to enlarge Organic Waste Infographic
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

