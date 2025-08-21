
import React from 'react';
import { Shield, Users, Award, TrendingUp } from 'lucide-react';

const MobileAboutSection = () => {
  const stats = [
    { icon: Shield, value: '50+', label: 'States Covered' },
    { icon: Users, value: '1000+', label: 'Happy Clients' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: TrendingUp, value: '98%', label: 'Client Satisfaction' }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-yrealty-navy mb-4">
            About Y Realty Team
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Your trusted partner in property management excellence
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-6 rounded-2xl mb-12 text-white">
          <h3 className="text-xl font-bold mb-3">Our Mission</h3>
          <p className="leading-relaxed">
            To revolutionize property management by combining cutting-edge technology 
            with personalized service, ensuring maximum returns and peace of mind for 
            property owners nationwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-yrealty-blue p-3 rounded-full inline-flex mb-3">
                <stat.icon className="h-6 w-6 text-yrealty-navy" />
              </div>
              <div className="text-2xl font-bold text-yrealty-navy mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Key Features */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-yrealty-navy text-center mb-6">
            Why Choose Us?
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
              <h4 className="font-bold text-yrealty-navy mb-2">Transparent Pricing</h4>
              <p className="text-gray-600 text-sm">No hidden fees, no surprise charges. One simple price includes everything.</p>
            </div>
            
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
              <h4 className="font-bold text-yrealty-navy mb-2">24/7 Support</h4>
              <p className="text-gray-600 text-sm">Round-the-clock assistance for you and your tenants.</p>
            </div>
            
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
              <h4 className="font-bold text-yrealty-navy mb-2">Technology-Driven</h4>
              <p className="text-gray-600 text-sm">Advanced property management software and tenant portals.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAboutSection;
