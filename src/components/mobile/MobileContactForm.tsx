
import React, { useState } from 'react';
import { Send, Phone, MessageCircle, User, Mail, Building } from 'lucide-react';
import { useContactSectionForm } from '../contact/hooks/useContactSectionForm';

const MobileContactForm = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useContactSectionForm();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.length >= 2;
      case 2:
        return formData.email && formData.propertyType;
      case 3:
        return formData.message.length >= 10;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">Get in Touch</h3>
          <span className="text-white/80 text-sm">Step {currentStep} of {totalSteps}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-yrealty-accent mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-gray-800">Tell us about yourself</h4>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-yrealty-accent focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={20}
                className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-yrealty-accent focus:border-transparent transition-all"
                placeholder="Your phone (optional)"
              />
            </div>
          </div>
        )}

        {/* Step 2: Contact Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Mail className="h-12 w-12 text-yrealty-accent mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-gray-800">Contact & Property Details</h4>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={254}
                className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-yrealty-accent focus:border-transparent transition-all"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                Property Type *
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-yrealty-accent focus:border-transparent transition-all bg-white"
              >
                <option value="">Select property type</option>
                <option value="residential">Residential</option>
                <option value="multi-family">Multi-Family</option>
                <option value="commercial">Commercial</option>
                <option value="mixed-use">Mixed-Use</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Message */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MessageCircle className="h-12 w-12 text-yrealty-accent mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-gray-800">Tell us about your needs</h4>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={2000}
                className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-yrealty-accent focus:border-transparent transition-all resize-none"
                placeholder="Tell us about your property and management needs"
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.message.length}/2000 characters (minimum 10)
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Back
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className="flex-1 px-6 py-4 bg-yrealty-accent text-white rounded-xl font-semibold disabled:bg-gray-300 disabled:text-gray-500 hover:bg-yrealty-accent/90 transition-all"
            >
              Next
            </button>
          ) : (
            <button 
              type="submit" 
              className="flex-1 bg-yrealty-accent hover:bg-yrealty-accent/90 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              disabled={isSubmitting || !isStepValid()}
            >
              {isSubmitting ? (
                <>
                  <Send className="h-5 w-5 animate-pulse" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Message
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {/* Quick Call Option */}
      <div className="border-t border-gray-100 p-4 bg-gray-50">
        <p className="text-center text-sm text-gray-600 mb-3">Prefer to talk directly?</p>
        <a 
          href="tel:(845)734-3331"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <Phone size={18} />
          Call (845) 734-3331
        </a>
      </div>
    </div>
  );
};

export default MobileContactForm;
