
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      if (location.pathname === '/') {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          const sectionId = section.getAttribute('id') || '';
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/') {
      setActiveSection('home');
    } else {
      const mainPath = pathname.split('/')[1];
      setActiveSection(mainPath || 'home');
    }
  }, [location.pathname]);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/', isAnchorLink: false },
    { name: 'About', href: '/#about', isAnchorLink: true },
    { name: 'Services', href: '/#services', isAnchorLink: true },
    { name: 'Areas', href: '/#areas', isAnchorLink: true },
    { name: 'FAQ', href: '/faq', isAnchorLink: false },
    { name: 'Blog', href: '/blog', isAnchorLink: false },
    { name: 'Tools', href: '/tools', isAnchorLink: false },
    { name: 'Contact', href: '/contact', isAnchorLink: false },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isLinkActive = (link: { href: string, isAnchorLink: boolean }) => {
    if (link.isAnchorLink) {
      const anchorId = link.href.split('#')[1];
      return activeSection === anchorId;
    } else {
      if (link.href === '/') {
        return location.pathname === '/';
      } else {
        return location.pathname.startsWith(link.href);
      }
    }
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string, isAnchorLink: boolean }) => {
    closeMenu();
    
    if (link.isAnchorLink) {
      e.preventDefault();
      const sectionId = link.href.split('#')[1];
      const element = document.getElementById(sectionId);
      
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      } else if (location.pathname !== '/') {
        window.location.href = link.href;
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              link.isAnchorLink ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`nav-link text-black font-medium ${isLinkActive(link) ? 'active' : ''}`}
                  onClick={(e) => handleNavigation(e, link)}
                  aria-current={isLinkActive(link) ? 'page' : undefined}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`nav-link text-black font-medium ${isLinkActive(link) ? 'active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isLinkActive(link) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link to="/appointment" className="ml-4 btn-primary font-bold">
              Get Started
            </Link>
          </nav>
          
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
        
        <div 
          id="mobile-menu"
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMenu}
          aria-hidden={!isMenuOpen}
        >
          <nav 
            className={`absolute right-0 top-0 h-screen w-64 bg-white p-4 shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile Navigation"
          >
            <div className="pt-16 flex flex-col space-y-4">
              {navLinks.map((link) => (
                link.isAnchorLink ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 text-black hover:bg-yrealty-blue transition-colors rounded-md ${isLinkActive(link) ? 'font-bold' : 'font-medium'}`}
                    onClick={(e) => handleNavigation(e, link)}
                    aria-current={isLinkActive(link) ? 'page' : undefined}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-4 py-2 text-black hover:bg-yrealty-blue transition-colors rounded-md ${isLinkActive(link) ? 'font-bold' : 'font-medium'}`}
                    onClick={closeMenu}
                    aria-current={isLinkActive(link) ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <Link to="/appointment" className="mx-4 mt-4 btn-primary text-center font-bold" onClick={closeMenu}>
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
