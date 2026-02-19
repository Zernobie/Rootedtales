import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion';
import pandaCursor from 'figma:asset/cb3112923ab3b58270606fcfe8d0441c892afca9.png';

interface InteractiveCursorProps {
  enabled: boolean;
  size?: number;
}

export function InteractiveCursor({ enabled, size = 80 }: InteractiveCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsVisible(false);
      return;
    }

    let moveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      setIsVisible(true);

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(moveTimeout);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: isMoving ? 1 : 0.95,
            x: mousePosition.x - size / 2,
            y: mousePosition.y - size / 2,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 28,
            mass: 0.5,
          }}
          style={{
            width: size,
            height: size,
          }}
        >
          <motion.img
            src={pandaCursor}
            alt="Cursor Companion"
            className="w-full h-full object-contain drop-shadow-lg"
            animate={{
              rotate: isMoving ? [-5, 5, -5] : 0,
            }}
            transition={{
              rotate: {
                duration: 0.5,
                repeat: isMoving ? Infinity : 0,
                ease: 'easeInOut',
              },
            }}
          />
          
          {/* Cute bounce effect when idle */}
          {!isMoving && (
            <motion.div
              className="absolute inset-0"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <img
                src={pandaCursor}
                alt="Cursor Companion"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
