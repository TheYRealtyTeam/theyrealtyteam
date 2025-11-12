
import React from 'react';
import MobileServicesHeader from './services/MobileServicesHeader';
import MobileValueProposition from './services/MobileValueProposition';
import MobileServiceCard from './MobileServiceCard';
import MobileQuickActions from './services/MobileQuickActions';
import MobileSuccessStats from './services/MobileSuccessStats';
import { residentialServices, commercialServices } from './services/servicesData';

const MobileServicesSection = () => {
  const allServices = [...residentialServices, ...commercialServices];
  
  return (
    <section id="services" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <MobileServicesHeader />
        <MobileValueProposition />
        
        <div className="space-y-4 mb-12">
          {allServices.map((service, index) => (
            <MobileServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
        
        <MobileQuickActions />
        <MobileSuccessStats />
      </div>
    </section>
  );
};

export default MobileServicesSection;
