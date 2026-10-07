import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Cpu, 
  Leaf, 
  Recycle, 
  Video, 
  Play, 
  Pause, 
  Maximize2, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  Battery, 
  ShieldCheck, 
  Layers, 
  AlertTriangle,
  FileImage,
  RefreshCw,
  Award,
  BookOpen
} from 'lucide-react';

export default function SolutionsView({ setActiveTab }) {
  const [activeCategory, setActiveCategory] = useState('ewaste'); // 'ewaste' | 'normal' | 'video'
  const [selectedVideo, setSelectedVideo] = useState('sorting');
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalImage, setModalImage] = useState(null); // image src for modal viewer
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const videoPlaylist = [
    {
      id: 'sorting',
      title: '🎬 Live Motion Guide: Waste Sorting & Bin Separation',
      desc: 'Watch our animated guide demonstrating proper waste segregation across Green, Blue, Yellow & Red bins.',
      src: '/character_sorting_waste.mp4',
      badge: 'Featured Video',
      duration: '0:45',
      steps: [
        '00:05 — Separating food scraps into Green Organic Bin',
        '00:15 — Rinsing plastic PET bottles & depositing in Blue Bin',
        '00:25 — Taping battery terminals for Red E-Waste Bin',
        '00:35 — Bagging residual landfill trash tightly'
      ]
    },
    {
      id: 'ewaste',
      title: '💻 E-Waste Recycling & Precious Metal Recovery',
      desc: 'Step-by-step visual demonstration of disassembling electronics and recovering copper, gold & silver.',
      src: '/character_sorting_waste.mp4',
      badge: 'E-Waste Special',
      duration: '0:50',
      steps: [
        '00:05 — Collecting old laptops, smartphones, and chargers',
        '00:18 — Safe battery removal & fire hazard prevention',
        '00:30 — Printed Circuit Board (PCB) shredding & sorting',
        '00:42 — Eco-friendly hydrometallurgical metal refining'
      ]
    },
    {
      id: 'composting',
      title: '🌱 Organic Food Waste Composting (Black Gold Soil)',
      desc: 'Learn how household kitchen food scraps turn into rich nutrient garden fertilizer in 30 days.',
      src: '/character_sorting_waste.mp4',
      badge: 'Green Solution',
      duration: '0:40',
      steps: [
        '00:05 — Mixing wet food waste (greens) with dry leaves (browns)',
        '00:15 — Maintaining 50% moisture & proper aeration',
        '00:28 — Turning the compost pile weekly to boost micro-organisms',
        '00:38 — Harvesting dark, rich organic humus for plants'
      ]
    }
  ];

  const activeVideoObj = videoPlaylist.find(v => v.id === selectedVideo) || videoPlaylist[0];

  return (
    <div className="page-view-container">
      {/* Header Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(16,185,129,0.15) 100%)',
          border: '1px solid var(--border-light)',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '28px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ 
            background: 'linear-gradient(135deg, #2563eb, #10b981)', 
            color: 'white', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '5px' 
          }}>
            <Sparkles size={14} /> SPECIAL SOLUTIONS HUB
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Easy Visual & Video Guides</span>
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '6px 0 10px', color: 'var(--text-dark)' }}>
          Comprehensive Waste Management Solutions
        </h1>
        <p style={{ maxWidth: '750px', fontSize: '0.95rem', color: 'var(--text-subtle)', lineHeight: 1.6 }}>
          Explore easy-to-understand solutions for <strong>Electronic Waste (E-Waste)</strong> and <strong>Household/Normal Waste</strong>. 
          View our high-definition <strong>visual infographics</strong> and watch <strong>step-by-step motion video guides</strong> for quick learning!
        </p>

        {/* Category Switcher Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveCategory('organic')}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: activeCategory === 'organic' ? '2px solid #16a34a' : '1px solid var(--border-light)',
              background: activeCategory === 'organic' ? 'var(--bg-card)' : 'rgba(255,255,255,0.5)',
              color: activeCategory === 'organic' ? '#16a34a' : 'var(--text-dark)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeCategory === 'organic' ? '0 4px 12px rgba(22,163,74,0.15)' : 'none'
            }}
          >
            <Leaf size={18} color="#16a34a" />
            <span>🌱 Organic Waste Recycling</span>
          </button>

          <button
            onClick={() => setActiveCategory('ewaste')}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: activeCategory === 'ewaste' ? '2px solid #2563eb' : '1px solid var(--border-light)',
              background: activeCategory === 'ewaste' ? 'var(--bg-card)' : 'rgba(255,255,255,0.5)',
              color: activeCategory === 'ewaste' ? '#2563eb' : 'var(--text-dark)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeCategory === 'ewaste' ? '0 4px 12px rgba(37,99,235,0.15)' : 'none'
            }}
          >
            <Cpu size={18} />
            <span>⚡ E-Waste Solutions</span>
          </button>

          <button
            onClick={() => setActiveCategory('normal')}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: activeCategory === 'normal' ? '2px solid #10b981' : '1px solid var(--border-light)',
              background: activeCategory === 'normal' ? 'var(--bg-card)' : 'rgba(255,255,255,0.5)',
              color: activeCategory === 'normal' ? '#10b981' : 'var(--text-dark)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeCategory === 'normal' ? '0 4px 12px rgba(16,185,129,0.15)' : 'none'
            }}
          >
            <Leaf size={18} />
            <span>🌿 Normal Household Waste</span>
          </button>

          <button
            onClick={() => setActiveCategory('video')}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: activeCategory === 'video' ? '2px solid #8b5cf6' : '1px solid var(--border-light)',
              background: activeCategory === 'video' ? 'var(--bg-card)' : 'rgba(255,255,255,0.5)',
              color: activeCategory === 'video' ? '#8b5cf6' : 'var(--text-dark)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeCategory === 'video' ? '0 4px 12px rgba(139,92,246,0.15)' : 'none'
            }}
          >
            <Video size={18} />
            <span>🎥 Video Solution Center</span>
          </button>
        </div>
      </div>

      {/* SECTION 0: ORGANIC WASTE RECYCLING SOLUTIONS */}
      {(activeCategory === 'organic' || activeCategory === 'all') && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
              <Leaf color="#16a34a" size={24} />
              <span>Organic Waste Recycling & Composting Hub</span>
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#16a34a', background: '#dcfce7', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>
              Bio-Circular Solution
            </span>
          </div>

          {/* Organic Recycling Visual Diagram Card */}
          <div className="form-card" style={{ marginBottom: '24px', overflow: 'hidden', padding: 0 }}>
            <div style={{ padding: '16px 20px', background: 'var(--bg-card-subtle)', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileImage size={18} color="#16a34a" />
                  Organic Food Scrap Composting Visual Infographic
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Click diagram to enlarge 30-day aerobic composting and bio-fertilizer steps</p>
              </div>
              <button 
                onClick={() => setModalImage('/normal_waste_solution.jpg')}
                className="btn-primary" 
                style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#16a34a', borderColor: '#16a34a' }}
              >
                <Maximize2 size={14} />
                <span>Enlarge Diagram</span>
              </button>
            </div>
            
            <div 
              style={{ position: 'relative', cursor: 'pointer', backgroundColor: '#0f172a', textAlign: 'center' }}
              onClick={() => setModalImage('/normal_waste_solution.jpg')}
            >
              <img 
                src="/normal_waste_solution.jpg" 
                alt="Organic Waste Recycling Infographic" 
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.75)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Maximize2 size={14} /> Click to Expand HD Organic Diagram
              </div>
            </div>
          </div>

          {/* 4 Organic Waste Recycling Methods Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🍏 1. 30-Day Home Composting
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#166534', lineHeight: 1.5, margin: 0 }}>
                Mix 50% wet food scraps (greens) with 50% dry leaves/paper (browns). Turn pile weekly for oxygenation. Harvest dark, nutrient-dense garden soil humus in 30 days.
              </p>
            </div>

            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ⚡ 2. Biogas Anaerobic Digesters
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#065f46', lineHeight: 1.5, margin: 0 }}>
                Seal food waste in oxygen-free tanks. Methanogenic bacteria convert organic matter into clean methane fuel gas for cooking and electricity generation.
              </p>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#15803d', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🪱 3. Vermicomposting (Worm Farms)
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#166534', lineHeight: 1.5, margin: 0 }}>
                Red wiggler earthworms consume fruit peels and coffee grounds 2x faster than traditional composting, producing rich worm castings (black gold plant food).
              </p>
            </div>

            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#047857', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🦗 4. Black Soldier Fly Bio-Upcycling
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#065f46', lineHeight: 1.5, margin: 0 }}>
                Industrial eco-reactors use BSFL larvae to consume metric tons of commercial food waste daily, yielding high-protein poultry feed and organic frass fertilizer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: E-WASTE SOLUTIONS */}
      {(activeCategory === 'ewaste' || activeCategory === 'all') && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
              <Cpu color="#2563eb" size={24} />
              <span>Electronic Waste (E-Waste) Management Solutions</span>
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#2563eb', background: '#eff6ff', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
              Specialized E-Waste Protocol
            </span>
          </div>

          {/* Visual Infographic Image Solution Card */}
          <div className="form-card" style={{ marginBottom: '24px', overflow: 'hidden', padding: 0 }}>
            <div style={{ padding: '16px 20px', background: 'var(--bg-card-subtle)', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileImage size={18} color="#2563eb" />
                  E-Waste Solution Visual Infographic
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Click image to enlarge and inspect all 4 recovery steps in detail</p>
              </div>
              <button 
                onClick={() => setModalImage('/ewaste_solution.jpg')}
                className="btn-primary" 
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                <Maximize2 size={14} />
                <span>Enlarge Diagram</span>
              </button>
            </div>
            
            <div 
              style={{ position: 'relative', cursor: 'pointer', backgroundColor: '#0f172a', textAlign: 'center' }}
              onClick={() => setModalImage('/ewaste_solution.jpg')}
            >
              <img 
                src="/ewaste_solution.jpg" 
                alt="E-Waste Management Solutions Infographic" 
                style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.75)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Maximize2 size={14} /> Click to Expand HD Infographic
              </div>
            </div>
          </div>

          {/* Easy Step-by-Step E-Waste Solutions Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>1</div>
                <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-dark)' }}>Collection & Terminal Taping</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', lineHeight: 1.5 }}>
                Collect old phones, laptops, chargers, and batteries. Tape lithium battery contacts with electrical tape to prevent short-circuits and accidental fire hazards.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '8px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>2</div>
                <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-dark)' }}>Authorized E-Waste Drop-Off</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', lineHeight: 1.5 }}>
                Deposit items at designated municipal Red E-Waste Bins or authorized manufacturer drop-off centers under Extended Producer Responsibility (EPR) programs.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>3</div>
                <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-dark)' }}>Safe Dismantling & Sorting</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', lineHeight: 1.5 }}>
                Certified technicians safely disassemble electronics into plastics, glass screens, copper wiring, and Printed Circuit Boards (PCBs) without toxic emissions.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '8px', background: '#faf5ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>4</div>
                <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-dark)' }}>Precious Metal Extraction</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', lineHeight: 1.5 }}>
                Advanced eco-hydrometallurgy extracts valuable Gold, Silver, Copper, and Palladium from circuit boards, feeding materials back into green manufacturing.
              </p>
            </div>
          </div>

          {/* VISUAL PROCESS FLOW AT THE DOWN / BOTTOM PART OF E-WASTAGE MANAGEMENT */}
          <div style={{ marginTop: '28px', background: 'var(--bg-card-subtle)', borderRadius: '16px', border: '1px solid var(--border-glass)', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu color="#2563eb" size={20} />
              <span>E-Waste Dismantling, Cleaning & Precious Metal Recovery Process (Image Format)</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <div 
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setModalImage('/ewaste_solution.jpg')}
              >
                <img src="/ewaste_solution.jpg" alt="Terminal Taping" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#2563eb' }}>Phase 1: Safe Lithium Terminal Insulation</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Taping battery contacts & isolating phone/laptop components.</div>
                </div>
              </div>

              <div 
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setModalImage('/ewaste_solution.jpg')}
              >
                <img src="/ewaste_solution.jpg" alt="PCB Shredding" style={{ width: '100%', height: '140px', objectFit: 'cover', filter: 'hue-rotate(60deg)' }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#2563eb' }}>Phase 2: Automated Circuit Board Shredding</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Dismantling Printed Circuit Boards (PCBs) & density separation.</div>
                </div>
              </div>

              <div 
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setModalImage('/ewaste_solution.jpg')}
              >
                <img src="/ewaste_solution.jpg" alt="Metal Recovery" style={{ width: '100%', height: '140px', objectFit: 'cover', filter: 'hue-rotate(120deg)' }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#2563eb' }}>Phase 3: Gold, Silver & Copper Extraction</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Eco-friendly hydrometallurgy refining without landfill pollution.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: NORMAL HOUSEHOLD WASTE SOLUTIONS */}
      {(activeCategory === 'normal' || activeCategory === 'all') && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
              <Leaf color="#10b981" size={24} />
              <span>Household & General Waste Management Solutions</span>
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#10b981', background: '#ecfdf5', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
              4-Bin Stream Solution
            </span>
          </div>

          {/* Visual Infographic Image Solution Card */}
          <div className="form-card" style={{ marginBottom: '24px', overflow: 'hidden', padding: 0 }}>
            <div style={{ padding: '16px 20px', background: 'var(--bg-card-subtle)', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileImage size={18} color="#10b981" />
                  Household Waste Solution Visual Infographic
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Click image to enlarge and inspect bin stream sorting and composting solutions</p>
              </div>
              <button 
                onClick={() => setModalImage('/normal_waste_solution.jpg')}
                className="btn-primary" 
                style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#10b981', borderColor: '#10b981' }}
              >
                <Maximize2 size={14} />
                <span>Enlarge Diagram</span>
              </button>
            </div>
            
            <div 
              style={{ position: 'relative', cursor: 'pointer', backgroundColor: '#0f172a', textAlign: 'center' }}
              onClick={() => setModalImage('/normal_waste_solution.jpg')}
            >
              <img 
                src="/normal_waste_solution.jpg" 
                alt="Household & General Waste Management Solutions Infographic" 
                style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.75)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Maximize2 size={14} /> Click to Expand HD Infographic
              </div>
            </div>
          </div>

          {/* 4 Waste Streams Solutions Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🍏 Green Bin: Wet Organic Waste Solution
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#166534', lineHeight: 1.5, margin: 0 }}>
                <strong>Solution:</strong> Home Composting & Biogas. Convert food waste, vegetable peels, and garden clippings into rich organic garden soil fertilizer in 30 days instead of sending to landfills.
              </p>
            </div>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ♻️ Blue Bin: Dry Recyclables Solution
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#1e40af', lineHeight: 1.5, margin: 0 }}>
                <strong>Solution:</strong> Rinse, Flatten & Material Recovery. Clean plastic bottles, paper, cardboard, and clean metal cans. Sent to recycling facilities to manufacture new eco-products.
              </p>
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#d97706', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ⚠️ Yellow Bin: Household HazMat Solution
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#92400e', lineHeight: 1.5, margin: 0 }}>
                <strong>Solution:</strong> Vaulted Collection & Neutralization. Store paints, solvents, pesticides, and CFL bulbs in original leak-proof containers for municipal hazardous waste pickup.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🗑️ Black/Red Bin: Landfill Residual Solution
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                <strong>Solution:</strong> 5R Reduction Strategy. Refuse single-use items, reduce non-recyclables (styrofoam, ceramics), and ensure residual bags are tied tightly to prevent street littering.
              </p>
            </div>
          </div>

          {/* VISUAL PROCESS FLOW: ORGANIC & INORGANIC CLEANING / RECYCLING PROCESS */}
          <div style={{ marginTop: '28px', background: 'var(--bg-card-subtle)', borderRadius: '16px', border: '1px solid var(--border-glass)', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw color="#10b981" size={20} />
              <span>Organic & Inorganic Waste Component Recycling & Cleaning Process (Image Format)</span>
            </h3>

            {/* Organic Recycling Process Flow */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#10b981', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🌱 1. Organic Waste Composting & Biogas Recovery Flow:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div 
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setModalImage('/normal_waste_solution.jpg')}
                >
                  <img src="/normal_waste_solution.jpg" alt="Organic Sorting" style={{ width: '100%', height: '130px', objectFit: 'cover' }} />
                  <div style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#10b981' }}>Step 1: Segregation & Washing</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>Collect wet food scraps, fruit peels & garden waste in Green Bin.</div>
                  </div>
                </div>

                <div 
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setModalImage('/normal_waste_solution.jpg')}
                >
                  <img src="/normal_waste_solution.jpg" alt="30 Day Composting" style={{ width: '100%', height: '130px', objectFit: 'cover', filter: 'hue-rotate(40deg)' }} />
                  <div style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#10b981' }}>Step 2: 30-Day Aerobic Composting</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>Mix greens with dry leaves. Microbes break down organic matter.</div>
                  </div>
                </div>

                <div 
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setModalImage('/normal_waste_solution.jpg')}
                >
                  <img src="/normal_waste_solution.jpg" alt="Bio Fertilizer" style={{ width: '100%', height: '130px', objectFit: 'cover', filter: 'brightness(1.1)' }} />
                  <div style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#10b981' }}>Step 3: Nutrient Humus & Biogas</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>Harvest nutrient-rich bio-fertilizer and clean methane energy.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inorganic Recycling & Cleaning Process Flow */}
            <div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#2563eb', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                ♻️ 2. Inorganic Waste Cleaning & Re-manufacturing Process:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div 
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setModalImage('/normal_waste_solution.jpg')}
                >
                  <img src="/normal_waste_solution.jpg" alt="Inorganic Washing" style={{ width: '100%', height: '130px', objectFit: 'cover', filter: 'hue-rotate(180deg)' }} />
                  <div style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2563eb' }}>Step 1: Industrial Rinsing & Washing</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>High-pressure washing of PET bottles, glass, and aluminum cans.</div>
                  </div>
                </div>

                <div 
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setModalImage('/normal_waste_solution.jpg')}
                >
                  <img src="/normal_waste_solution.jpg" alt="Flake Shredding" style={{ width: '100%', height: '130px', objectFit: 'cover', filter: 'hue-rotate(200deg)' }} />
                  <div style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2563eb' }}>Step 2: Mechanical Flake Shredding</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>Crossing plastics and metals into fine uniform flakes.</div>
                  </div>
                </div>

                <div 
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setModalImage('/normal_waste_solution.jpg')}
                >
                  <img src="/normal_waste_solution.jpg" alt="Pelletization" style={{ width: '100%', height: '130px', objectFit: 'cover', filter: 'hue-rotate(220deg)' }} />
                  <div style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2563eb' }}>Step 3: Pelletization & Re-Molding</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>Extruding purified plastic pellets to build new eco-products.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: VIDEO SOLUTIONS & MOTION GUIDES */}
      {(activeCategory === 'video' || activeCategory === 'all') && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
              <Video color="#8b5cf6" size={24} />
              <span>Waste Management Solutions in Video Format</span>
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#8b5cf6', background: '#f5f3ff', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
              Interactive Video Tutorials
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
            {/* Main Embedded Video Player */}
            <div className="form-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', backgroundColor: '#000', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
                <video
                  ref={videoRef}
                  src={activeVideoObj.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', maxHeight: '360px', display: 'block', objectFit: 'cover' }}
                />
                
                {/* Floating Overlay Controls */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(15, 23, 42, 0.85)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backdropFilter: 'blur(8px)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button 
                      onClick={togglePlay}
                      style={{ background: '#2563eb', border: 'none', color: 'white', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>
                      {activeVideoObj.title}
                    </span>
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                    Duration: {activeVideoObj.duration}
                  </span>
                </div>
              </div>

              <div style={{ padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ background: '#8b5cf6', color: 'white', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    {activeVideoObj.badge}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Step-by-Step Motion Guide</span>
                </div>
                
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-dark)' }}>
                  {activeVideoObj.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                  {activeVideoObj.desc}
                </p>

                <div style={{ background: 'var(--bg-card-subtle)', padding: '12px', borderRadius: '8px' }}>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--text-dark)', display: 'block', marginBottom: '8px' }}>
                    📌 Video Step Breakdown:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-subtle)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {activeVideoObj.steps.map((st, idx) => (
                      <li key={idx}>{st}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Video Selector Playlist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                Select Solution Video:
              </h4>

              {videoPlaylist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedVideo(item.id);
                    setIsPlaying(true);
                  }}
                  style={{
                    background: selectedVideo === item.id ? 'var(--bg-card)' : 'var(--bg-card-subtle)',
                    border: selectedVideo === item.id ? '2px solid #8b5cf6' : '1px solid var(--border-light)',
                    borderRadius: '10px',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedVideo === item.id ? '0 4px 12px rgba(139,92,246,0.12)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', color: selectedVideo === item.id ? '#8b5cf6' : 'var(--text-muted)', fontWeight: 700 }}>
                      {item.badge}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.duration}</span>
                  </div>
                  <h5 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                    {item.title}
                  </h5>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.desc}
                  </p>
                </div>
              ))}

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '14px', borderRadius: '10px', marginTop: 'auto' }}>
                <strong style={{ fontSize: '0.85rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="#16a34a" /> Need AI Assistance?
                </strong>
                <p style={{ fontSize: '0.8rem', color: '#166534', margin: '4px 0 10px 0', lineHeight: 1.4 }}>
                  Ask EcoBot AI in the chat box anytime for instant custom solutions tailored to your specific waste item!
                </p>
                <button
                  onClick={() => setActiveTab('chat')}
                  className="btn-primary"
                  style={{ width: '100%', padding: '6px', fontSize: '0.8rem', justifyContent: 'center' }}
                >
                  <span>Open Friendly AI Chat</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL FOR EXPANDED INFOGRAPHICS */}
      {modalImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            padding: '20px'
          }}
          onClick={() => setModalImage(null)}
        >
          <div 
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={modalImage} 
              alt="Solution Infographic HD" 
              style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                {modalImage.includes('ewaste') ? '⚡ E-Waste Management Solutions Infographic' : '🌿 Household Waste Management Solutions Infographic'}
              </span>
              <button 
                onClick={() => setModalImage(null)}
                style={{
                  background: 'white',
                  border: 'none',
                  color: 'black',
                  padding: '6px 16px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Close Viewer ✖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
