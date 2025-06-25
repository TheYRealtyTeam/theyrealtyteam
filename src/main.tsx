
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

// Global error handlers
const handleGlobalError = (error: ErrorEvent) => {
  console.error('Global error:', error);
};

const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
  console.error('Unhandled promise rejection:', event.reason);
};

// Wait for DOM to be ready
const initializeApp = () => {
  try {
    const container = document.getElementById("root");
    if (!container) {
      throw new Error("Root element not found");
    }

    console.log('main.tsx: Root element found, creating React root');
    const root = createRoot(container);

    console.log('main.tsx: About to render App');

    // Render with additional error boundary
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
    console.error('main.tsx: Fatal error during initialization:', error);
    
    // Fallback error UI
    document.body.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="text-align: center; max-width: 400px;">
          <h1 style="color: #dc2626; font-size: 24px; margin-bottom: 16px;">Application Error</h1>
          <p style="color: #6b7280; margin-bottom: 24px;">We encountered an error while loading the application. Please try reloading the page.</p>
          <button onclick="window.location.reload()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer; transition: background-color 0.2s;">
            Reload Page
          </button>
          <details style="margin-top: 24px; text-align: left;">
            <summary style="cursor: pointer; color: #6b7280; font-size: 14px;">Technical Details</summary>
            <pre style="background: #f3f4f6; padding: 12px; border-radius: 4px; font-size: 12px; overflow: auto; margin-top: 8px;">${error?.toString() || 'Unknown error'}</pre>
          </details>
        </div>
      </div>
    `;
  }
};

// Set up global error handlers
window.addEventListener('error', handleGlobalError);
window.addEventListener('unhandledrejection', handleUnhandledRejection);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM is already ready
  initializeApp();
}
