
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ContactForm from "./ContactForm";
import AppointmentScheduler from "../AppointmentScheduler";

const ContactTabs = () => {
  return (
    <Tabs defaultValue="message" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="message">Send Message</TabsTrigger>
        <TabsTrigger value="appointment">Schedule Appointment</TabsTrigger>
      </TabsList>
      
      <TabsContent value="message" className="reveal">
        <ContactForm />
      </TabsContent>
      
      <TabsContent value="appointment" className="reveal">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {/* Debug text to verify component rendering */}
          <p className="mb-4 text-yrealty-navy font-medium">Schedule your appointment below:</p>
          <AppointmentScheduler />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ContactTabs;
