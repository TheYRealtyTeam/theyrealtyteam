
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

const AppointmentScheduler = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
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
    
    setIsSubmitting(true);
    
    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Simulate appointment booking
    setTimeout(() => {
      toast({
        title: "Appointment Scheduled!",
        description: `Your appointment has been scheduled for ${formattedDate} at ${selectedTime}.`,
        duration: 5000,
      });
      
      // Reset form
      setDate(undefined);
      setSelectedTime('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-yrealty-navy">Select Date & Time</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-gray-700">1. Choose a Date</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isDateDisabled}
                    className="rounded-md border"
                  />
                </div>
              </div>
              
              <div>
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
                    >
                      {time}
                    </button>
                  ))}
                </div>
                
                {date && selectedTime && (
                  <div className="mt-6 p-4 bg-yrealty-blue rounded-lg">
                    <p className="font-medium text-yrealty-navy">Your Selected Appointment:</p>
                    <p className="text-gray-700">
                      {date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} at {selectedTime}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="reveal">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
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
                    className="input-field"
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
                      className="input-field"
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
                      className="input-field"
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
                    className="input-field"
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
                    className="input-field resize-none"
                    placeholder="Tell us about your property management needs or any questions you have"
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-yrealty-navy hover:bg-yrealty-navy/90"
                    disabled={isSubmitting || !date || !selectedTime}
                  >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-16 reveal">
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
      </div>
    </section>
  );
};

export default AppointmentScheduler;
