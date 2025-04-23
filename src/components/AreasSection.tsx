
import React, { useEffect, useRef } from 'react';
import { MapPin, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AreasSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  const areas = [
    {
      name: "East Coast",
      description: "Full-service property management throughout New York, New Jersey, Massachusetts, and more."
    },
    {
      name: "West Coast",
      description: "Comprehensive services across California, Oregon, Washington, and all Western markets."
    },
    {
      name: "Midwest",
      description: "Complete property management throughout Illinois, Michigan, Ohio, and surrounding states."
    },
    {
      name: "South",
      description: "Dedicated solutions for Texas, Florida, Georgia, and all southern regions."
    }
  ];

  useEffect(() => {
    if (!mapRef.current) return;
    
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.style.borderRadius = '0.5rem';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.loading = 'lazy';
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12470187.461098605!2d-95.665!3d39.7837!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1698429602019!5m2!1sen!2sus';
    
    mapRef.current.innerHTML = '';
    mapRef.current.appendChild(iframe);
    
    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section id="areas" className="py-24 bg-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title reveal">Coverage Areas</h2>
          <p className="section-subtitle reveal">
            Professional property management services across the United States
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="reveal order-2 lg:order-1">
            <div className="grid gap-4">
              {areas.map((area, index) => (
                <Card 
                  key={index} 
                  className="reveal card-hover border-0 bg-card/50 backdrop-blur-sm"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{area.name}</h3>
                      <p className="text-muted-foreground">{area.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 reveal">
              <a href="#contact" className="btn-primary">
                Find Your Local Office
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 reveal">
            <div ref={mapRef} className="aspect-square lg:aspect-auto lg:h-[600px] rounded-lg shadow-lg relative overflow-hidden bg-card/50">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Card className="w-auto bg-background/95 backdrop-blur-sm border-0">
                  <CardContent className="p-6 text-center">
                    <Globe className="h-8 w-8 text-accent mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-1">Nationwide Coverage</h3>
                    <p className="text-muted-foreground">
                      Serving properties across all 50 states
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;

