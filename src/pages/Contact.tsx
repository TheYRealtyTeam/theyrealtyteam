
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactTabs from '@/components/contact/ContactTabs';

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout 
      title="Contact Us"
      subtitle="Ready to experience premium property management? Reach out to our team to discuss how we can serve your needs"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="reveal">
          <ContactInfo />
        </div>
        <div className="reveal">
          <ContactTabs />
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
