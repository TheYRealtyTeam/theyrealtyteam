/**
 * Type definitions for appointment functionality
 */

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  property_address: string;
  property_type: string;
  date: string;
  time: string;
  notes?: string;
}

export interface AppointmentSubmissionData extends AppointmentFormData {
  call_type: string;
  message: string | null;
}

export interface AppointmentApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}
