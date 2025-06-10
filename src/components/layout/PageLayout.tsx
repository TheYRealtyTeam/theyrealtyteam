
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  metaDescription?: string;
}

const PageLayout = ({ children, title, subtitle, description, metaDescription }: PageLayoutProps) => {
  const { } = useSimpleNavigation(); // Initialize navigation context

  React.useEffect(() => {
    document.title = `${title} | Y Realty Team`;
    
    const finalDescription = metaDescription || description;
    if (finalDescription) {
      const metaDescriptionElement = document.querySelector('meta[name="description"]') || document.createElement('meta');
      metaDescriptionElement.setAttribute('name', 'description');
      metaDescriptionElement.setAttribute('content', finalDescription);
      if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDescriptionElement);
      }
    }
  }, [title, description, metaDescription]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container-custom py-8">
          {subtitle && (
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-yrealty-navy mb-4">{title}</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            </div>
          )}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
