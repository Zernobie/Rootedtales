import React from 'react';
import { motion } from 'motion';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from './ui/menubar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ThemeUserBadge } from './ThemeUserBadge';
import { 
  Menu,
  User as UserIcon,
  Volume2,
  VolumeX,
  Volume1,
  VolumeOff,
  Compass,
  BookOpen,
  History,
  Gamepad2,
  Palette,
  Settings,
  LogOut,
  Crown,
  Moon,
  Sun,
  Sparkles,
  Leaf,
  X,
  Award,
  BookMarked,
  Music
} from 'lucide-react';
import { Screen, User, Theme } from '../App';
import { getThemeUserInfo } from '../utils/themeUtils';
import redPandaIcon from "figma:asset/546248196d595e6d4e062f40cb848cb1aabef3d7.png";
import redPandaGearIcon from "figma:asset/490247ccb83aa4cfff6cea3c70d615729daa21d9.png";
import redPandaVolumeIcon from "figma:asset/7128b5015c4d419ecea8745adaff9d08f060febd.png";
import redPandaExitIcon from "figma:asset/126cbbc37f833ec1802d3cd3bd94b942f4581ed4.png";

interface EnhancedMenubarProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  user: User | null;
  onLogout: () => void;
  onExit: () => void;
  theme: Theme;
  volume: 'high' | 'medium' | 'low' | 'mute';
  onVolumeChange: () => void;
  onOpenSidebar: () => void;
}

export function EnhancedMenubar({
  currentScreen,
  setCurrentScreen,
  user,
  onLogout,
  onExit,
  theme,
  volume,
  onVolumeChange,
  onOpenSidebar
}: EnhancedMenubarProps) {
  
  const getVolumeIcon = () => {
    const VolumeIconComponent = () => {
      switch (volume) {
        case 'high': return <Volume2 className="w-4 h-4" />;
        case 'medium': return <Volume1 className="w-4 h-4" />;
        case 'low': return <VolumeOff className="w-4 h-4" />;
        case 'mute': return <VolumeX className="w-4 h-4" />;
      }
    };

    return (
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          filter: [
            'drop-shadow(0 0 6px rgba(34, 197, 94, 0.5)) drop-shadow(0 0 12px rgba(34, 197, 94, 0.3))',
            'drop-shadow(0 0 8px rgba(34, 197, 94, 0.7)) drop-shadow(0 0 16px rgba(34, 197, 94, 0.4))',
            'drop-shadow(0 0 6px rgba(34, 197, 94, 0.5)) drop-shadow(0 0 12px rgba(34, 197, 94, 0.3))'
          ]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative flex items-center justify-center"
      >
        <VolumeIconComponent />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full bg-green-400/20 blur-sm"
          style={{
            boxShadow: '0 0 12px rgba(34, 197, 94, 0.4)'
          }}
        />
      </motion.div>
    );
  };

  const getVolumeLabel = () => {
    switch (volume) {
      case 'high': return 'Loud';
      case 'medium': return 'Medium';
      case 'low': return 'Soft';
      case 'mute': return 'Muted';
    }
  };

  const getThemeIcon = () => {
    return (
      <motion.div
        animate={{
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 16px rgba(34, 197, 94, 0.4))'
        }}
      >
        <img 
          src={redPandaIcon} 
          alt="Red Panda" 
          className="w-6 h-6 rounded-full"
          style={{
            filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.5))'
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full bg-green-400/20 blur-sm"
          style={{
            boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)'
          }}
        />
      </motion.div>
    );
  };

  const handleNavigation = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const themeStyles = {
    forest: {
      topBar: 'border-green-200/30 bg-gradient-to-r from-green-50/95 to-emerald-50/95',
      sidebar: 'bg-gradient-to-b from-green-50/95 to-emerald-50/95 border-green-200',
      text: 'text-green-900',
      badge: 'from-green-50 to-emerald-50 border-green-200 text-green-800',
      icon: 'text-green-600',
      glow: 'rgba(34, 197, 94, 0.6)'
    },
    ocean: {
      topBar: 'border-blue-200/30 bg-gradient-to-r from-blue-50/95 to-cyan-50/95',
      sidebar: 'bg-gradient-to-b from-blue-50/95 to-cyan-50/95 border-blue-200',
      text: 'text-blue-900',
      badge: 'from-blue-50 to-cyan-50 border-blue-200 text-blue-800',
      icon: 'text-blue-600',
      glow: 'rgba(59, 130, 246, 0.6)'
    },
    sunset: {
      topBar: 'border-orange-200/30 bg-gradient-to-r from-orange-50/95 to-pink-50/95',
      sidebar: 'bg-gradient-to-b from-orange-50/95 to-pink-50/95 border-orange-200',
      text: 'text-orange-900',
      badge: 'from-orange-50 to-pink-50 border-orange-200 text-orange-800',
      icon: 'text-orange-600',
      glow: 'rgba(249, 115, 22, 0.6)'
    },
    night: {
      topBar: 'border-indigo-200/30 bg-gradient-to-r from-indigo-50/95 to-purple-50/95',
      sidebar: 'bg-gradient-to-b from-indigo-50/95 to-purple-50/95 border-indigo-200',
      text: 'text-indigo-900',
      badge: 'from-indigo-50 to-purple-50 border-indigo-200 text-indigo-800',
      icon: 'text-indigo-600',
      glow: 'rgba(99, 102, 241, 0.6)'
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[385px] z-50 px-1`}>
      <div className={`menubar-enhanced ${currentTheme.topBar} transition-all duration-500 rounded-b-2xl border`}>
        <div className="flex items-center justify-between px-2 py-1.5">
          
          {/* Left: Navigation Menu */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenSidebar}
            className="p-1 menubar-item-hover"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                filter: [
                  'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4)) drop-shadow(0 0 8px rgba(34, 197, 94, 0.2))',
                  'drop-shadow(0 0 6px rgba(34, 197, 94, 0.5)) drop-shadow(0 0 10px rgba(34, 197, 94, 0.3))',
                  'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4)) drop-shadow(0 0 8px rgba(34, 197, 94, 0.2))'
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative flex items-center justify-center"
            >
              <Menu className="w-4 h-4 relative z-10" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-green-400/20 blur-sm"
                style={{
                  boxShadow: '0 0 12px rgba(34, 197, 94, 0.4)'
                }}
              />
            </motion.div>
          </Button>

          {/* Center: App Title & User Status */}
          <div className="flex items-center space-x-1.5 bg-[rgba(42,39,39,0)]">
            <motion.div 
              className="flex items-center space-x-1.5"
              animate={{ 
                scale: [1, 1.05, 1],
                y: [0, -2, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="scale-90">
                {getThemeIcon()}
              </div>
              <motion.h1 
                className="font-bold text-foreground relative text-sm"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(34, 197, 94, 0.6), 0 0 20px rgba(34, 197, 94, 0.4), 0 0 30px rgba(34, 197, 94, 0.2)',
                    '0 0 15px rgba(34, 197, 94, 0.8), 0 0 25px rgba(34, 197, 94, 0.5), 0 0 35px rgba(34, 197, 94, 0.3)',
                    '0 0 10px rgba(34, 197, 94, 0.6), 0 0 20px rgba(34, 197, 94, 0.4), 0 0 30px rgba(34, 197, 94, 0.2)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))',
                  color: 'inherit'
                }}
              >
                Rooted Tales
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-lg bg-green-400/10 blur-sm"
                  style={{
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
                  }}
                />
              </motion.h1>
            </motion.div>
            
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation('profile')}
                className="p-1 h-auto menubar-item-hover"
              >
                <Badge 
                  variant={user.isGuest ? "secondary" : "default"} 
                  className="text-xs flex items-center space-x-1 bg-white/80 backdrop-blur-sm text-[rgb(28,73,31)]"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-3 h-3 rounded-full object-cover" />
                  ) : (
                    <UserIcon className="w-3 h-3" />
                  )}
                  <span className="text-[rgb(36,94,36)]">{user.isGuest ? 'Guest' : user.username}</span>
                  {user.isAdmin && <Crown className="w-3 h-3 text-yellow-500" />}
                </Badge>
              </Button>
            )}
          </div>

          {/* Right: Volume & Controls */}
          <div className="flex items-center space-x-1 mx-[-8px] my-[0px] px-[0px] py-[-1px]">
            {/* Music/Volume Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation('audio')}
              className="p-1.5 h-auto menubar-item-hover"
              aria-label="Audio Settings"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  filter: [
                    'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4)) drop-shadow(0 0 8px rgba(34, 197, 94, 0.2))',
                    'drop-shadow(0 0 6px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 12px rgba(34, 197, 94, 0.3))',
                    'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4)) drop-shadow(0 0 8px rgba(34, 197, 94, 0.2))'
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Music className="w-4 h-4" />
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Volume Indicator */}
        {volume !== 'high' && (
          <motion.div 
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Volume label removed */}
          </motion.div>
        )}
      </div>
    </div>
  );
}
