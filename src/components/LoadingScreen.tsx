import React, { useEffect } from 'react';
import { motion } from 'motion';
import mysticalForestBg from 'figma:asset/de4eff0107ece6776a39e487469a8b154a1d5edc.png';

interface LoadingScreenProps {
  onLoadComplete?: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  useEffect(() => {
    // Simulate loading time before transitioning to landing page
    const loadingTimer = setTimeout(() => {
      onLoadComplete?.();
    }, 3000); // 3 second loading duration

    return () => clearTimeout(loadingTimer);
  }, [onLoadComplete]);

  return (
    <div
      className="h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${mysticalForestBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Mystical overlay for depth and atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-sm mx-auto">

        {/* Loading Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.h1
            className="text-4xl font-bold text-emerald-100 mb-4 tracking-wider drop-shadow-2xl"
            style={{
              fontFamily: 'serif',
              textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(52, 211, 153, 0.4)'
            }}
            animate={{
              textShadow: [
                '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(52, 211, 153, 0.4)',
                '2px 2px 12px rgba(0,0,0,0.9), 0 0 30px rgba(52, 211, 153, 0.6)',
                '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(52, 211, 153, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Entering the Forest...
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg text-emerald-200/90 tracking-wide drop-shadow-lg"
          >
            Preparing your magical journey
          </motion.p>
        </motion.div>

        {/* Animated Loading Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-8 relative"
        >
          {/* Central Loading Orb */}
          <motion.div
            className="w-24 h-24 mx-auto mb-6 relative"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-emerald-300/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Inner Rotating Ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-t-emerald-400 border-r-transparent border-b-emerald-400 border-l-transparent"
              animate={{
                rotate: -360
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Central Glow */}
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(52, 211, 153, 0.4)',
                  '0 0 40px rgba(52, 211, 153, 0.7)',
                  '0 0 20px rgba(52, 211, 153, 0.4)'
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />
          </motion.div>

          {/* Loading Progress Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-emerald-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: '0 0 8px rgba(52, 211, 153, 0.5)'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Loading Text Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.p
            className="text-sm text-emerald-200/80 tracking-wider"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Loading your adventure...
          </motion.p>
        </motion.div>

        {/* Floating Forest Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + (i * 7)}%`,
                top: `${20 + (i % 4) * 15}%`,
              }}
            >
              {/* Leaf particles */}
              <motion.div
                className="w-3 h-3 text-emerald-300 text-xs"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + (i * 0.2),
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                🍃
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mystical Light Rays */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 bg-gradient-to-b from-emerald-300/20 to-transparent"
              style={{
                height: '200px',
                left: `${(i - 3) * 20}px`,
                transformOrigin: 'top center',
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 0.6, 0],
                rotate: (i - 3) * 5
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Bottom status text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-0 right-0 text-center"
        >
          <p className="text-xs text-emerald-200/70 tracking-wide">
            Rooted Tales • Mystical Adventures Await
          </p>
        </motion.div>
      </div>
    </div>
  );
}
