import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Simple component to break cache cycle
const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center">
          Y Realty Team | Property Management Nationwide
        </h1>
        <p className="text-center mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)