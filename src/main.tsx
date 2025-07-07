
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root container missing in index.html')
}

console.log('Main: Starting React app render')

const root = createRoot(container)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

console.log('Main: React app render completed')
