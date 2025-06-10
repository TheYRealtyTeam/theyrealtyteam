
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

console.log('Main.tsx loading...');

// Make React available globally
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

// Wait for DOM to be ready
const initializeApp = () => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }

  console.log('Creating React root...');

  // Import App synchronously to avoid timing issues
  import('./App').then(({ default: App }) => {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('React app rendered successfully');
  }).catch((error) => {
    console.error('Failed to load App:', error);
  });
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
