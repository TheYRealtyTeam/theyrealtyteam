
import React from 'react';
import { Bot, X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="bg-yrealty-navy text-white p-4 rounded-t-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-yrealty-accent rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold">Y Realty Assistant</h3>
          <p className="text-xs opacity-90">Ask me anything about property management</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="hover:bg-white/20 p-1 rounded transition-colors"
        aria-label="Close chat"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ChatHeader;
