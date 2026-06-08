import React from 'react';
import { motion } from 'motion/react';

interface FlipPageProps {
  content: string;
  pageNumber: number;
  isFlipping: boolean;
  direction: 'next' | 'prev';
  dragProgress: number;
  orientation: 'portrait' | 'landscape';
  contentType?: 'text' | 'image';  // NEW: Specify content type
}

export function FlipPage({ 
  content, 
  pageNumber, 
  isFlipping, 
  direction,
  dragProgress,
  orientation,
  contentType = 'text'  // NEW: default to text for backwards compatibility
}: FlipPageProps) {
  const pageWidth = orientation === 'landscape' ? 280 : 340;
  const pageHeight = orientation === 'landscape' ? 450 : 600;

  // Calculate flip rotation based on drag progress or animation
  const getRotation = () => {
    if (dragProgress > 0) {
      return direction === 'next' ? -180 * dragProgress : 180 * dragProgress;
    }
    return 0;
  };

  return (
    <motion.div
      className="relative bg-white shadow-2xl rounded-lg overflow-hidden"
      style={{
        width: pageWidth,
        height: pageHeight,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={isFlipping ? {
        rotateY: direction === 'next' ? -180 : 180,
      } : {
        rotateY: 0
      }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {/* Paper texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cpath d='M0 0h1v1H0V0zm2 2h1v1H2V2z' fill='%23000000' fill-opacity='0.02'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Page shadow for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05)',
        }}
      />

      {/* Page content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Page number */}
        <div className="absolute top-2 right-2 text-xs text-gray-400 font-serif">
          {pageNumber + 1}
        </div>

        {/* Content area */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          {contentType === 'image' ? (
            // IMAGE MODE: Display full-page image
            <img 
              src={content}
              alt={`Page ${pageNumber + 1}`}
              loading="lazy"
              className="w-full h-full object-contain"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          ) : (
            // TEXT MODE: Display text content (existing)
            <div 
              className="text-gray-800 leading-relaxed font-serif text-sm overflow-y-auto max-h-full px-2"
              style={{
                textAlign: 'justify',
                hyphens: 'auto',
                maxWidth: '100%',
                wordBreak: 'break-word',
              }}
            >
              {content}
            </div>
          )}
        </div>

        {/* Page curl effect on corners */}
        <div 
          className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)',
          }}
        />
      </div>

      {/* Page edge highlight */}
      <div 
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-gray-200 to-transparent"
        style={{
          boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
        }}
      />
    </motion.div>
  );
}

export default FlipPage;