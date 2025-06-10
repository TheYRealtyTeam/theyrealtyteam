
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const PageLayout = ({ children, title, description }: PageLayoutProps) => {
  const { } = useSimpleNavigation(); // Initialize navigation context

  React.useEffect(() => {
    document.title = `${title} | Y Realty Team`;
    
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDescription);
      }
    }
  }, [title, description]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container-custom py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
