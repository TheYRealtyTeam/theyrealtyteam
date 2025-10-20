
import React from 'react';
import { Globe } from 'lucide-react';

const Logo = ({ className = "", showDomain = true }: { className?: string, showDomain?: boolean }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/lovable-uploads/logo-96x96.png" 
        alt="Y Realty Team Logo" 
        className="h-12 w-auto"
        width="48"
        height="48"
        loading="eager"
        decoding="async"
      />
      <div className="flex flex-col">
        <span className="font-heading font-bold text-xl tracking-wider">Y REALTY TEAM</span>
        {showDomain && (
          <div className="flex items-center gap-1 text-xs opacity-75">
            <Globe size={12} className="text-yrealty-accent" />
            <span>theyteam.co</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
