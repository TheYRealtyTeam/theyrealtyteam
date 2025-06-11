
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/index.css'

console.log('main.tsx: Starting application initialization');

const container = document.getElementById("root");
if (!container) {
  console.error('main.tsx: Root element not found');
  throw new Error("Root element not found");
}

console.log('main.tsx: Root element found, creating React root');
const root = createRoot(container);

console.log('main.tsx: About to render App with BrowserRouter');

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

console.log('main.tsx: App rendered successfully');
