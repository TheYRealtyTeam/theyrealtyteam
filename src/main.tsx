
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

console.log("main.tsx: React object:", React);
console.log("main.tsx: React.useState:", React.useState);

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

console.log("main.tsx: Creating root and rendering App");
const root = createRoot(container);
root.render(<App />);
