
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

console.log("Main.tsx loading...");

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

console.log("Creating React root...");
const root = createRoot(container);

console.log("Rendering App...");

try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log("App rendered successfully");
} catch (error) {
  console.error("Error rendering app:", error);
  // Fallback rendering without StrictMode
  root.render(<App />);
}
