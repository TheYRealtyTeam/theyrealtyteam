
import React from 'react';

const MobileSuccessStats = () => {
  const stats = [
    { value: '50+', label: 'States Covered' },
    { value: '24/7', label: 'Support' },
    { value: '100%', label: 'Transparent' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h4 className="text-lg font-bold text-yrealty-navy mb-4 text-center">
        Why Choose Y Realty Team?
      </h4>
      <div className="grid grid-cols-3 gap-4 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-2xl font-bold text-yrealty-accent">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSuccessStats;
