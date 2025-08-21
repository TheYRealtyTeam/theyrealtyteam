
import React from 'react';

const MobileValueProposition = () => {
  const benefits = [
    { label: 'No Setup Fees' },
    { label: 'No Marketing Costs' },
    { label: 'No Hidden Costs' },
    { label: 'No Admin Fees' }
  ];

  return (
    <div className="bg-gradient-to-r from-yrealty-accent to-yrealty-navy p-6 rounded-2xl mb-12 text-white">
      <h3 className="text-xl font-bold mb-3">
        ONE Simple Price - EVERYTHING Included
      </h3>
      <p className="text-sm leading-relaxed mb-4">
        No hidden fees, no surprise charges. Our transparent pricing includes ALL services, technology, inspections, and support.
      </p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>{benefit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileValueProposition;
