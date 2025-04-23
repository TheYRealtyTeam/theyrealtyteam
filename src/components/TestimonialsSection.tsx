
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      name: "Michael Thompson",
      role: "Property Owner",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5,
      text: "Y Realty Team has transformed how I manage my properties. Their attention to detail and proactive approach has significantly improved my rental income while reducing vacancies."
    },
    {
      name: "Sarah Johnson",
      role: "Commercial Investor",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5,
      text: "As an out-of-state investor, I needed a management company I could trust completely. The Y Realty Team has exceeded my expectations, treating my properties as their own."
    },
    {
      name: "David Chen",
      role: "Building Owner",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      stars: 5,
      text: "Their professionalism and attention to detail are unmatched. The team consistently delivers exceptional service and maintains strong relationships with tenants."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section id="testimonials" className="py-20 bg-yrealty-warm">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-yrealty-navy mb-4">Client Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from property owners who have transformed their investments with our services
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`bg-white p-8 md:p-10 rounded-2xl shadow-sm transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <img 
                src={testimonials[activeIndex].image} 
                alt={testimonials[activeIndex].name} 
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-yrealty-navy">{testimonials[activeIndex].name}</h3>
                <p className="text-gray-600">{testimonials[activeIndex].role}</p>
                <div className="flex mt-2">
                  {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yrealty-gold text-yrealty-gold" />
                  ))}
                </div>
              </div>
            </div>

            <blockquote className="text-lg text-gray-700 mb-6 italic">
              "{testimonials[activeIndex].text}"
            </blockquote>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={prevTestimonial} 
              className="p-2 rounded-full bg-white shadow-sm hover:bg-yrealty-blue transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-yrealty-navy" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex ? 'bg-yrealty-navy scale-125' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial} 
              className="p-2 rounded-full bg-white shadow-sm hover:bg-yrealty-blue transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-yrealty-navy" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
