import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';

const Vacancies = () => {
  console.log('VACANCIES COMPONENT RENDERING - Route: /vacancies', window.location.pathname);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAppfolioScript = useCallback(() => {
    // Check if AppFolio is already available
    if (window.Appfolio) {
      console.log('AppFolio already loaded, initializing...');
      initializeAppfolio();
      return;
    }

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="theyteam.appfolio.com"]');
    if (existingScript) {
      console.log('AppFolio script already exists, waiting for load...');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Create and load the AppFolio script
    const script = document.createElement('script');
    script.src = 'https://theyteam.appfolio.com/javascripts/listing.js';
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    
    script.onload = () => {
      console.log('AppFolio script loaded successfully');
      // Small delay to ensure the script is fully initialized
      setTimeout(() => {
        initializeAppfolio();
      }, 100);
    };
    
    script.onerror = (error) => {
      console.error('Failed to load AppFolio script:', error);
      setError('Failed to load property listings. Please try again later.');
      setIsLoading(false);
    };

    document.head.appendChild(script);
  }, []);

  const initializeAppfolio = useCallback(() => {
    try {
      if (window.Appfolio && window.Appfolio.Listing) {
        console.log('Initializing AppFolio with config:', {
          hostUrl: 'theyteam.appfolio.com',
          themeColor: '#676767',
          height: '500px',
          width: '100%',
          defaultOrder: 'bedrooms'
        });
        
        // Clear the container first
        const container = document.getElementById('appfolio-listings');
        if (container) {
          container.innerHTML = '';
        }
        
        window.Appfolio.Listing({
          hostUrl: 'theyteam.appfolio.com',
          themeColor: '#676767',
          height: '500px',
          width: '100%',
          defaultOrder: 'bedrooms'
        });
        
        setIsLoading(false);
        setError(null);
      } else {
        throw new Error('AppFolio.Listing not available');
      }
    } catch (err) {
      console.error('Error initializing AppFolio:', err);
      setError('Failed to initialize property listings. Please refresh the page.');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppfolioScript();
    
    // Cleanup function
    return () => {
      // Clear the AppFolio container when component unmounts
      const container = document.getElementById('appfolio-listings');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [loadAppfolioScript]);

  return (
    <PageLayout 
      title="Available Rental Units" 
      subtitle="Browse our current rental listings managed through AppFolio"
      metaDescription="View available rental properties managed by Y Realty Team. Find your next home from our live inventory of quality rental units."
    >
      <div className="w-full">
        {/* Back Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to previous page
          </button>
        </div>

        {/* AppFolio Listings Container */}
        <div className="mb-8">
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading available units...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2 text-destructive">Error Loading Listings</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Retry
              </Button>
            </div>
          )}
          
          {/* AppFolio will render the listings here */}
          <div id="appfolio-listings" className="w-full min-h-[500px] rounded-lg overflow-hidden"></div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-muted rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-2">Need Help Finding the Right Property?</h3>
          <p className="text-muted-foreground mb-4">
            Our experienced team can help you find the perfect rental property that meets your specific needs and budget.
          </p>
          <Button onClick={() => navigate('/contact')}>
            Contact Our Team
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Vacancies;