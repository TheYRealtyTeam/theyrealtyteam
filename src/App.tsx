
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from '@/pages/Index';
import FAQ from '@/pages/FAQ';
import Blog from '@/pages/Blog';
import Tools from '@/pages/Tools';
import Contact from '@/pages/Contact';

console.log('App.tsx: Starting to load App component');

const App = () => {
  console.log('App: Starting to render App component');
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Index />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
