
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Phone, MessageCircle } from 'lucide-react';

const MobileHeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const supportsWebP = document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0;
    
    const img = new Image();
    const imageUrl = supportsWebP
      ? "https://images.unsplash.com/photo-1551361415-69c87624334f?auto=format&fit=crop&q=80&w=1920&fm=webp"
      : "https://images.unsplash.com/photo-1551361415-69c87624334f?auto=format&fit=crop&q=80&w=1920";
    
    img.src = imageUrl;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef} 
      aria-label="Welcome to Y Realty Team" 
      className={`
        relative min-h-[85vh] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-start px-6 pt-20 pb-16 transition-opacity duration-700
        ${isImageLoaded ? 'opacity-100' : 'opacity-0 bg-gradient-to-br from-yrealty-navy to-yrealty-blue'}
      `}
      style={{
        backgroundImage: isImageLoaded 
          ? "url('https://images.unsplash.com/photo-1551361415-69c87624334f?auto=format&fit=crop&q=80&w=1920&fm=webp')" 
          : 'none'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yrealty-navy/90 to-yrealty-navy/60"></div>
      
      <div className="relative z-10 w-full max-w-md mx-auto text-center px-2">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white animate-fade-in leading-tight">
          <span className="block">Premier Property</span>
          <span className="block text-yrealty-accent text-4xl sm:text-5xl mt-3 break-words">Management</span>
          <span className="block text-xl sm:text-2xl mt-3 font-medium">Nationwide</span>
        </h1>
        
        <p className="text-base sm:text-lg mb-10 text-white/90 animate-fade-in leading-relaxed" style={{
          animationDelay: '0.2s'
        }}>
          Exceptional service with a client-first approach.
        </p>
        
        <div className="space-y-5 animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
          <a 
            href="tel:(845)734-3331" 
            className="block w-full bg-yrealty-accent active:bg-yrealty-accent/80 text-white text-base sm:text-lg px-6 py-5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl transition-all duration-200 active:scale-95 min-h-[56px]"
          >
            <Phone size={20} />
            <span className="break-words">Call: (845) 734-3331</span>
          </a>
          
          <a 
            href="#contact" 
            className="block w-full bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white active:bg-white/20 text-base sm:text-lg px-6 py-5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 min-h-[56px]"
          >
            <MessageCircle size={20} />
            <span>Get Free Consultation</span>
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
