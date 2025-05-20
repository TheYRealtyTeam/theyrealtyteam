
import React from 'react';
import { Calendar, Clock, Phone, Video } from 'lucide-react';
import { AppointmentDetails } from './types';

interface AppointmentDetailsCardProps {
  appointmentDetails: AppointmentDetails;
}

const AppointmentDetailsCard: React.FC<AppointmentDetailsCardProps> = ({ 
  appointmentDetails 
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 w-full mb-6">
      <div className="flex items-center mb-3">
        <Calendar className="h-5 w-5 text-yrealty-navy mr-2" />
        <span className="font-medium">{appointmentDetails.date}</span>
      </div>
      <div className="flex items-center mb-3">
        <Clock className="h-5 w-5 text-yrealty-navy mr-2" />
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
  );
};

export default AppointmentDetailsCard;
