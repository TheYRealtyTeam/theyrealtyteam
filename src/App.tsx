import React from 'react'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-center py-10">Y Realty Team</h1>
      <p className="text-center text-gray-600">Loading...</p>
      <Toaster position="top-right" />
    </div>
  )
}

export default App