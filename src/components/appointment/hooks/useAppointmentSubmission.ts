
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AppointmentFormData } from '../types';
import { validateAppointmentData } from '../services/appointmentValidationService';
import { saveAppointmentToDatabase, sendAppointmentNotifications } from '../services/appointmentApiService';
import { handleAppointmentError } from '../utils/errorHandling';

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
    // Validate all required fields and formats
    if (!validateAppointmentData(date, selectedTime, callType, formData, toast)) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Format the date
    const formattedDate = date!.toISOString().split('T')[0];
    
    try {
      console.log("Submitting appointment data:", { formattedDate, selectedTime, formData, callType });
      
      // Save the appointment to the database
      const data = await saveAppointmentToDatabase(formattedDate, selectedTime, callType, formData);
      
      console.log("Appointment submission successful:", data);
      
      // Show the confirmation dialog
      setShowConfirmation(true);
      
      // Send email notifications using our edge function
      try {
        await sendAppointmentNotifications(date!, selectedTime, callType, formData);
        console.log("Email notifications sent successfully");
      } catch (emailError) {
        console.error("Failed to send email notifications:", emailError);
        // We don't throw here because the appointment was still created successfully
      }
      
    } catch (error: any) {
      handleAppointmentError(error, toast);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle dialog close and form reset
  const handleConfirmationClose = (resetCallback: () => void) => {
    setShowConfirmation(false);
    
    // Execute the reset callback after the dialog is closed
    setTimeout(() => {
      resetCallback();
    }, 300); // Small delay to ensure dialog animation completes
  };

  return {
    isSubmitting,
    showConfirmation,
    setShowConfirmation,
    submitAppointment,
    handleConfirmationClose
  };
};
