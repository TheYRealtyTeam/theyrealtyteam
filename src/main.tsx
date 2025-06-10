
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import './styles/index.css'

// Ensure React is globally available BEFORE any components load
console.log('Setting up React globally:', React);
if (typeof window !== 'undefined') {
  (window as any).React = React;
}
if (typeof globalThis !== 'undefined') {
  (globalThis as any).React = React;
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
