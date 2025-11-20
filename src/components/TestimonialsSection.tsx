import React from 'react';
import { Star, Quote, BadgeCheck } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { useIsMobileOptimized } from '@/hooks/useIsMobileOptimized';
import MobileTestimonialsSection from './mobile/MobileTestimonialsSection';

const TestimonialsSection = () => {
  const { isMobile } = useIsMobileOptimized();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
      date: "2 months ago",
      verified: true,
      text: "After struggling with my previous property manager for 3 years, Y Realty Team was a breath of fresh air. They filled my vacant unit in 5 days and found a tenant who's been perfect for 8 months now. The monthly reports are detailed and the transparent pricing saved me $400/month compared to my old company.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Michael Chen",
      location: "Seattle, WA",
      property: "Single-family rental",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      text: "I live in California but own a rental in Seattle. Y Realty Team makes me feel like I'm right there with monthly video inspections and instant updates through their app. When the furnace broke in January, they had it fixed within 4 hours. Worth every penny.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Lisa Rodriguez",
      location: "Miami, FL",
      property: "2 luxury condos",
      rating: 5,
      date: "1 month ago",
      verified: true,
      text: "What impressed me most was their tenant screening process. My previous tenants caused $3,000 in damages. Y Realty's 12-point screening found me reliable tenants who treat my properties like their own. The rent collection is automated and I've never had a late payment.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "David Thompson",
      location: "Denver, CO",
      property: "8-unit multi-family",
      rating: 5,
      date: "5 months ago",
      verified: true,
      text: "Managing 8 units was overwhelming until I found Y Realty Team. They increased my occupancy from 75% to 100% in 2 months and renegotiated my maintenance contracts saving me $12K annually. Their financial reporting is investor-grade quality.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Jennifer Adams",
      location: "Phoenix, AZ",
      property: "Commercial retail space",
      rating: 4,
      date: "6 weeks ago",
      verified: true,
      text: "Solid company overall. They handle commercial properties well and their communication is excellent. Had one minor issue with a maintenance delay but they owned up to it and gave me a credit. Their professionalism and accountability sets them apart.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Robert Martinez",
      location: "Portland, OR",
      property: "4 single-family homes",
      rating: 5,
      date: "4 months ago",
      verified: true,
      text: "I was hesitant to switch from self-managing, but Y Realty Team proved it was worth it. They found better tenants than I ever could, handle all late-night emergencies, and actually increased my net income by 15% through better expense management.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Amanda Foster",
      location: "Nashville, TN",
      property: "Duplex rental",
      rating: 5,
      date: "3 months ago",
      verified: true,
      text: "First-time landlord here and Y Realty made everything so easy. They explained everything, handled all the legal paperwork, and found great tenants who signed a 2-year lease. The online portal lets me track everything from my phone. Highly recommend!",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "James Wilson",
      location: "Charlotte, NC",
      property: "Office building",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      text: "Professional team that understands commercial real estate. They handled a complex lease negotiation perfectly and their network of contractors saved me 30% on a major renovation. Best decision I made was hiring them 2 years ago.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
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
          <Carousel setApi={setApi} className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      {testimonial.verified && (
                        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <BadgeCheck className="h-3 w-3" />
                          <span className="font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="border-t pt-4 mt-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-yrealty-navy">{testimonial.name}</h4>
                            <p className="text-xs text-gray-600">{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-yrealty-accent font-medium">{testimonial.property}</p>
                        <p className="text-xs text-gray-500">{testimonial.date}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-6 h-6 rounded-full transition-all ${
                  index === current ? 'bg-yrealty-navy scale-110' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
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
