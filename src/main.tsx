
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
import './styles/index.css';

console.log('Main.tsx loading...');

// Ensure React is properly available
if (typeof window !== 'undefined') {
  console.log('React version check:', React?.version || 'React not found');
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

try {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
}
