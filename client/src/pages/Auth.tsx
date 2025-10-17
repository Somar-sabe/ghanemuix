import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { SiGoogle, SiFacebook } from 'react-icons/si';
import { Link } from 'wouter';

/**
 * Authentication Page
 * Mock login/signup with social buttons and email/password forms
 */
export default function Auth() {
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleSocialLogin = (provider: string) => {
    toast({
      title: 'Demo Mode',
      description: `${provider} login is not available in demo mode. You are using a guest account.`,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Demo Mode',
      description: 'Login is not available in demo mode. You are using a guest account.',
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Demo Mode',
      description: 'Signup is not available in demo mode. You are using a guest account.',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to ShopSmart</h1>
          <p className="text-muted-foreground">
            Sign in to save your preferences and shopping history
          </p>
        </div>

        {/* Auth Card */}
        <Card className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" data-testid="tab-login">Login</TabsTrigger>
              <TabsTrigger value="signup" data-testid="tab-signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              {/* Social Login */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleSocialLogin('Google')}
                  data-testid="button-google-login"
                >
                  <SiGoogle className="h-5 w-5" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  onClick={() => handleSocialLogin('X')}
                  data-testid="button-x-login"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Continue with X
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
                  onClick={() => handleSocialLogin('Facebook')}
                  data-testid="button-facebook-login"
                >
                  <SiFacebook className="h-5 w-5" />
                  Continue with Facebook
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Email/Password Login */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    data-testid="input-login-email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    data-testid="input-login-password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  data-testid="button-login-submit"
                >
                  Sign In
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="space-y-4">
              {/* Social Signup */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleSocialLogin('Google')}
                  data-testid="button-google-signup"
                >
                  <SiGoogle className="h-5 w-5" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  onClick={() => handleSocialLogin('X')}
                  data-testid="button-x-signup"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Continue with X
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
                  onClick={() => handleSocialLogin('Facebook')}
                  data-testid="button-facebook-signup"
                >
                  <SiFacebook className="h-5 w-5" />
                  Continue with Facebook
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Email/Password Signup */}
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    data-testid="input-signup-name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    data-testid="input-signup-email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    data-testid="input-signup-password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  data-testid="button-signup-submit"
                >
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Back to App */}
        <div className="text-center">
          <Link href="/">
            <Button variant="ghost" data-testid="button-back-home">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
