
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimationObserver from '@/utils/AnimationObserver';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

const PageLayout = ({ children, title, subtitle, className = '' }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-32 pb-12 bg-yrealty-blue">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-yrealty-navy text-center">{title}</h1>
            {subtitle && (
              <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <section className={`section-padding bg-white ${className}`}>
          <div className="container-custom">
            {children}
          </div>
        </section>
      </main>
      <Footer />
      <AnimationObserver />
    </div>
  );
};

export default PageLayout;
