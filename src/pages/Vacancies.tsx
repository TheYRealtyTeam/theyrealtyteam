import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Home, QrCode, Smartphone, ChevronRight, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import qrCodeImage from '@/assets/vacancy-qr-code.png';
import { log, error as logError } from '@/lib/logger';
import { diagnoseAppfolioRendering, generateMarkdownReport } from '@/features/vacancies/appfolio/diagnose';
import { initAppFolio } from '@/features/vacancies/appfolio/init';
import PageLayout from '@/components/layout/PageLayout';

const Vacancies = () => {
  log('VACANCIES COMPONENT RENDERING - Route: /vacancies', window.location.pathname);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  const loadAppfolioScript = () => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="theyteam.appfolio.com"]');
    if (existingScript) {
      log('AppFolio script already exists');
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
    };
    
    script.onerror = (err) => {
      logError('Failed to load AppFolio script:', err);
      setError('Failed to load property listings. Please try again later.');
      setIsLoading(false);
    };

    document.head.appendChild(script);
  };

  const runDiagnostics = async () => {
    // Wait a bit more to ensure widget is fully rendered
    setTimeout(async () => {
      try {
        log('Running AppFolio rendering diagnostics...');
        const diagnostics = await diagnoseAppfolioRendering('appfolio-root');
        
        // Generate markdown report
        const report = generateMarkdownReport(diagnostics);
        
        // Log the report (in production, you might want to send this to a server)
        console.log('\n' + report + '\n');
        
        // Store in sessionStorage for debugging
        sessionStorage.setItem('appfolio-diagnostics', JSON.stringify(diagnostics));
        sessionStorage.setItem('appfolio-report', report);
        
        log('Diagnostics complete. Check sessionStorage for full report.');
      } catch (err) {
        logError('Error running diagnostics:', err);
      }
    }, 1000);
  };

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      // Load the script first
      loadAppfolioScript();
      
      // Give the external script a moment to attach, then init
      await new Promise((r) => setTimeout(r, 300));
      
      if (!cancelled) {
        await initAppFolio();
        setIsLoading(false);
        // Run diagnostics after initialization
        runDiagnostics();
      }
    };

    init();
    
    // Focus on H1 for accessibility
    if (h1Ref.current) {
      h1Ref.current.focus();
    }

    // Back to top button scroll handler
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      cancelled = true;
      window.removeEventListener('scroll', handleScroll);
      // Clear the AppFolio container when component unmounts
      const container = document.getElementById('appfolio-root');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <PageLayout
      title="Available Rental Units"
      subtitle="Browse our current rental listings managed through AppFolio"
      metaDescription="View available rental properties managed by Y Realty Team. Find your next home from our live inventory of quality rental units."
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link 
          to="/" 
          className="hover:text-foreground transition-colors flex items-center gap-1 underline-offset-4 hover:underline"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <span className="text-foreground font-medium">Vacancies</span>
      </nav>

      <div className="w-full max-w-6xl mx-auto overflow-x-hidden pb-[env(safe-area-inset-bottom)]">
        {/* Page Header */}
        <header className="py-6 md:py-8 space-y-4">
          <h2 
            ref={h1Ref}
            tabIndex={-1}
            className="text-3xl md:text-4xl font-semibold tracking-tight outline-none"
          >
            Current Listings
          </h2>
        </header>

        {/* Mobile Back to Home Button */}
        <div className="mb-6 lg:hidden">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            aria-label="Navigate back to home page"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Button>
        </div>

        {/* Quick Access QR Code - Mobile Friendly */}
        <div className="mb-8 lg:hidden">
          <Card className="mx-auto max-w-sm shadow-sm">
            <CardHeader className="text-center pb-3">
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <Smartphone className="h-5 w-5" aria-hidden="true" />
                Quick Mobile Access
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white p-4 rounded-lg inline-block mb-3">
                <img 
                  src={qrCodeImage} 
                  alt="QR Code for Vacancy Listings" 
                  className="w-32 h-32 mx-auto"
                  loading="lazy"
                  width={128}
                  height={128}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Scan to view listings on your mobile device
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AppFolio Listings Container */}
        <section className="mb-8 space-y-4">
          {isLoading && (
            <Card className="rounded-xl shadow-sm" role="status" aria-live="polite" aria-label="Loading listings">
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
                </div>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-base font-medium">Loading available units...</p>
                    <p className="text-sm text-muted-foreground">Please wait while we fetch our latest listings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {error && (
            <Card className="rounded-xl shadow-sm border-destructive/50" role="alert" aria-live="assertive">
              <CardContent className="p-6 md:p-8">
                <div className="text-center max-w-md mx-auto space-y-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-destructive">Error Loading Listings</h3>
                  <p className="text-muted-foreground">{error}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button 
                      onClick={() => window.location.reload()} 
                      variant="outline"
                      aria-label="Retry loading listings"
                    >
                      Retry
                    </Button>
                    <Button 
                      onClick={() => navigate('/contact')}
                      aria-label="Contact support team"
                    >
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* AppFolio widget wrapper with card styling */}
          <Card 
            className="rounded-xl shadow-sm overflow-hidden"
            style={{ display: isLoading || error ? 'none' : 'block' }}
          >
            <div className="border-t">
              <div className="p-2 md:p-4">
                {/* AppFolio will render the listings here */}
                <div 
                  id="appfolio-root" 
                  className="w-full min-h-[80vh] relative z-0"
                  role="region"
                  aria-label="Property listings"
                ></div>
              </div>
            </div>
          </Card>
        </section>

        {/* Desktop QR Code Section */}
        <section className="hidden lg:block py-8 space-y-4">
          <Card className="rounded-xl shadow-sm">
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <QrCode className="h-6 w-6" aria-hidden="true" />
                    Mobile Quick Access
                  </h3>
                  <p className="text-muted-foreground">
                    Scan this QR code with your mobile device to quickly access our vacancy listings on the go. 
                    Perfect for showing properties to clients or viewing listings while out in the field.
                  </p>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <Smartphone className="h-4 w-4 mt-0.5" aria-hidden="true" />
                    <span>Optimized for mobile viewing</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <img 
                      src={qrCodeImage} 
                      alt="QR Code for Vacancy Listings" 
                      className="w-40 h-40"
                      loading="lazy"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="py-8">
          <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 rounded-xl shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Need Help Finding the Right Property?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our experienced team can help you find the perfect rental property that meets your specific needs and budget. 
                We're here to make your search easier.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button 
                  onClick={() => navigate('/contact')} 
                  size="lg"
                  aria-label="Contact our team"
                >
                  Contact Our Team
                </Button>
                <Button 
                  onClick={() => navigate('/')} 
                  variant="outline" 
                  size="lg"
                  aria-label="Return to home page"
                >
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </PageLayout>
  );
};

export default Vacancies;