
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from '@/pages/Index';

console.log('App.tsx: Starting to load App component');

const App = () => {
  console.log('App: Starting to render App component');
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Index />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
