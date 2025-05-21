
export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  message?: string;
}

export interface AppointmentDetails {
  date: string;
  time: string;
  callType: string;
  name: string;
}

export interface ToastFunction {
  (props: {
    title?: string;
    description?: string;
    variant?: 'default' | 'destructive';
  }): void;
}
