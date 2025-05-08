
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import AppointmentScheduler from '@/components/AppointmentScheduler';

const Appointment = () => {
  useEffect(() => {
    document.title = "Schedule an Appointment | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout
      title="Schedule a Consultation"
      subtitle="Book a time to speak with one of our property management specialists about your needs"
    >
      <AppointmentScheduler />
    </PageLayout>
  );
};

export default Appointment;
