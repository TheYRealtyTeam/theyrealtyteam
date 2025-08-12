import * as React from 'react';
import Logo from '../Logo';
import DesktopNav from './DesktopNav';
import MobileNavMenu from './MobileNavMenu';
import { navLinks } from './navLinks';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MainNavbar = () => {
  // instance check
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log('[MainNavbar] React instance same?', React === (window as any).__reactInstance)
  }
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLinkActive = (link: { href: string; isAnchorLink: boolean }) => {
    if (link.isAnchorLink) {
      const hash = link.href.replace('/', ''); // '/#about' => '#about'
      return location.hash === hash && location.pathname === '/';
    }
    return location.pathname === link.href;
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; isAnchorLink: boolean }) => {
    if (!link.isAnchorLink) return;
    e.preventDefault();
    const hash = link.href.split('#')[1];

    // If we're not on the homepage, navigate there first
    if (location.pathname !== '/') {
      navigate(`/#${hash}`);
      setIsMenuOpen(false);
      return;
    }

    // Smooth scroll on the same page
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = `#${hash}`;
    }
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    // Close mobile menu on route/hash change
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between py-3">
          <Link to="/" aria-label="Y Realty Team Home" className="flex items-center gap-3">
            <Logo />
          </Link>

          <DesktopNav 
            navLinks={navLinks}
            isLinkActive={isLinkActive}
            handleNavigation={handleNavigation}
            closeMenu={() => setIsMenuOpen(false)}
          />

          <MobileNavMenu 
            isMenuOpen={isMenuOpen}
            toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            closeMenu={() => setIsMenuOpen(false)}
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