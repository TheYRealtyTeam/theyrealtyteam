
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering - minimal version");
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">App is working!</h1>
      </div>
    </QueryClientProvider>
  );
};

export default App;
