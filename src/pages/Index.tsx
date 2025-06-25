
import React, { useEffect, Suspense } from 'react';

// Lazy load components to prevent initialization issues
const Navbar = React.lazy(() => import('@/components/Navbar'));
const HeroSection = React.lazy(() => import('@/components/HeroSection'));
const AboutSection = React.lazy(() => import('@/components/AboutSection'));
const ServicesSection = React.lazy(() => import('@/components/ServicesSection'));
const AreasSection = React.lazy(() => import('@/components/AreasSection'));
const TestimonialsSection = React.lazy(() => import('@/components/TestimonialsSection'));
const ContactSection = React.lazy(() => import('@/components/ContactSection'));
const Footer = React.lazy(() => import('@/components/Footer'));
const AIChat = React.lazy(() => import('@/components/chat/AIChat'));
const AnimationObserver = React.lazy(() => import('@/utils/AnimationObserver'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yrealty-navy"></div>
  </div>
);

const Index = () => {
  useEffect(() => {
    try {
      document.title = "Y Realty Team | Premium Property Management Nationwide";
      
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Y Realty Team offers premium property management services across all 50 states. Expert tenant placement, maintenance coordination, and financial reporting for residential and commercial properties.';
      document.head.appendChild(metaDescription);
      
      const canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = 'https://theYteam.co';
      document.head.appendChild(canonicalLink);
      
      return () => {
        const existingCanonical = document.querySelector('link[rel="canonical"]');
        const existingDescription = document.querySelector('meta[name="description"]');
        if (existingCanonical) {
          document.head.removeChild(existingCanonical);
        }
        if (existingDescription) {
          document.head.removeChild(existingDescription);
        }
      };
    } catch (error) {
      console.error('Error setting up page metadata:', error);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<LoadingSpinner />}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <AreasSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <AIChat />
        <AnimationObserver />
      </Suspense>
    </div>
  );
};

export default Index;
