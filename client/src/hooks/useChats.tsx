import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Chat, Message } from '@/types';
import mockData from '@assets/chat-UI-data_1760686170530.json';
import { useProducts } from './useProducts';
import { useLocation } from 'wouter';

interface ChatsContextType {
  chats: Chat[];
  currentChat: Chat | null;
  sendMessage: (text: string) => void;
  createChat: (initialMessage: string) => string;
  isTyping: boolean;
}

const ChatsContext = createContext<ChatsContextType | undefined>(undefined);

export function ChatsProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(() => {
    const stored = localStorage.getItem('chats');
    return stored ? JSON.parse(stored) : mockData.chats;
  });
  const [isTyping, setIsTyping] = useState(false);
  const { products } = useProducts();
  const [, setLocation] = useLocation();

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const generateAIResponse = (userMessage: string): Message[] => {
    const lowerMessage = userMessage.toLowerCase();
    const responses: Message[] = [];

    const keywords = {
      earbuds: ['earbuds', 'headphones', 'audio', 'music', 'sound'],
      airfryer: ['air fryer', 'fryer', 'cooking', 'kitchen'],
      charger: ['charger', 'charging', 'usb', 'power'],
      vacuum: ['vacuum', 'clean', 'cleaner'],
      sneakers: ['shoes', 'sneakers', 'footwear'],
      bottle: ['bottle', 'water', 'drink'],
      keyboard: ['keyboard', 'mouse', 'typing', 'desk']
    };

    const matchedProducts: string[] = [];
    
    if (keywords.earbuds.some(k => lowerMessage.includes(k))) {
      matchedProducts.push('p1');
    }
    if (keywords.airfryer.some(k => lowerMessage.includes(k))) {
      matchedProducts.push('p2');
    }
    if (keywords.charger.some(k => lowerMessage.includes(k))) {
      matchedProducts.push('p5');
    }
    if (keywords.vacuum.some(k => lowerMessage.includes(k))) {
      matchedProducts.push('p3');
    }
    if (keywords.sneakers.some(k => lowerMessage.includes(k))) {
      matchedProducts.push('p4');
    }
    if (keywords.bottle.some(k => lowerMessage.includes(k))) {
      matchedProducts.push('p6');
    }
    if (keywords.keyboard.some(k => lowerMessage.includes(k))) {
      matchedProducts.push('p7');
    }

    if (matchedProducts.length > 0) {
      responses.push({
        id: `m${Date.now()}`,
        role: 'ai',
        text: `I found ${matchedProducts.length} product${matchedProducts.length > 1 ? 's' : ''} that match your search. Here are my top recommendations:`,
      });
      responses.push({
        id: `m${Date.now() + 1}`,
        role: 'ai',
        type: 'product-grid',
        products: matchedProducts,
      });
    } else {
      const generalResponses = [
        "I'd be happy to help you find the perfect product! Could you tell me more about what you're looking for?",
        "Let me search for that. What's your budget range and any specific features you need?",
        "I can help with that! Are you looking for something specific in terms of brand or features?",
      ];
      responses.push({
        id: `m${Date.now()}`,
        role: 'ai',
        text: generalResponses[Math.floor(Math.random() * generalResponses.length)],
      });
    }

    return responses;
  };

  const createChat = (initialMessage: string): string => {
    const newChat: Chat = {
      id: `c${Date.now()}`,
      title: initialMessage.slice(0, 50) || 'New Chat',
      createdAt: new Date().toISOString(),
      messages: []
    };

    if (initialMessage.trim()) {
      newChat.messages.push({
        id: `m${Date.now()}`,
        role: 'user',
        text: initialMessage
      });

      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const aiResponses = generateAIResponse(initialMessage);
          setChats(prev => prev.map(c =>
            c.id === newChat.id
              ? { ...c, messages: [...c.messages, ...aiResponses] }
              : c
          ));
          setIsTyping(false);
        }, 1500);
      }, 100);
    }

    setChats(prev => [newChat, ...prev]);
    return newChat.id;
  };

  const sendMessage = (text: string) => {
    setChats(prev => prev.map((chat, idx) => {
      if (idx === 0) {
        const userMessage: Message = {
          id: `m${Date.now()}`,
          role: 'user',
          text
        };
        
        const updatedChat = {
          ...chat,
          messages: [...chat.messages, userMessage]
        };

        setIsTyping(true);
        setTimeout(() => {
          const aiResponses = generateAIResponse(text);
          setChats(prev => prev.map(c =>
            c.id === chat.id
              ? { ...c, messages: [...updatedChat.messages, ...aiResponses] }
              : c
          ));
          setIsTyping(false);
        }, 1500);

        return updatedChat;
      }
      return chat;
    }));
  };

  return (
    <ChatsContext.Provider value={{ chats, currentChat: null, sendMessage, createChat, isTyping }}>
      {children}
    </ChatsContext.Provider>
  );
}

export function useChats(chatId?: string) {
  const context = useContext(ChatsContext);
  if (!context) {
    throw new Error('useChats must be used within ChatsProvider');
  }

  const currentChat = chatId && chatId !== 'new'
    ? context.chats.find(c => c.id === chatId) || null
    : context.chats[0] || null;

  return { ...context, currentChat };
}
