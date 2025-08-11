
import React from 'react'
import { CheckCircle, Users, Award, TrendingUp, Home } from 'lucide-react'

const AboutSection = () => {
  const stats = [
    { number: "500+", label: "Properties Managed", icon: Home },
    { number: "98%", label: "Client Satisfaction", icon: Award },
    { number: "15+", label: "Years Experience", icon: TrendingUp },
    { number: "50+", label: "Team Members", icon: Users }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-yrealty-blue to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yrealty-navy">About Y Realty Team</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            America's premier property management company delivering exceptional results through 
            expertise, innovation, and personalized service.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
              <stat.icon className="w-8 h-8 text-yrealty-accent mb-4 mx-auto" />
              <div className="text-3xl font-bold text-yrealty-navy mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative">
              <img 
                src="/lovable-uploads/4aab176d-95ee-4ae9-bda7-892530d680f6.png"
                alt="Historic luxury apartment building with green copper roof" 
                className="rounded-lg shadow-lg w-full" 
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-yrealty-navy font-bold">Driven By</p>
                <p className="text-yrealty-accent text-xl font-bold">Excellence</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-yrealty-navy">America's Premier Property Management Company</h3>
            <p className="mb-6 text-gray-700">
              Y Realty Team is committed to providing exceptional property management services across all 50 states. 
              Our team understands the unique challenges of diverse real estate markets nationwide and offers 
              tailored solutions to property owners, investors, and tenants.
            </p>
            <p className="mb-6 text-gray-700">
              We leverage cutting-edge technology and industry best practices to maximize your property's 
              potential while minimizing stress and hassle. Our approach is built on transparency, integrity, and results.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {['Transparent Management', 'Nationwide Coverage', 'Dedicated Support', 'Market-Leading Results'].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yrealty-accent mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <a href="#services" className="btn-primary">Learn More About Our Services</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
