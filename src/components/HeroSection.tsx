
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const backgroundImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa';
  const fallbackImage = 'https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?q=80&w=1000';

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
      style={{ 
        backgroundImage: `url(${imageError ? fallbackImage : backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#121212', // Dark background for modern look
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '4rem',
      }}
    >
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10"></div>
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-yrealty-accent/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full bg-yrealty-blue/30 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-28 h-28 rounded-full bg-yrealty-accent/20 blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container-custom relative z-20">
        <div className="max-w-3xl text-white backdrop-blur-sm bg-black/10 p-8 rounded-2xl border border-white/10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white to-yrealty-accent">
            Next-Gen Property Management
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Leveraging AI and cutting-edge technology to revolutionize property management 
            across all 50 states with personalized, data-driven solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="#services" className="relative overflow-hidden group px-6 py-3 rounded-full bg-yrealty-accent text-black font-medium transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105">
              <span className="relative z-10">Explore Services</span>
              <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            <a href="#contact" className="px-6 py-3 rounded-full border border-white/50 backdrop-blur-sm bg-white/10 text-white font-medium transition-all hover:bg-white/20 hover:border-white hover:scale-105">
              Connect With Us
            </a>
          </div>
        </div>
      </div>

      {/* Modern scroll indicator */}
      <a 
        href="#about"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce z-20"
        aria-label="Scroll Down"
      >
        <div className="flex flex-col items-center">
          <span className="text-xs mb-2 tracking-widest">SCROLL</span>
          <ArrowDown size={24} className="animate-pulse" />
        </div>
      </a>
      
      {/* Futuristic decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 z-10 opacity-30 bg-gradient-to-t from-yrealty-accent/40 to-transparent"></div>
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-l from-yrealty-accent/5 to-transparent z-0"></div>
    </section>
  );
};

export default HeroSection;
