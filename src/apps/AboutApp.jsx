import React, { useState, useEffect } from 'react';
import { I } from '../IconSet.jsx';
import { BIO, INITIALS, FULL_NAME, ROLE, EDUCATION, STATS, SKILL_RATINGS } from '../constants.js';

function Counter({ value, suffix, duration = 1200 }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    if (end === 0) return;
    
    const stepTime = Math.max(Math.floor(duration / end), 12);
    const timer = setInterval(() => {
      start += Math.max(Math.floor(end / 30), 1);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
}

export default function AboutApp({ openApp }) {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'certifications' | 'skills' | 'achievements' | 'timeline'
  const [terminalLines, setTerminalLines] = useState([]);
  
  const logs = [
    "Initializing Secure SSH Shell...",
    "Authentication successful [Level 3 - Root].",
    "Loaded credentials matching: CEH, AZ-900.",
    "✓ Threat database initialized (Honeypots armed)",
    "Status: System fully defended. 0 threats detected."
  ];

  useEffect(() => {
    let currentLine = 0;
    const printLine = () => {
      if (currentLine < logs.length) {
        setTerminalLines(prev => [...prev, logs[currentLine]]);
        currentLine++;
        setTimeout(printLine, currentLine === 1 ? 300 : 700);
      }
    };
    printLine();
  }, []);

  // Featured Projects Data requested by User
  const featuredProjects = [
    {
      emoji: '🛡️',
      title: 'HealthGov — Final Year Project',
      desc: 'Real-Time Cyber Threat Management with modular high-interaction honeypot for healthcare. HIPAA-compliant, pen-test A+ (93%), 27-trap honeypot, AES-256-GCM, Merkle-tree integrity.',
      tags: ['Next.js 15', 'TypeScript', 'MongoDB Atlas', 'React 19', 'Tailwind'],
      stats: '415 impressions',
      team: 'P Abid, Naga Raja, Sai Sathwik',
      accent: '#3b82f6',
      github: 'https://github.com/sarwansai8/-Real-Time-Cyber-Threat-Management-Using-a-Modular-High-Interaction-Honeypot-Architecture'
    },
    {
      emoji: '🔍',
      title: 'SentinelX — Chrome Extension',
      desc: 'Real-time AI misinformation detector for Instagram & Twitter. Combines RoBERTa (text) + Vision Transformer (images) + FFT artifact detection + bot detection + weighted risk fusion engine.',
      tags: ['PyTorch', 'HuggingFace', 'FastAPI', 'MongoDB', 'Chrome Ext'],
      stats: '219+ impressions',
      team: 'GitHub available',
      accent: '#8b5cf6',
      github: 'https://github.com/sarwansai8/SentinelX.git'
    },
    {
      emoji: '🕸️',
      title: 'CyberTrapX — Red Team Honeypot',
      desc: 'Multi-layered honeypot simulating vulnerable environments. Evil Twin Wi-Fi simulation, keylogger traps, ransomware baits, fake CVE exploits, real-time dashboard + Telegram alerts.',
      tags: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Linux'],
      stats: '335 impressions',
      team: 'GitHub available',
      accent: '#f59e0b',
      github: 'https://github.com/sarwansai8/Advanced-Multi-Layered-Honeypot-System.git'
    },
    {
      emoji: '📱',
      title: 'ForensicaX — Mobile Forensics',
      desc: 'Stealth Android app for mobile forensics research. Silently captures contacts, call logs, SMS, and device IP with military-grade AES encryption + Python decryption module + SQLite chain-of-custody logging.',
      tags: ['Android SDK', 'AES-256', 'Python', 'SQLite'],
      stats: '824 impressions (highest engagement post)',
      team: 'Self Research',
      accent: '#e11d48',
      github: 'https://github.com/sarwansai8/sarwansai8'
    },
    {
      emoji: '📡',
      title: 'Wi-Fi Security Assessment Tool — Team Project',
      desc: 'Python desktop tool for Wi-Fi scanning, security assessment, handshake capture, password strength analysis, rogue AP detection & central dashboard interface.',
      tags: ['Python', 'PyQt5', 'Cryptography libs'],
      stats: '526+ impressions',
      team: 'P Abid, Raja Chikoti, Sai Sathwik',
      accent: '#10b981',
      github: 'https://github.com/sarwansai8/wifi-security-tool.git'
    }
  ];

  // Group skills by category dynamically
  const skillsByCategory = SKILL_RATINGS.reduce((acc, curr) => {
    if (!acc[curr.cat]) acc[curr.cat] = [];
    acc[curr.cat].push(curr);
    return acc;
  }, {});

  return (
    <div className="ab-polished">
      {/* Left Column: Profile Shell Diagnostics */}
      <div className="ab-left">
        {/* Profile Card */}
        <div className="ab-badge-container">
          <div className="ab-avatar-container">
            <div className="ab-av-polished">
              {INITIALS}
              <div className="ab-avatar-scanner"></div>
            </div>
            <span className="ab-status-pulse"></span>
          </div>
          
          <h1 className="ab-name">{FULL_NAME}</h1>
          <p className="ab-role" style={{ fontSize: '0.66rem' }}>{ROLE}</p>
          
          <div className="ab-badge-row">
            <span className="ab-badge active-hiring">
              <span className="status-dot green"></span> CEH & AZ-900
            </span>
            <span className="ab-badge learning">
              <span className="status-dot purple"></span> B.TECH 2026
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ab-ctas">
          <a href="https://drive.google.com/file/d/1EMgY5_nwdWGzjsufn6ma5Z-YIo-m3hZW/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
            <I.Resume /> Resume CV
          </a>
          <button onClick={e => { e.preventDefault(); if (openApp) openApp('contact'); }}>
            <I.Mail /> Contact
          </button>
        </div>

        {/* Social Links */}
        <div className="ab-socials-polished">
          <a href="https://github.com/sarwansai8" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
            <I.GH />
          </a>
          <a href="https://linkedin.com/in/sarwansai" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
            <I.LI />
          </a>
        </div>

        {/* Tactical Shell Console */}
        <div className="ab-security-widget">
          <div className="ab-security-header">
            <span className="status-dot green"></span> SECURE DIAGNOSTIC CONSOLE
          </div>
          <div className="ab-security-logs">
            {terminalLines.map((line, idx) => (
              <div key={idx} className={
                line.includes('✓') ? 'sec-out' :
                line.includes('Level') || line.includes('CEH') ? 'sec-out-alert' :
                line.startsWith('Initializing') ? 'sec-cmd' : 'sec-out'
              }>
                {line.startsWith('Initializing') ? <span className="sec-cmd">$ </span> : ''}
                {line}
              </div>
            ))}
            {terminalLines.length < logs.length && <span className="sec-cursor"></span>}
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic HUD Content Area */}
      <div className="ab-right">
        {/* Navigation Bar */}
        <div className="ab-tabs">
          <button className={`ab-tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            🛡️ Projects
          </button>
          <button className={`ab-tab-btn ${activeTab === 'certifications' ? 'active' : ''}`} onClick={() => setActiveTab('certifications')}>
            📜 Certifications
          </button>
          <button className={`ab-tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
            ⚡ Skills
          </button>
          <button className={`ab-tab-btn ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>
            🏆 Achievements
          </button>
          <button className={`ab-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>
            📅 Timeline
          </button>
        </div>

        {/* Scrollable Information Body */}
        <div className="ab-tab-content scrollbar-custom">
          
          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="tab-pane animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="bio-styled-container">
                <span className="quote-mark">“</span>
                <p className="bio-styled">{BIO}</p>
              </div>
              
              <h3 className="section-subtitle">Featured Cybersecurity & Dev Showcase</h3>
              {featuredProjects.map((p, idx) => (
                <div key={idx} className="feat-proj-card" style={{ borderLeftColor: p.accent }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.86rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{p.emoji}</span> {p.title}
                    </h4>
                    <span style={{ fontSize: '0.62rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '999px', padding: '2px 8px', fontFamily: 'monospace', color: p.accent }}>{p.stats}</span>
                  </div>
                  <p style={{ margin: '6px 0 8px', fontSize: '0.74rem', color: 'var(--text-d)', lineHeight: '1.45' }}>{p.desc}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {p.tags.map(t => <span key={t} style={{ fontSize: '0.58rem', padding: '1px 5px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '4px', color: '#fff' }}>{t}</span>)}
                    </div>
                    {p.team && (
                      <span style={{ fontSize: '0.64rem', color: 'var(--text-m)', fontStyle: 'italic' }}>
                        👥 {p.team}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS TAB */}
          {activeTab === 'certifications' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="section-subtitle">Official Cybersecurity & Cloud Accreditations</h3>
              <div className="cert-cards-grid">
                
                {/* Certified Ethical Hacker (CEH) */}
                <div className="cert-card-polished cyber-glow-border">
                  <div className="cert-glow-overlay"></div>
                  <div className="cert-top-row">
                    <span className="cert-icon">🛡️</span>
                    <span className="cert-status-tag status-active">ACTIVE</span>
                  </div>
                  <h4>Certified Ethical Hacker (CEH)</h4>
                  <p>Certified by EC-Council. Validates capabilities in perimeter intrusion analysis, dynamic vulnerability mapping (Nmap), keylog baits, and incident response.</p>
                  <a href="https://drive.google.com/file/d/1M5bAEPY4Lrt_dl1njPtj_6VnZZFGbw2v/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="cert-btn">
                    Verify Credential ↗
                  </a>
                </div>

                {/* Microsoft Azure Fundamentals (AZ-900) */}
                <div className="cert-card-polished Microsoft-glow-border">
                  <div className="cert-glow-overlay"></div>
                  <div className="cert-top-row">
                    <span className="cert-icon">☁️</span>
                    <span className="cert-status-tag status-verified">VERIFIED</span>
                  </div>
                  <h4>Microsoft Certified: Azure Fundamentals (AZ-900)</h4>
                  <p>Certified by Microsoft. Validates comprehensive cloud concepts, Azure architecture workloads, cloud security rules, governance compliance, and core management tools.</p>
                  <span className="cert-btn-static">✓ Verified on Resume</span>
                </div>

                {/* Career Essentials in Cybersecurity */}
                <div className="cert-card-polished Microsoft-glow-border" style={{ gridColumn: 'span 2' }}>
                  <div className="cert-glow-overlay"></div>
                  <div className="cert-top-row">
                    <span className="cert-icon">💻</span>
                    <span className="cert-status-tag status-verified">VERIFIED</span>
                  </div>
                  <h4>Career Essentials in Cybersecurity</h4>
                  <p>Accredited jointly by Microsoft & LinkedIn. Proves fundamental competency in active defensive security posture, secure networks, and cryptography.</p>
                  <span className="cert-btn-static">✓ Verified Accreditation</span>
                </div>

              </div>

              <div className="cert-cv-banner">
                <div className="banner-left">
                  <strong>Download Full Background Dossier</strong>
                  <p>Download the fully certified curriculum vitae containing all academic and operational details.</p>
                </div>
                <a href="https://drive.google.com/file/d/1EMgY5_nwdWGzjsufn6ma5Z-YIo-m3hZW/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="btn primary banner-btn">
                  Download PDF
                </a>
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="tab-pane animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 className="section-subtitle">Technical Competency Heatmap</h3>
              
              {Object.keys(skillsByCategory).map((cat, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.005)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '10px', padding: '14px' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.78rem', color: '#00f0ff', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {skillsByCategory[cat].map(skill => (
                      <div key={skill.name} className="skill-badge-premium">
                        <span>{skill.name}</span>
                        <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{skill.level}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ACHIEVEMENTS TAB */}
          {activeTab === 'achievements' && (
            <div className="tab-pane animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 className="section-subtitle">Publication & Reach Engagement Telemetry</h3>
              
              <div className="achieve-metrics-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                
                <div className="ach-card" style={{ borderLeft: '3px solid #f43f5e' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.4rem' }}>📱</span>
                    <span style={{ fontSize: '0.58rem', fontWeight: 'bold', background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', padding: '2px 8px', borderRadius: '999px' }}>TOP IMPACT</span>
                  </div>
                  <h4 style={{ margin: '8px 0 2px', fontSize: '0.8rem', color: '#fff' }}>ForensicaX Reach Metric</h4>
                  <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#f43f5e', fontFamily: 'monospace' }}>824 Impressions</div>
                  <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--text-m)' }}>Highest engaging technical publication showcasing mobile forensic research and stealth IP capture modules.</p>
                </div>

                <div className="ach-card" style={{ borderLeft: '3px solid #10b981' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.4rem' }}>📡</span>
                    <span style={{ fontSize: '0.58rem', fontWeight: 'bold', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '2px 8px', borderRadius: '999px' }}>FEATURED</span>
                  </div>
                  <h4 style={{ margin: '8px 0 2px', fontSize: '0.8rem', color: '#fff' }}>Wi-Fi Security Tool Reach</h4>
                  <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#10b981', fontFamily: 'monospace' }}>526+ Impressions</div>
                  <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--text-m)' }}>Widespread academic and industry reach for wireless assessment scan tools and rogue AP detection mechanisms.</p>
                </div>

                <div className="ach-card" style={{ borderLeft: '3px solid #3b82f6' }}>
                  <span style={{ fontSize: '1.4rem' }}>🛡️</span>
                  <h4 style={{ margin: '8px 0 2px', fontSize: '0.8rem', color: '#fff' }}>HealthGov Honeypot Reach</h4>
                  <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#3b82f6', fontFamily: 'monospace' }}>415 Impressions</div>
                  <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--text-m)' }}>Strong engagement on zero-trust enterprise medical platform showcase featuring 27 honeypot trapping vectors.</p>
                </div>

                <div className="ach-card" style={{ borderLeft: '3px solid #f59e0b' }}>
                  <span style={{ fontSize: '1.4rem' }}>🕸️</span>
                  <h4 style={{ margin: '8px 0 2px', fontSize: '0.8rem', color: '#fff' }}>CyberTrapX & SentinelX Reach</h4>
                  <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#f59e0b', fontFamily: 'monospace' }}>554+ Reach</div>
                  <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--text-m)' }}>Combined impressions highlighting crisis detection bot scoring grids and active keylogger/ransomware baits.</p>
                </div>

              </div>

              <div style={{ background: 'rgba(255,255,255,0.005)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '10px', padding: '14px' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '0.78rem', color: '#fff' }}>🛡️ Academic Distinction</h4>
                <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-d)', lineHeight: '1.5' }}>Maintained a high-performance **CGPA of 7.80/10.0** at KL University while specializing in active offensive-defensive cybersecurity operations, including multiple verified team systems designed alongside peers (P Abid, Sai Sathwik, Raja Chikoti).</p>
              </div>
            </div>
          )}

          {/* TIMELINE TAB */}
          {activeTab === 'timeline' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="section-subtitle">Academic Timeline & Training</h3>
              <div className="timeline-container">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <div className="timeline-header-row">
                        <span className="timeline-year">{edu.year}</span>
                        {edu.specialization && edu.specialization.includes('7.80') ? (
                          <span className="gpa-badge">CGPA: 7.80/10.0</span>
                        ) : null}
                      </div>
                      <h4 className="timeline-degree">{edu.degree}</h4>
                      <h5 className="timeline-institution">{edu.institution}</h5>
                      {edu.specialization && (
                        <div style={{ color: '#00f0ff', fontSize: '0.7rem', marginTop: '3px', fontWeight: '600', fontFamily: 'monospace' }}>
                          {edu.specialization.split(' (')[0]}
                        </div>
                      )}
                      <p className="timeline-desc">{edu.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
