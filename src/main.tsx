
import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './styles/index.css'

console.log('main.tsx: Starting application initialization');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Global error handler
const handleGlobalError = (error: ErrorEvent) => {
  console.error('Global error:', error);
};

const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
  console.error('Unhandled promise rejection:', event.reason);
};

window.addEventListener('error', handleGlobalError);
window.addEventListener('unhandledrejection', handleUnhandledRejection);

try {
  const container = document.getElementById("root");
  if (!container) {
    throw new Error("Root element not found");
  }

  console.log('main.tsx: Root element found, creating React root');
  const root = createRoot(container);

  console.log('main.tsx: About to render App with BrowserRouter');

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );

  console.log('main.tsx: App rendered successfully');
} catch (error) {
  console.error('main.tsx: Fatal error:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; text-align: center; margin-top: 50px;">
      <h1>Error loading application</h1>
      <p>Please refresh the page or contact support.</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Refresh Page
      </button>
    </div>
  `;
}
