
import React from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  onKeyPress, 
  isLoading 
}: ChatInputProps) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ask about property management..."
          disabled={isLoading}
          className="flex-1"
          maxLength={4000}
        />
        <Button
          onClick={onSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="bg-yrealty-navy hover:bg-yrealty-navy/90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-gray-500">
          Powered by AI • For specific quotes, please contact us directly
        </p>
        <p className="text-xs text-gray-400">
          {inputMessage.length}/4000
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
