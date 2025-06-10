
import * as React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import ChatToggleButton from './ChatToggleButton';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your Y Realty Team assistant. I can help answer questions about property management, real estate investment, and our services. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    
    if (userMessage.length > 4000) {
      toast({
        title: "Message too long",
        description: "Please keep your message under 4000 characters.",
        variant: "destructive"
      });
      return;
    }

    setInputMessage('');
    setIsLoading(true);

    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      console.log('Sending message to AI chat function:', userMessage);
      
      const conversationHistory = messages.slice(-8).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: userMessage,
          conversationHistory: conversationHistory
        }
      });

      console.log('AI chat response received:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Function call failed: ${error.message || 'Unknown error'}`);
      }

      if (data?.error) {
        console.error('AI chat function returned error:', data.error);
        throw new Error(data.error);
      }

      if (!data || !data.response) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response from AI service');
      }

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

      console.log('AI message added to chat successfully');

    } catch (error) {
      console.error('Error in sendMessage:', error);
      
      let errorMessage = "I'm having trouble responding right now. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('authentication')) {
          errorMessage = "AI service authentication issue. Please contact support.";
        } else if (error.message.includes('busy') || error.message.includes('429')) {
          errorMessage = "AI service is busy. Please wait a moment and try again.";
        } else if (error.message.includes('too long')) {
          errorMessage = "Your message is too long. Please try a shorter message.";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = "Network connection issue. Please check your internet and try again.";
        }
      }
      
      toast({
        title: "Chat Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      {!isOpen ? (
        <ChatToggleButton onClick={() => setIsOpen(true)} />
      ) : (
        <div className={`fixed ${isMobile ? 'inset-x-4 bottom-20 top-20' : 'bottom-6 right-6 w-96 h-[500px]'} bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-40`}>
          <ChatHeader onClose={() => setIsOpen(false)} />
          <ChatMessages 
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
          
          <div className="px-4 pb-2">
            <Button
              onClick={() => {
                setIsOpen(false);
                navigate('/contact');
              }}
              variant="outline"
              className="w-full border-yrealty-navy text-yrealty-navy hover:bg-yrealty-navy hover:text-white"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Us Directly
            </Button>
          </div>

          <ChatInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            onSendMessage={sendMessage}
            onKeyPress={handleKeyPress}
            isLoading={isLoading}
          />
        </div>
      )}
    </TooltipProvider>
  );
};

export default AIChat;
