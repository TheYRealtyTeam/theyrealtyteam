
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogAdmin from "./pages/BlogAdmin";
import Tools from "./pages/Tools";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MicrosoftAuthCallback from "./components/appointment/MicrosoftAuthCallback";
import Profile from "./pages/Profile";

console.log('App.tsx loading...');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/blog-admin" element={<BlogAdmin />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth/callback" element={<MicrosoftAuthCallback />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
