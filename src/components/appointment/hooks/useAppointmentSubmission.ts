
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { AppointmentFormData } from '../types';
import { submitAppointmentData } from '../services/submissionService';
import { useConfirmationDialog } from './useConfirmationDialog';

export const useAppointmentSubmission = () => {
  const { toast } = useToast();
  const { getRecaptchaToken } = useRecaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { 
    showConfirmation, 
    setShowConfirmation, 
    handleConfirmationClose 
  } = useConfirmationDialog();

  const submitAppointment = async (
    date: Date | undefined, 
    selectedTime: string, 
    callType: string, 
    formData: AppointmentFormData,
    onSuccess: () => void
  ) => {
    // Get reCAPTCHA token
    const recaptchaToken = await getRecaptchaToken('appointment_booking');
    
    await submitAppointmentData(
      date,
      selectedTime,
      callType,
      formData,
      toast,
      setIsSubmitting,
      setShowConfirmation,
      recaptchaToken
    );
  };

  return {
    isSubmitting,
    showConfirmation,
    setShowConfirmation,
    submitAppointment,
    handleConfirmationClose
  };
};
