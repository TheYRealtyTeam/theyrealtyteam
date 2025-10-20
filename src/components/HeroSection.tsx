import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useIsMobileOptimized } from '@/hooks/useIsMobileOptimized';
import MobileHeroSection from './mobile/MobileHeroSection';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { isMobileOnly } = useIsMobileOptimized();

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1551361415-69c87624334f?auto=format&fit=crop&q=80&w=1920";
    img.onload = () => setIsImageLoaded(true);

    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollTop = window.scrollY;
      const parallaxOffset = scrollTop * 0.4;
      requestAnimationFrame(() => {
        if (heroRef.current) {
          heroRef.current.style.backgroundPositionY = `-${parallaxOffset}px`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Return mobile-optimized version only for phones, not tablets
  if (isMobileOnly) {
    return <MobileHeroSection />;
  }

  // Desktop version (keep existing code)
  return (
    <section 
      id="home" 
      ref={heroRef} 
      aria-label="Welcome to Y Realty Team" 
      className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center pt-16 bg-gradient-to-r from-yrealty-navy to-yrealty-blue"
      style={{
        backgroundImage: isImageLoaded ? "url('https://images.unsplash.com/photo-1551361415-69c87624334f?auto=format&fit=crop&q=80&w=1920')" : 'none'
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-yrealty-navy/85 to-yrealty-navy/50 transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ opacity: 1 }}>
            Premier Property Management 
            <span className="block text-yrealty-accent">Nationwide</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl animate-fade-in" style={{
            animationDelay: '0.2s',
            animationFillMode: 'both'
          }}>
            Elevating property management to new heights nationwide with 
            exceptional service, innovative solutions, and a client-first approach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{
            animationDelay: '0.4s',
            animationFillMode: 'both'
          }}>
            <a href="#services" className="btn-accent text-lg px-8 py-4 font-bold">
              Our Services
            </a>
            <a href="#contact" className="btn-outline border-white text-white hover:bg-white hover:text-yrealty-navy bg-white/20 backdrop-blur-md shadow-lg text-lg px-8 py-4 font-bold">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce" aria-label="Scroll Down to About Section">
        <ArrowDown size={32} />
      </a>
    </section>
  );
};

export default HeroSection;
