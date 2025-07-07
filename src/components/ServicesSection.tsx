
import React, { useState } from 'react'
import { Building, Home, CheckCircle, Wrench, Users, FileText, DollarSign, Shield } from 'lucide-react'

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("residential")

  const services = [
    {
      icon: Home,
      title: "Tenant Placement",
      description: "Professional tenant screening, marketing, and placement services to find qualified renters quickly."
    },
    {
      icon: Wrench,
      title: "Maintenance & Repairs",
      description: "24/7 maintenance coordination with trusted vendors to keep your properties in excellent condition."
    },
    {
      icon: FileText,
      title: "Financial Reporting",
      description: "Detailed monthly reports and transparent accounting to track your investment performance."
    },
    {
      icon: Users,
      title: "Tenant Relations",
      description: "Professional tenant communication and relationship management for smooth operations."
    },
    {
      icon: DollarSign,
      title: "Rent Collection",
      description: "Efficient rent collection systems with automated reminders and late fee management."
    },
    {
      icon: Shield,
      title: "Legal Compliance",
      description: "Stay compliant with local laws and regulations with our expert legal knowledge."
    }
  ];

  const includedFeatures = [
    "No Setup Fees",
    "No Marketing Costs", 
    "No Inspection Fees",
    "No Technology Fees",
    "No Placement Fees",
    "No Renewal Fees",
    "No Administrative Fees",
    "No Hidden Costs"
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Enhanced header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-yrealty-navy">
            Our Comprehensive Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Elevating property management with a full suite of premium services designed 
            to maximize your property's potential and minimize your stress
          </p>
          
          {/* Value Proposition */}
          <div className="bg-gradient-to-r from-yrealty-accent to-yrealty-navy p-8 rounded-2xl max-w-5xl mx-auto text-white mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ONE Simple Price - EVERYTHING Included
            </h3>
            <p className="text-lg md:text-xl opacity-95 mb-6">
              Unlike other property management companies that nickel and dime you with add-on fees, Y Realty Team includes <span className="font-bold">EVERYTHING</span> in one transparent management fee.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-base mb-6">
              {includedFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="w-full">
          <div className="flex justify-center mb-12">
            <div className="w-full md:w-96 inline-flex h-auto min-h-12 items-center justify-center rounded-xl bg-gray-100 p-2 text-muted-foreground shadow-inner">
              <button 
                onClick={() => setActiveTab("residential")}
                className={`flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-3 text-lg font-bold transition-all duration-300
                  ${activeTab === "residential" 
                    ? "bg-white text-yrealty-navy shadow-md" 
                    : "hover:bg-white/50"}`}
              >
                <Home className="mr-3 h-6 w-6" />
                Residential
              </button>
              <button 
                onClick={() => setActiveTab("commercial")}
                className={`flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-3 text-lg font-bold transition-all duration-300
                  ${activeTab === "commercial" 
                    ? "bg-white text-yrealty-navy shadow-md" 
                    : "hover:bg-white/50"}`}
              >
                <Building className="mr-3 h-6 w-6" />
                Commercial
              </button>
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <service.icon className="w-12 h-12 text-yrealty-accent mb-4" />
                <h3 className="text-xl font-semibold text-yrealty-navy mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-12 rounded-2xl text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Transparent, All-Inclusive Property Management?
            </h3>
            <p className="text-xl mb-8 opacity-95 max-w-3xl mx-auto">
              Join hundreds of satisfied property owners who love our straightforward pricing with everything included. 
              Get your free consultation and discover how much you can save with our transparent approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-accent bg-white text-yrealty-navy hover:bg-gray-100 text-lg px-8 py-4 font-bold">
                Get Free Consultation
              </a>
              <a href="tel:(845)734-3331" className="btn-outline border-white text-white hover:bg-white hover:text-yrealty-navy text-lg px-8 py-4 font-bold">
                Call (845) 734-3331
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
