
import React from 'react';
import { Home, Phone, MessageCircle, User, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MobileBottomNavigation = () => {
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Building, label: 'Services', href: '#services' },
    { icon: MessageCircle, label: 'Contact', href: '#contact' },
    { icon: Phone, label: 'Call', href: 'tel:(845)734-3331', isExternal: true },
    { icon: User, label: user ? 'Profile' : 'Login', href: user ? '/profile' : '/appointment' }
  ];

  const handleNavClick = (href: string, isExternal?: boolean) => {
    if (isExternal) {
      window.location.href = href;
    } else if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(item.href, item.isExternal)}
            className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 transition-colors group"
          >
            <item.icon className="h-5 w-5 text-gray-600 group-hover:text-yrealty-accent transition-colors" />
            <span className="text-xs text-gray-600 group-hover:text-yrealty-accent transition-colors mt-1">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNavigation;
