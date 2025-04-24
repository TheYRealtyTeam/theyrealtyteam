
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ResourcesContent from '@/components/resources/ResourcesContent';

const Resources = () => {
  useEffect(() => {
    document.title = "Resources | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout 
      title="Property Management Resources"
      subtitle="Download free guides, checklists, and templates to help optimize your property investment strategy"
    >
      <ResourcesContent />
    </PageLayout>
  );
};

export default Resources;
