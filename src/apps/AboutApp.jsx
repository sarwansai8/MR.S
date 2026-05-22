import React from 'react';
import { I } from '../IconSet.jsx';
import { BIO, INITIALS, BRAND, FULL_NAME, ROLE, SP, SBR, PROJECTS } from '../constants.js';

export default function AboutApp({ openApp }) {
  return (
    <div className="ab ab-polished">
      <div className="ab-hero-polished">
        <div className="ab-left">
          <div className="ab-av-polished">{INITIALS}</div>
          <h1 className="ab-name">{FULL_NAME}</h1>
          <p className="ab-role">{ROLE}</p>
          <div className="ab-ctas">
            <a className="btn primary" href="https://drive.google.com/file/d/1EMgY5_nwdWGzjsufn6ma5Z-YIo-m3hZW/view?usp=drive_link" target="_blank" rel="noopener noreferrer"><I.Resume /> Resume</a>
            <a className="btn" href="#contact" onClick={e => { e.preventDefault(); if (openApp) openApp('contact'); else window.location.href = 'mailto:sarwansai483@gmail.com'; }}><I.Mail /> Contact</a>
          </div>
          <div className="ab-socials">
            <a href="https://github.com/sarwansai8" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><I.GH /></a>
            <a href="https://linkedin.com/in/maddipati-sarwansai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><I.LI /></a>
          </div>
        </div>

        <div className="ab-right">
          <h3>Summary</h3>
          <p className="ab-b">{BIO}</p>

          <div className="ab-stats">
            <div className="stat"><div className="stat-v">{PROJECTS.length}</div><div className="stat-k">Projects</div></div>
            <div className="stat"><div className="stat-v">3</div><div className="stat-k">Certs</div></div>
            <div className="stat"><div className="stat-v">4</div><div className="stat-k">Years Edu</div></div>
          </div>

          <h4 style={{marginTop:'0.8rem'}}>Skills & Tools</h4>
          <div className="skill-grid">
            {SP.slice(0,4).map(s => s.i.map(item => (
              <span key={item} className="skill-pill">{item}</span>
            )))}
          </div>

          <h4 style={{marginTop:'0.8rem'}}>Certifications</h4>
          <ul className="cert-list">
            <li><a href="https://drive.google.com/file/d/1EMgY5_nwdWGzjsufn6ma5Z-YIo-m3hZW/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Resume / CV (Drive)</a></li>
            <li><a href="https://drive.google.com/file/d/1bU_0Gzmdli1JnY5N6tHtQYulBAcUD_LW/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Microsoft Career Essentials (AZ-900)</a></li>
            <li><a href="https://drive.google.com/file/d/1M5bAEPY4Lrt_dl1njPtj_6VnZZFGbw2v/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Certified Ethical Hacker (CEH)</a></li>
            <li><a href="https://drive.google.com/file/d/1f8IzMWfsP5bzANTCcz_UlWCVc4oVjSb-/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Salesforce Certification</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
