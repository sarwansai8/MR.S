import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense, createContext, useContext } from 'react';

const BRAND = 'MR. S';
const OS_ID = 'mrs-os';
const FULL_NAME = 'Maddipati Sarwansai';
const ROLE = 'Cybersecurity Student & Aspiring Professional';
const BIO = `I am a final-year cybersecurity student focused on ethical hacking, digital security, and secure solution building. I have a strong interest in penetration testing, malware analysis, IoT security, and AI-driven cybersecurity, alongside full-stack development experience.`;
const INITIALS = 'MS';

/* ═══════════════ ICONS ═══════════════ */
const I = {
  User:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg>,
  Folder:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  FolderF:()=><svg viewBox="0 0 24 24" fill="#fbbf24"><path d="M2 5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5z"/></svg>,
  Code:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Mail:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Term:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  Gear:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  GH:()=><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
  LI:()=><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  X:()=><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  Wifi:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>,
  Bat:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="10" x2="23" y2="14"/><rect x="3" y="8" width="12" height="8" rx="1" fill="currentColor" opacity="0.25"/></svg>,
      <div className="about-socials"><a href="https://github.com/sarwansai8" target="_blank" rel="noopener noreferrer" className="soc" aria-label="GitHub"><I.GH /></a><a href="https://linkedin.com/in/maddipati-sarwansai" target="_blank" rel="noopener noreferrer" className="soc" aria-label="LinkedIn"><I.LI /></a><a href="mailto:sarwansai483@gmail.com" className="soc" aria-label="Mail"><I.Mail /></a></div>
  Grid:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  Ext:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Resume:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Refresh:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  Info:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  Power:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>,
  BT:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"/></svg>,
  Moon:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Search:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play:()=><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Pause:()=><svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  SkipF:()=><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2"/></svg>,
  SkipB:()=><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2"/></svg>,
  Arrow:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Bell:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Lock:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Restart:()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>,
};

/* ═══════════════ NOTIFICATIONS ═══════════════ */
const NCtx = createContext(null);
function NProvider({ children }) {
  const [list, setList] = useState([]);
  const [history, setHistory] = useState([]);
  const id = useRef(0);
  const push = useCallback((t, m) => {
    const nid = ++id.current;
    const ts = new Date();
    setList(p => [...p, { id: nid, t, m, out: false }]);
    setHistory(p => [{ id: nid, t, m, ts }, ...p].slice(0, 30));
    setTimeout(() => { setList(p => p.map(n => n.id === nid ? { ...n, out: true } : n)); setTimeout(() => setList(p => p.filter(n => n.id !== nid)), 200); }, 4000);
  }, []);
  const dismiss = useCallback(nid => { setList(p => p.map(n => n.id === nid ? { ...n, out: true } : n)); setTimeout(() => setList(p => p.filter(n => n.id !== nid)), 200); }, []);
  const clearHistory = useCallback(() => setHistory([]), []);
  return (
    <NCtx.Provider value={{ push, history, clearHistory }}>{children}
      <div className="nw">{list.map(n => (
        <div key={n.id} className={`nn ${n.out ? 'out' : ''}`} onClick={() => dismiss(n.id)}>
          <div className="nn-b"><div className="nn-t">{n.t}</div><div className="nn-m">{n.m}</div></div>
        </div>
      ))}</div>
    </NCtx.Provider>
  );
}
function useN() { return useContext(NCtx); }

function useClock() { const [n, sN] = useState(new Date()); useEffect(() => { const t = setInterval(() => sN(new Date()), 1000); return () => clearInterval(t); }, []); return n; }

/* ═══════════════ BIOS POST ═══════════════ */
const BIOS_LINES = [
  { text: `${BRAND}OS BIOS v2.4.1 — Advanced Configuration Utility`, cls: 'highlight' },
  { text: 'Copyright (c) 2024-2026, ZAP Technologies Inc.' },
  { text: '' },
  { text: 'Initializing System...', cls: 'highlight' },
  { text: 'CPU: React v19.0.0 Quantum @ 4.2GHz .............. [ OK ]', cls: 'ok' },
  { text: 'Memory Test: 32768 MB DDR5 ........................ [ OK ]', cls: 'ok' },
  { text: 'GPU: WebGL 2.0 / Canvas Renderer .................. [ OK ]', cls: 'ok' },
  { text: '' },
  { text: 'Detecting Storage Devices...' },
  { text: '  /dev/sda1  NVMe SSD  512GB  [Portfolio OS]' },
  { text: '  /dev/sdb1  SSD       1TB    [Projects Archive]' },
  { text: '' },
  { text: 'Network: Ethernet Connected [192.168.1.42]', cls: 'ok' },
  { text: 'Firewall: Active ................................ [ OK ]', cls: 'ok' },
  { text: '' },
  { text: 'Loading bootloader...', cls: 'warn' },
  { text: `Starting ${BRAND}OS...`, cls: 'highlight' },
];

function BiosScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i < BIOS_LINES.length) { setLines(p => [...p, BIOS_LINES[i]]); i++; setTimeout(tick, 60 + Math.random() * 80); }
      else setTimeout(onDone, 400);
    };
    setTimeout(tick, 300);
  }, [onDone]);
  return (
    <div className="bios">
      {lines.map((l, i) => <div key={i} className={`bios-line ${l.cls || ''}`} style={{ animationDelay: `${i * 0.02}s` }}>{l.text}</div>)}
    </div>
  );
}

/* ═══════════════ BOOT ═══════════════ */
function BootScreen({ onDone }) {
  const [pct, sPct] = useState(0); const [txt, sTxt] = useState('System Initializing'); const [f, sF] = useState(false);
  useEffect(() => {
    const msgs = [[15,'Loading kernel modules'],[32,'Mounting filesystems'],[50,'Starting network services'],[68,'Loading desktop environment'],[82,'Initializing GPU renderer'],[95,'Applying user config'],[100,'System Ready']];
    let i = 0;
    const tick = () => { if (i < msgs.length) { sPct(msgs[i][0]); sTxt(msgs[i][1]); i++; setTimeout(tick, 220 + Math.random() * 150); } else setTimeout(() => { sF(true); setTimeout(onDone, 700); }, 250); };
    setTimeout(tick, 400);
  }, [onDone]);
  return <div className={`boot ${f ? 'fading' : ''}`}><div className="boot-logo">{BRAND}</div><div className="boot-bar"><div className="boot-track"><div className="boot-fill" style={{ width: `${pct}%` }} /></div><div className="boot-text">{txt}: {pct}%</div></div></div>;
}

/* ═══════════════ LOGIN ═══════════════ */
function LoginScreen({ onDone }) {
  const [pw, sPw] = useState(''); const [f, sF] = useState(false); const now = useClock(); const ref = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);

  // Animated background particles
  useEffect(() => {
    const c = canvasRef.current; if (!c) return; const ctx = c.getContext('2d'); let anim;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; }; resize(); window.addEventListener('resize', resize);
    const pts = Array.from({ length: 50 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + 0.5, sp: Math.random() * 0.0002 + 0.0001 }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#050508'; ctx.fillRect(0, 0, c.width, c.height);
      for (const p of pts) {
        p.y -= p.sp * 2; if (p.y < -0.01) { p.y = 1.01; p.x = Math.random(); }
        const a = 0.15 + Math.sin(Date.now() * 0.001 + p.r * 5) * 0.1;
        const grd = ctx.createRadialGradient(p.x * c.width, p.y * c.height, 0, p.x * c.width, p.y * c.height, p.r * 6);
        grd.addColorStop(0, `rgba(255,255,255,${a})`); grd.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(p.x * c.width, p.y * c.height, p.r * 6, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
      }
      anim = requestAnimationFrame(draw);
    }; draw();
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', resize); };
  }, []);

  const submit = (e) => { e?.preventDefault(); sF(true); setTimeout(onDone, 500); };
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  return (
    <div className={`login ${f ? 'fading' : ''}`}>
      <canvas ref={canvasRef} />
      <div className="login-content">
        <div className="login-time">{timeStr}</div>
        <div className="login-date">{dateStr}</div>
        <div className="login-avatar">{INITIALS}</div>
        <div className="login-name">{FULL_NAME}</div>
        <form onSubmit={submit}>
          <div className="login-pw">
            <input ref={ref} type="password" value={pw} onChange={e => sPw(e.target.value)} placeholder="Password" autoFocus />
            <button type="submit" aria-label="Unlock"><I.Arrow /></button>
          </div>
        </form>
        <div className="login-hint">Press Enter to unlock</div>
      </div>
    </div>
  );
}

/* ═══════════════ WIREFRAME TERRAIN ═══════════════ */
function WireframeTerrain() {
  const ref = useRef(null); const mouse = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext('2d'); let anim;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; }; resize(); window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mouse.current = { x: e.clientX, y: e.clientY }; });
    const COLS = 90, ROWS = 55, SP = 26, AMP = 60;
    const STARS = Array.from({ length: 50 }, () => ({ x: Math.random(), y: Math.random() * 0.45, r: Math.random() * 1.8 + 0.4, vx: 0, vy: 0, bo: Math.random() * 0.25 + 0.08 }));
    // Shooting stars
    const SHOOTS = []; let lastShoot = 0;
    let time = 0;
    const draw = () => {
      const W = c.width, H = c.height; ctx.clearRect(0, 0, W, H);
      const horizon = H * 0.4, fov = W * 0.65;
      const mx = mouse.current.x, my = mouse.current.y; time += 0.005;

      // Stars with mouse repulsion
      for (const s of STARS) {
        const sx = s.x * W, sy = s.y * H;
        const dx = sx - mx, dy = sy - my, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) { const f = (180 - dist) / 180 * 0.25; s.vx += (dx / dist) * f; s.vy += (dy / dist) * f; }
        s.vx *= 0.95; s.vy *= 0.95; s.x += s.vx / W; s.y += s.vy / H;
        if (s.x < -0.01) s.x = 1.01; if (s.x > 1.01) s.x = -0.01;
        if (s.y < -0.01) s.y = 0.45; if (s.y > 0.5) s.y = 0;
        const tw = Math.sin(time * 2.5 + s.r * 8) * 0.12 + s.bo;
        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 5);
        grd.addColorStop(0, `rgba(255,255,255,${tw * 1.5})`); grd.addColorStop(0.3, `rgba(200,210,255,${tw})`); grd.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(sx, sy, s.r * 5, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
      }

      // Shooting stars
      const now2 = Date.now();
      if (now2 - lastShoot > 3000 + Math.random() * 5000) { lastShoot = now2; SHOOTS.push({ x: Math.random() * W * 0.6 + W * 0.2, y: Math.random() * H * 0.3, vx: 4 + Math.random() * 3, vy: 2 + Math.random() * 2, life: 1 }); }
      for (let i = SHOOTS.length - 1; i >= 0; i--) {
        const sh = SHOOTS[i]; sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.02;
        if (sh.life <= 0) { SHOOTS.splice(i, 1); continue; }
        ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(sh.x - sh.vx * 8, sh.y - sh.vy * 8);
        const lg = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 8, sh.y - sh.vy * 8);
        lg.addColorStop(0, `rgba(255,255,255,${sh.life * 0.8})`); lg.addColorStop(1, 'transparent');
        ctx.strokeStyle = lg; ctx.lineWidth = 1.5; ctx.stroke();
      }

      // Terrain with color gradient
      const pts = [];
      for (let r = 0; r < ROWS; r++) {
        pts[r] = [];
        const z = r * SP + 10, persp = fov / (fov + z);
        for (let col = 0; col < COLS; col++) {
          const x = (col - COLS / 2) * SP, nx = col / COLS, nz = r / ROWS;
          let y = Math.sin(nx * 8 + time * 1.3) * AMP * 0.6;
          y += Math.cos(nz * 6 - time * 0.9) * AMP * 0.45;
          y += Math.sin((nx + nz) * 5 + time * 1.1) * AMP * 0.3;
          y += Math.sin(nx * 18 + time * 2.5) * AMP * 0.08;
          pts[r][col] = { sx: W / 2 + x * persp, sy: horizon + (y - z * 0.15) * persp, y };
        }
      }
      for (let r = 0; r < ROWS; r++) {
        const fadeR = Math.max(0, 1 - r / ROWS);
        const baseAlpha = fadeR * 0.4;
        // Horizontal lines with color
        ctx.beginPath();
        for (let c2 = 0; c2 < COLS; c2++) { const p = pts[r][c2]; c2 === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy); }
        const hue = 220 + Math.sin(time * 0.5 + r * 0.1) * 20;
        ctx.strokeStyle = `hsla(${hue},15%,70%,${baseAlpha})`; ctx.lineWidth = 0.6; ctx.stroke();
        // Vertical depth lines
        if (r > 0) {
          for (let c2 = 0; c2 < COLS; c2 += 2) {
            const p0 = pts[r - 1][c2], p1 = pts[r][c2];
            // Brighter at peaks
            const peakGlow = Math.max(0, -pts[r][c2].y / AMP) * 0.15;
            ctx.beginPath(); ctx.moveTo(p0.sx, p0.sy); ctx.lineTo(p1.sx, p1.sy);
            ctx.strokeStyle = `hsla(${hue},20%,75%,${fadeR * 0.2 + peakGlow})`; ctx.lineWidth = 0.4; ctx.stroke();
          }
        }
      }
      anim = requestAnimationFrame(draw);
    }; draw();
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} />;
}

/* ═══════════════ MATRIX RAIN ═══════════════ */
function MatrixRain({ onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext('2d'); c.width = window.innerWidth; c.height = window.innerHeight;
    const cols = Math.floor(c.width / 15), drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF';
    let anim;
    const draw = () => { ctx.fillStyle = 'rgba(0,0,0,0.05)'; ctx.fillRect(0, 0, c.width, c.height); ctx.font = '13px monospace';
      for (let i = 0; i < drops.length; i++) { const ch = chars[Math.floor(Math.random() * chars.length)]; ctx.fillStyle = Math.random() > 0.97 ? '#fff' : '#0f0'; ctx.fillText(ch, i * 15, drops[i] * 15); if (drops[i] * 15 > c.height && Math.random() > 0.975) drops[i] = 0; drops[i]++; }
      anim = requestAnimationFrame(draw);
    }; draw();
    const t = setTimeout(() => { cancelAnimationFrame(anim); onDone(); }, 5000);
    return () => { cancelAnimationFrame(anim); clearTimeout(t); };
  }, [onDone]);
  return <div className="matrix"><canvas ref={ref} /></div>;
}

/* ═══════════════ WIDGETS ═══════════════ */
function ClockWidget({ now }) {
  const s = now.getSeconds(), m = now.getMinutes(), h = now.getHours() % 12;
  return (
    <div className="wg"><div className="wg-t">Clock</div>
      <div className="clk-w">
        <div className="clk-face">
          {[...Array(12)].map((_, i) => { const a = i * 30; return <div key={i} className={`clk-tick ${i % 3 === 0 ? 'major' : ''}`} style={{ transform: `rotate(${a}deg)` }} />; })}
          <div className="clk-hand h" style={{ transform: `rotate(${h * 30 + m * 0.5}deg)` }} />
          <div className="clk-hand m" style={{ transform: `rotate(${m * 6 + s * 0.1}deg)` }} />
          <div className="clk-hand s" style={{ transform: `rotate(${s * 6}deg)` }} />
          <div className="clk-dot" />
        </div>
        <div className="clk-digital">{now.toLocaleTimeString('en-US', { hour12: false })}</div>
      </div>
    </div>
  );
}
function SysMonWidget() {
  const [v, sV] = useState({ cpu: 34, ram: 62, disk: 47 });
  useEffect(() => { const t = setInterval(() => sV(p => ({ cpu: Math.min(100, Math.max(5, p.cpu + (Math.random() - 0.5) * 18)), ram: Math.min(95, Math.max(30, p.ram + (Math.random() - 0.5) * 6)), disk: p.disk })), 2200); return () => clearInterval(t); }, []);
  const items = [{ l: 'CPU', v: Math.round(v.cpu), c: v.cpu > 80 ? '#f87171' : '#4ade80' }, { l: 'RAM', v: Math.round(v.ram), c: v.ram > 80 ? '#f87171' : '#fbbf24' }, { l: 'Disk', v: Math.round(v.disk), c: '#4a9eff' }];
  return <div className="wg"><div className="wg-t">System</div>{items.map(i => <div key={i.l} className="smon-row"><span className="smon-l">{i.l}</span><div className="smon-tr"><div className="smon-fl" style={{ width:`${i.v}%`,background:i.c }} /></div><span className="smon-v">{i.v}%</span></div>)}</div>;
}
function MusicWidget() {
  const [p, sP] = useState(true); const bars = 18;
  return <div className="wg"><div className="wg-t">Now Playing</div><div className="mus-w"><div className="mus-info"><div className="mus-art">🎵</div><div className="mus-meta"><div className="mus-title">Midnight City</div><div className="mus-artist">M83</div></div></div>
    <div className="mus-viz">{p && [...Array(bars)].map((_, i) => <div key={i} className="viz-b" style={{ '--mn':`${2+Math.random()*3}px`,'--mx':`${10+Math.random()*14}px`,'--d':`${0.25+Math.random()*0.4}s`,animationDelay:`${i*0.04}s` }} />)}</div>
    <div className="mus-ctrls"><button className="mus-btn" aria-label="Prev"><I.SkipB /></button><button className="mus-btn play" onClick={()=>sP(q=>!q)} aria-label={p?'Pause':'Play'}>{p?<I.Pause />:<I.Play />}</button><button className="mus-btn" aria-label="Next"><I.SkipF /></button></div>
  </div></div>;
}

/* ═══════════════ CONTENT ═══════════════ */
function AboutContent() { return <div className="about"><div className="about-av"><div className="about-av-inner">{INITIALS}</div></div><h1>{FULL_NAME}</h1><h2 className="about-role">{ROLE}</h2><p className="about-bio">{BIO}</p><div className="about-stats"><div className="about-stat"><span className="about-sv">3+</span><span className="about-sl">Certs</span></div><div className="about-stat"><span className="about-sv">4</span><span className="about-sl">Projects</span></div><div className="about-stat"><span className="about-sv">4</span><span className="about-sl">Years Edu</span></div></div><div className="about-socials"><a href="https://github.com/sarwansai8" target="_blank" rel="noopener noreferrer" className="soc" aria-label="GitHub"><I.GH /></a><a href="https://linkedin.com/in/maddipati-sarwansai" target="_blank" rel="noopener noreferrer" className="soc" aria-label="LinkedIn"><I.LI /></a><a href="mailto:sarwansai483@gmail.com" className="soc" aria-label="Mail"><I.Mail /></a></div></div>; }

const PROJECTS = [
  { id: 'p1', title: 'Courses Platform', d: 'MERN application with Firebase Auth, role-based access, MongoDB Idea Board, React Router, Redux, and Framer Motion.', e: '🌐', tags: ['React', 'Node.js', 'MongoDB', 'Firebase'], link: 'https://github.com/sarwansai8' },
  { id: 'p2', title: 'ForensicaX', d: 'Ethical mobile forensics tool with Android data capture, AES encryption, and Python-based decryption and analysis.', e: '🔍', tags: ['Python', 'Android', 'Cryptography'], link: 'https://github.com/sarwansai8' },
  { id: 'p3', title: 'IoT Security IDS', d: 'IDS for smart devices detecting DoS, spoofing, and brute-force attacks using Python and Wireshark.', e: '🛡️', tags: ['Python', 'Wireshark', 'IoT Security'], link: 'https://github.com/sarwansai8' },
  { id: 'p4', title: 'Library Management', d: 'Java and MySQL database project for cataloging, member management, and borrowing workflows.', e: '📚', tags: ['Java', 'MySQL', 'Backend'], link: 'https://github.com/sarwansai8' }
];
function ProjectsContent() { return <div className="pg">{PROJECTS.map(p=><div key={p.title} className="pc"><h3><span>{p.e}</span> {p.title}</h3><p>{p.d}</p><div className="pt">{p.tags.map(t=><span key={t}>{t}</span>)}</div><div className="pl"><a href={p.link} target="_blank" rel="noopener noreferrer"><I.GH /> Code</a></div></div>)}</div>; }

const SBR = [{n:'Penetration Testing',p:90},{n:'Network Security',p:85},{n:'Python / Java',p:85},{n:'Full-Stack Dev',p:80}];
const SP = [
  { c: 'Cybersecurity Tools', i: ['Kali Linux', 'Metasploit', 'Nmap', 'Burp Suite', 'Wireshark', 'Volatility', 'Ghidra'] },
  { c: 'Development', i: ['Python', 'Java', 'React', 'Node.js', 'MongoDB', 'MySQL'] },
  { c: 'Cloud & AI', i: ['AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'Scikit-learn'] },
  { c: 'Certifications', i: ['Certified Ethical Hacker (CEH)', 'Salesforce AI Associate', 'Microsoft Career Essentials'] }
];
function SkillsContent(){const[v,sV]=useState(false);useEffect(()=>{const t=setTimeout(()=>sV(true),100);return()=>clearTimeout(t)},[]);return<div><div className="sk-s"><h3>Proficiency</h3><div className="sk-bars">{SBR.map((s,i)=><div key={s.n} className="sb"><span className="sb-n">{s.n}</span><div className="sb-tr"><div className="sb-fl" style={{width:v?`${s.p}%`:'0%',transitionDelay:`${i*90}ms`}}/></div><span className="sb-p">{s.p}%</span></div>)}</div></div>{SP.map(s=><div key={s.c} className="sk-s"><h3>{s.c}</h3><div className="sk-pills">{s.i.map(x=><span key={x} className="sk-pill">{x}</span>)}</div></div>)}</div>;}

const ASCII=` ███████╗ █████╗ ██████╗\n ╚══███╔╝██╔══██╗██╔══██╗\n   ███╔╝ ███████║██████╔╝\n  ███╔╝  ██╔══██║██╔═══╝\n ███████╗██║  ██║██║\n ╚══════╝╚═╝  ╚═╝╚═╝`;
const CMDS={help:()=>[{t:' help · whoami · ls · date · clear · skills · projects · contact · neofetch · echo · history · uname · sudo · open',c:'inf'}],whoami:()=>[{t:FULL_NAME.toLowerCase().replace(/ /g,'-'),c:'ok'},{t:ROLE,c:'out'}],ls:()=>[{t:'drwxr-xr-x  about/\ndrwxr-xr-x  projects/\ndrwxr-xr-x  skills/\n-rw-r--r--  resume.pdf   42K\n-rw-r--r--  README.md    2.1K',c:'out'}],date:()=>[{t:new Date().toString(),c:'out'}],skills:()=>SP.map(s=>({t:`  ${s.c}: ${s.i.join(' · ')}`,c:'out'})),projects:()=>PROJECTS.map(p=>({t:`  ${p.e} ${p.title}`,c:'out'})),contact:()=>[{t:'  Phone: +91 9030118006\n  Email: sarwansai483@gmail.com\n  GitHub: github.com/sarwansai8\n  LinkedIn: linkedin.com/in/maddipati-sarwansai',c:'out'}],uname:()=>[{t:`${BRAND} OS 2.0.0 x86_64 React/19.x Vite/8.x`,c:'out'}],sudo:()=>[{t:'Nice try 😏',c:'err'}],neofetch:()=>[{t:`  ╭──────────╮   ${FULL_NAME.toLowerCase().replace(/ /g,'-')}@${OS_ID}\n  │  ▄▀▀▀▄  │   OS: ${BRAND} OS 2.0\n  │ █ ◉ ◉ █ │   Host: React 19.x\n  │  ▀▄▄▄▀  │   Shell: terminal.jsx\n  ╰──────────╯   Theme: Monochrome Dark\n                  Uptime: ∞`,c:'asc'}]};

function TerminalContent({ openApp }){const[hist,sH]=useState([...ASCII.split('\n').map(l=>({t:l,c:'asc'})),{t:'',c:'out'},{t:`  Welcome to ${BRAND}OS Terminal v2.0 — type "help"`,c:'ok'},{t:'',c:'out'}]);const[inp,sI]=useState('');const[cmdH,sCH]=useState([]);const[hI,sHI]=useState(-1);const[typing,sT]=useState(null);const iR=useRef(null),sR=useRef(null);
  useEffect(()=>{if(sR.current)sR.current.scrollTop=sR.current.scrollHeight},[hist,typing]);
  useEffect(()=>{if(!typing)return;if(typing.i>=typing.l.length){sT(null);return}const l=typing.l[typing.i];if(typing.c>=l.t.length){sH(h=>[...h,l]);sT(p=>({...p,i:p.i+1,c:0}));return}const t=setTimeout(()=>sT(p=>({...p,c:p.c+1})),6);return()=>clearTimeout(t)},[typing]);
  const onKey=e=>{if(e.key==='ArrowUp'){e.preventDefault();if(cmdH.length){const n=Math.min(hI+1,cmdH.length-1);sHI(n);sI(cmdH[cmdH.length-1-n])}}else if(e.key==='ArrowDown'){e.preventDefault();if(hI>0){sHI(hI-1);sI(cmdH[cmdH.length-hI])}else{sHI(-1);sI('')}}};
  const run=e=>{e.preventDefault();if(typing)return;const raw=inp.trim(),cmd=raw.toLowerCase();const pr=[{t:`visitor@${OS_ID}:~$ ${raw}`,c:'cmd'}];if(raw){sCH(p=>[...p,raw]);sHI(-1)}if(cmd==='clear'){sH([]);sI('');return}if(!cmd){sH(h=>[...h,...pr]);sI('');return}sH(h=>[...h,...pr]);let out=[];if(cmd==='history')out=cmdH.map((c2,i)=>({t:`  ${i+1}  ${c2}`,c:'out'}));else if(cmd.startsWith('echo '))out=[{t:raw.slice(5),c:'out'}];else if(cmd.startsWith('open ')){const tgt=cmd.split(' ')[1];if(APPS.find(a=>a.id===tgt)){if(openApp){openApp(tgt);out=[{t:`Opening ${tgt}...`,c:'ok'}]}else{out=[{t:`Cannot open apps from this context`,c:'err'}]}}else{out=[{t:`App not found: ${tgt}. Available: about, projects, skills, contact`,c:'err'}]}}else{const fn=CMDS[cmd];if(fn)out=fn();else out=[{t:`bash: ${cmd}: command not found`,c:'err'}]}sT({l:out,i:0,c:0});sI('')};
  const tt=typing&&typing.i<typing.l.length?typing.l[typing.i].t.slice(0,typing.c):'';
  return<div className="terminal" onClick={()=>iR.current?.focus()} ref={sR}>{hist.map((l,i)=><div key={i} className={`tl ${l.c}`}>{l.t}</div>)}{typing&&typing.i<typing.l.length&&<div className={`tl ${typing.l[typing.i].c} typing-l`}>{tt}</div>}{!typing&&<form onSubmit={run} className="ti"><span className="tp">visitor@{OS_ID}:~$ </span><input ref={iR} className="tf" value={inp} onChange={e=>sI(e.target.value)} onKeyDown={onKey} autoFocus spellCheck={false}/></form>}</div>}

const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function ContactContent(){const[f,sF]=useState({name:'',email:'',msg:''});const[err,sE]=useState({});const[st,sS]=useState('idle');const{push}=useN()||{};
  const onSub=e=>{e.preventDefault();const c={};if(!f.name)c.name='Required';if(!f.email)c.email='Required';else if(!EMAIL_RE.test(f.email))c.email='Invalid email';if(!f.msg)c.msg='Required';sE(c);if(Object.keys(c).length===0){sS('loading');setTimeout(()=>{sS('ok');sF({name:'',email:'',msg:''});if(push)push('System','Message sent successfully!');setTimeout(()=>sS('idle'),3000)},1500)}};
  return<div className="cf" style={{padding:'0 1rem'}}>
    <div style={{marginBottom:'1rem', fontSize:'0.85rem', color:'var(--text-d)', lineHeight:'1.6'}}>
      <p><strong>Available for project discussions.</strong> Open to cybersecurity projects, learning opportunities, and collaboration.</p>
      <p style={{marginTop:'0.5rem'}}>📞 +91 9030118006 (9am - 7pm IST)<br/>✉️ sarwansai483@gmail.com</p>
    </div>
    <form onSubmit={onSub} className="cf" style={{marginTop:'0.5rem'}}>
      <div className="fg"><label>Name</label><input value={f.name} onChange={e=>sF(p=>({...p,name:e.target.value}))} disabled={st==='loading'}/>{err.name&&<span className="fe">{err.name}</span>}</div>
      <div className="fg"><label>Email</label><input value={f.email} onChange={e=>sF(p=>({...p,email:e.target.value}))} disabled={st==='loading'}/>{err.email&&<span className="fe">{err.email}</span>}</div>
      <div className="fg"><label>Message</label><textarea value={f.msg} onChange={e=>sF(p=>({...p,msg:e.target.value}))} disabled={st==='loading'}/>{err.msg&&<span className="fe">{err.msg}</span>}</div>
      <button type="submit" className="fbtn" disabled={st==='loading'}>{st==='loading'?'Transmitting...':'Send Message'}</button>
      {st==='ok'&&<div className="ffb ok">Encrypted message delivered to server.</div>}
    </form>
  </div>}

/* ═══════════════ APP DEFS ═══════════════ */
const APPS=[{id:'about',label:'About Me',icon:I.User,w:540,h:520,content:AboutContent},{id:'projects',label:'Projects',icon:I.Folder,w:720,h:540,content:ProjectsContent},{id:'skills',label:'Skills',icon:I.Code,w:580,h:560,content:SkillsContent},{id:'terminal',label:'Terminal',icon:I.Term,w:640,h:420,content:TerminalContent},{id:'contact',label:'Contact',icon:I.Mail,w:500,h:520,content:ContactContent}];
const SHORTCUTS=[{id:'about',label:'About Me',icon:I.FolderF,color:'#fbbf24',type:'app'},{id:'resume',label:'Resume',icon:I.Resume,color:'#4a9eff',type:'link',href:'#'},{id:'github',label:'GitHub',icon:I.GH,color:'#e4e4e8',type:'link',href:'https://github.com/sarwansai8'},{id:'linkedin',label:'LinkedIn',icon:I.LI,color:'#0a66c2',type:'link',href:'https://linkedin.com/in/maddipati-sarwansai'}];
const DOCK=[{id:'about',icon:I.FolderF,label:'Files',color:'#fbbf24'},{id:'terminal',icon:I.Term,label:'Terminal',color:'#e4e4e8'},{id:'projects',icon:I.Code,label:'Projects',color:'#4a9eff'},{id:'skills',icon:I.Grid,label:'Skills',color:'#e4e4e8'},{id:'contact',icon:I.Mail,label:'Mail',color:'#e4e4e8'},{id:'_sep'},{id:'_gear',icon:I.Gear,label:'Settings',color:'#888'},{id:'_grid',icon:I.Grid,label:'Apps',color:'#888'}];

/* ═══════════════ WINDOW ═══════════════ */
function Win({win,zIndex,isFocused,onClose,onFocus,onMinimize,onSnap}){const[pos,sP]=useState({x:win.x,y:win.y});const[size,sS]=useState({w:win.w,h:win.h});const[phase,sPh]=useState('opening');const[max,sM]=useState(false);const[snapped,sSn]=useState(null);const prev=useRef(null);
  useEffect(()=>{if(phase==='opening'){const t=setTimeout(()=>sPh('idle'),300);return()=>clearTimeout(t)}},[phase]);
  const onDrag=e=>{if(max||snapped){if(snapped){sSn(null);sS({w:win.w,h:win.h})}if(max){sM(false);if(prev.current)sS({w:prev.current.w,h:prev.current.h})}}e.preventDefault();onFocus();const sx=e.clientX-pos.x,sy=e.clientY-pos.y;
    const mv=ev=>{sP({x:ev.clientX-sx,y:Math.max(28,ev.clientY-sy)});const E=20;if(ev.clientX<E)onSnap?.('left');else if(ev.clientX>window.innerWidth-E)onSnap?.('right');else if(ev.clientY<E+28)onSnap?.('top');else onSnap?.(null)};
    const up=ev=>{window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up);const E=20;if(ev.clientX<E){sSn('left');sP({x:0,y:28});sS({w:window.innerWidth/2,h:window.innerHeight-94})}else if(ev.clientX>window.innerWidth-E){sSn('right');sP({x:window.innerWidth/2,y:28});sS({w:window.innerWidth/2,h:window.innerHeight-94})}else if(ev.clientY<E+28){prev.current={...pos,...size};sM(true)}onSnap?.(null)};
    window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up)};
  const onResize=e=>{if(max)return;e.preventDefault();e.stopPropagation();const sx=e.clientX,sy=e.clientY,sw=size.w,sh=size.h;const mv=ev=>sS({w:Math.max(400,sw+ev.clientX-sx),h:Math.max(280,sh+ev.clientY-sy)});const up=()=>{window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up)};window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up)};
  const doClose=()=>{sPh('closing');setTimeout(onClose,200)};const doMin=()=>{sPh('minimizing');setTimeout(onMinimize,250)};const doMax=()=>{if(!max)prev.current={...pos,...size};sM(m=>!m);sSn(null);if(max&&prev.current){sP({x:prev.current.x,y:prev.current.y});sS({w:prev.current.w,h:prev.current.h})}};
  const C=win.content;const cls=['win',phase!=='idle'?phase:'',max&&!snapped?'maximized':'',isFocused?'focused':''].filter(Boolean).join(' ');const style=max?{zIndex}:{left:pos.x,top:pos.y,width:size.w,height:size.h,zIndex,borderRadius:snapped?0:undefined};
  return<div className={cls} style={style} onMouseDown={onFocus}><div className="tb" onMouseDown={onDrag} onDoubleClick={doMax}><div className="tb-c"><button className="tb-b x" onClick={doClose}/><button className="tb-b n" onClick={doMin}/><button className="tb-b z" onClick={doMax}/></div><span className="tb-t">{win.label}</span></div><div className="wb"><Suspense fallback={<div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'3rem',color:'#555',gap:'0.6rem'}}><div className="spin" style={{width:18,height:18,border:'2px solid rgba(255,255,255,0.08)',borderTopColor:'#555',borderRadius:'50%',animation:'sp 600ms linear infinite'}}/> Loading…</div>}><C /></Suspense></div>{!max&&!snapped&&<div className="win-rs" onMouseDown={onResize}/>}</div>}

/* ═══════════════ MAGNIFIED DOCK ═══════════════ */
function MagDock({items,openIds,openApp,bouncingId}){const[mx,sMx]=useState(-1000);const dRef=useRef(null);const BASE=46,MAX_S=1.65,RANGE=130;
  return<div className="dock-wrap"><div className="dock" ref={dRef} onMouseMove={e=>{const r=dRef.current?.getBoundingClientRect();if(r)sMx(e.clientX-r.left)}} onMouseLeave={()=>sMx(-1000)}>
    {items.map((d,i)=>{if(d.id==='_sep')return<div key={i} className="dock-sep"/>;const Ic=d.icon;let scale=1;const el=dRef.current?.children[i];if(el&&mx>-500){const r=el.getBoundingClientRect(),dr=dRef.current.getBoundingClientRect(),c=r.left+r.width/2-dr.left,dist=Math.abs(mx-c);if(dist<RANGE)scale=1+(MAX_S-1)*(1-dist/RANGE)}const sz=BASE*scale;
      return<div key={d.id} className={`dk-i ${bouncingId===d.id?'bouncing':''}`} style={{width:sz,height:sz,marginBottom:(sz-BASE)*0.5}} tabIndex={0} onClick={()=>openApp(d.id)}><span style={{color:d.color}}><Ic /></span><span className="dk-lbl">{d.label}</span>{openIds.has(d.id)&&<span className="dk-dot"/>}</div>})}
  </div></div>}

/* ═══════════════ SPOTLIGHT ═══════════════ */
function Spotlight({onClose,openApp}){const[q,sQ]=useState('');const[active,sA]=useState(0);const iRef=useRef(null);
  useEffect(()=>{iRef.current?.focus()},[]);
  const results=useMemo(()=>{if(!q.trim())return APPS;return APPS.filter(a=>a.label.toLowerCase().includes(q.toLowerCase()));},[q]);
  useEffect(()=>{sA(0)},[q]);
  const onKey=e=>{if(e.key==='ArrowDown'){e.preventDefault();sA(a=>Math.min(a+1,results.length-1))}else if(e.key==='ArrowUp'){e.preventDefault();sA(a=>Math.max(a-1,0))}else if(e.key==='Enter'&&results[active]){openApp(results[active].id);onClose()}else if(e.key==='Escape')onClose()};
  return<div className="spot-overlay" onClick={onClose}><div className="spot-box" onClick={e=>e.stopPropagation()}>
    <div className="spot-input"><I.Search /><input ref={iRef} value={q} onChange={e=>sQ(e.target.value)} onKeyDown={onKey} placeholder="Search apps…"/><span className="spot-key">ESC</span></div>
    <div className="spot-results">{results.length?results.map((a,i)=>{const Ic=a.icon;return<div key={a.id} className={`spot-item ${i===active?'active':''}`} onClick={()=>{openApp(a.id);onClose()}} onMouseEnter={()=>sA(i)}><Ic /><span>{a.label}</span></div>}):<div className="spot-empty">No results</div>}</div>
  </div></div>}

/* ═══════════════ ACTIVITIES OVERVIEW ═══════════════ */
function Activities({wins,onClose,onFocus}){
  return<div className="activities" onClick={onClose}>{wins.length?<div className="act-grid">{wins.map(w=><div key={w.id} className="act-thumb" onClick={e=>{e.stopPropagation();onFocus(w.id);onClose()}}><div className="act-thumb-bar"><div className="act-thumb-dot" style={{background:'#ff5f57'}}/><div className="act-thumb-dot" style={{background:'#ffbd2e'}}/><div className="act-thumb-dot" style={{background:'#28c840'}}/><span className="act-thumb-title">{w.label}</span></div><div className="act-thumb-body">{w.label}</div></div>)}</div>:<div className="act-empty">No open windows</div>}</div>}

/* ═══════════════ QUICK SETTINGS ═══════════════ */
function QS({onClose,onShutdown}){const[wifi,sW]=useState(true);const[bt,sB]=useState(false);
  return<div className="qs-overlay" onClick={onClose}><div className="qs-panel" onClick={e=>e.stopPropagation()}>
    <div className="qs-grid"><div className={`qs-tile ${wifi?'active':''}`} onClick={()=>sW(v=>!v)}><I.Wifi />Wi-Fi</div><div className={`qs-tile ${bt?'active':''}`} onClick={()=>sB(v=>!v)}><I.BT />Bluetooth</div><div className="qs-tile active"><I.Moon />Dark</div></div>
    <div className="qs-slider-wrap"><I.Vol /><input type="range" className="qs-slider" min="0" max="100" defaultValue="75"/></div>
    <div className="qs-sep"/>
    <div className="qs-power"><button onClick={onShutdown} title="Shut Down"><I.Power /></button><button title="Restart"><I.Restart /></button><button title="Lock"><I.Lock /></button></div>
  </div></div>}

/* ═══════════════ NOTIFICATION CENTER ═══════════════ */
function NC({onClose}){const{history,clearHistory}=useN()||{history:[],clearHistory:()=>{}};
  return<div className="qs-overlay" onClick={onClose}><div className="nc-panel" onClick={e=>e.stopPropagation()}>
    <div className="nc-title"><span>Notifications</span><button className="nc-clear" onClick={clearHistory}>Clear all</button></div>
    {history.length?history.map(n=><div key={n.id} className="nc-item"><div className="nc-item-t">{n.t}</div><div className="nc-item-m">{n.m}</div><div className="nc-item-time">{n.ts.toLocaleTimeString()}</div></div>):<div className="nc-empty">No notifications</div>}
  </div></div>}

/* ═══════════════ SHUTDOWN ═══════════════ */
function ShutdownScreen(){const[t,sT]=useState('Shutting down...');useEffect(()=>{setTimeout(()=>sT('Closing applications...'),1000);setTimeout(()=>sT('Saving state...'),2500);setTimeout(()=>sT('Goodbye.'),4000);setTimeout(()=>window.location.reload(),5500)},[]);return<div className="shutdown"><div className="spin"/><div className="shutdown-text">{t}</div></div>}

/* ═══════════════ DESKTOP ═══════════════ */
export function Desktop(){
  const[wins,sW]=useState([]);const[topZ,sTZ]=useState(10);const[hidden,sH2]=useState(new Set());const[ctx,sCx]=useState(null);const[focusId,sFI]=useState(null);const[qsOpen,sQS]=useState(false);const[ncOpen,sNC]=useState(false);const[spotOpen,sSP]=useState(false);const[actOpen,sAO]=useState(false);const[snapDir,sSD]=useState(null);const[matrix,sMat]=useState(false);const[bouncingId,sBI]=useState(null);const[shutdown,sSd]=useState(false);const[selRect,sSR]=useState(null);const now=useClock();const{push}=useN()||{};

  // Konami
  const koRef=useRef([]);const KO='ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a';
  useEffect(()=>{const h=e=>{if(e.key==='k'&&(e.ctrlKey||e.metaKey)){e.preventDefault();sSP(true);return}koRef.current.push(e.key);koRef.current=koRef.current.slice(-10);if(koRef.current.join(',')=== KO){sMat(true);push?.('🎮 Easter Egg!','You found the Matrix!')}};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[push]);
  useEffect(()=>{setTimeout(()=>push?.('Welcome',`Right-click for menu · Ctrl+K to search · Drag to edges to snap · Try ↑↑↓↓←→←→BA`),900)},[]);

  const openApp=useCallback(id=>{if(id.startsWith('_'))return;const app=APPS.find(a=>a.id===id);if(!app)return;
    sW(prev=>{if(prev.find(w=>w.id===id)){sH2(h=>{const n=new Set(h);n.delete(id);return n});sFI(id);sTZ(z=>{const nz=z+1;sW(p=>p.map(w=>w.id===id?{...w,zIndex:nz}:w));return nz});return prev}
    const off=prev.length*28,nz=topZ+1;sTZ(nz);sFI(id);sBI(id);setTimeout(()=>sBI(null),650);
    return[...prev,{...app,x:Math.max(110,(window.innerWidth-app.w)/2+off),y:Math.max(50,(window.innerHeight-app.h-80)/2+off),zIndex:nz}]});},[topZ]);
  const closeWin=useCallback(id=>{sW(p=>p.filter(w=>w.id!==id));sH2(h=>{const n=new Set(h);n.delete(id);return n})},[]);
  const focusWin=useCallback(id=>{
    sFI(id);
    const nz = topZ + 1;
    sTZ(nz);
    sW(p => p.map(w => w.id === id ? { ...w, zIndex: nz } : w));
  },[topZ]);
  const minWin=useCallback(id=>{sH2(h=>{const n=new Set(h);n.add(id);return n});sFI(null)},[]);

  const onCtx=e=>{e.preventDefault();sCx({x:e.clientX,y:e.clientY,items:[{label:'Open Terminal',icon:<I.Term />,action:()=>openApp('terminal')},{label:'Open About',icon:<I.User />,action:()=>openApp('about')},{label:'Search',icon:<I.Search />,action:()=>sSP(true)},{sep:true},{label:'Refresh',icon:<I.Refresh />,action:()=>window.location.reload()},{label:'About OS',icon:<I.Info />,action:()=>push?.(`${BRAND}OS v2.0`,'React · Vite · Tailwind')}]})};

  // Desktop drag selection
  const onDesktopDown=e=>{if(e.target.closest('.dsc,.win,.dk-i,.wg,.ctx,.top-panel'))return;const sx=e.clientX,sy=e.clientY;
    const mv=ev=>{const x=Math.min(sx,ev.clientX),y=Math.min(sy,ev.clientY),w=Math.abs(ev.clientX-sx),h=Math.abs(ev.clientY-sy);if(w>4||h>4)sSR({left:x,top:y,width:w,height:h})};
    const up=()=>{sSR(null);window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up)};
    window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up)};

  const openIds=useMemo(()=>new Set(wins.map(w=>w.id)),[wins]);
  const snapRect=useMemo(()=>{if(!snapDir)return null;if(snapDir==='left')return{left:0,top:28,width:'50%',height:'calc(100% - 94px)'};if(snapDir==='right')return{left:'50%',top:28,width:'50%',height:'calc(100% - 94px)'};if(snapDir==='top')return{left:0,top:28,width:'100%',height:'calc(100% - 94px)'};return null},[snapDir]);
  const dateStr=now.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
  const timeStr=now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true});

  if(shutdown)return<ShutdownScreen />;

  return<div className="desktop">
    <div className="desktop-bg"><WireframeTerrain /></div>
    <div className="desktop-center-logo"><div className="center-logo-text">{BRAND}</div></div>
    <div className="top-panel">
      <div className="panel-l"><div className={`panel-act ${actOpen?'active':''}`} onClick={()=>sAO(v=>!v)}>Activities</div></div>
      <div className="panel-c">{dateStr} {timeStr}</div>
      <div className="panel-r">
        <div className="panel-tray" onClick={()=>{sNC(v=>!v);sQS(false)}}><I.Bell /></div>
        <div className="panel-tray" onClick={()=>{sQS(v=>!v);sNC(false)}}><I.Wifi /><I.Vol /><I.Bat /></div>
        <div className="panel-tray"><I.Power /></div>
      </div>
    </div>

    {qsOpen&&<QS onClose={()=>sQS(false)} onShutdown={()=>sSd(true)} />}
    {ncOpen&&<NC onClose={()=>sNC(false)} />}
    {spotOpen&&<Spotlight onClose={()=>sSP(false)} openApp={openApp} />}
    {actOpen&&<Activities wins={wins.filter(w=>!hidden.has(w.id))} onClose={()=>sAO(false)} onFocus={focusWin} />}

    <div className="desktop-area" onContextMenu={onCtx} onClick={()=>sCx(null)} onMouseDown={onDesktopDown}>
      <div className="desktop-icons">{SHORTCUTS.map(s=>{const Ic=s.icon;if(s.type==='link')return<a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="dsc"><div className="dsc-icon" style={{color:s.color}}><Ic /></div><span className="dsc-lbl">{s.label}</span></a>;return<div key={s.id} className="dsc" tabIndex={0} onDoubleClick={()=>openApp(s.id)} onKeyDown={e=>{if(e.key==='Enter')openApp(s.id)}}><div className="dsc-icon" style={{color:s.color}}><Ic /></div><span className="dsc-lbl">{s.label}</span></div>})}</div>
      <div className="widgets-panel"><ClockWidget now={now} /><SysMonWidget /><MusicWidget /></div>
      {wins.map(w=>hidden.has(w.id)?null:<Win key={w.id} win={w} zIndex={w.zIndex} isFocused={focusId===w.id} onClose={()=>closeWin(w.id)} onFocus={()=>focusWin(w.id)} onMinimize={()=>minWin(w.id)} onSnap={sSD}/>)}
    </div>

    {selRect&&<div className="sel-rect" style={selRect}/>}
    {snapRect&&<div className="snap-pre" style={snapRect}/>}
    {ctx&&<div className="ctx" style={{left:Math.min(ctx.x,window.innerWidth-240),top:Math.min(ctx.y,window.innerHeight-ctx.items.length*40-20)}}>{ctx.items.map((it,i)=>it.sep?<div key={i} className="ctx-s"/>:<div key={i} className="ctx-i" onClick={()=>{it.action?.();sCx(null)}}>{it.icon}<span>{it.label}</span></div>)}</div>}
    {matrix&&<MatrixRain onDone={()=>sMat(false)} />}
    <MagDock items={DOCK} openIds={openIds} openApp={openApp} bouncingId={bouncingId} />
  </div>}

/* ═══════════════ APP ROOT ═══════════════ */
export function App(){const[ph,sPh]=useState('bios');
  return<NProvider>{ph==='bios'&&<BiosScreen onDone={()=>sPh('boot')}/>}{ph==='boot'&&<BootScreen onDone={()=>sPh('desktop')}/>}{ph==='desktop'&&<Desktop />}</NProvider>}
