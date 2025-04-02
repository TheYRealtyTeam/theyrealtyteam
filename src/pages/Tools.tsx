
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CalculatorsSection from '@/components/CalculatorsSection';
import AnimationObserver from '@/utils/AnimationObserver';

const Tools = () => {
  useEffect(() => {
    document.title = "Calculators & Tools | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-24 pb-12 bg-yrealty-blue">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-yrealty-navy text-center">Property Investment Tools</h1>
            <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
              Free calculators and tools to help you make informed property investment decisions
            </p>
          </div>
        </div>
        <CalculatorsSection />
      </main>
      <Footer />
      <AnimationObserver />
    </div>
  );
};

export default Tools;
