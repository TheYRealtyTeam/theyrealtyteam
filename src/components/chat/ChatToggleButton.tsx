
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useIsMobileOptimized } from '@/hooks/useIsMobileOptimized';

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton = ({ onClick }: ChatToggleButtonProps) => {
  const { isMobileOnly } = useIsMobileOptimized();

  return (
    <button
      onClick={onClick}
      className={`fixed ${isMobileOnly ? 'bottom-24 right-4' : 'bottom-6 right-6'} bg-yrealty-navy hover:bg-yrealty-navy/90 text-white ${isMobileOnly ? 'p-3' : 'p-4'} rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40`}
      aria-label="Open AI Chat"
    >
      <MessageCircle className={`${isMobileOnly ? 'h-5 w-5' : 'h-6 w-6'}`} />
    </button>
  );
};

export default ChatToggleButton;
