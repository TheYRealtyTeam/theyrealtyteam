
import React from 'react';
import { 
  Building, Home, User, ClipboardCheck, Wallet, LineChart, 
  ShieldCheck, Wrench, Calendar, Search, Handshake, PiggyBank
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: "Residential Property Management",
      description: "Comprehensive management for apartments, condos, and homes with professional tenant screening and maintenance.",
      icon: <Home className="h-8 w-8 text-yrealty-accent" />,
    },
    {
      title: "Commercial Property Management",
      description: "Expert management of office buildings, retail spaces, and industrial properties to optimize performance.",
      icon: <Building className="h-8 w-8 text-yrealty-accent" />,
    },
    {
      title: "Tenant Placement",
      description: "Professional tenant screening and placement services to find reliable, qualified tenants.",
      icon: <User className="h-8 w-8 text-yrealty-accent" />,
    },
    {
      title: "Property Inspections",
      description: "Regular property inspections to maintain conditions and ensure compliance.",
      icon: <ClipboardCheck className="h-8 w-8 text-yrealty-accent" />,
    },
    {
      title: "Financial Management",
      description: "Efficient rent collection and detailed financial reporting for property owners.",
      icon: <Wallet className="h-8 w-8 text-yrealty-accent" />,
    },
    {
      title: "Market Analysis",
      description: "Stay informed with detailed market analysis and property performance metrics.",
      icon: <LineChart className="h-8 w-8 text-yrealty-accent" />,
    }
  ];

  return (
    <section id="services" className="py-20 bg-yrealty-subtle">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-yrealty-navy mb-4">
            Comprehensive Property Management
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional services designed to maximize your property's potential and streamline operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-6 p-3 bg-yrealty-blue inline-block rounded-lg">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-yrealty-navy">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#contact" className="inline-flex items-center px-6 py-3 bg-yrealty-accent text-white rounded-lg hover:bg-opacity-90 transition-colors">
            Request Service Information
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
