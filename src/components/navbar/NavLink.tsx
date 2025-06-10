
import React from 'react';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';

interface NavLinkProps {
  link: {
    name: string;
    href: string;
    isAnchorLink: boolean;
  };
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const NavLink = ({ link, isActive, onClick, className = '' }: NavLinkProps) => {
  console.log('NavLink rendering:', link.name, 'React available:', !!React);
  const { safeNavigate, scrollToSection } = useSafeNavigation();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (link.isAnchorLink) {
      const sectionId = link.href.split('#')[1];
      scrollToSection(sectionId);
    } else {
      safeNavigate(link.href);
    }
    
    onClick(e);
  };

  return (
    <button
      type="button"
      className={`nav-link text-black font-medium transition-colors hover:text-yrealty-accent ${isActive ? 'active text-yrealty-accent' : ''} ${className} bg-transparent border-none cursor-pointer px-3 py-2`}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {link.name}
    </button>
  );
};
