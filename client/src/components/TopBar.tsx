import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'wouter';

interface TopBarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

/**
 * Top Navigation Bar
 * Sticky header with logo, search, profile, and theme toggle
 * Glass morphism effect on scroll
 */
export function TopBar({ onMenuClick, showMenuButton = true }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden"
              data-testid="button-menu"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link href="/">
            <button 
              className="font-bold text-xl tracking-tight hover-elevate px-3 py-1 rounded-md transition-all"
              data-testid="link-logo"
            >
              ShopSmart
            </button>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            data-testid="button-search"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <ThemeToggle />

          <Link href="/profile">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              data-testid="button-profile"
              aria-label="View profile"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  U
                </AvatarFallback>
              </Avatar>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
