
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  sanitizeInput, 
  validateEmail, 
  validatePhone, 
  validateName, 
  validateMessage 
} from '../validation/contactValidation';

export const useContactSectionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);

  // Rate limiting: 1 submission per 60 seconds
  const RATE_LIMIT_MS = 60000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Apply input filtering based on field type
    let filteredValue = value;
    if (name === 'name') {
      filteredValue = value.replace(/[^a-zA-Z\s\-\.']/g, '');
    } else if (name === 'phone') {
      filteredValue = value.replace(/[^0-9\s\-\+\(\)\.]/g, '');
    }
    
    setFormData(prev => ({ ...prev, [name]: filteredValue }));
  };

  const validateForm = () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.propertyType || !formData.message) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // Validate name
    if (!validateName(formData.name)) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid name (2-100 characters, letters only).",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // Validate phone if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    // Validate message length
    if (!validateMessage(formData.message)) {
      toast({
        title: "Invalid Message",
        description: "Message must be between 10 and 2000 characters.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmissionTime < RATE_LIMIT_MS) {
      toast({
        title: "Please Wait",
        description: "Please wait before submitting another message.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: formData.phone ? sanitizeInput(formData.phone) : null,
        property_type: sanitizeInput(formData.propertyType),
        message: sanitizeInput(formData.message)
      };

      // Use direct fetch to the edge function with proper error handling
      const response = await fetch(
        'https://axgepdguspqqxudqnobz.supabase.co/functions/v1/contact-notification',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sanitizedData)
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message');
      }
      
      // Update rate limiting timestamp
      setLastSubmissionTime(now);
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      
      // Reset form data after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "We couldn't send your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit
  };
};
