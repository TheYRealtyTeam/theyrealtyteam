
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const useAppointment = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [callType, setCallType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Available appointment times
  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Allow formats like (123) 456-7890, 123-456-7890, 1234567890
    const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateDisabled = (date: Date) => {
    return isWeekend(date) || isPastDate(date);
  };

  // Format the date for display
  const formattedDate = date ? date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  // Check if form is valid
  const checkFormValidity = (): boolean => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: "Error",
        description: "Please select a time for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!callType) {
      toast({
        title: "Error",
        description: "Please select either phone or video call.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate email and phone format
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    if (!validatePhone(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Format the date
    const formattedDate = date.toISOString().split('T')[0];
    
    try {
      // Save the appointment to the database
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
      
      // Instead of showing a toast, show the confirmation dialog
      setShowConfirmation(true);
      
      // Reset form (we'll keep the confirmation data available until dialog is closed)
      setDate(undefined);
      setSelectedTime('');
      setCallType('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        message: ''
      });
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    date,
    setDate,
    selectedTime,
    callType,
    setCallType,
    formData,
    formErrors,
    isSubmitting,
    availableTimes,
    handleChange,
    handleTimeSelect,
    isDateDisabled,
    handleSubmit,
    isFormValid: checkFormValidity(),
    showConfirmation,
    setShowConfirmation,
    formattedDate
  };
};

export default useAppointment;
