import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'wouter';
import { useChats } from '@/hooks/useChats';
import { MobileNav } from '@/components/MobileNav';
import { TopBar } from '@/components/TopBar';

/**
 * Home Page
 * Hero section with headline and search input
 * Entry point to chat interface
 */
export default function Home() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const { createChat } = useChats();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const chatId = createChat(query.trim());
      setLocation(`/chat/${chatId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <TopBar showMenuButton={false} />
      <main className="flex-1 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Your Smart Shopping Engine
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Chat · Compare · Shop
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover the best products across multiple marketplaces with AI-powered recommendations. 
              Compare prices, read reviews, and make informed decisions.
            </p>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="let's shop now…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 h-14 text-lg"
                  data-testid="input-home-search"
                  aria-label="Search for products"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8"
                disabled={!query.trim()}
                data-testid="button-start-shopping"
              >
                Start Shopping
              </Button>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setQuery('wireless earbuds under $100');
              }}
              data-testid="button-example-1"
            >
              Wireless earbuds
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setQuery('best air fryer for 2 people');
              }}
              data-testid="button-example-2"
            >
              Air fryer
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setQuery('fast phone charger');
              }}
              data-testid="button-example-3"
            >
              Fast charger
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Search</h3>
              <p className="text-sm text-muted-foreground">
                Natural language queries to find exactly what you need
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-chart-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Smart Comparison</h3>
              <p className="text-sm text-muted-foreground">
                Compare up to 4 products side-by-side with detailed metrics
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-chart-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Multi-Marketplace</h3>
              <p className="text-sm text-muted-foreground">
                Find the best deals across Amazon, Noon, SHEIN, and more
              </p>
            </div>
          </div>
        </div>
      </div>
      </main>
      <MobileNav />
    </div>
  );
}
