
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const AreasSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Areas we serve
  const areas = [
    { name: "Manhattan", description: "Full-service property management throughout Manhattan's diverse neighborhoods." },
    { name: "Brooklyn", description: "Specialized services for Brooklyn's rapidly evolving real estate market." },
    { name: "Queens", description: "Supporting property owners in Queens with tailored management solutions." },
    { name: "The Bronx", description: "Dedicated management for residential and commercial properties in The Bronx." },
    { name: "Staten Island", description: "Comprehensive property management across Staten Island communities." },
  ];

  // Map initialization would go here in a real implementation
  useEffect(() => {
    // For this example, we'll just use a static map image
    if (mapRef.current) {
      mapRef.current.innerHTML = `<img src="https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=11&size=600x400&maptype=roadmap&key=DEMO_KEY" alt="Map of New York City" class="w-full h-full object-cover rounded-lg shadow-lg" />`;
    }
  }, []);

  return (
    <section id="areas" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">Areas We Serve</h2>
          <p className="section-subtitle reveal">
            Delivering exceptional property management services across all five boroughs of New York City
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div ref={mapRef} className="h-96 bg-gray-200 rounded-lg shadow-lg relative overflow-hidden">
              {/* Map will be inserted here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 bg-white/80 rounded-lg">
                  <MapPin className="h-10 w-10 text-yrealty-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-yrealty-navy mb-2">New York City</h3>
                  <p className="text-gray-700">
                    Interactive map would appear here in the production version.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-yrealty-navy reveal">
              Expert Property Management Throughout NYC
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
                Don't see your specific neighborhood? We likely serve it too! Contact us to discuss your property's location.
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
