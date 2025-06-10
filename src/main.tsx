
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

// Ensure React is available globally before importing any components
(window as any).React = React;

console.log('Main.tsx loading...', { React });

// Dynamic import to ensure React is available before loading the app
const loadApp = async () => {
  const { default: App } = await import('./App');
  
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
};

loadApp().catch(console.error);
