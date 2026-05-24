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
              <span className="status-dot green"></span> Available for Hire
            </span>
            <span className="ab-badge learning">
              <span className="status-dot purple"></span> Cyber Threat Analysis
            </span>
          </div>

          <div className="ab-ctas">
            <a className="btn primary glow-btn" href="https://drive.google.com/file/d/1EMgY5_nwdWGzjsufn6ma5Z-YIo-m3hZW/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
              <I.Resume /> View Resume
            </a>
            <button className="btn outline-btn" onClick={e => { e.preventDefault(); if (openApp) openApp('contact'); }}>
              <I.Mail /> Get in Touch
            </button>
          </div>

          <div className="ab-socials-polished">
            <a href="https://github.com/sarwansai8" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
              <I.GH />
            </a>
            <a href="https://linkedin.com/in/sarwansai" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
              <I.LI />
            </a>
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
              🎓 Education Timeline
            </button>
            <button 
              className={`ab-tab-btn ${activeTab === 'credentials' ? 'active' : ''}`} 
              onClick={() => setActiveTab('credentials')}
            >
              🛡️ Credentials & Certs
            </button>
          </div>

          {/* Tab Content */}
          <div className="ab-tab-content scrollbar-custom">
            {activeTab === 'profile' && (
              <div className="tab-pane animate-fade-in">
                <h3>About Me</h3>
                <p className="ab-b bio-styled">{BIO}</p>

                <div className="ab-highlights-grid">
                  <div className="highlight-item">
                    <span className="hl-icon">⚡</span>
                    <div className="hl-text">
                      <strong>Ethical Hacker</strong>
                      <span>Specialize in scanning, mapping, and honey-potting.</span>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <span className="hl-icon">💻</span>
                    <div className="hl-text">
                      <strong>Full-Stack Secure Dev</strong>
                      <span>Building robust UIs with bulletproof backend logic.</span>
                    </div>
                  </div>
                </div>

                <h3>Key Metrics</h3>
                <div className="ab-stats-polished">
                  {STATS.map((s, idx) => (
                    <div key={idx} className="stat-card">
                      <div className="stat-value">
                        <Counter value={s.value} suffix={s.suffix} />
                      </div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="tab-pane animate-fade-in">
                <h3>Academic Background</h3>
                <div className="timeline-container">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-badge">🎓</div>
                      <div className="timeline-content">
                        <span className="timeline-year">{edu.year}</span>
                        <h4>{edu.degree}</h4>
                        <h5>{edu.institution}</h5>
                        {edu.specialization && <div className="timeline-spec">{edu.specialization}</div>}
                        <p>{edu.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'credentials' && (
              <div className="tab-pane animate-fade-in">
                <h3>Industry Credentials</h3>
                <p className="creds-intro">Verified credentials demonstrating professional competency in software development and active cybersecurity practices.</p>
                
                <div className="cert-cards-grid">
                  <div className="cert-card-polished">
                    <div className="cert-icon">🛡️</div>
                    <div className="cert-details">
                      <h4>Certified Ethical Hacker (CEH)</h4>
                      <p>EC-Council professional cybersecurity training & assessment</p>
                      <a href="https://drive.google.com/file/d/1M5bAEPY4Lrt_dl1njPtj_6VnZZFGbw2v/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="cert-btn">
                        Verify Credential ↗
                      </a>
                    </div>
                  </div>

                  <div className="cert-card-polished">
                    <div className="cert-icon">💻</div>
                    <div className="cert-details">
                      <h4>Career Essentials in Cybersecurity</h4>
                      <p>Professional accreditation by Microsoft and LinkedIn</p>
                      <span className="cert-btn-static">
                        Verified on Resume
                      </span>
                    </div>
                  </div>
                </div>

                <div className="cert-cv-banner">
                  <span>Looking for complete background and credentials?</span>
                  <a href="https://drive.google.com/file/d/1EMgY5_nwdWGzjsufn6ma5Z-YIo-m3hZW/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="btn small primary">
                    Download Full CV/Resume (PDF)
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
