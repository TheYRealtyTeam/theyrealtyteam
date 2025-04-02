
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      setIsScrolled(window.scrollY > 10);
      
      // Determine which section is currently in view for homepage
      const pathname = window.location.pathname;
      if (pathname === '/') {
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
  }, []);

  // Check current path to determine active link
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === '/') {
      setActiveSection('home');
    } else {
      // Extract the main path without slashes or params
      const mainPath = pathname.split('/')[1];
      setActiveSection(mainPath || 'home');
    }
  }, [window.location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/', isAnchorLink: false },
    { name: 'About', href: '/#about', isAnchorLink: true },
    { name: 'Services', href: '/#services', isAnchorLink: true },
    { name: 'Areas', href: '/#areas', isAnchorLink: true },
    { name: 'FAQ', href: '/faq', isAnchorLink: false },
    { name: 'Blog', href: '/blog', isAnchorLink: false },
    { name: 'Tools', href: '/tools', isAnchorLink: false },
    { name: 'Contact', href: '/#contact', isAnchorLink: true },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Helper function to determine if a link is active
  const isLinkActive = (link: { href: string, isAnchorLink: boolean }) => {
    if (link.isAnchorLink) {
      const anchorId = link.href.split('#')[1];
      return activeSection === anchorId;
    } else {
      const pathname = window.location.pathname;
      if (link.href === '/') {
        return pathname === '/';
      } else {
        return pathname.startsWith(link.href);
      }
    }
  };

  // Handle navigation for both anchor links and regular routes
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string, isAnchorLink: boolean }) => {
    closeMenu();
    
    if (link.isAnchorLink) {
      e.preventDefault();
      const sectionId = link.href.split('#')[1];
      const element = document.getElementById(sectionId);
      
      if (element) {
        const yOffset = -80; // Adjust based on navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      } else if (window.location.pathname !== '/') {
        // If we're not on the homepage, navigate to homepage first then scroll
        window.location.href = link.href;
      }
    }
    // For non-anchor links, the default Link behavior will handle navigation
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              link.isAnchorLink ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`nav-link text-black font-medium ${isLinkActive(link) ? 'active' : ''}`}
                  onClick={(e) => handleNavigation(e, link)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`nav-link text-black font-medium ${isLinkActive(link) ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link to="/appointment" className="ml-4 btn-primary font-bold">
              Get Started
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-black"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                link.isAnchorLink ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 text-black hover:bg-yrealty-blue ${isLinkActive(link) ? 'font-bold' : 'font-medium'}`}
                    onClick={(e) => handleNavigation(e, link)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-4 py-2 text-black hover:bg-yrealty-blue ${isLinkActive(link) ? 'font-bold' : 'font-medium'}`}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <Link to="/appointment" className="mx-4 btn-primary text-center font-bold" onClick={closeMenu}>
                Get Started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
