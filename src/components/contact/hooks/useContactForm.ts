
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { 
  sanitizeInput, 
  validateEmail, 
  validatePhone, 
  validateName, 
  validateMessage 
} from '../validation/formValidation';
import { securityLogger } from '@/services/securityLogger';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: '',
    honeypot: '' // Anti-bot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    // Basic input filtering during typing
    let filteredValue = value;
    
    // Remove potential malicious content during input
    if (field === 'name') {
      filteredValue = value.replace(/[^a-zA-Z\s\-\.']/g, '');
    } else if (field === 'phone') {
      filteredValue = value.replace(/[^0-9\s\-\+\(\)\.]/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: filteredValue
    }));
  };

  const validateForm = () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.propertyType || !formData.message) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }

    // Validate name format
    if (!validateName(formData.name)) {
      securityLogger.logValidationFailure('name', formData.name, 'Invalid format or suspicious content');
      toast({
        title: "Invalid Name",
        description: "Please enter a valid name (2-100 characters, letters only).",
        variant: "destructive"
      });
      return false;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      securityLogger.logValidationFailure('email', formData.email, 'Invalid format or suspicious content');
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    // Validate phone if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      securityLogger.logValidationFailure('phone', formData.phone, 'Invalid format or suspicious content');
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number (10-20 digits).",
        variant: "destructive"
      });
      return false;
    }

    // Validate message length and content
    if (!validateMessage(formData.message)) {
      securityLogger.logValidationFailure('message', formData.message, 'Invalid content, length, or suspicious patterns');
      toast({
        title: "Invalid Message",
        description: "Message contains invalid content or is not within the required length.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) return;

    // Check honeypot field - silently reject bot submissions
    if (formData.honeypot) {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your inquiry. We'll get back to you soon!",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        message: '',
        honeypot: ''
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: formData.phone ? sanitizeInput(formData.phone) : null,
        property_type: sanitizeInput(formData.propertyType),
        message: sanitizeInput(formData.message)
      };

      console.log('Submitting contact form to edge function');

      // Submit to secure edge function using Supabase client
      const { data, error: submissionError } = await supabase.functions.invoke('contact-notification', {
        body: sanitizedData
      });

      if (submissionError) {
        console.error('Submission error:', submissionError);
        
        // Check if it's a rate limit error
        if (submissionError.message?.includes('429') || submissionError.message?.includes('Rate limit')) {
          toast({
            title: "Rate Limit Exceeded",
            description: "You have submitted too many forms. Please try again later.",
            variant: "destructive"
          });
          return;
        }
        
        throw new Error('Failed to submit contact form');
      }

      console.log('Contact form submitted successfully');

      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your inquiry. We'll get back to you soon!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        message: '',
        honeypot: ''
      });

    } catch (error: unknown) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleInputChange,
    submitForm
  };
};
