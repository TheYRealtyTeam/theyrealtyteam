
import React from 'react';
import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppointmentDetails } from './types';
import { addToMicrosoftCalendar, downloadICalFile } from './utils/calendarUtils';

interface CalendarActionButtonsProps {
  appointmentDetails: AppointmentDetails;
  msCalendarConnected: boolean;
  isAddingToMSCalendar: boolean;
  setIsAddingToMSCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const CalendarActionButtons: React.FC<CalendarActionButtonsProps> = ({
  appointmentDetails,
  msCalendarConnected,
  isAddingToMSCalendar,
  setIsAddingToMSCalendar,
  onClose
}) => {
  const handleAddToMicrosoftCalendar = () => {
    addToMicrosoftCalendar(appointmentDetails, setIsAddingToMSCalendar);
  };
  
  const handleDownloadICalFile = () => {
    downloadICalFile(appointmentDetails);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <Button 
        onClick={handleAddToMicrosoftCalendar} 
        className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
        disabled={isAddingToMSCalendar}
      >
        <CalendarPlus className="h-4 w-4 mr-2" />
        {isAddingToMSCalendar ? 'Connecting...' : msCalendarConnected ? 'Add to Microsoft Calendar' : 'Connect Microsoft Calendar'}
      </Button>
      
      <Button 
        onClick={handleDownloadICalFile} 
        className="w-full flex items-center justify-center bg-yrealty-blue text-yrealty-navy hover:bg-yrealty-blue/90"
      >
        <CalendarPlus className="h-4 w-4 mr-2" />
        Download iCalendar File
      </Button>
      
      <Button onClick={onClose} className="bg-yrealty-navy hover:bg-yrealty-navy/90 w-full">
        Close
      </Button>
    </div>
  );
};

export default CalendarActionButtons;
