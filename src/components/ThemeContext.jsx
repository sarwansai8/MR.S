import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  dark: {
    '--bg': '#000000',
    '--bg-panel': 'rgba(8,8,12,0.78)',
    '--bg-dock': 'rgba(10,10,14,0.6)',
    '--bg-win': 'rgba(14,14,18,0.92)',
    '--bg-tb': 'rgba(20,20,24,0.96)',
    '--bg-input': 'rgba(255,255,255,0.035)',
    '--text': '#e4e4e8',
    '--text-d': '#6b6b78',
    '--text-m': '#44444f',
    '--brd': 'rgba(255,255,255,0.05)',
    '--brd-f': 'rgba(255,255,255,0.18)',
  },
  light: {
    '--bg': '#f3f4f6',
    '--bg-panel': 'rgba(255,255,255,0.72)',
    '--bg-dock': 'rgba(240,240,245,0.65)',
    '--bg-win': 'rgba(250,250,250,0.88)',
    '--bg-tb': 'rgba(220,220,225,0.95)',
    '--bg-input': 'rgba(0,0,0,0.04)',
    '--text': '#111827',
    '--text-d': '#4b5563',
    '--text-m': '#9ca3af',
    '--brd': 'rgba(0,0,0,0.1)',
    '--brd-f': 'rgba(0,0,0,0.3)',
  },
  hacker: {
    '--bg': '#020202',
    '--bg-panel': 'rgba(0,15,0,0.85)',
    '--bg-dock': 'rgba(0,10,0,0.75)',
    '--bg-win': 'rgba(0,5,0,0.92)',
    '--bg-tb': 'rgba(0,20,0,0.95)',
    '--bg-input': 'rgba(0,255,0,0.04)',
    '--text': '#00ff00',
    '--text-d': '#00aa00',
    '--text-m': '#005500',
    '--brd': 'rgba(0,255,0,0.2)',
    '--brd-f': 'rgba(0,255,0,0.5)',
  },
  neon: {
    '--bg': '#070110',
    '--bg-panel': 'rgba(18,5,29,0.72)',
    '--bg-dock': 'rgba(23,7,36,0.65)',
    '--bg-win': 'rgba(20,4,32,0.90)',
    '--bg-tb': 'rgba(28,8,44,0.95)',
    '--bg-input': 'rgba(255,0,127,0.04)',
    '--text': '#ff79c6',
    '--text-d': '#00f5ff',
    '--text-m': '#a26fc0',
    '--brd': 'rgba(0,245,255,0.2)',
    '--brd-f': 'rgba(255,0,127,0.5)',
  }
};

export const ACCENTS = {
  blue: '#4a9eff',
  green: '#4ade80',
  red: '#f87171',
  yellow: '#fbbf24',
  purple: '#a78bfa'
};

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('dark');
  const [accent, setAccent] = useState('blue');
  const [bgType, setBgType] = useState('wireframe');
  const [blurIntensity, setBlurIntensity] = useState(24);

  useEffect(() => {
    const root = document.documentElement;
    const themeVars = THEMES[themeMode];
    
    // Apply theme colors
    for (const [key, value] of Object.entries(themeVars)) {
      root.style.setProperty(key, value);
    }
    
    // Apply accent
    root.style.setProperty('--b', ACCENTS[accent]);
    
    // Apply blur
    root.style.setProperty('--blur', `${blurIntensity}px`);
    
    // Remove HTML boot screen on first theme apply
    const htmlBoot = document.getElementById('html-boot');
    if (htmlBoot) {
      htmlBoot.style.transition = 'opacity 0.5s';
      htmlBoot.style.opacity = '0';
      setTimeout(() => htmlBoot.remove(), 500);
    }
  }, [themeMode, accent, blurIntensity]);

  return (
    <ThemeContext.Provider value={{
      themeMode, setThemeMode,
      accent, setAccent,
      bgType, setBgType,
      blurIntensity, setBlurIntensity
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
