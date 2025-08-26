
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
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
  const { isMobile } = useIsMobileOptimized();

  useEffect(() => {
    document.title = "Y Realty Team | Premium Property Management Nationwide";
    
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Y Realty Team offers premium property management services nationwide. Expert tenant placement, maintenance coordination, and financial reporting for residential and commercial properties.';
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

  const content = (
    <div className={`min-h-screen flex flex-col ${isMobile ? 'pb-16' : ''}`}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <AIChat />
      <AnimationObserver />
      {isMobile && <MobileBottomNavigation />}
      {isMobile && <MobilePWAPrompt />}
      {isMobile && <MobileOfflineIndicator />}
    </div>
  );

  return isMobile ? (
    <MobilePullToRefresh onRefresh={handleRefresh}>
      {content}
    </MobilePullToRefresh>
  ) : content;
};

export default Index;
