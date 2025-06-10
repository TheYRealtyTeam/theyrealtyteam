
import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'

console.log("main.tsx: Starting minimal React application");

// Ultra-minimal component using createElement to avoid any JSX compilation issues
const MinimalApp = () => {
  console.log("MinimalApp: Rendering basic element");
  
  return createElement('div', {
    style: {
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }
  }, 
    createElement('div', {
      style: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    },
      createElement('h1', {
        style: { color: '#333', marginBottom: '10px' }
      }, 'Minimal React App'),
      createElement('p', {
        style: { color: '#666' }
      }, 'Running without any external components')
    )
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

console.log("main.tsx: Creating React root");
const root = createRoot(container);

console.log("main.tsx: Rendering minimal application");
root.render(
  createElement(StrictMode, null, createElement(MinimalApp, null))
);

console.log("main.tsx: Minimal application rendered successfully");
