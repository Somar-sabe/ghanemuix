import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import mockData from '@assets/chat-UI-data_1760686170530.json';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : mockData.favorites;
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId) ? prev : [...prev, productId]
    );
  };

  const removeFavorite = (productId: string) => {
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
