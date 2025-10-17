import { Home, MessageSquare, Heart, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';

/**
 * Mobile Navigation Bar
 * Bottom tab bar for mobile devices with 4 primary routes
 */
export function MobileNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/', testId: 'nav-home' },
    { icon: MessageSquare, label: 'Chat', path: '/chat', testId: 'nav-chat' },
    { icon: Heart, label: 'Favorites', path: '/favorites', testId: 'nav-favorites' },
    { icon: User, label: 'Profile', path: '/profile', testId: 'nav-profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ icon: Icon, label, path, testId }) => {
          const isActive = location === path || (path !== '/' && location.startsWith(path));
          return (
            <Link
              key={path}
              href={path}
              className="flex-1"
            >
              <button
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                data-testid={testId}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
