
import React, { useState } from 'react';
import { Phone, Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);

  // Rate limiting: 1 submission per 60 seconds
  const RATE_LIMIT_MS = 60000;

  // Enhanced input sanitization
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10 && phone.length <= 20;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Apply input filtering based on field type
    let filteredValue = value;
    if (name === 'name') {
      filteredValue = value.replace(/[^a-zA-Z\s\-\.']/g, '');
    } else if (name === 'phone') {
      filteredValue = value.replace(/[^0-9\s\-\+\(\)\.]/g, '');
    }
    
    setFormData(prev => ({ ...prev, [name]: filteredValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmissionTime < RATE_LIMIT_MS) {
      toast({
        title: "Please Wait",
        description: "Please wait before submitting another message.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.propertyType || !formData.message) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // Validate phone if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // Validate message length
    if (formData.message.length < 10 || formData.message.length > 2000) {
      toast({
        title: "Invalid Message",
        description: "Message must be between 10 and 2000 characters.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: formData.phone ? sanitizeInput(formData.phone) : null,
        property_type: sanitizeInput(formData.propertyType),
        message: sanitizeInput(formData.message)
      };

      // Use direct fetch to the edge function with proper error handling
      const response = await fetch(
        'https://axgepdguspqqxudqnobz.supabase.co/functions/v1/contact-notification',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sanitizedData)
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message');
      }
      
      // Update rate limiting timestamp
      setLastSubmissionTime(now);
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      
      // Reset form data after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "We couldn't send your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">Contact Us</h2>
          <p className="section-subtitle reveal">
            Ready to experience premium property management? Reach out to our team to discuss how we can serve your needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="bg-yrealty-blue rounded-xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 text-yrealty-navy">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-white/80 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-yrealty-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-yrealty-navy">Call Us</h4>
                    <p className="text-gray-700">(845) 734-3331</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-white/80 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-yrealty-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-yrealty-navy">Email Us</h4>
                    <p className="text-gray-700">info@theYteam.co</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold text-yrealty-navy mb-4">Business Hours</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>Closed</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-10">
                <h4 className="font-bold text-yrealty-navy mb-4">24/7 Emergency Service</h4>
                <p className="text-gray-700">
                  Property emergencies don't wait for business hours. Our clients have access to 24/7 emergency support.
                </p>
              </div>
            </div>
          </div>
          
          <div className="reveal">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-yrealty-navy">Send Us a Message</h3>
              
              <div className="space-y-4">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
