
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

// Ensure React is properly available globally
if (typeof React === 'undefined' || React === null) {
  throw new Error('React is not properly loaded');
}

console.log('Main.tsx loading...');
console.log('React available:', !!React);
console.log('React version:', React.version);

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
