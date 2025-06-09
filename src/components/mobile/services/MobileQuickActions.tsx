
import React from 'react';
import { Phone, MapPin } from 'lucide-react';

const MobileQuickActions = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mb-8">
      <a 
        href="tel:(845)734-3331"
        className="bg-yrealty-accent text-white p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg font-semibold"
      >
        <Phone size={20} />
        Call Now: (845) 734-3331
      </a>
      <a 
        href="#contact"
        className="bg-white border-2 border-yrealty-accent text-yrealty-accent p-4 rounded-xl flex items-center justify-center gap-3 font-semibold"
      >
        <MapPin size={20} />
        Get Free Consultation
      </a>
    </div>
  );
};

export default MobileQuickActions;
