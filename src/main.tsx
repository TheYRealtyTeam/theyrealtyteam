
import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

console.log('Starting application...');
console.log('React available:', !!React);
console.log('React.useState available:', !!React.useState);

// Ensure React is globally available
(window as any).React = React;

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(
  React.createElement(StrictMode, null, React.createElement(App))
);

console.log('Application rendered successfully');
