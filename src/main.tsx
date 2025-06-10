
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

console.log('Main.tsx loading...', { React });

// Ensure React is available globally to prevent hook issues
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

// Dynamic import to ensure React is properly loaded
const loadApp = async () => {
  try {
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
  } catch (error) {
    console.error('Failed to load app:', error);
  }
};

loadApp();
