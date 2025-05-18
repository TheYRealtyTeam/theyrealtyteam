
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Phone, Video, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DateTimeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string;
  handleTimeSelect: (time: string) => void;
  callType: string;
  setCallType: (callType: string) => void;
  availableTimes: string[];
  isDateDisabled: (date: Date) => boolean;
  onContinue: () => void;
  isValid: boolean;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  date,
  setDate,
  selectedTime,
  handleTimeSelect,
  callType,
  setCallType,
  availableTimes,
  isDateDisabled,
  onContinue,
  isValid
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-yrealty-navy">Schedule an Appointment</h2>
          <div className="text-sm text-gray-500">Step 1 of 2</div>
        </div>
        <Progress value={50} className="mt-2 h-2" />
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">1. Choose a Date</h3>
        <div className="border rounded-lg overflow-hidden relative" style={{ zIndex: 50 }}>
          <div className="relative" style={{ zIndex: 50 }}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={isDateDisabled}
              className={cn("rounded-md border w-full pointer-events-auto z-50")}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6 relative z-10">
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
      
      <div className="mb-6 relative z-10">
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
        <div className="p-4 bg-yrealty-blue rounded-lg mb-6">
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

      <Button 
        onClick={onContinue}
        className="w-full bg-yrealty-navy hover:bg-yrealty-navy/90 text-white"
        disabled={!isValid}
      >
        Continue to Personal Information
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default DateTimeSelector;
