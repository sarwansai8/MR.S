import React from 'react';
import { useTheme } from '../components/ThemeContext.jsx';
import { I } from '../IconSet.jsx';

export default function SettingsApp() {
  const { 
    themeMode, setThemeMode, 
    accent, setAccent, 
    bgType, setBgType, 
    blurIntensity, setBlurIntensity 
  } = useTheme();

  return (
    <div className="cf" style={{ padding: '0 1rem' }}>
      <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--brd)', paddingBottom: '0.5rem' }}>
        System Preferences
      </h3>

      <div className="fg">
        <label>Theme Mode</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['dark', 'light', 'hacker', 'neon'].map(m => (
            <button 
              key={m} 
              onClick={() => setThemeMode(m)}
              className="fbtn" 
              style={{ 
                flex: 1, 
                background: themeMode === m ? 'var(--accent-blue)' : 'var(--bg-panel)',
                color: themeMode === m ? '#fff' : 'var(--text)'
              }}
            >
              {m === 'neon' ? 'Neon' : m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="fg">
        <label>Accent Color</label>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          {['blue', 'green', 'red', 'yellow', 'purple'].map(c => (
            <div 
              key={c}
              onClick={() => setAccent(c)}
              style={{
                width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
                background: `var(--accent-${c})`,
                border: accent === c ? '2px solid var(--text)' : '2px solid transparent',
                boxShadow: accent === c ? `0 0 10px var(--accent-${c})` : 'none'
              }}
            />
          ))}
        </div>
      </div>

      <div className="fg">
        <label>Desktop Background</label>
        <select 
          value={bgType} 
          onChange={e => setBgType(e.target.value)}
          className="tf"
          style={{ padding: '0.5rem', width: '100%', background: 'var(--bg-input)', color: 'var(--text)', border: '1px solid var(--brd)', borderRadius: '4px' }}
        >
          <option value="wireframe">3D Wireframe Terrain</option>
          <option value="matrix">Matrix Rain</option>
          <option value="solid">Solid Color</option>
        </select>
      </div>

      <div className="fg">
        <label>Glassmorphism Blur: {blurIntensity}px</label>
        <input 
          type="range" 
          min="0" max="64" step="4"
          value={blurIntensity}
          onChange={e => setBlurIntensity(Number(e.target.value))}
          style={{ width: '100%', marginTop: '0.5rem' }}
        />
      </div>
    </div>
  );
}
