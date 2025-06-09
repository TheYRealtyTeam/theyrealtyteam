
import React from 'react';
import { Home, Wrench, BookOpen, MessageCircle, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileBottomNavigation = () => {
  const location = useLocation();
  
  // Debug logging
  console.log('MobileBottomNavigation is rendering');
  console.log('Current location:', location.pathname);
  
  const navItems = [
    { icon: Home, label: 'Home', href: '/', isExternal: false },
    { icon: Wrench, label: 'Tools', href: '/tools', isExternal: false },
    { icon: BookOpen, label: 'Blog', href: '/blog', isExternal: false },
    { icon: MessageCircle, label: 'Contact', href: '/contact', isExternal: false },
    { icon: Phone, label: 'Call', href: 'tel:(845)734-3331', isExternal: true }
  ];

  const handleNavClick = (href: string, isExternal: boolean) => {
    console.log('Navigation clicked:', href, isExternal);
    if (isExternal) {
      window.location.href = href;
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
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-2xl"
      style={{ 
        zIndex: 999999,
        height: '70px',
        width: '100%',
        position: 'fixed !important' as any,
        bottom: '0 !important' as any,
        left: '0 !important' as any,
        right: '0 !important' as any,
        backgroundColor: '#ffffff !important' as any,
        borderTop: '2px solid #3b82f6 !important' as any,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3) !important' as any
      }}
    >
      <div className="grid grid-cols-5 h-full w-full">
        {navItems.map((item, index) => {
          if (item.isExternal) {
            return (
              <button
                key={index}
                onClick={() => handleNavClick(item.href, item.isExternal)}
                className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 transition-colors"
                style={{ 
                  minHeight: '60px',
                  minWidth: '60px'
                }}
              >
                <item.icon className="h-6 w-6 text-gray-700 hover:text-blue-600 transition-colors" />
                <span className="text-xs text-gray-700 hover:text-blue-600 transition-colors mt-1 font-medium">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={index}
              to={item.href}
              className={`flex flex-col items-center justify-center p-2 hover:bg-gray-100 transition-colors ${
                isActive(item.href) ? 'bg-blue-50' : ''
              }`}
              style={{ 
                minHeight: '60px',
                minWidth: '60px'
              }}
            >
              <item.icon className={`h-6 w-6 transition-colors ${
                isActive(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`} />
              <span className={`text-xs transition-colors mt-1 font-medium ${
                isActive(item.href) ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNavigation;
