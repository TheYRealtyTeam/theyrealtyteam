
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

// Ensure React is globally available for all components and libraries
(globalThis as any).React = React;
(window as any).React = React;

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(React.createElement(App));
