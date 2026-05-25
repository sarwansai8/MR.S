import React, { useState, useEffect } from 'react';
import { I } from '../IconSet.jsx';
import { BIO, INITIALS, FULL_NAME, ROLE, EDUCATION, STATS, PROJECTS } from '../constants.js';

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
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'education' | 'credentials'
  const [terminalLines, setTerminalLines] = useState([]);
  
  const logs = [
    "Initializing Secure SSH Shell...",
    "Authentication successful [Level 3 - Root].",
    "Loading cybersecurity sandbox environment...",
    "✓ Firewall rules armed (Honeypots active)",
    "Verifying CEH & AZ-900 credentials...",
    "✓ CEH & AZ-900 Credentials Active [Root]",
    "Running network state audit: 0 active threats."
  ];

  useEffect(() => {
    let currentLine = 0;
    // Fast initial print, then slow down
    const printLine = () => {
      if (currentLine < logs.length) {
        setTerminalLines(prev => [...prev, logs[currentLine]]);
        currentLine++;
        setTimeout(printLine, currentLine === 1 ? 400 : 800);
      }
    };
    printLine();
  }, []);

  // Dynamically calculate project counts
  const dynamicStats = STATS.map(s => {
    if (s.label === 'Projects Completed' || s.label.toLowerCase().includes('projects')) {
      return { ...s, value: PROJECTS.length };
    }
    return s;
  });

  return (
    <div className="ab-polished">
      {/* Left Column: Tactical Profiler & Active Diagnostics */}
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
          <p className="ab-role">{ROLE}</p>
          
          <div className="ab-badge-row">
            <span className="ab-badge active-hiring">
              <span className="status-dot green"></span> SECURE SHIELD
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
            <span className="status-dot green"></span> DIAGNOSTIC SECURITY SHELL
          </div>
          <div className="ab-security-logs">
            {terminalLines.map((line, idx) => (
              <div key={idx} className={
                line.includes('✓') ? 'sec-out' :
                line.includes('🔒') || line.includes('Level') ? 'sec-out-alert' :
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
          <button 
            className={`ab-tab-btn ${activeTab === 'profile' ? 'active' : ''}`} 
            onClick={() => setActiveTab('profile')}
          >
            👤 Dossier Summary
          </button>
          <button 
            className={`ab-tab-btn ${activeTab === 'education' ? 'active' : ''}`} 
            onClick={() => setActiveTab('education')}
          >
            🎓 Academic Timeline
          </button>
          <button 
            className={`ab-tab-btn ${activeTab === 'credentials' ? 'active' : ''}`} 
            onClick={() => setActiveTab('credentials')}
          >
            🛡️ Certifications
          </button>
        </div>

        {/* Scrollable Information Body */}
        <div className="ab-tab-content scrollbar-custom">
          
          {/* PROFILE SUMMARY */}
          {activeTab === 'profile' && (
            <div className="tab-pane animate-fade-in">
              <div className="bio-styled-container">
                <span className="quote-mark">“</span>
                <p className="bio-styled">{BIO}</p>
              </div>

              <h3 className="section-subtitle">Operational Specializations</h3>
              <div className="ab-highlights-grid">
                <div className="highlight-item highlight-cyber">
                  <div className="hl-header">
                    <span className="hl-icon">🛡️</span>
                    <strong>Active Cybersecurity Operations</strong>
                  </div>
                  <p className="hl-desc">Defensive threat mapping (Nmap), intrusion analysis (Wireshark), deep packet capture inspect, multi-layered honeypots setup, and incident containment protocols.</p>
                </div>
                <div className="highlight-item highlight-dev">
                  <div className="hl-header">
                    <span className="hl-icon">💻</span>
                    <strong>Secure Full-Stack Engineering</strong>
                  </div>
                  <p className="hl-desc">Constructing modular web architectures with React, Node.js API pre-hardening, secure storage models (MongoDB/Supabase), on-chain cryptographic proof tags, and secure deployment sandboxing.</p>
                </div>
              </div>

              <h3 className="section-subtitle">Diagnostics telemetry</h3>
              <div className="ab-stats-polished">
                {dynamicStats.map((s, idx) => (
                  <div key={idx} className="stat-card">
                    <div className="stat-chip-glow"></div>
                    <div className="stat-value">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION & TIMELINE */}
          {activeTab === 'education' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="section-subtitle">Academic Milestones</h3>
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

          {/* CERTIFICATIONS & CREDENTIALS */}
          {activeTab === 'credentials' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="section-subtitle">Accredited Security Credentials</h3>
              <p className="creds-intro">Official industry qualifications validating expert knowledge in system penetration auditing, dynamic malware detection, secure networking, and incident defense.</p>
              
              <div className="cert-cards-grid">
                <div className="cert-card-polished cyber-glow-border">
                  <div className="cert-glow-overlay"></div>
                  <div className="cert-top-row">
                    <span className="cert-icon">🛡️</span>
                    <span className="cert-status-tag status-active">ACTIVE</span>
                  </div>
                  <h4>Certified Ethical Hacker (CEH)</h4>
                  <p>Accredited by EC-Council. Validates skills in automated perimeter checks, wireless vectors assessment, vulnerability scanning, and defense rules.</p>
                  <a href="https://drive.google.com/file/d/1M5bAEPY4Lrt_dl1njPtj_6VnZZFGbw2v/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="cert-btn">
                    Verify Credential ↗
                  </a>
                </div>

                <div className="cert-card-polished Microsoft-glow-border">
                  <div className="cert-glow-overlay"></div>
                  <div className="cert-top-row">
                    <span className="cert-icon">☁️</span>
                    <span className="cert-status-tag status-verified">VERIFIED</span>
                  </div>
                  <h4>Microsoft Certified: Azure Fundamentals (AZ-900)</h4>
                  <p>Certified by Microsoft. Validates knowledge of cloud architecture models, fundamental Azure core cloud resources, management tools, and secure identity protection governance.</p>
                  <span className="cert-btn-static">
                    ✓ Verified on Resume
                  </span>
                </div>
              </div>

              <div className="cert-cv-banner">
                <div className="banner-left">
                  <strong>Download Full Professional Dossier</strong>
                  <p>Get a complete comprehensive certified background résumé containing all operational milestones and courses.</p>
                </div>
                <a href="https://drive.google.com/file/d/1EMgY5_nwdWGzjsufn6ma5Z-YIo-m3hZW/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="btn primary banner-btn">
                  Download PDF
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
