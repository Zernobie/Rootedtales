import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Gift, 
  Trophy, 
  Star, 
  Flame, 
  Calendar,
  Sparkles,
  Award,
  CheckCircle2,
  Crown,
  Zap,
  Heart,
  Target
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DailyRewardProps {
  user: any;
  setUser: (user: any) => void;
  onClose: () => void;
}

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  requirement: string;
  unlocked: boolean;
  category: 'login' | 'reading' | 'games' | 'collection' | 'special';
}

export function DailyReward({ user, setUser, onClose }: DailyRewardProps) {
  const [showReward, setShowReward] = useState(true);
  const [newBadges, setNewBadges] = useState<BadgeData[]>([]);
  const [streakBonus, setStreakBonus] = useState(0);
  const [dailyPoints, setDailyPoints] = useState(0);

  // Daily rewards by streak day
  const dailyRewards = [
    { day: 1, points: 10, description: 'Welcome back!' },
    { day: 2, points: 15, description: 'Keep it up!' },
    { day: 3, points: 20, description: 'Three in a row!' },
    { day: 4, points: 25, description: 'Consistency is key!' },
    { day: 5, points: 30, description: 'Five days strong!' },
    { day: 6, points: 40, description: 'Almost a week!' },
    { day: 7, points: 50, description: 'Weekly warrior!' }
  ];

  // Badge definitions
  const allBadges: BadgeData[] = [
    {
      id: 'first-login',
      name: 'First Steps',
      description: 'Logged in for the first time',
      icon: Sparkles,
      color: 'from-blue-400 to-blue-600',
      requirement: 'Login once',
      unlocked: false,
      category: 'login'
    },
    {
      id: 'streak-3',
      name: 'Dedicated Reader',
      description: 'Maintained a 3-day login streak',
      icon: Flame,
      color: 'from-orange-400 to-red-500',
      requirement: '3-day streak',
      unlocked: false,
      category: 'login'
    },
    {
      id: 'streak-7',
      name: 'Weekly Champion',
      description: 'Maintained a 7-day login streak',
      icon: Trophy,
      color: 'from-yellow-400 to-orange-500',
      requirement: '7-day streak',
      unlocked: false,
      category: 'login'
    },
    {
      id: 'streak-30',
      name: 'Monthly Master',
      description: 'Maintained a 30-day login streak',
      icon: Crown,
      color: 'from-purple-400 to-pink-500',
      requirement: '30-day streak',
      unlocked: false,
      category: 'login'
    },
    {
      id: 'books-5',
      name: 'Book Collector',
      description: 'Completed 5 books',
      icon: Award,
      color: 'from-green-400 to-emerald-500',
      requirement: 'Complete 5 books',
      unlocked: false,
      category: 'reading'
    },
    {
      id: 'books-10',
      name: 'Library Expert',
      description: 'Completed 10 books',
      icon: Star,
      color: 'from-yellow-500 to-amber-600',
      requirement: 'Complete 10 books',
      unlocked: false,
      category: 'reading'
    },
    {
      id: 'games-10',
      name: 'Game Master',
      description: 'Played 10 mini games',
      icon: Target,
      color: 'from-indigo-400 to-purple-500',
      requirement: 'Play 10 games',
      unlocked: false,
      category: 'games'
    },
    {
      id: 'points-100',
      name: 'Point Collector',
      description: 'Earned 100 game points',
      icon: Zap,
      color: 'from-cyan-400 to-blue-500',
      requirement: 'Earn 100 points',
      unlocked: false,
      category: 'games'
    },
    {
      id: 'all-characters',
      name: 'Character Expert',
      description: 'Unlocked all character bios',
      icon: Heart,
      color: 'from-pink-400 to-rose-500',
      requirement: 'View all characters',
      unlocked: false,
      category: 'collection'
    }
  ];

  useEffect(() => {
    if (user) {
      checkAndAwardDailyReward();
    }
  }, []);

  const checkAndAwardDailyReward = () => {
    const today = new Date().toDateString();
    const lastLogin = user.lastLoginDate;
    const currentStreak = user.loginStreak || 0;

    // Check if user already claimed today's reward
    if (lastLogin === today) {
      setShowReward(false);
      return;
    }

    // Calculate new streak
    let newStreak = 1;
    if (lastLogin) {
      const lastDate = new Date(lastLogin);
      const todayDate = new Date(today);
      const diffTime = todayDate.getTime() - lastDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day
        newStreak = currentStreak + 1;
      } else if (diffDays > 1) {
        // Streak broken
        newStreak = 1;
      }
    }

    // Get reward for current day (cycle through 7 days)
    const rewardDay = ((newStreak - 1) % 7) + 1;
    const reward = dailyRewards[rewardDay - 1];
    
    setDailyPoints(reward.points);
    setStreakBonus(newStreak >= 7 ? Math.floor(newStreak / 7) * 10 : 0);

    // Check for new badges
    const earnedBadges = checkBadgeUnlocks(newStreak);
    setNewBadges(earnedBadges);

    // Update user data
    const totalPoints = reward.points + streakBonus;
    const updatedUser = {
      ...user,
      lastLoginDate: today,
      loginStreak: newStreak,
      totalLogins: (user.totalLogins || 0) + 1,
      gamePoints: (user.gamePoints || 0) + totalPoints,
      achievements: {
        ...user.achievements,
        unlockedBadges: [
          ...(user.achievements?.unlockedBadges || []),
          ...earnedBadges.map(b => b.id)
        ]
      }
    };

    setUser(updatedUser);
  };

  const checkBadgeUnlocks = (newStreak: number): BadgeData[] => {
    const newlyUnlocked: BadgeData[] = [];
    const unlockedBadges = user.achievements?.unlockedBadges || [];

    // Check login streak badges
    if (newStreak === 1 && !unlockedBadges.includes('first-login')) {
      newlyUnlocked.push(allBadges.find(b => b.id === 'first-login')!);
    }
    if (newStreak >= 3 && !unlockedBadges.includes('streak-3')) {
      newlyUnlocked.push(allBadges.find(b => b.id === 'streak-3')!);
    }
    if (newStreak >= 7 && !unlockedBadges.includes('streak-7')) {
      newlyUnlocked.push(allBadges.find(b => b.id === 'streak-7')!);
    }
    if (newStreak >= 30 && !unlockedBadges.includes('streak-30')) {
      newlyUnlocked.push(allBadges.find(b => b.id === 'streak-30')!);
    }

    // Check reading badges
    const booksCompleted = user.achievements?.booksCompleted || 0;
    if (booksCompleted >= 5 && !unlockedBadges.includes('books-5')) {
      newlyUnlocked.push(allBadges.find(b => b.id === 'books-5')!);
    }
    if (booksCompleted >= 10 && !unlockedBadges.includes('books-10')) {
      newlyUnlocked.push(allBadges.find(b => b.id === 'books-10')!);
    }

    // Check game badges
    const gamesPlayed = user.achievements?.miniGamesPlayed || 0;
    const gamePoints = user.gamePoints || 0;
    if (gamesPlayed >= 10 && !unlockedBadges.includes('games-10')) {
      newlyUnlocked.push(allBadges.find(b => b.id === 'games-10')!);
    }
    if (gamePoints >= 100 && !unlockedBadges.includes('points-100')) {
      newlyUnlocked.push(allBadges.find(b => b.id === 'points-100')!);
    }

    return newlyUnlocked.filter(b => b !== undefined);
  };

  const handleClaim = () => {
    if (newBadges.length > 0) {
      toast.success(`🎉 You earned ${newBadges.length} new badge${newBadges.length > 1 ? 's' : ''}!`);
    }
    setShowReward(false);
    setTimeout(onClose, 300);
  };

  const currentStreak = user?.loginStreak || 1;
  const rewardDay = ((currentStreak - 1) % 7) + 1;

  return (
    <Dialog open={showReward} onOpenChange={handleClaim}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl">
            <Gift className="w-6 h-6 mr-2 text-primary" />
            Daily Reward!
          </DialogTitle>
          <DialogDescription className="text-center">
            Welcome back to Rooted Tales!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Streak Counter */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Flame className="w-8 h-8 text-orange-500 mr-2" />
                  <span className="text-3xl font-bold text-orange-600">
                    {currentStreak}
                  </span>
                </div>
                <p className="text-sm font-medium text-orange-800">
                  Day Streak
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Keep logging in to maintain your streak!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Daily Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Weekly Progress</span>
              <span className="font-medium">{rewardDay}/7 days</span>
            </div>
            <Progress value={(rewardDay / 7) * 100} className="h-3" />
          </div>

          {/* Rewards */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mr-3">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-yellow-900">Daily Points</p>
                        <p className="text-xs text-yellow-700">
                          {dailyRewards[rewardDay - 1]?.description}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500 text-white text-lg px-3 py-1">
                      +{dailyPoints}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {streakBonus > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center mr-3">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-purple-900">Streak Bonus!</p>
                          <p className="text-xs text-purple-700">
                            Extra reward for dedication
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-purple-500 text-white text-lg px-3 py-1">
                        +{streakBonus}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* New Badges */}
          <AnimatePresence>
            {newBadges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-center mb-2">
                  <Sparkles className="w-5 h-5 text-primary mr-2" />
                  <h3 className="font-bold">New Badges Unlocked!</h3>
                </div>
                {newBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Card className={`bg-gradient-to-br ${badge.color} border-2 border-white shadow-lg`}>
                        <CardContent className="p-3">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center mr-3">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-white">{badge.name}</p>
                              <p className="text-xs text-white/90">{badge.description}</p>
                            </div>
                            <CheckCircle2 className="w-6 h-6 text-white ml-auto" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Claim Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={handleClaim}
              className="w-full py-6 text-lg font-bold"
              size="lg"
            >
              <Gift className="w-5 h-5 mr-2" />
              Claim Rewards
            </Button>
          </motion.div>

          {/* Next Milestone */}
          <div className="text-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 inline mr-1" />
            Come back tomorrow for day {currentStreak + 1}!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
