
import { supabase } from '@/integrations/supabase/client';
import { AppointmentFormData } from '../types';

export const saveAppointmentToDatabase = async (
  formattedDate: string,
  selectedTime: string,
  callType: string,
  formData: AppointmentFormData
) => {
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
  
  return data;
};

export const sendAppointmentNotifications = async (
  date: Date,
  selectedTime: string,
  callType: string,
  formData: AppointmentFormData
) => {
  // Format the date for human-readable display
  const readableDate = date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Use Supabase edge functions for secure API calls
  const { data, error } = await supabase.functions.invoke('appointment-notification', {
    body: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: readableDate,
      time: selectedTime,
      callType: callType,
      propertyType: formData.propertyType,
      message: formData.message || ''
    }
  });

  if (error) {
    console.error("Error sending appointment notifications:", error);
    throw new Error("Failed to send email notifications");
  }
  
  return data;
};
