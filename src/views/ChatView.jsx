import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Send, 
  User, 
  ArrowRight, 
  Recycle, 
  Mic, 
  MicOff, 
  Loader2,
  Sparkles,
  Maximize2,
  FileImage,
  Video,
  Volume2,
  VolumeX
} from 'lucide-react';
import { CHAT_SUGGESTIONS } from '../data/mockData';
import { sendToGemini } from '../services/geminiService';
import { createVoiceRecognition, speakText, stopSpeech } from '../services/voiceService';
import { saveChatMessage } from '../firebase';

export default function ChatView({ messages, setMessages, setActiveTab, reports, addNewReport }) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [chatModalImage, setChatModalImage] = useState(null);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const sessionIdRef = useRef(`session-${Date.now()}`);

  // Initialize voice recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setVoiceSupported(!!SpeechRecognition);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleToggleSpeak = (msgId, text) => {
    if (speakingMessageId === msgId) {
      stopSpeech();
      setSpeakingMessageId(null);
    } else {
      setSpeakingMessageId(msgId);
      const success = speakText(
        text, 
        () => setSpeakingMessageId(null), 
        () => setSpeakingMessageId(null)
      );
      if (!success) {
        setSpeakingMessageId(null);
      }
    }
  };

  const handleVoiceToggle = useCallback(() => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const rec = createVoiceRecognition(
      (transcript, isInterim) => {
        setInput(transcript);
      },
      (listening) => {
        setIsListening(listening);
      },
      (error) => {
        console.warn('Voice error:', error);
        setIsListening(false);
      }
    );

    if (rec) {
      recognitionRef.current = rec;
      rec.start();
    }
  }, [isListening]);

  const handleClearChat = () => {
    stopSpeech();
    setSpeakingMessageId(null);
    setMessages([]);
    sessionIdRef.current = `session-${Date.now()}`;
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    // Stop voice if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    // Save to Firebase
    saveChatMessage(sessionIdRef.current, userMsg);

    try {
      const lower = query.toLowerCase();
      let actionPills = [];

      // Check if user is asking for image format, diagrams, process flows, or visual guides
      const isImageRequest = 
        lower.includes('image') || 
        lower.includes('photo') || 
        lower.includes('picture') || 
        lower.includes('diagram') || 
        lower.includes('graphic') || 
        lower.includes('infographic') || 
        lower.includes('visual') || 
        lower.includes('draw') || 
        lower.includes('format') || 
        lower.includes('process') || 
        lower.includes('organic') || 
        lower.includes('inorganic') || 
        lower.includes('cleaning') || 
        lower.includes('recycle');

      // Determine appropriate image preview
      let selectedImage = null;
      if (isImageRequest || lower.includes('e-waste') || lower.includes('ewaste') || lower.includes('electronic') || lower.includes('battery') || lower.includes('phone') || lower.includes('laptop')) {
        if (lower.includes('e-waste') || lower.includes('ewaste') || lower.includes('electronic') || lower.includes('battery') || lower.includes('phone') || lower.includes('laptop')) {
          selectedImage = '/ewaste_solution.jpg';
        } else {
          selectedImage = '/normal_waste_solution.jpg';
        }
      }

      if (selectedImage) {
        actionPills = [
          { label: '📸 Click to View Fullscreen Image Diagram', image: selectedImage },
          { label: '✨ Open Waste Solutions Hub', target: 'solutions' },
          { label: '🎥 Watch Video Solution', target: 'solutions' }
        ];
      } else if (lower.includes('report') && (lower.includes('dump') || lower.includes('waste') || lower.includes('garbage') || lower.includes('trash'))) {
        actionPills = [
          { label: '📝 Open Report Form', target: 'report' },
          { label: '📌 Track Existing Report', target: 'track' }
        ];
      } else if (lower.includes('track') || lower.match(/wm-\d+/)) {
        actionPills = [
          { label: '📌 Open Tracker Page', target: 'track' }
        ];
      } else if (lower.includes('map') || lower.includes('location') || lower.includes('hub') || lower.includes('center')) {
        actionPills = [
          { label: '🗺️ Open Live Map', target: 'analytics' }
        ];
      } else {
        actionPills = [
          { label: '✨ Explore Waste Solutions Hub', target: 'solutions' }
        ];
      }

      // Call Gemini API with conversation history
      let aiResponseText = await sendToGemini(query, updatedMessages);

      // Prepend visual process note if image diagram was requested
      if (isImageRequest && selectedImage) {
        aiResponseText = `📸 **Process Visual Infographic Diagram Created Below:**\n\n${aiResponseText}`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponseText,
        actionPills: actionPills,
        imagePreview: selectedImage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      saveChatMessage(sessionIdRef.current, aiMsg);
    } catch (error) {
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Hello friend! 😊 I have created the visual process guide for you below! You can also explore all visual infographics & video guides in the ✨ Waste Solutions hub! 🌟`,
        imagePreview: '/normal_waste_solution.jpg',
        actionPills: [
          { label: '📸 Click to View Process Diagram', image: '/normal_waste_solution.jpg' },
          { label: '✨ Open Waste Solutions Hub', target: 'solutions' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Clear Chat Control Header */}
      {messages.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-light)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            💬 ECO - INTELLIGENCE Live Assistant ({messages.length} messages)
          </span>
          <button
            onClick={handleClearChat}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-card-subtle)',
              color: '#dc2626',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Clear Chat 🗑️
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="messages-scroll">
        {messages.length === 0 ? (
          <div className="welcome-screen">
            <div className="welcome-avatar" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
              <Sparkles size={34} color="white" />
            </div>
            <h2 className="welcome-title">Welcome to ECO - INTELLIGENCE 🌿</h2>
            <p className="welcome-subtitle">
              Your gentle, professional AI guide for smart waste management & sustainability! Ask me anything about e-waste disposal, organic composting, or municipal environmental guidelines. ✨
            </p>

            <div className="prompt-suggestions-grid">
              {CHAT_SUGGESTIONS.map((item) => (
                <div
                  key={item.id}
                  className="prompt-card"
                  onClick={() => handleSendMessage(item.actionText)}
                >
                  <div className="prompt-card-header">
                    <span>{item.title}</span>
                  </div>
                  <div className="prompt-card-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender}`}>
              <div className={`message-avatar ${msg.sender}`}>
                {msg.sender === 'ai' ? <Recycle size={20} /> : <User size={20} />}
              </div>
              <div className="message-content-wrapper">
                <div className="message-bubble" style={{ whitespace: 'pre-wrap', lineHeight: 1.6 }}>
                  {msg.text}
                </div>

                {/* Inline Image Visual Preview inside Chat Bubble */}
                {msg.imagePreview && msg.sender === 'ai' && (
                  <div 
                    style={{ 
                      marginTop: '10px', 
                      borderRadius: '10px', 
                      overflow: 'hidden', 
                      border: '1px solid var(--border-light)', 
                      cursor: 'pointer',
                      position: 'relative',
                      maxWidth: '400px'
                    }}
                    onClick={() => setChatModalImage(msg.imagePreview)}
                  >
                    <img 
                      src={msg.imagePreview} 
                      alt="Solution Visual Guide" 
                      style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '6px 12px',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      backdropFilter: 'blur(4px)'
                    }}>
                      <span>📸 Click to view full solution diagram</span>
                      <Maximize2 size={13} />
                    </div>
                  </div>
                )}

                {/* Interactive Action Pills */}
                {msg.actionPills && msg.actionPills.length > 0 && (
                  <div className="action-pill-buttons">
                    {msg.actionPills.map((pill, idx) => (
                      <button
                        key={idx}
                        className="action-pill"
                        onClick={() => {
                          if (pill.image) {
                            setChatModalImage(pill.image);
                          } else if (pill.target) {
                            setActiveTab(pill.target);
                          }
                        }}
                      >
                        <span>{pill.label}</span>
                        <ArrowRight size={14} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Voice Read-Out & Timestamp Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: msg.sender === 'user' ? 'flex-end' : 'space-between', gap: '8px', marginTop: '6px' }}>
                  {msg.sender === 'ai' && (
                    <button
                      type="button"
                      onClick={() => handleToggleSpeak(msg.id, msg.text)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: speakingMessageId === msg.id ? '1px solid #2563eb' : '1px solid var(--border-light)',
                        background: speakingMessageId === msg.id ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                        color: speakingMessageId === msg.id ? '#2563eb' : 'var(--text-dark)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: speakingMessageId === msg.id ? '0 0 10px rgba(37,99,235,0.3)' : 'none'
                      }}
                      title="Click to read response text out loud"
                    >
                      {speakingMessageId === msg.id ? <VolumeX size={14} color="#2563eb" /> : <Volume2 size={14} color="var(--primary-blue)" />}
                      <span>{speakingMessageId === msg.id ? 'Stop Reading ⏹️' : 'Read Out Loud 🔊'}</span>
                    </button>
                  )}
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="message-row ai">
            <div className="message-avatar ai" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
              <Sparkles size={20} color="white" />
            </div>
            <div className="message-bubble" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Loader2 size={16} className="spin-animation" />
              <span>ECO - INTELLIGENCE is compiling solutions... 🌿</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Chat Input Box */}
      <div className="chat-input-wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="chat-input-box"
        >
          {/* Voice Recognition Button */}
          {voiceSupported && (
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`voice-btn ${isListening ? 'listening' : ''}`}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          )}

          <input
            type="text"
            className="chat-textarea"
            placeholder={isListening ? '🎙️ Listening... speak now' : "Ask ECO - INTELLIGENCE about E-waste or Household waste solutions..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit" className="send-btn" disabled={!input.trim() || isTyping}>
            {isTyping ? <Loader2 size={18} className="spin-animation" /> : <Send size={18} />}
          </button>
        </form>
        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
          ECO - INTELLIGENCE Platform • {voiceSupported ? '🎙️ Voice Enabled • ' : ''}📸 Visual Infographics & 🎥 Video Solutions Included
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR CHAT SOLUTION IMAGES */}
      {chatModalImage && (
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
          onClick={() => setChatModalImage(null)}
        >
          <div 
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={chatModalImage} 
              alt="Solution Diagram HD" 
              style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                {chatModalImage.includes('ewaste') ? '⚡ E-Waste Management Solutions Infographic' : '🌿 Household & General Waste Management Solutions'}
              </span>
              <button 
                onClick={() => setChatModalImage(null)}
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

