
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

// Dynamically import App to ensure React is fully loaded
const initApp = async () => {
  const { default: App } = await import('./App.tsx');
  
  console.log('Main.tsx loading...');

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  console.log('Creating React root...');

  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  console.log('React app rendered');
};

// Initialize the app
initApp().catch(console.error);
