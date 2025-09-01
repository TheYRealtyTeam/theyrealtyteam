import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import App from './App.tsx'
import './styles/index.css'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext'

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
