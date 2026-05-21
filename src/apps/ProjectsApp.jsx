import React from 'react';
import { I } from '../IconSet.jsx';
import { PROJECTS } from '../constants.js';

export default function ProjectsApp() {
  return (
    <div className="pg">
      {PROJECTS.map(p => (
        <div key={p.title} className="pc">
          <h3><span>{p.e}</span> {p.title}</h3>
          <p>{p.d}</p>
          <div className="pt">
            {p.tags.map(t => <span key={t}>{t}</span>)}
          </div>
          <div className="pl">
            <a href={p.link} target="_blank" rel="noopener noreferrer">
              <I.GH /> Code
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
