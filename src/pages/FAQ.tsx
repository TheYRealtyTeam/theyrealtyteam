
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import FAQSection from '@/components/FAQSection';

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout 
      title="Frequently Asked Questions"
      subtitle="Find answers to the most common questions about property management services"
    >
      <FAQSection />
    </PageLayout>
  );
};

export default FAQ;
