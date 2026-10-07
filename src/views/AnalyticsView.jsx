import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  BarChart3, 
  MapPin, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  AlertOctagon,
  Layers,
  Filter,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Flame,
  Globe2,
  Trash2,
  Sparkles,
  Zap,
  Radio
} from 'lucide-react';

// Fix default marker icons for bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Esri Basemap tile definitions
const ESRI_BASEMAPS = {
  streets: {
    name: 'Esri World Streets',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom',
    maxZoom: 19
  },
  satellite: {
    name: 'Esri World Imagery (Satellite)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19
  },
  topo: {
    name: 'Esri World Topo',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
    maxZoom: 19
  },
  gray: {
    name: 'Esri Light Gray Canvas',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
  }
};

// Custom colored marker icons
const createColorIcon = (color, isHigh = false) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="
      background: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 6px 14px rgba(0,0,0,0.4);
      position: relative;
      ${isHigh ? 'animation: pulse-pin 1.5s infinite;' : ''}
    ">
      <div style="
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "></div>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const redIcon = createColorIcon('#ef4444', true);
const yellowIcon = createColorIcon('#f59e0b');
const greenIcon = createColorIcon('#10b981');
const blueIcon = createColorIcon('#2563eb');

function getMarkerIcon(report) {
  if (report.status === 'Resolved') return greenIcon;
  if (report.severity === 'High') return redIcon;
  if (report.severity === 'Medium') return yellowIcon;
  return blueIcon;
}

// Map helper to smoothly fly to coordinates
function FlyToMarker({ position, zoom = 14 }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, zoom, { duration: 1.2 });
  }
  return null;
}

// Major Indian Cities Coordinates Database
const INDIAN_CITIES = [
  { id: 'all', name: '🇮🇳 India (Overview)', lat: 20.5937, lng: 78.9629, zoom: 5 },
  { id: 'delhi', name: '📍 New Delhi (CP & Central)', lat: 28.6139, lng: 77.2090, zoom: 12 },
  { id: 'mumbai', name: '📍 Mumbai (Dadar & South)', lat: 19.0760, lng: 72.8777, zoom: 12 },
  { id: 'bengaluru', name: '📍 Bengaluru (Silk Board & E-City)', lat: 12.9716, lng: 77.5946, zoom: 12 },
  { id: 'chennai', name: '📍 Chennai (T. Nagar & Central)', lat: 13.0827, lng: 80.2707, zoom: 12 },
  { id: 'hyderabad', name: '📍 Hyderabad (Charminar & Hitech)', lat: 17.3850, lng: 78.4867, zoom: 12 },
  { id: 'kolkata', name: '📍 Kolkata (Burrabazar & Howrah)', lat: 22.5726, lng: 88.3639, zoom: 12 },
  { id: 'ahmedabad', name: '📍 Ahmedabad (Kalupur & SG Highway)', lat: 23.0225, lng: 72.5714, zoom: 12 },
  { id: 'pune', name: '📍 Pune (FC Road & Swargate)', lat: 18.5204, lng: 73.8567, zoom: 12 }
];

// High-Wastage Concentration Places Dataset across India
const HIGH_WASTAGE_HOTSPOTS = [
  {
    id: 'HOTSPOT-1',
    name: 'Connaught Place & Central Market, New Delhi',
    lat: 28.6315,
    lng: 77.2167,
    dailyWasteKg: 980,
    densityLevel: 'Critical',
    primaryType: 'Dumpster Overflow & Organic Scraps',
    color: '#ef4444',
    radius: 750,
    severityBadge: '🔴 CRITICAL (980 kg/day)'
  },
  {
    id: 'HOTSPOT-2',
    name: 'Dadar Market & Dharavi Sector, Mumbai',
    lat: 19.0178,
    lng: 72.8478,
    dailyWasteKg: 850,
    densityLevel: 'Critical',
    primaryType: 'Plastic Packaging & Market Waste',
    color: '#dc2626',
    radius: 680,
    severityBadge: '🔴 CRITICAL (850 kg/day)'
  },
  {
    id: 'HOTSPOT-3',
    name: 'Silk Board Junction & Electronic City, Bengaluru',
    lat: 12.9172,
    lng: 77.6228,
    dailyWasteKg: 720,
    densityLevel: 'High',
    primaryType: 'E-Waste & Commercial Plastics',
    color: '#f59e0b',
    radius: 580,
    severityBadge: '🟠 HIGH (720 kg/day)'
  },
  {
    id: 'HOTSPOT-4',
    name: 'T. Nagar & Koyambedu Wholesale Market, Chennai',
    lat: 13.0418,
    lng: 80.2341,
    dailyWasteKg: 640,
    densityLevel: 'High',
    primaryType: 'Hazardous Chemicals & Organic Waste',
    color: '#d97706',
    radius: 520,
    severityBadge: '🟠 HIGH (640 kg/day)'
  },
  {
    id: 'HOTSPOT-5',
    name: 'Charminar & Laad Bazaar, Hyderabad',
    lat: 17.3616,
    lng: 78.4747,
    dailyWasteKg: 530,
    densityLevel: 'Moderate',
    primaryType: 'Commercial Wrappers & Textile Scraps',
    color: '#2563eb',
    radius: 420,
    severityBadge: '🟡 MODERATE (530 kg/day)'
  },
  {
    id: 'HOTSPOT-6',
    name: 'Burrabazar & Howrah Station Area, Kolkata',
    lat: 22.5804,
    lng: 88.3472,
    dailyWasteKg: 490,
    densityLevel: 'Moderate',
    primaryType: 'Paper Boxes & Plastic Bottles',
    color: '#0284c7',
    radius: 400,
    severityBadge: '🟡 MODERATE (490 kg/day)'
  }
];

export default function AnalyticsView({ reports, setSelectedReportId, setActiveTab }) {
  const [selectedPin, setSelectedPin] = useState(null);
  const [flyTo, setFlyTo] = useState(null);
  const [flyZoom, setFlyZoom] = useState(13);
  const [selectedCityId, setSelectedCityId] = useState('all');
  const [basemapKey, setBasemapKey] = useState('streets');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHeatmap, setShowHeatmap] = useState(true);

  // Default center based on India coordinates
  const defaultCenter = [20.5937, 78.9629];

  const handleCityChange = (cityId) => {
    setSelectedCityId(cityId);
    const city = INDIAN_CITIES.find(c => c.id === cityId);
    if (city) {
      setFlyTo([city.lat, city.lng]);
      setFlyZoom(city.zoom);
    }
  };

  const filteredReports = reports.filter(r => {
    const matchesSeverity = severityFilter === 'All' || 
      (severityFilter === 'Resolved' ? r.status === 'Resolved' : r.severity === severityFilter && r.status !== 'Resolved');
    const matchesQuery = searchQuery === '' || 
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesQuery;
  });

  const activeBasemap = ESRI_BASEMAPS[basemapKey];

  const stats = [
    { title: 'Highest Wastage Hotspot', val: '980 kg/day (Delhi)', icon: Flame, color: '#dc2626' },
    { title: 'Active Wastage Zones', val: '6 Indian Metro Clusters', icon: AlertOctagon, color: '#f59e0b' },
    { title: 'Resolved This Month', val: '2,840 Incidents', icon: CheckCircle, color: '#16a34a' },
    { title: 'National Recycling Target', val: '88.5%', icon: TrendingUp, color: '#0284c7' },
  ];

  return (
    <div className="page-view-container">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1>High-Wastage Concentration Map & Analytics</h1>
          <p>Geospatial tracking of high-wastage density hotspots, waste accumulation volumes (kg/day), and municipal containment zones.</p>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, color: '#dc2626' }}>
          <Flame size={16} />
          <span>Wastage Heat Density Live</span>
        </div>
      </div>

      {/* Top 4 Stats Row */}
      <div className="stats-cards-grid">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${st.color}15`, color: st.color }}>
                <Icon size={24} />
              </div>
              <div>
                <div className="stat-val">{st.val}</div>
                <div className="stat-title">{st.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LOCATION FINDER & CITY SELECTOR TOOLBAR */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '16px 20px', borderRadius: '14px', marginBottom: '20px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe2 size={20} color="#2563eb" />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>
              Select Map Location & City View (India Region)
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>📍 Switch City:</span>
            <select
              value={selectedCityId}
              onChange={(e) => handleCityChange(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '2px solid #2563eb',
                background: 'var(--bg-card)',
                color: 'var(--text-dark)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(37,99,235,0.15)'
              }}
            >
              {INDIAN_CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Indian City Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Quick Fly-To:</span>
          {INDIAN_CITIES.map(c => (
            <button
              key={c.id}
              onClick={() => handleCityChange(c.id)}
              style={{
                padding: '4px 12px',
                borderRadius: '9999px',
                border: selectedCityId === c.id ? '2px solid #2563eb' : '1px solid var(--border-light)',
                background: selectedCityId === c.id ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                color: selectedCityId === c.id ? '#2563eb' : 'var(--text-dark)',
                fontSize: '0.76rem',
                fontWeight: selectedCityId === c.id ? 800 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Wastage Hotspots Leaderboard Container */}
      <div className="map-analytics-container">
        {/* Left: Esri Leaflet Map Card with Heat Density Circles */}
        <div className="map-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '580px' }}>
          {/* Map Controls Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-card-subtle)', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
              <Flame size={18} color="#dc2626" />
              <span>Wastage Concentration Map</span>
              <span style={{ fontSize: '0.72rem', background: 'rgba(220, 38, 38, 0.12)', color: '#dc2626', border: '1px solid rgba(220, 38, 38, 0.3)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                {filteredReports.length} Hotspot Incidents Plotted
              </span>
            </div>

            {/* Heatmap Toggle, Basemap Switcher & Severity Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowHeatmap(prev => !prev)}
                style={{
                  border: '1px solid var(--border-light)',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  background: showHeatmap ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : 'var(--bg-card)',
                  color: showHeatmap ? 'white' : 'var(--text-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: showHeatmap ? '0 2px 8px rgba(220,38,38,0.3)' : 'none'
                }}
              >
                <Flame size={14} />
                <span>{showHeatmap ? '🔥 Wastage Heat Density ON' : 'Wastage Heat Density OFF'}</span>
              </button>

              <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '2px', borderRadius: '6px', gap: '2px' }}>
                <button
                  type="button"
                  onClick={() => setBasemapKey('streets')}
                  style={{
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: basemapKey === 'streets' ? 600 : 400,
                    background: basemapKey === 'streets' ? 'var(--primary-blue)' : 'transparent',
                    color: basemapKey === 'streets' ? 'white' : 'var(--text-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  🗺️ Streets
                </button>
                <button
                  type="button"
                  onClick={() => setBasemapKey('satellite')}
                  style={{
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: basemapKey === 'satellite' ? 600 : 400,
                    background: basemapKey === 'satellite' ? 'var(--primary-blue)' : 'transparent',
                    color: basemapKey === 'satellite' ? 'white' : 'var(--text-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  🛰️ Satellite
                </button>
                <button
                  type="button"
                  onClick={() => setBasemapKey('topo')}
                  style={{
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: basemapKey === 'topo' ? 600 : 400,
                    background: basemapKey === 'topo' ? 'var(--primary-blue)' : 'transparent',
                    color: basemapKey === 'topo' ? 'white' : 'var(--text-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  ⛰️ Topo
                </button>
              </div>

              {/* Severity Filter */}
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-dark)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Locations</option>
                <option value="High">🔴 Critical Wastage</option>
                <option value="Medium">🟡 Medium Wastage</option>
                <option value="Low">🔵 Low Wastage</option>
                <option value="Resolved">🟢 Resolved</option>
              </select>
            </div>
          </div>

          {/* Interactive Leaflet Map Area with Wastage Heat Circles */}
          <div style={{ position: 'relative', flex: 1, minHeight: '460px' }}>
            <MapContainer
              center={defaultCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              {/* Esri Tile Layer */}
              <TileLayer
                key={basemapKey}
                url={activeBasemap.url}
                attribution={activeBasemap.attribution}
                maxZoom={activeBasemap.maxZoom}
              />

              {flyTo && <FlyToMarker position={flyTo} zoom={flyZoom} />}

              {/* High-Wastage Density Heat Circles Overlay */}
              {showHeatmap && HIGH_WASTAGE_HOTSPOTS.map((hotspot) => (
                <Circle
                  key={hotspot.id}
                  center={[hotspot.lat, hotspot.lng]}
                  radius={hotspot.radius}
                  pathOptions={{
                    color: hotspot.color,
                    fillColor: hotspot.color,
                    fillOpacity: selectedPin?.location === hotspot.name ? 0.45 : 0.22,
                    weight: selectedPin?.location === hotspot.name ? 3 : 2,
                    dashArray: '6, 6'
                  }}
                >
                  <Popup>
                    <div style={{ fontFamily: 'Inter, sans-serif', minWidth: '220px', padding: '4px' }}>
                      <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Flame size={14} />
                        <span>High Wastage Concentration</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginTop: '4px' }}>
                        {hotspot.name}
                      </div>
                      <div style={{ marginTop: '6px', fontSize: '0.8rem', background: '#fee2e2', border: '1px solid #fca5a5', padding: '4px 8px', borderRadius: '6px', color: '#b91c1c', fontWeight: 700 }}>
                        📊 Est. Accumulation: {hotspot.dailyWasteKg} kg/day
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                        <strong>Primary Types:</strong> {hotspot.primaryType}
                      </div>
                    </div>
                  </Popup>
                </Circle>
              ))}

              {/* Incidents Markers */}
              {filteredReports.map((rep) => (
                <Marker
                  key={rep.id}
                  position={[rep.lat, rep.lng]}
                  icon={getMarkerIcon(rep)}
                  eventHandlers={{
                    click: () => {
                      setSelectedPin(rep);
                    }
                  }}
                >
                  <Popup>
                    <div style={{ fontFamily: 'Inter, sans-serif', minWidth: '230px', padding: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '0.88rem' }}>{rep.id}</span>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: rep.status === 'Resolved' ? '#dcfce7' : '#eff6ff',
                          color: rep.status === 'Resolved' ? '#16a34a' : '#2563eb'
                        }}>
                          {rep.status}
                        </span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{rep.category}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} />
                        <span>{rep.location}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Wastage Severity:</span>
                        <strong style={{ color: rep.severity === 'High' ? '#dc2626' : (rep.severity === 'Medium' ? '#d97706' : '#2563eb') }}>
                          {rep.severity}
                        </strong>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedReportId(rep.id);
                          setActiveTab('track');
                        }}
                        style={{
                          marginTop: '10px',
                          width: '100%',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          background: '#2563eb',
                          color: 'white',
                          border: 'none',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Track Sanitation Ticket</span>
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Legend Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              zIndex: 1000,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              padding: '8px 12px',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-md)',
              fontSize: '0.75rem',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              backdropFilter: 'blur(8px)'
            }}>
              <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>Wastage Legend:</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontWeight: 600 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span> Critical Hotspot (&gt;750kg)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d97706', fontWeight: 600 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span> High Density
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontWeight: 600 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span> Clean / Resolved
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel: Top High-Wastage Concentration Places Leaderboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* High Wastage Concentration Places List */}
          <div className="map-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Flame size={18} color="#dc2626" />
                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                  Top High-Wastage Concentration Places
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#fee2e2', color: '#b91c1c', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                Ranked by Volume
              </span>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Click any place below to zoom the map directly to its wastage accumulation zone.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
              {HIGH_WASTAGE_HOTSPOTS.map((hotspot, idx) => (
                <div
                  key={hotspot.id}
                  onClick={() => {
                    setFlyTo([hotspot.lat, hotspot.lng]);
                    setSelectedPin({ id: hotspot.id, location: hotspot.name, lat: hotspot.lat, lng: hotspot.lng });
                  }}
                  style={{
                    padding: '10px 12px',
                    background: selectedPin?.location === hotspot.name ? 'rgba(239, 68, 68, 0.12)' : 'var(--bg-card-subtle)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: selectedPin?.location === hotspot.name ? '1px solid #ef4444' : '1px solid var(--border-light)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-dark)' }}>
                      #{idx + 1} {hotspot.name}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: hotspot.densityLevel === 'Critical' ? '#dc2626' : '#f59e0b',
                      color: 'white'
                    }}>
                      {hotspot.dailyWasteKg} kg/day
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{hotspot.primaryType}</span>
                    <Navigation size={13} color="#2563eb" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Waste Category Distribution */}
          <div className="map-card" style={{ height: 'auto', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)' }}>Wastage Type Distribution</h3>
              <BarChart3 size={16} color="var(--primary-blue)" />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
              {[
                { label: 'Dumpster Overflow & Organic', count: 18, pct: 42, color: '#dc2626' },
                { label: 'Illegal Street Dumping', count: 12, pct: 28, color: '#f59e0b' },
                { label: 'E-Waste & Batteries', count: 8, pct: 18, color: '#2563eb' },
                { label: 'Hazardous & Bio-Medical', count: 5, pct: 12, color: '#9333ea' },
              ].map((cat, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ color: 'var(--text-subtle)' }}>{cat.label}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{cat.pct}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${cat.pct}%`, height: '100%', background: cat.color, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
