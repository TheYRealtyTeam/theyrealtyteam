import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const MinimalApp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Y Realty Team</h1>
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MinimalApp />
  </React.StrictMode>,
)