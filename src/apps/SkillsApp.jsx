import React, { useState, useEffect } from 'react';
import { SBR, SKILL_RATINGS } from '../constants.js';

function CircularProgress({ percent, label, desc, color = '#3b82f6', index = 0 }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius; // ~238.76
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset = circumference - (percent / 100) * circumference;
    const t = setTimeout(() => {
      setOffset(progressOffset);
    }, 100 + index * 120);
    return () => clearTimeout(t);
  }, [percent, circumference, index]);

  return (
    <div className="gauge-card animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="gauge-svg-wrap">
        <svg viewBox="0 0 100 100" className="gauge-svg">
          {/* Background circle */}
          <circle 
            cx="50" cy="50" r={radius} 
            className="gauge-bg"
          />
          {/* Foreground progress circle */}
          <circle 
            cx="50" cy="50" r={radius} 
            className="gauge-fg"
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
          />
          <text 
            x="50" y="55" 
            textAnchor="middle" 
            className="gauge-text"
          >
            {percent}%
          </text>
        </svg>
      </div>
      <div className="gauge-info">
        <h4>{label}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default function SkillsApp() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [animatePills, setAnimatePills] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimatePills(true), 150);
    return () => clearTimeout(t);
  }, []);

  const categories = ['all', 'Frontend', 'Backend & Databases', 'Languages & Cloud', 'Tools & Security Concepts'];
  
  const filteredSkills = activeCategory === 'all' 
    ? SKILL_RATINGS 
    : SKILL_RATINGS.filter(s => s.cat === activeCategory);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Languages & Cloud': return '💻';
      case 'Frontend': return '🎨';
      case 'Backend & Databases': return '⚙️';
      case 'Tools & Security Concepts': return '🔒';
      default: return '🛠️';
    }
  };

  const getLevelLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Proficient';
    return 'Intermediate';
  };

  return (
    <div className="skills-app-container">
      {/* Top Section: Glowing SVG Progress Gauges */}
      <div className="skills-section">
        <h3 className="section-title">🛡️ Core Proficiencies</h3>
        <div className="gauges-grid">
          {SBR.map((s, i) => {
            const colors = ['#3b82f6', '#10b981', '#a855f7']; // blue, emerald, purple
            return (
              <CircularProgress 
                key={s.n} 
                percent={s.p} 
                label={s.n} 
                desc={s.desc} 
                color={colors[i % colors.length]} 
                index={i}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Specific Skills Control Board */}
      <div className="skills-section">
        <div className="skills-header-row">
          <h3 className="section-title">💻 Technical Inventory</h3>
          
          {/* Category Filter Tabs */}
          <div className="skills-tab-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`skills-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'all' ? '🔍 All' : `${getCategoryIcon(cat)} ${cat}`}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Skills Grid */}
        <div className="skills-grid-detailed">
          {filteredSkills.map((s, idx) => {
            const skillLevel = getLevelLabel(s.level);
            return (
              <div 
                key={s.name} 
                className={`skill-pill-detailed ${animatePills ? 'pill-in' : ''}`}
                style={{ 
                  animationDelay: `${idx * 25}ms`,
                  '--skill-level-width': `${s.level}%` 
                }}
              >
                <div className="pill-top">
                  <span className="pill-cat-icon" title={s.cat}>{getCategoryIcon(s.cat)}</span>
                  <span className="pill-name">{s.name}</span>
                  <span className="pill-badge-level">{skillLevel}</span>
                </div>
                <div className="pill-bar-wrap">
                  <div className="pill-bar-track">
                    <div className="pill-bar-fill" style={{ width: animatePills ? `${s.level}%` : '0%' }}></div>
                  </div>
                  <span className="pill-percent">{s.level}%</span>
                </div>

                {/* Cyberpunk style tooltip */}
                <div className="pill-tooltip">
                  <div className="tooltip-header">{s.name}</div>
                  <div className="tooltip-row"><span>Category:</span> <strong>{s.cat}</strong></div>
                  <div className="tooltip-row"><span>Proficiency:</span> <strong>{s.level}%</strong></div>
                  <div className="tooltip-row"><span>Status:</span> <strong className="glow-green">Verified</strong></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
