
import React from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '@/contexts/AuthContext';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';
import { navLinks } from './navbar/navLinks';

const Navbar = () => {
  console.log('Navbar rendering - React available:', !!React);
  
  const { user } = useAuth();
  const { 
    isMenuOpen, 
    isScrolled, 
    toggleMenu, 
    closeMenu, 
    navigateToPage,
    scrollToSection,
    isLinkActive 
  } = useSimpleNavigation();

  const handleLinkClick = (link: { href: string; isAnchorLink: boolean }) => {
    if (link.isAnchorLink) {
      const sectionId = link.href.split('#')[1];
      scrollToSection(sectionId);
    } else {
      navigateToPage(link.href);
    }
  };

  const handleAppointmentClick = () => {
    navigateToPage('/appointment');
  };

  const handleProfileClick = () => {
    navigateToPage('/profile');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                className={`nav-link text-black font-medium transition-colors hover:text-yrealty-accent ${
                  isLinkActive(link) ? 'active text-yrealty-accent' : ''
                } bg-transparent border-none cursor-pointer px-3 py-2`}
                onClick={() => handleLinkClick(link)}
                aria-current={isLinkActive(link) ? 'page' : undefined}
              >
                {link.name}
              </button>
            ))}
            
            {user ? (
              <button 
                onClick={handleProfileClick} 
                className="ml-4 btn-primary font-bold"
                type="button"
              >
                Profile
              </button>
            ) : (
              <button 
                onClick={handleAppointmentClick} 
                className="ml-1 btn-primary font-bold"
                type="button"
              >
                Get Started
              </button>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-black z-50"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 md:hidden ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMenu}
          aria-hidden={!isMenuOpen}
        >
          <nav 
            className={`absolute top-0 left-0 right-0 bg-white shadow-xl transform transition-all duration-300 ease-out ${
              isMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile Navigation"
          >
            <div className="pt-20 pb-8 px-6">
              <div className="space-y-6">
                {navLinks.map((link, index) => (
                  <button
                    key={link.name}
                    type="button"
                    className={`block w-full text-left text-lg font-semibold text-gray-800 hover:text-yrealty-accent transition-all duration-200 transform hover:translate-x-2 bg-transparent border-none cursor-pointer ${
                      isLinkActive(link) ? 'text-yrealty-accent font-bold' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleLinkClick(link)}
                    aria-current={isLinkActive(link) ? 'page' : undefined}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button 
                  type="button"
                  onClick={handleAppointmentClick}
                  className="w-full bg-gradient-to-r from-yrealty-navy to-yrealty-accent text-white py-4 rounded-xl font-bold text-center block hover:shadow-lg transition-all duration-300 border-none cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
