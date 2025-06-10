
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

// Ensure React is available globally for debugging
(window as any).React = React;

console.log('Main.tsx loading...', { React: !!React, StrictMode: !!StrictMode });

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

console.log('React app rendered');
