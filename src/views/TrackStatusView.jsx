import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  User, 
  PhoneCall, 
  AlertCircle,
  FileCheck,
  UserCheck,
  Info,
  Maximize2,
  Sparkles,
  ShieldCheck,
  Activity,
  HelpCircle,
  Layers
} from 'lucide-react';

export default function TrackStatusView({ reports, selectedReportId, setSelectedReportId }) {
  const [searchId, setSearchId] = useState(selectedReportId || (reports[0] ? reports[0].id : 'WM-2026-8492'));
  const [modalImage, setModalImage] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const currentReport = reports.find(r => r.id.toLowerCase() === searchId.toLowerCase()) || reports[0];

  const getStepIndex = (status) => {
    switch (status) {
      case 'Registered': return 0;
      case 'Assigned': return 1;
      case 'Dispatched': return 2;
      case 'Resolved': return 3;
      default: return 0;
    }
  };

  const currentStep = getStepIndex(currentReport ? currentReport.status : 'Registered');

  const steps = [
    { 
      title: 'Registered', 
      desc: 'Logged & Geo-tagged', 
      icon: FileCheck,
      estTime: 'Immediate (< 5 mins)',
      actionText: 'Ticket submitted to central municipal dispatch database. Automated priority scoring assigned based on severity.'
    },
    { 
      title: 'Assigned', 
      desc: 'Unit Allocated', 
      icon: UserCheck,
      estTime: '15 - 30 Mins',
      actionText: 'Sanitation inspector allocated. Vehicle route & crew assigned based on neighborhood location.'
    },
    { 
      title: 'Dispatched', 
      desc: 'Truck En-Route', 
      icon: Truck,
      estTime: '30 - 60 Mins',
      actionText: 'Heavy collection truck en-route to site. Driver following real-time GPS navigation.'
    },
    { 
      title: 'Resolved', 
      desc: 'Cleaned & Closed', 
      icon: CheckCircle2,
      estTime: 'Completed',
      actionText: 'Waste cleared, area disinfected, photo proof submitted & ticket closed by supervisor.'
    }
  ];

  const progressPercentage = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div className="page-view-container">
      {/* Page Header */}
      <div className="page-header" style={{ maxWidth: '960px', margin: '0 auto 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary-light)', padding: '6px 14px', borderRadius: '9999px', color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', marginBottom: '10px' }}>
          <Activity size={14} /> LIVE TICKET MONITORING SYSTEM
        </div>
        <h1>Waste Dispatch & Live Track Status</h1>
        <p>Monitor your municipal sanitation tickets from initial report logging to final clean-up verification in real-time.</p>
      </div>

      {/* HOW TRACK STATUS WORKS & STAGE LEGEND BANNER */}
      <div style={{ maxWidth: '960px', margin: '0 auto 24px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#2563eb" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>
              Understanding Track Status: 4-Stage Sanitation Dispatch Process
            </h3>
          </div>
          <span style={{ fontSize: '0.78rem', background: 'var(--bg-card-subtle)', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border-light)', fontWeight: 600 }}>
            ⚡ Standard SLA: 2 to 4 Hours Total
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <div style={{ color: '#2563eb', fontWeight: 800, fontSize: '0.85rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📌 1. Registered</span>
              <span style={{ fontSize: '0.68rem', background: '#dbeafe', color: '#1e40af', padding: '1px 6px', borderRadius: '4px' }}>Stage 1</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Ticket logged with exact GPS coordinates, timestamp & citizen photo proof.
            </div>
          </div>

          <div style={{ background: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <div style={{ color: '#d97706', fontWeight: 800, fontSize: '0.85rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>👷 2. Assigned</span>
              <span style={{ fontSize: '0.68rem', background: '#fef3c7', color: '#92400e', padding: '1px 6px', borderRadius: '4px' }}>Stage 2</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Sanitation inspector & local sector vehicle team allocated to ticket.
            </div>
          </div>

          <div style={{ background: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <div style={{ color: '#0284c7', fontWeight: 800, fontSize: '0.85rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🚛 3. Dispatched</span>
              <span style={{ fontSize: '0.68rem', background: '#e0f2fe', color: '#075985', padding: '1px 6px', borderRadius: '4px' }}>Stage 3</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Heavy waste collection truck & crew en-route with live driver GPS.
            </div>
          </div>

          <div style={{ background: 'var(--bg-card-subtle)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <div style={{ color: '#16a34a', fontWeight: 800, fontSize: '0.85rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✅ 4. Resolved</span>
              <span style={{ fontSize: '0.68rem', background: '#dcfce7', color: '#166534', padding: '1px 6px', borderRadius: '4px' }}>Stage 4</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Waste cleared, area disinfected, photo proof verified & ticket closed.
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="status-search-box" style={{ maxWidth: '800px', margin: '0 auto 16px' }}>
        <input 
          type="text" 
          className="form-input" 
          style={{ flex: 1, padding: '12px 16px', fontSize: '0.95rem' }}
          placeholder="Enter Report Ticket ID (e.g. WM-2026-8492)..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn-primary" style={{ padding: '12px 20px' }}>
          <Search size={16} />
          <span>Search Ticket</span>
        </button>
      </div>

      {/* Quick Select Ticket Chips */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center', fontWeight: 600 }}>Quick Select Recent Ticket:</span>
        {reports.map((r) => (
          <button
            key={r.id}
            onClick={() => {
              setSearchId(r.id);
              setSelectedReportId(r.id);
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: searchId === r.id ? '2px solid #2563eb' : '1px solid var(--border-light)',
              backgroundColor: searchId === r.id ? 'var(--primary-light)' : 'var(--bg-card)',
              color: searchId === r.id ? '#2563eb' : 'var(--text-dark)',
              fontSize: '0.78rem',
              fontWeight: searchId === r.id ? 700 : 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: searchId === r.id ? '0 2px 8px rgba(37,99,235,0.2)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{r.id}</span>
            <span style={{ 
              fontSize: '0.7rem', 
              padding: '1px 6px', 
              borderRadius: '4px',
              background: r.status === 'Resolved' ? '#16a34a' : (r.status === 'Dispatched' ? '#0284c7' : '#2563eb'),
              color: 'white'
            }}>
              {r.status}
            </span>
          </button>
        ))}
      </div>

      {currentReport && (
        <div className="pipeline-card" style={{ maxWidth: '960px', margin: '0 auto', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)' }}>
          {/* Ticket Header & Status Pill */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary-blue)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                LIVE TICKET DETAILS & ACTION STATUS
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0', color: 'var(--text-dark)' }}>{currentReport.id}</h2>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} color="#dc2626" />
                <strong style={{ color: 'var(--text-dark)' }}>{currentReport.location}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({currentReport.lat.toFixed(4)}, {currentReport.lng.toFixed(4)})</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: 800,
                backgroundColor: currentReport.status === 'Resolved' ? '#dcfce7' : '#eff6ff',
                color: currentReport.status === 'Resolved' ? '#16a34a' : '#2563eb',
                border: currentReport.status === 'Resolved' ? '1px solid #bbf7d0' : '1px solid #bfdbfe',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <span style={{ 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%', 
                  background: currentReport.status === 'Resolved' ? '#16a34a' : '#2563eb',
                  animation: currentReport.status !== 'Resolved' ? 'pulse 1.5s infinite' : 'none'
                }}></span>
                <span>Current Status: {currentReport.status}</span>
              </span>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Logged On: <strong>{currentReport.timestamp}</strong>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                <Clock size={13} />
                <span>Estimated Resolution SLA: {currentReport.status === 'Resolved' ? 'Resolved & Verified' : '45 Minutes'}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar Header */}
          <div style={{ margin: '20px 0 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                Dispatch Resolution Progress: <span style={{ color: '#2563eb' }}>{progressPercentage}% Completed</span>
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Stage {currentStep + 1} of 4 ({steps[currentStep].title})
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-card-subtle)', borderRadius: '9999px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <div style={{ 
                width: `${progressPercentage}%`, 
                height: '100%', 
                background: currentReport.status === 'Resolved' ? '#16a34a' : 'linear-gradient(90deg, #2563eb, #3b82f6)', 
                borderRadius: '9999px',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>

          {/* Visual Step Pipeline */}
          <div className="pipeline-steps" style={{ margin: '20px 0' }}>
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStep;
              const isActive = idx === currentStep;
              const StepIcon = step.icon;

              return (
                <div key={idx} className={`pipeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                  <div className="step-icon-circle" style={{
                    background: isCompleted ? '#16a34a' : (isActive ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : 'var(--bg-card-subtle)'),
                    color: (isCompleted || isActive) ? 'white' : 'var(--text-muted)',
                    boxShadow: isActive ? '0 0 18px rgba(37,99,235,0.4)' : 'none'
                  }}>
                    <StepIcon size={18} />
                  </div>
                  <div className="step-label" style={{ fontWeight: isActive ? 800 : 600, color: isActive ? 'var(--primary-blue)' : 'var(--text-dark)' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{step.desc}</div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: isCompleted ? '#16a34a' : (isActive ? '#2563eb' : 'var(--text-muted)'), marginTop: '2px' }}>
                    {step.estTime}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current Stage Operational Explanation Box */}
          <div style={{ background: 'var(--bg-card-subtle)', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border-light)', margin: '16px 0 24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Info size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-dark)', marginBottom: '2px' }}>
                Stage Operational Insight ({steps[currentStep].title})
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                {steps[currentStep].actionText}
              </div>
            </div>
          </div>

          {/* Details & Logs Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-light)' }}>
            {/* Left Info Column with Image Snapshot */}
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCheck size={18} color="#2563eb" /> Incident Overview & Photo Proof
              </h3>

              {currentReport.image && (
                <div 
                  style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '160px', marginBottom: '14px', cursor: 'pointer', border: '1px solid var(--border-light)' }}
                  onClick={() => setModalImage(currentReport.image)}
                >
                  <img src={currentReport.image} alt="Reported Waste" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)' }} />
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.75)', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', backdropFilter: 'blur(4px)' }}>
                    <Maximize2 size={12} /> Click to Inspect Photo Proof
                  </div>
                </div>
              )}

              <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', padding: '14px', borderRadius: '12px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-light)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Waste Category:</span>
                  <strong style={{ color: 'var(--text-dark)' }}>{currentReport.category}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-light)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Priority Level:</span>
                  <span style={{ 
                    color: currentReport.severity === 'High' ? '#dc2626' : (currentReport.severity === 'Medium' ? '#d97706' : '#2563eb'), 
                    fontWeight: 800,
                    background: currentReport.severity === 'High' ? '#fee2e2' : '#fef3c7',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem'
                  }}>
                    {currentReport.severity} Priority
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-light)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Reported By:</span>
                  <strong style={{ color: 'var(--text-dark)' }}>{currentReport.reporter}</strong>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Description Notes:</span>
                  <span style={{ color: 'var(--text-dark)', fontStyle: 'italic' }}>"{currentReport.description}"</span>
                </div>
              </div>
            </div>

            {/* Right Updates Timeline */}
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#2563eb" /> Real-Time Dispatch Log
              </h3>
              <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', padding: '14px', borderRadius: '12px', fontSize: '0.82rem', maxHeight: '250px', overflowY: 'auto' }}>
                {currentReport.updates && currentReport.updates.length > 0 ? (
                  currentReport.updates.map((up, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px', borderBottom: i < currentReport.updates.length - 1 ? '1px dashed var(--border-light)' : 'none', paddingBottom: '8px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--primary-blue)', whiteSpace: 'nowrap', fontSize: '0.75rem', background: 'var(--primary-light)', padding: '2px 6px', borderRadius: '4px', height: 'fit-content' }}>
                        {up.time}
                      </span>
                      <span style={{ color: 'var(--text-dark)', lineHeight: '1.4' }}>{up.note}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
                    Ticket created. Awaiting dispatch assignment.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#16a34a" />
              <span>Verified Municipal Sanitation Tracking Service • SLA Protected</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-secondary" style={{ fontSize: '0.85rem' }} onClick={() => alert(`Escalating ticket ${currentReport.id} to Municipal Control Room.`)}>
                <PhoneCall size={14} />
                <span>Escalate / Call 311 Hotline</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Report Photo Proof */}
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
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setModalImage(null)}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Report Snapshot" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>📸 Reported Incident Photo Proof</span>
              <button 
                onClick={() => setModalImage(null)}
                style={{ background: 'white', border: 'none', color: 'black', padding: '6px 16px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
              >
                Close ✖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

