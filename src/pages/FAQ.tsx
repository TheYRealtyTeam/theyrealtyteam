
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import AnimationObserver from '@/utils/AnimationObserver';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FAQ = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "FAQ | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
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
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-24 pb-12 bg-yrealty-blue">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-yrealty-navy text-center">Frequently Asked Questions</h1>
            <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
              Find answers to the most common questions about property management services
            </p>
          </div>
        </div>
        
        <FAQSection />
        
        {/* Contact Section */}
        <section className="section-padding bg-white">
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
                    <h4 className="font-bold text-yrealty-navy mb-4">24/6 Emergency Service</h4>
                    <p className="text-gray-700">
                      Property emergencies don't wait for business hours. Our clients have access to 24/6 emergency support.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="reveal">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold mb-6 text-yrealty-navy">Send Us a Message</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input
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
                        <Input
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
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="Your phone (optional)"
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
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="input-field resize-none"
                        placeholder="Tell us about your property and management needs"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-yrealty-navy hover:bg-opacity-90"
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
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AnimationObserver />
    </div>
  );
};

export default FAQ;
