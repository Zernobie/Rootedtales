import React from 'react';
import { motion } from 'motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart, Home } from 'lucide-react';
import forestBackground from 'figma:asset/883b416cccd56a33a52ffe0df5a37b13a12e0247.png';
import pandaIcon from 'figma:asset/a9ce756e5db98a19efc80d4d71065a7f255f3242.png';

interface ExitScreenProps {
  onExit: () => void;
  onCancel: () => void;
}

export function ExitScreen({ onExit, onCancel }: ExitScreenProps) {

  return (
    <div 
      className="h-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${forestBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for better visibility */}
      <div className="absolute inset-0 bg-black/40" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6 w-full max-w-sm"
      >
        <Card className="bg-white/90 backdrop-blur-lg border-white/30 shadow-2xl">
          <CardContent className="p-8 text-center space-y-6 bg-[rgba(95,50,181,0.53)]">
            {/* Sleeping Panda Icon with Bouncing Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                y: [0, -20, 0]
              }}
              transition={{ 
                scale: { delay: 0.2, type: "spring", stiffness: 200 },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="flex justify-center"
            >
              <div className="relative">
                <img
                  src={pandaIcon}
                  alt="Sleeping Panda"
                  className="w-20 h-20 object-cover rounded-full shadow-xl border-4 border-white/50"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200/30 to-orange-200/30" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Time to Rest?
              </h1>
              <p className="text-muted-foreground">
                Are you sure you want to leave the magical world of Rooted Tales?
              </p>
            </motion.div>

            {/* Floating hearts animation */}
            <div className="relative h-12 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-lg"
                  style={{
                    left: `${15 + (i * 10)}%`,
                    bottom: 0,
                  }}
                  animate={{
                    y: [0, -45, -90],
                    opacity: [0, 1, 0],
                    scale: [0.3, 1.2, 0.3],
                    rotate: [0, 360, 720],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                >
                  {i % 3 === 0 ? (
                    <span className="text-yellow-300 drop-shadow-lg">🌙</span>
                  ) : (
                    <span className="text-yellow-400 drop-shadow-lg">⭐</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Sweet message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 p-4 rounded-lg border border-amber-200/50"
            >
              <p className="text-sm text-muted-foreground italic">
                "Even the forest creatures need their rest. Sweet dreams! 🌙"
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <Button
                onClick={onExit}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg"
              >
                <span className="mr-2">😴</span>
                Yes, Time to Sleep
              </Button>
              
              <Button
                onClick={onCancel}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10"
              >
                <Home className="w-4 h-4 mr-2" />
                Stay in the Forest
              </Button>
            </motion.div>

            {/* Footer message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xs text-muted-foreground"
            >
              Your reading progress will be saved ✨
            </motion.p>
          </CardContent>
        </Card>

        {/* Floating magical particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
