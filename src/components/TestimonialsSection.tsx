import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileTestimonialsSection from './mobile/MobileTestimonialsSection';

const TestimonialsSection = () => {
  const isMobile = useIsMobile();

  // Return mobile-optimized version for mobile devices
  if (isMobile) {
    return <MobileTestimonialsSection />;
  }

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Austin, TX",
      property: "3-unit apartment complex",
      rating: 5,
      text: "Y Realty Team has transformed my property investment experience. Their transparent pricing model means no surprise fees, and their communication is exceptional. My properties are always well-maintained, and tenant placement is seamless.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Michael Chen",
      location: "Seattle, WA",
      property: "Single-family rental",
      rating: 5,
      text: "Best property management company I've worked with in 10 years. They handle everything professionally and keep me informed every step of the way. The online portal makes tracking my investments effortless.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Lisa Rodriguez",
      location: "Miami, FL",
      property: "Luxury condo rental",
      rating: 5,
      text: "The 24/7 support is incredible. When my tenant had an emergency at midnight, Y Realty Team handled it immediately. Their technology platform gives me real-time insights into my property's performance.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "David Thompson",
      location: "Denver, CO",
      property: "Multi-family portfolio",
      rating: 5,
      text: "I've been investing in real estate for 15 years, and Y Realty Team is by far the most professional management company I've partnered with. Their market analysis helped me optimize my rental rates.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Jennifer Adams",
      location: "Phoenix, AZ",
      property: "Vacation rental property",
      rating: 5,
      text: "Their attention to detail is remarkable. From tenant screening to property maintenance, everything is handled with the utmost professionalism. My rental income has increased 20% since switching to Y Realty Team.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">What Our Clients Say</h2>
          <p className="section-subtitle reveal">
            Real experiences from property owners who trust Y Realty Team with their investments
          </p>
        </div>

        <div className="reveal">
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
                    <div className="flex items-center mb-6">
                      <Quote className="h-8 w-8 text-yrealty-accent mr-4" />
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-yrealty-navy">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                        <p className="text-xs text-yrealty-accent">{testimonial.property}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="text-center mt-12 reveal">
          <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-8 rounded-2xl text-white max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-xl mb-6 opacity-95">
              Experience the difference of working with true property management professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-accent bg-white text-yrealty-navy hover:bg-gray-100 font-bold">
                Get Your Free Consultation
              </a>
              <a href="tel:(845)734-3331" className="btn-outline border-white text-white hover:bg-white hover:text-yrealty-navy font-bold">
                Call (845) 734-3331
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
