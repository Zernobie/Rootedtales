import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  Crown, 
  Award,
  Star,
  Target,
  Zap,
  Heart,
  Footprints,
  BookOpen,
  Medal,
  Gem,
  Book,
  Library,
  Gamepad2,
  Coins,
  Users
} from 'lucide-react';

interface ThemedBadgeIconProps {
  badgeType: 'first-steps' | 'dedicated-reader' | 'weekly-champion' | 'monthly-master' | 
              'book-collector' | 'library-expert' | 'game-master' | 'point-collector' | 'character-expert';
  theme: 'forest' | 'ocean' | 'night' | 'sunset';
  className?: string;
  unlocked?: boolean;
}

export function ThemedBadgeIcon({ badgeType, theme, className = "w-7 h-7", unlocked = false }: ThemedBadgeIconProps) {
  
  // Theme-specific color schemes
  const themeColors = {
    forest: {
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#86efac',
      glow: 'rgba(34, 197, 94, 0.3)'
    },
    ocean: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      accent: '#67e8f9',
      glow: 'rgba(6, 182, 212, 0.3)'
    },
    night: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      accent: '#c4b5fd',
      glow: 'rgba(99, 102, 241, 0.3)'
    },
    sunset: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fdba74',
      glow: 'rgba(249, 115, 22, 0.3)'
    }
  };

  const colors = themeColors[theme];

  // Badge configurations with theme-specific icons
  const badgeConfig = {
    'first-steps': {
      forest: { icon: Footprints, gradient: 'from-green-400 via-emerald-500 to-green-600' },
      ocean: { icon: Footprints, gradient: 'from-cyan-400 via-blue-500 to-cyan-600' },
      night: { icon: Footprints, gradient: 'from-indigo-400 via-purple-500 to-indigo-600' },
      sunset: { icon: Footprints, gradient: 'from-orange-400 via-pink-500 to-orange-600' }
    },
    'dedicated-reader': {
      forest: { icon: Flame, gradient: 'from-green-500 via-emerald-400 to-green-500' },
      ocean: { icon: Flame, gradient: 'from-blue-500 via-cyan-400 to-blue-500' },
      night: { icon: Flame, gradient: 'from-purple-500 via-indigo-400 to-purple-500' },
      sunset: { icon: Flame, gradient: 'from-orange-500 via-red-400 to-orange-500' }
    },
    'weekly-champion': {
      forest: { icon: Trophy, gradient: 'from-yellow-400 via-green-500 to-emerald-600' },
      ocean: { icon: Trophy, gradient: 'from-yellow-400 via-cyan-500 to-blue-600' },
      night: { icon: Trophy, gradient: 'from-yellow-400 via-purple-500 to-indigo-600' },
      sunset: { icon: Trophy, gradient: 'from-yellow-400 via-orange-500 to-pink-600' }
    },
    'monthly-master': {
      forest: { icon: Crown, gradient: 'from-yellow-300 via-green-400 to-emerald-500' },
      ocean: { icon: Crown, gradient: 'from-yellow-300 via-cyan-400 to-blue-500' },
      night: { icon: Crown, gradient: 'from-yellow-300 via-purple-400 to-indigo-500' },
      sunset: { icon: Crown, gradient: 'from-yellow-300 via-pink-400 to-orange-500' }
    },
    'book-collector': {
      forest: { icon: Book, gradient: 'from-green-400 via-emerald-500 to-teal-600' },
      ocean: { icon: Book, gradient: 'from-cyan-400 via-blue-500 to-indigo-600' },
      night: { icon: Book, gradient: 'from-indigo-400 via-purple-500 to-violet-600' },
      sunset: { icon: Book, gradient: 'from-orange-400 via-rose-500 to-pink-600' }
    },
    'library-expert': {
      forest: { icon: Library, gradient: 'from-emerald-400 via-green-500 to-teal-600' },
      ocean: { icon: Library, gradient: 'from-blue-400 via-cyan-500 to-sky-600' },
      night: { icon: Library, gradient: 'from-purple-400 via-indigo-500 to-blue-600' },
      sunset: { icon: Library, gradient: 'from-pink-400 via-orange-500 to-red-600' }
    },
    'game-master': {
      forest: { icon: Gamepad2, gradient: 'from-lime-400 via-green-500 to-emerald-600' },
      ocean: { icon: Gamepad2, gradient: 'from-cyan-400 via-teal-500 to-blue-600' },
      night: { icon: Gamepad2, gradient: 'from-violet-400 via-purple-500 to-indigo-600' },
      sunset: { icon: Gamepad2, gradient: 'from-amber-400 via-orange-500 to-red-600' }
    },
    'point-collector': {
      forest: { icon: Zap, gradient: 'from-yellow-400 via-green-400 to-emerald-500' },
      ocean: { icon: Zap, gradient: 'from-yellow-400 via-cyan-400 to-blue-500' },
      night: { icon: Zap, gradient: 'from-yellow-400 via-purple-400 to-indigo-500' },
      sunset: { icon: Zap, gradient: 'from-yellow-400 via-orange-400 to-pink-500' }
    },
    'character-expert': {
      forest: { icon: Heart, gradient: 'from-pink-400 via-green-400 to-emerald-500' },
      ocean: { icon: Heart, gradient: 'from-pink-400 via-cyan-400 to-blue-500' },
      night: { icon: Heart, gradient: 'from-pink-400 via-purple-400 to-indigo-500' },
      sunset: { icon: Heart, gradient: 'from-pink-400 via-orange-400 to-rose-500' }
    }
  };

  const config = badgeConfig[badgeType][theme];
  const Icon = config.icon;

  if (!unlocked) {
    return (
      <div className={`${className} text-gray-400 relative`}>
        <Icon className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      {/* Outer glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-md opacity-50"
        style={{
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
          transform: 'scale(1.3)'
        }}
      />
      
      {/* Main icon with gradient */}
      <div className={`relative ${className}`}>
        <Icon 
          className="w-full h-full drop-shadow-lg"
          style={{
            filter: `drop-shadow(0 0 8px ${colors.glow}) drop-shadow(0 0 4px ${colors.primary})`
          }}
        />
        
        {/* Sparkle effect overlay */}
        <Sparkles 
          className="absolute -top-1 -right-1 w-3 h-3 text-white opacity-80"
          style={{
            filter: `drop-shadow(0 0 4px ${colors.accent})`
          }}
        />
      </div>
    </div>
  );
}

// Helper component for badge display with theme-specific background
export function ThemedBadgeCard({ 
  badgeType, 
  theme, 
  unlocked,
  size = 'md'
}: ThemedBadgeIconProps & { size?: 'sm' | 'md' | 'lg' }) {
  
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const themeBackgrounds = {
    forest: unlocked ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gray-200',
    ocean: unlocked ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-gray-200',
    night: unlocked ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-gray-200',
    sunset: unlocked ? 'bg-gradient-to-br from-orange-500 to-pink-600' : 'bg-gray-200'
  };

  return (
    <div className={`${sizeClasses[size]} ${themeBackgrounds[theme]} rounded-full flex items-center justify-center relative overflow-hidden shadow-lg`}>
      {unlocked && (
        <>
          {/* Animated shine effect */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)',
              animation: 'shine 3s infinite'
            }}
          />
          
          {/* Theme-specific particle effects */}
          <div className="absolute inset-0">
            {theme === 'forest' && (
              <>
                <div className="absolute top-1 left-1 w-1 h-1 bg-green-200 rounded-full animate-pulse" />
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-emerald-200 rounded-full animate-pulse delay-75" />
              </>
            )}
            {theme === 'ocean' && (
              <>
                <div className="absolute top-2 right-1 w-1 h-1 bg-cyan-200 rounded-full animate-pulse" />
                <div className="absolute bottom-1 left-2 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-100" />
              </>
            )}
            {theme === 'night' && (
              <>
                <div className="absolute top-1 right-2 w-1 h-1 bg-purple-200 rounded-full animate-pulse" />
                <div className="absolute bottom-2 left-1 w-1 h-1 bg-indigo-200 rounded-full animate-pulse delay-150" />
                <div className="absolute top-3 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-75" />
              </>
            )}
            {theme === 'sunset' && (
              <>
                <div className="absolute top-2 left-2 w-1 h-1 bg-orange-200 rounded-full animate-pulse" />
                <div className="absolute bottom-1 right-1 w-1 h-1 bg-pink-200 rounded-full animate-pulse delay-100" />
              </>
            )}
          </div>
        </>
      )}
      
      <ThemedBadgeIcon 
        badgeType={badgeType} 
        theme={theme} 
        className={`${iconSizes[size]} text-white relative z-10`}
        unlocked={unlocked}
      />
    </div>
  );
}
