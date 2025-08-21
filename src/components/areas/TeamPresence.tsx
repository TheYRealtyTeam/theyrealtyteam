
import React from 'react';
import { CheckCircle } from 'lucide-react';

const TeamPresence = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-20 reveal">
      <h3 className="text-3xl font-bold text-center mb-8 text-yrealty-navy">
        Our Team Advantage Across America
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h4 className="text-2xl font-bold mb-4 text-yrealty-navy">Always Boots on the Ground</h4>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Y Realty Team is committed to having our own trained team members 
            nationwide. Our approach ensures direct oversight, consistent quality control, and accountability 
            because you're working with Y Realty Team directly.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span><strong>Primary:</strong> Our own Y Realty Team members nationwide</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span><strong>Direct oversight:</strong> You work with Y Realty Team directly</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span><strong>Additional support:</strong> Vetted professional partners when needed</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span><strong>Quality assurance:</strong> Consistent Y Realty standards nationwide</span>
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-yrealty-blue to-yrealty-accent/20 p-8 rounded-xl">
          <h5 className="text-xl font-bold mb-4 text-yrealty-navy">The Y Realty Advantage</h5>
          <div className="bg-yrealty-accent text-white p-6 rounded-lg">
            <h6 className="font-bold mb-3 text-lg">Our Commitment to Excellence</h6>
            <p className="text-sm leading-relaxed">
              Our own trained team members provide direct service with professional support when needed, 
              ensuring consistent quality and accountability across all markets we serve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPresence;
