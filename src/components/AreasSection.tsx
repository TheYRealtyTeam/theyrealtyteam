
import React, { useEffect, useRef, memo } from 'react';
import { MapPin, Globe } from 'lucide-react';

const AreasSection = memo(() => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  const areas = [
    { name: "East Coast", description: "Full-service property management throughout all East Coast states including New York, New Jersey, Massachusetts, and more." },
    { name: "West Coast", description: "Comprehensive management services across California, Oregon, Washington, and all West Coast markets." },
    { name: "Midwest", description: "Complete property management throughout Illinois, Michigan, Ohio, and all Midwest states." },
    { name: "South", description: "Dedicated management solutions for Texas, Florida, Georgia, and all southern regions." },
    { name: "Southwest", description: "Specialized management across Arizona, New Mexico, Nevada, and throughout the Southwest." },
  ];

  // Map initialization with more reliable approach and proper cleanup
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Create an iframe with Google Maps embed showing wider national view
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.style.borderRadius = '8px';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.loading = 'lazy'; // Add lazy loading attribute
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12470187.461098605!2d-95.665!3d39.7837!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1698429602019!5m2!1sen!2sus';
    
    // Clear any existing content
    mapRef.current.innerHTML = '';
    mapRef.current.appendChild(iframe);
    
    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section id="areas" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">Service Areas</h2>
          <p className="section-subtitle reveal">
            Comprehensive property management across all 50 states
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div ref={mapRef} className="h-96 bg-gray-200 rounded-lg shadow-lg relative overflow-hidden">
              {/* Map will be inserted here via the useEffect */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="text-center p-6 bg-white/80 rounded-lg max-w-xs">
                  <Globe className="h-10 w-10 text-yrealty-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-yrealty-navy mb-2">Nationwide Coverage</h3>
                  <p className="text-gray-700">
                    Serving properties in all 50 states
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-yrealty-navy reveal">
              Established Presence Across America
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
                Looking for property management in a specific location? Our nationwide team is ready to assist you.
              </p>
              <a href="#contact" className="btn-primary">Contact Our Team</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AreasSection.displayName = 'AreasSection';

export default AreasSection;
