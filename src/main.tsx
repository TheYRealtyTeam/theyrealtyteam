
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './styles/index.css';

console.log("Main.tsx loading...");

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

console.log("Creating React root...");
const root = createRoot(container);

console.log("Rendering App with ErrorBoundary...");
root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

console.log("App rendered successfully");
