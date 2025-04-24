
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import CalculatorsSection from '@/components/CalculatorsSection';

const Tools = () => {
  useEffect(() => {
    document.title = "Calculators & Tools | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout 
      title="Property Investment Tools"
      subtitle="Free calculators and tools to help you make informed property investment decisions"
    >
      <CalculatorsSection />
    </PageLayout>
  );
};

export default Tools;
