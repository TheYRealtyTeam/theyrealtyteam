
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentScheduler from '@/components/AppointmentScheduler';
import AnimationObserver from '@/utils/AnimationObserver';

const Appointment = () => {
  useEffect(() => {
    document.title = "Schedule an Appointment | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-24 pb-12 bg-yrealty-blue">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-yrealty-navy text-center">Schedule a Consultation</h1>
            <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
              Book a time to speak with one of our property management specialists about your needs
            </p>
          </div>
        </div>
        <AppointmentScheduler />
      </main>
      <Footer />
      <AnimationObserver />
    </div>
  );
};

export default Appointment;
