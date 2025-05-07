
import React, { useState } from 'react';
import { 
  Building, Home, User, ClipboardCheck, Wallet, LineChart, 
  ShieldCheck, Wrench, Calendar, Search, Handshake, PiggyBank
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';

const ServicesSection = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("residential");
  
  // Common service objects
  const commonServices = [
    {
      title: "Tenant Placement",
      description: "Rigorous tenant screening, background checks, and placement services to find reliable, qualified tenants for your property.",
      icon: <User className="h-10 w-10 text-yrealty-accent" />,
    },
    {
      title: "Property Inspections",
      description: "Regular inspections to maintain property conditions, identify issues early, and ensure tenant compliance.",
      icon: <ClipboardCheck className="h-10 w-10 text-yrealty-accent" />,
    },
    {
      title: "Rent Collection",
      description: "Timely, efficient rent collection with online payment options, detailed accounting, and instant owner access.",
      icon: <Wallet className="h-10 w-10 text-yrealty-accent" />,
    },
    {
      title: "Financial Reporting",
      description: "Detailed monthly and annual financial statements, tax documentation, and performance analytics.",
      icon: <LineChart className="h-10 w-10 text-yrealty-accent" />,
    },
    {
      title: "Property Security",
      description: "Implementation of security measures, monitoring systems, and emergency response protocols.",
      icon: <ShieldCheck className="h-10 w-10 text-yrealty-accent" />,
    },
    {
      title: "Maintenance Management",
      description: "24/7 maintenance coordination, vendor management, and preventative maintenance scheduling.",
      icon: <Wrench className="h-10 w-10 text-yrealty-accent" />,
    },
    {
      title: "Lease Management",
      description: "Lease drafting, renewals, enforcement, and legal compliance for all property types.",
      icon: <Calendar className="h-10 w-10 text-yrealty-accent" />,
    },
    {
      title: "Property Marketing",
      description: "Strategic property marketing, professional photography, and targeted advertising to minimize vacancies.",
      icon: <Search className="h-10 w-10 text-yrealty-accent" />,
    },
    {
      title: "Investor Relations",
      description: "Dedicated support for property investors with market analysis, acquisition assistance, and portfolio management.",
      icon: <Handshake className="h-10 w-10 text-yrealty-accent" />,
    },
    {
      title: "Value Enhancement",
      description: "Strategies to enhance property value through improvements, renovations, and market positioning.",
      icon: <PiggyBank className="h-10 w-10 text-yrealty-accent" />,
    },
  ];

  // Create specific service arrays for each tab
  const residentialServices = [
    {
      title: "Residential Property Management",
      description: "Comprehensive management for apartments, condos, and homes with tenant screening, rent collection, and maintenance coordination.",
      icon: <Home className="h-10 w-10 text-yrealty-accent" />,
    },
    ...commonServices
  ];

  const commercialServices = [
    {
      title: "Commercial Property Management",
      description: "Expert management of office buildings, retail spaces, and industrial properties to maximize ROI and tenant satisfaction.",
      icon: <Building className="h-10 w-10 text-yrealty-accent" />,
    },
    ...commonServices
  ];

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">Our Comprehensive Services</h2>
          <p className="section-subtitle reveal">
            Elevating property management with a full suite of premium services designed 
            to maximize your property's potential and minimize your stress
          </p>
          <div className="mt-4 mb-12 bg-yrealty-blue/10 p-6 rounded-lg max-w-4xl mx-auto reveal">
            <p className="text-yrealty-navy font-medium text-lg">
              As our valued client, you receive <span className="font-bold text-yrealty-accent">ALL</span> of these premium services as part of our comprehensive property management package. 
              But that's not all – we go <span className="font-bold text-yrealty-accent">BEYOND</span> the standard offerings to provide truly exceptional, tailored support.
            </p>
          </div>
        </div>

        <Tabs 
          defaultValue="residential" 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex justify-center mb-10">
            <TabsList className={`${isMobile ? 'w-full' : 'w-96'}`}>
              <TabsTrigger value="residential" className="flex-1">
                <Home className="mr-2 h-5 w-5" />
                Residential
              </TabsTrigger>
              <TabsTrigger value="commercial" className="flex-1">
                <Building className="mr-2 h-5 w-5" />
                Commercial
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="residential" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {residentialServices.map((service, index) => (
                <div 
                  key={`residential-${index}`}
                  className="service-card reveal"
                  style={{ transitionDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-yrealty-navy">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="commercial" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {commercialServices.map((service, index) => (
                <div 
                  key={`commercial-${index}`}
                  className="service-card reveal"
                  style={{ transitionDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-yrealty-navy">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center reveal">
          <p className="text-lg mb-6">
            Ready to experience our complete suite of property management services?
          </p>
          <a href="#contact" className="btn-primary">
            Request a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
