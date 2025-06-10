
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

console.log('Starting application...');
console.log('React available:', !!React);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log('Application rendered successfully');
