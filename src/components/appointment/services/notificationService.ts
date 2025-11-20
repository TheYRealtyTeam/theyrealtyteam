import { log } from '@/lib/logger';
import { AppointmentFormData } from '../types';
import { sendAppointmentNotifications } from './appointmentApiService';

export const sendNotifications = async (
  date: Date, 
  selectedTime: string, 
  callType: string, 
  formData: AppointmentFormData,
  recaptchaToken?: string | null
): Promise<void> => {
  try {
    await sendAppointmentNotifications(date, selectedTime, callType, formData, recaptchaToken);
    log("Email notifications sent successfully");
  } catch (emailError) {
    if (import.meta.env.DEV) {
      console.error("Failed to send email notifications:", emailError);
    }
    // We don't throw here because the appointment was still created successfully
  }
};
