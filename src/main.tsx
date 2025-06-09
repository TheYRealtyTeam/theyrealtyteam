
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

// Ensure React is properly initialized
console.log('Main.tsx loading...');
console.log('React version:', React.version);
console.log('Creating React root...');

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

try {
  console.log('Rendering App...');
  const root = createRoot(container);
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
