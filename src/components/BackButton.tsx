import React from 'react';
import { motion } from 'motion';
import { Button } from './ui/button';
import { ArrowLeft, X } from 'lucide-react';

interface BackButtonProps {
  onBack: () => void;
  label?: string;
  variant?: 'arrow' | 'x' | 'text';
  position?: 'fixed' | 'relative';
  className?: string;
  show?: boolean; // Control visibility
}

export function BackButton({ 
  onBack, 
  label = 'Back', 
  variant = 'arrow',
  position = 'fixed',
  className = '',
  show = true
}: BackButtonProps) {
  
  // Don't render if show is false
  if (!show) return null;
  
  const baseClasses = position === 'fixed' 
    ? 'fixed top-14 left-2 z-40'
    : 'inline-flex';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${baseClasses} ${className}`}
    >
      <Button
        onClick={onBack}
        variant="ghost"
        size="sm"
        className="h-7 px-2 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg border hover:bg-white/90 transition-all rounded-full"
      >
        {variant === 'arrow' && <ArrowLeft className="w-3 h-3" />}
        {variant === 'x' && <X className="w-3 h-3" />}
      </Button>
    </motion.div>
  );
}
