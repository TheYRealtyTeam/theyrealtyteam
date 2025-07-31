const SimpleApp = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginBottom: '1rem' 
        }}>
          Y Realty Team
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#6b7280', 
          marginBottom: '0.5rem' 
        }}>
          Property Management Nationwide
        </p>
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#9ca3af' 
        }}>
          Application Loading Successfully ✅
        </p>
      </div>
    </div>
  )
}

export default SimpleApp