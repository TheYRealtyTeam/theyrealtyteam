
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import AreasSection from '@/components/AreasSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AIChat from '@/components/chat/AIChat';
import AnimationObserver from '@/utils/AnimationObserver';
import MobileBottomNavigation from '@/components/mobile/MobileBottomNavigation';
import MobilePullToRefresh from '@/components/mobile/MobilePullToRefresh';
import MobilePWAPrompt from '@/components/mobile/MobilePWAPrompt';
import MobileOfflineIndicator from '@/components/mobile/MobileOfflineIndicator';
import { useIsMobileOptimized } from '@/hooks/useIsMobileOptimized';

const Index = () => {
  // Add debugging before calling the hook
  console.log('Index component rendering, React available:', !!React);
  console.log('About to call useIsMobileOptimized hook');
  
  const { isMobile } = useIsMobileOptimized();

  // Debug logging
  console.log('Index component rendering, isMobile:', isMobile);

  useEffect(() => {
    document.title = "Y Realty Team | Premium Property Management Nationwide";
    
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Y Realty Team offers premium property management services across all 50 states. Expert tenant placement, maintenance coordination, and financial reporting for residential and commercial properties.';
    document.head.appendChild(metaDescription);
    
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = 'https://theYteam.co';
    document.head.appendChild(canonicalLink);

    // Add PWA manifest link
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);

    // Add theme color meta tag
    const themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    themeColor.content = '#1e3a8a';
    document.head.appendChild(themeColor);
    
    return () => {
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      const existingDescription = document.querySelector('meta[name="description"]');
      const existingManifest = document.querySelector('link[rel="manifest"]');
      const existingThemeColor = document.querySelector('meta[name="theme-color"]');
      
      if (existingCanonical) document.head.removeChild(existingCanonical);
      if (existingDescription) document.head.removeChild(existingDescription);
      if (existingManifest) document.head.removeChild(existingManifest);
      if (existingThemeColor) document.head.removeChild(existingThemeColor);
    };
  }, []);

  const handleRefresh = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        window.location.reload();
        resolve();
      }, 1000);
    });
  };

  const mainContent = (
    <div style={{ paddingBottom: isMobile ? '80px' : '0' }} className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
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
      {isMobile && (
        <>
          <MobilePWAPrompt />
          <MobileOfflineIndicator />
        </>
      )}
    </div>
  );

  const content = isMobile ? (
    <MobilePullToRefresh onRefresh={handleRefresh}>
      {mainContent}
    </MobilePullToRefresh>
  ) : mainContent;

  return (
    <>
      {content}
      {isMobile && <MobileBottomNavigation />}
    </>
  );
};

export default Index;
