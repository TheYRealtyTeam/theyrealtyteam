import { log } from '@/lib/logger';
import { AppointmentFormData } from '../types';
import { sendAppointmentNotifications } from './appointmentApiService';

export const sendNotifications = async (
  date: Date, 
  selectedTime: string, 
  callType: string, 
  formData: AppointmentFormData
): Promise<void> => {
  try {
    await sendAppointmentNotifications(date, selectedTime, callType, formData);
    log("Email notifications sent successfully");
  } catch (emailError) {
    console.error("Failed to send email notifications:", emailError);
    // We don't throw here because the appointment was still created successfully
  }
};
