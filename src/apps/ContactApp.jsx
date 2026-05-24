import React, { useState } from 'react';
import { useN } from '../components/NotificationContext.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactApp() {
  const [f, sF] = useState({ name: '', email: '', msg: '', _honey: '' });
  const [err, sE] = useState({});
  const [st, sS] = useState('idle');
  const { push } = useN() || {};
  
  const onSub = e => {
    e.preventDefault();
    
    // Honeypot bot-trap trigger
    if (f._honey) {
      sS('ok');
      sF({ name: '', email: '', msg: '', _honey: '' });
      if (push) push('System', 'Message sent successfully!');
      setTimeout(() => sS('idle'), 4000);
      return;
    }

    const c = {};
    if (!f.name) c.name = 'Required';
    if (!f.email) c.email = 'Required';
    else if (!EMAIL_RE.test(f.email)) c.email = 'Invalid email';
    if (!f.msg) c.msg = 'Required';
    
    sE(c);
    
    if (Object.keys(c).length === 0) {
      sS('loading');
      
      // Obfuscated email reconstruction to block basic static scrapers and harvesters.
      // Pro-tip: Swap this with a FormSubmit unique token for 100% OPSEC!
      const targetUser = 'sarwansai483';
      const targetDomain = 'gmail.com';
      const endpoint = `https://formsubmit.co/ajax/${targetUser}@${targetDomain}`;

      fetch(endpoint, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          message: f.msg,
          _replyto: f.email,
          _subject: `Portfolio Contact: ${f.name}`,
          _captcha: false,
          _template: 'table',
          _honey: f._honey
        })
      })
      .then(res => {
        if (res.ok) {
          sS('ok');
          sF({ name: '', email: '', msg: '' });
          if (push) push('System', 'Message sent successfully!');
          setTimeout(() => sS('idle'), 4000);
        } else {
          throw new Error('Server returned an error');
        }
      })
      .catch(error => {
        sS('error');
        sE({ submit: 'Failed to send message. Please email directly or try again.' });
        if (push) push('System', 'Error transmitting message.');
      });
    }
  };
  
  return (
    <div className="cf" style={{ padding: '0 1rem' }}>
      <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-d)', lineHeight: '1.6' }}>
        <p><strong>Available for project discussions.</strong> Open to cybersecurity projects, learning opportunities, and collaboration.</p>
        <p style={{ marginTop: '0.5rem' }}>
          📞 +91 9030118006 (9am - 7pm IST)<br/>
          ✉️ <a href={`mailto:${'sarwansai483' + '@' + 'gmail.com'}`} style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>
            {'sarwansai483' + '@' + 'gmail.com'}
          </a>
        </p>
      </div>
      <form onSubmit={onSub} className="cf" style={{ marginTop: '0.5rem' }}>
        {/* Anti-spam honeypot field (hidden from users, targeted by bots) */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="sys_honey_contact">Leave this field blank</label>
          <input 
            id="sys_honey_contact"
            type="text" 
            name="_honey" 
            value={f._honey} 
            onChange={e => sF(p => ({ ...p, _honey: e.target.value }))} 
            tabIndex={-1} 
            autoComplete="off" 
          />
        </div>
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
        {st === 'error' && <div className="ffb fail">{err.submit || 'Failed to transmit message.'}</div>}
      </form>
    </div>
  );
}
