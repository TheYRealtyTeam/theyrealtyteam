
import React, { useEffect, useRef } from 'react';
import { CheckCircle, Award, Users, Target } from 'lucide-react';

const AboutSection = () => {
  const statsRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { value: '200', label: 'Properties Managed', icon: <Target className="h-8 w-8 text-yrealty-accent mb-2" /> },
    { value: '12', label: 'Years Experience', icon: <Award className="h-8 w-8 text-yrealty-accent mb-2" /> },
    { value: '95', label: 'Client Satisfaction %', icon: <CheckCircle className="h-8 w-8 text-yrealty-accent mb-2" /> },
    { value: '15', label: 'Team Members', icon: <Users className="h-8 w-8 text-yrealty-accent mb-2" /> },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // If it's the section, start the counter animation for stats
          if (entry.target === sectionRef.current) {
            statsRefs.current.forEach((stat, index) => {
              if (!stat) return;
              
              const statValue = parseInt(stats[index].value);
              let startTime: number | null = null;
              const duration = 2000; // 2 seconds
              
              const counter = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                
                if (stat) {
                  const current = Math.floor(percentage * statValue);
                  stat.textContent = current.toString();
                }
                
                if (percentage < 1) {
                  requestAnimationFrame(counter);
                } else if (stat) {
                  stat.textContent = stats[index].value;
                }
              };
              
              requestAnimationFrame(counter);
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [stats]);

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-yrealty-blue to-white" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">About Y Realty Team</h2>
          <p className="section-subtitle reveal">Committed to excellence in property management since 2011</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80&w=800" 
                alt="Y Realty office building" 
                className="rounded-lg shadow-lg w-full" 
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-yrealty-navy font-heading font-bold">Trusted by </p>
                <p className="text-yrealty-accent font-heading text-xl font-bold">1000+ Clients</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-yrealty-navy reveal">New York & New Jersey's Premier Property Management Company</h3>
            <p className="mb-6 text-gray-700 reveal">
              Y Realty Team is committed to providing exceptional property management services in the New York and New Jersey metropolitan area. 
              Our experienced team understands the unique challenges of these dynamic real estate markets and offers 
              tailored solutions to property owners, investors, and tenants.
            </p>
            <p className="mb-6 text-gray-700 reveal stagger-1">
              Founded in 2011, we've built our reputation on transparency, integrity, and results. 
              We leverage cutting-edge technology and industry best practices to maximize your property's 
              potential while minimizing stress and hassle.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {['Transparent Management', 'Expert Local Knowledge', 'Dedicated Support', 'Market-Leading Results'].map((item, index) => (
                <div key={index} className="flex items-center reveal" style={{ transitionDelay: `${0.3 + index * 0.1}s` }}>
                  <CheckCircle className="h-5 w-5 text-yrealty-accent mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <a href="#services" className="btn-primary reveal stagger-5">Learn More About Our Services</a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          {stats.map((stat, index) => (
            <div key={index} className="stats-card reveal" style={{ transitionDelay: `${0.2 + index * 0.1}s` }}>
              <div className="flex flex-col items-center">
                {stat.icon}
                <div className="text-4xl font-bold text-yrealty-navy mb-2" ref={el => statsRefs.current[index] = el}>
                  0
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
