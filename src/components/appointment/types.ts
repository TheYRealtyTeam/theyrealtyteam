
export type AppointmentStep = 'dateSelection' | 'personalInfo';

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
  name?: string;
}
