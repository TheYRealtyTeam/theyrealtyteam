
export type AppointmentStep = 'dateSelection' | 'personalInfo' | 'confirmation';

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  message: string;
}

export interface FormErrors {
  email: string;
  phone: string;
}

export interface AppointmentDetails {
  date: string;
  time: string;
  callType: string;
  name: string; // Changed from optional to required
  message?: string;
}
