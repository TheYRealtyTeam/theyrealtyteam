
import React, { useState } from 'react';
import { MapPin, Monitor, Users, Shield, CheckCircle, Globe, Smartphone, Headphones } from 'lucide-react';

const AreasSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Monitor className="h-8 w-8 text-yrealty-accent" />,
      title: "Advanced Technology Stack",
      description: "AppFolio property management software, Site Audit Pro inspections, and our proprietary platform ensure seamless remote management across all states.",
      details: [
        "Real-time property monitoring",
        "Digital inspection reports",
        "Online rent collection",
        "24/7 client portal access"
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-yrealty-accent" />,
      title: "Local Expert Network",
      description: "Our trained team members and vetted third-party partners in every state provide on-ground support while maintaining our quality standards.",
      details: [
        "Trained local representatives",
        "Vetted contractor network",
        "Regional market expertise",
        "Quality assurance protocols"
      ]
    },
    {
      icon: <Shield className="h-8 w-8 text-yrealty-accent" />,
      title: "Compliance & Legal",
      description: "State-specific legal knowledge and compliance management ensure your properties meet all local regulations and requirements.",
      details: [
        "State-specific expertise",
        "Legal compliance monitoring",
        "Local regulation updates",
        "Risk management protocols"
      ]
    },
    {
      icon: <Headphones className="h-8 w-8 text-yrealty-accent" />,
      title: "24/7 Communication",
      description: "Round-the-clock support and communication systems keep you connected to your properties no matter where you are.",
      details: [
        "24/7 emergency response",
        "Real-time notifications",
        "Mobile app access",
        "Direct communication channels"
      ]
    }
  ];

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const processSteps = [
    {
      step: "1",
      title: "Property Assessment",
      description: "Remote and local evaluation using Site Audit Pro technology and local experts"
    },
    {
      step: "2", 
      title: "Market Analysis",
      description: "Local market research and competitive pricing analysis for optimal positioning"
    },
    {
      step: "3",
      title: "Team Assignment",
      description: "Dedicated local support team assigned with regional expertise and connections"
    },
    {
      step: "4",
      title: "Technology Setup",
      description: "AppFolio integration and proprietary platform configuration for your property"
    },
    {
      step: "5",
      title: "Ongoing Management",
      description: "Continuous monitoring, reporting, and optimization with 24/7 support"
    }
  ];

  return (
    <section id="areas" className="section-padding bg-gradient-to-b from-white to-yrealty-blue/5">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yrealty-navy reveal">
            Nationwide Excellence, Local Expertise
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto reveal leading-relaxed">
            Managing properties across all 50 states with the perfect blend of cutting-edge technology, 
            local market knowledge, and personalized service that delivers results everywhere.
          </p>
        </div>

        {/* Technology & Process Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="reveal">
            <h3 className="text-3xl font-bold mb-8 text-yrealty-navy">How We Manage Nationwide</h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'border-yrealty-accent bg-yrealty-blue/20' 
                      : 'border-gray-200 bg-white hover:border-yrealty-accent/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-yrealty-navy">{feature.title}</h4>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      {activeFeature === index && (
                        <ul className="space-y-2 animate-fade-in">
                          {feature.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <h3 className="text-3xl font-bold mb-8 text-yrealty-navy">Our Process</h3>
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-yrealty-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 text-yrealty-navy">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Stack Showcase */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-20 reveal">
          <h3 className="text-3xl font-bold text-center mb-12 text-yrealty-navy">
            Powered by Industry-Leading Technology
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-yrealty-accent to-yrealty-navy rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Monitor className="h-12 w-12 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-yrealty-navy">AppFolio Platform</h4>
              <p className="text-gray-600 mb-4">Industry-leading property management software providing comprehensive operational management, financial reporting, and tenant communication tools.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Automated rent collection</li>
                <li>• Maintenance request management</li>
                <li>• Financial reporting & analytics</li>
                <li>• Tenant screening & communication</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-yrealty-accent to-yrealty-navy rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-12 w-12 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-yrealty-navy">Site Audit Pro</h4>
              <p className="text-gray-600 mb-4">Advanced property inspection technology with detailed photo documentation, condition reports, and preventive maintenance alerts.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Digital inspection reports</li>
                <li>• Photo documentation</li>
                <li>• Maintenance scheduling</li>
                <li>• Compliance monitoring</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-yrealty-accent to-yrealty-navy rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Globe className="h-12 w-12 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-yrealty-navy">Proprietary Platform</h4>
              <p className="text-gray-600 mb-4">Our custom-built state-of-the-art software platform designed specifically for enhanced client experience and operational efficiency.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time dashboard</li>
                <li>• Custom reporting</li>
                <li>• Enhanced communication</li>
                <li>• Advanced analytics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* States Coverage */}
        <div className="text-center mb-16 reveal">
          <h3 className="text-3xl font-bold mb-8 text-yrealty-navy">
            Operating in All 50 States
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            From coast to coast, we provide the same exceptional level of service and expertise. 
            Our nationwide presence ensures consistent quality regardless of your property location.
          </p>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 text-sm">
              {states.map((state, index) => (
                <div key={index} className="p-2 bg-yrealty-blue/10 rounded text-yrealty-navy font-medium hover:bg-yrealty-accent hover:text-white transition-colors cursor-default">
                  {state}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Guarantees & Commitments */}
        <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-8 rounded-2xl text-white text-center reveal">
          <h3 className="text-3xl font-bold mb-6">Our Nationwide Commitment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <CheckCircle className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Same Day Response</h4>
              <p className="opacity-95">Emergency issues addressed within hours, anywhere in the US</p>
            </div>
            <div>
              <CheckCircle className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Local Expertise</h4>
              <p className="opacity-95">Regional market knowledge and compliance in every state</p>
            </div>
            <div>
              <CheckCircle className="h-12 w-12 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Consistent Quality</h4>
              <p className="opacity-95">Same high standards and processes nationwide</p>
            </div>
          </div>
          <a href="#contact" className="btn-accent bg-white text-yrealty-navy hover:bg-gray-100 text-lg px-8 py-4 font-bold">
            Discover How We Can Help Your Property
          </a>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
