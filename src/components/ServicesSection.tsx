import React, { useState } from 'react';
import { 
  Building, Home, User, ClipboardCheck, Wallet, LineChart, 
  ShieldCheck, Wrench, Calendar, Search, Handshake, PiggyBank,
  Loader, CheckCircle, TrendingUp, Clock
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ServicesSection = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("residential");
  const [isLoading, setIsLoading] = useState(false);

  // Case studies data
  const caseStudies = [
    {
      title: "10-Unit Building Filled in 12 Days",
      description: "Transformed a struggling multi-family property with 40% vacancy into a fully occupied, profitable investment.",
      metrics: ["40% to 0% vacancy", "15% rent increase", "ROI improved 22%"],
      timeframe: "12 days"
    },
    {
      title: "Commercial Property Turnaround",
      description: "Revitalized a downtown office building, securing long-term tenants and increasing property value.",
      metrics: ["3 new long-term leases", "25% revenue increase", "Property value up 18%"],
      timeframe: "3 months"
    },
    {
      title: "Portfolio Optimization Success",
      description: "Streamlined management for 50+ residential units across 3 states, dramatically improving efficiency.",
      metrics: ["Maintenance costs down 30%", "Tenant satisfaction up 40%", "Owner profits up 20%"],
      timeframe: "6 months"
    }
  ];

  // Enhanced service objects with detailed descriptions
  const coreServices = [
    {
      title: "Expert Tenant Placement",
      description: "Rigorous 12-point tenant screening process including credit checks, employment verification, rental history analysis, and background checks to place only the most qualified tenants.",
      icon: <User className="h-12 w-12 text-yrealty-accent" />,
      features: ["12-point screening process", "Average 3-day placement", "95% tenant retention rate", "Legal compliance guaranteed"],
      pricing: "Contact for competitive rates"
    },
    {
      title: "Comprehensive Property Inspections",
      description: "Monthly detailed inspections using Site Audit Pro technology, identifying maintenance issues before they become costly problems and ensuring tenant compliance.",
      icon: <ClipboardCheck className="h-12 w-12 text-yrealty-accent" />,
      features: ["Monthly detailed reports", "Photo documentation", "Preventive maintenance alerts", "Code compliance monitoring"],
      pricing: "Included in management fee"
    },
    {
      title: "Advanced Rent Collection",
      description: "Automated rent collection system with online payments, late fee management, and detailed financial tracking through AppFolio integration.",
      icon: <Wallet className="h-12 w-12 text-yrealty-accent" />,
      features: ["Online payment portal", "Automated late fees", "Real-time tracking", "99.2% collection rate"],
      pricing: "No additional fees"
    },
    {
      title: "Detailed Financial Reporting",
      description: "Monthly and annual financial statements, tax documentation, expense tracking, and performance analytics accessible through our client portal 24/7.",
      icon: <LineChart className="h-12 w-12 text-yrealty-accent" />,
      features: ["Monthly statements", "Tax-ready documents", "Performance analytics", "24/7 portal access"],
      pricing: "Included in service"
    },
    {
      title: "24/7 Property Security",
      description: "Implementation of security measures, monitoring systems, emergency response protocols, and coordination with local authorities when needed.",
      icon: <ShieldCheck className="h-12 w-12 text-yrealty-accent" />,
      features: ["Emergency response", "Security system monitoring", "Local authority coordination", "Incident documentation"],
      pricing: "Custom security packages available"
    },
    {
      title: "Maintenance Management",
      description: "24/7 maintenance coordination with our vetted contractor network, preventative maintenance scheduling, and emergency response protocols.",
      icon: <Wrench className="h-12 w-12 text-yrealty-accent" />,
      features: ["24/7 emergency response", "Vetted contractor network", "Preventive scheduling", "Cost optimization"],
      pricing: "Maintenance at cost + coordination fee"
    },
    {
      title: "Professional Lease Management",
      description: "Expert lease drafting, renewal negotiations, legal compliance monitoring, and enforcement procedures to protect your investment.",
      icon: <Calendar className="h-12 w-12 text-yrealty-accent" />,
      features: ["Legal compliance", "Renewal optimization", "Lease enforcement", "Market rate analysis"],
      pricing: "Included in management"
    },
    {
      title: "Strategic Property Marketing",
      description: "Professional photography, targeted online advertising, market analysis, and vacancy minimization strategies across multiple platforms.",
      icon: <Search className="h-12 w-12 text-yrealty-accent" />,
      features: ["Professional photography", "Multi-platform advertising", "Market analysis", "Average 7-day vacancy"],
      pricing: "Marketing costs covered"
    },
    {
      title: "Dedicated Investor Relations",
      description: "Specialized support for property investors including portfolio analysis, acquisition assistance, market insights, and growth strategies.",
      icon: <Handshake className="h-12 w-12 text-yrealty-accent" />,
      features: ["Portfolio analysis", "Acquisition support", "Market insights", "Growth planning"],
      pricing: "Consultation packages available"
    },
    {
      title: "Value Enhancement Programs",
      description: "Strategic property improvements, renovation management, market positioning optimization, and ROI maximization planning.",
      icon: <PiggyBank className="h-12 w-12 text-yrealty-accent" />,
      features: ["Improvement planning", "Renovation management", "ROI optimization", "Market positioning"],
      pricing: "Custom project pricing"
    }
  ];

  // Create specific service arrays for each tab
  const residentialServices = [
    {
      title: "Residential Property Management",
      description: "Comprehensive management for single-family homes, condos, and apartments with focus on maximizing rental income and maintaining property value.",
      icon: <Home className="h-12 w-12 text-yrealty-accent" />,
      features: ["Single-family homes", "Condos & apartments", "HOA coordination", "Residential compliance"],
      pricing: "Competitive management fees"
    },
    ...coreServices
  ];

  const commercialServices = [
    {
      title: "Commercial Property Management",
      description: "Expert management of office buildings, retail spaces, industrial properties, and mixed-use developments to maximize ROI and tenant satisfaction.",
      icon: <Building className="h-12 w-12 text-yrealty-accent" />,
      features: ["Office buildings", "Retail spaces", "Industrial properties", "Mixed-use developments"],
      pricing: "Custom commercial rates"
    },
    ...coreServices
  ];

  const handleTabChange = (tabName) => {
    setIsLoading(true);
    setActiveTab(tabName);
    setTimeout(() => setIsLoading(false), 300);
  };

  const ServiceCard = ({ title, description, icon, features, pricing }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yrealty-accent/30">
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-yrealty-navy">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      
      <div className="mb-6">
        <h4 className="font-bold text-yrealty-navy mb-3">Key Features:</h4>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="border-t pt-4">
        <p className="text-sm font-medium text-yrealty-accent">{pricing}</p>
      </div>
    </div>
  );

  const CaseStudyCard = ({ study }) => (
    <div className="bg-gradient-to-br from-yrealty-blue to-white p-6 rounded-xl border-l-4 border-yrealty-accent">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-xl font-bold text-yrealty-navy">{study.title}</h4>
        <div className="flex items-center gap-1 text-yrealty-accent">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">{study.timeframe}</span>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{study.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {study.metrics.map((metric, index) => (
          <div key={index} className="flex items-center gap-2 bg-white/70 rounded-lg p-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">{metric}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Enhanced header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-yrealty-navy reveal">
            Our Comprehensive Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto reveal leading-relaxed">
            Elevating property management with a full suite of premium services designed 
            to maximize your property's potential and minimize your stress
          </p>
          
          {/* Enhanced value proposition highlight */}
          <div className="bg-gradient-to-r from-yrealty-accent to-yrealty-navy p-8 rounded-2xl max-w-5xl mx-auto reveal text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ONE Simple Price - EVERYTHING Included
            </h3>
            <p className="text-lg md:text-xl opacity-95 mb-6">
              Unlike other property management companies that nickel and dime you with add-on fees, Y Realty Team includes <span className="font-bold">EVERYTHING</span> in one transparent management fee. Our comprehensive price covers ALL services, technology, inspections, marketing, and support with absolutely NO hidden costs or surprise charges.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-base mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>No Marketing Costs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>No Inspection Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>No Technology Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>No Placement Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>No Renewal Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>No Administrative Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>No Hidden Costs</span>
              </div>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <p className="text-lg font-bold">
                What you pay for maintenance = Actual contractor cost + Small coordination fee
              </p>
              <p className="text-sm opacity-90 mt-1">
                We pass through maintenance costs at invoice price with just a minimal coordination fee - no markups or inflated charges.
              </p>
            </div>
          </div>
        </div>

        {/* Case Studies Section */}
        <div className="mb-16 reveal">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yrealty-navy">
            Proven Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} study={study} />
            ))}
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="w-full">
          <div className="flex justify-center mb-12">
            <div className={`${isMobile ? 'w-full' : 'w-96'} inline-flex h-auto min-h-12 items-center justify-center rounded-xl bg-gray-100 p-2 text-muted-foreground shadow-inner`}>
              <button 
                onClick={() => handleTabChange("residential")}
                className={`flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-3 text-lg font-bold transition-all duration-300
                  ${activeTab === "residential" 
                    ? "bg-white text-yrealty-navy shadow-md" 
                    : "hover:bg-white/50"}`}
              >
                <Home className="mr-3 h-6 w-6" />
                Residential
              </button>
              <button 
                onClick={() => handleTabChange("commercial")}
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
          
          {/* Enhanced Tab Content */}
          <div className="mt-8 min-h-[1200px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader className="h-12 w-12 text-yrealty-accent animate-spin" />
              </div>
            ) : (
              <>
                {activeTab === "residential" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {residentialServices.map((service, index) => (
                      <ServiceCard 
                        key={`residential-${index}`} 
                        title={service.title} 
                        description={service.description} 
                        icon={service.icon} 
                        features={service.features}
                        pricing={service.pricing}
                      />
                    ))}
                  </div>
                )}
                
                {activeTab === "commercial" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {commercialServices.map((service, index) => (
                      <ServiceCard 
                        key={`commercial-${index}`} 
                        title={service.title} 
                        description={service.description} 
                        icon={service.icon} 
                        features={service.features}
                        pricing={service.pricing}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="mt-20 reveal">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-3xl font-bold text-center mb-8 text-yrealty-navy">
              Powered by Advanced Technology
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-yrealty-blue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Building className="h-10 w-10 text-yrealty-navy" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-yrealty-navy">AppFolio</h4>
                <p className="text-gray-600">Industry-leading property management software for comprehensive operations management</p>
              </div>
              <div className="text-center">
                <div className="bg-yrealty-blue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-yrealty-navy" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-yrealty-navy">Site Audit Pro</h4>
                <p className="text-gray-600">Advanced property inspection technology with detailed reporting and photo documentation</p>
              </div>
              <div className="text-center">
                <div className="bg-yrealty-blue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-10 w-10 text-yrealty-navy" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-yrealty-navy">Proprietary Software</h4>
                <p className="text-gray-600">Our custom-built state-of-the-art platform for enhanced client experience and efficiency</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA with pricing emphasis */}
        <div className="mt-20 text-center reveal">
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
  );
};

export default ServicesSection;
