
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundImage = '/lovable-uploads/a5037dad-b649-4bbb-8c0c-55b142bb5ecb.png';
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      console.log('Hero background image loaded successfully:', backgroundImage);
      setIsLoaded(true);
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
      className="relative h-screen flex items-center pt-16"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#2e3440', // Fallback color
      }}
    >
      {/* Modern gradient overlay with vibrant colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-yrealty-navy/90 via-yrealty-navy/70 to-blue-900/50"></div>
      
      {/* Animated pattern overlay for futuristic feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAg')] bg-opacity-10 mix-blend-overlay"></div>
      
      {/* Floating gradient shapes - purely decorative */}
      <div className="absolute top-1/4 left-[15%] w-64 h-64 rounded-full bg-blue-500/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-purple-500/10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl text-white">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-sm font-medium text-white/90 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
              AI-Powered Property Management
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 animate-fade-in">
            Premier Property <span className="relative">
              Management
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-yrealty-accent to-blue-400 rounded-full"></span>
            </span> Nationwide
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white/80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Elevating property management to new heights across all 50 states with 
            <span className="font-semibold text-white"> AI-driven solutions</span>, 
            <span className="font-semibold text-white"> predictive analytics</span>, and a 
            <span className="font-semibold text-white"> client-first approach</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="#services" className="btn-accent relative overflow-hidden group">
              <span className="relative z-10">Our Services</span>
              <span className="absolute inset-0 bg-gradient-to-r from-yrealty-accent via-blue-500 to-yrealty-accent bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></span>
            </a>
            <a href="#contact" className="btn-outline backdrop-blur-sm border-white/30 bg-white/10 text-white hover:bg-white hover:text-yrealty-navy transition-all duration-300">
              Contact Us
            </a>
          </div>
        </div>
        
        {/* Modern floating feature cards */}
        <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 space-y-4 w-72">
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 transform hover:-translate-y-1 transition-all animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yrealty-accent to-blue-500 flex items-center justify-center mb-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-white font-medium mb-1">AI-Driven Management</h3>
            <p className="text-white/70 text-sm">Leveraging artificial intelligence for optimal property performance</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 transform hover:-translate-y-1 transition-all animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h3 className="text-white font-medium mb-1">Predictive Analytics</h3>
            <p className="text-white/70 text-sm">Stay ahead with market trends and property forecasting</p>
          </div>
        </div>
      </div>

      <a 
        href="#about"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce bg-white/10 backdrop-blur-sm p-2 rounded-full"
        aria-label="Scroll Down"
      >
        <ArrowDown size={24} />
      </a>
      
      {/* Add a subtle animated wave effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto opacity-20">
          <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
