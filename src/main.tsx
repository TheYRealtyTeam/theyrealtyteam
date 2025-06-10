
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

console.log("main.tsx: Starting completely isolated application");

// Completely isolated app with inline styles to avoid any CSS imports
const IsolatedApp = () => {
  console.log("IsolatedApp: Rendering with zero external dependencies");
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#1565c0',
          marginBottom: '32px'
        }}>
          Isolated React App
        </h1>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '32px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#424242',
            marginBottom: '16px'
          }}>
            Application Status
          </h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            ✅ React is working correctly
          </p>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            ✅ No external CSS loaded
          </p>
          <p style={{ color: '#666' }}>
            ✅ Completely isolated component tree
          </p>
        </div>
      </div>
    </div>
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
  <StrictMode>
    <IsolatedApp />
  </StrictMode>
);

console.log("main.tsx: Isolated application rendered successfully");
