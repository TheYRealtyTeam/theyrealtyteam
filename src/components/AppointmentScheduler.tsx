
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Phone, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AppointmentScheduler = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [callType, setCallType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available appointment times
  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateDisabled = (date: Date) => {
    return isWeekend(date) || isPastDate(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: "Error",
        description: "Please select a time for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    if (!callType) {
      toast({
        title: "Error",
        description: "Please select either phone or video call.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Format the date
    const formattedDate = date.toISOString().split('T')[0];
    
    try {
      // Save the appointment to the database
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          date: formattedDate,
          time: selectedTime,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          property_type: formData.propertyType,
          message: formData.message || '',
          call_type: callType
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Appointment Scheduled!",
        description: `Your ${callType} call has been scheduled for ${date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} at ${selectedTime}.`,
        duration: 5000,
      });
      
      // Reset form
      setDate(undefined);
      setSelectedTime('');
      setCallType('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        message: ''
      });
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    console.log("AppointmentScheduler mounted");
    
    // Fix: Use the optional chaining with HTMLElement type assertion to safely access style
    const dayPicker = document.querySelector('.react-day-picker');
    console.log("Calendar pointer-events:", dayPicker ? (dayPicker as HTMLElement).style.pointerEvents : "element not found");
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="reveal">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative z-20">
            <h2 className="text-2xl font-bold mb-6 text-yrealty-navy">Select Date & Time</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-700">1. Choose a Date</h3>
              <div className="border rounded-lg overflow-hidden relative z-30">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isDateDisabled}
                  className="rounded-md border pointer-events-auto relative z-40"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-700">2. Select a Time</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`py-2 px-3 rounded-md text-center transition-colors ${
                      selectedTime === time 
                        ? 'bg-yrealty-navy text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    type="button"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-700">3. Choose Call Type</h3>
              <RadioGroup value={callType} onValueChange={setCallType} className="flex gap-4">
                <div className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${callType === 'phone' ? 'border-yrealty-navy bg-yrealty-blue/20' : 'border-gray-200'}`}>
                  <div className="mb-2 rounded-full bg-gray-100 p-2">
                    <Phone className={`h-6 w-6 ${callType === 'phone' ? 'text-yrealty-navy' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone" />
                    <label htmlFor="phone" className="font-medium cursor-pointer">Phone Call</label>
                  </div>
                </div>
                <div className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${callType === 'video' ? 'border-yrealty-navy bg-yrealty-blue/20' : 'border-gray-200'}`}>
                  <div className="mb-2 rounded-full bg-gray-100 p-2">
                    <Video className={`h-6 w-6 ${callType === 'video' ? 'text-yrealty-navy' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <label htmlFor="video" className="font-medium cursor-pointer">Video Call</label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            {date && selectedTime && callType && (
              <div className="p-4 bg-yrealty-blue rounded-lg">
                <p className="font-medium text-yrealty-navy">Your Selected Appointment:</p>
                <p className="text-gray-700">
                  {date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} at {selectedTime}
                </p>
                <p className="text-gray-700 mt-1">
                  Call type: <span className="font-medium capitalize">{callType}</span>
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="reveal">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-yrealty-navy">Your Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field w-full rounded-md border border-gray-300 px-4 py-3"
                  placeholder="Your name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field w-full rounded-md border border-gray-300 px-4 py-3"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field w-full rounded-md border border-gray-300 px-4 py-3"
                    placeholder="Your phone"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="input-field w-full rounded-md border border-gray-300 px-4 py-3"
                >
                  <option value="">Select property type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="mixed-use">Mixed-Use</option>
                  <option value="not-sure">Not Sure Yet</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field resize-none w-full rounded-md border border-gray-300 px-4 py-3"
                  placeholder="Tell us about your property management needs or any questions you have"
                />
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-yrealty-navy hover:bg-yrealty-navy/90"
                  disabled={isSubmitting || !date || !selectedTime || !callType}
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
