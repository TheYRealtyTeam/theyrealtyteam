
import React, { useEffect, Suspense } from 'react';

// Safe imports with fallbacks
const SafeNavbar = React.lazy(() => import('@/components/navbar/SafeNavbar'));
const HeroSection = React.lazy(() => import('@/components/HeroSection'));
const AboutSection = React.lazy(() => import('@/components/AboutSection'));
const ServicesSection = React.lazy(() => import('@/components/ServicesSection'));
const AreasSection = React.lazy(() => import('@/components/AreasSection'));
const TestimonialsSection = React.lazy(() => import('@/components/TestimonialsSection'));
const ContactSection = React.lazy(() => import('@/components/ContactSection'));
const Footer = React.lazy(() => import('@/components/Footer'));
const AIChat = React.lazy(() => import('@/components/chat/AIChat'));
const AnimationObserver = React.lazy(() => import('@/utils/AnimationObserver'));

// Enhanced loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yrealty-navy mx-auto mb-4"></div>
      <p className="text-gray-600">Loading Y Realty Team...</p>
    </div>
  </div>
);

// Component-specific loading fallbacks
const SectionLoader = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-gray-50 animate-pulse flex items-center justify-center`}>
    <div className="text-gray-400">Loading section...</div>
  </div>
);

const Index = () => {
  useEffect(() => {
    try {
      console.log('Index: Setting up page metadata');
      document.title = "Y Realty Team | Premium Property Management Nationwide";
      
      // Clean up any existing meta tags first
      const existingDescription = document.querySelector('meta[name="description"]');
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      
      if (existingDescription) {
        existingDescription.remove();
      }
      if (existingCanonical) {
        existingCanonical.remove();
      }
      
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Y Realty Team offers premium property management services across all 50 states. Expert tenant placement, maintenance coordination, and financial reporting for residential and commercial properties.';
      document.head.appendChild(metaDescription);
      
      const canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = 'https://theYteam.co';
      document.head.appendChild(canonicalLink);
      
      console.log('Index: Page metadata set successfully');
      
      return () => {
        console.log('Index: Cleaning up metadata');
        const description = document.querySelector('meta[name="description"]');
        const canonical = document.querySelector('link[rel="canonical"]');
        if (description) description.remove();
        if (canonical) canonical.remove();
      };
    } catch (error) {
      console.error('Index: Error setting up page metadata:', error);
    }
  }, []);

  console.log('Index: Rendering page');

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<SectionLoader height="h-20" />}>
        <SafeNavbar />
      </Suspense>
      
      <main>
        <Suspense fallback={<SectionLoader height="h-screen" />}>
          <HeroSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AreasSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      
      <Suspense fallback={<SectionLoader height="h-32" />}>
        <Footer />
      </Suspense>
      
      <Suspense fallback={null}>
        <AIChat />
      </Suspense>
      
      <Suspense fallback={null}>
        <AnimationObserver />
      </Suspense>
    </div>
  );
};

export default Index;
