
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

// Ensure React is globally available
(window as any).React = React;

createRoot(document.getElementById("root")!).render(React.createElement(App));
