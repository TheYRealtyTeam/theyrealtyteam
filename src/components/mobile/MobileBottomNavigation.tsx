
import React from 'react';
import { Home, Wrench, BookOpen, MessageCircle, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileBottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', href: '/', isExternal: false },
    { icon: Wrench, label: 'Tools', href: '/tools', isExternal: false },
    { icon: BookOpen, label: 'Blog', href: '/blog', isExternal: false },
    { icon: MessageCircle, label: 'Contact', href: '/contact', isExternal: false },
    { icon: Phone, label: 'Call', href: 'tel:(845)734-3331', isExternal: true }
  ];

  const handleNavClick = (href: string, isExternal: boolean) => {
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
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
      style={{ 
        position: 'fixed',
        zIndex: 10000,
        paddingBottom: 'env(safe-area-inset-bottom)',
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: 'transform' // Optimize for position changes
      }}
    >
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item, index) => {
          if (item.isExternal) {
            return (
              <button
                key={index}
                onClick={() => handleNavClick(item.href, item.isExternal)}
                className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 transition-colors group min-h-[44px]"
              >
                <item.icon className="h-5 w-5 text-gray-600 group-hover:text-yrealty-accent transition-colors" />
                <span className="text-xs text-gray-600 group-hover:text-yrealty-accent transition-colors mt-1">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={index}
              to={item.href}
              className={`flex flex-col items-center justify-center p-2 hover:bg-gray-50 transition-colors group min-h-[44px] ${
                isActive(item.href) ? 'text-yrealty-accent' : ''
              }`}
            >
              <item.icon className={`h-5 w-5 transition-colors ${
                isActive(item.href) ? 'text-yrealty-accent' : 'text-gray-600 group-hover:text-yrealty-accent'
              }`} />
              <span className={`text-xs transition-colors mt-1 ${
                isActive(item.href) ? 'text-yrealty-accent font-semibold' : 'text-gray-600 group-hover:text-yrealty-accent'
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
