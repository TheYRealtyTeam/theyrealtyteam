
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | Y Realty Team";
    window.scrollTo(0, 0);
    
    // Set up a listener for new contact submissions
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_submissions',
        },
        async (payload) => {
          // Trigger the notification function when a new submission is detected
          try {
            const response = await fetch(
              'https://axgepdguspqqxudqnobz.supabase.co/functions/v1/contact-notification',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                }
              }
            );
            
            if (!response.ok) {
              throw new Error('Failed to send notification');
            }
            
          } catch (error) {
            console.error('Error triggering notification:', error);
          }
        }
      )
      .subscribe();
    
    return () => {
      // Clean up the subscription when component unmounts
      supabase.removeChannel(channel);
    };
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
          <ContactForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
