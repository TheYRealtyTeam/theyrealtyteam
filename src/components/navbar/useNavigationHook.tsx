
import React from 'react';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';

export const useNavigationHook = () => {
  console.log('useNavigationHook called, React available:', !!React);
  
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('home');
  const { getCurrentPath, scrollToSection } = useSafeNavigation();

  console.log('useNavigationHook state:', { isMenuOpen, isScrolled, activeSection });

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const currentPath = getCurrentPath();
      if (currentPath === '/') {
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
  }, [getCurrentPath]);

  React.useEffect(() => {
    try {
      const pathname = getCurrentPath();
      if (pathname === '/') {
        setActiveSection('home');
      } else {
        const mainPath = pathname.split('/')[1];
        setActiveSection(mainPath || 'home');
      }
    } catch (error) {
      console.error('Error setting active section:', error);
      setActiveSection('home');
    }
  }, [getCurrentPath]);

  React.useEffect(() => {
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
    try {
      if (link.isAnchorLink) {
        const anchorId = link.href.split('#')[1];
        return activeSection === anchorId;
      } else {
        const currentPath = getCurrentPath();
        if (link.href === '/') {
          return currentPath === '/';
        } else {
          return currentPath.startsWith(link.href);
        }
      }
    } catch (error) {
      console.error('Error checking link active state:', error);
      return false;
    }
  };

  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>, link: { href: string, isAnchorLink: boolean }) => {
    closeMenu();
    
    if (link.isAnchorLink) {
      e.preventDefault();
      const sectionId = link.href.split('#')[1];
      scrollToSection(sectionId);
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
