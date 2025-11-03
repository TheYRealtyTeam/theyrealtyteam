import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { NavLink } from './NavLink';

interface DesktopNavProps {
  navLinks: Array<{ name: string; href: string; isAnchorLink: boolean }>;
  isLinkActive: (link: { href: string; isAnchorLink: boolean }) => boolean;
  handleNavigation: (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; isAnchorLink: boolean }) => void;
  closeMenu: () => void;
  user: User | null;
  isScrolled: boolean;
}

const DesktopNav = ({ navLinks, isLinkActive, handleNavigation, closeMenu, user, isScrolled }: DesktopNavProps) => {
  const textColorClass = isScrolled ? 'text-black' : 'text-white';
  const buttonClass = isScrolled ? 'btn-primary' : 'btn-accent';
  
  return (
    <nav className="hidden lg:flex items-center space-x-2" aria-label="Main Navigation">
      {navLinks.map((link) => (
        <NavLink 
          key={link.name}
          link={link}
          isActive={isLinkActive(link)}
          onClick={(e) => link.isAnchorLink ? handleNavigation(e, link) : closeMenu()}
          className={textColorClass}
        />
      ))}
      
      {user ? (
        <Link to="/profile" className={`ml-6 ${buttonClass} font-bold`}>
          Profile
        </Link>
      ) : (
        <Link to="/appointment" className={`ml-6 ${buttonClass} font-bold`}>
          Get Started
        </Link>
      )}
    </nav>
  );
};

export default DesktopNav;
