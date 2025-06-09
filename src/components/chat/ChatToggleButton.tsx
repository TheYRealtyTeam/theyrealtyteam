
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useIsMobileOptimized } from '@/hooks/useIsMobileOptimized';

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton = ({ onClick }: ChatToggleButtonProps) => {
  const { isMobile } = useIsMobileOptimized();

  if (isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '16px',
          zIndex: 999999,
          pointerEvents: 'auto'
        }}
      >
        <button
          onClick={onClick}
          style={{
            backgroundColor: '#1e3a8a',
            color: 'white',
            padding: '12px',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            border: 'none',
            cursor: 'pointer',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            transform: 'scale(1)',
            position: 'relative'
          }}
          onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          aria-label="Open AI Chat"
        >
          <MessageCircle style={{ height: '24px', width: '24px' }} />
        </button>
      </div>
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
