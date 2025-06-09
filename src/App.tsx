
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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

console.log("App component rendering");
console.log("React in App:", React.version);
console.log("React object in App:", React);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log("App component function executing");
  
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    React.createElement(
      AuthProvider,
      null,
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(
          Routes,
          null,
          React.createElement(Route, { path: "/", element: React.createElement(Index) }),
          React.createElement(Route, { path: "/faq", element: React.createElement(FAQ) }),
          React.createElement(Route, { path: "/blog", element: React.createElement(Blog) }),
          React.createElement(Route, { path: "/blog/:slug", element: React.createElement(BlogPost) }),
          React.createElement(Route, { path: "/blog-admin", element: React.createElement(BlogAdmin) }),
          React.createElement(Route, { path: "/tools", element: React.createElement(Tools) }),
          React.createElement(Route, { path: "/appointment", element: React.createElement(Appointment) }),
          React.createElement(Route, { path: "/contact", element: React.createElement(Contact) }),
          React.createElement(Route, { path: "/profile", element: React.createElement(Profile) }),
          React.createElement(Route, { path: "/auth/callback", element: React.createElement(MicrosoftAuthCallback) }),
          React.createElement(Route, { path: "*", element: React.createElement(NotFound) })
        ),
        React.createElement(Toaster)
      )
    )
  );
};

export default App;
