
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

console.log("main.tsx: Starting React application with Router");

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

console.log("main.tsx: Creating React root with BrowserRouter");
const root = createRoot(container);

console.log("main.tsx: Rendering App with Router");
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

console.log("main.tsx: App with Router rendered successfully");
