
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PropertiesSection from '@/components/PropertiesSection';
import AreasSection from '@/components/AreasSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AnimationObserver from '@/utils/AnimationObserver';

const Index = () => {
  // Set page title
  useEffect(() => {
    document.title = "Y Realty Team | Premium Property Management in New York & New Jersey";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PropertiesSection />
        <AreasSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <AnimationObserver />
    </div>
  );
};

export default Index;
