
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

console.log("Main.tsx loading...");
console.log("React version:", React.version);

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

console.log("Creating React root...");
const root = createRoot(container);

console.log("Rendering App...");
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log("App rendered successfully");
