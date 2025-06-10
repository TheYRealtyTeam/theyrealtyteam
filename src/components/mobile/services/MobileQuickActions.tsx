
import React from 'react';
import { Phone, MapPin } from 'lucide-react';

const MobileQuickActions = () => {
  const handleCallClick = () => {
    window.location.href = 'tel:(845)734-3331';
  };

  const handleContactClick = () => {
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

  return (
    <div className="grid grid-cols-1 gap-4 mb-8">
      <button 
        onClick={handleCallClick}
        className="bg-yrealty-accent text-white p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg font-semibold"
      >
        <Phone size={20} />
        Call Now: (845) 734-3331
      </button>
      <button 
        onClick={handleContactClick}
        className="bg-white border-2 border-yrealty-accent text-yrealty-accent p-4 rounded-xl flex items-center justify-center gap-3 font-semibold"
      >
        <MapPin size={20} />
        Get Free Consultation
      </button>
    </div>
  );
};

export default MobileQuickActions;
