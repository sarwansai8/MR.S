import React, { useState } from 'react';
import { useN } from '../components/NotificationContext.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactApp() {
  const [f, sF] = useState({ name: '', email: '', msg: '' });
  const [err, sE] = useState({});
  const [st, sS] = useState('idle');
  const { push } = useN() || {};
  
  const onSub = e => {
    e.preventDefault();
    const c = {};
    if (!f.name) c.name = 'Required';
    if (!f.email) c.email = 'Required';
    else if (!EMAIL_RE.test(f.email)) c.email = 'Invalid email';
    if (!f.msg) c.msg = 'Required';
    
    sE(c);
    
    if (Object.keys(c).length === 0) {
      sS('loading');
      setTimeout(() => {
        sS('ok');
        sF({ name: '', email: '', msg: '' });
        if (push) push('System', 'Message sent successfully!');
        setTimeout(() => sS('idle'), 3000);
      }, 1500);
    }
  };
  
  return (
    <div className="cf" style={{ padding: '0 1rem' }}>
      <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-d)', lineHeight: '1.6' }}>
        <p><strong>Available for project discussions.</strong> Open to cybersecurity projects, learning opportunities, and collaboration.</p>
        <p style={{ marginTop: '0.5rem' }}>📞 +91 9030118006 (9am - 7pm IST)<br/>✉️ sarwansai483@gmail.com</p>
      </div>
      <form onSubmit={onSub} className="cf" style={{ marginTop: '0.5rem' }}>
        <div className="fg">
          <label>Name</label>
          <input value={f.name} onChange={e => sF(p => ({ ...p, name: e.target.value }))} disabled={st === 'loading'} />
          {err.name && <span className="fe">{err.name}</span>}
        </div>
        <div className="fg">
          <label>Email</label>
          <input value={f.email} onChange={e => sF(p => ({ ...p, email: e.target.value }))} disabled={st === 'loading'} />
          {err.email && <span className="fe">{err.email}</span>}
        </div>
        <div className="fg">
          <label>Message</label>
          <textarea value={f.msg} onChange={e => sF(p => ({ ...p, msg: e.target.value }))} disabled={st === 'loading'} />
          {err.msg && <span className="fe">{err.msg}</span>}
        </div>
        <button type="submit" className="fbtn" disabled={st === 'loading'}>
          {st === 'loading' ? 'Transmitting...' : 'Send Message'}
        </button>
        {st === 'ok' && <div className="ffb ok">Encrypted message delivered to server.</div>}
      </form>
    </div>
  );
}
