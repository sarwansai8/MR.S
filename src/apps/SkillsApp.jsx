import React, { useState, useEffect } from 'react';
import { SBR, SP } from '../constants.js';

export default function SkillsApp() {
  const [v, sV] = useState(false);
  
  useEffect(() => {
    const t = setTimeout(() => sV(true), 100);
    return () => clearTimeout(t);
  }, []);
  
  return (
    <div>
      <div className="sk-s">
        <h3>Proficiency</h3>
        <div className="sk-bars">
          {SBR.map((s, i) => (
            <div key={s.n} className="sb">
              <span className="sb-n">{s.n}</span>
              <div className="sb-tr">
                <div 
                  className="sb-fl" 
                  style={{ width: v ? `${s.p}%` : '0%', transitionDelay: `${i * 90}ms` }}
                />
              </div>
              <span className="sb-p">{s.p}%</span>
            </div>
          ))}
        </div>
      </div>
      {SP.map(s => (
        <div key={s.c} className="sk-s">
          <h3>{s.c}</h3>
          <div className="sk-pills">
            {s.i.map(x => <span key={x} className="sk-pill">{x}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}
