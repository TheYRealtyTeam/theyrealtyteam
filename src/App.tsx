
import React from 'react';

const App = () => {
  console.log("App component rendering - completely fresh");
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-800">Fresh App Start!</h1>
    </div>
  );
};

export default App;
