
import React from 'react';
import { NavLink } from './NavLink';

interface DesktopNavProps {
  navLinks: Array<{ name: string; href: string; isAnchorLink: boolean }>;
  isLinkActive: (link: { href: string; isAnchorLink: boolean }) => boolean;
  handleNavigation: (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; isAnchorLink: boolean }) => void;
  closeMenu: () => void;
}

const DesktopNav = ({ navLinks, isLinkActive, handleNavigation, closeMenu }: DesktopNavProps) => {
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
    </nav>
  );
};

export default DesktopNav;
