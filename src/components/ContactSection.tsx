
import React from 'react';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactSectionForm from '@/components/contact/ContactSectionForm';

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">Contact Us</h2>
          <p className="section-subtitle reveal">
            Ready to experience premium property management? Reach out to our team to discuss how we can serve your needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal">
            <ContactInfo />
          </div>
          
          <div className="reveal">
            <ContactSectionForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
