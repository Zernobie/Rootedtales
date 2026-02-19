import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Trophy,
  Star,
  Sparkles,
  Crown,
  Medal,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  Gamepad2
} from 'lucide-react';

interface GameCompletionPopupProps {
  show: boolean;
  score: number;
  totalGamesWon: number;
  newBadge?: {
    id: string;
    name: string;
    description: string;
    icon: any;
    color: string;
    requirement: string;
  } | null;
  onContinue: () => void;
}

export function GameCompletionPopup({
  show,
  score,
  totalGamesWon,
  newBadge,
  onContinue
}: GameCompletionPopupProps) {
  // Badge milestones
  const badgeMilestones = [
    { count: 5, name: 'Game Starter' },
    { count: 10, name: 'Skill Sharer' },
    { count: 25, name: 'Challenge Champion' },
    { count: 50, name: 'Arcade Ace' },
    { count: 100, name: '🎮 Sunset Master' }
  ];

  // Find next badge milestone
  const nextMilestone = badgeMilestones.find(m => m.count > totalGamesWon);
  const previousMilestone = badgeMilestones.reverse().find(m => m.count <= totalGamesWon);
  
  const progressToNext = nextMilestone 
    ? ((totalGamesWon - (previousMilestone?.count || 0)) / (nextMilestone.count - (previousMilestone?.count || 0))) * 100
    : 100;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={onContinue}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="relative overflow-hidden border-4 border-yellow-500/50 shadow-2xl bg-gradient-to-br from-white via-yellow-50 to-orange-50">
              {/* Animated Background Sparkles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      repeatDelay: 1
                    }}
                    className="absolute"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                ))}
              </div>

              <CardContent className="p-8 relative z-10">
                {/* Trophy Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                  className="flex justify-center mb-4"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
                    >
                      <Trophy className="w-14 h-14 text-white drop-shadow-lg" />
                    </motion.div>
                    
                    {/* Pulsing Glow */}
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-yellow-400 rounded-full blur-xl -z-10"
                    />
                  </div>
                </motion.div>

                {/* Congratulations Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-6"
                >
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    Victory!
                  </h2>
                  <p className="text-gray-700 text-sm">
                    Game completed successfully! 🎉
                  </p>
                </motion.div>

                {/* Score Display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/40 rounded-2xl p-6 mb-6"
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Points Earned</p>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.5 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Star className="w-8 h-8 text-yellow-500" />
                      <span className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                        +{score}
                      </span>
                      <Star className="w-8 h-8 text-yellow-500" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Badge Progress */}
                {!newBadge && nextMilestone && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/80 rounded-xl p-4 mb-6 border-2 border-purple-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="w-5 h-5 text-purple-600" />
                        <p className="text-sm font-semibold text-gray-800">Badge Progress</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                        {totalGamesWon} / {nextMilestone.count}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress value={progressToNext} className="h-3 bg-gray-200" />
                      <p className="text-xs text-gray-600 text-center">
                        {nextMilestone.count - totalGamesWon} more {nextMilestone.count - totalGamesWon === 1 ? 'win' : 'wins'} to unlock <span className="font-bold text-purple-600">{nextMilestone.name}</span>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* NEW BADGE UNLOCKED */}
                {newBadge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.6 }}
                    className="mb-6"
                  >
                    <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-6 shadow-2xl overflow-hidden">
                      {/* Animated Glow */}
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                      
                      <div className="relative z-10">
                        {/* Badge Unlocked Header */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-center mb-4"
                        >
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                            <p className="text-white font-bold text-lg uppercase tracking-wider">
                              New Badge Unlocked!
                            </p>
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                          </div>
                        </motion.div>

                        {/* Badge Display */}
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 border-2 border-white/40">
                          <div className="flex items-center gap-4">
                            {/* Badge Icon */}
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${newBadge.color} shadow-2xl flex-shrink-0`}
                            >
                              {React.createElement(newBadge.icon, { className: "w-10 h-10 text-white" })}
                            </motion.div>
                            
                            {/* Badge Info */}
                            <div className="flex-1">
                              <h3 className="text-white font-bold text-xl mb-1">
                                {newBadge.name}
                              </h3>
                              <p className="text-white/90 text-sm mb-2">
                                {newBadge.description}
                              </p>
                              <div className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4 text-green-300" />
                                <p className="text-white/80 text-xs font-medium">
                                  {newBadge.requirement}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Continue Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: newBadge ? 0.9 : 0.7 }}
                >
                  <Button
                    onClick={onContinue}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg h-14 shadow-lg"
                  >
                    <span>Continue Playing</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>

                {/* Subtle hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-xs text-gray-500 mt-3"
                >
                  Tap anywhere to continue
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
