import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import AreasSection from '@/components/AreasSection';

const Areas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout 
      title="Service Areas"
      subtitle="Comprehensive property management across all 50 states"
      metaDescription="Y Realty Team provides property management services across all 50 states with local expertise and cutting-edge technology."
      className="p-0"
    >
      <div className="-mt-16">
        <AreasSection />
      </div>
    </PageLayout>
  );
};

export default Areas;