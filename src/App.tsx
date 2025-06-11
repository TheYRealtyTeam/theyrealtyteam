
import React from 'react';
import { Routes, Route } from 'react-router-dom';

console.log("App.tsx: Loading App component with routing");

const HomePage = () => {
  console.log("HomePage: Rendering home page component");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-bold text-indigo-900 mb-8">Y Realty App</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Application Status</h2>
          <p className="text-green-600 mb-4">✅ React is working correctly</p>
          <p className="text-green-600 mb-4">✅ React Router is working</p>
          <p className="text-green-600 mb-4">✅ Tailwind CSS is working</p>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">All systems operational!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  console.log("App: About to render Routes component");
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default App;
