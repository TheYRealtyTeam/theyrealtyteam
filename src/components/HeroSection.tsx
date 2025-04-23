
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const backgroundImage = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625';
  const fallbackImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80';

  // Preload the image to handle potential loading errors
  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onerror = () => {
      console.warn('Hero background image failed to load, using fallback');
      setImageError(true);
    };
  }, []);

  // Memoize scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (!heroRef.current) return;
    const scrollTop = window.scrollY;
    // Apply parallax effect to background, with safeguards for performance
    if (scrollTop < window.innerHeight * 1.5) { // Only apply when near viewport
      const parallaxOffset = scrollTop * 0.4;
      heroRef.current.style.backgroundPositionY = `-${parallaxOffset}px`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true }); // Performance optimization
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative h-screen bg-cover bg-center flex items-center pt-16"
      style={{ 
        backgroundImage: `url(${imageError ? fallbackImage : backgroundImage})`,
        backgroundColor: '#4a5568', // Fallback color
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yrealty-navy/80 to-yrealty-navy/40"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Premier Property Management Nationwide
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Elevating property management to new heights across all 50 states with exceptional service, 
            innovative solutions, and a client-first approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="#services" className="btn-accent">
              Our Services
            </a>
            <a href="#contact" className="btn-outline border-white text-white hover:bg-white hover:text-yrealty-navy">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <a 
        href="#about"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll Down"
      >
        <ArrowDown size={32} />
      </a>
    </section>
  );
};

export default HeroSection;
