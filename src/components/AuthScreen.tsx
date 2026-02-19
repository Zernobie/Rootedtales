import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Chrome } from 'lucide-react';
import { User as UserType } from '../App';
import forestBg from 'figma:asset/de4eff0107ece6776a39e487469a8b154a1d5edc.png';

interface AuthScreenProps {
  onLogin: (user: Omit<UserType, 'id'>) => void;
  onBack: () => void;
}

export function AuthScreen({ onLogin, onBack }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (activeTab === 'signin') {
      // SIGN IN LOGIC
      const storedUsers = localStorage.getItem('rootedTalesUsers');
      let users: any[] = [];
      
      if (storedUsers) {
        try {
          users = JSON.parse(storedUsers);
        } catch (error) {
          console.error('Error parsing stored users:', error);
        }
      }

      // Check for admin credentials
      const isAdmin = formData.email === 'admin@rootedtales.com' && formData.password === 'admin123';
      
      if (isAdmin) {
        const userData: Omit<UserType, 'id'> = {
          email: formData.email,
          username: 'Admin',
          isGuest: false,
          isAdmin: true,
        };
        onLogin(userData);
        setIsLoading(false);
        return;
      }

      // Check if user exists
      const existingUser = users.find((u: any) => u.email === formData.email);
      
      if (!existingUser) {
        setError('No account found with this email. Please sign up.');
        setIsLoading(false);
        return;
      }
      
      if (existingUser.password !== formData.password) {
        setError('Incorrect password. Please try again.');
        setIsLoading(false);
        return;
      }
      
      // Successful sign in
      const userData: Omit<UserType, 'id'> = {
        email: existingUser.email,
        username: existingUser.username,
        isGuest: false,
        isAdmin: false,
      };
      onLogin(userData);
    } else {
      // SIGN UP LOGIC
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        setIsLoading(false);
        return;
      }
      
      const storedUsers = localStorage.getItem('rootedTalesUsers');
      let users: any[] = [];
      
      if (storedUsers) {
        try {
          users = JSON.parse(storedUsers);
        } catch (error) {
          console.error('Error parsing stored users:', error);
        }
      }
      
      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === formData.email);
      
      if (existingUser) {
        setError('An account with this email already exists. Please sign in.');
        setIsLoading(false);
        return;
      }
      
      // Create new user
      const newUser = {
        email: formData.email,
        username: formData.username,
        password: formData.password, // In production, this should be hashed
      };
      
      users.push(newUser);
      localStorage.setItem('rootedTalesUsers', JSON.stringify(users));
      
      // Login the new user
      const userData: Omit<UserType, 'id'> = {
        email: formData.email,
        username: formData.username,
        isGuest: false,
        isAdmin: false,
      };
      
      onLogin(userData);
    }
    
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'instagram') => {
    setIsLoading(true);
    
    // Simulate social login API call
    setTimeout(() => {
      // Check if user already exists in localStorage
      const storedUsers = localStorage.getItem('rootedTalesUsers');
      let users: any[] = [];
      
      if (storedUsers) {
        try {
          users = JSON.parse(storedUsers);
        } catch (error) {
          console.error('Error parsing stored users:', error);
        }
      }

      // Check for existing social media user
      const socialEmail = `user@${provider}.com`;
      const existingUser = users.find((u: any) => u.email === socialEmail);

      if (existingUser) {
        // Returning social media user
        const userData: Omit<UserType, 'id'> = {
          email: existingUser.email,
          username: existingUser.username,
          isGuest: false,
          isAdmin: false,
        };
        onLogin(userData);
      } else {
        // New social media user - create account
        const newUser = {
          email: socialEmail,
          username: `${provider}_${Math.random().toString(36).substring(7)}`,
          password: 'social_auth', // Social users don't use password login
          provider: provider,
        };
        
        users.push(newUser);
        localStorage.setItem('rootedTalesUsers', JSON.stringify(users));
        
        // Login the new social user
        const userData: Omit<UserType, 'id'> = {
          email: newUser.email,
          username: newUser.username,
          isGuest: false,
          isAdmin: false,
        };
        
        onLogin(userData);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div 
      className="h-full overflow-y-auto"
      style={{
        backgroundImage: `url(${forestBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 p-6 min-h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Card className="bg-white/95 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-primary">
                Welcome to Rooted Tales
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in to access your magical library
              </p>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <TabsContent value="signin" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Your password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-sm text-primary"
                    >
                      Forgot your password?
                    </Button>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="Your username"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <Separator className="my-4" />
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Or continue with
                </p>
                
                <div className="space-y-3">
                  {/* Google Sign In */}
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('google')}
                    className="w-full flex items-center justify-center gap-3 h-11 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </Button>

                  {/* Facebook Sign In */}
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('facebook')}
                    className="w-full flex items-center justify-center gap-3 h-11 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Continue with Facebook</span>
                  </Button>

                  {/* Twitter/X Sign In */}
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('instagram')}
                    className="w-full flex items-center justify-center gap-3 h-11 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>Continue with X</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
