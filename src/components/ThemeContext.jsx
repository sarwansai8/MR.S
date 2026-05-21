import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  dark: {
    '--bg': '#000000',
    '--bg-panel': 'rgba(12, 12, 12, 0.72)',
    '--bg-dock': 'rgba(16, 16, 20, 0.65)',
    '--bg-window': 'rgba(18, 18, 22, 0.88)',
    '--bg-titlebar': 'rgba(24, 24, 28, 0.95)',
    '--text': '#e8e8e8',
    '--text-dim': '#777',
    '--text-muted': '#555',
    '--border': 'rgba(255, 255, 255, 0.06)',
    '--border-focus': 'rgba(255, 255, 255, 0.2)',
  },
  light: {
    '--bg': '#f3f4f6',
    '--bg-panel': 'rgba(255, 255, 255, 0.72)',
    '--bg-dock': 'rgba(240, 240, 245, 0.65)',
    '--bg-window': 'rgba(250, 250, 250, 0.88)',
    '--bg-titlebar': 'rgba(220, 220, 225, 0.95)',
    '--text': '#111827',
    '--text-dim': '#4b5563',
    '--text-muted': '#9ca3af',
    '--border': 'rgba(0, 0, 0, 0.1)',
    '--border-focus': 'rgba(0, 0, 0, 0.3)',
  },
  hacker: {
    '--bg': '#020202',
    '--bg-panel': 'rgba(0, 15, 0, 0.85)',
    '--bg-dock': 'rgba(0, 10, 0, 0.75)',
    '--bg-window': 'rgba(0, 5, 0, 0.92)',
    '--bg-titlebar': 'rgba(0, 20, 0, 0.95)',
    '--text': '#00ff00',
    '--text-dim': '#00aa00',
    '--text-muted': '#005500',
    '--border': 'rgba(0, 255, 0, 0.2)',
    '--border-focus': 'rgba(0, 255, 0, 0.5)',
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
  const [themeMode, setThemeMode] = useState('dark'); // dark, light, hacker
  const [accent, setAccent] = useState('blue');
  const [bgType, setBgType] = useState('wireframe'); // wireframe, matrix, solid, gradient
  const [blurIntensity, setBlurIntensity] = useState(24);

  useEffect(() => {
    const root = document.documentElement;
    const themeVars = THEMES[themeMode];
    
    // Apply theme colors
    for (const [key, value] of Object.entries(themeVars)) {
      root.style.setProperty(key, value);
    }
    
    // Apply accent
    root.style.setProperty('--accent-blue', ACCENTS[accent]);
    
    // Apply blur
    root.style.setProperty('--glass-blur', `${blurIntensity}px`);
    
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
