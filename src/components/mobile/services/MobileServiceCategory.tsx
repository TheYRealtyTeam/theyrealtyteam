
import React from 'react';
import { LucideIcon } from 'lucide-react';
import MobileServiceCard from '../MobileServiceCard';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

interface MobileServiceCategoryProps {
  icon: LucideIcon;
  title: string;
  services: Service[];
}

const MobileServiceCategory = ({ icon: CategoryIcon, title, services }: MobileServiceCategoryProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yrealty-blue p-3 rounded-xl">
          <CategoryIcon className="h-6 w-6 text-yrealty-navy" />
        </div>
        <h3 className="text-2xl font-bold text-yrealty-navy">{title}</h3>
      </div>
      <div className="space-y-4">
        {services.map((service, index) => (
          <MobileServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            features={service.features}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileServiceCategory;
