
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'

console.log("main.tsx: Starting application");

// Simple app component inline to avoid any import issues
const SimpleApp = () => {
  console.log("SimpleApp: Rendering");
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Application Running</h1>
        <p className="text-gray-600">React is working correctly</p>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <SimpleApp />
  </StrictMode>
);
console.log("main.tsx: Application started successfully");
