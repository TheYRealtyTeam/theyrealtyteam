
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton = ({ onClick }: ChatToggleButtonProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <button
        onClick={onClick}
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          backgroundColor: '#1e3a8a',
          color: 'white',
          padding: '16px',
          borderRadius: '50%',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 9999,
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          transform: 'scale(1)',
          willChange: 'transform',
          WebkitTransform: 'translateZ(0)'
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        aria-label="Open AI Chat"
      >
        <MessageCircle style={{ height: '28px', width: '28px' }} />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-yrealty-navy hover:bg-yrealty-navy/90 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
      aria-label="Open AI Chat"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

export default ChatToggleButton;
