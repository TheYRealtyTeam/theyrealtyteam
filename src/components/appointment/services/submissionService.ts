import { AppointmentFormData } from '../types';
import { validateAppointmentData } from './appointmentValidationService';
import { saveAppointmentToDatabase } from './appointmentApiService';
import { handleAppointmentError } from '../utils/errorHandling';
import { ToastFunction } from '../types/toastTypes';
import { sendNotifications } from './notificationService';

export const submitAppointmentData = async (
  date: Date | undefined,
  selectedTime: string,
  callType: string,
  formData: AppointmentFormData,
  toast: ToastFunction,
  setIsSubmitting: (value: boolean) => void,
  setShowConfirmation: (value: boolean) => void,
  recaptchaToken?: string | null
): Promise<boolean> => {
  // Validate all required fields and formats
  if (!validateAppointmentData(date, selectedTime, callType, formData, toast)) {
    return false;
  }
  
  setIsSubmitting(true);
  
  // Format the date
  const formattedDate = date!.toISOString().split('T')[0];
  
  try {
    // Save the appointment to the database
    const data = await saveAppointmentToDatabase(formattedDate, selectedTime, callType, formData);
    
    // Show the confirmation dialog
    setShowConfirmation(true);
    
    // Send email notifications using our edge function
    await sendNotifications(date!, selectedTime, callType, formData, recaptchaToken);
    
    return true;
  } catch (error: unknown) {
    handleAppointmentError(error, toast);
    return false;
  } finally {
    setIsSubmitting(false);
  }
};
