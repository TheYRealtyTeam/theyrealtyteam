import { useState } from 'react';
import { log, warn } from '@/lib/logger';
import { useToast } from '@/hooks/use-toast';
import { SecurityUtils, RATE_LIMITS } from '@/utils/security';
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
    
    // Apply advanced security validation during input
    const securityResult = SecurityUtils.validateSecureInput(value, {
      maxLength: name === 'message' ? 2000 : name === 'email' ? 254 : 100,
      allowSpecialChars: name === 'message' || name === 'email' || name === 'phone',
      allowHtml: false
    });
    
    if (!securityResult.isValid && securityResult.errors.length > 0) {
      // Log security concerns but don't block typing completely
      warn('Input security validation:', securityResult.errors);
    }
    
    setFormData(prev => ({ ...prev, [name]: securityResult.sanitized }));
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

    // Enhanced client-side rate limiting with user identification
    const clientId = await SecurityUtils.hashSensitiveData(formData.email || 'anonymous');
    const rateLimitCheck = SecurityUtils.checkRateLimit(clientId, RATE_LIMITS.CONTACT_FORM);
    
    if (!rateLimitCheck) {
      toast({
        title: "Rate limit exceeded",
        description: "Please wait before submitting another message. This helps us prevent spam.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // Additional rate limiting check
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
      // Comprehensive input sanitization
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: formData.phone ? sanitizeInput(formData.phone) : null,
        property_type: sanitizeInput(formData.propertyType),
        message: sanitizeInput(formData.message)
      };

      log('Submitting contact form with enhanced security');

      // Submit to secure edge function
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
      
      const result = await response.json();
      
      if (!response.ok) {
        // Handle specific error types
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait before submitting again.');
        }
        throw new Error(result.error || 'Failed to send message');
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

    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      let errorMessage = "We couldn't send your message. Please try again.";
      
      if (error.message.includes('Rate limit')) {
        errorMessage = "Too many requests. Please wait before submitting again.";
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (error.message.includes('validation')) {
        errorMessage = "Please check your input and try again.";
      }
      
      toast({
        title: "Something went wrong",
        description: errorMessage,
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
