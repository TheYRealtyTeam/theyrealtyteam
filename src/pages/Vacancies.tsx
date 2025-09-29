import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Home, QrCode, Smartphone, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import qrCodeImage from '@/assets/vacancy-qr-code.png';
import { log, error as logError } from '@/lib/logger';

const Vacancies = () => {
  log('VACANCIES COMPONENT RENDERING - Route: /vacancies', window.location.pathname);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAppfolioScript = useCallback(() => {
    // Check if AppFolio is already available
    if (window.Appfolio) {
      log('AppFolio already loaded, initializing...');
      initializeAppfolio();
      return;
    }

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="theyteam.appfolio.com"]');
    if (existingScript) {
      log('AppFolio script already exists, waiting for load...');
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
      log('AppFolio script loaded successfully');
      // Small delay to ensure the script is fully initialized
      setTimeout(() => {
        initializeAppfolio();
      }, 100);
    };
    
    script.onerror = (err) => {
      logError('Failed to load AppFolio script:', err);
      setError('Failed to load property listings. Please try again later.');
      setIsLoading(false);
    };

    document.head.appendChild(script);
  }, []);

  const initializeAppfolio = useCallback(() => {
    try {
      if (window.Appfolio && window.Appfolio.Listing) {
        log('Initializing AppFolio with config:', {
          hostUrl: 'theyteam.appfolio.com',
          themeColor: '#676767',
          height: '800px',
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
          height: '800px',
          width: '100%',
          defaultOrder: 'bedrooms'
        });
        
        setIsLoading(false);
        setError(null);
      } else {
        throw new Error('AppFolio.Listing not available');
      }
    } catch (err) {
      logError('Error initializing AppFolio:', err);
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
      <div className="w-full max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Vacancies</span>
        </nav>

        {/* Mobile Back to Home Button */}
        <div className="mb-6 lg:hidden">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Quick Access QR Code - Mobile Friendly */}
        <div className="mb-8 lg:hidden">
          <Card className="mx-auto max-w-sm">
            <CardHeader className="text-center pb-3">
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <Smartphone className="h-5 w-5" />
                Quick Mobile Access
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white p-4 rounded-lg inline-block mb-3">
                <img 
                  src={qrCodeImage} 
                  alt="QR Code for Vacancy Listings" 
                  className="w-32 h-32 mx-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Scan to view listings on your mobile device
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AppFolio Listings Container */}
        <div className="mb-8">
          {isLoading && (
            <div className="flex items-center justify-center min-h-[80vh] py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-lg text-muted-foreground">Loading available units...</p>
                <p className="text-sm text-muted-foreground mt-2">Please wait while we fetch our latest listings</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex items-center justify-center min-h-[80vh] py-12">
              <div className="text-center max-w-md">
                <h3 className="text-lg font-semibold mb-2 text-destructive">Error Loading Listings</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Retry
                  </Button>
                  <Button onClick={() => navigate('/contact')}>
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* AppFolio will render the listings here */}
          <div 
            id="appfolio-listings" 
            className="w-full min-h-[80vh] overflow-auto rounded-lg border border-border bg-background"
            style={{ minHeight: isLoading || error ? '0' : '80vh' }}
          ></div>
        </div>

        {/* Desktop QR Code Section */}
        <div className="hidden lg:block mt-12 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <QrCode className="h-6 w-6" />
                Mobile Quick Access
              </h3>
              <p className="text-muted-foreground mb-4">
                Scan this QR code with your mobile device to quickly access our vacancy listings on the go. 
                Perfect for showing properties to clients or viewing listings while out in the field.
              </p>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <Smartphone className="h-4 w-4 mt-0.5" />
                <span>Optimized for mobile viewing</span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <img 
                  src={qrCodeImage} 
                  alt="QR Code for Vacancy Listings" 
                  className="w-40 h-40"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 border border-primary/20">
          <h3 className="text-2xl font-semibold mb-3">Need Help Finding the Right Property?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our experienced team can help you find the perfect rental property that meets your specific needs and budget. 
            We're here to make your search easier.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/contact')} size="lg">
              Contact Our Team
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" size="lg">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Vacancies;