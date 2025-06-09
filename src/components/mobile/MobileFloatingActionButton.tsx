
import React, { useState } from 'react';
import { Plus, X, Phone, MessageCircle, Calendar } from 'lucide-react';

const MobileFloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAB = () => setIsOpen(!isOpen);

  const fabActions = [
    { 
      icon: Phone, 
      label: 'Call Now', 
      action: () => window.location.href = 'tel:(845)734-3331',
      className: 'bg-green-500 hover:bg-green-600'
    },
    { 
      icon: MessageCircle, 
      label: 'Chat', 
      action: () => {
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      },
      className: 'bg-blue-500 hover:bg-blue-600'
    },
    { 
      icon: Calendar, 
      label: 'Schedule', 
      action: () => window.location.href = '/appointment',
      className: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="md:hidden fixed bottom-24 right-6 z-30">
      {/* FAB Actions */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-fade-in">
          {fabActions.map((action, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium">
                {action.label}
              </span>
              <button
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                className={`${action.className} text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110`}
              >
                <action.icon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={toggleFAB}
        className={`bg-yrealty-accent hover:bg-yrealty-accent/90 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform ${
          isOpen ? 'rotate-45 scale-110' : 'hover:scale-110'
        }`}
        aria-label={isOpen ? 'Close actions' : 'Open actions'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default MobileFloatingActionButton;
