import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { 
  X,
  BookMarked,
  Compass,
  Volume2,
  BookOpen,
  Palette,
  History,
  Gamepad2,
  Settings,
  Crown,
  LogOut,
  Award,
  Sparkles
} from 'lucide-react';
import { Screen, User, Theme } from '../App';

interface SlidingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  user: User | null;
  onLogout: () => void;
  theme: Theme;
}

export function SlidingSidebar({
  isOpen,
  onClose,
  currentScreen,
  setCurrentScreen,
  user,
  onLogout,
  theme
}: SlidingSidebarProps) {
  
  const handleNavigation = (screen: Screen) => {
    setCurrentScreen(screen);
    onClose();
  };

  const themeStyles = {
    forest: {
      sidebar: 'bg-gradient-to-b from-emerald-900/95 to-green-800/95 border-emerald-500/30',
      text: 'text-white',
      badge: 'from-emerald-600/80 to-green-600/80 border-emerald-400/40 text-white',
      icon: 'text-emerald-300',
      itemHover: 'hover:bg-emerald-500/20'
    },
    ocean: {
      sidebar: 'bg-gradient-to-b from-blue-900/95 to-cyan-800/95 border-blue-500/30',
      text: 'text-white',
      badge: 'from-blue-600/80 to-cyan-600/80 border-blue-400/40 text-white',
      icon: 'text-cyan-300',
      itemHover: 'hover:bg-cyan-500/20'
    },
    sunset: {
      sidebar: 'bg-gradient-to-b from-orange-900/95 to-red-800/95 border-orange-500/30',
      text: 'text-white',
      badge: 'from-orange-600/80 to-red-600/80 border-orange-400/40 text-white',
      icon: 'text-orange-300',
      itemHover: 'hover:bg-orange-500/20'
    },
    night: {
      sidebar: 'bg-gradient-to-b from-indigo-900/95 to-purple-800/95 border-indigo-500/30',
      text: 'text-white',
      badge: 'from-indigo-600/80 to-purple-600/80 border-indigo-400/40 text-white',
      icon: 'text-purple-300',
      itemHover: 'hover:bg-purple-500/20'
    }
  };

  const currentTheme = themeStyles[theme];

  const menuItems = [
    { id: 'journal', icon: BookMarked, label: 'Company Info' },
    { id: 'search', icon: Compass, label: 'Explore' },
    { id: 'audio', icon: Volume2, label: 'Audio Settings' },
    { id: 'bookSettings', icon: BookOpen, label: 'Book Settings' },
    { id: 'themes', icon: Palette, label: 'Themes' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'minigames', icon: Gamepad2, label: 'Mini Games' },
    { id: 'account', icon: Settings, label: 'Account Settings' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Sliding Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.4, 0, 0.2, 1] // easeInOut
            }}
            className={`fixed left-0 top-0 h-full w-80 z-[70] ${currentTheme.sidebar} backdrop-blur-lg border-r-2 shadow-2xl`}
          >
            {/* Header Section */}
            <div className={`flex items-center justify-between px-4 py-4 border-b ${currentTheme.text} border-white/10`}>
              <h2 className="text-lg font-bold">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className={`${currentTheme.itemHover} p-2`}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="px-3 py-4 overflow-y-auto h-[calc(100%-80px)]">
              <p className={`text-xs font-medium ${currentTheme.text} mb-3 opacity-70 px-2`}>
                Navigation
              </p>

              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => handleNavigation(item.id as Screen)}
                      className={`w-full justify-start ${currentTheme.text} ${currentTheme.itemHover} ${
                        isActive ? 'bg-white/10' : ''
                      } transition-all duration-200`}
                    >
                      <div className={`w-9 h-9 rounded-full ${
                        isActive ? 'bg-white/20' : 'bg-white/10'
                      } flex items-center justify-center mr-3`}>
                        <Icon className={`w-4 h-4 ${currentTheme.icon}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm">{item.label}</p>
                      </div>
                    </Button>
                  );
                })}

                {/* Badge Collection - Only for authenticated users */}
                {user && !user.isGuest && (
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('badges')}
                    className={`w-full justify-start ${currentTheme.text} ${currentTheme.itemHover} ${
                      currentScreen === 'badges' ? 'bg-white/10' : ''
                    } transition-all duration-200`}
                  >
                    <div className={`w-9 h-9 rounded-full ${
                      currentScreen === 'badges' ? 'bg-white/20' : 'bg-white/10'
                    } flex items-center justify-center mr-3`}>
                      <Award className={`w-4 h-4 ${currentTheme.icon}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">Badge Collection</p>
                    </div>
                  </Button>
                )}
              </div>

              {/* Admin Panel */}
              {user?.isAdmin && (
                <div className="mt-4">
                  <div className="h-px bg-white/10 my-3" />
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('admin')}
                    className={`w-full justify-start text-blue-300 hover:bg-blue-500/20 ${
                      currentScreen === 'admin' ? 'bg-blue-500/20' : ''
                    } transition-all duration-200`}
                  >
                    <div className={`w-9 h-9 rounded-full ${
                      currentScreen === 'admin' ? 'bg-blue-500/30' : 'bg-blue-500/20'
                    } flex items-center justify-center mr-3`}>
                      <Crown className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">Admin Panel</p>
                    </div>
                  </Button>
                </div>
              )}

              {/* Logout */}
              {user && !user.isGuest && (
                <div className="mt-4">
                  <div className="h-px bg-white/10 my-3" />
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full justify-start text-red-300 hover:bg-red-500/20 transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                      <LogOut className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">Sign Out</p>
                    </div>
                  </Button>

                  {/* Theme Badge - User's Explorer Title */}
                  {user.themeTitle && (
                    <div className={`mt-3 px-3 py-3 bg-gradient-to-r ${currentTheme.badge} rounded-lg border`}>
                      <div className="flex items-center gap-2">
                        <Sparkles className={`w-4 h-4 ${currentTheme.icon}`} />
                        <span className="text-xs font-semibold">
                          {user.themeTitle}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
