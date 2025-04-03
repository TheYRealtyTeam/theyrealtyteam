
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import AnimationObserver from '@/utils/AnimationObserver';

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-24 pb-12 bg-yrealty-blue">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-yrealty-navy text-center">Frequently Asked Questions</h1>
            <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
              Find answers to the most common questions about property management services
            </p>
          </div>
        </div>
        
        <FAQSection />
      </main>
      <Footer />
      <AnimationObserver />
    </div>
  );
};

export default FAQ;
