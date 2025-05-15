
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available appointment times
  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      
      toast({
        title: "Appointment Scheduled!",
        description: `Your ${callType} call has been scheduled for ${date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} at ${selectedTime}.`,
        duration: 5000,
      });
      
      // Reset form
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
    isSubmitting,
    availableTimes,
    handleChange,
    handleTimeSelect,
    isDateDisabled,
    handleSubmit,
    isFormValid: !!date && !!selectedTime && !!callType
  };
};

export default useAppointment;
