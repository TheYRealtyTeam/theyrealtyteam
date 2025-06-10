
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

console.log("main.tsx: Starting React application with App component");

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

console.log("main.tsx: Creating React root");
const root = createRoot(container);

console.log("main.tsx: Rendering App component");
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log("main.tsx: App component rendered successfully");
