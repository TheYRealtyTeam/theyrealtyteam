
import React, { useEffect, useRef } from 'react';
import { MapPin, Globe } from 'lucide-react';

const AreasSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Areas we serve - all presented as current markets
  const areas = [
    { name: "New York", description: "Full-service property management throughout Manhattan, Brooklyn, Queens, The Bronx, and Staten Island." },
    { name: "New Jersey", description: "Specialized services across Jersey City, Newark, Hoboken, Princeton, and other growing New Jersey markets." },
    { name: "Boston", description: "Complete management services throughout Boston and surrounding Massachusetts communities." },
    { name: "Philadelphia", description: "Dedicated management solutions for Philadelphia and surrounding Pennsylvania regions." },
    { name: "Montgomery", description: "Specialized multi-family property management across Montgomery and central Alabama." },
  ];

  // Map initialization with more reliable approach
  useEffect(() => {
    if (mapRef.current) {
      // Create an iframe with Google Maps embed showing wider regional view
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = '0';
      iframe.style.borderRadius = '8px';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.src = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6097581.775365128!2d-79.41513!3d40.05317!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c0fb959e00409f%3A0x2cd27b07f83f6d8d!2sUnited%20States!5e0!3m2!1sen!2sus!4v1698429602019!5m2!1sen!2sus';
      
      // Clear any existing content
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(iframe);
    }
  }, []);

  return (
    <section id="areas" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">Service Areas</h2>
          <p className="section-subtitle reveal">
            Comprehensive property management across the Northeast and Alabama
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div ref={mapRef} className="h-96 bg-gray-200 rounded-lg shadow-lg relative overflow-hidden">
              {/* Map will be inserted here via the useEffect */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="text-center p-6 bg-white/80 rounded-lg max-w-xs">
                  <Globe className="h-10 w-10 text-yrealty-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-yrealty-navy mb-2">Multi-Region Coverage</h3>
                  <p className="text-gray-700">
                    Serving properties across multiple states
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-yrealty-navy reveal">
              Established Presence in Key Markets
            </h3>
            
            <div className="space-y-6">
              {areas.map((area, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 rounded-lg shadow-sm border border-yrealty-accent reveal flex"
                  style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-full bg-yrealty-blue flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-yrealty-accent" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-yrealty-navy mb-1">
                      {area.name}
                    </h4>
                    <p className="text-gray-600">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 reveal" style={{ transitionDelay: '0.6s' }}>
              <p className="text-gray-700 mb-4">
                Looking for property management in a specific location? Contact our team to discuss how we can serve your needs.
              </p>
              <a href="#contact" className="btn-primary">Contact Our Team</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
