import React from 'react';
import { useIsMobileOptimized } from '@/hooks/useIsMobileOptimized';
import MobileAreasSection from './mobile/MobileAreasSection';
import StatesCoverage from './areas/StatesCoverage';
import TeamPresence from './areas/TeamPresence';
import ProcessSteps from './areas/ProcessSteps';
import CommitmentSection from './areas/CommitmentSection';

const AreasSection = () => {
  const { isMobileOnly } = useIsMobileOptimized();

  // Return mobile-optimized version only for phones, not tablets
  if (isMobileOnly) {
    return <MobileAreasSection />;
  }

  return (
    <section id="areas" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">Service Areas</h2>
          <p className="section-subtitle reveal">
            Professional property management services available nationwide with local expertise and national standards
          </p>
        </div>

        <StatesCoverage />
        <TeamPresence />
        <ProcessSteps />
        <CommitmentSection />
      </div>
    </section>
  );
};

export default AreasSection;
