import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Eager load critical routes
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load heavy routes for better performance
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const Tools = lazy(() => import("./pages/Tools"));
const Vacancies = lazy(() => import("./pages/Vacancies"));
const Appointment = lazy(() => import("./pages/Appointment"));
const Contact = lazy(() => import("./pages/Contact"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const MicrosoftAuthCallback = lazy(() => import("./components/appointment/MicrosoftAuthCallback"));

// Loading fallback component
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/faq" element={<Suspense fallback={<PageLoading />}><FAQ /></Suspense>} />
      <Route path="/blog" element={<Suspense fallback={<PageLoading />}><Blog /></Suspense>} />
      <Route path="/blog/:slug" element={<Suspense fallback={<PageLoading />}><BlogPost /></Suspense>} />
      <Route path="/blog-admin" element={<Suspense fallback={<PageLoading />}><BlogAdmin /></Suspense>} />
      <Route path="/tools" element={<Suspense fallback={<PageLoading />}><Tools /></Suspense>} />
      <Route path="/vacancies" element={<Suspense fallback={<PageLoading />}><Vacancies /></Suspense>} />
      <Route path="/appointment" element={<Suspense fallback={<PageLoading />}><Appointment /></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<PageLoading />}><Contact /></Suspense>} />
      <Route path="/profile" element={<Suspense fallback={<PageLoading />}><Profile /></Suspense>} />
      <Route path="/admin-login" element={<Suspense fallback={<PageLoading />}><AdminLogin /></Suspense>} />
      <Route path="/admin-dashboard" element={<Suspense fallback={<PageLoading />}><AdminDashboard /></Suspense>} />
      <Route path="/auth/callback" element={<Suspense fallback={<PageLoading />}><MicrosoftAuthCallback /></Suspense>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
