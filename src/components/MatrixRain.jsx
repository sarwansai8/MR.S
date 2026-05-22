import React, { useRef, useEffect } from 'react';

export default function MatrixRain({ onDone }) {
  const ref = useRef(null);
  
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    
    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    const cols = Math.floor(c.width / 15);
    const drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF';
    let anim;
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = '13px monospace';
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.97 ? '#fff' : '#0f0';
        ctx.fillText(ch, i * 15, drops[i] * 15);
        if (drops[i] * 15 > c.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      anim = requestAnimationFrame(draw);
    };
    draw();
    
    const t = setTimeout(() => {
      cancelAnimationFrame(anim);
      if (onDone) onDone();
    }, 5000);
    
    return () => {
      cancelAnimationFrame(anim);
      clearTimeout(t);
      window.removeEventListener('resize', resize);
    };
  }, [onDone]);
  
  return (
    <div className="matrix">
      <canvas ref={ref} />
    </div>
  );
}
