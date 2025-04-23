
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      name: "Michael Thompson",
      role: "Property Owner",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5,
      text: "Outstanding service that has transformed how I manage my properties. Their attention to detail and proactive approach has significantly improved my rental income."
    },
    {
      name: "Sarah Johnson",
      role: "Commercial Investor",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5,
      text: "As an out-of-state investor, I needed a management company I could trust completely. They have exceeded my expectations in every way possible."
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
    <section id="testimonials" className="py-24 bg-secondary">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title reveal">Client Testimonials</h2>
          <p className="section-subtitle reveal">
            See what our clients say about their experience working with us
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className={`border-0 bg-background/50 backdrop-blur-sm transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">{testimonials[activeIndex].name}</h3>
                  <p className="text-muted-foreground">{testimonials[activeIndex].role}</p>
                  <div className="flex mt-2">
                    {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="text-lg text-foreground/80 italic">
                "{testimonials[activeIndex].text}"
              </blockquote>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={prevTestimonial} 
              className="p-2 rounded-full bg-background shadow-sm hover:bg-accent/5 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex ? 'bg-accent scale-125' : 'bg-accent/20'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial} 
              className="p-2 rounded-full bg-background shadow-sm hover:bg-accent/5 transition-colors"
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

