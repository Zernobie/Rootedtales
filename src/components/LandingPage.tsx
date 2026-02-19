import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { BookOpen, Sparkles, Users, Crown, Trophy, Coins, Play, Lock, LogIn, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import forestBg from 'figma:asset/de4eff0107ece6776a39e487469a8b154a1d5edc.png';
import rustyBookCover from 'figma:asset/188b17bb31b62592504df73220f0b92a4fcb6bdf.png';
import akaiBookCover from 'figma:asset/b5abfe2d983db76755f90003671db021277cd0cb.png';
import oceanOdysseyBookCover from 'figma:asset/35e57f0417a22480ba69edee9761e06a5a1836d1.png';
import curiousRaccoonsCover from 'figma:asset/5d0b398ad9ed28d2fc8dfc91b136d590ad7db509.png';
import quokkaQuestCover from 'figma:asset/92a93c5baf7979b4513517affe07c56b46488257.png';
import seaOtterCover from 'figma:asset/d9ecddc07a2bb0aa28c4d94b406385ea677afdf6.png';
import cozyKoalaCover from 'figma:asset/c0209ae3cfa35c80b09b6d8690a97b72b6fbbc30.png';
import treasureFriendshipCover from 'figma:asset/cc0283067ce656bd19ab11e061ae76d4a0df86d8.png';
import playfulMonkeysCover from 'figma:asset/a4a09538812d631cae47d9f561a58e8bc702fe4c.png';
import joyfulElephantCover from 'figma:asset/70d76b54c38e05ba6eaa723deaee45e880faff1f.png';
import wiseOwlsCover from 'figma:asset/4414bbc83b5efaadf524949b88ecd1086f1b4394.png';
import lostReindeerCover from 'figma:asset/def95e29c0eeae5105f409aeb9218afff0dec902.png';

interface LandingPageProps {
  onSignIn: () => void;
  onGuestMode: () => void;
  theme?: any;
  user?: any;
}

export function LandingPage({ onSignIn, onGuestMode, theme, user }: LandingPageProps) {
  // Define books with their cover images
  const userBooks = [
    {
      id: '1',
      title: 'The Adventures of Rusty the Red Panda',
      coverImage: rustyBookCover,
      progress: 75
    },
    {
      id: '2',
      title: 'The Adventures of Akai the Red Panda: A Heart-warming Panda Reunion',
      coverImage: akaiBookCover,
      progress: 60
    },
    {
      id: '3',
      title: 'Akai and Kaito in the Great Ocean Odyssey',
      coverImage: oceanOdysseyBookCover,
      progress: 30
    },
    {
      id: '4',
      title: 'Akai the Red Panda and The Curious Raccoons',
      coverImage: curiousRaccoonsCover,
      progress: 0
    },
    {
      id: '5',
      title: 'Akai and The Red Panda and The Quokka Quest',
      coverImage: quokkaQuestCover,
      progress: 45
    },
    {
      id: '6',
      title: 'Akai and the Tale of The Sea Otter',
      coverImage: seaOtterCover,
      progress: 20
    },
    {
      id: '7',
      title: 'Cozy Koala in the Forest',
      coverImage: cozyKoalaCover,
      progress: 0
    },
    {
      id: '8',
      title: 'Treasure Friendship',
      coverImage: treasureFriendshipCover,
      progress: 0
    },
    {
      id: '9',
      title: 'Playful Monkeys in the Jungle',
      coverImage: playfulMonkeysCover,
      progress: 0
    },
    {
      id: '10',
      title: 'Joyful Elephant in the Savannah',
      coverImage: joyfulElephantCover,
      progress: 0
    },
    {
      id: '11',
      title: 'Wise Owls in the Night',
      coverImage: wiseOwlsCover,
      progress: 0
    },
    {
      id: '12',
      title: 'Lost Reindeer in the Snow',
      coverImage: lostReindeerCover,
      progress: 0
    }
  ];

  // Get books with progress for "Continue Reading"
  const continueReadingBooks = user 
    ? userBooks.filter(book => book.progress > 0 && book.progress < 100)
    : [];

  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBookIndex((prevIndex) => 
        prevIndex === userBooks.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 second delay for carousel auto-scroll

    return () => clearInterval(interval);
  }, [userBooks.length]);

  // Handle social media login
  const handleSocialLogin = (provider: 'google' | 'facebook' | 'twitter') => {
    // Simulate OAuth redirect flow
    const providerNames = {
      google: 'Google',
      facebook: 'Facebook',
      twitter: 'Twitter/X'
    };
    
    alert(`🔐 Redirecting to ${providerNames[provider]} authentication...\n\n` +
          `In a production app, this would:\n` +
          `1. Redirect to ${providerNames[provider]} OAuth server\n` +
          `2. Request user permissions\n` +
          `3. Return authentication token\n` +
          `4. Create/sign in user account\n\n` +
          `For now, this will proceed with mock sign in.`);
    
    // Proceed to sign in after mock authentication
    onSignIn();
  };

  // Show different content based on user login status
  if (user) {
    // Logged-in user Home screen
    return (
      <div className="h-full overflow-y-auto bg-background home-screen">
        <div className="p-6 space-y-6 screen-transparent-bg">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold mb-2 px-[0px] py-[6px]">
              Welcome back, {user.username}!
            </h1>
            <p className="text-[rgb(224,224,241)] px-[0px] py-[10px]">
              Ready for your next adventure in Rooted Tales?
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{user.achievements?.booksCompleted || 0}</div>
                    <div className="text-xs text-muted-foreground">Books Read</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{user.gamePoints || 0}</div>
                    <div className="text-xs text-muted-foreground">Points</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{user.achievements?.miniGamesPlayed || 0}</div>
                    <div className="text-xs text-muted-foreground">Games</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Featured Books */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-4">Featured Adventures</h2>
            
            {/* Carousel display with single book */}
            <div className="relative w-full flex justify-center mb-8">
              <motion.div
                key={currentBookIndex}
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full max-w-[280px]"
              >
                <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden">
                  <CardContent className="p-4">
                    <div className="aspect-[2/3] w-full rounded-lg mb-3 overflow-hidden shadow-xl">
                      <img 
                        src={userBooks[currentBookIndex].coverImage} 
                        alt={userBooks[currentBookIndex].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-sm leading-tight text-center mb-2 line-clamp-2 min-h-[2.5rem]">
                      {userBooks[currentBookIndex].title}
                    </h3>
                    {userBooks[currentBookIndex].progress > 0 && (
                      <div className="mb-3 px-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>{userBooks[currentBookIndex].progress}% complete</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${userBooks[currentBookIndex].progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <div className="px-2">
                      <Button size="sm" className="w-full">
                        <Play className="w-3 h-3 mr-1" />
                        {userBooks[currentBookIndex].progress > 0 ? 'Continue Reading' : 'Start Reading'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Carousel indicators */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-3 mx-[0px] my-[-9px]">
                <button
                  onClick={() => setCurrentBookIndex(currentBookIndex === 0 ? userBooks.length - 1 : currentBookIndex - 1)}
                  disabled={currentBookIndex === 0}
                  className={`p-1.5 rounded-full transition-all duration-300 ${
                    currentBookIndex === 0
                      ? 'bg-white/20 text-white/30 cursor-not-allowed'
                      : 'bg-white/80 text-gray-700 hover:bg-white shadow-md'
                  }`}
                  aria-label="Previous book"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                  <span className="text-sm font-medium text-gray-700">
                    {currentBookIndex + 1} / {userBooks.length}
                  </span>
                </div>
                
                <button
                  onClick={() => setCurrentBookIndex(currentBookIndex === userBooks.length - 1 ? 0 : currentBookIndex + 1)}
                  disabled={currentBookIndex === userBooks.length - 1}
                  className={`p-1.5 rounded-full transition-all duration-300 ${
                    currentBookIndex === userBooks.length - 1
                      ? 'bg-white/20 text-white/30 cursor-not-allowed'
                      : 'bg-white/80 text-gray-700 hover:bg-white shadow-md'
                  }`}
                  aria-label="Next book"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                  <h3 className="font-semibold">Recent Achievement</h3>
                </div>
                <div className="text-center text-muted-foreground">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="text-sm">Complete your first book to earn your first achievement!</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Non-logged-in user Landing/Welcome screen
  return (
    <div 
      className="h-full overflow-y-auto"
      style={{
        backgroundImage: `url(${forestBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      <div className="relative z-10 p-6 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white pt-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-white">
            Welcome to Rooted Tales
          </h1>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Imagine.Design.Inspiring minds
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={onSignIn}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-3 rounded-xl text-lg shadow-lg"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/30" />
              <span className="text-white/70 text-sm">or</span>
              <div className="flex-1 h-px bg-white/30" />
            </div>

            <Button
              onClick={onSignIn}
              variant="outline"
              className="w-full border-2 border-white/40 text-white hover:bg-white/20 py-3 rounded-xl backdrop-blur-sm"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Return User? Sign In
            </Button>
            
            <Button
              onClick={onGuestMode}
              variant="ghost"
              className="w-full text-white/90 hover:bg-white/10 py-3 rounded-xl"
            >
              <Users className="w-5 h-5 mr-2" />
              Continue as Guest
            </Button>

            {/* Social Media Quick Access */}
            <div className="pt-4">
              <p className="text-center text-sm text-white/70 mb-3">
                Quick sign in with
              </p>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={() => handleSocialLogin('google')}
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </Button>
                <Button
                  onClick={() => handleSocialLogin('facebook')}
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Button>
                <Button
                  onClick={() => handleSocialLogin('twitter')}
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Books Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Featured Stories
          </h2>
          
          <div className="relative w-full flex justify-center mb-8">
            <motion.div
              key={currentBookIndex}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full max-w-[200px]"
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/30 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-4">
                  <div className="aspect-[2/3] w-full rounded-lg mb-3 overflow-hidden shadow-xl">
                    <img 
                      src={userBooks[currentBookIndex].coverImage} 
                      alt={userBooks[currentBookIndex].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-tight text-center line-clamp-2 min-h-[2.5rem]">
                    {userBooks[currentBookIndex].title}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Carousel indicators */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5 mx-[0px] my-[-9px]">
              {userBooks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBookIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${ 
                    index === currentBookIndex 
                      ? 'bg-white w-6' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to book ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="bg-white/20 backdrop-blur-md border-white/30 hover:shadow-lg transition-all cursor-pointer" onClick={onSignIn}>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">12 Books in Library</h3>
              <p className="text-white/80 text-sm">Magical adventures await</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/20 backdrop-blur-md border-white/30 hover:shadow-lg transition-all cursor-pointer" onClick={onSignIn}>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">34 Characters</h3>
              <p className="text-white/80 text-sm">More to come!</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Your Library Awaits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Card className="bg-white/20 backdrop-blur-md border-white/30 hover:shadow-lg transition-all cursor-pointer" onClick={onSignIn}>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
                <h2 className="text-xl font-bold text-white">Your Library Awaits</h2>
              </div>
              <p className="text-white/90 mb-4">
                Join thousands of readers discovering magical tales in our enchanted forest of stories.
              </p>
              <div className="flex items-center justify-between text-white/80 text-sm">
                <span>🦔 Forest Tales</span>
                <span>🌊 Water Adventures</span>
                <span>❄️ Snow Stories</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
