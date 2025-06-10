
import React from 'react';

console.log("App.tsx: Loading App component");

const App = () => {
  console.log("App: Rendering basic app component");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-bold text-indigo-900 mb-8">Y Realty App</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic App Status</h2>
          <p className="text-gray-600 mb-6">✅ React is working correctly</p>
          <p className="text-gray-600 mb-6">✅ Basic JSX rendering works</p>
          <p className="text-gray-600">✅ Tailwind CSS is loading</p>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">Ready to investigate TooltipProvider issue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
