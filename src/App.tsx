
import { StrictMode } from 'react';

const App = () => {
  console.log("App: Rendering basic app");
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Application Running</h1>
        <p className="text-gray-600">React is working correctly</p>
      </div>
    </div>
  );
};

export default App;
