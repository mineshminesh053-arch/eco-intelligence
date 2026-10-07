import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  UploadCloud,
  FileText
} from 'lucide-react';

export default function ReportWasteView({ addNewReport, setActiveTab, setSelectedReportId }) {
  const [category, setCategory] = useState('Dumpster Overflow');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  const handleGetLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocation('Corner of 7th Ave & Pine Street (GPS: 40.7142, -74.0075)');
      setIsLocating(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      alert('Please enter or select a location for the report.');
      return;
    }

    const newId = `WM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket = {
      id: newId,
      location: location,
      lat: 40.7128 + (Math.random() - 0.5) * 0.02,
      lng: -74.0060 + (Math.random() - 0.5) * 0.02,
      category: category,
      severity: severity,
      status: 'Registered',
      timestamp: new Date().toLocaleString(),
      description: description || 'No extra notes provided by citizen.',
      reporter: isAnonymous ? 'Anonymous Citizen' : (reporterName || 'Citizen Reporter'),
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
      updates: [
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Report logged in Municipal Sanitation System' }
      ]
    };

    addNewReport(newTicket);
    setSubmittedId(newId);
    setSelectedReportId(newId);
  };

  if (submittedId) {
    return (
      <div className="page-view-container">
        <div className="form-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#dcfce7',
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>
            Report Submitted Successfully!
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Your tracking ID is <strong style={{ color: 'var(--primary-blue)', fontSize: '1.1rem' }}>{submittedId}</strong>.
          </p>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '10px', maxWidth: '480px', margin: '0 auto 24px', textAlign: 'left', fontSize: '0.9rem' }}>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Summary Details:</div>
            <div>• Category: {category}</div>
            <div>• Location: {location}</div>
            <div>• Priority: {severity}</div>
            <div>• Status: Registered & Queued for Dispatch</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button 
              className="btn-primary"
              onClick={() => {
                setActiveTab('track');
              }}
            >
              <span>Track Report Live</span>
              <ArrowRight size={16} />
            </button>
            <button 
              className="btn-secondary"
              onClick={() => {
                setSubmittedId(null);
                setLocation('');
                setDescription('');
              }}
            >
              Submit Another Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-view-container">
      <div className="page-header" style={{ maxWidth: '800px', margin: '0 auto 20px' }}>
        <h1>Report Waste Incident</h1>
        <p>File an official waste report directly to municipal sanitation services.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-grid">
          {/* Incident Category */}
          <div className="form-group">
            <label className="form-label">Waste Category *</label>
            <select 
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Dumpster Overflow">Dumpster Overflow / Full Bin</option>
              <option value="Illegal Dumping">Illegal Roadside Dumping</option>
              <option value="E-Waste / Electronics">E-Waste / Battery Disposal</option>
              <option value="Hazardous / Chemical">Hazardous / Chemical Leak</option>
              <option value="Bio-Medical">Bio-Medical & Sanitary</option>
              <option value="Construction Rubble">Construction Debris</option>
            </select>
          </div>

          {/* Severity Level */}
          <div className="form-group">
            <label className="form-label">Severity Level *</label>
            <select 
              className="form-select"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="Low">Low - Normal Routine Pickup</option>
              <option value="Medium">Medium - Obstruction or Mild Odor</option>
              <option value="High">High - Emergency / Biohazard / Road Block</option>
            </select>
          </div>

          {/* Location Field */}
          <div className="form-group full-width">
            <label className="form-label">Location / Address *</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text"
                className="form-input"
                style={{ flex: 1 }}
                placeholder="e.g. 5th Avenue & Market Square Street..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="btn-secondary"
                onClick={handleGetLocation}
                disabled={isLocating}
              >
                <MapPin size={16} color="#2563eb" />
                <span>{isLocating ? 'Locating...' : 'Use GPS'}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="form-group full-width">
            <label className="form-label">Detailed Description</label>
            <textarea 
              className="form-textarea"
              rows={3}
              placeholder="Describe the waste situation, volume, or specific landmarks to help sanitation drivers locate it..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Photo Attachment Simulation */}
          <div className="form-group full-width">
            <label className="form-label">Attach Photo Proof (Optional)</label>
            <div style={{
              border: '2px dashed #cbd5e1',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f8fafc',
              cursor: 'pointer'
            }}>
              <UploadCloud size={32} color="#2563eb" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Click to attach or drag photo here</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>Supports JPG, PNG up to 10MB</div>
            </div>
          </div>

          {/* Reporter Information */}
          <div className="form-group">
            <label className="form-label">Reporter Name</label>
            <input 
              type="text"
              className="form-input"
              placeholder="Your Name (Optional)"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              disabled={isAnonymous}
            />
          </div>

          <div className="form-group" style={{ justifyContent: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
              <input 
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <span>Report Anonymously</span>
            </label>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
          <AlertTriangle size={18} />
          <span>Submit Official Incident Report</span>
        </button>
      </form>
    </div>
  );
}
