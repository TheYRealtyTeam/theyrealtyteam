import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface MobileServiceTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const MobileServiceTile = ({ icon: Icon, title, description }: MobileServiceTileProps) => {
  return (
    <div className="snap-center shrink-0 w-72 bg-white rounded-xl p-4 shadow-md border border-gray-100">
      <div className="flex items-start gap-3 mb-3">
        <div className="bg-yrealty-accent/10 p-3 rounded-lg flex-shrink-0">
          <Icon className="h-6 w-6 text-yrealty-accent" />
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-semibold text-yrealty-navy leading-snug truncate" title={title}>
            {title}
          </h4>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed h-10 overflow-hidden">
        {description}
      </p>
      <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-yrealty-accent hover-scale">
        Learn More
        <ArrowRight size={14} />
      </a>
    </div>
  );
};

export default MobileServiceTile;
