
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';

const MobileTestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Austin, TX",
      property: "3-unit apartment complex",
      rating: 5,
      date: "2 months ago",
      verified: true,
      text: "After struggling with my previous property manager for 3 years, Y Realty Team was a breath of fresh air. They filled my vacant unit in 5 days and found a tenant who's been perfect for 8 months now."
    },
    {
      name: "Michael Chen",
      location: "Seattle, WA",
      property: "Single-family rental",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      text: "I live in California but own a rental in Seattle. Y Realty Team makes me feel like I'm right there with monthly video inspections and instant updates through their app."
    },
    {
      name: "Lisa Rodriguez",
      location: "Miami, FL",
      property: "2 luxury condos",
      rating: 5,
      date: "1 month ago",
      verified: true,
      text: "What impressed me most was their tenant screening process. Y Realty's 12-point screening found me reliable tenants who treat my properties like their own."
    },
    {
      name: "David Thompson",
      location: "Denver, CO",
      property: "8-unit multi-family",
      rating: 5,
      date: "5 months ago",
      verified: true,
      text: "They increased my occupancy from 75% to 100% in 2 months and renegotiated my maintenance contracts saving me $12K annually."
    },
    {
      name: "Jennifer Adams",
      location: "Phoenix, AZ",
      property: "Commercial retail space",
      rating: 4,
      date: "6 weeks ago",
      verified: true,
      text: "Solid company overall. They handle commercial properties well and their communication is excellent. Their professionalism and accountability sets them apart."
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-yrealty-navy mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Real experiences from real property owners
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mx-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              {testimonials[currentTestimonial].verified && (
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <BadgeCheck className="h-3 w-3" />
                  <span className="font-medium">Verified</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4 text-sm">
              "{testimonials[currentTestimonial].text}"
            </p>
            
            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-bold text-yrealty-navy text-sm">
                {testimonials[currentTestimonial].name}
              </h4>
              <p className="text-xs text-gray-600">
                {testimonials[currentTestimonial].location}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-yrealty-accent font-medium">
                  {testimonials[currentTestimonial].property}
                </p>
                <p className="text-xs text-gray-500">
                  {testimonials[currentTestimonial].date}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={prevTestimonial}
              className="bg-white border border-gray-200 p-3 rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <ChevronLeft className="h-5 w-5 text-yrealty-navy" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-yrealty-accent' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="bg-white border border-gray-200 p-3 rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <ChevronRight className="h-5 w-5 text-yrealty-navy" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Ready to join our satisfied clients?</p>
          <a 
            href="#contact"
            className="inline-flex items-center bg-yrealty-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-yrealty-accent/90 transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default MobileTestimonialsSection;
