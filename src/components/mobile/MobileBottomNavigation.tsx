
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
    <nav 
      className="block md:hidden"
      style={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        height: '64px',
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      <div className="grid grid-cols-5 h-full">
        {navItems.map((item, index) => {
          if (item.isExternal) {
            return (
              <button
                key={index}
                onClick={() => handleNavClick(item.href, item.isExternal)}
                className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 transition-colors group"
                style={{ minHeight: '44px' }}
              >
                <item.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors mt-1">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={index}
              to={item.href}
              className={`flex flex-col items-center justify-center p-2 hover:bg-gray-50 transition-colors group ${
                isActive(item.href) ? 'text-blue-600' : ''
              }`}
              style={{ minHeight: '44px' }}
            >
              <item.icon className={`h-5 w-5 transition-colors ${
                isActive(item.href) ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'
              }`} />
              <span className={`text-xs transition-colors mt-1 ${
                isActive(item.href) ? 'text-blue-600 font-semibold' : 'text-gray-600 group-hover:text-blue-600'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNavigation;
