import React from 'react';
import { motion } from 'motion';
import { Button } from './ui/button';
import mysticalForestBg from 'figma:asset/717c220a8f29233ad802c7377356435aee8dcc2b.png';
import xenwinxLogo from 'figma:asset/ca5fe9e99365a585292083e6acfcbb0395244023.png';

interface SplashScreenProps {
  onBeginJourney?: () => void;
}

export function SplashScreen({ onBeginJourney }: SplashScreenProps) {
  return (
    <div
      className="h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${mysticalForestBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Mystical overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-sm mx-auto px-[20px] py-[121px]">

        {/* Rooted Tales Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-6xl font-bold text-amber-100 mb-4 tracking-wider drop-shadow-2xl"
            style={{
              fontFamily: 'serif',
              textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.4)'
            }}
          >
            ROOTED
          </motion.h1>
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-6xl font-bold text-amber-100 tracking-wider drop-shadow-2xl"
            style={{
              fontFamily: 'serif',
              textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.4)'
            }}
          >
            TALES
          </motion.h1>
        </motion.div>

        {/* Xenwinx Logo Animation - 3 Second Duration */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 1,
            duration: 3, // 3 second animation as requested
            ease: "easeOut",
            type: "spring",
            stiffness: 80,
            damping: 15
          }}
          className="mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="w-40 h-40 mx-auto mb-6 relative"
          >
            {/* Outer magical glow effect */}
            <motion.div
              className="absolute inset-0 w-40 h-40 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.4)',
                  '0 0 40px rgba(34, 197, 94, 0.6)',
                  '0 0 20px rgba(34, 197, 94, 0.4)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Logo container with enhanced styling */}
            <motion.div
              className="relative w-40 h-40 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 p-2 shadow-2xl"
              animate={{
                background: [
                  'linear-gradient(135deg, #34d399, #14b8a6, #059669)',
                  'linear-gradient(135deg, #10b981, #0d9488, #047857)',
                  'linear-gradient(135deg, #34d399, #14b8a6, #059669)'
                ]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full bg-transparent flex items-center justify-center backdrop-blur-sm">
                {/* Xenwinx Company Logo */}
                <motion.div
                  className="w-full h-full flex items-center justify-center"
                  animate={{
                    rotate: [0, 3, -3, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.img
                    src={xenwinxLogo}
                    alt="Xenwinx Company Logo"
                    className="w-36 h-36 object-contain drop-shadow-lg"
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Begin Journey Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8, ease: "easeOut" }}
        >
          <Button
            onClick={onBeginJourney}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg font-semibold px-16 py-6 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border-2 border-emerald-400/30"
            style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(34, 197, 94, 0.4)'
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  '1px 1px 2px rgba(0,0,0,0.5)',
                  '1px 1px 8px rgba(255,255,255,0.3)',
                  '1px 1px 2px rgba(0,0,0,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              BEGIN JOURNEY
            </motion.span>
          </Button>
        </motion.div>

        {/* Magical floating elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-300 rounded-full"
              style={{
                left: `${15 + (i * 10)}%`,
                top: `${20 + (i % 4) * 15}%`,
                boxShadow: '0 0 6px rgba(34, 197, 94, 0.6)'
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Company subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-8 left-0 right-0 text-center"
        >
          <p className="text-sm text-amber-200/90 tracking-wide drop-shadow-lg text-[16px]">
            Where Stories Come to Life
          </p>
          <motion.p
            className="text-xs text-white/40 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5 }}
          >
            Powered by Xenwinx Studio
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
