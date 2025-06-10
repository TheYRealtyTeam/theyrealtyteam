
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (link.isAnchorLink) {
      // Handle anchor links with smooth scrolling
      const sectionId = link.href.split('#')[1];
      const element = document.getElementById(sectionId);
      
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    } else {
      // Handle regular navigation
      navigate(link.href);
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
