import React, { useState } from 'react';
import { I } from '../IconSet.jsx';
import { PROJECTS } from '../constants.js';

export default function ProjectsApp() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'cyber') return p.tags.some(t => t.toLowerCase().includes('cyber') || t.toLowerCase().includes('security') || t.toLowerCase().includes('nmap') || t.toLowerCase().includes('wireshark'));
    if (filter === 'dev') return p.tags.some(t => t.toLowerCase().includes('react') || t.toLowerCase().includes('next.js') || t.toLowerCase().includes('node') || t.toLowerCase().includes('java') || t.toLowerCase().includes('mongodb'));
    return true;
  });

  return (
    <div className="projects-container">
      {/* Projects Header / Category Filter */}
      <div className="projects-filter-bar">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          📂 All Projects ({PROJECTS.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'cyber' ? 'active' : ''}`}
          onClick={() => setFilter('cyber')}
        >
          🛡️ Cybersecurity Tools
        </button>
        <button 
          className={`filter-btn ${filter === 'dev' ? 'active' : ''}`}
          onClick={() => setFilter('dev')}
        >
          💻 Full-Stack Development
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="pg pg-polished">
        {filteredProjects.map((p, i) => (
          <div 
            key={p.id || p.title} 
            className="pc pc-polished animate-slide-up"
            style={{ 
              animationDelay: `${i * 60}ms`,
              '--card-accent': p.accentColor || 'var(--accent-blue)'
            }}
          >
            {/* Top Accent Band */}
            <div className="pc-accent-bar" style={{ backgroundColor: p.accentColor || 'var(--accent-blue)' }}></div>
            
            <div className="pc-header">
              <span className="pc-emoji">{p.e}</span>
              <span className={`pc-status ${p.status === 'Active' ? 'status-active' : 'status-completed'}`}>
                {p.status === 'Active' ? '● Active' : '✓ Completed'}
              </span>
            </div>

            <div className="pc-body">
              <h3>{p.title}</h3>
              {p.highlight && (
                <div className="pc-highlight-badge">
                  <span className="highlight-tag">METRIC</span>
                  <span>{p.highlight}</span>
                </div>
              )}
              <p className="pc-description">{p.d}</p>
            </div>

            <div className="pc-footer">
              <div className="pt pt-polished">
                {p.tags.slice(0, 4).map(t => <span key={t} className="tag-badge">{t}</span>)}
              </div>
              
              <div className="pl pl-polished">
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link code-link" title="View Source Code">
                  <I.GH /> Source
                </a>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="project-link demo-link" title="Open Live Demo">
                    <I.Ext /> Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
