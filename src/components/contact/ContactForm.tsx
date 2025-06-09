
import React from 'react';
import { Button } from "@/components/ui/button";
import { useContactForm } from './hooks/useContactForm';
import PersonalInfoFields from './fields/PersonalInfoFields';
import ContactDetailsFields from './fields/ContactDetailsFields';
import MessageField from './fields/MessageField';

const ContactForm = () => {
  const { formData, isSubmitting, handleInputChange, submitForm } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    await submitForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PersonalInfoFields 
        formData={formData}
        onInputChange={handleInputChange}
      />

      <ContactDetailsFields 
        formData={formData}
        onInputChange={handleInputChange}
      />

      <MessageField 
        value={formData.message}
        onChange={handleInputChange}
      />

      <Button 
        type="submit" 
        className="w-full bg-yrealty-navy hover:bg-yrealty-navy/90 text-white py-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;
