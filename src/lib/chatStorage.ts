// Storage key for chat messages
const CHAT_STORAGE_KEY = 'yrealty_chat_messages';
const MAX_STORED_MESSAGES = 20; // Limit storage to last 20 messages

export interface StoredMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // ISO string for easy serialization
}

// Load messages from localStorage
export const loadChatHistory = (): StoredMessage[] => {
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) return [];
    
    const messages = JSON.parse(stored);
    return Array.isArray(messages) ? messages : [];
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Failed to load chat history:', error);
    }
    return [];
  }
};

// Save messages to localStorage (keeps last 20 only)
export const saveChatHistory = (messages: StoredMessage[]): void => {
  try {
    const toStore = messages.slice(-MAX_STORED_MESSAGES);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(toStore));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to save chat history:', error);
    }
  }
};

// Clear all chat history
export const clearChatHistory = (): void => {
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to clear chat history:', error);
    }
  }
};

// Get chat session info
export const getChatSessionInfo = (): {
  messageCount: number;
  firstMessageDate: Date | null;
} => {
  const messages = loadChatHistory();
  return {
    messageCount: messages.length,
    firstMessageDate: messages.length > 0 
      ? new Date(messages[0].timestamp) 
      : null
  };
};
