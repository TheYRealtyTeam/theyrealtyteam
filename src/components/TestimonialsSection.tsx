
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      name: "Michael Thompson",
      role: "Property Owner, Manhattan",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5,
      text: "Y Realty Team has completely transformed how I manage my properties. Their attention to detail and proactive approach has increased my rental income by 15% while reducing vacancies. I couldn't be happier with their service."
    },
    {
      name: "Sarah Johnson",
      role: "Commercial Investor",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5,
      text: "As an out-of-state investor, I needed a management company I could trust completely. The Y Realty Team has exceeded my expectations in every way. They treat my properties as if they were their own, and their financial reporting is exceptionally transparent."
    },
    {
      name: "David Chen",
      role: "Apartment Building Owner, Brooklyn",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      stars: 5,
      text: "I've worked with several property management companies over the years, and Y Realty Team stands head and shoulders above the rest. Their responsiveness, professionalism, and attention to detail are unmatched in the New York market."
    },
    {
      name: "Emma Rodriguez",
      role: "Residential Landlord",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      stars: 5,
      text: "Switching to Y Realty Team was the best decision I've made for my rental properties. They found qualified tenants quickly, handle all maintenance issues promptly, and their online portal makes it easy to track everything. Highly recommended!"
    },
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
    <section id="testimonials" className="section-padding bg-gradient-to-b from-white to-yrealty-blue">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">Client Testimonials</h2>
          <p className="section-subtitle reveal">
            Don't just take our word for it - hear what our satisfied clients have to say
            about their experience with Y Realty Team
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className={`testimonial-card p-8 md:p-10 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="absolute top-6 right-10">
              <Quote className="h-16 w-16 text-yrealty-blue opacity-30" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center mb-6">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="w-20 h-20 rounded-full border-4 border-yrealty-blue object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-yrealty-navy">{testimonials[activeIndex].name}</h3>
                <p className="text-gray-600">{testimonials[activeIndex].role}</p>
                <div className="flex mt-2">
                  {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6">
              "{testimonials[activeIndex].text}"
            </blockquote>
          </div>

          <div className="flex justify-between mt-8">
            <button 
              onClick={prevTestimonial} 
              className="p-2 rounded-full bg-white shadow-md hover:bg-yrealty-navy hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <div className="flex items-center gap-2">
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
              className="p-2 rounded-full bg-white shadow-md hover:bg-yrealty-navy hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
