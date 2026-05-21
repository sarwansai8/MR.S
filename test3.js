import { renderToString } from 'react-dom/server';
import React from 'react';

// Manually extract and render Desktop
import fs from 'fs';
const appCode = fs.readFileSync('./src/App.jsx', 'utf-8');
const desktopCode = appCode.replace('export default function App()', 'export function App()').replace('function Desktop()', 'export function Desktop()');
fs.writeFileSync('./src/AppTest.jsx', desktopCode);

