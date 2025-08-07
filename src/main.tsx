import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

// Route-based code splitting
const Index = lazy(() => import('./pages/Index'));
const Areas = lazy(() => import('./pages/Areas'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Tools = lazy(() => import('./pages/Tools'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BlogAdmin = lazy(() => import('./pages/BlogAdmin'));
const Appointment = lazy(() => import('./pages/Appointment'));
const NotFound = lazy(() => import('./pages/NotFound'));

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<div style={{padding:'2rem',textAlign:'center'}}>Loading…</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog-admin" element={<BlogAdmin />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
