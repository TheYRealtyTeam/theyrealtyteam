
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import './styles/index.css';

console.log('Main.tsx loading, React version check:', React?.version || 'React not available');
console.log('React object keys:', Object.keys(React || {}));
console.log('React.useContext available:', !!React?.useContext);

// Add comprehensive error boundary for debugging
window.addEventListener('error', (event) => {
  console.error('Global error caught:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
    stack: event.error?.stack,
    reactAvailable: !!React,
    reactUseContextAvailable: !!React?.useContext
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found in DOM');
  throw new Error("Root element not found");
}

console.log('Creating React root...');

// Verify React is available before creating root
if (!React || !React.useContext) {
  console.error('React or React.useContext is not available:', { React, useContext: React?.useContext });
  throw new Error('React is not properly loaded');
}

try {
  const root = createRoot(rootElement);
  console.log('React root created successfully');
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Critical error during React initialization:', error);
  // Show user-friendly error message
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
        <h1>Application Error</h1>
        <p>There was an error loading the application. Please refresh the page.</p>
        <p style="color: #666; font-size: 14px;">Error: ${error.message}</p>
        <p style="color: #666; font-size: 12px;">React available: ${!!React}</p>
        <p style="color: #666; font-size: 12px;">useContext available: ${!!React?.useContext}</p>
      </div>
    `;
  }
  throw error;
}
