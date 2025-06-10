
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

// Ensure React is properly loaded before rendering
if (!React) {
  console.error('React is not loaded');
  throw new Error('React is not loaded');
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Add error boundary for React initialization issues
try {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering app:', error);
  // Fallback rendering without StrictMode
  createRoot(rootElement).render(<App />);
}
