
import React, { useEffect, useRef } from 'react';
import { MapPin, Globe } from 'lucide-react';

const AreasSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Areas we serve - featuring NY & NJ as premier markets
  const areas = [
    { name: "New York", description: "Full-service property management throughout Manhattan, Brooklyn, Queens, The Bronx, and Staten Island." },
    { name: "New Jersey", description: "Specialized services across Jersey City, Newark, Hoboken, Princeton, and other growing New Jersey markets." },
    { name: "Northeast", description: "Supporting property owners in Boston, Philadelphia, and other Northeastern metropolitan areas." },
    { name: "Southeast", description: "Dedicated management for residential and commercial properties in Miami, Atlanta, Charlotte, and surrounding regions." },
    { name: "Greater United States", description: "Comprehensive property management across key metropolitan areas throughout the country." },
  ];

  // Map initialization would go here in a real implementation
  useEffect(() => {
    // For this example, we'll show a map focusing on NY & NJ while showing the US
    if (mapRef.current) {
      mapRef.current.innerHTML = `<img src="https://maps.googleapis.com/maps/api/staticmap?center=New+York+New+Jersey&zoom=7&size=600x400&maptype=roadmap&key=DEMO_KEY" alt="Map of New York and New Jersey" class="w-full h-full object-cover rounded-lg shadow-lg" />`;
    }
  }, []);

  return (
    <section id="areas" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">Areas We Serve</h2>
          <p className="section-subtitle reveal">
            New York & New Jersey's premier property management service, with nationwide coverage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div ref={mapRef} className="h-96 bg-gray-200 rounded-lg shadow-lg relative overflow-hidden">
              {/* Map will be inserted here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 bg-white/80 rounded-lg">
                  <Globe className="h-10 w-10 text-yrealty-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-yrealty-navy mb-2">NY & NJ Specialists</h3>
                  <p className="text-gray-700">
                    With nationwide coverage in all 50 states
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-yrealty-navy reveal">
              Expert Property Management in New York & New Jersey
            </h3>
            
            <div className="space-y-6">
              {areas.map((area, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 reveal flex"
                  style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="mr-4">
                    <div className="w-10 h-10 rounded-full bg-yrealty-blue flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-yrealty-accent" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-yrealty-navy mb-1">{area.name}</h4>
                    <p className="text-gray-600">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 reveal" style={{ transitionDelay: '0.6s' }}>
              <p className="text-gray-700 mb-4">
                Don't see your specific location? We likely serve it too! Our nationwide presence ensures we can manage properties wherever you need us.
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
