
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
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="bg-yrealty-accent/10 p-4 rounded-xl mr-4 flex-shrink-0">
          <Icon className="h-7 w-7 text-yrealty-accent" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-yrealty-navy leading-tight">{title}</h3>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6 text-base leading-relaxed">{description}</p>
      
      {/* Expandable Features Section */}
      <div className="mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl font-semibold text-yrealty-navy"
        >
          <span>Key Features</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {isExpanded && (
          <div className="mt-4 space-y-3 animate-fade-in">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-yrealty-accent rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* CTA Button */}
      <button className="w-full bg-gradient-to-r from-yrealty-navy to-yrealty-accent text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 text-base">
        Learn More
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default MobileServiceCard;
