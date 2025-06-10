
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  navLinks: Array<{ name: string; href: string; isAnchorLink: boolean }>;
  isLinkActive: (link: { href: string; isAnchorLink: boolean }) => boolean;
  handleNavigation: (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; isAnchorLink: boolean }) => void;
  user: any;
}

const MobileMenu = ({ 
  isMenuOpen, 
  closeMenu, 
  navLinks, 
  isLinkActive, 
  handleNavigation,
  user 
}: MobileMenuProps) => {
  // Mobile-optimized slide-down menu
  return (
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
              link.isAnchorLink ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block text-lg font-semibold text-gray-800 hover:text-yrealty-accent transition-all duration-200 transform hover:translate-x-2 ${
                    isLinkActive(link) ? 'text-yrealty-accent font-bold' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={(e) => handleNavigation(e, link)}
                  aria-current={isLinkActive(link) ? 'page' : undefined}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block text-lg font-semibold text-gray-800 hover:text-yrealty-accent transition-all duration-200 transform hover:translate-x-2 ${
                    isLinkActive(link) ? 'text-yrealty-accent font-bold' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={closeMenu}
                  aria-current={isLinkActive(link) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link 
              to="/appointment" 
              className="w-full bg-gradient-to-r from-yrealty-navy to-yrealty-accent text-white py-4 rounded-xl font-bold text-center block hover:shadow-lg transition-all duration-300" 
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
