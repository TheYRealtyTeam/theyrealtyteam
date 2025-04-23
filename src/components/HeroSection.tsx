
import React, { useEffect, useRef, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundImage = '/lovable-uploads/e9e9f4f5-6b55-4991-b9c9-683b4dd9b906.png';

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      console.log('Hero background image loaded successfully:', backgroundImage);
    };
    img.onerror = (error) => {
      console.error('Hero background image failed to load:', {
        src: backgroundImage,
        error: error
      });
    };
  }, [backgroundImage]);

  const handleScroll = useCallback(() => {
    if (!heroRef.current) return;
    const scrollTop = window.scrollY;
    if (scrollTop < window.innerHeight * 1.5) {
      const parallaxOffset = scrollTop * 0.4;
      heroRef.current.style.backgroundPositionY = `-${parallaxOffset}px`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative h-screen bg-cover bg-center flex items-center pt-16"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#2e3440', // Darker fallback color to match the image
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
