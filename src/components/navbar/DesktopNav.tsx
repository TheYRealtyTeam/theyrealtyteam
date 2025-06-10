
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from './NavLink';

interface DesktopNavProps {
  navLinks: Array<{ name: string; href: string; isAnchorLink: boolean }>;
  isLinkActive: (link: { href: string; isAnchorLink: boolean }) => boolean;
  handleNavigation: (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; isAnchorLink: boolean }) => void;
  closeMenu: () => void;
  user: any;
}

const DesktopNav = ({ navLinks, isLinkActive, handleNavigation, closeMenu, user }: DesktopNavProps) => {
  console.log('DesktopNav rendering, React available:', !!React);
  const navigate = useNavigate();
  
  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/profile');
  };

  const handleAppointmentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/appointment');
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
        <a href="/profile" onClick={handleProfileClick} className="ml-4 btn-primary font-bold">
          Profile
        </a>
      ) : (
        <a href="/appointment" onClick={handleAppointmentClick} className="ml-1 btn-primary font-bold">
          Get Started
        </a>
      )}
    </nav>
  );
};

export default DesktopNav;
