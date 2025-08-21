
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const MobileTestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Austin, TX",
      rating: 5,
      text: "Y Realty Team transformed my property investment experience. Their transparent pricing and excellent communication made everything stress-free.",
      property: "3-unit apartment complex"
    },
    {
      name: "Michael Chen",
      location: "Seattle, WA", 
      rating: 5,
      text: "Best property management company I've worked with. They handle everything professionally and keep me informed every step of the way.",
      property: "Single-family rental"
    },
    {
      name: "Lisa Rodriguez",
      location: "Miami, FL",
      rating: 5,
      text: "The 24/7 support is incredible. When my tenant had an emergency, they handled it immediately. Couldn't be happier with their service.",
      property: "Condo rental"
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
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mx-4">
            <div className="flex items-center justify-center mb-4">
              <Quote className="h-8 w-8 text-yrealty-accent" />
            </div>
            
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4 text-base">
                "{testimonials[currentTestimonial].text}"
              </p>
              
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-yrealty-navy">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  {testimonials[currentTestimonial].location}
                </p>
                <p className="text-xs text-yrealty-accent">
                  {testimonials[currentTestimonial].property}
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
