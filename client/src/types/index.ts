/**
 * Core Data Models
 * TypeScript interfaces for all application data structures
 */

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  rating: number;
  category: string;
  score: number;
  marketplace: string;
  buyUrl: string;
  image: string;
  alt: string;
  summary: string;
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  text?: string;
  type?: 'product-grid';
  products?: string[];
}

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AppData {
  products: Product[];
  favorites: string[];
  viewed: string[];
  chats: Chat[];
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  minRating: number;
  sortBy: 'score' | 'price' | 'rating';
}

export type AnalyticsEvent = 
  | { type: 'product_view'; productId: string }
  | { type: 'favorite_toggle'; productId: string; action: 'add' | 'remove' }
  | { type: 'compare_products'; productIds: string[] }
  | { type: 'buy_click'; productId: string; marketplace: string };
