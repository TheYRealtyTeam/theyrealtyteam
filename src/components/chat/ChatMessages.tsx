
import React from 'react';
import { Bot, User, Loader } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages = ({ messages, isLoading, messagesEndRef }: ChatMessagesProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.role === 'assistant' && (
            <div className="w-8 h-8 bg-yrealty-blue rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-yrealty-navy" />
            </div>
          )}
          
          <div
            className={`${isMobile ? 'max-w-[240px]' : 'max-w-[280px]'} p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-yrealty-navy text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            <p className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {message.role === 'user' && (
            <div className="w-8 h-8 bg-yrealty-accent rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      ))}
      
      {isLoading && (
        <div className="flex gap-3 justify-start">
          <div className="w-8 h-8 bg-yrealty-blue rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="h-4 w-4 text-yrealty-navy" />
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin text-yrealty-navy" />
              <span className="text-sm text-gray-600">Typing...</span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
