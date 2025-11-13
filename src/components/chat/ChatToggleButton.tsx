
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useIsMobileOptimized } from '@/hooks/useIsMobileOptimized';

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton = ({ onClick }: ChatToggleButtonProps) => {
  const { isMobileOnly, isTablet } = useIsMobileOptimized();

  const getPositionClasses = () => {
    if (isMobileOnly) return 'bottom-24 right-4';
    if (isTablet) return 'bottom-8 right-6';
    return 'bottom-6 right-6';
  };

  const getSizeClasses = () => {
    if (isMobileOnly) return 'p-3';
    if (isTablet) return 'p-3.5';
    return 'p-4';
  };

  const getIconSize = () => {
    if (isMobileOnly) return 'h-5 w-5';
    if (isTablet) return 'h-5 w-5';
    return 'h-6 w-6';
  };

  return (
    <button
      onClick={onClick}
      className={`fixed ${getPositionClasses()} bg-yrealty-navy hover:bg-yrealty-navy/90 text-white ${getSizeClasses()} rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-[60]`}
      aria-label="Open AI Chat"
    >
      <MessageCircle className={getIconSize()} />
    </button>
  );
};

export default ChatToggleButton;
