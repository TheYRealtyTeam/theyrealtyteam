
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import AnimationObserver from '@/utils/AnimationObserver';

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-24 pb-12 bg-yrealty-blue">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-yrealty-navy text-center">Contact Us</h1>
            <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
              Ready to experience premium property management? Reach out to our team to discuss how we can serve your needs
            </p>
          </div>
        </div>
        
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="reveal">
                <ContactInfo />
              </div>
              <div className="reveal">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AnimationObserver />
    </div>
  );
};

export default Contact;
