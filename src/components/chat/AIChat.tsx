
import React, { useState, useRef, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useIsMobileOptimized } from '@/hooks/useIsMobileOptimized';
import ChatToggleButton from './ChatToggleButton';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { loadChatHistory, saveChatHistory, clearChatHistory, getChatSessionInfo, type StoredMessage } from '@/lib/chatStorage';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const navigate = useNavigate();
  const { isMobile } = useIsMobileOptimized();
  const [isOpen, setIsOpen] = useState(false);
  const getInitialGreeting = (): ChatMessage => ({
    role: 'assistant',
    content: "Hey there! I'm here to help with any questions about property management, rentals, or real estate investing. Whether you're looking for a property, want to know about our services, or just have questions about managing your investment - I've got you covered.\n\n📝 *Quick note: This chat is saved in your browser so you can pick up where you left off. Hit the ↻ button anytime to start fresh.*\n\nWhat brings you here today?",
    timestamp: new Date()
  });

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialGreeting()]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history on mount
  useEffect(() => {
    try {
      const history = loadChatHistory();
      
      if (history.length > 0) {
        const loadedMessages: ChatMessage[] = history.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.timestamp)
        }));
        
        setMessages(loadedMessages);
        
        toast({
          title: "Welcome back!",
          description: "Your previous conversation has been loaded.",
        });
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error loading chat history:', error);
      }
      toast({
        title: "Limited functionality",
        description: "Chat history could not be loaded.",
        variant: "default"
      });
    }
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    
    if (userMessage.length > 2000) {
      toast({
        title: "Message too long",
        description: "Please keep your message under 2000 characters.",
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

      if (error) {
        throw new Error(`Function call failed: ${error.message || 'Unknown error'}`);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (!data || !data.response) {
        throw new Error('Invalid response from AI service');
      }

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => {
        const updated = [...prev, aiMessage];
        
        // Save to localStorage
        const storedMessages: StoredMessage[] = updated.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp.toISOString()
        }));
        saveChatHistory(storedMessages);
        
        return updated;
      });

    } catch (error) {
      
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

  const handleNewChat = () => {
    const info = getChatSessionInfo();
    const confirmMsg = info.messageCount > 2
      ? `Start a new conversation? Your current ${info.messageCount} messages will be cleared.`
      : "Start a new conversation?";
    
    if (window.confirm(confirmMsg)) {
      clearChatHistory();
      
      setMessages([getInitialGreeting()]);
      
      toast({
        title: "New chat started",
        description: "Your previous conversation has been cleared.",
      });
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Delete this conversation? This cannot be undone.")) {
      clearChatHistory();
      
      setMessages([{
        role: 'assistant',
        content: "All clear! What can I help you with?",
        timestamp: new Date()
      }]);
      
      toast({
        title: "Chat cleared",
        description: "All messages have been deleted.",
      });
    }
  };

  if (!isOpen) {
    return <ChatToggleButton onClick={() => setIsOpen(true)} />;
  }

  return (
    <div className={`fixed ${isMobile ? 'inset-x-4 bottom-20 top-20' : 'bottom-6 right-6 w-96 h-[500px]'} bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-40`}>
      <ChatHeader 
        onClose={() => setIsOpen(false)} 
        onNewChat={handleNewChat}
        onClearChat={handleClearChat}
      />
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
  );
};

export default AIChat;
