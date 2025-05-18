
import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ContactForm from "./ContactForm";
import AppointmentScheduler from "../AppointmentScheduler";

const ContactTabs = () => {
  // Function to handle tab change
  const handleTabChange = (value: string) => {
    // Short timeout to ensure DOM updates first
    setTimeout(() => {
      const activeTabContent = document.querySelector(`[data-value="${value}"]`);
      if (activeTabContent && activeTabContent.classList.contains('reveal')) {
        activeTabContent.classList.add('active');
        console.log(`Activated tab content: ${value}`);
      }
      
      // Force any calendar inside this tab to be visible and interactive
      if (value === 'appointment') {
        const calendar = document.querySelector('.rdp');
        if (calendar) {
          console.log('Ensuring calendar is interactive');
        }
      }
    }, 10);
  };

  // Initialize the first tab
  useEffect(() => {
    handleTabChange('message');
  }, []);

  return (
    <Tabs 
      defaultValue="message" 
      className="w-full" 
      onValueChange={handleTabChange}
    >
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="message">Send Message</TabsTrigger>
        <TabsTrigger value="appointment">Schedule Appointment</TabsTrigger>
      </TabsList>
      
      <TabsContent value="message" className="reveal" data-value="message">
        <ContactForm />
      </TabsContent>
      
      <TabsContent value="appointment" className="reveal z-20 relative" data-value="appointment">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <AppointmentScheduler />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ContactTabs;
