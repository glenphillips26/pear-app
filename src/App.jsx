import React, { useState, useCallback } from 'react';
import { Search, FileText, Table, Presentation, BookOpen, Quote, PenTool, Shield, BarChart3, Users, Eye, AlertTriangle, CheckCircle, Clock, Download, Filter, ChevronDown, Plus, X, Send, Sparkles, GraduationCap, Settings, LogOut, Menu, Home, Layers, FileSpreadsheet, SlidersHorizontal, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link, Image, Save, Undo, Redo, Type, PieChart, LineChart, BarChart2, TrendingUp, Calendar, Activity, Lock, Unlock, Flag, ExternalLink, Copy, Trash2, MoreVertical, ChevronRight, Database, Globe, Bookmark, Zap, MessageCircle } from 'lucide-react';

// Perplexity-inspired color palette
const colors = {
  bgPrimary: '#191A1A',
  bgSecondary: '#1F2020',
  bgTertiary: '#2A2B2B',
  bgHover: '#333434',
  accent: '#20B2AA',
  accentLight: '#3DCCC6',
  accentDark: '#1A9690',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1A1',
  textMuted: '#6B6B6B',
  border: '#333434',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
};

// Main App Component
export default function PEARApp() {
  const [currentView, setCurrentView] = useState('canvas');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Start collapsed
  const [userTier, setUserTier] = useState('A3'); // A1, A2, A3

  // Mobile panel states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [toolbarOpen, setToolbarOpen] = useState(false);

  // Close all panels (for overlay click)
  const closeAllPanels = () => {
    setSidebarOpen(false);
    setChatOpen(false);
    setToolbarOpen(false);
  };

  return (
    <div 
      className="app-root"
      style={{
      minHeight: '100vh',
      backgroundColor: colors.bgPrimary,
      color: colors.textPrimary,
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      display: 'flex',
    }}>
      {/* Overlay for mobile panels */}
      <div 
        className={`panel-overlay ${(sidebarOpen || chatOpen || toolbarOpen) ? 'visible' : ''}`}
        onClick={closeAllPanels}
      />

      {/* Mobile Toggle Buttons */}
      <div className="mobile-toggles">
        <button 
          className={`mobile-toggle-btn ${chatOpen ? 'active' : ''}`}
          onClick={() => { 
            setChatOpen(!chatOpen); 
            setToolbarOpen(false); 
          }}
          title="AI Assistant"
        >
          <MessageCircle size={20} />
        </button>
        <button 
          className={`mobile-toggle-btn ${toolbarOpen ? 'active' : ''}`}
          onClick={() => { 
            setToolbarOpen(!toolbarOpen); 
            setChatOpen(false); 
          }}
          title="Workspace Tools"
        >
          <Layers size={20} />
        </button>
      </div>

      {/* Left Navigation Sidebar */}
      <NavigationSidebar 
        currentView={currentView} 
        setCurrentView={(view) => {
          setCurrentView(view);
          setSidebarOpen(false); // Close sidebar on mobile after selection
        }}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userTier={userTier}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopHeader 
          userTier={userTier} 
          setUserTier={setUserTier}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {currentView === 'canvas' && (
          <PEARCanvas 
            userTier={userTier}
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
            toolbarOpen={toolbarOpen}
            setToolbarOpen={setToolbarOpen}
          />
        )}
        {currentView === 'research' && <ResearchCompanion />}
        {currentView === 'citations' && <CitationManager />}
        {currentView === 'dashboard' && <AdminDashboard />}
        {currentView === 'governance' && <GovernanceControls />}
      </div>
    </div>
  );
}

// Navigation Sidebar
function NavigationSidebar({ currentView, setCurrentView, collapsed, setCollapsed, userTier, isOpen, onClose }) {
  const navItems = [
    { id: 'canvas', icon: Layers, label: 'PEAR Canvas', tier: 'A1' },
    { id: 'research', icon: BookOpen, label: 'Research Companion', tier: 'A1' },
    { id: 'citations', icon: Quote, label: 'Citation Manager', tier: 'A1' },
    { id: 'dashboard', icon: BarChart3, label: 'Analytics Dashboard', tier: 'A3' },
    { id: 'governance', icon: Shield, label: 'Governance Controls', tier: 'A3' },
  ];

  const tierAccess = { 'A1': ['A1'], 'A2': ['A1', 'A2'], 'A3': ['A1', 'A2', 'A3'] };
  const accessibleTiers = tierAccess[userTier] || ['A1'];

  return (
    <div
      className={`app-sidebar ${isOpen ? 'open' : ''}`}
      style={{
      width: collapsed ? '70px' : '240px',
      backgroundColor: colors.bgSecondary,
      borderRight: `1px solid ${colors.border}`,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.2s ease',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: '10px',
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <img 
  src="/pear-logo.png"
  alt="PEAR Logo"
  style={{
    width: '80px',
    height: '80px',
    objectFit: 'contain',
    flexShrink: 0,
  }}
/>
        />
        {!collapsed && (
          <div>
            <div style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.5px' }}>PEAR</div>
            <div style={{ fontSize: '10px', color: colors.textMuted, letterSpacing: '1px' }}>BY PERPLEXITY</div>
          </div>
        )}
        {/* Mobile close button */}
        <button
          className="close-btn"
          onClick={onClose}
          style={{
            marginLeft: 'auto',
            padding: '8px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'transparent',
            color: colors.textSecondary,
            cursor: 'pointer',
            display: 'none', // Hidden by default, shown via CSS on mobile
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Items */}
      <nav style={{ padding: '12px', flex: 1 }}>
        {navItems.map(item => {
          const hasAccess = accessibleTiers.includes(item.tier);
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => hasAccess && setCurrentView(item.id)}
              disabled={!hasAccess}
              style={{
                width: '100%',
                padding: collapsed ? '14px' : '12px 16px',
                marginBottom: '4px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: isActive ? colors.bgTertiary : 'transparent',
                color: hasAccess ? (isActive ? colors.accent : colors.textSecondary) : colors.textMuted,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: hasAccess ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s ease',
                justifyContent: collapsed ? 'center' : 'flex-start',
                opacity: hasAccess ? 1 : 0.4,
              }}
              onMouseEnter={(e) => {
                if (hasAccess && !isActive) {
                  e.currentTarget.style.backgroundColor = colors.bgHover;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <item.icon size={20} />
              {!collapsed && (
                <>
                  <span style={{ fontSize: '14px', fontWeight: isActive ? '600' : '400' }}>{item.label}</span>
                  {!hasAccess && <Lock size={14} style={{ marginLeft: 'auto' }} />}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          margin: '12px',
          padding: '10px',
          borderRadius: '8px',
          border: `1px solid ${colors.border}`,
          backgroundColor: 'transparent',
          color: colors.textSecondary,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Menu size={18} />
      </button>
    </div>
  );
}

// Top Header
function TopHeader({ userTier, setUserTier, onMenuClick }) {
  return (
    <div style={{
      height: '60px',
      backgroundColor: colors.bgSecondary,
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Hamburger menu for mobile */}
        <button
          className="header-menu-btn"
          onClick={onMenuClick}
          style={{
            padding: '8px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'transparent',
            color: colors.textSecondary,
            cursor: 'pointer',
            display: 'none', // Hidden by default, shown via CSS on mobile
          }}
        >
          <Menu size={24} />
        </button>
        <span style={{ color: colors.textMuted, fontSize: '13px' }}>Institution:</span>
        <span style={{ fontWeight: '600' }}>University of California San Diego</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Tier Selector (for demo) */}
        <select
          value={userTier}
          onChange={(e) => setUserTier(e.target.value)}
          style={{
            backgroundColor: colors.bgTertiary,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            padding: '8px 12px',
            color: colors.textPrimary,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          <option value="A1">PEAR A1 (Core) - Student</option>
          <option value="A2">PEAR A2 (Premium) - Faculty</option>
          <option value="A3">PEAR A3 (Signature) - Admin</option>
        </select>

        {/* User Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 12px',
          borderRadius: '8px',
          backgroundColor: colors.bgTertiary,
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
          }}>
            CC
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '500' }}>Dr. Candice Chow</div>
            <div style={{ fontSize: '11px', color: colors.textMuted }}>Assistant Professor</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// PEAR Canvas - Main Workspace
function PEARCanvas({ userTier, chatOpen, setChatOpen, toolbarOpen, setToolbarOpen }) {
  const [activeTab, setActiveTab] = useState('document');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [documentContent, setDocumentContent] = useState('');
  const [showToolbar, setShowToolbar] = useState(true);

  const handleSearch = () => {
    if (!query.trim()) return;
    
    const newMessages = [
      ...messages,
      { type: 'user', content: query },
      { 
        type: 'assistant', 
        content: `Based on peer-reviewed sources from the PEAR academic database, here's what I found regarding "${query}":\n\nAccording to Smith et al. (2024) in Nature Communications, the latest research indicates significant developments in this area. The study, which analyzed data from over 10,000 participants, found compelling evidence supporting the hypothesis.\n\nAdditionally, Johnson & Williams (2023) published in JSTOR's Journal of Academic Research corroborates these findings with their longitudinal analysis.`,
        citations: [
          { id: 1, author: 'Smith et al.', year: 2024, source: 'Nature Communications', title: 'Advances in Research Methodology' },
          { id: 2, author: 'Johnson & Williams', year: 2023, source: 'JSTOR', title: 'Longitudinal Analysis of Academic Trends' },
        ]
      }
    ];
    setMessages(newMessages);
    setQuery('');
  };

  return (
    <div className="canvas-layout" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Main Canvas Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Tab Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '12px 24px',
          backgroundColor: colors.bgPrimary,
          borderBottom: `1px solid ${colors.border}`,
        }}>
          {[
            { id: 'document', icon: FileText, label: 'Document' },
            { id: 'spreadsheet', icon: Table, label: 'Data Analysis' },
            { id: 'presentation', icon: Presentation, label: 'Presentation' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? colors.bgTertiary : 'transparent',
                color: activeTab === tab.id ? colors.accent : colors.textSecondary,
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: activeTab === tab.id ? '600' : '400',
                transition: 'all 0.15s ease',
              }}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
          
          <button style={{
            marginLeft: 'auto',
            padding: '8px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: 'transparent',
            color: colors.textMuted,
            cursor: 'pointer',
          }}>
            <Plus size={18} />
          </button>
        </div>

        {/* Canvas Content */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* AI Chat Panel */}
          <div 
            className={`chat-panel ${chatOpen ? 'open' : ''}`}
            style={{
            width: '400px',
            borderRight: `1px solid ${colors.border}`,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.bgSecondary,
          }}>
            {/* Chat Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <Sparkles size={18} color={colors.accent} />
              <span style={{ fontWeight: '600', fontSize: '14px' }}>PEAR AI Assistant</span>
              <span style={{
                marginLeft: 'auto',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: colors.accent + '20',
                color: colors.accent,
                fontSize: '11px',
                fontWeight: '600',
              }}>
                Academic Sources Only
              </span>
              {/* Mobile close button */}
              <button
                className="close-btn"
                onClick={() => setChatOpen(false)}
                style={{
                  padding: '4px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: colors.textMuted,
                  cursor: 'pointer',
                  display: 'none', // Hidden by default, shown via CSS
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
            }}>
              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    margin: '0 auto 16px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${colors.accent}30, ${colors.accentLight}20)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <BookOpen size={28} color={colors.accent} />
                  </div>
                  <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600' }}>Research with Confidence</h3>
                  <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: '1.6' }}>
                    Ask questions and get citation-backed answers from peer-reviewed academic sources.
                  </p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} style={{
                    marginBottom: '16px',
                    padding: '14px',
                    borderRadius: '12px',
                    backgroundColor: msg.type === 'user' ? colors.accent + '15' : colors.bgTertiary,
                    borderLeft: msg.type === 'user' ? `3px solid ${colors.accent}` : 'none',
                  }}>
                    <div style={{ fontSize: '13px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                      {msg.content}
                    </div>
                    {msg.citations && (
                      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${colors.border}` }}>
                        <div style={{ fontSize: '11px', color: colors.textMuted, marginBottom: '8px', fontWeight: '600' }}>
                          SOURCES
                        </div>
                        {msg.citations.map(cite => (
                          <div key={cite.id} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            padding: '8px',
                            marginBottom: '6px',
                            borderRadius: '6px',
                            backgroundColor: colors.bgSecondary,
                            fontSize: '12px',
                          }}>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              backgroundColor: colors.accent,
                              color: '#fff',
                              fontSize: '10px',
                              fontWeight: '600',
                            }}>
                              {cite.id}
                            </span>
                            <div>
                              <div style={{ fontWeight: '500' }}>{cite.title}</div>
                              <div style={{ color: colors.textMuted }}>{cite.author} ({cite.year}) • {cite.source}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div style={{ padding: '16px', borderTop: `1px solid ${colors.border}` }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: colors.bgTertiary,
                border: `1px solid ${colors.border}`,
              }}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Ask a research question..."
                  style={{
                    flex: 1,
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: colors.textPrimary,
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={handleSearch}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: colors.accent,
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Document/Workspace Area */}
          <div 
            className="workspace-panel"
            style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: colors.bgPrimary }}>
            {activeTab === 'document' && <DocumentEditor />}
            {activeTab === 'spreadsheet' && <SpreadsheetEditor />}
            {activeTab === 'presentation' && <PresentationEditor />}
          </div>
        </div>
      </div>

      {/* Right Toolbar */}
      <CanvasToolbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={toolbarOpen}
        onClose={() => setToolbarOpen(false)}
      />
    </div>
  );
}

// Right Toolbar for Canvas
function CanvasToolbar({ activeTab, setActiveTab, isOpen, onClose }) {
  const tools = [
    { id: 'document', icon: FileText, label: 'Word Processing', desc: 'Create documents with AI assistance' },
    { id: 'spreadsheet', icon: FileSpreadsheet, label: 'Data Analysis', desc: 'Analyze CSV/Excel data' },
    { id: 'presentation', icon: Presentation, label: 'Presentations', desc: 'Create slide decks' },
  ];

  const features = [
    { icon: Quote, label: 'Auto-Cite', desc: 'Generate citations' },
    { icon: PenTool, label: 'Writing Assistant', desc: 'AI writing help' },
    { icon: BookOpen, label: 'Research', desc: 'Find sources' },
    { icon: Shield, label: 'Integrity Check', desc: 'Check plagiarism' },
  ];

  return (
    <div
      className={`canvas-toolbar ${isOpen ? 'open' : ''}`}
      style={{
      width: '280px',
      backgroundColor: colors.bgSecondary,
      borderLeft: `1px solid ${colors.border}`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Toolbar Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Workspace Tools</h3>
          <p style={{ fontSize: '12px', color: colors.textMuted }}>All-in-one academic workspace</p>
        </div>
        {/* Mobile close button */}
        <button
          className="close-btn"
          onClick={onClose}
          style={{
            padding: '8px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'transparent',
            color: colors.textSecondary,
            cursor: 'pointer',
            display: 'none', // Hidden by default, shown via CSS
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Tools */}
      <div style={{ padding: '16px' }}>
        <div style={{ fontSize: '11px', color: colors.textMuted, fontWeight: '600', marginBottom: '12px', letterSpacing: '0.5px' }}>
          CREATE
        </div>
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setActiveTab(tool.id)}
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '8px',
              borderRadius: '10px',
              border: activeTab === tool.id ? `2px solid ${colors.accent}` : `1px solid ${colors.border}`,
              backgroundColor: activeTab === tool.id ? colors.accent + '10' : colors.bgTertiary,
              color: colors.textPrimary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: activeTab === tool.id ? colors.accent : colors.bgHover,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <tool.icon size={20} color={activeTab === tool.id ? '#fff' : colors.textSecondary} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{tool.label}</div>
              <div style={{ fontSize: '11px', color: colors.textMuted }}>{tool.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* AI Features */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ fontSize: '11px', color: colors.textMuted, fontWeight: '600', marginBottom: '12px', letterSpacing: '0.5px' }}>
          AI FEATURES
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {features.map((feature, idx) => (
            <button
              key={idx}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.bgTertiary,
                color: colors.textPrimary,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.bgHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.bgTertiary}
            >
              <feature.icon size={18} color={colors.accent} />
              <span style={{ fontSize: '11px', fontWeight: '500' }}>{feature.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Import Section */}
      <div style={{ padding: '0 16px 16px', marginTop: 'auto' }}>
        <div style={{ fontSize: '11px', color: colors.textMuted, fontWeight: '600', marginBottom: '12px', letterSpacing: '0.5px' }}>
          IMPORT FILES
        </div>
        <button style={{
          width: '100%',
          padding: '14px',
          borderRadius: '10px',
          border: `2px dashed ${colors.border}`,
          backgroundColor: 'transparent',
          color: colors.textSecondary,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '13px',
        }}>
          <Download size={16} />
          Drop files or click to upload
        </button>
        <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '8px', textAlign: 'center' }}>
          Supports .docx, .csv, .xlsx, .pptx, .pdf
        </div>
      </div>
    </div>
  );
}

// Document Editor Component
function DocumentEditor() {
  const [content, setContent] = useState('');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Formatting Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '12px 20px',
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: colors.bgSecondary,
        flexWrap: 'wrap',
      }}>
        <ToolbarButton icon={Undo} />
        <ToolbarButton icon={Redo} />
        <ToolbarDivider />
        <select style={{
          backgroundColor: colors.bgTertiary,
          border: `1px solid ${colors.border}`,
          borderRadius: '4px',
          padding: '6px 10px',
          color: colors.textPrimary,
          fontSize: '12px',
        }}>
          <option>Paragraph</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
          <option>Heading 3</option>
        </select>
        <select style={{
          backgroundColor: colors.bgTertiary,
          border: `1px solid ${colors.border}`,
          borderRadius: '4px',
          padding: '6px 10px',
          color: colors.textPrimary,
          fontSize: '12px',
          marginLeft: '4px',
        }}>
          <option>12pt</option>
          <option>14pt</option>
          <option>16pt</option>
          <option>18pt</option>
        </select>
        <ToolbarDivider />
        <ToolbarButton icon={Bold} />
        <ToolbarButton icon={Italic} />
        <ToolbarButton icon={Underline} />
        <ToolbarDivider />
        <ToolbarButton icon={AlignLeft} />
        <ToolbarButton icon={AlignCenter} />
        <ToolbarButton icon={AlignRight} />
        <ToolbarDivider />
        <ToolbarButton icon={List} />
        <ToolbarButton icon={ListOrdered} />
        <ToolbarDivider />
        <ToolbarButton icon={Link} />
        <ToolbarButton icon={Image} />
        <ToolbarButton icon={Quote} tooltip="Insert Citation" accent />
        
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: colors.accent,
            color: '#fff',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Save size={14} />
            Save
          </button>
        </div>
      </div>

      {/* Document Area */}
      <div 
        className="doc-wrapper"
        style={{
        flex: 1,
        padding: '40px',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div
          className="doc-page" 
          style={{
          width: '100%',
          maxWidth: '816px',
          minHeight: '1056px',
          backgroundColor: '#fff',
          borderRadius: '4px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
          padding: '72px',
        }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your document...

Use the AI assistant on the left to research topics and automatically insert citations. Your work is protected by PEAR's academic integrity system."
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: '14px',
              lineHeight: '1.8',
              fontFamily: "'Times New Roman', serif",
              color: '#1a1a1a',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Toolbar Button Component
function ToolbarButton({ icon: Icon, tooltip, accent }) {
  return (
    <button
      title={tooltip}
      style={{
        padding: '8px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'transparent',
        color: accent ? colors.accent : colors.textSecondary,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon size={16} />
    </button>
  );
}

// Toolbar Divider Component
function ToolbarDivider() {
  return (
    <div style={{
      width: '1px',
      height: '20px',
      backgroundColor: colors.border,
      margin: '0 8px',
    }} />
  );
}

// Spreadsheet Editor Component
function SpreadsheetEditor() {
  const sampleData = [
    ['Participant', 'Age', 'Score', 'Group', 'Duration'],
    ['P001', '24', '85', 'Control', '45'],
    ['P002', '31', '92', 'Treatment', '52'],
    ['P003', '28', '78', 'Control', '38'],
    ['P004', '35', '88', 'Treatment', '49'],
    ['P005', '22', '95', 'Treatment', '55'],
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Spreadsheet Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: colors.bgSecondary,
      }}>
        <button style={{
          padding: '8px 16px',
          borderRadius: '6px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgTertiary,
          color: colors.textPrimary,
          fontSize: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Download size={14} />
          Import CSV
        </button>
        <button style={{
          padding: '8px 16px',
          borderRadius: '6px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgTertiary,
          color: colors.textPrimary,
          fontSize: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Sparkles size={14} color={colors.accent} />
          AI Analysis
        </button>
        <button style={{
          padding: '8px 16px',
          borderRadius: '6px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgTertiary,
          color: colors.textPrimary,
          fontSize: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <BarChart2 size={14} />
          Visualize
        </button>
      </div>

      {/* Spreadsheet Area */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: colors.bgSecondary,
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          <thead>
            <tr>
              {sampleData[0].map((header, idx) => (
                <th key={idx} style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  backgroundColor: colors.bgTertiary,
                  color: colors.textPrimary,
                  fontWeight: '600',
                  fontSize: '12px',
                  borderBottom: `1px solid ${colors.border}`,
                }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleData.slice(1).map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} style={{
                    padding: '10px 16px',
                    fontSize: '13px',
                    borderBottom: `1px solid ${colors.border}`,
                    color: colors.textSecondary,
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Presentation Editor Component
function PresentationEditor() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Presentation Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: colors.bgSecondary,
      }}>
        <button style={{
          padding: '8px 16px',
          borderRadius: '6px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgTertiary,
          color: colors.textPrimary,
          fontSize: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Plus size={14} />
          New Slide
        </button>
        <button style={{
          padding: '8px 16px',
          borderRadius: '6px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgTertiary,
          color: colors.textPrimary,
          fontSize: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Sparkles size={14} color={colors.accent} />
          AI Generate
        </button>
      </div>

      {/* Presentation Area */}
      <div style={{ flex: 1, display: 'flex', padding: '20px', gap: '20px' }}>
        {/* Slide Thumbnails */}
        <div style={{
          width: '120px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {[1, 2, 3].map(num => (
            <div key={num} style={{
              aspectRatio: '16/9',
              backgroundColor: num === 1 ? colors.bgTertiary : colors.bgSecondary,
              borderRadius: '6px',
              border: num === 1 ? `2px solid ${colors.accent}` : `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: colors.textMuted,
              cursor: 'pointer',
            }}>
              {num}
            </div>
          ))}
        </div>

        {/* Main Slide */}
        <div style={{
          flex: 1,
          backgroundColor: '#fff',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}>
          <h2 style={{ color: '#1a1a1a', fontSize: '32px', marginBottom: '16px' }}>Research Findings</h2>
          <p style={{ color: '#666', fontSize: '18px' }}>Click to add subtitle</p>
        </div>
      </div>
    </div>
  );
}

// Research Companion Component
function ResearchCompanion() {
  const [searchQuery, setSearchQuery] = useState('');

  const samplePapers = [
    {
      id: 1,
      title: 'Machine Learning Approaches for Climate Change Prediction Models',
      authors: 'Chen, L., Rodriguez, M., & Park, S.',
      year: 2024,
      journal: 'Nature Climate Change',
      database: 'JSTOR',
      citations: 142,
      abstract: 'This study presents novel machine learning methodologies for improving climate prediction accuracy...',
    },
    {
      id: 2,
      title: 'CRISPR-Cas9 Applications in Treating Genetic Disorders: A Systematic Review',
      authors: 'Williams, A., Thompson, K., & Lee, J.',
      year: 2024,
      journal: 'Cell Therapy',
      database: 'PubMed',
      citations: 89,
      abstract: 'A comprehensive review of recent advances in CRISPR-based therapeutic interventions...',
    },
    {
      id: 3,
      title: 'Quantum Computing Algorithms for Cryptographic Security',
      authors: 'Nakamura, H. & Okonkwo, E.',
      year: 2023,
      journal: 'IEEE Transactions on Quantum Engineering',
      database: 'IEEE Xplore',
      citations: 67,
      abstract: 'We propose a new class of quantum-resistant cryptographic protocols...',
    },
    {
      id: 4,
      title: 'The Impact of Social Media on Democratic Participation',
      authors: 'Garcia, R., Smith, T., & Johnson, M.',
      year: 2024,
      journal: 'Journal of Communication',
      database: 'UC Press',
      citations: 234,
      abstract: 'An empirical analysis of social media influence on voter engagement and political discourse...',
    },
    {
      id: 5,
      title: 'Microbiome Diversity and Its Role in Autoimmune Disease Prevention',
      authors: 'Patel, S., Kim, Y., & Anderson, B.',
      year: 2023,
      journal: 'PLOS Medicine',
      database: 'PLOS',
      citations: 156,
      abstract: 'This longitudinal study examines the relationship between gut microbiome composition...',
    },
  ];

  return (
    <div className="research-layout" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Search Panel */}
      <div 
        className="research-sidebar"
        style={{
        width: '300px',
        borderRight: `1px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bgSecondary,
        flexShrink: 0,
      }}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: '600' }}>Research Companion</h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: '12px',
            backgroundColor: colors.bgTertiary,
            border: `1px solid ${colors.border}`,
          }}>
            <Search size={18} color={colors.textMuted} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search academic sources..."
              style={{
                flex: 1,
                border: 'none',
                backgroundColor: 'transparent',
                color: colors.textPrimary,
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Database Filters */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '12px', fontWeight: '600' }}>
            DATABASES
          </div>
          {['JSTOR', 'PubMed', 'IEEE Xplore', 'UC Press', 'PLOS'].map((db, idx) => (
            <label key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 0',
              cursor: 'pointer',
            }}>
              <input type="checkbox" defaultChecked style={{ accentColor: colors.accent }} />
              <span style={{ fontSize: '13px' }}>{db}</span>
            </label>
          ))}
        </div>

        {/* Search Tips */}
        <div style={{ padding: '0 20px 20px', marginTop: 'auto' }}>
          <div style={{
            padding: '16px',
            borderRadius: '10px',
            backgroundColor: colors.bgTertiary,
            border: `1px solid ${colors.border}`,
          }}>
            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: colors.accent }}>
              Search Tips
            </div>
            <p style={{ fontSize: '11px', color: colors.textMuted, lineHeight: '1.5' }}>
              Use quotes for exact phrases. Add AND, OR, NOT for boolean searches.
            </p>
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="research-results" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Recent Papers</span>
            <span style={{ color: colors.textMuted, fontSize: '13px', marginLeft: '8px' }}>
              {samplePapers.length} results
            </span>
          </div>
          <select style={{
            backgroundColor: colors.bgTertiary,
            border: `1px solid ${colors.border}`,
            borderRadius: '6px',
            padding: '6px 10px',
            color: colors.textPrimary,
            fontSize: '12px',
          }}>
            <option>Sort by Relevance</option>
            <option>Sort by Date</option>
            <option>Sort by Citations</option>
          </select>
        </div>

        {/* Paper Cards */}
        {samplePapers.map((paper) => (
          <div key={paper.id} style={{
            padding: '20px',
            marginBottom: '12px',
            borderRadius: '12px',
            backgroundColor: colors.bgSecondary,
            border: `1px solid ${colors.border}`,
            transition: 'border-color 0.2s ease',
            cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: colors.bgTertiary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <FileText size={20} color={colors.accent} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '6px',
                  lineHeight: '1.4',
                  color: colors.textPrimary,
                }}>
                  {paper.title}
                </h3>
                <p style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '8px' }}>
                  {paper.authors} • {paper.year}
                </p>
                <p style={{ 
                  fontSize: '12px', 
                  color: colors.textSecondary, 
                  lineHeight: '1.5',
                  marginBottom: '12px',
                }}>
                  {paper.abstract}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: colors.accent + '20',
                    color: colors.accent,
                    fontSize: '11px',
                    fontWeight: '600',
                  }}>
                    {paper.database}
                  </span>
                  <span style={{ fontSize: '11px', color: colors.textMuted }}>
                    {paper.journal}
                  </span>
                  <span style={{ fontSize: '11px', color: colors.textMuted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Quote size={12} />
                    {paper.citations} citations
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: colors.accent,
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}>
                  Add to Cite
                </button>
                <button style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: 'transparent',
                  color: colors.textSecondary,
                  fontSize: '11px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}>
                  View PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Citation Manager Component
function CitationManager() {
  const citations = [
    { id: 1, title: 'Advances in Machine Learning', author: 'Smith et al.', year: 2024, source: 'Nature', type: 'Journal Article' },
    { id: 2, title: 'Quantum Computing Fundamentals', author: 'Johnson, A.', year: 2023, source: 'IEEE', type: 'Conference Paper' },
    { id: 3, title: 'Data Science Methodology', author: 'Williams & Brown', year: 2023, source: 'Springer', type: 'Book Chapter' },
  ];

  return (
    <div className="page-container" style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Citation Manager</h2>
          <div className="page-actions" style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.bgSecondary,
              color: colors.textPrimary,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Download size={16} />
              Export
            </button>
            <button style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: colors.accent,
              color: '#fff',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Plus size={16} />
              Add Citation
            </button>
          </div>
        </div>

        {/* Citations List */}
        <div style={{
          backgroundColor: colors.bgSecondary,
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          overflow: 'hidden',
        }}>
          {citations.map((cite, idx) => (
            <div key={cite.id} style={{
              padding: '16px 20px',
              borderBottom: idx < citations.length - 1 ? `1px solid ${colors.border}` : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: colors.bgTertiary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <FileText size={18} color={colors.accent} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>{cite.title}</div>
                <div style={{ fontSize: '12px', color: colors.textMuted }}>
                  {cite.author} • {cite.year} • {cite.source} • {cite.type}
                </div>
              </div>
              <button style={{
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'transparent',
                color: colors.textMuted,
                cursor: 'pointer',
              }}>
                <MoreVertical size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '12,847', change: '+12%', icon: Users, color: colors.accent },
    { label: 'Active Sessions', value: '3,241', change: '+8%', icon: Activity, color: colors.success },
    { label: 'Documents Created', value: '45,892', change: '+23%', icon: FileText, color: colors.info },
    { label: 'Integrity Flags', value: '127', change: '-5%', icon: Flag, color: colors.warning },
  ];

  return (
    <div className="page-container" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>Analytics Dashboard</h2>
        <p style={{ color: colors.textMuted }}>Monitor PEAR usage across your institution</p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px',
      }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: colors.bgSecondary,
            border: `1px solid ${colors.border}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: stat.color + '20',
              }}>
                <stat.icon size={24} color={stat.color} />
              </div>
              <span style={{
                padding: '4px 10px',
                borderRadius: '20px',
                backgroundColor: stat.change.startsWith('+') ? colors.success + '20' : colors.danger + '20',
                color: stat.change.startsWith('+') ? colors.success : colors.danger,
                fontSize: '12px',
                fontWeight: '600',
              }}>
                {stat.change}
              </span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px' }}>{stat.value}</div>
            <div style={{ fontSize: '14px', color: colors.textMuted }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '16px',
        marginBottom: '24px',
      }}>
        {/* Usage Chart */}
        <div style={{
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: colors.bgSecondary,
          border: `1px solid ${colors.border}`,
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Platform Usage Over Time</h3>
          <div style={{
            height: '200px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '8px',
            paddingTop: '20px',
          }}>
            {[65, 78, 82, 75, 90, 85, 95, 88, 92, 98, 94, 100].map((height, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: `${height}%`,
                  backgroundColor: colors.accent,
                  borderRadius: '4px 4px 0 0',
                  opacity: 0.7 + (idx * 0.025),
                }}
              />
            ))}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '12px',
            fontSize: '11px',
            color: colors.textMuted,
          }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>

        {/* User Distribution */}
        <div style={{
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: colors.bgSecondary,
          border: `1px solid ${colors.border}`,
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>User Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { tier: 'A1 - Core', count: '9,234', percent: 72, color: colors.accent },
              { tier: 'A2 - Premium', count: '2,891', percent: 22, color: colors.info },
              { tier: 'A3 - Signature', count: '722', percent: 6, color: colors.warning },
            ].map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px' }}>{item.tier}</span>
                  <span style={{ fontSize: '13px', color: colors.textMuted }}>{item.count}</span>
                </div>
                <div style={{
                  height: '8px',
                  backgroundColor: colors.bgTertiary,
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${item.percent}%`,
                    height: '100%',
                    backgroundColor: item.color,
                    borderRadius: '4px',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.border}`,
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Recent Activity Log</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['User', 'Action', 'Resource', 'Timestamp', 'Status'].map(header => (
                <th key={header} style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: colors.textMuted,
                  borderBottom: `1px solid ${colors.border}`,
                }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { user: 'john.smith@berkeley.edu', action: 'Document Created', resource: 'Research Paper Draft', time: '2 mins ago', status: 'success' },
              { user: 'sarah.jones@berkeley.edu', action: 'Integrity Check', resource: 'Final Thesis.docx', time: '15 mins ago', status: 'warning' },
              { user: 'mike.chen@berkeley.edu', action: 'Export Citations', resource: 'Bibliography.bib', time: '32 mins ago', status: 'success' },
              { user: 'emily.davis@berkeley.edu', action: 'AI Query', resource: 'Research Companion', time: '1 hour ago', status: 'success' },
              { user: 'prof.wilson@berkeley.edu', action: 'Plagiarism Review', resource: 'Student Submission', time: '2 hours ago', status: 'flagged' },
            ].map((row, idx) => (
              <tr key={idx}>
                <td style={{ padding: '14px 12px', fontSize: '13px', borderBottom: `1px solid ${colors.border}` }}>
                  {row.user}
                </td>
                <td style={{ padding: '14px 12px', fontSize: '13px', borderBottom: `1px solid ${colors.border}` }}>
                  {row.action}
                </td>
                <td style={{ padding: '14px 12px', fontSize: '13px', borderBottom: `1px solid ${colors.border}`, color: colors.accent }}>
                  {row.resource}
                </td>
                <td style={{ padding: '14px 12px', fontSize: '13px', borderBottom: `1px solid ${colors.border}`, color: colors.textMuted }}>
                  {row.time}
                </td>
                <td style={{ padding: '14px 12px', borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backgroundColor: 
                      row.status === 'success' ? colors.success + '20' :
                      row.status === 'warning' ? colors.warning + '20' : colors.danger + '20',
                    color:
                      row.status === 'success' ? colors.success :
                      row.status === 'warning' ? colors.warning : colors.danger,
                  }}>
                    {row.status === 'success' ? 'Completed' : row.status === 'warning' ? 'Review' : 'Flagged'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Governance Controls Component
function GovernanceControls() {
  return (
    <div className="page-container" style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="page-header" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Governance Controls</h2>
          <p style={{ color: colors.textMuted }}>
            Manage institutional AI policies and academic integrity settings
          </p>
        </div>

        {/* Policy Cards */}
        <div className="governance-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}>
          {/* AI Usage Policies */}
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: colors.bgSecondary,
            border: `1px solid ${colors.border}`,
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>AI Usage Policies</h3>
            {[
              { label: 'Require citation for AI-assisted content', enabled: true },
              { label: 'Flag documents with >50% AI-generated content', enabled: true },
              { label: 'Auto-detect uncited sources', enabled: true },
            ].map((policy, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: idx < 2 ? `1px solid ${colors.border}` : 'none',
              }}>
                <span style={{ fontSize: '13px' }}>{policy.label}</span>
                <div style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  backgroundColor: policy.enabled ? colors.accent : colors.bgTertiary,
                  position: 'relative',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    position: 'absolute',
                    top: '3px',
                    left: policy.enabled ? '23px' : '3px',
                    transition: 'left 0.2s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Data Privacy */}
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: colors.bgSecondary,
            border: `1px solid ${colors.border}`,
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>Data Privacy</h3>
            <div style={{
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: colors.success + '15',
              border: `1px solid ${colors.success}40`,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <Lock size={20} color={colors.success} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: colors.success }}>Closed-Loop Active</div>
                <div style={{ fontSize: '12px', color: colors.textMuted }}>Data not used for model training</div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: colors.textMuted, lineHeight: '1.6' }}>
              Your institutional data is protected and never leaves your secure environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
