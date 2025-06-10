
import React from 'react';
import { Home, Wrench, BookOpen, MessageCircle, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';

const MobileBottomNavigation = () => {
  const location = useLocation();
  const { navigateToPage } = useSimpleNavigation();
  
  console.log('MobileBottomNavigation rendering - Current path:', location.pathname);
  
  const navItems = [
    { icon: Home, label: 'Home', href: '/', isExternal: false },
    { icon: Wrench, label: 'Tools', href: '/tools', isExternal: false },
    { icon: BookOpen, label: 'Blog', href: '/blog', isExternal: false },
    { icon: MessageCircle, label: 'Contact', href: '/contact', isExternal: false },
    { icon: Phone, label: 'Call', href: 'tel:(845)734-3331', isExternal: true }
  ];

  const handleNavClick = (href: string, isExternal: boolean) => {
    console.log('Navigation clicked:', href, isExternal);
    try {
      if (isExternal) {
        window.location.href = href;
      } else {
        navigateToPage(href);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = href;
    }
  };

  const isActive = (href: string) => {
    try {
      if (href === '/') {
        return location.pathname === '/';
      }
      return location.pathname === href;
    } catch (error) {
      console.error('Location check error:', error);
      return false;
    }
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 h-16 w-full bg-white border-t-2 border-yrealty-accent shadow-lg md:hidden"
      style={{ 
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="grid grid-cols-5 h-full w-full">
        {navItems.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleNavClick(item.href, item.isExternal)}
            className={`flex flex-col items-center justify-center p-2 min-h-[60px] min-w-[60px] transition-colors border-none cursor-pointer ${
              isActive(item.href) ? 'bg-yrealty-blue text-yrealty-accent' : 'bg-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className={`h-5 w-5 ${isActive(item.href) ? 'text-yrealty-accent' : 'text-gray-600'}`} />
            <span className={`text-xs mt-1 font-medium ${isActive(item.href) ? 'text-yrealty-accent font-semibold' : 'text-gray-600'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNavigation;
