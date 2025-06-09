
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

console.log("Main.tsx loading...");
console.log("React version:", React.version);
console.log("React object:", React);

// Ensure React is globally available
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

console.log("Creating React root...");
const root = createRoot(container);

console.log("Rendering App...");
root.render(React.createElement(App));

console.log("App rendered successfully");
