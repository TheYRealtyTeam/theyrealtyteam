
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/lovable-uploads/602cfbe2-3949-47ef-85ba-55108fea7906.png" 
        alt="Y Realty Team Logo" 
        className="h-12 w-auto" 
      />
      <span className="font-heading font-bold text-xl text-yrealty-navy">Y REALTY TEAM</span>
    </div>
  );
};

export default Logo;
