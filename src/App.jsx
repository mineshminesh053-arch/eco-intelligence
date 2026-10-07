import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import ChatView from './views/ChatView';
import SolutionsView from './views/SolutionsView';
import ReportWasteView from './views/ReportWasteView';
import TrackStatusView from './views/TrackStatusView';
import AnalyticsView from './views/AnalyticsView';
import GuideView from './views/GuideView';
import NewsView from './views/NewsView';
import { INITIAL_REPORTS } from './data/mockData';
import { addReportToFirebase } from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'solutions' | 'report' | 'track' | 'analytics' | 'news' | 'guide'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ecobot_theme') || 'light';
  });
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [selectedReportId, setSelectedReportId] = useState(INITIAL_REPORTS[0].id);
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: 'Illegal Dumping on Market Sq' },
    { id: 2, title: 'E-Waste disposal rules' }
  ]);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ecobot_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
        setVideoPlaying(false);
      } else {
        videoRef.current.play();
        setVideoPlaying(true);
      }
    }
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      const firstUserMsg = messages.find(m => m.sender === 'user');
      const title = firstUserMsg ? firstUserMsg.text.slice(0, 24) + '...' : 'Waste Management Query';
      setChatHistory(prev => [{ id: Date.now(), title }, ...prev]);
    }
    setMessages([]);
  };

  const addNewReport = (newTicket) => {
    setReports(prev => [newTicket, ...prev]);
    addReportToFirebase(newTicket);
  };

  return (
    <div className="app-container" data-theme={theme}>
      {/* Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNewChat={handleNewChat}
        chatHistory={chatHistory}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <div className="main-content">
        {/* Global Ambient Background Video & Morphic Glow Layer for All Pages */}
        <div className="app-bg-video-wrapper">
          <video
            ref={videoRef}
            src="/character_sorting_waste.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="app-bg-video"
          />
          <div className="app-bg-glow-orb orb-1" />
          <div className="app-bg-glow-orb orb-2" />
          <div className="app-bg-video-overlay" />
        </div>

        <TopHeader 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          theme={theme}
          toggleTheme={toggleTheme}
          videoPlaying={videoPlaying}
          toggleVideoPlayback={toggleVideoPlayback}
        />

        {/* View Switcher */}
        {activeTab === 'chat' && (
          <ChatView 
            messages={messages} 
            setMessages={setMessages} 
            setActiveTab={setActiveTab}
            reports={reports}
            addNewReport={addNewReport}
          />
        )}

        {activeTab === 'solutions' && (
          <SolutionsView 
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'report' && (
          <ReportWasteView 
            addNewReport={addNewReport} 
            setActiveTab={setActiveTab}
            setSelectedReportId={setSelectedReportId}
          />
        )}

        {activeTab === 'track' && (
          <TrackStatusView 
            reports={reports} 
            selectedReportId={selectedReportId}
            setSelectedReportId={setSelectedReportId}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView 
            reports={reports} 
            setSelectedReportId={setSelectedReportId}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'news' && (
          <NewsView />
        )}

        {activeTab === 'guide' && (
          <GuideView />
        )}
      </div>
    </div>
  );
}

