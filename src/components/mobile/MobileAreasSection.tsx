
import React from 'react';
import { MapPin, CheckCircle, Star } from 'lucide-react';

const MobileAreasSection = () => {
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const features = [
    { icon: MapPin, title: 'Local Expertise', description: 'Deep knowledge of local markets and regulations' },
    { icon: CheckCircle, title: 'Licensed Professionals', description: 'Fully licensed in all states we operate' },
    { icon: Star, title: 'Premium Service', description: 'Same high-quality service regardless of location' }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-yrealty-navy mb-4">
            Service Areas
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Professional property management across all 50 states
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-yrealty-blue p-3 rounded-xl flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-yrealty-navy" />
                </div>
                <div>
                  <h3 className="font-bold text-yrealty-navy mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-6 rounded-2xl text-white text-center mb-8">
          <h3 className="text-3xl font-bold mb-2">50 States</h3>
          <p className="text-lg opacity-95">One team, nationwide coverage</p>
        </div>

        {/* States Grid */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-yrealty-navy mb-4 text-center">
            States We Serve
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {states.map((state, index) => (
              <div key={index} className="flex items-center gap-2 py-1">
                <CheckCircle className="h-4 w-4 text-yrealty-accent flex-shrink-0" />
                <span className="text-gray-700">{state}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Ready to get started in your area?
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center bg-yrealty-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-yrealty-accent/90 transition-colors"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default MobileAreasSection;
