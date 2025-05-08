
import React from 'react';
import { 
  Building, Home, User, ClipboardCheck, Wallet, LineChart, 
  ShieldCheck, Wrench, Calendar, Search, Handshake, PiggyBank
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const ServicesSection = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState("residential");
  
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

  // ServiceCard component
  const ServiceCard = ({ title, description, icon, delay }) => (
    <div 
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow service-card reveal"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-yrealty-navy">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

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

        {/* Custom Tab Implementation Instead of Using shadcn Tabs */}
        <div className="w-full">
          <div className="flex justify-center mb-10">
            <div className={`${isMobile ? 'w-full' : 'w-96'} inline-flex h-auto min-h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground`}>
              <button 
                onClick={() => setActiveTab("residential")}
                className={`flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium 
                  ${activeTab === "residential" ? "bg-background text-foreground shadow-sm" : ""}`}
              >
                <Home className="mr-2 h-5 w-5" />
                Residential
              </button>
              <button 
                onClick={() => setActiveTab("commercial")}
                className={`flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium 
                  ${activeTab === "commercial" ? "bg-background text-foreground shadow-sm" : ""}`}
              >
                <Building className="mr-2 h-5 w-5" />
                Commercial
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "residential" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {residentialServices.map((service, index) => (
                  <ServiceCard 
                    key={`residential-${index}`} 
                    title={service.title} 
                    description={service.description} 
                    icon={service.icon} 
                    delay={0.1 + index * 0.05} 
                  />
                ))}
              </div>
            )}
            
            {activeTab === "commercial" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {commercialServices.map((service, index) => (
                  <ServiceCard 
                    key={`commercial-${index}`} 
                    title={service.title} 
                    description={service.description} 
                    icon={service.icon} 
                    delay={0.1 + index * 0.05} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>

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
