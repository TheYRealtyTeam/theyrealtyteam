
import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'

console.log("main.tsx: Starting completely isolated application");

// Completely isolated app with no imports from our codebase
const IsolatedApp = () => {
  console.log("IsolatedApp: Rendering with zero dependencies");
  
  return createElement('div', {
    style: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px'
    }
  }, 
    createElement('div', {
      style: {
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px'
      }
    },
      createElement('h1', {
        style: { 
          color: '#1f2937', 
          marginBottom: '20px',
          fontSize: '32px',
          fontWeight: 'bold'
        }
      }, 'React Test App'),
      createElement('p', {
        style: { 
          color: '#6b7280',
          marginBottom: '20px'
        }
      }, 'Testing React isolation without any external components'),
      createElement('div', {
        style: {
          backgroundColor: '#f3f4f6',
          padding: '16px',
          borderRadius: '8px'
        }
      }, 'If you see this, React is working correctly!')
    )
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

console.log("main.tsx: Creating React root");
const root = createRoot(container);

console.log("main.tsx: Rendering isolated application");
root.render(
  createElement(StrictMode, null, createElement(IsolatedApp, null))
);

console.log("main.tsx: Application rendered successfully");
