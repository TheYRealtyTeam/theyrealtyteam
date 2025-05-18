
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
        title: "Error",
        description: "Please select a date for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: "Error",
        description: "Please select a time for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!callType) {
      toast({
        title: "Error",
        description: "Please select either phone or video call.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate email and phone format
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    if (!validatePhone(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Format the date
    const formattedDate = date.toISOString().split('T')[0];
    
    try {
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
      
      // Instead of showing a toast, show the confirmation dialog
      setShowConfirmation(true);
      
      // Execute success callback
      onSuccess();
      
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again.",
        variant: "destructive",
      });
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
