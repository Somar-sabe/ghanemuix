import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import mockData from '@assets/chat-UI-data_1760686170530.json';

interface ViewedContextType {
  viewed: string[];
  addViewed: (productId: string) => void;
  clearViewed: () => void;
}

const ViewedContext = createContext<ViewedContextType | undefined>(undefined);

export function ViewedProvider({ children }: { children: ReactNode }) {
  const [viewed, setViewed] = useState<string[]>(() => {
    const stored = localStorage.getItem('viewed');
    return stored ? JSON.parse(stored) : mockData.viewed;
  });

  useEffect(() => {
    localStorage.setItem('viewed', JSON.stringify(viewed));
  }, [viewed]);

  const addViewed = (productId: string) => {
    setViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 50);
    });
  };

  const clearViewed = () => {
    setViewed([]);
  };

  return (
    <ViewedContext.Provider value={{ viewed, addViewed, clearViewed }}>
      {children}
    </ViewedContext.Provider>
  );
}

export function useViewed() {
  const context = useContext(ViewedContext);
  if (!context) {
    throw new Error('useViewed must be used within ViewedProvider');
  }
  return context;
}
