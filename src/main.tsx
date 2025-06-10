
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'

console.log("main.tsx: Starting fresh application");

// Completely isolated app component
const FreshApp = () => {
  console.log("FreshApp: Rendering basic component");
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Fresh Start</h1>
        <p className="text-gray-600 mb-4">React application is running cleanly</p>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">No external providers or components loaded</p>
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

console.log("main.tsx: Rendering application");
root.render(
  <StrictMode>
    <FreshApp />
  </StrictMode>
);

console.log("main.tsx: Application rendered successfully");
