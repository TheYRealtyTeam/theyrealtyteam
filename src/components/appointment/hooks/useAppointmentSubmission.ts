
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AppointmentFormData } from '../types';
import { validateEmail, validatePhone } from '../utils/validationUtils';

export const useAppointmentSubmission = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const submitAppointment = async (
    date: Date | undefined, 
    selectedTime: string, 
    callType: string, 
    formData: AppointmentFormData,
    onSuccess: () => void
  ) => {
    // Validate required fields
    if (!date) {
      toast({
        title: "Missing Information",
        description: "Please select a date for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a time for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!callType) {
      toast({
        title: "Missing Information",
        description: "Please select either phone or video call.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.name || formData.name.trim() === '') {
      toast({
        title: "Missing Information",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.propertyType) {
      toast({
        title: "Missing Information",
        description: "Please select a property type.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate email and phone format
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "The email address you entered is not valid. Please check and try again.",
        variant: "destructive",
      });
      return;
    }
    
    if (!validatePhone(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "The phone number you entered is not valid. Please use format (XXX) XXX-XXXX.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Format the date
    const formattedDate = date.toISOString().split('T')[0];
    
    try {
      console.log("Submitting appointment data:", { formattedDate, selectedTime, formData, callType });
      
      // Save the appointment to the database
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          date: formattedDate,
          time: selectedTime,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          property_type: formData.propertyType,
          message: formData.message || '',
          call_type: callType
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      console.log("Appointment submission successful:", data);
      
      // Show the confirmation dialog
      setShowConfirmation(true);
      
      // Execute success callback
      onSuccess();
      
    } catch (error: any) {
      console.error('Error scheduling appointment:', error);
      
      // More specific error messages based on error type
      if (error.code === '23505') {
        toast({
          title: "Duplicate Appointment",
          description: "You already have an appointment scheduled at this time. Please choose a different time.",
          variant: "destructive",
        });
      } else if (error.code === '23502') {
        toast({
          title: "Missing Information",
          description: "Some required information is missing. Please check all fields and try again.",
          variant: "destructive",
        });
      } else if (error.message?.includes('network')) {
        toast({
          title: "Network Error",
          description: "Unable to connect to our servers. Please check your internet connection and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Submission Error",
          description: "There was a problem scheduling your appointment. Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    showConfirmation,
    setShowConfirmation,
    submitAppointment
  };
};
