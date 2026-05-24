import React, { useState, useEffect } from 'react';
import { I } from '../IconSet.jsx';
import { BIO, INITIALS, BRAND, FULL_NAME, ROLE, SP, PROJECTS, EDUCATION, STATS } from '../constants.js';

function Counter({ value, suffix, duration = 1000 }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    if (end === 0) return;
    
    const stepTime = Math.max(Math.floor(duration / end), 15);
    const timer = setInterval(() => {
      start += Math.max(Math.floor(end / 40), 1);
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

  return (
    <div className="ab ab-polished">
      <div className="ab-hero-polished">
        {/* Left Column: Profile Card */}
        <div className="ab-left">
          <div className="ab-avatar-container">
            <div className="ab-av-polished">{INITIALS}</div>
            <span className="ab-status-pulse"></span>
          </div>
          
          <h1 className="ab-name">{FULL_NAME}</h1>
          <p className="ab-role">{ROLE}</p>
          
          <div className="ab-badge-row">
            <span className="ab-badge active-hiring">
              <span className="status-dot green"></span> Active Hiring
            </span>
            <span className="ab-badge learning">
              <span className="status-dot purple"></span> Threat Modeling
            </span>
          </div>

          <div className="ab-ctas">
            <a className="btn primary glow-btn" href="https://drive.google.com/file/d/1EMgY5_nwdWGzjsufn6ma5Z-YIo-m3hZW/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
              <I.Resume /> Resume
            </a>
            <button className="btn outline-btn" onClick={e => { e.preventDefault(); if (openApp) openApp('contact'); }}>
              <I.Mail /> Connect
            </button>
          </div>

          <div className="ab-socials-polished" style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <a href="https://github.com/sarwansai8" target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--brd)', borderRadius: '8px', color: 'var(--text-d)' }}>
              <I.GH />
            </a>
            <a href="https://linkedin.com/in/sarwansai" target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--brd)', borderRadius: '8px', color: 'var(--text-d)' }}>
              <I.LI />
            </a>
          </div>

          {/* Upgraded Cyber Security Diagnostic Console */}
          <div className="ab-security-widget">
            <div className="ab-security-header">
              <span className="status-dot green" style={{ width: '5px', height: '5px' }}></span> SECURE KERNEL DIAGNOSTIC
            </div>
            <div className="ab-security-logs">
              <div><span className="sec-cmd">$</span> whoami</div>
              <div className="sec-out">sarwansai8 (Level_3)</div>
              <div><span className="sec-cmd">$</span> check --credentials</div>
              <div className="sec-out-alert">✓ CEH Certified [Verified]</div>
              <div><span className="sec-cmd">$</span> sys --status</div>
              <div className="sec-out-warn">🛡️ Firewalls & CSP Hardened</div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Tabs and Details */}
        <div className="ab-right">
          {/* Tab Navigation */}
          <div className="ab-tabs">
            <button 
              className={`ab-tab-btn ${activeTab === 'profile' ? 'active' : ''}`} 
              onClick={() => setActiveTab('profile')}
            >
              👤 Profile Summary
            </button>
            <button 
              className={`ab-tab-btn ${activeTab === 'education' ? 'active' : ''}`} 
              onClick={() => setActiveTab('education')}
            >
              🎓 Academic History
            </button>
            <button 
              className={`ab-tab-btn ${activeTab === 'credentials' ? 'active' : ''}`} 
              onClick={() => setActiveTab('credentials')}
            >
              🛡️ Verifications & Certs
            </button>
          </div>

          {/* Tab Content */}
          <div className="ab-tab-content scrollbar-custom">
            {activeTab === 'profile' && (
              <div className="tab-pane animate-fade-in">
                <h3 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '8px' }}>About Me</h3>
                <p className="ab-b bio-styled" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--brd)', borderRadius: '8px', padding: '10px 12px' }}>{BIO}</p>

                <h3 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '8px', marginTop: '14px' }}>Core Specializations</h3>
                <div className="ab-highlights-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  <div className="highlight-item" style={{ borderLeft: '3px solid var(--accent-rose)', background: 'rgba(225,29,72,0.02)' }}>
                    <span className="hl-icon">🛡️</span>
                    <div className="hl-text">
                      <strong>Offensive & Defensive Cyber</strong>
                      <span>Ethical Hacking, Penetration Testing, Intrusion Sniffing (Nmap/Wireshark).</span>
                    </div>
                  </div>
                  <div className="highlight-item" style={{ borderLeft: '3px solid var(--accent-blue)', background: 'rgba(59,130,246,0.02)' }}>
                    <span className="hl-icon">💻</span>
                    <div className="hl-text">
                      <strong>Secure Software Engineering</strong>
                      <span>Zero-Trust Web Protocols, Cryptography APIs, and secure MERN stacks.</span>
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '8px', marginTop: '14px' }}>Technical Diagnostics</h3>
                <div className="ab-stats-polished" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {STATS.map((s, idx) => (
                    <div key={idx} className="stat-card" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <div className="stat-value" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>
                        <Counter value={s.value} suffix={s.suffix} />
                      </div>
                      <div className="stat-label" style={{ fontSize: '0.62rem', color: 'var(--text-m)', marginTop: '2px' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="tab-pane animate-fade-in">
                <h3 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '12px' }}>Academic Timeline</h3>
                <div className="timeline-container" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="timeline-item" style={{ display: 'flex', gap: '12px', borderLeft: '2px solid var(--brd)', paddingLeft: '14px', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '-6px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-blue)', border: '2px solid var(--bg-win)' }} />
                      <div className="timeline-content" style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="timeline-year" style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-m)' }}>{edu.year}</span>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold', color: '#fff', margin: '2px 0 1px' }}>{edu.degree}</h4>
                        <h5 style={{ fontSize: '0.8rem', color: 'var(--text-d)', fontWeight: 'normal', margin: 0 }}>{edu.institution}</h5>
                        {edu.specialization && (
                          <div className="timeline-spec" style={{ alignSelf: 'flex-start' }}>{edu.specialization}</div>
                        )}
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-d)', margin: '4px 0 0', lineHeight: '1.5' }}>{edu.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'credentials' && (
              <div className="tab-pane animate-fade-in">
                <h3 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '8px' }}>Professional Accreditations</h3>
                <p className="creds-intro" style={{ fontSize: '0.8rem', color: 'var(--text-d)', marginBottom: '12px' }}>Verified credentials proving foundational competence in secure computing, networking diagnostics, and systems defense.</p>
                
                <div className="cert-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="cert-card-polished" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--brd)', borderRadius: '10px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div className="cert-icon" style={{ fontSize: '1.8rem' }}>🛡️</div>
                    <div className="cert-details" style={{ display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ fontSize: '0.82rem', color: '#fff', margin: '0 0 2px' }}>Certified Ethical Hacker (CEH)</h4>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-d)', margin: '0 0 6px' }}>EC-Council Professional Certification</p>
                      <a href="https://drive.google.com/file/d/1M5bAEPY4Lrt_dl1njPtj_6VnZZFGbw2v/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="cert-btn" style={{ alignSelf: 'flex-start', fontSize: '0.7rem', color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 'bold' }}>
                        Verify Credential ↗
                      </a>
                    </div>
                  </div>

                  <div className="cert-card-polished" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--brd)', borderRadius: '10px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div className="cert-icon" style={{ fontSize: '1.8rem' }}>💻</div>
                    <div className="cert-details" style={{ display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ fontSize: '0.82rem', color: '#fff', margin: '0 0 2px' }}>Cybersecurity Career Essentials</h4>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-d)', margin: '0 0 6px' }}>Microsoft & LinkedIn Joint Professional</p>
                      <span className="cert-btn-static" style={{ alignSelf: 'flex-start', fontSize: '0.7rem', color: '#10b981', fontWeight: 'bold' }}>
                        ✓ Verified on Resume
                      </span>
                    </div>
                  </div>
                </div>

                <div className="cert-cv-banner" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--brd)', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-d)' }}>Need a fully verified, deep background?</span>
                  <a href="https://drive.google.com/file/d/1EMgY5_nwdWGzjsufn6ma5Z-YIo-m3hZW/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="btn small primary" style={{ fontSize: '0.72rem', padding: '6px 10px' }}>
                    Download CV (PDF)
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
