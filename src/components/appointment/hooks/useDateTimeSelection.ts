
import { useState } from 'react';

export const useDateTimeSelection = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [callType, setCallType] = useState('');

  // Available appointment times
  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  /**
   * Check if first step is valid (date, time and call type are selected)
   */
  const isFirstStepValid = (): boolean => {
    return !!date && !!selectedTime && !!callType;
  };

  const resetDateTimeSelection = () => {
    setDate(undefined);
    setSelectedTime('');
    setCallType('');
  };

  return {
    date,
    setDate,
    selectedTime,
    callType,
    setCallType,
    availableTimes,
    handleTimeSelect,
    isFirstStepValid,
    resetDateTimeSelection
  };
};
