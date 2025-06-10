
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';
import Logo from './Logo';

const Footer = () => {
  const { navigateToPage, scrollToSection } = useSimpleNavigation();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      scrollToSection(sectionId);
    } else {
      navigateToPage(href);
    }
  };

  return (
    <footer className="bg-yrealty-navy text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-300 leading-relaxed">
              Professional property management services across all 50 states. 
              Your success is our priority.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-yrealty-accent rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">(845) 734-3331</p>
                <p className="text-sm text-gray-300">Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleLinkClick('#about')}
                  className="text-gray-300 hover:text-yrealty-accent transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('#services')}
                  className="text-gray-300 hover:text-yrealty-accent transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/blog')}
                  className="text-gray-300 hover:text-yrealty-accent transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/tools')}
                  className="text-gray-300 hover:text-yrealty-accent transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  Calculators
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Property Management</li>
              <li>Tenant Screening</li>
              <li>Maintenance Coordination</li>
              <li>Financial Reporting</li>
              <li>24/7 Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yrealty-accent" />
                <span>info@theYteam.co</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yrealty-accent" />
                <span>Nationwide Coverage</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300">
              &copy; 2024 Y Realty Team. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={() => handleLinkClick('/faq')}
                className="text-gray-300 hover:text-yrealty-accent transition-colors bg-transparent border-none cursor-pointer p-0"
              >
                FAQ
              </button>
              <button 
                onClick={() => handleLinkClick('/contact')}
                className="text-gray-300 hover:text-yrealty-accent transition-colors bg-transparent border-none cursor-pointer p-0"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
