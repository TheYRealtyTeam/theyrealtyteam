
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Import React directly and make it globally available immediately
import React from 'react';

console.log('Main.tsx loading...');
console.log('React available:', !!React);

// Make React globally available before any other code runs
if (typeof window !== 'undefined') {
  (window as any).React = React;
  console.log('React set globally:', !!(window as any).React);
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

console.log('Creating React root...');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log('React app rendered successfully');
