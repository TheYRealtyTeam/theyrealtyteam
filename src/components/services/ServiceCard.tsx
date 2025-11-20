
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  pricing: string;
}

const ServiceCard = ({ title, description, icon, features, pricing }: ServiceCardProps) => (
  <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-yrealty-accent/30 h-full flex flex-col">
    <div className="mb-3 flex items-center justify-center w-12 h-12 bg-yrealty-blue rounded-lg">{icon}</div>
    <h4 className="text-lg font-bold mb-2 text-yrealty-navy">{title}</h4>
    <p className="text-gray-600 text-sm mb-4 leading-snug line-clamp-2">{description}</p>
    
    <div className="mb-4 flex-grow">
      <ul className="space-y-1.5">
        {features.slice(0, 3).map((feature, index) => (
          <li key={index} className="flex items-start gap-1.5 text-xs">
            <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    
    <div className="border-t pt-3 mt-auto">
      <p className="text-xs font-semibold text-yrealty-accent">{pricing}</p>
    </div>
  </div>
);

export default ServiceCard;
