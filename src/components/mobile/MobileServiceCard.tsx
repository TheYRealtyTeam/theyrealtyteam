
import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface MobileServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  className?: string;
}

const MobileServiceCard = ({ icon: Icon, title, description, features, className = '' }: MobileServiceCardProps) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="bg-yrealty-accent/10 p-3 rounded-xl mr-4">
          <Icon className="h-6 w-6 text-yrealty-accent" />
        </div>
        <h3 className="text-lg font-bold text-yrealty-navy">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>
      
      <ul className="space-y-2 mb-4">
        {features.slice(0, 3).map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="w-1.5 h-1.5 bg-yrealty-accent rounded-full mt-2 mr-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className="w-full bg-gradient-to-r from-yrealty-navy to-yrealty-accent text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300">
        Learn More
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default MobileServiceCard;
