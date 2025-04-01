
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Globe, TrendingUp } from 'lucide-react';

const AreasSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapApiKey, setMapApiKey] = useState<string>('');
  
  // Areas we serve - featuring NY & NJ as premier markets with a focus on future expansion
  const areas = [
    { name: "New York", description: "Full-service property management throughout Manhattan, Brooklyn, Queens, The Bronx, and Staten Island.", current: true },
    { name: "New Jersey", description: "Specialized services across Jersey City, Newark, Hoboken, Princeton, and other growing New Jersey markets.", current: true },
    { name: "Northeast Expansion", description: "Expanding our services to Boston, Philadelphia, and other Northeastern metropolitan areas.", current: false },
    { name: "Southeast Growth", description: "Planning dedicated management solutions for Miami, Atlanta, Charlotte, and surrounding regions.", current: false },
    { name: "National Vision", description: "Strategic expansion to key metropolitan areas throughout the country over the next 5 years.", current: false },
  ];

  // Map initialization with more reliable approach
  useEffect(() => {
    if (mapRef.current) {
      // Create an iframe with Google Maps embed
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = '0';
      iframe.style.borderRadius = '8px';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548555644!3d40.69767006766623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sph!4v1654204498049!5m2!1sen!2sph';
      
      // Clear any existing content
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(iframe);
    }
  }, []);

  return (
    <section id="areas" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">Our Growth Vision</h2>
          <p className="section-subtitle reveal">
            Starting with New York & New Jersey, expanding across America
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div ref={mapRef} className="h-96 bg-gray-200 rounded-lg shadow-lg relative overflow-hidden">
              {/* Map will be inserted here via the useEffect */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="text-center p-6 bg-white/80 rounded-lg max-w-xs">
                  <TrendingUp className="h-10 w-10 text-yrealty-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-yrealty-navy mb-2">Expanding Nationwide</h3>
                  <p className="text-gray-700">
                    From NY & NJ to across America
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-yrealty-navy reveal">
              From Local Excellence to National Presence
            </h3>
            
            <div className="space-y-6">
              {areas.map((area, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-4 rounded-lg shadow-sm border ${area.current ? 'border-yrealty-accent' : 'border-gray-100'} reveal flex`}
                  style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="mr-4">
                    <div className={`w-10 h-10 rounded-full ${area.current ? 'bg-yrealty-blue' : 'bg-gray-100'} flex items-center justify-center`}>
                      <MapPin className={`h-5 w-5 ${area.current ? 'text-yrealty-accent' : 'text-gray-400'}`} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-yrealty-navy mb-1">
                      {area.name}
                      {!area.current && <span className="ml-2 text-xs font-medium text-yrealty-accent bg-yrealty-accent/10 px-2 py-1 rounded-full">Future</span>}
                    </h4>
                    <p className="text-gray-600">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 reveal" style={{ transitionDelay: '0.6s' }}>
              <p className="text-gray-700 mb-4">
                While we perfect our services in the NY & NJ area, we're actively planning our expansion. Have property elsewhere? Contact us to discuss future possibilities.
              </p>
              <a href="#contact" className="btn-primary">Discuss Our Expansion Plans</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
