
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
  // Format the date in YYYY-MM-DD format for the edge function
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  // Format time to HH:MM format (convert from "1:00 PM" to "13:00")
  const timeParts = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let formattedTime = selectedTime;
  
  if (timeParts) {
    let hours = parseInt(timeParts[1]);
    const minutes = timeParts[2];
    const period = timeParts[3].toUpperCase();
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    formattedTime = `${String(hours).padStart(2, '0')}:${minutes}`;
  }

  // Use Supabase edge functions for secure API calls
  const { data, error } = await supabase.functions.invoke('appointment-notification', {
    body: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      property_address: `${callType} Call - ${formData.propertyType}`,
      property_type: formData.propertyType,
      date: formattedDate,
      time: formattedTime,
      notes: formData.message || ''
    }
  });

  if (error) {
    console.error("Error sending appointment notifications:", error);
    throw new Error("Failed to send email notifications");
  }
  
  return data;
};
