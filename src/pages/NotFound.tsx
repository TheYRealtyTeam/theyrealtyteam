
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';

const NotFound = () => {
  const { navigateToPage } = useSimpleNavigation();

  const handleHomeClick = () => {
    navigateToPage('/');
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yrealty-blue to-white">
      <div className="text-center px-6 py-12">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-yrealty-navy mb-4">404</h1>
          <h2 className="text-3xl font-bold text-yrealty-navy mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Button 
            onClick={handleHomeClick}
            className="bg-yrealty-navy hover:bg-yrealty-navy/90 text-white flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>
          <Button 
            onClick={handleBackClick}
            variant="outline" 
            className="border-yrealty-navy text-yrealty-navy hover:bg-yrealty-navy hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
