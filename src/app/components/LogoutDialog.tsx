import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  X as ExitIcon,
  Home,
  Sparkles,
  Star
} from 'lucide-react';
import nightForestBg from 'figma:asset/883b416cccd56a33a52ffe0df5a37b13a12e0247.png';
import floatingPandaImage from 'figma:asset/fb8ab6f0644e62193e0195e4625e0b919fb94458.png';

interface LogoutDialogProps {
  isOpen: boolean;
  onLogout: () => void;
  onExit: () => void;
  onCancel: () => void;
  username?: string;
}

export function LogoutDialog({ 
  isOpen, 
  onLogout, 
  onExit, 
  onCancel,
  username 
}: LogoutDialogProps) {
  // Generate random stars
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 60,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `url(${nightForestBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-blue-900/60" />

            {/* Animated Stars */}
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Moon */}
            <motion.div
              className="absolute top-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-100"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(253, 224, 71, 0.5)',
                  '0 0 50px rgba(253, 224, 71, 0.8)',
                  '0 0 30px rgba(253, 224, 71, 0.5)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Moon craters */}
              <div className="absolute top-4 left-3 w-3 h-3 rounded-full bg-yellow-300/40" />
              <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-yellow-300/30" />
              <div className="absolute top-6 right-4 w-2 h-2 rounded-full bg-yellow-300/50" />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-between h-full p-6 pt-20">
              
              {/* Floating Red Panda */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative mb-6"
              >
                <motion.img
                  src={floatingPandaImage}
                  alt="Goodbye Red Panda"
                  className="w-40 h-40 object-contain"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))',
                      'drop-shadow(0 0 25px rgba(251, 191, 36, 0.9))',
                      'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))',
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Sparkles around panda */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 2) * 60}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Goodbye Message */}
              <div className="text-center mb-6">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white mb-3"
                  style={{
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 0 30px rgba(251, 191, 36, 0.3)'
                  }}
                >
                  Goodbye{username ? `, ${username}` : ''}!
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-blue-100 text-sm"
                  style={{
                    textShadow: '0 1px 5px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  Sweet dreams until we meet again
                </motion.p>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-3">
                {/* Return to Landing Page */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Card 
                    className="cursor-pointer border-2 border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/40 transition-all"
                    onClick={onLogout}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
                          <Home className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-white">Return to Home</h3>
                          <p className="text-xs text-blue-100">
                            Sign out and go to landing page
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Exit Application */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Card 
                    className="cursor-pointer border-2 border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-red-400/40 transition-all"
                    onClick={onExit}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center shadow-lg">
                          <ExitIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-white">Exit App</h3>
                          <p className="text-xs text-blue-100">
                            Sign out and close the application
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Cancel */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    variant="outline"
                    className="w-full border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white/50"
                    onClick={onCancel}
                  >
                    Stay Logged In
                  </Button>
                </motion.div>
              </div>

              {/* Footer Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
              >
                <p className="text-xs text-center text-blue-100 flex items-center justify-center gap-2">
                  <Star className="w-3 h-3 text-yellow-300" />
                  Your progress has been saved
                  <Star className="w-3 h-3 text-yellow-300" />
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
