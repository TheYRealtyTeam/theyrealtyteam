
import React from 'react';
import { Home, Wrench, BookOpen, MessageCircle, Phone } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const MobileBottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Debug logging
  console.log('MobileBottomNavigation is rendering, React available:', !!React);
  console.log('Current location:', location.pathname);
  
  const navItems = [
    { icon: Home, label: 'Home', href: '/', isExternal: false },
    { icon: Wrench, label: 'Tools', href: '/tools', isExternal: false },
    { icon: BookOpen, label: 'Blog', href: '/blog', isExternal: false },
    { icon: MessageCircle, label: 'Contact', href: '/contact', isExternal: false },
    { icon: Phone, label: 'Call', href: 'tel:(845)734-3331', isExternal: true }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal: boolean) => {
    console.log('Navigation clicked:', href, isExternal);
    if (isExternal) {
      window.location.href = href;
    } else {
      e.preventDefault();
      navigate(href);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname === href;
  };

  return (
    <div 
      style={{ 
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        right: '0px',
        zIndex: 999999,
        height: '70px',
        width: '100vw',
        backgroundColor: '#ffffff',
        borderTop: '3px solid #3b82f6',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
        display: 'block'
      }}
      className="md:hidden"
    >
      <div 
        style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          height: '100%',
          width: '100%'
        }}
      >
        {navItems.map((item, index) => {
          if (item.isExternal) {
            return (
              <button
                key={index}
                onClick={() => window.location.href = item.href}
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  minHeight: '60px',
                  minWidth: '60px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                className="hover:bg-gray-100 transition-colors"
              >
                <item.icon style={{ height: '24px', width: '24px', color: '#374151' }} />
                <span style={{ 
                  fontSize: '12px', 
                  color: '#374151', 
                  marginTop: '4px',
                  fontWeight: '500'
                }}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <a
              key={index}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href, item.isExternal)}
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                minHeight: '60px',
                minWidth: '60px',
                textDecoration: 'none',
                backgroundColor: isActive(item.href) ? '#eff6ff' : 'transparent'
              }}
              className="hover:bg-gray-100 transition-colors"
            >
              <item.icon style={{ 
                height: '24px', 
                width: '24px', 
                color: isActive(item.href) ? '#2563eb' : '#374151'
              }} />
              <span style={{ 
                fontSize: '12px', 
                color: isActive(item.href) ? '#2563eb' : '#374151',
                marginTop: '4px',
                fontWeight: isActive(item.href) ? '600' : '500'
              }}>
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNavigation;
