// Fresh bootstrap file to completely bypass cache
const React = (window as any).React || (await import('react'));
const ReactDOM = (window as any).ReactDOM || (await import('react-dom/client'));

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Inline component to avoid any cached module issues
const App = () => {
  return React.createElement('div', {
    style: { 
      minHeight: '100vh', 
      backgroundColor: '#ffffff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }
  }, React.createElement('div', {
    style: { textAlign: 'center', padding: '2rem' }
  }, [
    React.createElement('h1', {
      key: 'title',
      style: { 
        fontSize: '3rem', 
        fontWeight: '700', 
        color: '#111827', 
        marginBottom: '1rem',
        lineHeight: '1.2'
      }
    }, 'Y Realty Team'),
    React.createElement('p', {
      key: 'subtitle',
      style: { 
        fontSize: '1.5rem', 
        color: '#6b7280', 
        marginBottom: '1rem',
        fontWeight: '400'
      }
    }, 'Property Management Nationwide'),
    React.createElement('p', {
      key: 'status',
      style: { 
        fontSize: '1rem', 
        color: '#9ca3af',
        fontWeight: '400'
      }
    }, '✅ Fresh Bootstrap Running')
  ]));
};

root.render(React.createElement(App));