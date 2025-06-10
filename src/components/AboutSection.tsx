
import * as React from 'react';
import { Building, Users, Award, TrendingUp, Shield, Clock, Star, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileAboutSection from './mobile/MobileAboutSection';

const AboutSection = () => {
  const isMobile = useIsMobile();

  // Return mobile-optimized version for mobile devices
  if (isMobile) {
    return <MobileAboutSection />;
  }

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">About Y Realty Team</h2>
          <p className="section-subtitle reveal">
            Your trusted partner in professional property management across all 50 states
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="reveal">
            <h3 className="text-3xl md:text-4xl font-bold text-yrealty-navy mb-6">
              Revolutionizing Property Management with Excellence and Innovation
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Y Realty Team, we combine cutting-edge technology with personalized service 
              to deliver unparalleled property management solutions. Our transparent pricing 
              model and comprehensive approach ensure maximum returns while minimizing stress 
              for property owners nationwide.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-yrealty-blue/10 p-6 rounded-xl">
                <Building className="h-10 w-10 text-yrealty-accent mb-4" />
                <h4 className="font-bold text-yrealty-navy mb-2">50+ States</h4>
                <p className="text-gray-600 text-sm">Nationwide coverage with local expertise</p>
              </div>
              <div className="bg-yrealty-blue/10 p-6 rounded-xl">
                <Users className="h-10 w-10 text-yrealty-accent mb-4" />
                <h4 className="font-bold text-yrealty-navy mb-2">Expert Team</h4>
                <p className="text-gray-600 text-sm">Licensed professionals in every market</p>
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="bg-gradient-to-br from-yrealty-navy to-yrealty-accent p-8 rounded-2xl text-white">
              <h4 className="text-2xl font-bold mb-6">Our Core Values</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-yrealty-blue mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold mb-1">Transparency</h5>
                    <p className="text-white/90 text-sm">Clear pricing with no hidden fees or surprises</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-yrealty-blue mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold mb-1">Reliability</h5>
                    <p className="text-white/90 text-sm">24/7 support and rapid response times</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Star className="h-6 w-6 text-yrealty-blue mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold mb-1">Excellence</h5>
                    <p className="text-white/90 text-sm">Premium service that exceeds expectations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center reveal hover-scale">
            <Award className="h-12 w-12 text-yrealty-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-yrealty-navy mb-2">15+</h3>
            <p className="text-gray-600">Years of Excellence</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center reveal hover-scale">
            <Building className="h-12 w-12 text-yrealty-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-yrealty-navy mb-2">1000+</h3>
            <p className="text-gray-600">Properties Managed</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center reveal hover-scale">
            <Users className="h-12 w-12 text-yrealty-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-yrealty-navy mb-2">98%</h3>
            <p className="text-gray-600">Client Satisfaction</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center reveal hover-scale">
            <TrendingUp className="h-12 w-12 text-yrealty-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-yrealty-navy mb-2">95%</h3>
            <p className="text-gray-600">Tenant Retention</p>
          </div>
        </div>

        <div className="bg-gray-50 p-12 rounded-2xl reveal">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-yrealty-navy mb-6">
              Why Property Owners Choose Y Realty Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <CheckCircle className="h-10 w-10 text-yrealty-accent mx-auto mb-4" />
                <h4 className="font-bold text-yrealty-navy mb-2">All-Inclusive Pricing</h4>
                <p className="text-gray-600">No hidden fees, everything included in one transparent rate</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-10 w-10 text-yrealty-accent mx-auto mb-4" />
                <h4 className="font-bold text-yrealty-navy mb-2">Technology-Driven</h4>
                <p className="text-gray-600">Advanced property management software and tenant portals</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-10 w-10 text-yrealty-accent mx-auto mb-4" />
                <h4 className="font-bold text-yrealty-navy mb-2">24/7 Support</h4>
                <p className="text-gray-600">Round-the-clock assistance for owners and tenants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
