import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ProfilePictureUpload } from './ProfilePictureUpload';
import { InfoBubble } from './InfoBubble';
import { BackButton } from './BackButton';
import { 
  Camera, 
  BookOpen, 
  Trophy, 
  Star,
  Target,
  Zap,
  Flame,
  Clock,
  TrendingUp,
  Award,
  Crown,
  Edit,
  Trash2,
  ShoppingBag,
  ExternalLink,
  Settings,
  Mail,
  Calendar,
  Gift,
  Sparkles,
  Heart,
  ChevronRight,
  BarChart3,
  CircleDot,
  CheckCircle2,
  User,
  Shield,
  TrendingDown
} from 'lucide-react';
import { User as UserType, Theme } from '../App';
import { toast } from 'sonner';

// Import book cover images
import rustyBookCover from 'figma:asset/188b17bb31b62592504df73220f0b92a4fcb6bdf.png';
import akaiBookCover from 'figma:asset/b5abfe2d983db76755f90003671db021277cd0cb.png';
import oceanOdysseyBookCover from 'figma:asset/35e57f0417a22480ba69edee9761e06a5a1836d1.png';
import curiousRaccoonsCover from 'figma:asset/5d0b398ad9ed28d2fc8dfc91b136d590ad7db509.png';
import quokkaQuestCover from 'figma:asset/92a93c5baf7979b4513517affe07c56b46488257.png';
import seaOtterCover from 'figma:asset/d9ecddc07a2bb0aa28c4d94b406385ea677afdf6.png';

// Import theme avatar images
import forestAvatar from 'figma:asset/7c9fee5a551fa9845ea57aed0c3abb13e0a9e154.png';
import oceanAvatar from 'figma:asset/6d7bc987afcd66fddb7bc12fc5902d6b7cce50d7.png';
import sunsetAvatar from 'figma:asset/0fdaf9af501215846e1f02a497878767ca49cad4.png';
import nightAvatar from 'figma:asset/4c1f0f30b39cbbef4b209a91a537ea15de9953d7.png';

interface EnhancedUserProfileProps {
  user: UserType;
  onUpdateUser: (updates: Partial<UserType>) => void;
  onNavigate?: (screen: any) => void;
}

export function EnhancedUserProfile({ user, onUpdateUser, onNavigate }: EnhancedUserProfileProps) {
  const [showProfileUpload, setShowProfileUpload] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user.username);

  // Calculate user level based on reading activity
  const calculateLevel = () => {
    const { booksCompleted, readingVictories, miniGamesPlayed } = user.achievements;
    const totalPoints = (booksCompleted * 100) + (readingVictories * 50) + (miniGamesPlayed * 25) + user.gamePoints;
    const level = Math.floor(totalPoints / 500) + 1;
    const progress = (totalPoints % 500) / 500 * 100;
    return { level, progress, totalPoints };
  };

  const { level, progress, totalPoints } = calculateLevel();

  // All available books
  const allBooks = [
    { id: '1', title: 'The Adventures of Rusty the Red Panda', cover: rustyBookCover, price: 4.99 },
    { id: '2', title: 'Akai the Red Panda: A Heart-warming Panda Reunion', cover: akaiBookCover, price: 4.99 },
    { id: '3', title: 'Akai and Kaito in the Great Ocean Odyssey', cover: oceanOdysseyBookCover, price: 4.99 },
    { id: '4', title: 'Akai the Red Panda and The Curious Raccoons', cover: curiousRaccoonsCover, price: 4.99 },
    { id: '5', title: 'Akai and The Quokka Quest', cover: quokkaQuestCover, price: 4.99 },
    { id: '6', title: 'Sea Otter Adventures', cover: seaOtterCover, price: 4.99 }
  ];

  // Filter purchased books
  const purchasedBooks = allBooks.filter(book => 
    user.purchasedBooks?.includes(book.id)
  );

  // Get theme-specific avatar
  const getThemeAvatar = () => {
    const avatarMap = {
      forest: forestAvatar,
      ocean: oceanAvatar,
      sunset: sunsetAvatar,
      night: nightAvatar
    };
    return user.profilePicture || user.avatar || avatarMap[user.theme];
  };

  const getThemeName = () => {
    const nameMap = {
      forest: 'Forest Visitor',
      ocean: 'Ocean Explorer',
      sunset: 'Sunset Wanderer',
      night: 'Night Dreamer'
    };
    return user.themeTitle || nameMap[user.theme];
  };

  const themeStyles = {
    forest: {
      gradient: 'from-green-500 to-emerald-600',
      glow: 'shadow-green-500/20',
      light: 'from-green-500/10 to-emerald-500/5',
      border: 'border-green-500/20'
    },
    ocean: {
      gradient: 'from-blue-500 to-cyan-600',
      glow: 'shadow-blue-500/20',
      light: 'from-blue-500/10 to-cyan-500/5',
      border: 'border-blue-500/20'
    },
    sunset: {
      gradient: 'from-orange-500 to-pink-600',
      glow: 'shadow-orange-500/20',
      light: 'from-orange-500/10 to-pink-500/5',
      border: 'border-orange-500/20'
    },
    night: {
      gradient: 'from-indigo-500 to-purple-600',
      glow: 'shadow-indigo-500/20',
      light: 'from-indigo-500/10 to-purple-500/5',
      border: 'border-indigo-500/20'
    }
  };

  const currentTheme = themeStyles[user.theme];

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      localStorage.removeItem('rootedTalesUser');
      toast.success('Account deleted successfully');
      window.location.reload();
    } else {
      setShowDeleteConfirm(true);
      toast.error('Tap again to confirm account deletion', {
        description: 'This action cannot be undone',
      });
      setTimeout(() => setShowDeleteConfirm(false), 5000);
    }
  };

  const handleRateApp = () => {
    toast.success('Opening app store...', {
      description: 'Please rate us! ⭐⭐⭐⭐⭐',
    });
    window.open('https://play.google.com/store', '_blank');
  };

  const handleSaveName = () => {
    if (editedName.trim() !== user.username) {
      onUpdateUser({ username: editedName.trim() });
      toast.success('Name updated successfully');
    }
    setIsEditingName(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-primary/10 p-4 overflow-y-auto pb-24">
      {/* Back Button */}
      <BackButton onBack={() => onNavigate?.('home')} />
      
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2 bg-[rgba(255,251,251,0)]">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <User className="w-8 h-8 text-primary mr-2" />
            </motion.div>
            <h1 className="text-2xl font-bold text-[rgb(255,255,255)]">
              My Profile
            </h1>
          </div>
          <p className="text-sm text-[rgb(241,245,251)] text-[rgb(245,249,255)]">
            Your reading journey at a glance
          </p>
        </motion.div>

        {/* Compact Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="bg-gradient-to-br from-white via-white to-primary/5 border-2 border-primary/20 shadow-lg overflow-hidden">
            <div className="p-4">
              {/* Profile Header */}
              <div className="flex items-center gap-3 mb-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <motion.div 
                    className="w-20 h-20 rounded-xl overflow-hidden border-2 border-primary/30 shadow-md bg-white"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={getThemeAvatar()}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.button
                    onClick={() => setShowProfileUpload(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-gradient-to-r ${currentTheme.gradient} text-white shadow-md flex items-center justify-center`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  {isEditingName ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-lg font-bold border-b-2 border-primary bg-transparent focus:outline-none text-black w-full"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSaveName}
                          className={`bg-gradient-to-r ${currentTheme.gradient} h-7 text-xs px-3`}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setIsEditingName(false);
                            setEditedName(user.username);
                          }}
                          className="h-7 text-xs px-3 border border-primary/20"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-bold text-black truncate">{user.username}</h2>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setIsEditingName(true);
                            setEditedName(user.username);
                          }}
                          className="p-1 hover:bg-primary/10 rounded-md transition-colors flex-shrink-0"
                        >
                          <Edit className="w-3.5 h-3.5 text-primary" />
                        </motion.button>
                        {user.isAdmin && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-[10px] px-1.5 py-0.5 h-5">
                            <Crown className="w-2.5 h-2.5 mr-0.5" />
                            Admin
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1.5">
                        <Mail className="w-3 h-3 text-primary" />
                        <p className="truncate">{user.email}</p>
                      </div>
                      <Badge className={`bg-gradient-to-r ${currentTheme.gradient} text-white border-0 text-[10px] px-2 py-0.5 h-5`}>
                        {getThemeName()}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Level Progress - Compact */}
              <div className={`bg-gradient-to-br ${currentTheme.light} p-3 rounded-xl border ${currentTheme.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-r ${currentTheme.gradient} shadow-sm`}>
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-black text-sm">Level {level}</p>
                      <p className="text-[10px] text-gray-600">{totalPoints} XP</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-black">{Math.floor(progress)}%</p>
                    <p className="text-[10px] text-gray-600">to Lv {level + 1}</p>
                  </div>
                </div>
                <Progress value={progress} className="h-2 bg-white/70" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Compact Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-white via-white to-primary/5 border-2 border-primary/20 shadow-lg p-4">
            <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-black">
              <BarChart3 className="w-4 h-4 text-primary" />
              Your Stats
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Books Completed */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-3 border border-blue-500/20"
              >
                <BookOpen className="w-6 h-6 text-blue-600 mb-1.5" />
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  {user.achievements.booksCompleted}
                </p>
                <p className="text-[10px] text-gray-700 font-medium">Books Done</p>
              </motion.div>

              {/* Reading Victories */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-xl p-3 border border-yellow-500/20"
              >
                <Trophy className="w-6 h-6 text-yellow-600 mb-1.5" />
                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {user.achievements.readingVictories}
                </p>
                <p className="text-[10px] text-gray-700 font-medium">Victories</p>
              </motion.div>

              {/* Mini Games */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-3 border border-purple-500/20"
              >
                <Target className="w-6 h-6 text-purple-600 mb-1.5" />
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                  {user.achievements.miniGamesPlayed}
                </p>
                <p className="text-[10px] text-gray-700 font-medium">Games Played</p>
              </motion.div>

              {/* Login Streak */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-xl p-3 border border-orange-500/20"
              >
                <Flame className="w-6 h-6 text-orange-600 mb-1.5" />
                <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  {user.loginStreak || 0}
                </p>
                <p className="text-[10px] text-gray-700 font-medium">Day Streak</p>
              </motion.div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 border border-primary/20 text-black hover:bg-primary/5 h-8 text-xs"
              onClick={() => onNavigate?.('badges')}
            >
              <Award className="w-3.5 h-3.5 mr-1.5 text-primary" />
              View All Badges
            </Button>
          </Card>
        </motion.div>

        {/* My Library - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="bg-gradient-to-br from-white via-white to-primary/5 border-2 border-primary/20 shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold flex items-center gap-2 text-black">
                <ShoppingBag className="w-4 h-4 text-primary" />
                My Library
              </h3>
              <Badge className="bg-primary/10 text-black border border-primary/20 text-[10px] px-2 py-0.5 h-5">
                {purchasedBooks.length} books
              </Badge>
            </div>

            {purchasedBooks.length > 0 ? (
              <div className="grid grid-cols-4 gap-2">
                {purchasedBooks.slice(0, 8).map((book, idx) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="relative group cursor-pointer"
                  >
                    <div className="relative rounded-lg overflow-hidden shadow-md border border-primary/20 aspect-[3/4]">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <BookOpen className="w-12 h-12 mx-auto mb-2 text-primary/30" />
                <p className="text-xs text-gray-600 mb-3">No books yet</p>
                <Button
                  size="sm"
                  onClick={() => onNavigate?.('store')}
                  className={`bg-gradient-to-r ${currentTheme.gradient} text-white h-8 text-xs px-4`}
                >
                  <ShoppingBag className="w-3 h-3 mr-1.5" />
                  Browse Store
                </Button>
              </div>
            )}

            {purchasedBooks.length > 8 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 text-xs text-primary hover:bg-primary/5 h-7"
                onClick={() => onNavigate?.('library')}
              >
                View All {purchasedBooks.length} Books
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            )}
          </Card>
        </motion.div>

        {/* Quick Actions - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-white via-white to-primary/5 border-2 border-primary/20 shadow-lg p-4">
            <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-black">
              <Settings className="w-4 h-4 text-primary" />
              Quick Actions
            </h3>

            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRateApp}
                className="w-full bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 hover:from-yellow-500/20 hover:to-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-black text-sm">Rate the App</p>
                    <p className="text-[10px] text-[rgb(235,239,245)] text-[rgb(255,255,255)]">Share your experience</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate?.('account')}
                className="w-full bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border border-primary/20 rounded-xl p-3 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 bg-gradient-to-r ${currentTheme.gradient} rounded-lg`}>
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-black text-sm">Account Settings</p>
                    <p className="text-[10px] text-[rgb(238,243,250)] text-[rgb(255,255,255)]">Manage your account</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDeleteAccount}
                className={`w-full border rounded-xl p-3 flex items-center justify-between transition-all ${
                  showDeleteConfirm 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-600' 
                    : 'bg-gradient-to-br from-red-500/10 to-red-500/5 hover:from-red-500/20 hover:to-red-500/10 border-red-500/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${showDeleteConfirm ? 'bg-red-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}>
                    <Trash2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className={`font-semibold text-sm ${showDeleteConfirm ? 'text-white' : 'text-black'}`}>
                      {showDeleteConfirm ? 'Tap Again to Confirm' : 'Delete Account'}
                    </p>
                    <p className={`text-[10px] ${showDeleteConfirm ? 'text-red-100' : 'text-white'}`}>
                      {showDeleteConfirm ? 'Cannot be undone' : 'Remove all data'}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${showDeleteConfirm ? 'text-red-200' : 'text-red-400'}`} />
              </motion.button>
            </div>
          </Card>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-center text-[10px] text-gray-500 pb-2"
        >
          <p className="text-[rgb(247,249,255)] text-[rgb(243,246,251)]">Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
          <p className="mt-0.5 text-[rgb(242,245,253)] text-[rgb(255,255,255)]">Rooted Tales v1.3.0+ • Xenwinx Studio</p>
        </motion.div>
      </div>

      {/* Profile Picture Upload Modal */}
      <AnimatePresence>
        {showProfileUpload && (
          <ProfilePictureUpload
            user={user}
            onUpdateUser={onUpdateUser}
            onClose={() => setShowProfileUpload(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}