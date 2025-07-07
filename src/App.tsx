import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Index from './pages/Index'
import Areas from './pages/Areas'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import Tools from './pages/Tools'
import Contact from './pages/Contact'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Index />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  )
}

export default App