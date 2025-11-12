import React from 'react';
import MobileServiceTile from './MobileServiceTile';
import { residentialServices, commercialServices } from './services/servicesData';

const MobileServiceScroller = () => {
  const allServices = [...residentialServices, ...commercialServices];
  return (
    <section aria-label="Explore our services" className="mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-lg font-semibold text-yrealty-navy">Popular Services</h3>
      </div>
      <div className="-mx-4 px-4">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
          {allServices.map((s, i) => (
            <MobileServiceTile key={i} icon={s.icon} title={s.title} description={s.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileServiceScroller;
