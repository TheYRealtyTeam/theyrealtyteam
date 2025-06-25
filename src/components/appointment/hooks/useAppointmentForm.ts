
import { useState, ChangeEvent, useCallback } from 'react';
import { AppointmentFormData, FormErrors } from '../types';
import { validateEmail, validatePhone } from '../utils/validationUtils';

export const useAppointmentForm = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: '',
    phone: ''
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate email and phone as user types
    if (name === 'email') {
      if (!value) {
        setFormErrors(prev => ({ ...prev, email: '' }));
      } else if (!validateEmail(value)) {
        setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setFormErrors(prev => ({ ...prev, email: '' }));
      }
    }
    
    if (name === 'phone') {
      if (!value) {
        setFormErrors(prev => ({ ...prev, phone: '' }));
      } else if (!validatePhone(value)) {
        setFormErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }));
      } else {
        setFormErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  }, []);

  const checkFormValidity = useCallback((date: Date | undefined, selectedTime: string, callType: string): boolean => {
    const { name, email, phone, propertyType } = formData;
    
    // Basic required field validation
    if (!name || !email || !phone || !propertyType || !date || !selectedTime || !callType) {
      return false;
    }
    
    // Format validation
    if (!validateEmail(email) || !validatePhone(phone)) {
      return false;
    }
    
    return true;
  }, [formData]);

  const resetFormData = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      message: ''
    });
    setFormErrors({
      email: '',
      phone: ''
    });
  }, []);

  return {
    formData,
    formErrors,
    handleChange,
    checkFormValidity,
    resetFormData
  };
};
