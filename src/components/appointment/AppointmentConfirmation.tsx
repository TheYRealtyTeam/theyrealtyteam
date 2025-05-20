
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { microsoftGraphApi } from '@/integrations/microsoft/graphApiClient';
import SuccessIcon from './SuccessIcon';
import AppointmentDetailsCard from './AppointmentDetailsCard';
import CalendarActionButtons from './CalendarActionButtons';
import { AppointmentDetails } from './types';

interface AppointmentConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentDetails: AppointmentDetails;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  isOpen,
  onClose,
  appointmentDetails: initialAppointmentDetails
}) => {
  // Store appointment details locally to prevent them from disappearing
  const [appointmentDetails, setAppointmentDetails] = useState(initialAppointmentDetails);
  const [isAddingToMSCalendar, setIsAddingToMSCalendar] = useState(false);
  const [msCalendarConnected, setMsCalendarConnected] = useState(false);
  const { toast } = useToast();

  // Update local state when props change and dialog is opened
  useEffect(() => {
    if (isOpen && initialAppointmentDetails.date) {
      setAppointmentDetails(initialAppointmentDetails);
      console.log("Confirmation dialog opened with details:", initialAppointmentDetails);
      
      // Check if Microsoft Graph API is authenticated
      const isAuthenticated = microsoftGraphApi.init();
      setMsCalendarConnected(isAuthenticated);
    }
  }, [isOpen, initialAppointmentDetails]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Appointment Confirmed!</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6">
          <SuccessIcon />
          
          <h3 className="text-xl font-semibold text-center mb-2">
            Thank you, {appointmentDetails.name}!
          </h3>
          
          <p className="text-gray-600 text-center mb-6">
            Your appointment has been successfully scheduled.
          </p>
          
          <AppointmentDetailsCard appointmentDetails={appointmentDetails} />
          
          <p className="text-sm text-gray-500 text-center mb-6">
            We've sent the details to your email. Our team will contact you shortly before the scheduled time.
          </p>
          
          <CalendarActionButtons 
            appointmentDetails={appointmentDetails}
            msCalendarConnected={msCalendarConnected}
            isAddingToMSCalendar={isAddingToMSCalendar}
            setIsAddingToMSCalendar={setIsAddingToMSCalendar}
            onClose={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentConfirmation;
