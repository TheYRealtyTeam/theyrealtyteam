
import React from 'react';
import { Check } from 'lucide-react';

const SuccessIcon: React.FC = () => {
  return (
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
      <Check className="h-8 w-8 text-green-600" />
    </div>
  );
};

export default SuccessIcon;
