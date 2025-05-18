
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
      <section className="bg-white">
        <div className="max-w-3xl mx-auto">
          <AppointmentScheduler />
        </div>
        
        {/* Benefits section */}
        <div className="mt-16 reveal max-w-6xl mx-auto">
          <div className="bg-yrealty-blue rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-yrealty-navy text-center">Why Schedule a Consultation?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-yrealty-navy rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">1</div>
                <h3 className="text-lg font-bold mb-2 text-yrealty-navy">Personalized Strategy</h3>
                <p className="text-gray-600">Get tailored property management recommendations specific to your investment goals and property type.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-yrealty-navy rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">2</div>
                <h3 className="text-lg font-bold mb-2 text-yrealty-navy">Expert Insights</h3>
                <p className="text-gray-600">Learn about market trends, pricing strategies, and how to maximize your property's potential.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-yrealty-navy rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">3</div>
                <h3 className="text-lg font-bold mb-2 text-yrealty-navy">No Obligation</h3>
                <p className="text-gray-600">Our consultations are completely free with no pressure - just valuable information to help you make decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Appointment;
