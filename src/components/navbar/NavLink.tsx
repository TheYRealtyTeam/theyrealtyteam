
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavLinkProps {
  link: {
    name: string;
    href: string;
    isAnchorLink: boolean;
  };
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export const NavLink = ({ link, isActive, onClick, className = '' }: NavLinkProps) => {
  console.log('NavLink rendering:', link.name, 'React available:', !!React);
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (link.isAnchorLink) {
      onClick(e);
    } else {
      e.preventDefault();
      navigate(link.href);
      onClick(e);
    }
  };

  return (
    <a
      href={link.href}
      className={`nav-link text-black font-medium ${isActive ? 'active' : ''} ${className}`}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {link.name}
    </a>
  );
};
