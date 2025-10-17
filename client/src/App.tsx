import { Switch, Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/hooks/useTheme';
import { ProductsProvider } from '@/hooks/useProducts';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { ViewedProvider } from '@/hooks/useViewed';
import { ChatsProvider } from '@/hooks/useChats';
import { MobileNav } from '@/components/MobileNav';
import { TopBar } from '@/components/TopBar';

import Home from '@/pages/Home';
import ChatPage from '@/pages/ChatPage';
import Favorites from '@/pages/Favorites';
import Viewed from '@/pages/Viewed';
import Profile from '@/pages/Profile';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/not-found';

/**
 * Main App Router
 * Configures all routes and global providers
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/chat/:id" component={ChatPage} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/viewed" component={Viewed} />
      <Route path="/profile" component={Profile} />
      <Route path="/auth" component={Auth} />
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Root App Component
 * Wraps application with all necessary providers:
 * - QueryClient for data fetching
 * - Theme for dark/light mode
 * - Products for product data
 * - Favorites for saved items
 * - Viewed for history
 * - Chats for conversations
 */
export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ProductsProvider>
            <FavoritesProvider>
              <ViewedProvider>
                <ChatsProvider>
                  <TooltipProvider>
                    <Router />
                    <Toaster />
                  </TooltipProvider>
                </ChatsProvider>
              </ViewedProvider>
            </FavoritesProvider>
          </ProductsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
