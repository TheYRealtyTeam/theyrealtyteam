
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { 
  sanitizeInput, 
  validateEmail, 
  validatePhone, 
  validateName, 
  validateMessage 
} from '../validation/formValidation';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
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
      toast({
        title: "Invalid Name",
        description: "Please enter a valid name (2-100 characters, letters only).",
        variant: "destructive"
      });
      return false;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    // Validate phone if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number (10-20 digits).",
        variant: "destructive"
      });
      return false;
    }

    // Validate message length and content
    if (!validateMessage(formData.message)) {
      toast({
        title: "Invalid Message",
        description: "Message must be between 10 and 2000 characters.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) return;

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

      // Store in database using Supabase client
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([sanitizedData]);

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save contact submission');
      }

      // Send notification email using edge function
      const { error: emailError } = await supabase.functions.invoke('contact-notification', {
        body: sanitizedData
      });

      if (emailError) {
        console.error('Email notification error:', emailError);
        // Don't throw here - the form was still submitted successfully
      }

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
        message: ''
      });

    } catch (error: any) {
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
