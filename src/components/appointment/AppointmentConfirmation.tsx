
import React from 'react';
import { Check, Calendar, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AppointmentConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentDetails: {
    date: string;
    time: string;
    callType: string;
    name: string;
  };
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  isOpen,
  onClose,
  appointmentDetails
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Appointment Confirmed!</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-center mb-2">
            Thank you, {appointmentDetails.name}!
          </h3>
          
          <p className="text-gray-600 text-center mb-6">
            Your appointment has been successfully scheduled.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 w-full mb-6">
            <div className="flex items-center mb-3">
              <Calendar className="h-5 w-5 text-yrealty-navy mr-2" />
              <span className="font-medium">{appointmentDetails.date}</span>
            </div>
            <div className="flex items-center mb-3">
              <div className="h-5 w-5 flex items-center justify-center mr-2">
                <span className="text-yrealty-navy font-bold">⏰</span>
              </div>
              <span className="font-medium">{appointmentDetails.time}</span>
            </div>
            <div className="flex items-center">
              {appointmentDetails.callType === 'phone' ? (
                <Phone className="h-5 w-5 text-yrealty-navy mr-2" />
              ) : (
                <Video className="h-5 w-5 text-yrealty-navy mr-2" />
              )}
              <span className="font-medium capitalize">{appointmentDetails.callType} Call</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 text-center mb-6">
            We've sent the details to your email. Our team will contact you shortly before the scheduled time.
          </p>
          
          <Button onClick={onClose} className="bg-yrealty-navy hover:bg-yrealty-navy/90 w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentConfirmation;
