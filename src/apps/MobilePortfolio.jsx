import React, { useState, useEffect, useMemo } from 'react';
import { FULL_NAME, ROLE, BIO, PROJECTS, SKILL_RATINGS, EDUCATION, STATS, BRAND } from '../constants.js';
import { I } from '../IconSet.jsx';

/* ═══════════════════════════════════════════════════════════════════
   MOBILE PORTFOLIO — Clean scrollable view for < 768px
   No OS metaphor. No draggable windows. Just a premium, recruiter-friendly
   single-page portfolio that works perfectly on touch devices.
   ═══════════════════════════════════════════════════════════════════ */

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{count}{suffix}</>;
}

function SkillBar({ name, level }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(level), 300); return () => clearTimeout(t); }, [level]);
  return (
    <div className="mp-skill-bar">
      <div className="mp-skill-bar-header">
        <span className="mp-skill-bar-name">{name}</span>
        <span className="mp-skill-bar-pct">{level}%</span>
      </div>
      <div className="mp-skill-bar-track">
        <div className="mp-skill-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function MobilePortfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [skillFilter, setSkillFilter] = useState('All');

  const categories = useMemo(() => {
    const cats = [...new Set(SKILL_RATINGS.map(s => s.cat))];
    return ['All', ...cats];
  }, []);

  const filteredSkills = useMemo(() => {
    if (skillFilter === 'All') return SKILL_RATINGS;
    return SKILL_RATINGS.filter(s => s.cat === skillFilter);
  }, [skillFilter]);

  const sections = [
    { id: 'about', label: 'About', icon: <I.User /> },
    { id: 'skills', label: 'Skills', icon: <I.Code /> },
    { id: 'projects', label: 'Projects', icon: <I.Folder /> },
    { id: 'contact', label: 'Contact', icon: <I.Mail /> },
  ];

  return (
    <div className="mp-root">
      {/* ── HEADER ── */}
      <header className="mp-header">
        <div className="mp-header-brand">{BRAND}</div>
        <a href="https://github.com/sarwansai8" target="_blank" rel="noopener noreferrer" className="mp-header-github">
          <I.GH />
        </a>
      </header>

      {/* ── HERO ── */}
      <section className="mp-hero">
        <div className="mp-hero-initials">SM</div>
        <h1 className="mp-hero-name">{FULL_NAME}</h1>
        <p className="mp-hero-role">{ROLE}</p>
        <div className="mp-hero-links">
          <a href="https://linkedin.com/in/sarwansai" target="_blank" rel="noopener noreferrer" className="mp-hero-btn mp-hero-btn-primary">
            <I.LI /> LinkedIn
          </a>
          <a href="https://github.com/sarwansai8" target="_blank" rel="noopener noreferrer" className="mp-hero-btn mp-hero-btn-secondary">
            <I.GH /> GitHub
          </a>
          <a href="mailto:sarwansai483@gmail.com" className="mp-hero-btn mp-hero-btn-secondary">
            <I.Mail /> Email
          </a>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="mp-stats">
        {STATS.map((s, i) => (
          <div key={i} className="mp-stat-card">
            <div className="mp-stat-value"><AnimatedCounter target={s.value} suffix={s.suffix} /></div>
            <div className="mp-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── SECTION NAV ── */}
      <nav className="mp-nav">
        {sections.map(s => (
          <button
            key={s.id}
            className={`mp-nav-btn ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id)}
          >
            {s.icon}
            <span>{s.label}</span>
          </button>
        ))}
      </nav>

      {/* ── CONTENT SECTIONS ── */}
      <main className="mp-content">

        {/* ABOUT */}
        {activeSection === 'about' && (
          <section className="mp-section mp-section-fade">
            <h2 className="mp-section-title">About Me</h2>
            <p className="mp-bio">{BIO}</p>

            <h3 className="mp-subsection-title">Education</h3>
            {EDUCATION.map((edu, i) => (
              <div key={i} className="mp-edu-card">
                <div className="mp-edu-year">{edu.year}</div>
                <div className="mp-edu-degree">{edu.degree}</div>
                <div className="mp-edu-inst">{edu.institution}</div>
                <div className="mp-edu-spec">{edu.specialization}</div>
              </div>
            ))}

            <h3 className="mp-subsection-title">Certifications</h3>
            <div className="mp-cert-grid">
              <div className="mp-cert-card">
                <span className="mp-cert-icon">🛡️</span>
                <span className="mp-cert-name">Google Cybersecurity Professional Certificate</span>
              </div>
              <div className="mp-cert-card">
                <span className="mp-cert-icon">🐍</span>
                <span className="mp-cert-name">Python Certification</span>
              </div>
            </div>
          </section>
        )}

        {/* SKILLS */}
        {activeSection === 'skills' && (
          <section className="mp-section mp-section-fade">
            <h2 className="mp-section-title">Skills</h2>
            <div className="mp-skill-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`mp-skill-filter ${skillFilter === cat ? 'active' : ''}`}
                  onClick={() => setSkillFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="mp-skills-list">
              {filteredSkills.map(s => (
                <SkillBar key={s.name} name={s.name} level={s.level} />
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {activeSection === 'projects' && (
          <section className="mp-section mp-section-fade">
            <h2 className="mp-section-title">Projects</h2>
            {PROJECTS.map(p => (
              <div key={p.id} className="mp-project-card" style={{ '--pc': p.accentColor }}>
                <div className="mp-project-emoji">{p.e}</div>
                <h3 className="mp-project-title">{p.title}</h3>
                <p className="mp-project-highlight">{p.highlight}</p>
                <p className="mp-project-desc">{p.d}</p>
                <div className="mp-project-tags">
                  {p.tags.map(t => (
                    <span key={t} className="mp-project-tag">{t}</span>
                  ))}
                </div>
                <div className="mp-project-links">
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="mp-project-link">
                    <I.GH /> Source
                  </a>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="mp-project-link">
                      <I.Ext /> Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* CONTACT */}
        {activeSection === 'contact' && (
          <section className="mp-section mp-section-fade">
            <h2 className="mp-section-title">Get in Touch</h2>
            <p className="mp-contact-intro">I'm actively seeking opportunities in Software Engineering and Cybersecurity. Let's connect!</p>
            <div className="mp-contact-cards">
              <a href="mailto:sarwansai483@gmail.com" className="mp-contact-card">
                <I.Mail />
                <div>
                  <div className="mp-contact-card-label">Email</div>
                  <div className="mp-contact-card-value">sarwansai483@gmail.com</div>
                </div>
              </a>
              <a href="https://linkedin.com/in/sarwansai" target="_blank" rel="noopener noreferrer" className="mp-contact-card">
                <I.LI />
                <div>
                  <div className="mp-contact-card-label">LinkedIn</div>
                  <div className="mp-contact-card-value">linkedin.com/in/sarwansai</div>
                </div>
              </a>
              <a href="https://github.com/sarwansai8" target="_blank" rel="noopener noreferrer" className="mp-contact-card">
                <I.GH />
                <div>
                  <div className="mp-contact-card-label">GitHub</div>
                  <div className="mp-contact-card-value">github.com/sarwansai8</div>
                </div>
              </a>
            </div>
          </section>
        )}

      </main>

      {/* ── FOOTER ── */}
      <footer className="mp-footer">
        <p>© 2024–2026 {FULL_NAME}. Built with React & Vite.</p>
        <p className="mp-footer-hint">
          💻 View on desktop for the full OS experience
        </p>
      </footer>
    </div>
  );
}
