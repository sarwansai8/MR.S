import React, { useState, useEffect, useRef } from 'react';
import { ASCII, BRAND, FULL_NAME, ROLE, PROJECTS, SP, OS_ID } from '../constants.js';
import { useTheme } from '../components/ThemeContext.jsx';

const CMDS = {
  help: () => [{ t: ' help · whoami · ls · date · clear · skills · projects · contact · neofetch · echo · history · uname · sudo · open · cat · theme · curl', c: 'inf' }],
  whoami: () => [{ t: FULL_NAME.toLowerCase().replace(/ /g, '-'), c: 'ok' }, { t: ROLE, c: 'out' }],
  ls: () => [{ t: 'drwxr-xr-x  about/\ndrwxr-xr-x  projects/\ndrwxr-xr-x  skills/\n-rw-r--r--  resume.pdf   42K\n-rw-r--r--  README.md    2.1K\n-rw-r--r--  secret.txt   12B', c: 'out' }],
  date: () => [{ t: new Date().toString(), c: 'out' }],
  skills: () => SP.map(s => ({ t: `  ${s.c}: ${s.i.join(' · ')}`, c: 'out' })),
  projects: () => PROJECTS.map(p => ({ t: `  ${p.e} ${p.title}`, c: 'out' })),
  contact: () => [{ t: '  Phone: +91 9030118006\n  Email: sarwansai483@gmail.com\n  GitHub: github.com/sarwansai8\n  LinkedIn: linkedin.com/in/maddipati-sarwansai', c: 'out' }],
  uname: () => [{ t: `${BRAND} OS 2.0.0 x86_64 React/19.x Vite/8.x`, c: 'out' }],
  sudo: () => [{ t: 'Nice try 😏', c: 'err' }],
  neofetch: () => [{ t: `  ╭──────────╮   ${FULL_NAME.toLowerCase().replace(/ /g, '-')}@${OS_ID}\n  │  ▄▀▀▀▄  │   OS: ${BRAND} OS 2.0\n  │ █ ◉ ◉ █ │   Host: React 19.x\n  │  ▀▄▄▄▀  │   Shell: terminal.jsx\n  ╰──────────╯   Theme: Adaptive\n                  Uptime: ∞`, c: 'asc' }]
};

export default function TerminalApp({ openApp }) {
  const [hist, sH] = useState([
    ...ASCII.split('\n').map(l => ({ t: l, c: 'asc' })),
    { t: '', c: 'out' },
    { t: `  Welcome to ${BRAND}OS Terminal v2.0 — type "help"`, c: 'ok' },
    { t: '', c: 'out' }
  ]);
  const [inp, sI] = useState('');
  const [cmdH, sCH] = useState([]);
  const [hI, sHI] = useState(-1);
  const [typing, sT] = useState(null);
  const iR = useRef(null);
  const sR = useRef(null);
  
  const { theme, setTheme, bgType, setBgType } = useTheme();
  
  useEffect(() => {
    if (sR.current) sR.current.scrollTop = sR.current.scrollHeight;
  }, [hist, typing]);
  
  useEffect(() => {
    if (!typing) return;
    if (typing.i >= typing.l.length) {
      sT(null);
      return;
    }
    const l = typing.l[typing.i];
    if (typing.c >= l.t.length) {
      sH(h => [...h, l]);
      sT(p => ({ ...p, i: p.i + 1, c: 0 }));
      return;
    }
    const t = setTimeout(() => sT(p => ({ ...p, c: p.c + 1 })), 6);
    return () => clearTimeout(t);
  }, [typing]);
  
  const onKey = e => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdH.length) {
        const n = Math.min(hI + 1, cmdH.length - 1);
        sHI(n);
        sI(cmdH[cmdH.length - 1 - n]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hI > 0) {
        sHI(hI - 1);
        sI(cmdH[cmdH.length - hI]);
      } else {
        sHI(-1);
        sI('');
      }
    }
  };
  
  const run = async e => {
    e.preventDefault();
    if (typing) return;
    const raw = inp.trim();
    const pr = [{ t: `visitor@${OS_ID}:~$ ${raw}`, c: 'cmd' }];
    
    if (raw) {
      sCH(p => [...p, raw]);
      sHI(-1);
    }
    
    const parts = raw.split(' ').filter(Boolean);
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1);
    
    if (cmd === 'clear') {
      sH([]);
      sI('');
      return;
    }
    
    if (!cmd) {
      sH(h => [...h, ...pr]);
      sI('');
      return;
    }
    
    sH(h => [...h, ...pr]);
    let out = [];
    
    if (cmd === 'history') {
      out = cmdH.map((c2, i) => ({ t: `  ${i + 1}  ${c2}`, c: 'out' }));
    } else if (cmd === 'echo') {
      out = [{ t: args.join(' '), c: 'out' }];
    } else if (cmd === 'open') {
      const tgt = args[0];
      if (openApp) {
        openApp(tgt);
        out = [{ t: `Opening ${tgt}...`, c: 'ok' }];
      } else {
        out = [{ t: `Cannot open apps from this context`, c: 'err' }];
      }
    } else if (cmd === 'cat') {
      const f = args[0];
      if (!f) out = [{ t: 'cat: missing file operand', c: 'err' }];
      else if (f === 'README.md') out = [{ t: '# Maddipati Sarwansai\nCybersecurity student building secure solutions.\nType "projects" to see my work.', c: 'out' }];
      else if (f === 'resume.pdf') out = [{ t: 'Error: Cannot display binary file in terminal. Try "open resume"', c: 'err' }];
      else if (f === 'secret.txt') out = [{ t: 'hunter2', c: 'ok' }];
      else out = [{ t: `cat: ${f}: No such file or directory`, c: 'err' }];
    } else if (cmd === 'theme') {
      const mode = args[0];
      if (['dark', 'light', 'hacker', 'neon'].includes(mode)) {
        setTheme(mode);
        out = [{ t: `Theme changed to ${mode}`, c: 'ok' }];
      } else if (['matrix', 'solid', 'wireframe'].includes(mode)) {
        setBgType(mode);
        out = [{ t: `Background changed to ${mode}`, c: 'ok' }];
      } else {
        out = [{ t: `Usage: theme <dark|light|hacker|neon> OR theme <matrix|solid|wireframe>`, c: 'err' }];
      }
    } else if (cmd === 'curl') {
      if (args[0] === 'github') {
        out = [{ t: 'Fetching latest profile data from GitHub...', c: 'inf' }];
        sT({ l: out, i: 0, c: 0 });
        try {
          const res = await fetch('https://api.github.com/users/sarwansai');
          const data = await res.json();
          const r = [
            { t: `User: ${data.name || data.login}`, c: 'ok' },
            { t: `Bio: ${data.bio || 'No bio'}`, c: 'out' },
            { t: `Followers: ${data.followers} | Public Repos: ${data.public_repos}`, c: 'out' }
          ];
          sH(h => [...h, ...r]);
        } catch (e) {
          sH(h => [...h, { t: 'Failed to fetch GitHub data', c: 'err' }]);
        }
        sI('');
        return;
      } else {
        out = [{ t: `Usage: curl github`, c: 'err' }];
      }
    } else {
      const fn = CMDS[cmd];
      if (fn) out = fn();
      else out = [{ t: `bash: ${cmd}: command not found`, c: 'err' }];
    }
    
    sT({ l: out, i: 0, c: 0 });
    sI('');
  };
  
  const tt = typing && typing.i < typing.l.length ? typing.l[typing.i].t.slice(0, typing.c) : '';
  
  return (
    <div className="terminal" onClick={() => iR.current?.focus()} ref={sR}>
      {hist.map((l, i) => <div key={i} className={`tl ${l.c}`}>{l.t}</div>)}
      {typing && typing.i < typing.l.length && <div className={`tl ${typing.l[typing.i].c} typing-l`}>{tt}</div>}
      {!typing && (
        <form onSubmit={run} className="ti">
          <span className="tp">visitor@{OS_ID}:~$ </span>
          <input ref={iR} className="tf" value={inp} onChange={e => sI(e.target.value)} onKeyDown={onKey} autoFocus spellCheck={false} />
        </form>
      )}
    </div>
  );
}
