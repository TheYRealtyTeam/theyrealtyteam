
import { useEffect } from 'react';
import { useAppointmentForm } from './hooks/useAppointmentForm';
import { useDateTimeSelection } from './hooks/useDateTimeSelection';
import { useStepNavigation } from './hooks/useStepNavigation';
import { useAppointmentSubmission } from './hooks/useAppointmentSubmission';
import { isDateDisabled, formatDate } from './utils/validationUtils';

const useAppointment = () => {
  // Combine the smaller hooks
  const {
    formData,
    formErrors,
    handleChange,
    checkFormValidity,
    resetFormData
  } = useAppointmentForm();

  const {
    date,
    setDate,
    selectedTime,
    callType,
    setCallType,
    availableTimes,
    handleTimeSelect,
    isFirstStepValid,
    resetDateTimeSelection
  } = useDateTimeSelection();

  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep
  } = useStepNavigation();

  const {
    isSubmitting,
    showConfirmation,
    setShowConfirmation,
    submitAppointment
  } = useAppointmentSubmission();

  // Format the date for display
  const formattedDate = formatDate(date);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitAppointment(date, selectedTime, callType, formData, () => {
      // Reset form after successful submission
      resetFormData();
      resetDateTimeSelection();
      setCurrentStep('dateSelection');
    });
  };

  // Check if the first step is valid to enable "Continue" button
  useEffect(() => {
    console.log("Date selection state:", { date, selectedTime, callType });
  }, [date, selectedTime, callType]);

  return {
    // Date and Time Selection
    date,
    setDate,
    selectedTime,
    callType,
    setCallType,
    availableTimes,
    handleTimeSelect,
    isDateDisabled,
    
    // Form data and handling
    formData,
    formErrors,
    handleChange,
    
    // Submission state
    isSubmitting,
    handleSubmit,
    isFormValid: checkFormValidity(date, selectedTime, callType),
    
    // Confirmation dialog
    showConfirmation,
    setShowConfirmation,
    
    // Formatted date for display
    formattedDate,
    
    // Step navigation
    currentStep,
    goToNextStep: () => goToNextStep(isFirstStepValid()),
    goToPreviousStep,
    isFirstStepValid: isFirstStepValid()
  };
};

export default useAppointment;
