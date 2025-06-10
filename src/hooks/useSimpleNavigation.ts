
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useSimpleNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  console.log('useSimpleNavigation - Current location:', location.pathname);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Only track sections on home page
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
  }, [location.pathname]);

  // Set active section based on current path
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveSection('home');
    } else {
      const mainPath = location.pathname.split('/')[1];
      setActiveSection(mainPath || 'home');
    }
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const navigateToPage = useCallback((href: string) => {
    try {
      if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
        window.location.href = href;
        return;
      }
      
      navigate(href);
      closeMenu();
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = href;
    }
  }, [navigate, closeMenu]);

  const scrollToSection = useCallback((sectionId: string) => {
    try {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
        closeMenu();
      }
    } catch (error) {
      console.error('Scroll to section error:', error);
    }
  }, [closeMenu]);

  const isLinkActive = useCallback((link: { href: string, isAnchorLink: boolean }) => {
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
  }, [activeSection, location.pathname]);

  return {
    isMenuOpen,
    isScrolled,
    activeSection,
    toggleMenu,
    closeMenu,
    navigateToPage,
    scrollToSection,
    isLinkActive,
  };
};
