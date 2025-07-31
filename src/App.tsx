function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '700', 
          color: '#111827', 
          marginBottom: '1rem',
          lineHeight: '1.2'
        }}>
          Y Realty Team
        </h1>
        <p style={{ 
          fontSize: '1.5rem', 
          color: '#6b7280', 
          marginBottom: '1rem',
          fontWeight: '400'
        }}>
          Property Management Nationwide
        </p>
        <p style={{ 
          fontSize: '1rem', 
          color: '#9ca3af',
          fontWeight: '400'
        }}>
          ✅ Application Running Successfully
        </p>
      </div>
    </div>
  );
}

export default App;