
import React from 'react';
import { Button } from '@/components/ui/button';

interface AppointmentFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    propertyType: string;
    message: string;
  };
  formErrors?: {
    email: string;
    phone: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isFormValid: boolean;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  formData,
  formErrors = { email: '', phone: '' },
  handleChange,
  handleSubmit,
  isSubmitting,
  isFormValid
}) => {
  return (
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
                className={`input-field w-full rounded-md border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                placeholder="Your email"
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
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
                className={`input-field w-full rounded-md border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                placeholder="Your phone"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
              )}
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
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
