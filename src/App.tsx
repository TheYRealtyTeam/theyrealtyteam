
import React from 'react';

console.log("App.tsx: Loading App component");

const App = () => {
  console.log("App: Rendering clean app component");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-bold text-indigo-900 mb-8">Clean React App</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Application Status</h2>
          <p className="text-gray-600 mb-6">✅ React is working correctly</p>
          <p className="text-gray-600 mb-6">✅ No external dependencies loaded</p>
          <p className="text-gray-600">✅ Clean component tree</p>
        </div>
      </div>
    </div>
  );
};

export default App;
