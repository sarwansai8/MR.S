import { renderToString } from 'react-dom/server';
import React from 'react';
import { Desktop } from './src/AppTest.jsx';

console.log('Rendering Desktop...');
try {
  const html = renderToString(React.createElement(Desktop));
  console.log('Success! Length:', html.length);
} catch (e) {
  console.error('ERROR RENDER:', e);
}
