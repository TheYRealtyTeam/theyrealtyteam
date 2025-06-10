
import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';

const MobileHeroSection = () => {
  const { navigateToPage } = useSimpleNavigation();

  const handleGetStartedClick = () => {
    navigateToPage('/appointment');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:(845)734-3331';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-yrealty-navy via-yrealty-blue to-yrealty-accent overflow-hidden px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yrealty-accent/20 rounded-full blur-xl"></div>
      
      <div className="relative z-10 text-center text-white w-full max-w-lg">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Professional Property Management 
          <span className="block text-yrealty-accent mt-2">Nationwide</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-lg mb-6 text-gray-200 leading-relaxed">
          Maximize your investment returns with our comprehensive property management services across all 50 states.
        </p>
        
        {/* CTA Buttons */}
        <div className="space-y-3 mb-8">
          <button
            onClick={handleGetStartedClick}
            className="w-full bg-yrealty-accent text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yrealty-accent/90 transition-colors mobile-haptic-btn"
          >
            Get Started Today
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleCallClick}
            className="w-full bg-white/20 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/30 hover:bg-white/30 transition-colors mobile-haptic-btn"
          >
            <Phone className="h-5 w-5" />
            Call (845) 734-3331
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="text-xl font-bold text-yrealty-accent mb-1">50+</div>
            <div className="text-xs text-gray-200">States</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="text-xl font-bold text-yrealty-accent mb-1">24/7</div>
            <div className="text-xs text-gray-200">Support</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="text-xl font-bold text-yrealty-accent mb-1">100%</div>
            <div className="text-xs text-gray-200">Transparent</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileHeroSection;
