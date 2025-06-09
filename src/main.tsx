
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

// Ensure React is available globally before any other imports
import * as React from 'react';

console.log('Main.tsx loading...');

// Ensure React is properly available before proceeding
if (!React || typeof React !== 'object') {
  throw new Error('React is not properly loaded - React object is null or undefined');
}

if (!React.useState || !React.useEffect || !React.useContext) {
  throw new Error('React hooks are not available - React may not be properly imported');
}

console.log('React validation passed:', {
  reactAvailable: !!React,
  version: React.version,
  hooksAvailable: !!(React.useState && React.useEffect && React.useContext)
});

// Make React available globally as a fallback
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

try {
  console.log('Creating React root...');
  const root = createRoot(container);
  
  console.log('Rendering App...');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
  throw error;
}
