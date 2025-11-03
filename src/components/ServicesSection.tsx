import React from 'react';
import { Building, Home } from 'lucide-react';
import { useIsMobileOptimized } from '@/hooks/useIsMobileOptimized';
import MobileServicesSection from './mobile/MobileServicesSection';
import ValueProposition from './services/ValueProposition';
import CaseStudies from './services/CaseStudies';
import TechnologyStack from './services/TechnologyStack';
import ServiceCard from './services/ServiceCard';
import { getAllServices } from './services/servicesData';

const ServicesSection = () => {
  const { isMobileOnly } = useIsMobileOptimized();

  // Return mobile-optimized version only for phones, not tablets
  if (isMobileOnly) {
    return <MobileServicesSection />;
  }

  const allServices = getAllServices();

  // Desktop version
  return (
    <section id="services" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Enhanced header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-yrealty-navy reveal">
            Our Comprehensive Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto reveal leading-relaxed">
            Full-service property management for residential and commercial properties
          </p>
          
          <ValueProposition />
        </div>

        <CaseStudies />

        {/* Property types badge */}
        <div className="flex justify-center items-center gap-6 mb-12">
          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md border border-gray-200">
            <Home className="h-6 w-6 text-yrealty-accent" />
            <span className="font-bold text-yrealty-navy">Residential Properties</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md border border-gray-200">
            <Building className="h-6 w-6 text-yrealty-accent" />
            <span className="font-bold text-yrealty-navy">Commercial Properties</span>
          </div>
        </div>

        {/* All Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {allServices.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title} 
              description={service.description} 
              icon={service.icon} 
              features={service.features}
              pricing={service.pricing}
            />
          ))}
        </div>

        <TechnologyStack />

        {/* Enhanced CTA with pricing emphasis */}
        <div className="mt-20 text-center reveal">
          <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-12 rounded-2xl text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Transparent, All-Inclusive Property Management?
            </h3>
            <p className="text-xl mb-8 opacity-95 max-w-3xl mx-auto">
              Join hundreds of satisfied property owners who love our straightforward pricing with everything included. 
              Get your free consultation and discover how much you can save with our transparent approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-accent bg-white text-yrealty-navy hover:bg-gray-100 text-lg px-8 py-4 font-bold">
                Get Free Consultation
              </a>
              <a href="tel:(845)734-3331" className="btn-outline border-white text-white hover:bg-white hover:text-yrealty-navy text-lg px-8 py-4 font-bold">
                Call (845) 734-3331
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
