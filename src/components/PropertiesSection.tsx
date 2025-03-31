
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Building, Home, MapPin } from 'lucide-react';

const PropertiesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const properties = [
    {
      title: "Luxury Apartment Building",
      location: "Upper East Side, Manhattan",
      description: "A stunning 20-story luxury building featuring 75 premium apartments with state-of-the-art amenities.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800",
      type: "Residential",
      units: 75,
    },
    {
      title: "Commercial Office Complex",
      location: "Financial District, Manhattan",
      description: "Premium office space spanning 15 floors with modern design and eco-friendly features.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      type: "Commercial",
      units: 50,
    },
    {
      title: "Boutique Residential Building",
      location: "Williamsburg, Brooklyn",
      description: "A modern 12-unit boutique residential building with designer finishes and rooftop garden.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800",
      type: "Residential",
      units: 12,
    },
    {
      title: "Mixed-Use Development",
      location: "Long Island City, Queens",
      description: "Contemporary mixed-use property with retail spaces and luxury apartments in a prime location.",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80&w=800",
      type: "Mixed-Use",
      units: 40,
    },
  ];

  const nextProperty = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % properties.length);
  };

  const prevProperty = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + properties.length) % properties.length);
  };

  return (
    <section id="properties" className="section-padding bg-yrealty-blue">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">Featured Properties</h2>
          <p className="section-subtitle reveal">
            A showcase of premium properties we proudly manage throughout New York City
          </p>
        </div>

        <div className="relative">
          <div className="property-card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img 
                  src={properties[activeIndex].image} 
                  alt={properties[activeIndex].title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center text-yrealty-accent mb-2">
                  {properties[activeIndex].type === "Residential" ? (
                    <Home className="h-5 w-5 mr-2" />
                  ) : properties[activeIndex].type === "Commercial" ? (
                    <Building className="h-5 w-5 mr-2" />
                  ) : (
                    <Building className="h-5 w-5 mr-2" />
                  )}
                  <span className="text-sm font-semibold">{properties[activeIndex].type}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-yrealty-navy">{properties[activeIndex].title}</h3>
                <div className="flex items-center mb-4 text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{properties[activeIndex].location}</span>
                </div>
                <p className="text-gray-700 mb-4">{properties[activeIndex].description}</p>
                <div className="flex items-center mb-6">
                  <span className="text-yrealty-navy font-bold text-lg mr-2">{properties[activeIndex].units}</span>
                  <span className="text-gray-600">Units Managed</span>
                </div>
                <a href="#contact" className="btn-outline self-start">Inquire About Management</a>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevProperty} 
              className="p-2 rounded-full bg-white shadow-md hover:bg-yrealty-navy hover:text-white transition-colors"
              aria-label="Previous property"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            <div className="flex items-center gap-2">
              {properties.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex ? 'bg-yrealty-navy scale-125' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to property ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextProperty} 
              className="p-2 rounded-full bg-white shadow-md hover:bg-yrealty-navy hover:text-white transition-colors"
              aria-label="Next property"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
