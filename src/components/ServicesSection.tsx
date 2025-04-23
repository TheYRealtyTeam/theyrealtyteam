
import React from 'react';
import { Building, Home, User, ClipboardCheck, Wallet, LineChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ServicesSection = () => {
  const services = [
    {
      title: "Property Management",
      description: "Comprehensive management solutions for residential and commercial properties.",
      icon: <Building className="h-6 w-6 text-accent" />,
    },
    {
      title: "Tenant Placement",
      description: "Professional screening and placement services for reliable, qualified tenants.",
      icon: <User className="h-6 w-6 text-accent" />,
    },
    {
      title: "Property Inspections",
      description: "Regular inspections to maintain property conditions and ensure compliance.",
      icon: <ClipboardCheck className="h-6 w-6 text-accent" />,
    },
    {
      title: "Financial Management",
      description: "Detailed financial reporting and efficient rent collection services.",
      icon: <Wallet className="h-6 w-6 text-accent" />,
    },
    {
      title: "Market Analysis",
      description: "Stay informed with detailed market analysis and performance metrics.",
      icon: <LineChart className="h-6 w-6 text-accent" />,
    },
    {
      title: "Property Marketing",
      description: "Strategic marketing to minimize vacancies and maximize returns.",
      icon: <Home className="h-6 w-6 text-accent" />,
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title reveal">Property Management Services</h2>
          <p className="section-subtitle reveal">
            Comprehensive solutions designed to maximize your property's potential and streamline operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="reveal card-hover border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="mb-6 p-3 bg-accent/10 w-fit rounded-xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center reveal">
          <a href="#contact" className="btn-primary">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

