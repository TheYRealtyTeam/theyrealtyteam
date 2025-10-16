
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    // Cache section positions to avoid forced reflows
    let sectionPositions: { id: string; top: number; height: number }[] = [];
    let ticking = false;

    const cacheSectionPositions = () => {
      if (location.pathname === '/') {
        const sections = document.querySelectorAll('section[id]');
        sectionPositions = Array.from(sections).map(section => ({
          id: section.getAttribute('id') || '',
          top: (section as HTMLElement).offsetTop,
          height: (section as HTMLElement).offsetHeight
        }));
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          
          if (location.pathname === '/' && sectionPositions.length > 0) {
            const scrollPosition = window.scrollY + 100;

            for (const section of sectionPositions) {
              if (scrollPosition >= section.top && scrollPosition < section.top + section.height) {
                setActiveSection(section.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial cache and setup
    cacheSectionPositions();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', cacheSectionPositions, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', cacheSectionPositions);
    };
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

  return {
    isMenuOpen,
    isScrolled,
    activeSection,
    toggleMenu,
    closeMenu,
    isLinkActive,
    handleNavigation,
  };
};
