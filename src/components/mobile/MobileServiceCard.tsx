
import React, { useState } from 'react';
import { LucideIcon, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface MobileServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  className?: string;
}

const MobileServiceCard = ({ icon: Icon, title, description, features, className = '' }: MobileServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white rounded-xl p-5 shadow-md border border-gray-100 ${className}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="bg-yrealty-accent/10 p-3 rounded-lg flex-shrink-0">
          <Icon className="h-6 w-6 text-yrealty-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-yrealty-navy leading-tight mb-1">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      
      {/* Expandable Features Section */}
      <div className="mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg font-medium text-yrealty-navy text-sm active:bg-gray-100 transition-colors"
        >
          <span>Key Features</span>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isExpanded && (
          <div className="mt-3 space-y-2.5 animate-fade-in">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 bg-yrealty-accent rounded-full mt-2 mr-2.5 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* CTA Button */}
      <a 
        href="#contact"
        className="block w-full bg-gradient-to-r from-yrealty-navy to-yrealty-accent text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 text-sm min-h-[48px]"
      >
        Learn More
        <ArrowRight size={16} />
      </a>
    </div>
  );
};

export default MobileServiceCard;
