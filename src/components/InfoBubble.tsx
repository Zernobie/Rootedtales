import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from 'lucide-react';
import { Button } from './ui/button';

interface InfoBubbleProps {
  title: string;
  content: string | React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

export function InfoBubble({ title, content, position = 'bottom', size = 'sm' }: InfoBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const bubblePositions = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2'
  };

  const arrowPositions = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-white border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-white border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-white border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-white border-t-transparent border-b-transparent border-l-transparent'
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        style={{
          width: size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px',
          height: size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px',
          minWidth: size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px',
          minHeight: size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px'
        }}
      >
        <Info className={iconSizes[size]} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />

            {/* Speech Bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`absolute z-50 ${bubblePositions[position]}`}
              style={{ width: '280px', maxWidth: '90vw' }}
            >
              {/* Arrow */}
              <div 
                className={`absolute w-0 h-0 ${arrowPositions[position]}`}
                style={{
                  borderWidth: '8px',
                }}
              />

              {/* Bubble Content */}
              <div className="bg-white rounded-xl shadow-2xl border-2 border-blue-200 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-sm text-blue-900 flex items-center gap-1">
                    <Info className="w-4 h-4 text-blue-500" />
                    {title}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-xs text-gray-700 leading-relaxed">
                  {typeof content === 'string' ? (
                    <p>{content}</p>
                  ) : (
                    content
                  )}
                </div>

                {/* Got it button */}
                <Button
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-xs h-7"
                >
                  Got it! 👍
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Inline variant - for use within text
export function InlineInfoBubble({ title, content }: Omit<InfoBubbleProps, 'position' | 'size'>) {
  return (
    <span className="inline-block align-middle ml-1">
      <InfoBubble title={title} content={content} size="sm" position="top" />
    </span>
  );
}
