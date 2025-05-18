
import React, { useEffect } from 'react';
import DateTimeSelector from './appointment/DateTimeSelector';
import AppointmentForm from './appointment/AppointmentForm';
import AppointmentConfirmation from './appointment/AppointmentConfirmation';
import useAppointment from './appointment/useAppointment';

const AppointmentScheduler = () => {
  const {
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
    isFormValid,
    showConfirmation,
    setShowConfirmation,
    formattedDate
  } = useAppointment();

  useEffect(() => {
    console.log("AppointmentScheduler mounted with date:", date);
    // Force active class on parent if it has reveal class
    const parent = document.querySelector('.reveal[data-value="appointment"]');
    if (parent && !parent.classList.contains('active')) {
      console.log("Forcing active class on appointment tab");
      parent.classList.add('active');
    }
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DateTimeSelector
          date={date}
          setDate={setDate}
          selectedTime={selectedTime}
          handleTimeSelect={handleTimeSelect}
          callType={callType}
          setCallType={setCallType}
          availableTimes={availableTimes}
          isDateDisabled={isDateDisabled}
        />
        
        <AppointmentForm
          formData={formData}
          formErrors={formErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
        />
      </div>
      
      {/* Confirmation Dialog */}
      <AppointmentConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        appointmentDetails={{
          date: formattedDate,
          time: selectedTime,
          callType: callType,
          name: formData.name
        }}
      />
    </div>
  );
};

export default AppointmentScheduler;
