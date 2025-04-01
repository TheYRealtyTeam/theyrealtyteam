
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-yrealty-navy text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo className="mb-6 text-white" />
            <p className="text-gray-300 mb-6">
              New York's premier property management company dedicated to maximizing your property's potential through exceptional service and innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-yrealty-accent transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-yrealty-accent transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-yrealty-accent transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-yrealty-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Properties', 'Areas', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <ArrowUp className="h-3 w-3 rotate-45 mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {['Residential Management', 'Commercial Management', 'Tenant Placement', 'Property Marketing', 'Maintenance', 'Financial Reporting'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <ArrowUp className="h-3 w-3 rotate-45 mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-yrealty-accent mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-300">9 Ellen St, New City, NY 10956</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-yrealty-accent mr-3 flex-shrink-0" />
                <span className="text-gray-300">(845) 734-3331</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-yrealty-accent mr-3 flex-shrink-0" />
                <a href="mailto:info@theYteam.co" className="text-gray-300 hover:text-white transition-colors">info@theYteam.co</a>
              </li>
            </ul>
            <a href="#contact" className="mt-6 inline-block px-5 py-2 bg-yrealty-accent text-white rounded-md hover:bg-opacity-90 transition-all">
              Contact Us
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Y Realty Team. All rights reserved. <a href="https://theYteam.co" className="hover:text-white transition-colors">theYteam.co</a>
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-yrealty-navy text-white shadow-lg hover:bg-yrealty-accent transition-colors z-10"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;
