
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export const useSafeNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const safeNavigate = useCallback((href: string, options?: { replace?: boolean }) => {
    try {
      if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
        window.location.href = href;
        return;
      }
      
      navigate(href, options);
    } catch (error) {
      console.error('Navigation error, falling back to window.location:', error);
      window.location.href = href;
    }
  }, [navigate]);

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
      }
    } catch (error) {
      console.error('Scroll to section error:', error);
    }
  }, []);

  const getCurrentPath = useCallback(() => {
    try {
      return location.pathname;
    } catch (error) {
      console.error('Get current path error:', error);
      return '/';
    }
  }, [location]);

  return {
    safeNavigate,
    scrollToSection,
    getCurrentPath
  };
};
