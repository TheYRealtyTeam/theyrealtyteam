import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Phone, Mail, Globe, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
  };

  return (
    <PageLayout 
      title="Contact Us"
      subtitle="Ready to experience premium property management? Reach out to our team to discuss how we can serve your needs"
      metaDescription="Contact Y Realty Team for premium property management services. Schedule a consultation, request a quote, or ask questions about our property management solutions."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
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

              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-white/80 p-2 rounded-full">
                  <Globe className="h-5 w-5 text-yrealty-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-yrealty-navy">Website</h4>
                  <p className="text-gray-700">theyteam.co</p>
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
        
        <div>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-yrealty-navy">Send Us a Message</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full"
                  placeholder="Your name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full"
                    placeholder="Your phone (optional)"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-3"
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full resize-none"
                  placeholder="Tell us about your property and management needs"
                />
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-yrealty-navy hover:bg-opacity-90"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;