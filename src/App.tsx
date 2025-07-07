import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const HomePage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginBottom: '1rem' 
        }}>
          Y Realty Team
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#6b7280',
          margin: 0
        }}>
          Premium Property Management Services
        </p>
        <div style={{ marginTop: '2rem' }}>
          <button style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App