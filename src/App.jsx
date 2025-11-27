import React, { useState, useCallback } from 'react';
import { Search, FileText, Table, Presentation, BookOpen, Quote, PenTool, Shield, BarChart3, Users, Eye, AlertTriangle, CheckCircle, Clock, Download, Filter, ChevronDown, Plus, X, Send, Sparkles, GraduationCap, Settings, LogOut, Menu, Home, Layers, FileSpreadsheet, SlidersHorizontal, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link, Image, Save, Undo, Redo, Type, PieChart, LineChart, BarChart2, TrendingUp, Calendar, Activity, Lock, Unlock, Flag, ExternalLink, Copy, Trash2, MoreVertical, ChevronRight, Database, Globe, Bookmark, Zap } from 'lucide-react';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userTier, setUserTier] = useState('A3'); // A1, A2, A3

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.bgPrimary,
      color: colors.textPrimary,
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      display: 'flex',
    }}>
      {/* Left Navigation Sidebar */}
      <NavigationSidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userTier={userTier}
      />
      
      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopHeader userTier={userTier} setUserTier={setUserTier} />
        
        {currentView === 'canvas' && <PEARCanvas userTier={userTier} />}
        {currentView === 'research' && <ResearchCompanion />}
        {currentView === 'citations' && <CitationManager />}
        {currentView === 'dashboard' && <AdminDashboard />}
        {currentView === 'governance' && <GovernanceControls />}
      </div>
    </div>
  );
}

// Navigation Sidebar
function NavigationSidebar({ currentView, setCurrentView, collapsed, setCollapsed, userTier }) {
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
    <div style={{
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
        padding: '20px',
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <GraduationCap size={20} color="#fff" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.5px' }}>PEAR</div>
            <div style={{ fontSize: '10px', color: colors.textMuted, letterSpacing: '1px' }}>BY PERPLEXITY</div>
          </div>
        )}
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
function TopHeader({ userTier, setUserTier }) {
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
        <span style={{ color: colors.textMuted, fontSize: '13px' }}>Institution:</span>
        <span style={{ fontWeight: '600' }}>University of Toronto</span>
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
            JD
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '500' }}>Dr. Jane Doe</div>
            <div style={{ fontSize: '11px', color: colors.textMuted }}>Research Faculty</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// PEAR Canvas - Main Workspace
function PEARCanvas({ userTier }) {
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
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
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
              {tab.label}
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
          <div style={{
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
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: colors.bgPrimary }}>
            {activeTab === 'document' && <DocumentEditor />}
            {activeTab === 'spreadsheet' && <SpreadsheetEditor />}
            {activeTab === 'presentation' && <PresentationEditor />}
          </div>
        </div>
      </div>

      {/* Right Toolbar */}
      <CanvasToolbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

// Right Toolbar for Canvas
function CanvasToolbar({ activeTab, setActiveTab }) {
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
    <div style={{
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
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Workspace Tools</h3>
        <p style={{ fontSize: '12px', color: colors.textMuted }}>All-in-one academic workspace</p>
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
      <div style={{
        flex: 1,
        padding: '40px',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
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
          padding: '8px 14px',
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
          padding: '8px 14px',
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
          Create Chart
        </button>
        <button style={{
          padding: '8px 14px',
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
          <TrendingUp size={14} />
          Run Analysis
        </button>
        <button style={{
          padding: '8px 14px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: colors.accent,
          color: '#fff',
          fontSize: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Sparkles size={14} />
          AI Analysis
        </button>
        
        <div style={{ marginLeft: 'auto' }}>
          <input
            type="text"
            placeholder="fx  =SUM(B2:B6)"
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.bgTertiary,
              color: colors.textPrimary,
              fontSize: '12px',
              width: '200px',
            }}
          />
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '13px',
        }}>
          <thead>
            <tr>
              <th style={{
                width: '40px',
                padding: '10px',
                backgroundColor: colors.bgTertiary,
                border: `1px solid ${colors.border}`,
                color: colors.textMuted,
              }}></th>
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(col => (
                <th key={col} style={{
                  padding: '10px 20px',
                  backgroundColor: colors.bgTertiary,
                  border: `1px solid ${colors.border}`,
                  color: colors.textSecondary,
                  fontWeight: '600',
                  minWidth: '100px',
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td style={{
                  padding: '10px',
                  backgroundColor: colors.bgTertiary,
                  border: `1px solid ${colors.border}`,
                  color: colors.textMuted,
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                  {rowIdx + 1}
                </td>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} style={{
                    padding: '10px 12px',
                    backgroundColor: rowIdx === 0 ? colors.bgTertiary : colors.bgSecondary,
                    border: `1px solid ${colors.border}`,
                    fontWeight: rowIdx === 0 ? '600' : '400',
                    color: rowIdx === 0 ? colors.accent : colors.textPrimary,
                  }}>
                    {cell}
                  </td>
                ))}
                {[...Array(8 - row.length)].map((_, idx) => (
                  <td key={`empty-${idx}`} style={{
                    padding: '10px 12px',
                    backgroundColor: colors.bgSecondary,
                    border: `1px solid ${colors.border}`,
                  }}></td>
                ))}
              </tr>
            ))}
            {[...Array(15)].map((_, rowIdx) => (
              <tr key={`empty-row-${rowIdx}`}>
                <td style={{
                  padding: '10px',
                  backgroundColor: colors.bgTertiary,
                  border: `1px solid ${colors.border}`,
                  color: colors.textMuted,
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                  {sampleData.length + rowIdx + 1}
                </td>
                {[...Array(8)].map((_, cellIdx) => (
                  <td key={`empty-cell-${cellIdx}`} style={{
                    padding: '10px 12px',
                    backgroundColor: colors.bgSecondary,
                    border: `1px solid ${colors.border}`,
                  }}></td>
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { title: 'Research Presentation', subtitle: 'Using PEAR Academic Platform', layout: 'title' },
    { title: 'Introduction', content: 'Overview of research methodology and objectives', layout: 'content' },
    { title: 'Key Findings', content: 'Data analysis results with citations', layout: 'content' },
  ];

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
          padding: '8px 14px',
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
          padding: '8px 14px',
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
          <Layers size={14} />
          Layouts
        </button>
        <button style={{
          padding: '8px 14px',
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
          <Image size={14} />
          Insert
        </button>
        <button style={{
          padding: '8px 14px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: colors.accent,
          color: '#fff',
          fontSize: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Sparkles size={14} />
          AI Generate Slides
        </button>
        
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.bgTertiary,
            color: colors.textPrimary,
            fontSize: '12px',
            cursor: 'pointer',
          }}>
            Present
          </button>
        </div>
      </div>

      {/* Presentation Area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Slide Thumbnails */}
        <div style={{
          width: '180px',
          backgroundColor: colors.bgTertiary,
          borderRight: `1px solid ${colors.border}`,
          padding: '16px',
          overflowY: 'auto',
        }}>
          {slides.map((slide, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                aspectRatio: '16/9',
                marginBottom: '12px',
                borderRadius: '6px',
                border: currentSlide === idx ? `2px solid ${colors.accent}` : `1px solid ${colors.border}`,
                backgroundColor: '#fff',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '6px', fontWeight: '600', color: '#333', textAlign: 'center' }}>
                {slide.title}
              </div>
            </div>
          ))}
          <button style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '6px',
            border: `2px dashed ${colors.border}`,
            backgroundColor: 'transparent',
            color: colors.textMuted,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Plus size={20} />
          </button>
        </div>

        {/* Main Slide View */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          backgroundColor: colors.bgPrimary,
        }}>
          <div style={{
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '16/9',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px',
          }}>
            {slides[currentSlide]?.layout === 'title' ? (
              <>
                <h1 style={{ fontSize: '42px', fontWeight: '700', color: '#1a1a1a', marginBottom: '16px' }}>
                  {slides[currentSlide]?.title}
                </h1>
                <p style={{ fontSize: '24px', color: '#666' }}>
                  {slides[currentSlide]?.subtitle}
                </p>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: '32px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px', alignSelf: 'flex-start' }}>
                  {slides[currentSlide]?.title}
                </h2>
                <p style={{ fontSize: '18px', color: '#444', lineHeight: '1.6', alignSelf: 'flex-start' }}>
                  {slides[currentSlide]?.content}
                </p>
              </>
            )}
          </div>
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
        backgroundColor: accent ? colors.accent + '20' : 'transparent',
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

// Research Companion Component
function ResearchCompanion() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Research Companion</h2>
      <p style={{ color: colors.textMuted, marginBottom: '24px' }}>Find credible, peer-reviewed sources for your research</p>
      
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
      }}>
        <input
          type="text"
          placeholder="Search academic sources..."
          style={{
            flex: 1,
            padding: '14px 20px',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.bgSecondary,
            color: colors.textPrimary,
            fontSize: '14px',
          }}
        />
        <button style={{
          padding: '14px 28px',
          borderRadius: '12px',
          border: 'none',
          backgroundColor: colors.accent,
          color: '#fff',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Source Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['All Sources', 'JSTOR', 'PubMed', 'Nature', 'Springer', 'Wiley'].map(source => (
          <button
            key={source}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: `1px solid ${colors.border}`,
              backgroundColor: source === 'All Sources' ? colors.accent : 'transparent',
              color: source === 'All Sources' ? '#fff' : colors.textSecondary,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {source}
          </button>
        ))}
      </div>

      {/* Results */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            padding: '20px',
            marginBottom: '12px',
            borderRadius: '12px',
            backgroundColor: colors.bgSecondary,
            border: `1px solid ${colors.border}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: colors.accent + '20',
              }}>
                <BookOpen size={20} color={colors.accent} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px' }}>
                  Sample Research Paper Title #{i}
                </h4>
                <p style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '8px' }}>
                  Author Name et al. • 2024 • Nature Communications
                </p>
                <p style={{ fontSize: '13px', color: colors.textSecondary, lineHeight: '1.6' }}>
                  Abstract excerpt showing the key findings and methodology of this peer-reviewed research paper...
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: colors.accent,
                    color: '#fff',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}>
                    Add to Citations
                  </button>
                  <button style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: `1px solid ${colors.border}`,
                    backgroundColor: 'transparent',
                    color: colors.textSecondary,
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}>
                    View Full Paper
                  </button>
                </div>
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
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>Citation Manager</h2>
          <p style={{ color: colors.textMuted }}>Manage and format your citations</p>
        </div>
        <select style={{
          padding: '10px 16px',
          borderRadius: '8px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgSecondary,
          color: colors.textPrimary,
          fontSize: '13px',
        }}>
          <option>APA 7th Edition</option>
          <option>MLA 9th Edition</option>
          <option>Chicago</option>
          <option>Harvard</option>
          <option>IEEE</option>
        </select>
      </div>

      {/* Citation List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            padding: '16px',
            marginBottom: '8px',
            borderRadius: '10px',
            backgroundColor: colors.bgSecondary,
            border: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}>
            <span style={{
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: colors.accent,
              color: '#fff',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              {i}
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '13px', lineHeight: '1.6' }}>
                Smith, J., & Johnson, M. (2024). Research methodology in academic studies. 
                <span style={{ color: colors.accent }}> Nature Communications, 15</span>(3), 245-267.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button style={{
                padding: '6px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'transparent',
                color: colors.textMuted,
                cursor: 'pointer',
              }}>
                <Copy size={14} />
              </button>
              <button style={{
                padding: '6px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'transparent',
                color: colors.textMuted,
                cursor: 'pointer',
              }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button style={{
        marginTop: '16px',
        padding: '14px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: colors.accent,
        color: '#fff',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}>
        <Download size={18} />
        Export Bibliography
      </button>
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
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
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
              { user: 'john.smith@utoronto.ca', action: 'Document Created', resource: 'Research Paper Draft', time: '2 mins ago', status: 'success' },
              { user: 'sarah.jones@utoronto.ca', action: 'Integrity Check', resource: 'Final Thesis.docx', time: '15 mins ago', status: 'warning' },
              { user: 'mike.chen@utoronto.ca', action: 'Export Citations', resource: 'Bibliography.bib', time: '32 mins ago', status: 'success' },
              { user: 'emily.davis@utoronto.ca', action: 'AI Query', resource: 'Research Companion', time: '1 hour ago', status: 'success' },
              { user: 'prof.wilson@utoronto.ca', action: 'Plagiarism Review', resource: 'Student Submission', time: '2 hours ago', status: 'flagged' },
            ].map((row, idx) => (
              <tr key={idx}>
                <td style={{ padding: '14px 12px', fontSize: '13px', borderBottom: `1px solid ${colors.border}` }}>
                  {row.user}
                </td>
                <td style={{ padding: '14px 12px', fontSize: '13px', borderBottom: `1px solid ${colors.border}` }}>
                  {row.action}
                </td>
                <td style={{ padding: '14px 12px', fontSize: '13px', borderBottom: `1px solid ${colors.border}`, color: colors.textSecondary }}>
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
                    backgroundColor: row.status === 'success' ? colors.success + '20' : 
                                     row.status === 'warning' ? colors.warning + '20' : colors.danger + '20',
                    color: row.status === 'success' ? colors.success : 
                           row.status === 'warning' ? colors.warning : colors.danger,
                  }}>
                    {row.status === 'success' ? 'Complete' : row.status === 'warning' ? 'Review' : 'Flagged'}
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
  const [activeSection, setActiveSection] = useState('integrity');

  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Governance Sidebar */}
      <div style={{
        width: '240px',
        backgroundColor: colors.bgSecondary,
        borderRight: `1px solid ${colors.border}`,
        padding: '16px',
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: colors.textMuted }}>
          GOVERNANCE CONTROLS
        </h3>
        {[
          { id: 'integrity', icon: Shield, label: 'Academic Integrity' },
          { id: 'plagiarism', icon: AlertTriangle, label: 'Plagiarism Detection' },
          { id: 'traceability', icon: Eye, label: 'Traceability' },
          { id: 'compliance', icon: CheckCircle, label: 'Compliance' },
          { id: 'data', icon: Database, label: 'Data Controls' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '4px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeSection === item.id ? colors.bgTertiary : 'transparent',
              color: activeSection === item.id ? colors.accent : colors.textSecondary,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '13px',
              textAlign: 'left',
            }}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {activeSection === 'integrity' && <AcademicIntegrityPanel />}
        {activeSection === 'plagiarism' && <PlagiarismPanel />}
        {activeSection === 'traceability' && <TraceabilityPanel />}
        {activeSection === 'compliance' && <CompliancePanel />}
        {activeSection === 'data' && <DataControlsPanel />}
      </div>
    </div>
  );
}

// Academic Integrity Panel
function AcademicIntegrityPanel() {
  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Academic Integrity Monitor</h2>
      <p style={{ color: colors.textMuted, marginBottom: '24px' }}>
        Monitor and enforce academic integrity policies across your institution
      </p>

      {/* Alert Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px',
      }}>
        {[
          { label: 'Active Violations', value: '23', severity: 'high' },
          { label: 'Pending Review', value: '47', severity: 'medium' },
          { label: 'Resolved This Week', value: '156', severity: 'low' },
        ].map((card, idx) => (
          <div key={idx} style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: colors.bgSecondary,
            borderLeft: `4px solid ${
              card.severity === 'high' ? colors.danger :
              card.severity === 'medium' ? colors.warning : colors.success
            }`,
          }}>
            <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>{card.value}</div>
            <div style={{ fontSize: '13px', color: colors.textMuted }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Violations Table */}
      <div style={{
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600' }}>Recent Integrity Flags</h3>
          <button style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: `1px solid ${colors.border}`,
            backgroundColor: 'transparent',
            color: colors.textSecondary,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Filter size={14} />
            Filter
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Student', 'Document', 'Violation Type', 'AI Usage %', 'Date', 'Actions'].map(header => (
                <th key={header} style={{
                  padding: '12px 8px',
                  textAlign: 'left',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: colors.textMuted,
                  borderBottom: `1px solid ${colors.border}`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { student: 'Alex Thompson', doc: 'Essay_Final.docx', type: 'High AI Content', ai: '78%', date: 'Nov 25, 2025' },
              { student: 'Maria Garcia', doc: 'Research_Paper.docx', type: 'Citation Missing', ai: '12%', date: 'Nov 24, 2025' },
              { student: 'James Wilson', doc: 'Lab_Report.docx', type: 'Duplicate Content', ai: '45%', date: 'Nov 24, 2025' },
            ].map((row, idx) => (
              <tr key={idx}>
                <td style={{ padding: '14px 8px', fontSize: '13px', borderBottom: `1px solid ${colors.border}` }}>
                  {row.student}
                </td>
                <td style={{ padding: '14px 8px', fontSize: '13px', borderBottom: `1px solid ${colors.border}`, color: colors.accent }}>
                  {row.doc}
                </td>
                <td style={{ padding: '14px 8px', fontSize: '13px', borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: colors.danger + '20',
                    color: colors.danger,
                    fontSize: '11px',
                  }}>
                    {row.type}
                  </span>
                </td>
                <td style={{ padding: '14px 8px', fontSize: '13px', borderBottom: `1px solid ${colors.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '60px',
                      height: '6px',
                      backgroundColor: colors.bgTertiary,
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: row.ai,
                        height: '100%',
                        backgroundColor: parseInt(row.ai) > 50 ? colors.danger : colors.warning,
                      }} />
                    </div>
                    {row.ai}
                  </div>
                </td>
                <td style={{ padding: '14px 8px', fontSize: '13px', borderBottom: `1px solid ${colors.border}`, color: colors.textMuted }}>
                  {row.date}
                </td>
                <td style={{ padding: '14px 8px', borderBottom: `1px solid ${colors.border}` }}>
                  <button style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: colors.accent,
                    color: '#fff',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}>
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Plagiarism Panel
function PlagiarismPanel() {
  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Plagiarism Detection</h2>
      <p style={{ color: colors.textMuted, marginBottom: '24px' }}>
        AI-powered plagiarism detection integrated with academic sources
      </p>

      {/* Upload Section */}
      <div style={{
        padding: '40px',
        borderRadius: '12px',
        border: `2px dashed ${colors.border}`,
        backgroundColor: colors.bgSecondary,
        textAlign: 'center',
        marginBottom: '24px',
      }}>
        <Download size={48} color={colors.textMuted} style={{ marginBottom: '16px' }} />
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Upload Documents for Review</h3>
        <p style={{ color: colors.textMuted, fontSize: '13px', marginBottom: '16px' }}>
          Drag and drop files or click to browse
        </p>
        <button style={{
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: colors.accent,
          color: '#fff',
          fontWeight: '600',
          cursor: 'pointer',
        }}>
          Select Files
        </button>
      </div>

      {/* Recent Scans */}
      <div style={{
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.border}`,
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>Recent Scans</h3>
        {[
          { name: 'Thesis_Draft_v3.docx', similarity: 8, status: 'clean', time: '10 mins ago' },
          { name: 'Assignment_2.docx', similarity: 34, status: 'review', time: '1 hour ago' },
          { name: 'Research_Methods.docx', similarity: 12, status: 'clean', time: '3 hours ago' },
        ].map((scan, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '14px',
            marginBottom: '8px',
            borderRadius: '8px',
            backgroundColor: colors.bgTertiary,
          }}>
            <FileText size={20} color={colors.textSecondary} />
            <div style={{ marginLeft: '12px', flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: '500' }}>{scan.name}</div>
              <div style={{ fontSize: '11px', color: colors.textMuted }}>{scan.time}</div>
            </div>
            <div style={{
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: scan.status === 'clean' ? colors.success + '20' : colors.warning + '20',
              color: scan.status === 'clean' ? colors.success : colors.warning,
              fontSize: '12px',
              fontWeight: '600',
              marginRight: '12px',
            }}>
              {scan.similarity}% Similarity
            </div>
            <button style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: `1px solid ${colors.border}`,
              backgroundColor: 'transparent',
              color: colors.textSecondary,
              fontSize: '11px',
              cursor: 'pointer',
            }}>
              View Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Traceability Panel
function TraceabilityPanel() {
  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Usage Traceability</h2>
      <p style={{ color: colors.textMuted, marginBottom: '24px' }}>
        Complete audit trail of all AI interactions and document changes
      </p>

      {/* Search */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
      }}>
        <input
          type="text"
          placeholder="Search by user, document, or action..."
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.bgSecondary,
            color: colors.textPrimary,
            fontSize: '13px',
          }}
        />
        <input
          type="date"
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.bgSecondary,
            color: colors.textPrimary,
            fontSize: '13px',
          }}
        />
        <button style={{
          padding: '12px 20px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: colors.accent,
          color: '#fff',
          fontWeight: '600',
          cursor: 'pointer',
        }}>
          Search
        </button>
      </div>

      {/* Timeline */}
      <div style={{
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.border}`,
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '20px' }}>Activity Timeline</h3>
        
        {[
          { time: '14:32', user: 'john.smith@utoronto.ca', action: 'AI Query', detail: '"What are the key factors affecting climate change?"', type: 'query' },
          { time: '14:28', user: 'john.smith@utoronto.ca', action: 'Citation Added', detail: 'Smith et al. (2024) added to document', type: 'citation' },
          { time: '14:15', user: 'sarah.jones@utoronto.ca', action: 'Document Export', detail: 'Research_Paper.docx exported as PDF', type: 'export' },
          { time: '13:45', user: 'mike.chen@utoronto.ca', action: 'AI Writing Assist', detail: 'Paragraph expansion in Section 3', type: 'assist' },
          { time: '13:22', user: 'emily.davis@utoronto.ca', action: 'Plagiarism Check', detail: 'Thesis_Chapter_2.docx - 4% similarity', type: 'check' },
        ].map((item, idx) => (
          <div key={idx} style={{
            display: 'flex',
            gap: '16px',
            paddingLeft: '20px',
            paddingBottom: '20px',
            borderLeft: `2px solid ${colors.border}`,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              left: '-6px',
              top: '0',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: colors.accent,
            }} />
            <div style={{
              fontSize: '12px',
              color: colors.textMuted,
              width: '50px',
              flexShrink: 0,
            }}>
              {item.time}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>{item.action}</span>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: colors.bgTertiary,
                  fontSize: '10px',
                  color: colors.textMuted,
                }}>
                  {item.type}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '4px' }}>{item.user}</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Compliance Panel
function CompliancePanel() {
  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Compliance Settings</h2>
      <p style={{ color: colors.textMuted, marginBottom: '24px' }}>
        Configure academic integrity policies and compliance rules
      </p>

      {/* Policy Settings */}
      <div style={{
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.border}`,
        marginBottom: '16px',
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>AI Usage Policies</h3>
        
        {[
          { label: 'Require citation for AI-assisted content', enabled: true },
          { label: 'Flag documents with >50% AI-generated content', enabled: true },
          { label: 'Auto-detect uncited sources', enabled: true },
          { label: 'Notify instructors of integrity violations', enabled: false },
          { label: 'Block submission of flagged documents', enabled: false },
        ].map((policy, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 0',
            borderBottom: idx < 4 ? `1px solid ${colors.border}` : 'none',
          }}>
            <span style={{ fontSize: '13px' }}>{policy.label}</span>
            <button
              style={{
                width: '48px',
                height: '26px',
                borderRadius: '13px',
                border: 'none',
                backgroundColor: policy.enabled ? colors.accent : colors.bgTertiary,
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                position: 'absolute',
                top: '3px',
                left: policy.enabled ? '25px' : '3px',
                transition: 'all 0.2s ease',
              }} />
            </button>
          </div>
        ))}
      </div>

      {/* Thresholds */}
      <div style={{
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.border}`,
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>Detection Thresholds</h3>
        
        {[
          { label: 'AI Content Warning Threshold', value: 30 },
          { label: 'AI Content Flag Threshold', value: 50 },
          { label: 'Plagiarism Warning Threshold', value: 15 },
          { label: 'Plagiarism Flag Threshold', value: 25 },
        ].map((threshold, idx) => (
          <div key={idx} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px' }}>{threshold.label}</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: colors.accent }}>{threshold.value}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue={threshold.value}
              style={{
                width: '100%',
                accentColor: colors.accent,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Data Controls Panel
function DataControlsPanel() {
  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Data Controls</h2>
      <p style={{ color: colors.textMuted, marginBottom: '24px' }}>
        Manage institutional data privacy and security settings
      </p>

      {/* Closed Loop System Status */}
      <div style={{
        padding: '24px',
        borderRadius: '12px',
        backgroundColor: colors.success + '10',
        border: `1px solid ${colors.success}40`,
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{
          padding: '12px',
          borderRadius: '12px',
          backgroundColor: colors.success + '20',
        }}>
          <Lock size={28} color={colors.success} />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: colors.success }}>
            Closed-Loop System Active
          </h3>
          <p style={{ fontSize: '13px', color: colors.textSecondary }}>
            Institutional data is protected and not used for model training
          </p>
        </div>
      </div>

      {/* Data Settings */}
      <div style={{
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: colors.bgSecondary,
        border: `1px solid ${colors.border}`,
        marginBottom: '16px',
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>Data Privacy Settings</h3>
        
        {[
          { label: 'Prevent data use for AI model training', enabled: true, locked: true },
          { label: 'Encrypt all documents at rest', enabled: true, locked: false },
          { label: 'Anonymize usage analytics', enabled: false, locked: false },
          { label: 'Auto-delete inactive user data (90 days)', enabled: false, locked: false },
          { label: 'Restrict external sharing', enabled: true, locked: false },
        ].map((setting, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 0',
            borderBottom: idx < 4 ? `1px solid ${colors.border}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px' }}>{setting.label}</span>
              {setting.locked && (
                <Lock size={14} color={colors.textMuted} />
              )}
            </div>
            <button
              disabled={setting.locked}
              style={{
                width: '48px',
                height: '26px',
                borderRadius: '13px',
                border: 'none',
                backgroundColor: setting.enabled ? colors.accent : colors.bgTertiary,
                cursor: setting.locked ? 'not-allowed' : 'pointer',
                position: 'relative',
                opacity: setting.locked ? 0.7 : 1,
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                position: 'absolute',
                top: '3px',
                left: setting.enabled ? '25px' : '3px',
              }} />
            </button>
          </div>
        ))}
      </div>

      {/* Export & Audit */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
      }}>
        <button style={{
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgSecondary,
          color: colors.textPrimary,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}>
          <Download size={24} color={colors.accent} />
          <span style={{ fontWeight: '600' }}>Export All Data</span>
          <span style={{ fontSize: '12px', color: colors.textMuted }}>Download institutional data archive</span>
        </button>
        <button style={{
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgSecondary,
          color: colors.textPrimary,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}>
          <FileText size={24} color={colors.accent} />
          <span style={{ fontWeight: '600' }}>Generate Audit Report</span>
          <span style={{ fontSize: '12px', color: colors.textMuted }}>Compliance documentation</span>
        </button>
      </div>
    </div>
  );
}
