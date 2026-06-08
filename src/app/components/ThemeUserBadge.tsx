import React from 'react';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { getThemeUserInfo } from '../utils/themeUtils';
import { Theme } from '../App';

interface ThemeUserBadgeProps {
  theme: Theme;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function ThemeUserBadge({ 
  theme, 
  size = 'md', 
  showIcon = true,
  className = ''
}: ThemeUserBadgeProps) {
  const themeInfo = getThemeUserInfo(theme);
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Badge 
        className={`
          bg-gradient-to-r ${themeInfo.gradient} 
          text-white border-0 
          ${sizeClasses[size]}
          shadow-lg
          hover:shadow-xl
          transition-all duration-300
          backdrop-blur-sm
        `}
      >
        <motion.div 
          className="flex items-center space-x-1.5"
          animate={{ 
            x: [0, 2, 0],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {showIcon && (
            <span className={iconSizes[size]} role="img" aria-label={theme}>
              {themeInfo.icon}
            </span>
          )}
          <span className="font-medium">
            {themeInfo.title} {themeInfo.description}
          </span>
        </motion.div>
      </Badge>
    </motion.div>
  );
}