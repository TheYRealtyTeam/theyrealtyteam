import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Force a cache break by creating a completely new component tree
const FreshApp = () => {
  React.useEffect(() => {
    console.log('Fresh app loaded successfully!')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Y Realty Team</h1>
        <p className="text-xl text-gray-600 mb-4">Property Management Excellence</p>
        <div className="animate-pulse">
          <div className="h-2 bg-blue-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FreshApp />
  </React.StrictMode>,
)