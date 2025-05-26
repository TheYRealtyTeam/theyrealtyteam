
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Star, Users } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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

  return (
    <section 
      id="home" 
      ref={heroRef} 
      aria-label="Welcome to Y Realty Team" 
      className={`
        relative h-screen bg-cover bg-center bg-no-repeat flex items-center pt-16 transition-opacity duration-700
        ${isImageLoaded ? 'opacity-100' : 'opacity-0 bg-gradient-to-r from-yrealty-navy to-yrealty-blue'}
      `} 
      style={{
        backgroundImage: isImageLoaded ? "url('https://images.unsplash.com/photo-1551361415-69c87624334f?auto=format&fit=crop&q=80&w=1920')" : 'none'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yrealty-navy/85 to-yrealty-navy/50"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl text-white">
          {/* Simple trust indicators */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm md:text-base animate-fade-in opacity-90">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.9/5 Client Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="font-medium">500+ Properties Managed</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            Premier Property Management 
            <span className="block text-yrealty-accent">Nationwide</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 animate-fade-in leading-relaxed max-w-3xl" style={{
            animationDelay: '0.2s'
          }}>
            Elevating property management to new heights across all 50 states with exceptional service, 
            cutting-edge technology, and a client-first approach that maximizes your investment returns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{
            animationDelay: '0.4s'
          }}>
            <a href="#services" className="btn-accent text-lg px-8 py-4 font-bold">
              Explore Our Services
            </a>
            <a href="#contact" className="btn-outline border-white text-white hover:bg-white hover:text-yrealty-navy text-lg px-8 py-4 font-bold">
              Get Free Consultation
            </a>
          </div>

          {/* Clean testimonial */}
          <div className="mt-10 animate-fade-in" style={{
            animationDelay: '0.5s'
          }}>
            <p className="text-lg mb-4 opacity-90">
              "Y Realty Team transformed our property portfolio. 15% income increase and zero vacancy months." 
              <span className="block mt-2 font-medium">- Sarah M., Commercial Investor</span>
            </p>
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
