
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Phone, MessageCircle } from 'lucide-react';

const MobileHeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1551361415-69c87624334f?auto=format&fit=crop&q=80&w=1920";
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef} 
      aria-label="Welcome to Y Realty Team" 
      className={`
        relative h-[70vh] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-start px-4 pt-20 transition-opacity duration-700
        ${isImageLoaded ? 'opacity-100' : 'opacity-0 bg-gradient-to-br from-yrealty-navy to-yrealty-blue'}
      `} 
      style={{
        backgroundImage: isImageLoaded ? "url('https://images.unsplash.com/photo-1551361415-69c87624334f?auto=format&fit=crop&q=80&w=1920')" : 'none'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yrealty-navy/90 to-yrealty-navy/60"></div>
      
      <div className="relative z-10 w-full max-w-sm mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-white animate-fade-in leading-tight">
          Premier Property 
          <span className="block text-yrealty-accent text-4xl mt-2">Management</span>
          <span className="block text-2xl mt-1 font-medium">Nationwide</span>
        </h1>
        
        <p className="text-base mb-8 text-white/90 animate-fade-in leading-relaxed px-2" style={{
          animationDelay: '0.2s'
        }}>
          Exceptional service across all 50 states with a client-first approach.
        </p>
        
        <div className="space-y-4 animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
          <a 
            href="tel:(845)734-3331" 
            className="w-full bg-yrealty-accent hover:bg-yrealty-accent/90 text-white text-lg px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Phone size={20} />
            Call Now
          </a>
          
          <a 
            href="#contact" 
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 text-lg px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300"
          >
            <MessageCircle size={20} />
            Get Started
          </a>
        </div>
      </div>

      <a 
        href="#about" 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white animate-bounce" 
        aria-label="Scroll Down to About Section"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default MobileHeroSection;
