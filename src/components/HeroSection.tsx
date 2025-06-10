
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileHeroSection from './mobile/MobileHeroSection';

const HeroSection = () => {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
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

  const handleServicesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  const handleAboutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('about');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  // Return mobile-optimized version for mobile devices
  if (isMobile) {
    return <MobileHeroSection />;
  }

  // Desktop version
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            Premier Property Management 
            <span className="block text-yrealty-accent">Nationwide</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 animate-fade-in leading-relaxed max-w-3xl" style={{
            animationDelay: '0.2s'
          }}>
            Elevating property management to new heights across all 50 states with 
            exceptional service, innovative solutions, and a client-first approach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{
            animationDelay: '0.4s'
          }}>
            <button onClick={handleServicesClick} className="btn-accent text-lg px-8 py-4 font-bold">
              Our Services
            </button>
            <button onClick={handleContactClick} className="btn-outline border-white text-white hover:bg-white hover:text-yrealty-navy text-lg px-8 py-4 font-bold">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <button onClick={handleAboutClick} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce" aria-label="Scroll Down to About Section">
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
