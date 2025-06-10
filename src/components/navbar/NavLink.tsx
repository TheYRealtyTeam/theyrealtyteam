
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
    if (link.isAnchorLink) {
      onClick(e);
    } else {
      e.preventDefault();
      navigate(link.href);
      onClick(e);
    }
  };

  return (
    <button
      className={`nav-link text-black font-medium ${isActive ? 'active' : ''} ${className} bg-transparent border-none cursor-pointer`}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {link.name}
    </button>
  );
};
