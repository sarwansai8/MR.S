import React, { useState } from 'react';
import { I } from '../IconSet.jsx';

export default function BrowserApp() {
  const [url, setUrl] = useState('https://en.wikipedia.org/wiki/Stranger_Things');
  const [inputUrl, setInputUrl] = useState('https://en.wikipedia.org/wiki/Stranger_Things');
  const [loading, setLoading] = useState(true);
  const [useProxy, setUseProxy] = useState(false);

  const go = (e) => {
    e.preventDefault();
    let u = inputUrl.trim();
    if (!/^https?:\/\//i.test(u)) {
      u = 'https://' + u;
    }
    setUrl(u);
    setInputUrl(u);
    setLoading(true);
    setTimeout(() => setLoading(false), 4000);
  };

  const finalUrl = useProxy ? `https://corsproxy.io/?${encodeURIComponent(url)}` : url;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <form onSubmit={go} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', background: 'var(--bg-titlebar)', borderBottom: '1px solid var(--border)', gap: '0.5rem' }}>
        <button type="button" className="fbtn" style={{ padding: '4px 8px', width: 'auto' }} onClick={() => setUrl(url)}><I.Refresh /></button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--border)', padding: '0 8px' }}>
          <I.Lock style={{ width: '12px', height: '12px', color: 'var(--text-dim)', marginRight: '6px' }} />
          <input 
            type="text" 
            value={inputUrl} 
            onChange={e => setInputUrl(e.target.value)} 
            style={{ flex: 1, border: 'none', background: 'transparent', color: 'var(--text)', padding: '6px 0', outline: 'none', fontSize: '0.8rem' }}
          />
        </div>
        <button type="submit" className="fbtn" style={{ padding: '4px 12px', width: 'auto' }}>Go</button>
      </form>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 12px', background: '#f8d7da', color: '#721c24', fontSize: '0.7rem' }}>
        <span>⚠️ If a site is blank (X-Frame-Options blocked), try using the Proxy mode.</span>
        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          <input type="checkbox" checked={useProxy} onChange={e => { setUseProxy(e.target.checked); setLoading(true); setTimeout(() => setLoading(false), 4000); }} />
          Bypass Security Proxy
        </label>
      </div>
      <div style={{ flex: 1, position: 'relative', background: '#fff' }}>
        {loading && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.8)' }}><div className="spin" style={{ width: 24, height: 24, border: '3px solid #ccc', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>}
        <iframe 
          src={finalUrl} 
          title="Browser"
          style={{ width: '100%', height: '100%', border: 'none' }}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
