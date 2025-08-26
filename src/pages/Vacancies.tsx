import React, { useEffect, useRef, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';

const Vacancies = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://theyteam.appfolio.com/javascripts/listing.js"]'
    );

    function initAppfolio() {
      try {
        // Clear any previous content
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Check if Appfolio is available
        const AppfolioAPI = (window as any).Appfolio;
        if (AppfolioAPI && typeof AppfolioAPI.Listing === 'function') {
          AppfolioAPI.Listing({
            hostUrl: 'theyteam.appfolio.com',
            themeColor: '#676767',
            height: '500px',
            width: '100%',
            defaultOrder: 'date_posted'
          });
          setLoading(false);
        } else {
          throw new Error('AppFolio API not available');
        }
      } catch (err) {
        console.error('Failed to initialize AppFolio listings:', err);
        setError('Failed to load property listings. Please try again later.');
        setLoading(false);
      }
    }

    if (existingScript) {
      // Script already loaded, just initialize
      initAppfolio();
      return;
    }

    // Dynamically load the AppFolio script
    const script = document.createElement('script');
    script.src = 'https://theyteam.appfolio.com/javascripts/listing.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = initAppfolio;
    script.onerror = () => {
      console.error('Failed to load AppFolio script');
      setError('Failed to load property listings. Please check your connection and try again.');
      setLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup function - script remains for potential reuse
    };
  }, []);

  return (
    <PageLayout 
      title="Available Vacancies" 
      subtitle="Browse our current rental listings and find your perfect home"
      metaDescription="View available rental properties managed by Y Realty Team. Find your next home from our curated selection of quality rental units."
    >
      <div className="w-full">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
            <span className="text-muted-foreground">Loading available units...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-6">
            <h3 className="text-destructive font-semibold mb-2">Unable to Load Listings</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 btn-primary text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        <div 
          id="appfolio-listings" 
          ref={containerRef}
          className="w-full min-h-[500px]"
          style={{ height: 'auto' }}
        />

        <noscript>
          <div className="bg-muted rounded-lg p-6 text-center">
            <p className="text-muted-foreground">
              Please enable JavaScript to view our current property listings.
            </p>
          </div>
        </noscript>

        {!loading && !error && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Don't see what you're looking for? 
              <a href="/contact" className="text-primary hover:underline ml-1">
                Contact us
              </a> 
              {' '}for personalized assistance finding your perfect home.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Vacancies;