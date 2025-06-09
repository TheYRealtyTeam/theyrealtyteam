
import React from 'react';
import { Home, Building } from 'lucide-react';
import MobileServicesHeader from './services/MobileServicesHeader';
import MobileValueProposition from './services/MobileValueProposition';
import MobileServiceCategory from './services/MobileServiceCategory';
import MobileQuickActions from './services/MobileQuickActions';
import MobileSuccessStats from './services/MobileSuccessStats';
import { residentialServices, commercialServices } from './services/servicesData';

const MobileServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <MobileServicesHeader />
        <MobileValueProposition />
        
        <MobileServiceCategory 
          icon={Home}
          title="Residential"
          services={residentialServices}
        />
        
        <MobileServiceCategory 
          icon={Building}
          title="Commercial"
          services={commercialServices}
        />
        
        <MobileQuickActions />
        <MobileSuccessStats />
      </div>
    </section>
  );
};

export default MobileServicesSection;
