import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Home, QrCode, Smartphone, ChevronRight, ArrowUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import qrCodeImage from '@/assets/vacancy-qr-code.png';
import PageLayout from '@/components/layout/PageLayout';

const Vacancies = () => {
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Focus on H1 for accessibility
    if (h1Ref.current) {
      h1Ref.current.focus();
    }

    // Back to top button scroll handler
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

        {/* Quick Access QR Code - Tablet Only */}
        <div className="mb-8 hidden md:block lg:hidden">
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
          {/* Optional: Open in new tab link */}
          <div className="flex justify-end mb-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <a
                href="https://theyteam.appfolio.com/listings"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Open full listings in new tab
              </a>
            </Button>
          </div>
          
          {/* AppFolio iframe wrapper with card styling */}
          <Card className="rounded-xl shadow-sm overflow-hidden">
            <div className="border-t">
              <div className="p-2 md:p-4">
                {/* Sandboxed iframe for AppFolio listings */}
                <div 
                  id="appfolio-root" 
                  className="w-full min-h-[80vh] relative z-0"
                  role="region"
                  aria-label="Property listings"
                >
                  <iframe
                    title="AppFolio rental listings"
                    src="https://theyteam.appfolio.com/listings"
                    className="w-full min-h-[80vh] border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
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