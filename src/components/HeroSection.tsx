
import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';

const HeroSection = () => {
  const { navigateToPage, scrollToSection } = useSimpleNavigation();

  const handleGetStartedClick = () => {
    navigateToPage('/appointment');
  };

  const handleLearnMoreClick = () => {
    scrollToSection('about');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:(845)734-3331';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-yrealty-navy via-yrealty-blue to-yrealty-accent overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yrealty-accent/20 rounded-full blur-2xl"></div>
      
      <div className="container-custom relative z-10 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight reveal">
            Professional Property Management 
            <span className="block text-yrealty-accent">Nationwide</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed reveal">
            Maximize your investment returns with our comprehensive property management services. 
            Operating in all 50 states with local expertise and national reach.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 reveal">
            <button
              onClick={handleGetStartedClick}
              className="btn-primary text-lg px-8 py-4 font-bold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Get Started Today
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleCallClick}
              className="btn-secondary text-lg px-8 py-4 font-bold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Phone className="h-5 w-5" />
              (845) 734-3331
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center reveal">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-yrealty-accent mb-2">50+</div>
              <div className="text-gray-200">States Covered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-yrealty-accent mb-2">24/7</div>
              <div className="text-gray-200">Support Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-yrealty-accent mb-2">100%</div>
              <div className="text-gray-200">Transparent Pricing</div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 reveal">
            <button
              onClick={handleLearnMoreClick}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Learn more"
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-sm">Learn More</span>
                <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
