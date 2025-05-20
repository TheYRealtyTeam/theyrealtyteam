
import { toast } from '@/hooks/use-toast';
import { microsoftGraphApi } from '@/integrations/microsoft/graphApiClient';
import { AppointmentDetails } from '../types';

/**
 * Adds appointment to Microsoft Calendar
 */
export const addToMicrosoftCalendar = async (
  appointmentDetails: AppointmentDetails,
  setIsAddingToMSCalendar: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsAddingToMSCalendar(true);
  
  try {
    // Check if already authenticated
    if (!microsoftGraphApi.init()) {
      // Start the authentication flow
      microsoftGraphApi.startAuth();
      return; // The page will redirect to Microsoft login
    }
    
    // Create the calendar event with name defaulting to "Guest" if not provided
    // This is a temporary fallback during the type transition
    const detailsWithName = {
      ...appointmentDetails,
      name: appointmentDetails.name || "Guest" 
    };
    
    const result = await microsoftGraphApi.createCalendarEvent(detailsWithName);
    
    if (result.success) {
      toast({
        title: "Added to Calendar",
        description: "Your appointment has been added to your Microsoft calendar.",
      });
    } else {
      if (result.error === 'not_authenticated') {
        // Start the authentication flow
        microsoftGraphApi.startAuth();
        return;
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    }
  } catch (error) {
    console.error("Error adding to Microsoft Calendar:", error);
    toast({
      title: "Calendar Error",
      description: "Could not add to Microsoft Calendar. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsAddingToMSCalendar(false);
  }
};

/**
 * Creates and downloads an iCalendar file
 */
export const downloadICalFile = (appointmentDetails: AppointmentDetails) => {
  try {
    // Check if we have valid date and time
    if (!appointmentDetails.date || !appointmentDetails.time) {
      toast({
        title: "Missing Information",
        description: "Could not create calendar event due to missing date or time",
        variant: "destructive",
      });
      return;
    }

    // Format the date and time for iCalendar
    const dateStr = appointmentDetails.date;
    const timeStr = appointmentDetails.time;
    
    console.log("Parsing date:", dateStr);
    console.log("Parsing time:", timeStr);
    
    // For dates formatted by date-fns or from the Calendar component
    let startDate: Date;
    
    // Try different date formats
    if (dateStr.includes(',')) {
      // Format like "May 18, 2025"
      const dateParts = dateStr.match(/([A-Za-z]+) (\d+), (\d+)/);
      if (!dateParts) {
        console.error("Could not parse date:", dateStr);
        toast({
          title: "Calendar Error",
          description: "Could not process the appointment date. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      const months: Record<string, number> = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
      };
      
      const month = months[dateParts[1] as keyof typeof months];
      const day = parseInt(dateParts[2], 10);
      const year = parseInt(dateParts[3], 10);
      
      // Parse the time (assumes format like "10:00 AM")
      const timeParts = timeStr.match(/(\d+):(\d+) ([AP]M)/);
      if (!timeParts) {
        console.error("Could not parse time:", timeStr);
        toast({
          title: "Calendar Error",
          description: "Could not process the appointment time. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      let hour = parseInt(timeParts[1], 10);
      const minute = parseInt(timeParts[2], 10);
      const ampm = timeParts[3];
      
      // Convert from 12-hour to 24-hour format
      if (ampm === "PM" && hour < 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;
      
      startDate = new Date(year, month, day, hour, minute);
    } else {
      // Fallback to current date and approximate time if format is unexpected
      console.log("Using fallback date parsing");
      startDate = new Date();
      
      // Try to extract hours and minutes from timeStr
      const timeMatch = timeStr.match(/(\d+):(\d+)/);
      if (timeMatch) {
        startDate.setHours(parseInt(timeMatch[1], 10));
        startDate.setMinutes(parseInt(timeMatch[2], 10));
      }
    }
    
    console.log("Parsed date object:", startDate);
    
    // Create end time (1 hour after start)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    
    // Format dates for iCalendar
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    
    // Create iCalendar content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Y Realty Team//Property Management Consultation//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:Y Realty Team ${appointmentDetails.callType.charAt(0).toUpperCase() + appointmentDetails.callType.slice(1)} Call`,
      'DESCRIPTION:Property Management Consultation with Y Realty Team',
      'LOCATION:Online',
      `ORGANIZER;CN=Y Realty Team:mailto:appointments@yrealty.com`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    // Create and download the file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'y-realty-appointment.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Calendar Event Created",
      description: "Your appointment has been downloaded as an iCalendar file.",
    });
  } catch (error) {
    console.error("Error creating calendar event:", error);
    toast({
      title: "Calendar Error",
      description: "Could not create calendar event. Please try again.",
      variant: "destructive",
    });
  }
};
