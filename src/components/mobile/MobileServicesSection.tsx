
import React, { useState } from 'react';
import MobileServicesHeader from './services/MobileServicesHeader';
import MobileValueProposition from './services/MobileValueProposition';
import MobileServiceCard from './MobileServiceCard';
import MobileQuickActions from './services/MobileQuickActions';
import MobileSuccessStats from './services/MobileSuccessStats';
import MobileServiceScroller from './MobileServiceScroller';
import { residentialServices, commercialServices } from './services/servicesData';

const MobileServicesSection = () => {
  const [showAll, setShowAll] = useState(false);
  const allServices = [...residentialServices, ...commercialServices];
  
  return (
    <section id="services" className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <MobileServicesHeader />
        <MobileServiceScroller />
        <MobileQuickActions />

        <div className="text-center mt-4 mb-8">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-yrealty-accent text-yrealty-accent font-semibold active:scale-95"
          >
            {showAll ? 'Hide Full List' : 'View All Services'}
          </button>
        </div>

        {showAll && (
          <div className="animate-fade-in">
            <MobileValueProposition />
            <div className="space-y-4 mb-8">
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
            <MobileSuccessStats />
          </div>
        )}
      </div>
    </section>
  );
};

export default MobileServicesSection;
