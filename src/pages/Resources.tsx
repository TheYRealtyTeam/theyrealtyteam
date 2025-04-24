
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ResourcesContent from '@/components/resources/ResourcesContent';
import { Helmet } from 'react-helmet';

const Resources = () => {
  useEffect(() => {
    document.title = "Resources | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Free Property Management Resources | Y Realty Team</title>
        <meta name="description" content="Download free guides, checklists, and templates to help optimize your property investment strategy." />
      </Helmet>
      <PageLayout 
        title="Property Management Resources"
        subtitle="Download free guides, checklists, and templates to help optimize your property investment strategy"
      >
        <ResourcesContent />
      </PageLayout>
    </>
  );
};

export default Resources;
