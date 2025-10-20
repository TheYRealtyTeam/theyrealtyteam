
import React from 'react';
import './honeypot.css';
import { Send } from 'lucide-react';
import { useContactSectionForm } from './hooks/useContactSectionForm';

const ContactSectionForm = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useContactSectionForm();

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold mb-6 text-yrealty-navy">Send Us a Message</h3>
      
      <div className="space-y-4">
        {/* Honeypot field - hidden from users but visible to bots */}
        <input
          type="text"
          name="honeypot"
          className="honeypot-field"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot || ''}
          onChange={handleChange}
          aria-hidden="true"
        />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={100}
            className="input-field"
            placeholder="Your name"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={254}
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
              maxLength={20}
              className="input-field"
              placeholder="Your phone (optional)"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
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
            <option value="multi-family">Multi-Family</option>
            <option value="commercial">Commercial</option>
            <option value="mixed-use">Mixed-Use</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={2000}
            className="input-field resize-none"
            placeholder="Tell us about your property and management needs"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.message.length}/2000 characters (minimum 10)
          </p>
        </div>
        
        <div className="pt-2">
          <button 
            type="submit" 
            className="btn-primary w-full flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Send className="h-5 w-5 mr-2 animate-pulse" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactSectionForm;
