import React from 'react';
import { createRoot } from 'react-dom/client';

// Fresh restart - completely bypassing any cached modules
function SimpleApp() {
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
    }, '✅ Cache-Free Application Running')
  ]));
}

const root = createRoot(document.getElementById('root')!);
root.render(React.createElement(SimpleApp));