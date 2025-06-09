
import React from 'react';
import { Building, Home, Shield, Users, TrendingUp, Clock, MapPin, Phone } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import MobileServiceCard from './MobileServiceCard';

const MobileServicesSection = () => {
  const residentialServices = [
    {
      icon: Home,
      title: "Residential Property Management",
      description: "Complete management for single-family homes, condos, and apartments",
      features: [
        "Tenant screening & placement",
        "Rent collection & financial reporting", 
        "24/7 maintenance coordination",
        "Property inspections",
        "Lease management"
      ]
    },
    {
      icon: Users,
      title: "Tenant Relations",
      description: "Expert tenant communication and relationship management",
      features: [
        "24/7 tenant support hotline",
        "Online tenant portal",
        "Maintenance request handling",
        "Lease renewal negotiations",
        "Conflict resolution"
      ]
    },
    {
      icon: TrendingUp,
      title: "Investment Analysis",
      description: "Maximize your property's rental income potential",
      features: [
        "Market rent analysis",
        "Property value assessments",
        "ROI optimization strategies",
        "Investment portfolio management",
        "Performance reporting"
      ]
    }
  ];

  const commercialServices = [
    {
      icon: Building,
      title: "Commercial Property Management",
      description: "Professional management for office buildings, retail, and industrial properties",
      features: [
        "Commercial tenant relations",
        "Lease administration",
        "Property maintenance",
        "Financial reporting",
        "Compliance management"
      ]
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Comprehensive protection for your commercial investments",
      features: [
        "Insurance coordination",
        "Legal compliance",
        "Safety inspections",
        "Emergency response",
        "Documentation management"
      ]
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock support for all your property needs",
      features: [
        "Emergency maintenance",
        "After-hours support",
        "Rapid response team",
        "Vendor coordination",
        "Crisis management"
      ]
    }
  ];

  return (
    <section id="services" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-yrealty-navy mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Comprehensive property management solutions designed for your success
          </p>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-r from-yrealty-accent to-yrealty-navy p-6 rounded-2xl mb-12 text-white">
          <h3 className="text-xl font-bold mb-3">
            ONE Simple Price - EVERYTHING Included
          </h3>
          <p className="text-sm leading-relaxed mb-4">
            No hidden fees, no surprise charges. Our transparent pricing includes ALL services, technology, inspections, and support.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>No Marketing Costs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>No Hidden Costs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>No Admin Fees</span>
            </div>
          </div>
        </div>

        {/* Residential Services */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yrealty-blue p-3 rounded-xl">
              <Home className="h-6 w-6 text-yrealty-navy" />
            </div>
            <h3 className="text-2xl font-bold text-yrealty-navy">Residential</h3>
          </div>
          <div className="space-y-4">
            {residentialServices.map((service, index) => (
              <MobileServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        </div>

        {/* Commercial Services */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yrealty-blue p-3 rounded-xl">
              <Building className="h-6 w-6 text-yrealty-navy" />
            </div>
            <h3 className="text-2xl font-bold text-yrealty-navy">Commercial</h3>
          </div>
          <div className="space-y-4">
            {commercialServices.map((service, index) => (
              <MobileServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <a 
            href="tel:(845)734-3331"
            className="bg-yrealty-accent text-white p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg font-semibold"
          >
            <Phone size={20} />
            Call Now: (845) 734-3331
          </a>
          <a 
            href="#contact"
            className="bg-white border-2 border-yrealty-accent text-yrealty-accent p-4 rounded-xl flex items-center justify-center gap-3 font-semibold"
          >
            <MapPin size={20} />
            Get Free Consultation
          </a>
        </div>

        {/* Success Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h4 className="text-lg font-bold text-yrealty-navy mb-4 text-center">Why Choose Y Realty Team?</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yrealty-accent">50+</div>
              <div className="text-sm text-gray-600">States Covered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yrealty-accent">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yrealty-accent">100%</div>
              <div className="text-sm text-gray-600">Transparent</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileServicesSection;
