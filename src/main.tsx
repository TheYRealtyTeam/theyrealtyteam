
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

console.log("main.tsx: React object:", React);
console.log("main.tsx: React.useState:", React.useState);
console.log("main.tsx: typeof React:", typeof React);
console.log("main.tsx: React version:", React.version);

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

console.log("main.tsx: Creating root and rendering App");
try {
  const root = createRoot(container);
  console.log("main.tsx: Root created successfully");
  root.render(<App />);
  console.log("main.tsx: App rendered successfully");
} catch (error) {
  console.error("main.tsx: Error during rendering:", error);
}
