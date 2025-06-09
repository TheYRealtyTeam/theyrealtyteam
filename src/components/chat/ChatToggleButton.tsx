
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
      <button
        onClick={onClick}
        className="fixed bottom-[90px] right-4 bg-yrealty-navy text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-[9999]"
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '16px',
          zIndex: 9999,
          pointerEvents: 'auto',
          transform: 'translateZ(0)', // Force hardware acceleration
          willChange: 'transform'
        }}
        aria-label="Open AI Chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-yrealty-navy hover:bg-yrealty-navy/90 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-[9999]"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        pointerEvents: 'auto',
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: 'transform'
      }}
      aria-label="Open AI Chat"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

export default ChatToggleButton;
