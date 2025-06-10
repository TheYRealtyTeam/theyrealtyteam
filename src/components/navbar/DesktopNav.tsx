
import React from 'react';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';
import { NavLink } from './NavLink';

interface DesktopNavProps {
  navLinks: Array<{ name: string; href: string; isAnchorLink: boolean }>;
  isLinkActive: (link: { href: string; isAnchorLink: boolean }) => boolean;
  handleNavigation: (e: React.MouseEvent<HTMLButtonElement>, link: { href: string; isAnchorLink: boolean }) => void;
  closeMenu: () => void;
  user: any;
}

const DesktopNav = ({ navLinks, isLinkActive, handleNavigation, closeMenu, user }: DesktopNavProps) => {
  console.log('DesktopNav rendering, React available:', !!React);
  const { safeNavigate } = useSafeNavigation();
  
  const handleProfileClick = () => {
    safeNavigate('/profile');
  };

  const handleAppointmentClick = () => {
    safeNavigate('/appointment');
  };

  return (
    <nav className="hidden md:flex items-center space-x-2" aria-label="Main Navigation">
      {navLinks.map((link) => (
        <NavLink 
          key={link.name}
          link={link}
          isActive={isLinkActive(link)}
          onClick={(e) => link.isAnchorLink ? handleNavigation(e, link) : closeMenu()}
        />
      ))}
      
      {user ? (
        <button onClick={handleProfileClick} className="ml-4 btn-primary font-bold">
          Profile
        </button>
      ) : (
        <button onClick={handleAppointmentClick} className="ml-1 btn-primary font-bold">
          Get Started
        </button>
      )}
    </nav>
  );
};

export default DesktopNav;
