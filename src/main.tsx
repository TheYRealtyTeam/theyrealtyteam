
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

// Import React first and ensure it's available
import React from 'react';

console.log('Main.tsx loading...');

// Ensure React is properly loaded
if (!React) {
  throw new Error('React is not available');
}

// Make React globally available
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

console.log('React is available:', {
  react: !!React,
  version: React.version,
  hooks: !!(React.useState && React.useEffect)
});

// Dynamic import of App to ensure React is ready
const loadApp = async () => {
  const { default: App } = await import('./App');
  return App;
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

loadApp().then((App) => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('App rendered successfully');
}).catch((error) => {
  console.error('Error loading app:', error);
  // Render a simple error message
  root.render(
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Application Error</h2>
      <p>Failed to load the application. Please refresh the page.</p>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
});
