import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Award,
  Trophy, 
  Star, 
  Flame, 
  Sparkles,
  Crown,
  Heart,
  Target,
  Lock,
  CheckCircle2,
  TrendingUp,
  Trees,
  Sunset,
  Waves,
  Moon,
  Sprout,
  TreeDeciduous,
  TreePine,
  BookOpen,
  Book,
  BookMarked,
  Library,
  Gamepad2,
  Medal,
  Users,
  Palette,
  Hexagon,
  ChevronRight,
  Gift,
  Zap,
  Filter,
  Grid,
  List,
  Search,
  X
} from 'lucide-react';

interface BadgeCollectionProps {
  user: any;
  theme?: 'forest' | 'ocean' | 'night' | 'sunset';
}

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: any;
  imageUrl?: string;  // NEW: Supabase badge image URL
  color: string;
  requirement: string;
  category: 'login' | 'reading' | 'games' | 'collection' | 'special';
  unlocked: boolean;
  isMasterBadge?: boolean;
  progressPath?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'master';
}

export function BadgeCollection({ user, theme }: BadgeCollectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Helper functions
  const getStreak = () => user?.loginStreak || 0;
  const getBooksCompleted = () => user?.achievements?.booksCompleted || 0;
  const getGamesWon = () => user?.achievements?.gamesWon || 0;
  const getCharactersUnlocked = () => user?.achievements?.charactersUnlocked || 0;
  const getThemesCompleted = () => user?.achievements?.themesCompleted || 0;

  const allBadges: BadgeData[] = [
    // 🌲 FOREST MASTER BADGE - Streak-Based
    {
      id: 'seedling',
      name: 'Seedling',
      description: 'Started your reading journey',
      icon: Sprout,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Seedling%20Badge.png',
      color: 'from-green-300 to-green-400',
      requirement: '3-day streak',
      category: 'login',
      unlocked: getStreak() >= 3,
      progressPath: 'forest-master',
      rarity: 'common'
    },
    {
      id: 'sapling',
      name: 'Sapling',
      description: 'Growing stronger every day',
      icon: TreeDeciduous,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Sapling%20Badge.png',
      color: 'from-green-400 to-green-500',
      requirement: '7-day streak',
      category: 'login',
      unlocked: getStreak() >= 7,
      progressPath: 'forest-master',
      rarity: 'common'
    },
    {
      id: 'growing-tree',
      name: 'Growing Tree',
      description: 'Your dedication is flourishing',
      icon: Trees,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Growing%20Tree%20Badge.png',
      color: 'from-green-500 to-emerald-500',
      requirement: '14-day streak',
      category: 'login',
      unlocked: getStreak() >= 14,
      progressPath: 'forest-master',
      rarity: 'rare'
    },
    {
      id: 'mighty-oak',
      name: 'Mighty Oak',
      description: 'Standing tall and strong',
      icon: TreePine,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Might%20Oak%20Badge.png',
      color: 'from-emerald-500 to-emerald-600',
      requirement: '30-day streak',
      category: 'login',
      unlocked: getStreak() >= 30,
      progressPath: 'forest-master',
      rarity: 'epic'
    },
    {
      id: 'forest-master',
      name: '🌲 Forest Master',
      description: 'Legendary consistency and dedication',
      icon: Crown,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Forest%20Master%20Badge.png',
      color: 'from-emerald-600 via-green-600 to-lime-500',
      requirement: '100-day streak',
      category: 'login',
      unlocked: getStreak() >= 100,
      isMasterBadge: true,
      rarity: 'master'
    },

    // 📚 OCEAN MASTER BADGE - Reading Milestones
    {
      id: 'page-turner',
      name: 'Page Turner',
      description: 'Completed your first book',
      icon: BookOpen,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Page%20Turner%20Badge.png',
      color: 'from-blue-300 to-blue-400',
      requirement: 'Finish 1 book',
      category: 'reading',
      unlocked: getBooksCompleted() >= 1,
      progressPath: 'ocean-master',
      rarity: 'common'
    },
    {
      id: 'bookworm',
      name: 'Bookworm',
      description: 'Your reading habit is growing',
      icon: Book,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Book%20Worm%20Badge.png',
      color: 'from-blue-400 to-blue-500',
      requirement: 'Finish 5 books',
      category: 'reading',
      unlocked: getBooksCompleted() >= 5,
      progressPath: 'ocean-master',
      rarity: 'common'
    },
    {
      id: 'chapter-chaser',
      name: 'Chapter Chaser',
      description: 'Racing through stories',
      icon: BookMarked,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Chapter%20Chaser%20Badge.png',
      color: 'from-blue-500 to-cyan-500',
      requirement: 'Finish 15 books',
      category: 'reading',
      unlocked: getBooksCompleted() >= 15,
      progressPath: 'ocean-master',
      rarity: 'rare'
    },
    {
      id: 'literary-voyager',
      name: 'Literary Voyager',
      description: 'Exploring vast story oceans',
      icon: Library,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Literary%20Voyageur%20Badge.png',
      color: 'from-cyan-500 to-cyan-600',
      requirement: 'Finish 30 books',
      category: 'reading',
      unlocked: getBooksCompleted() >= 30,
      progressPath: 'ocean-master',
      rarity: 'epic'
    },
    {
      id: 'ocean-master',
      name: '📚 Ocean Master',
      description: 'Master of the literary seas',
      icon: Crown,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Ocean%20Master%20Badge.png',
      color: 'from-cyan-600 via-blue-600 to-indigo-500',
      requirement: 'Finish 50 books',
      category: 'reading',
      unlocked: getBooksCompleted() >= 50,
      isMasterBadge: true,
      rarity: 'master'
    },

    // 🎮 SUNSET MASTER BADGE - Mini-Games
    {
      id: 'game-starter',
      name: 'Game Starter',
      description: 'Discovered the fun of games',
      icon: Gamepad2,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Game%20Starter%20Badge.png',
      color: 'from-orange-300 to-orange-400',
      requirement: 'Play any game 5 times',
      category: 'games',
      unlocked: getGamesWon() >= 5,
      progressPath: 'sunset-master',
      rarity: 'common'
    },
    {
      id: 'skill-sharer',
      name: 'Skill Sharer',
      description: 'Developing game mastery',
      icon: Target,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Skill%20Master%20Badge.png',
      color: 'from-orange-400 to-orange-500',
      requirement: 'Win 10 mini-games',
      category: 'games',
      unlocked: getGamesWon() >= 10,
      progressPath: 'sunset-master',
      rarity: 'common'
    },
    {
      id: 'challenge-champion',
      name: 'Challenge Champion',
      description: 'Rising to every challenge',
      icon: Medal,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Challenge%20Champion%20Badge.png',
      color: 'from-orange-500 to-red-500',
      requirement: 'Win 25 mini-games',
      category: 'games',
      unlocked: getGamesWon() >= 25,
      progressPath: 'sunset-master',
      rarity: 'rare'
    },
    {
      id: 'arcade-ace',
      name: 'Arcade Ace',
      description: 'Dominating the game arena',
      icon: Trophy,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Arcade%20Ace%20Badge.png',
      color: 'from-red-500 to-pink-500',
      requirement: 'Win 50 mini-games',
      category: 'games',
      unlocked: getGamesWon() >= 50,
      progressPath: 'sunset-master',
      rarity: 'epic'
    },
    {
      id: 'sunset-master',
      name: '🎮 Sunset Master',
      description: 'Legendary game champion',
      icon: Crown,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Sunset%20Master%20Badge.png',
      color: 'from-pink-500 via-orange-500 to-yellow-500',
      requirement: 'Win 100 mini-games',
      category: 'games',
      unlocked: getGamesWon() >= 100,
      isMasterBadge: true,
      rarity: 'master'
    },

    // 💎 STARRY NIGHT MASTER BADGE - Character Collection
    {
      id: 'character-collector',
      name: 'Character Collector',
      description: 'Meeting new friends',
      icon: Users,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Character%20Collector%20Badge.png',
      color: 'from-indigo-300 to-indigo-400',
      requirement: 'Unlock 2 characters',
      category: 'collection',
      unlocked: getCharactersUnlocked() >= 2,
      progressPath: 'starry-night-master',
      rarity: 'common'
    },
    {
      id: 'castle-explorer',
      name: 'Castle Explorer',
      description: 'Discovering hidden characters',
      icon: Heart,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Castle%20Explorer%20Badge.png',
      color: 'from-indigo-400 to-purple-400',
      requirement: 'Unlock 5 characters',
      category: 'collection',
      unlocked: getCharactersUnlocked() >= 5,
      progressPath: 'starry-night-master',
      rarity: 'common'
    },
    {
      id: 'hero-gatherer',
      name: 'Hero Gatherer',
      description: 'Building an amazing team',
      icon: Star,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Hero%20Gatherer%20Badge.png',
      color: 'from-purple-400 to-purple-500',
      requirement: 'Unlock 10 characters',
      category: 'collection',
      unlocked: getCharactersUnlocked() >= 10,
      progressPath: 'starry-night-master',
      rarity: 'rare'
    },
    {
      id: 'legendary-keeper',
      name: 'Legendary Keeper',
      description: 'Guardian of rare characters',
      icon: Sparkles,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Legendary%20Keeper%20Badge.png',
      color: 'from-purple-500 to-pink-500',
      requirement: 'Unlock 15 characters',
      category: 'collection',
      unlocked: getCharactersUnlocked() >= 15,
      progressPath: 'starry-night-master',
      rarity: 'epic'
    },
    {
      id: 'starry-night-master',
      name: '💎 Starry Night Master',
      description: 'Master of all characters',
      icon: Crown,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Starry%20Night%20Master%20Badge.png',
      color: 'from-indigo-600 via-purple-600 to-pink-600',
      requirement: 'Unlock all characters',
      category: 'collection',
      unlocked: getCharactersUnlocked() >= 20,
      isMasterBadge: true,
      rarity: 'master'
    },

    // 💠 MASTER OF THEMES BADGE - Theme Completion
    {
      id: 'theme-beginner',
      name: 'Theme Beginner',
      description: 'Started your theme journey',
      icon: Palette,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Theme%20Beginner%20Badge.png',
      color: 'from-purple-300 to-purple-400',
      requirement: 'Complete 1 theme',
      category: 'special',
      unlocked: getThemesCompleted() >= 1,
      progressPath: 'master-of-themes',
      rarity: 'common'
    },
    {
      id: 'theme-explorer',
      name: 'Theme Explorer',
      description: 'Exploring multiple worlds',
      icon: Waves,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Theme%20Explorer%20Badge.png',
      color: 'from-purple-400 to-fuchsia-400',
      requirement: 'Complete 3 themes',
      category: 'special',
      unlocked: getThemesCompleted() >= 3,
      progressPath: 'master-of-themes',
      rarity: 'common'
    },
    {
      id: 'theme-specialist',
      name: 'Theme Specialist',
      description: 'Mastering diverse themes',
      icon: Sunset,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Theme%20Specialist%20Badge.png',
      color: 'from-fuchsia-400 to-pink-500',
      requirement: 'Complete 5 themes',
      category: 'special',
      unlocked: getThemesCompleted() >= 5,
      progressPath: 'master-of-themes',
      rarity: 'rare'
    },
    {
      id: 'theme-champion',
      name: 'Theme Champion',
      description: 'Nearly conquered all themes',
      icon: Moon,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Theme%20Champion%20Badge.png',
      color: 'from-pink-500 to-rose-500',
      requirement: 'Complete 7 themes',
      category: 'special',
      unlocked: getThemesCompleted() >= 7,
      progressPath: 'master-of-themes',
      rarity: 'epic'
    },
    {
      id: 'master-of-themes',
      name: '💠 Master of Themes',
      description: 'Ultimate theme completion',
      icon: Crown,
      imageUrl: 'https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/badges/Master%20of%20Themes%20Badge.png',
      color: 'from-rose-500 via-fuchsia-500 to-purple-600',
      requirement: 'Complete all themes',
      category: 'special',
      unlocked: getThemesCompleted() >= 10,
      isMasterBadge: true,
      rarity: 'master'
    },
  ];

  // Apply all filters
  let filteredBadges = allBadges;

  // Category filter
  if (selectedCategory !== 'all') {
    filteredBadges = filteredBadges.filter(b => b.category === selectedCategory);
  }

  // Unlocked filter
  if (showUnlockedOnly) {
    filteredBadges = filteredBadges.filter(b => b.unlocked);
  }

  // Search filter
  if (searchQuery.trim()) {
    filteredBadges = filteredBadges.filter(b => 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.requirement.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const unlockedCount = allBadges.filter(b => b.unlocked).length;
  const totalCount = allBadges.length;
  const progressPercentage = (unlockedCount / totalCount) * 100;

  const masterBadgesUnlocked = allBadges.filter(b => b.isMasterBadge && b.unlocked).length;
  const totalMasterBadges = allBadges.filter(b => b.isMasterBadge).length;

  const categories = [
    { id: 'all', label: 'All', icon: Award, color: 'from-gray-500 to-gray-600' },
    { id: 'login', label: 'Login', icon: Flame, color: 'from-green-500 to-emerald-600' },
    { id: 'reading', label: 'Reading', icon: BookOpen, color: 'from-blue-500 to-cyan-600' },
    { id: 'games', label: 'Games', icon: Gamepad2, color: 'from-orange-500 to-pink-600' },
    { id: 'collection', label: 'Pack', icon: Heart, color: 'from-purple-500 to-pink-600' },
    { id: 'special', label: 'Rare', icon: Sparkles, color: 'from-fuchsia-500 to-purple-600' }
  ];

  const getRarityBadge = (rarity?: string) => {
    const rarityStyles = {
      common: 'bg-gray-500/20 text-gray-700 border-gray-400',
      rare: 'bg-blue-500/20 text-blue-700 border-blue-400',
      epic: 'bg-purple-500/20 text-purple-700 border-purple-400',
      legendary: 'bg-yellow-500/20 text-yellow-700 border-yellow-400',
      master: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-400 shadow-lg'
    };
    
    return rarityStyles[rarity as keyof typeof rarityStyles] || rarityStyles.common;
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-background via-background to-primary/5">
      <div className="p-6 space-y-6 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-3xl -z-10" />
          <div className="flex items-center justify-center mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Trophy className="w-10 h-10 text-yellow-500 mr-3" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Badge Collection
            </h1>
          </div>
          <p className="text-gray-700">
            Unlock amazing badges by completing achievements
          </p>
        </motion.div>

        {/* Progress Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-white via-white to-primary/5 border-2 border-primary/20 shadow-xl overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <p className="text-xs text-gray-600 mb-1">Total Progress</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {unlockedCount}<span className="text-lg text-gray-600">/{totalCount}</span>
                  </p>
                  <p className="text-[10px] text-gray-600 mt-1">Badges Collected</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                  <p className="text-xs text-gray-600 mb-1">Master Badges</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    {masterBadgesUnlocked}<span className="text-lg text-gray-600">/{totalMasterBadges}</span>
                  </p>
                  <p className="text-[10px] text-gray-600 mt-1">Legendary Status</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-black">Collection Status</span>
                  <span className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="relative">
                  <Progress value={progressPercentage} className="h-4 bg-gray-200" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: [-100, 400] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{totalCount - unlockedCount} remaining</span>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span className="font-medium">Keep collecting!</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search badges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-primary/20 bg-white text-black placeholder-gray-500 focus:border-primary/40 focus:outline-none transition-all shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Dropdown & Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground px-1 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter by Category
            </h3>
            <Badge variant="secondary" className="text-[10px]">
              {filteredBadges.length} {filteredBadges.length === 1 ? 'badge' : 'badges'}
            </Badge>
          </div>
          
          {/* Glassmorphic Dropdown Interface */}
          <div className="relative">
            {/* Dropdown Trigger Button */}
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-gradient-to-br from-white/80 via-white/90 to-white/80 dark:from-gray-800/80 dark:via-gray-800/90 dark:to-gray-800/80 backdrop-blur-lg rounded-2xl p-4 border-2 border-primary/20 shadow-xl overflow-hidden transition-all"
            >
              <div className="relative">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />

                {/* Selected Category Display */}
                {(() => {
                  const selectedCat = categories.find(c => c.id === selectedCategory);
                  if (!selectedCat) return null;
                  
                  const Icon = selectedCat.icon;
                  const categoryBadges = selectedCat.id === 'all' 
                    ? allBadges 
                    : allBadges.filter(b => b.category === selectedCat.id);
                  const unlockedInCategory = categoryBadges.filter(b => b.unlocked).length;
                  const isCompleted = unlockedInCategory === categoryBadges.length && categoryBadges.length > 0;

                  return (
                    <div className="relative flex items-center gap-4">
                      {/* Icon with gradient background */}
                      <div className="relative">
                        <motion.div
                          className={`p-3 rounded-xl bg-gradient-to-br ${selectedCat.color} shadow-lg relative`}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                          
                          {/* Completion checkmark */}
                          {isCompleted && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white shadow-lg"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}
                        </motion.div>

                        {/* Sparkle effect */}
                        <motion.div
                          className="absolute -top-1 -right-1"
                          animate={{
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                        </motion.div>
                      </div>

                      {/* Category Info */}
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-foreground">
                            {selectedCat.label}
                          </span>
                          <div className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/20 text-primary">
                            {unlockedInCategory}/{categoryBadges.length}
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${selectedCat.color}`}
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${(unlockedInCategory / categoryBadges.length) * 100}%` 
                            }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                      </div>

                      {/* Dropdown indicator */}
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-5 h-5 text-muted-foreground rotate-90" />
                      </motion.div>
                    </div>
                  );
                })()}
              </div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-white/95 via-white to-white/95 dark:from-gray-800/95 dark:via-gray-800 dark:to-gray-800/95 backdrop-blur-xl rounded-2xl border-2 border-primary/20 shadow-2xl overflow-hidden z-50"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  />

                  <div className="relative max-h-[400px] overflow-y-auto p-2">
                    {categories.map((cat, index) => {
                      const Icon = cat.icon;
                      const categoryBadges = cat.id === 'all' 
                        ? allBadges 
                        : allBadges.filter(b => b.category === cat.id);
                      const unlockedInCategory = categoryBadges.filter(b => b.unlocked).length;
                      const isSelected = selectedCategory === cat.id;
                      const isCompleted = unlockedInCategory === categoryBadges.length && categoryBadges.length > 0;

                      return (
                        <motion.button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setIsDropdownOpen(false);
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full mb-2 p-3 rounded-xl transition-all duration-200 ${
                            isSelected
                              ? 'bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-700 shadow-lg border-2 border-primary/40'
                              : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-700/80 border-2 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Icon */}
                            <div className="relative flex-shrink-0">
                              <motion.div
                                className={`p-2.5 rounded-lg bg-gradient-to-br ${cat.color} shadow-md relative`}
                                animate={isSelected ? {
                                  scale: [1, 1.1, 1],
                                } : {}}
                                transition={{
                                  duration: 2,
                                  repeat: isSelected ? Infinity : 0,
                                  repeatDelay: 1,
                                }}
                              >
                                <Icon className="w-5 h-5 text-white" />
                                
                                {/* Completion checkmark */}
                                {isCompleted && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white shadow-lg"
                                  >
                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                  </motion.div>
                                )}
                              </motion.div>

                              {/* Sparkle for selected */}
                              {isSelected && (
                                <motion.div
                                  className="absolute -top-1 -right-1"
                                  animate={{
                                    scale: [0, 1, 0],
                                    rotate: [0, 180, 360],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                  }}
                                >
                                  <Sparkles className="w-3 h-3 text-yellow-500" />
                                </motion.div>
                              )}
                            </div>

                            {/* Category Info */}
                            <div className="flex-1 text-left min-w-0">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={`text-sm font-bold transition-colors truncate ${
                                  isSelected ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                  {cat.label}
                                </span>
                                <div className={`px-2 py-0.5 rounded-full text-[9px] font-semibold flex-shrink-0 ${
                                  isSelected
                                    ? 'bg-primary/20 text-primary'
                                    : 'bg-gray-200 dark:bg-gray-700 text-muted-foreground'
                                }`}>
                                  {unlockedInCategory}/{categoryBadges.length}
                                </div>
                              </div>

                              {/* Progress bar */}
                              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full bg-gradient-to-r ${cat.color}`}
                                  initial={{ width: 0 }}
                                  animate={{ 
                                    width: `${(unlockedInCategory / categoryBadges.length) * 100}%` 
                                  }}
                                  transition={{ duration: 0.6, ease: 'easeOut' }}
                                />
                              </div>
                            </div>

                            {/* Selection indicator */}
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="flex-shrink-0"
                              >
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {/* Active glow */}
                          {isSelected && (
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-10 rounded-xl pointer-events-none`}
                              animate={{
                                opacity: [0.1, 0.2, 0.1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View Mode & Filter Buttons */}
          <div className="flex gap-2">
            <motion.button
              onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all shadow-md ${
                showUnlockedOnly
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Unlocked Only</span>
            </motion.button>

            <motion.button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-3 rounded-xl font-medium text-sm transition-all shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700"
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Badge Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${viewMode}-${showUnlockedOnly}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-3'}
          >
            {filteredBadges.map((badge, index) => {
              const Icon = badge.icon;
              
              if (viewMode === 'list') {
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Card className={`relative overflow-hidden transition-all duration-300 ${
                      badge.unlocked 
                        ? 'bg-white dark:bg-gray-800 shadow-md hover:shadow-lg cursor-pointer' 
                        : 'bg-gray-100 dark:bg-gray-900 opacity-60'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`${
                            badge.isMasterBadge ? 'w-16 h-16' : 'w-14 h-14'
                          } rounded-full flex items-center justify-center flex-shrink-0 ${
                            badge.unlocked 
                              ? `bg-gradient-to-br ${badge.color} shadow-lg` 
                              : 'bg-gray-300 dark:bg-gray-700'
                          }`}>
                            {badge.unlocked ? (
                              badge.imageUrl ? (
                                <img 
                                  src={badge.imageUrl} 
                                  alt={badge.name}
                                  className={`${badge.isMasterBadge ? 'w-8 h-8' : 'w-7 h-7'} object-contain`}
                                />
                              ) : (
                                <Icon className={`${badge.isMasterBadge ? 'w-8 h-8' : 'w-7 h-7'} text-white`} />
                              )
                            ) : (
                              <Lock className="w-6 h-6 text-gray-500" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className={`font-bold text-sm ${badge.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {badge.name}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {badge.description}
                                </p>
                              </div>
                              {badge.unlocked && (
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                              )}
                            </div>
                            <div className="mt-2">
                              <Badge className={`text-[9px] ${getRarityBadge(badge.rarity)}`}>
                                {badge.requirement}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={badge.unlocked ? { scale: 1.05, y: -5 } : {}}
                >
                  <Card 
                    className={`relative overflow-hidden transition-all duration-300 ${
                      badge.unlocked 
                        ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl border-2 cursor-pointer' 
                        : 'bg-gray-100 dark:bg-gray-900 opacity-60 border-gray-300 dark:border-gray-700'
                    } ${
                      badge.isMasterBadge && badge.unlocked
                        ? 'ring-4 ring-yellow-400 ring-offset-2 shadow-2xl' 
                        : badge.unlocked
                        ? 'border-primary/30'
                        : ''
                    }`}
                  >
                    {/* Animated Background */}
                    {badge.unlocked && (
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-10`}
                        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                      />
                    )}
                    
                    {/* Master Badge Crown */}
                    {badge.isMasterBadge && (
                      <div className="absolute top-0 left-0 right-0">
                        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-white text-[9px] font-bold px-2 py-1 text-center shadow-lg">
                          ⭐ MASTER BADGE ⭐
                        </div>
                      </div>
                    )}

                    {/* Rarity Badge */}
                    {!badge.isMasterBadge && badge.rarity && (
                      <div className="absolute top-2 right-2">
                        <Badge className={`text-[8px] px-1.5 py-0.5 border ${getRarityBadge(badge.rarity)}`}>
                          {badge.rarity.toUpperCase()}
                        </Badge>
                      </div>
                    )}
                    
                    <CardContent className={`${badge.isMasterBadge ? 'pt-8' : 'pt-4'} pb-4 px-3 relative`}>
                      <div className="flex flex-col items-center text-center space-y-2">
                        {/* Badge Icon */}
                        <div className="relative">
                          <motion.div 
                            className={`${
                              badge.isMasterBadge ? 'w-20 h-20' : 'w-16 h-16'
                            } rounded-full flex items-center justify-center relative ${
                              badge.unlocked 
                                ? `bg-gradient-to-br ${badge.color} shadow-xl` 
                                : 'bg-gray-300 dark:bg-gray-700'
                            }`}
                            animate={badge.unlocked && badge.isMasterBadge ? { 
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.05, 1]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                          >
                            {badge.unlocked ? (
                              <>
                                {badge.imageUrl ? (
                                  <img 
                                    src={badge.imageUrl} 
                                    alt={badge.name}
                                    className={`${
                                      badge.isMasterBadge ? 'w-10 h-10' : 'w-8 h-8'
                                    } object-contain drop-shadow-lg`}
                                  />
                                ) : (
                                  <Icon className={`${
                                    badge.isMasterBadge ? 'w-10 h-10' : 'w-8 h-8'
                                  } text-white drop-shadow-lg`} />
                                )}
                                
                                {/* Sparkle effect */}
                                {badge.isMasterBadge && (
                                  <>
                                    <motion.div
                                      className="absolute -top-1 -right-1"
                                      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      <Sparkles className="w-5 h-5 text-yellow-300" />
                                    </motion.div>
                                    <motion.div
                                      className="absolute -bottom-1 -left-1"
                                      animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
                                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                    >
                                      <Sparkles className="w-5 h-5 text-yellow-300" />
                                    </motion.div>
                                  </>
                                )}
                              </>
                            ) : (
                              <Lock className="w-8 h-8 text-gray-500" />
                            )}
                          </motion.div>

                          {/* Checkmark */}
                          {badge.unlocked && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -bottom-1 -right-1"
                            >
                              <div className="bg-green-500 rounded-full p-1 shadow-lg border-2 border-white">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Badge Info */}
                        <div className="space-y-1 min-h-[60px] flex flex-col justify-start">
                          <h3 className={`font-bold leading-tight ${
                            badge.isMasterBadge ? 'text-sm' : 'text-xs'
                          } ${
                            badge.unlocked ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {badge.name}
                          </h3>
                          <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">
                            {badge.description}
                          </p>
                        </div>

                        {/* Requirement */}
                        <div className="w-full pt-1">
                          <div className={`text-[9px] px-2 py-1.5 rounded-lg font-medium ${
                            badge.unlocked 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700' 
                              : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700'
                          }`}>
                            {badge.unlocked ? '✓ ' : '🔒 '}{badge.requirement}
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    {/* Shine effect */}
                    {badge.unlocked && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: [-200, 200] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredBadges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Award className="w-20 h-20 mx-auto text-muted-foreground mb-4 opacity-30" />
            <p className="text-muted-foreground text-lg font-medium">
              No badges found
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your filters or search query
            </p>
            <motion.button
              onClick={() => {
                setSelectedCategory('all');
                setShowUnlockedOnly(false);
                setSearchQuery('');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
            >
              Reset Filters
            </motion.button>
          </motion.div>
        )}

        {/* How to Earn Badges Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/30 shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <Gift className="w-32 h-32 text-primary" />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                How to Earn Badges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs relative">
              {[
                { icon: Flame, color: 'text-green-600', emoji: '🔥', text: 'Login daily to build your streak', detail: '3, 7, 14, 30, 100 days' },
                { icon: BookOpen, color: 'text-blue-600', emoji: '📚', text: 'Complete books to unlock reading badges', detail: '1, 5, 15, 30, 50 books' },
                { icon: Gamepad2, color: 'text-orange-600', emoji: '🎮', text: 'Play mini games to earn game badges', detail: 'Win 5, 10, 25, 50, 100 games' },
                { icon: Users, color: 'text-purple-600', emoji: '💎', text: 'Collect all characters to become an expert', detail: 'Unlock 2, 5, 10, 15, all' },
                { icon: Palette, color: 'text-pink-600', emoji: '🌲', text: 'Complete theme collections for special badges', detail: '1, 3, 5, 7, all themes' },
                { icon: Crown, color: 'text-yellow-600', emoji: '💠', text: 'Unlock all themes to earn the Master badge', detail: 'All 5 Master badges!' }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="mt-0.5">
                      <ItemIcon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground flex items-center gap-1 mb-0.5">
                        <span>{item.emoji}</span>
                        <span className="text-[11px]">{item.text}</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground">{item.detail}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mt-4 p-3 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
              >
                <p className="text-center text-xs font-bold text-yellow-700 dark:text-yellow-400">
                  🏆 Collect all 5 Master badges to become a Rooted Tales Legend! 🏆
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}