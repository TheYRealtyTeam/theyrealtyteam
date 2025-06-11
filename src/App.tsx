
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SimpleAuthProvider } from '@/contexts/SimpleAuthContext';
import { Toaster } from 'sonner';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import Index from '@/pages/Index';

console.log('App.tsx: Starting to load App component');

const HomePage = () => {
  console.log('HomePage: Rendering HomePage component');
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-bold text-indigo-900 mb-8">Y Realty App</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Application Status</h2>
          <p className="text-green-600 mb-4">✅ React is working correctly</p>
          <p className="text-green-600 mb-4">✅ React Router is working</p>
          <p className="text-green-600 mb-4">✅ Tailwind CSS is working</p>
          <p className="text-green-600 mb-4">✅ Authentication is working</p>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">All systems operational!</p>
          </div>
          <div className="mt-6 space-x-4">
            <a 
              href="/auth" 
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </a>
            <a 
              href="/profile" 
              className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  console.log('App: Starting to render App component with SimpleAuthProvider');
  
  return (
    <SimpleAuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Index />} />
      </Routes>
      <Toaster />
    </SimpleAuthProvider>
  );
};

export default App;
