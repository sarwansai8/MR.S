import React, { useRef, useEffect } from 'react';

export default function WireframeTerrain() {
  const ref = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let anim;
    
    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    const onMouseMove = e => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);
    
    const COLS = 90, ROWS = 55, SP = 26, AMP = 60;
    const STARS = Array.from({ length: 50 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.45,
      r: Math.random() * 1.8 + 0.4,
      vx: 0,
      vy: 0,
      bo: Math.random() * 0.25 + 0.08
    }));
    
    // Shooting stars
    const SHOOTS = [];
    let lastShoot = 0;
    let time = 0;
    
    const draw = () => {
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      const horizon = H * 0.4, fov = W * 0.65;
      const mx = mouse.current.x, my = mouse.current.y;
      time += 0.005;

      // Stars with mouse repulsion
      for (const s of STARS) {
        const sx = s.x * W, sy = s.y * H;
        const dx = sx - mx, dy = sy - my, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const f = (180 - dist) / 180 * 0.25;
          s.vx += (dx / dist) * f;
          s.vy += (dy / dist) * f;
        }
        s.vx *= 0.95;
        s.vy *= 0.95;
        s.x += s.vx / W;
        s.y += s.vy / H;
        if (s.x < -0.01) s.x = 1.01;
        if (s.x > 1.01) s.x = -0.01;
        if (s.y < -0.01) s.y = 0.45;
        if (s.y > 0.5) s.y = 0;
        const tw = Math.sin(time * 2.5 + s.r * 8) * 0.12 + s.bo;
        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 5);
        grd.addColorStop(0, `rgba(255,255,255,${tw * 1.5})`);
        grd.addColorStop(0.3, `rgba(200,210,255,${tw})`);
        grd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(sx, sy, s.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Shooting stars
      const now2 = Date.now();
      if (now2 - lastShoot > 3000 + Math.random() * 5000) {
        lastShoot = now2;
        SHOOTS.push({
          x: Math.random() * W * 0.6 + W * 0.2,
          y: Math.random() * H * 0.3,
          vx: 4 + Math.random() * 3,
          vy: 2 + Math.random() * 2,
          life: 1
        });
      }
      for (let i = SHOOTS.length - 1; i >= 0; i--) {
        const sh = SHOOTS[i];
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life -= 0.02;
        if (sh.life <= 0) {
          SHOOTS.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 8, sh.y - sh.vy * 8);
        const lg = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 8, sh.y - sh.vy * 8);
        lg.addColorStop(0, `rgba(255,255,255,${sh.life * 0.8})`);
        lg.addColorStop(1, 'transparent');
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1.5;
        ctx.stroke();
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
        for (let c2 = 0; c2 < COLS; c2++) {
          const p = pts[r][c2];
          c2 === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy);
        }
        const hue = 220 + Math.sin(time * 0.5 + r * 0.1) * 20;
        ctx.strokeStyle = `hsla(${hue},15%,70%,${baseAlpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        // Vertical depth lines
        if (r > 0) {
          for (let c2 = 0; c2 < COLS; c2 += 2) {
            const p0 = pts[r - 1][c2], p1 = pts[r][c2];
            // Brighter at peaks
            const peakGlow = Math.max(0, -pts[r][c2].y / AMP) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p0.sx, p0.sy);
            ctx.lineTo(p1.sx, p1.sy);
            ctx.strokeStyle = `hsla(${hue},20%,75%,${fadeR * 0.2 + peakGlow})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      anim = requestAnimationFrame(draw);
    };
    draw();
    
    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
  
  return <canvas ref={ref} />;
}
