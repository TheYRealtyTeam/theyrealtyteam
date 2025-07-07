import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import { navLinks } from './navLinks';
import { useNavigation } from './useNavigation';

const MainNavbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  const {
    isMenuOpen,
    isScrolled,
    isLinkActive,
    toggleMenu,
    closeMenu,
    handleNavigation
  } = useNavigation();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Logo />
          
          <DesktopNav 
            navLinks={navLinks}
            isLinkActive={isLinkActive}
            handleNavigation={handleNavigation}
            closeMenu={closeMenu}
          />
          
          <MobileMenu 
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            closeMenu={closeMenu}
            navLinks={navLinks}
            isLinkActive={isLinkActive}
            handleNavigation={handleNavigation}
          />
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;