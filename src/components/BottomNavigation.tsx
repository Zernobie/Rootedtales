import React from 'react';
import { motion } from 'motion';
import { Button } from './ui/button';
import { ThemeUserBadge } from './ThemeUserBadge';
import { 
  Home, 
  Library, 
  Users, 
  ShoppingBag,
  User as UserIcon,
} from 'lucide-react';
import { Screen, Theme, User } from '../App';

interface BottomNavigationProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  theme: Theme;
  user?: User | null;
}

export function BottomNavigation({ 
  currentScreen, 
  setCurrentScreen,
  theme,
  user
}: BottomNavigationProps) {
  
  // Bottom Navigation Bar: Home, Gallery, Library, Store, Profile
  const bottomNavItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'characters', icon: Users, label: 'Gallery' },
    { id: 'library', icon: Library, label: 'Library' },
    { id: 'store', icon: ShoppingBag, label: 'Store' },
    { id: 'profile', icon: UserIcon, label: 'Profile' },
  ];

  const handleNavigation = (screenId: string) => {
    setCurrentScreen(screenId as Screen);
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[385px] z-40">
      <div className="navigation-bg backdrop-blur-md border-t-2 rounded-t-3xl transition-all duration-500" style={{
        background: '#000000',
        borderColor: 'rgba(34, 197, 94, 0.2)'
      }}>
        <div className="flex items-center justify-around py-1.5 px-0.5">
          {bottomNavItems.map((item, index) => {
            const isActive = currentScreen === item.id;
            const Icon = item.icon;
            
            return (
              <Button
                key={`${item.id}-${index}`}
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item.id)}
                className={`flex flex-col items-center space-y-0.5 p-1 h-auto transition-all duration-200 ${
                  isActive ? 'text-green-500 bg-green-500/10' : 'text-black hover:bg-white/10'
                }`}
              >
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center space-y-0.5"
                >
                  <motion.div
                    animate={isActive ? { 
                      scale: [1, 1.05, 1],
                      filter: [
                        'drop-shadow(0 0 6px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 12px rgba(34, 197, 94, 0.4))',
                        'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8)) drop-shadow(0 0 16px rgba(34, 197, 94, 0.5))',
                        'drop-shadow(0 0 6px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 12px rgba(34, 197, 94, 0.4))'
                      ]
                    } : { 
                      scale: 1,
                      filter: 'none'
                    }}
                    transition={{ 
                      duration: isActive ? 2 : 0.3,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <Icon 
                      className="w-5 h-5 relative z-10" 
                      style={{
                        color: isActive ? '#22c55e' : '#000000',
                        filter: isActive 
                          ? 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.7)) drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))' 
                          : 'none'
                      }}
                    />
                    {isActive && (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 rounded-full bg-green-500/20 blur-sm"
                        style={{
                          boxShadow: '0 0 15px rgba(34, 197, 94, 0.4), inset 0 0 15px rgba(34, 197, 94, 0.2)'
                        }}
                      />
                    )}
                  </motion.div>
                  <span 
                    className="text-[10px] relative z-10 leading-tight font-medium"
                    style={{
                      color: isActive ? '#22c55e' : '#000000',
                      filter: isActive 
                        ? 'drop-shadow(0 0 3px rgba(34, 197, 94, 0.5))' 
                        : 'none'
                    }}
                  >
                    {item.label}
                  </span>
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="w-1.5 h-0.5 rounded-full relative"
                    transition={{ duration: 0.3 }}
                    style={{
                      backgroundColor: '#22c55e',
                      filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.7)) drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))',
                      boxShadow: '0 0 6px rgba(34, 197, 94, 0.6), 0 0 12px rgba(34, 197, 94, 0.4)'
                    }}
                  />
                )}
              </Button>
            );
          })}
        </div>
        
        {/* Theme-based accent line with green color */}
        <motion.div 
          className="h-1"
          style={{
            background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.4), rgba(22, 163, 74, 0.4), rgba(34, 197, 94, 0.4))'
          }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}
