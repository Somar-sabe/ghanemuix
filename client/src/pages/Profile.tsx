import { User, Heart, Eye, MessageSquare, LogOut } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { MobileNav } from '@/components/MobileNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/useFavorites';
import { useViewed } from '@/hooks/useViewed';
import { useChats } from '@/hooks/useChats';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'wouter';

/**
 * Profile Page
 * User account info, statistics, and dark mode toggle
 */
export default function Profile() {
  const { favorites } = useFavorites();
  const { viewed } = useViewed();
  const { chats } = useChats();
  const { theme } = useTheme();

  const stats = [
    { icon: Heart, label: 'Favorites', value: favorites.length, href: '/favorites' },
    { icon: Eye, label: 'Viewed', value: viewed.length, href: '/viewed' },
    { icon: MessageSquare, label: 'Chats', value: chats.length, href: '/chat' },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <TopBar />
      
      <main className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold mb-1">Guest User</h1>
                <p className="text-muted-foreground mb-3">guest@shopsmart.com</p>
                <Link href="/auth">
                  <Button size="sm" variant="outline" data-testid="button-login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map(({ icon: Icon, label, value, href }) => (
              <Link key={label} href={href}>
                <Card className="p-6 hover-elevate cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{label}</p>
                      <p className="text-2xl font-bold">{value}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <h3 className="font-medium mb-1">Appearance</h3>
                  <p className="text-sm text-muted-foreground">
                    Current theme: {theme === 'dark' ? 'Dark' : 'Light'}
                  </p>
                </div>
                <ThemeToggle />
              </div>

              {/* Account Type */}
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <h3 className="font-medium mb-1">Account Type</h3>
                  <p className="text-sm text-muted-foreground">
                    Guest account - Sign in to save your data
                  </p>
                </div>
                <Badge variant="outline">Guest</Badge>
              </div>

              {/* Privacy */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium mb-1">Privacy & Data</h3>
                  <p className="text-sm text-muted-foreground">
                    All data is stored locally in your browser
                  </p>
                </div>
                <Badge variant="secondary">Local Only</Badge>
              </div>
            </div>
          </Card>

          {/* App Info */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">ShopSmart</strong> - Your intelligent shopping assistant
              </p>
              <p>Version 1.0.0</p>
              <p className="pt-2">
                Compare products across Amazon, Noon, SHEIN, Temu and more. 
                Get AI-powered recommendations and find the best deals.
              </p>
            </div>
          </Card>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
