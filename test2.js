import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App.jsx';

console.log('Rendering App...');
try {
  const html = renderToString(React.createElement(App));
  console.log('Success! Length:', html.length);
} catch (e) {
  console.error('ERROR RENDER:', e);
}
