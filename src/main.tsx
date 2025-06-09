
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

console.log('Main.tsx loading...');

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
