import React from 'react';
import { motion } from 'motion';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { 
  Home, 
  Library, 
  Users, 
  Settings, 
  Volume2,
  BookOpen,
  History,
  LogOut,
  User as UserIcon,
  ShoppingBag,
  Gamepad2,
  Palette,
  Compass
} from 'lucide-react';
import { Screen, User } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  user: User | null;
  onLogout: () => void;
}

export function Navigation({ 
  currentScreen, 
  setCurrentScreen, 
  sidebarOpen, 
  setSidebarOpen,
  user,
  onLogout 
}: NavigationProps) {
  // Bottom Navigation Bar: Home, Gallery, Library, Store, Profile
  const bottomNavItems = [
    { id: 'library', icon: Home, label: 'Home' },
    { id: 'characters', icon: Users, label: 'Gallery' },
    { id: 'library-books', icon: Library, label: 'Library' },
    { id: 'store', icon: ShoppingBag, label: 'Store' },
    { id: 'profile', icon: UserIcon, label: 'Profile' },
  ];

  // Side Collapsing Bar: Audio Settings, Explore, Book settings, History, Mini games, Themes, Account
  const sidebarItems = [
    { id: 'audio', icon: Volume2, label: 'Audio Settings' },
    { id: 'search', icon: Compass, label: 'Explore' },
    { id: 'bookSettings', icon: BookOpen, label: 'Book Settings' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'minigames', icon: Gamepad2, label: 'Mini Games' },
    { id: 'themes', icon: Palette, label: 'Themes' },
    { id: 'account', icon: Settings, label: 'Account' },
  ];

  const handleNavigation = (screenId: string) => {
    // Handle special case for library-books to map to library screen
    const actualScreen = screenId === 'library-books' ? 'library' : screenId;
    setCurrentScreen(actualScreen as Screen);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[385px] bg-white/95 backdrop-blur-md border-t border-border z-40">
        <div className="flex items-center justify-around p-2">
          {bottomNavItems.map((item, index) => {
            const isActive = (item.id === 'library-books' && currentScreen === 'library') || currentScreen === item.id;
            const Icon = item.icon;
            
            return (
              <Button
                key={`${item.id}-${index}`}
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item.id)}
                className={`flex flex-col items-center space-y-1 p-2 h-auto ${
                  isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Collapsing Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="text-left">Menu</SheetTitle>
            <SheetDescription className="text-left">
              Navigate through the app sections and manage your account settings
            </SheetDescription>
            {user && (
              <div className="text-left text-sm text-muted-foreground">
                Welcome back, {user.username}
                {user.isAdmin && (
                  <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                    Admin
                  </span>
                )}
              </div>
            )}
          </SheetHeader>
          
          <div className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = currentScreen === item.id;
              const Icon = item.icon;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  onClick={() => handleNavigation(item.id)}
                  className="w-full justify-start"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
            
            {/* Admin Panel (if admin) */}
            {user?.isAdmin && (
              <div className="pt-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => handleNavigation('admin')}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Admin Panel
                </Button>
              </div>
            )}
          </div>

          {/* Logout Button */}
          {user && !user.isGuest && (
            <div className="absolute bottom-4 left-4 right-4">
              <Button
                variant="outline"
                onClick={onLogout}
                className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
