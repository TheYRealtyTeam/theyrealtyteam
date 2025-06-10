
import * as React from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigationHook } from './navbar/useNavigationHook';
import { navLinks } from './navbar/navLinks';
import DesktopNav from './navbar/DesktopNav';
import MobileMenu from './navbar/MobileMenu';

const Navbar = () => {
  console.log('Navbar component rendering');
  
  const { user } = useAuth();
  const { 
    isMenuOpen, 
    isScrolled, 
    toggleMenu, 
    closeMenu, 
    isLinkActive, 
    handleNavigation 
  } = useNavigationHook();

  console.log('Navbar navigation state:', { isMenuOpen, isScrolled });

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Logo />
          
          <DesktopNav 
            navLinks={navLinks} 
            isLinkActive={isLinkActive} 
            handleNavigation={handleNavigation}
            closeMenu={closeMenu}
            user={user}
          />
          
          <button 
            className="md:hidden text-black z-50"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <MobileMenu 
          isMenuOpen={isMenuOpen} 
          closeMenu={closeMenu}
          navLinks={navLinks}
          isLinkActive={isLinkActive}
          handleNavigation={handleNavigation}
          user={user}
        />
      </div>
    </header>
  );
};

export default Navbar;
