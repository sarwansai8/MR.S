import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import { I } from './IconSet.jsx';
import {
  BRAND, OS_ID, FULL_NAME, ROLE, BIO, INITIALS,
  BIOS_LINES
} from './constants.js';

import { NProvider, useN } from './components/NotificationContext.jsx';
import { ThemeProvider, useTheme } from './components/ThemeContext.jsx';

import AboutApp from './apps/AboutApp.jsx';
import ProjectsApp from './apps/ProjectsApp.jsx';
import SkillsApp from './apps/SkillsApp.jsx';
import TerminalApp from './apps/TerminalApp.jsx';
import ContactApp from './apps/ContactApp.jsx';
import SettingsApp from './apps/SettingsApp.jsx';
import BrowserApp from './apps/BrowserApp.jsx';
import ExplorerApp from './apps/ExplorerApp.jsx';

function useClock() { const [n, sN] = useState(new Date()); useEffect(() => { const t = setInterval(() => sN(new Date()), 1000); return () => clearInterval(t); }, []); return n; }

/* ═══════════════ BIOS POST ═══════════════ */
function BiosScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i < BIOS_LINES.length) { setLines(p => [...p, BIOS_LINES[i]]); i++; setTimeout(tick, 60 + Math.random() * 80); }
      else setTimeout(onDone, 400);
    };
    const t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="bios">{lines.map((l, i) => l ? <div key={i} className={`bios-line ${l.cls || ''}`}>{l.text || ' '}</div> : null)}</div>;
}

/* ═══════════════ BOOT ANIMATION ═══════════════ */
function BootScreen({ onDone }) {
  const [pct, sPct] = useState(0); 
  const [txt, sTxt] = useState('System Initializing'); 
  const [f, sF] = useState(false);
  
  useEffect(() => {
    const msgs = [
      [15, 'Loading kernel modules'],
      [32, 'Mounting filesystems'],
      [50, 'Starting network services'],
      [68, 'Loading desktop environment'],
      [82, 'Initializing GPU renderer'],
      [95, 'Applying user config'],
      [100, 'System Ready']
    ];
    let i = 0;
    const timers = [];
    const tick = () => {
      if (i < msgs.length) {
        sPct(msgs[i][0]);
        sTxt(msgs[i][1]);
        i++;
        timers.push(setTimeout(tick, 220 + Math.random() * 150));
      } else {
        timers.push(setTimeout(() => { sF(true); timers.push(setTimeout(onDone, 700)); }, 250));
      }
    };
    timers.push(setTimeout(tick, 400));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className={`boot ${f ? 'fading' : ''}`}>
      <div className="boot-logo">{BRAND}</div>
      <div className="boot-bar">
        <div className="boot-track">
          <div className="boot-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="boot-text">{txt}: {pct}%</div>
      </div>
    </div>
  );
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

function WeatherWidget() {
  const [w, setW] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,weather_code,wind_speed_10m')
      .then(r => r.json())
      .then(d => {
        if (d.current) setW(d.current);
        else if (d.current_weather) setW(d.current_weather);
        else setErr(true);
      })
      .catch((e) => {
        console.error(e);
        setErr(true);
      });
  }, []);

  if (err) return <div className="wg"><div className="wg-t">Weather (NY)</div><div style={{fontSize:'0.75rem',color:'#f87171'}}>Failed to load</div></div>;
  if (!w) return <div className="wg"><div className="wg-t">Weather (NY)</div><div style={{fontSize:'0.75rem',color:'var(--text-dim)'}}>Loading...</div></div>;
  
  const code = w.weather_code ?? w.weathercode ?? 0;
  const temp = w.temperature_2m ?? w.temperature ?? 0;
  const wind = w.wind_speed_10m ?? w.windspeed ?? 0;

  const getWeatherIcon = (c) => {
    if (c === 0) return "☀️";
    if (c <= 3) return "☁️";
    if (c <= 48) return "🌫️";
    if (c <= 67) return "🌧️";
    if (c <= 77) return "❄️";
    if (c <= 99) return "⛈️";
    return "☀️";
  };

  return (
    <div className="wg">
      <div className="wg-t">Weather (NY)</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontSize: '2rem' }}>{getWeatherIcon(code)}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{Math.round(temp)}°C</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Wind: {Math.round(wind)} km/h</span>
        </div>
      </div>
    </div>
  );
}

const SONGS = [
  { title: "Stranger Things Theme", artist: "Kyle Dixon & Michael Stein", src: "/audio/stranger_things.mp3" },
  { title: "SoundHelix Song 1", artist: "T.C.O.", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "SoundHelix Song 2", artist: "T.C.O.", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
];

function MusicWidget() {
    const [p, sP] = useState(false);
    const [idx, setIdx] = useState(0);
    const audioRef = useRef(null);
    const bars = 18;

    useEffect(() => {
      audioRef.current = new Audio(SONGS[idx].src);
      audioRef.current.onended = () => setIdx(i => (i + 1) % SONGS.length);
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }, []);

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.src = SONGS[idx].src;
        if (p) audioRef.current.play().catch(() => sP(false));
      }
    }, [idx]);

    const togglePlay = () => {
      if (p) {
        audioRef.current?.pause();
        sP(false);
      } else {
        audioRef.current?.play().then(() => sP(true)).catch((err) => {
          console.error("Audio playback failed:", err);
          sP(false);
        });
      }
    };

    const next = () => setIdx(i => (i + 1) % SONGS.length);
    const prev = () => setIdx(i => (i - 1 + SONGS.length) % SONGS.length);

    const song = SONGS[idx];

    return (
      <div className="wg">
        <div className="wg-t">Now Playing</div>
        <div className="mus-w">
          <div className="mus-info">
            <div className="mus-art">🎵</div>
            <div className="mus-meta">
              <div className="mus-title" style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</div>
              <div className="mus-artist">{song.artist}</div>
            </div>
          </div>
          <div className="mus-viz">
            {p && [...Array(bars)].map((_, i) => (
              <div key={i} className="viz-b" style={{ '--mn':`${2+Math.random()*3}px`,'--mx':`${10+Math.random()*14}px`,'--d':`${0.25+Math.random()*0.4}s`,animationDelay:`${i*0.04}s` }} />
            ))}
          </div>
          <div className="mus-ctrls">
            <button className="mus-btn" aria-label="Prev" onClick={prev}><I.SkipB /></button>
            <button className="mus-btn play" onClick={togglePlay} aria-label={p?'Pause':'Play'}>{p ? <I.Pause /> : <I.Play />}</button>
            <button className="mus-btn" aria-label="Next" onClick={next}><I.SkipF /></button>
          </div>
        </div>
      </div>
    );
}
function GithubWidget() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://api.github.com/users/sarwansai')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(e => console.error(e));
  }, []);
  return (
    <div className="wg">
      <div className="wg-t">GitHub Status</div>
      {data ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <img src={data.avatar_url} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)' }}>{data.name || data.login}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>{data.followers} followers · {data.public_repos} repos</span>
          </div>
          <I.GH style={{ width: '18px', height: '18px', color: 'var(--text-dim)' }} />
        </div>
      ) : (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Loading...</div>
      )}
    </div>
  );
}

/* ═══════════════ CONTENT ═══════════════ */
function AboutContent() {
  return <div className="about">
    <div className="about-av"><div className="about-av-inner">{INITIALS}</div></div>
    <h1>{FULL_NAME}</h1>
    <h2 className="about-role">{ROLE}</h2>
    <p className="about-bio">{BIO}</p>
    <div className="about-stats">
      <div className="about-stat"><span className="about-sv">3+</span><span className="about-sl">Certs</span></div>
      <div className="about-stat"><span className="about-sv">4</span><span className="about-sl">Projects</span></div>
      <div className="about-stat"><span className="about-sv">4</span><span className="about-sl">Years Edu</span></div>
    </div>
    <div className="about-socials">
      <a href="https://github.com/sarwansai8" target="_blank" rel="noopener noreferrer" className="soc" aria-label="GitHub"><I.GH /></a>
      <a href="https://linkedin.com/in/maddipati-sarwansai" target="_blank" rel="noopener noreferrer" className="soc" aria-label="LinkedIn"><I.LI /></a>
      <a href="mailto:sarwansai483@gmail.com" className="soc" aria-label="Mail"><I.Mail /></a>
    </div>
    <div className="about-certs" style={{marginTop:'1rem'}}>
      <h3>Certifications</h3>
      <ul style={{listStyle:'none',padding:0,margin:0}}>
        <li><a href="https://drive.google.com/file/d/1EMgY5_nwdWGzjsufn6ma5Z-YIo-m3hZW/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Resume / CV</a></li>
        <li><a href="https://drive.google.com/file/d/1bU_0Gzmdli1JnY5N6tHtQYulBAcUD_LW/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Microsoft Career Essentials (AZ-900)</a></li>
        <li><a href="https://drive.google.com/file/d/1M5bAEPY4Lrt_dl1njPtj_6VnZZFGbw2v/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Certified Ethical Hacker (CEH)</a></li>
        <li><a href="https://drive.google.com/file/d/1f8IzMWfsP5bzANTCcz_UlWCVc4oVjSb-/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Salesforce Certification</a></li>
      </ul>
    </div>
  </div>;
}

function ProjectsContent() { return <div className="pg">{PROJECTS.map(p=><div key={p.title} className="pc"><h3><span>{p.e}</span> {p.title}</h3><p>{p.d}</p><div className="pt">{p.tags.map(t=><span key={t}>{t}</span>)}</div><div className="pl"><a href={p.link} target="_blank" rel="noopener noreferrer"><I.GH /> Code</a></div></div>)}</div>; }

function SkillsContent(){const[v,sV]=useState(false);useEffect(()=>{const t=setTimeout(()=>sV(true),100);return()=>clearTimeout(t)},[]);return<div><div className="sk-s"><h3>Proficiency</h3><div className="sk-bars">{SBR.map((s,i)=><div key={s.n} className="sb"><span className="sb-n">{s.n}</span><div className="sb-tr"><div className="sb-fl" style={{width:v?`${s.p}%`:'0%',transitionDelay:`${i*90}ms`}}/></div><span className="sb-p">{s.p}%</span></div>)}</div></div>{SP.map(s=><div key={s.c} className="sk-s"><h3>{s.c}</h3><div className="sk-pills">{s.i.map(x=><span key={x} className="sk-pill">{x}</span>)}</div></div>)}</div>;}

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
const APPS=[{id:'about',label:'About Me',icon:I.User,w:540,h:520,content:AboutApp},{id:'projects',label:'Projects',icon:I.Folder,w:720,h:540,content:ProjectsApp},{id:'skills',label:'Skills',icon:I.Code,w:580,h:560,content:SkillsApp},{id:'terminal',label:'Terminal',icon:I.Term,w:640,h:420,content:TerminalApp},{id:'contact',label:'Contact',icon:I.Mail,w:500,h:520,content:ContactApp},{id:'settings',label:'Settings',icon:I.Gear,w:500,h:480,content:SettingsApp},{id:'browser',label:'Browser',icon:I.Globe,w:800,h:600,content:BrowserApp},{id:'explorer',label:'File Explorer',icon:I.FolderF,w:700,h:500,content:ExplorerApp}];
const SHORTCUTS=[
  {id:'about',label:'About Me',icon:I.User,color:'#fbbf24',type:'app'},
  {id:'explorer',label:'Files',icon:I.FolderF,color:'#4a9eff',type:'app'},
  {id:'browser',label:'Browser',icon:I.Globe,color:'#38bdf8',type:'app'},
  {id:'resume',label:'Resume',icon:I.Resume,color:'#4a9eff',type:'link',href:'https://drive.google.com/file/d/1EMgY5_nwdWGzjsufn6ma5Z-YIo-m3hZW/view?usp=drive_link'},
  {id:'github',label:'GitHub',icon:I.GH,color:'#e4e4e8',type:'link',href:'https://github.com/sarwansai8'},
  {id:'linkedin',label:'LinkedIn',icon:I.LI,color:'#0a66c2',type:'link',href:'https://linkedin.com/in/maddipati-sarwansai'}
];
const DOCK=[{id:'explorer',icon:I.FolderF,label:'Files',color:'#fbbf24'},{id:'browser',icon:I.Globe,label:'Browser',color:'#38bdf8'},{id:'terminal',icon:I.Term,label:'Terminal',color:'#e4e4e8'},{id:'projects',icon:I.Code,label:'Projects',color:'#4a9eff'},{id:'skills',icon:I.Grid,label:'Skills',color:'#e4e4e8'},{id:'contact',icon:I.Mail,label:'Mail',color:'#e4e4e8'},{id:'_sep'},{id:'settings',icon:I.Gear,label:'Settings',color:'#888'},{id:'_grid',icon:I.Grid,label:'Apps',color:'#888'}];

/* ═══════════════ WINDOW ═══════════════ */
function Win({win,zIndex,isFocused,onClose,onFocus,onMinimize,onSnap}){
  const[pos,sP]=useState({x:win.x,y:win.y});
  const[size,sS]=useState({w:win.w,h:win.h});
  const[phase,sPh]=useState('opening');
  const[max,sM]=useState(false);
  const[snapped,sSn]=useState(null);
  const[isDragging,sID]=useState(false);
  const prev=useRef(null);

  useEffect(()=>{if(phase==='opening'){const t=setTimeout(()=>sPh('idle'),300);return()=>clearTimeout(t)}},[phase]);
  
  const onDrag=e=>{
    // Skip drag if clicking on window control buttons
    if(e.target.closest('.tb-c')||e.target.closest('.tb-b'))return;
    if(max||snapped){if(snapped){sSn(null);sS({w:win.w,h:win.h})}if(max){sM(false);if(prev.current)sS({w:prev.current.w,h:prev.current.h})}}
    e.preventDefault();onFocus();sID(true);
    const sx=e.clientX-pos.x,sy=e.clientY-pos.y;
    const mv=ev=>{sP({x:ev.clientX-sx,y:Math.max(28,ev.clientY-sy)});const E=20;if(ev.clientX<E)onSnap?.('left');else if(ev.clientX>window.innerWidth-E)onSnap?.('right');else if(ev.clientY<E+28)onSnap?.('top');else onSnap?.(null)};
    const up=ev=>{
      sID(false);
      window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up);
      const E=20;
      if(ev.clientX<E){sSn('left');sP({x:0,y:28});sS({w:window.innerWidth/2,h:window.innerHeight-94})}
      else if(ev.clientX>window.innerWidth-E){sSn('right');sP({x:window.innerWidth/2,y:28});sS({w:window.innerWidth/2,h:window.innerHeight-94})}
      else if(ev.clientY<E+28){prev.current={...pos,...size};sM(true)}
      onSnap?.(null)
    };
    window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up)
  };
  
  const onResize=e=>{if(max)return;e.preventDefault();e.stopPropagation();sID(true);const sx=e.clientX,sy=e.clientY,sw=size.w,sh=size.h;const mv=ev=>sS({w:Math.max(400,sw+ev.clientX-sx),h:Math.max(280,sh+ev.clientY-sy)});const up=()=>{sID(false);window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up)};window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up)};
  
  const doClose=()=>{sPh('closing');setTimeout(onClose,200)};const doMin=()=>{sPh('minimizing');setTimeout(onMinimize,250)};const doMax=()=>{if(!max)prev.current={...pos,...size};sM(m=>!m);sSn(null);if(max&&prev.current){sP({x:prev.current.x,y:prev.current.y});sS({w:prev.current.w,h:prev.current.h})}};
  
  const C=win.content;
  const cls=['win',phase!=='idle'?phase:'',max&&!snapped?'maximized':'',isFocused?'focused':'',isDragging?'dragging':''].filter(Boolean).join(' ');
  const style=max?{zIndex,transition:'all 300ms cubic-bezier(0.34,1.56,0.64,1)'}:{left:pos.x,top:pos.y,width:size.w,height:size.h,zIndex,borderRadius:snapped?0:undefined,transition:isDragging?'none':'all 300ms cubic-bezier(0.34,1.56,0.64,1)'};
  
  return<div className={cls} style={style} onMouseDown={onFocus}><div className="tb" onMouseDown={onDrag} onDoubleClick={e=>{if(!e.target.closest('.tb-c'))doMax()}}><div className="tb-c" onMouseDown={e=>e.stopPropagation()} onMouseUp={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()} onDoubleClick={e=>e.stopPropagation()}><button className="tb-b x" onClick={doClose}/><button className="tb-b n" onClick={doMin}/><button className="tb-b z" onClick={doMax}/></div><span className="tb-t">{win.label}</span></div><div className="wb"><Suspense fallback={<div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'3rem',color:'#555',gap:'0.6rem'}}><div className="spin" style={{width:18,height:18,border:'2px solid rgba(255,255,255,0.08)',borderTopColor:'#555',borderRadius:'50%',animation:'sp 600ms linear infinite'}}/> Loading…</div>}><C /></Suspense></div>{!max&&!snapped&&<div className="win-rs" onMouseDown={onResize}/>}</div>
}

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
function Desktop(){
  const[wins,sW]=useState([]);const[topZ,sTZ]=useState(100);const[hidden,sH2]=useState(new Set());const[ctx,sCx]=useState(null);const[focusId,sFI]=useState(null);const[qsOpen,sQS]=useState(false);const[ncOpen,sNC]=useState(false);const[spotOpen,sSP]=useState(false);const[actOpen,sAO]=useState(false);const[snapDir,sSD]=useState(null);const[matrix,sMat]=useState(false);const[bouncingId,sBI]=useState(null);const[shutdown,sSd]=useState(false);const[selRect,sSR]=useState(null);const now=useClock();const{push}=useN()||{};
  const { bgType } = useTheme();

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
    <div className="desktop-bg">
      {bgType === 'wireframe' && <WireframeTerrain />}
      {bgType === 'matrix' && <MatrixRain onDone={() => sMat(false)} />}
      {bgType === 'solid' && <div style={{width:'100%',height:'100%',background:'var(--bg)'}} />}
    </div>
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
      <div className="widgets-panel"><ClockWidget now={now} /><WeatherWidget /><SysMonWidget /><GithubWidget /><MusicWidget /></div>
      {wins.map(w=>hidden.has(w.id)?null:<Win key={w.id} win={w} zIndex={w.zIndex} isFocused={focusId===w.id} onClose={()=>closeWin(w.id)} onFocus={()=>focusWin(w.id)} onMinimize={()=>minWin(w.id)} onSnap={sSD}/>)}
    </div>

    {selRect&&<div className="sel-rect" style={selRect}/>}
    {snapRect&&<div className="snap-pre" style={snapRect}/>}
    {ctx&&<div className="ctx" style={{left:Math.min(ctx.x,window.innerWidth-240),top:Math.min(ctx.y,window.innerHeight-ctx.items.length*40-20)}}>{ctx.items.map((it,i)=>it.sep?<div key={i} className="ctx-s"/>:<div key={i} className="ctx-i" onClick={()=>{it.action?.();sCx(null)}}>{it.icon}<span>{it.label}</span></div>)}</div>}
    {matrix&&<MatrixRain onDone={()=>sMat(false)} />}
    <MagDock items={DOCK} openIds={openIds} openApp={openApp} bouncingId={bouncingId} />
  </div>}

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return <div style={{position:'fixed',inset:0,background:'#900',color:'#fff',padding:'2rem',fontFamily:'monospace',zIndex:999999}}><h2>FATAL ERROR</h2><pre>{this.state.error.toString()}</pre></div>;
    }
    return this.props.children;
  }
}

/* ═══════════════ APP ROOT ═══════════════ */
export default function App(){const[ph,sPh]=useState('bios');
  return<NProvider><ThemeProvider>{ph==='bios'&&<BiosScreen onDone={()=>sPh('boot')}/>}{ph==='boot'&&<BootScreen onDone={()=>sPh('desktop')}/>}{ph==='desktop'&&<ErrorBoundary><Desktop /></ErrorBoundary>}</ThemeProvider></NProvider>}
