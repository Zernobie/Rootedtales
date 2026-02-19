import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  BookOpen, 
  ExternalLink, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Sparkles,
  Heart,
  Star,
  Leaf,
  BookMarked
} from 'lucide-react';
import { Theme, User } from '../App';

interface JournalProps {
  user: User | null;
  theme: Theme;
}

export function Journal({ user, theme }: JournalProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const journalPages = [
    {
      title: 'Welcome to Your Reading Journey',
      content: `Dear Reader,

Welcome to Rooted Tales - a magical world where stories come alive through the adventures of Akai the Red Panda and friends!

Each book is carefully crafted to inspire imagination, teach valuable life lessons, and create cherished memories for children and families.

Join us on this enchanting journey through mystical forests, sparkling oceans, and starlit skies.`,
      icon: BookOpen,
      color: 'from-emerald-400 to-teal-500'
    },
    {
      title: 'About Rooted Tales',
      content: `Rooted Tales is a magical storytelling experience created to bring wonder and learning to children and families around the world.

Our Story:
We created this collection of 12 books and 34 beloved characters to build an immersive world of friendship, adventure, and learning. Each story is carefully crafted to inspire imagination and teach valuable life lessons.

Mission:
To inspire young readers through engaging stories that teach valuable life lessons about friendship, courage, and environmental awareness.

What We Offer:
• 12 Magical Stories featuring Akai the Red Panda and friends
• 34 Unique Characters each with their own personality and lessons
• 4 Themed Worlds: Forest, Ocean, Sunset, and Night adventures
• Interactive Reading with Text-to-Speech and audiobooks
• Educational Content that promotes literacy and environmental awareness

Version: 1.0.0

Created with ❤️ by Xenwinx Studios`,
      icon: BookMarked,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'Rooted Tales Journal',
      content: `Discover your perfect creative companion!

📖 96 Beautiful Pages
💫 64 Blank Pages for Sketching
📝 30 Classic Lined Pages for Writing
🦊 Adorable Animal Illustrations
🎨 Full-Page Cover Art

Each journal is a celebration of the animal spirit, designed to inspire a specific mood or intention. Every lined page features your journal's animal muse peeking playfully from the corner or margin.

Whether you're documenting curious wanderings, peaceful thoughts, or joyful moments, this journal is ready to hold your stories, dreams, and adventures!`,
      icon: BookMarked,
      color: 'from-amber-400 to-yellow-500',
      price: '$39.99',
      hasJournalInfo: true
    },
    {
      title: 'Discover More',
      content: `Want to learn more about our stories, characters, and upcoming adventures?

Visit our website to explore:
• Behind-the-scenes content
• Character profiles & artwork
• Story development updates
• Community events
• Author insights

Stay connected with the Rooted Tales family!`,
      icon: Info,
      color: 'from-blue-400 to-cyan-500',
      hasWebsiteLink: true
    },
    {
      title: 'Shop Our Collection',
      content: `Bring the magic home with our beautiful collection!

📚 Interactive Storybooks
📖 Premium Journals
🎨 High-quality hardcover editions
✨ Vibrant full-color illustrations
📦 Perfect for gifting

Available now on Amazon:
• 12 Magical Storybooks
• Beautifully Crafted Journals
• Premium Paper Quality
• Stunning Artwork Throughout

Give the gift of adventure and imagination to the children in your life!`,
      icon: ShoppingBag,
      color: 'from-orange-400 to-red-500',
      hasAmazonLink: true
    },
    {
      title: 'Thank You',
      content: `Thank you for being part of the Rooted Tales community!

Your support helps us create more magical stories and adventures.

With every book you read, you're helping to inspire the next generation of readers and dreamers.

Happy reading! 📚✨

~ The Xenwinx Studios Team`,
      icon: Heart,
      color: 'from-pink-400 to-rose-500'
    }
  ];

  const totalPages = journalPages.length;
  const currentJournalPage = journalPages[currentPage];
  const IconComponent = currentJournalPage.icon;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleWebsiteClick = () => {
    window.open('https://xenwinx.com', '_blank', 'noopener,noreferrer');
  };

  const handleAmazonClick = () => {
    window.open('https://www.amazon.com/stores/author/B0DJKHMXKP', '_blank', 'noopener,noreferrer');
  };

  const handleJournalPurchase = () => {
    window.open('https://www.amazon.com', '_blank', 'noopener,noreferrer');
  };

  const themeStyles = {
    forest: {
      bg: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
      accent: 'text-green-700',
      border: 'border-green-200',
      button: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
      page: 'bg-white/90 border-green-200/50'
    },
    ocean: {
      bg: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50',
      accent: 'text-blue-700',
      border: 'border-blue-200',
      button: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
      page: 'bg-white/90 border-blue-200/50'
    },
    sunset: {
      bg: 'bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50',
      accent: 'text-orange-700',
      border: 'border-orange-200',
      button: 'bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700',
      page: 'bg-white/90 border-orange-200/50'
    },
    night: {
      bg: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50',
      accent: 'text-indigo-700',
      border: 'border-indigo-200',
      button: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
      page: 'bg-white/90 border-indigo-200/50'
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className={`min-h-screen ${currentTheme.bg} p-4 overflow-y-auto pb-24`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className={`w-8 h-8 ${currentTheme.accent}`} />
            <h1 className={`text-3xl font-bold ${currentTheme.accent}`}>
              Rooted Tales Journal
            </h1>
          </div>
          <p className="text-muted-foreground">
            A magical collection of stories and adventures
          </p>
        </motion.div>

        {/* Journal Book */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Book Shadow */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/10 rounded-2xl blur-xl transform translate-y-4" />
          
          {/* Book Container */}
          <Card className={`relative ${currentTheme.page} backdrop-blur-sm border-2 shadow-2xl overflow-hidden`}>
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-24 h-24 opacity-10">
              <Leaf className="w-full h-full text-current" />
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 transform rotate-180">
              <Leaf className="w-full h-full text-current" />
            </div>

            {/* Page Content */}
            <div className="relative z-10 p-8 min-h-[500px] flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Page Icon */}
                  <div className={`bg-gradient-to-r ${currentJournalPage.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Page Title */}
                  <h2 className={`text-2xl font-bold mb-4 ${currentTheme.accent}`}>
                    {currentJournalPage.title}
                  </h2>

                  {/* Price Badge for Journal Info Page */}
                  {currentJournalPage.price && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-4"
                    >
                      <Badge className={`bg-gradient-to-r ${currentJournalPage.color} text-white border-0 shadow-lg px-4 py-2 text-lg`}>
                        {currentJournalPage.price}
                      </Badge>
                    </motion.div>
                  )}

                  {/* Page Content */}
                  <div className="flex-1 text-muted-foreground leading-relaxed whitespace-pre-line mb-6">
                    {currentJournalPage.content}
                  </div>

                  {/* Action Links */}
                  {currentJournalPage.hasJournalInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        onClick={handleJournalPurchase}
                        className={`w-full ${currentTheme.button} text-white shadow-lg mb-4`}
                      >
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Buy Journal on Amazon
                      </Button>
                    </motion.div>
                  )}

                  {currentJournalPage.hasWebsiteLink && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        onClick={handleWebsiteClick}
                        className={`w-full ${currentTheme.button} text-white shadow-lg mb-4`}
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Visit xenwinx.com
                      </Button>
                    </motion.div>
                  )}

                  {currentJournalPage.hasAmazonLink && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        onClick={handleAmazonClick}
                        className={`w-full ${currentTheme.button} text-white shadow-lg mb-4`}
                      >
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Shop on Amazon
                      </Button>
                    </motion.div>
                  )}

                  {/* Page Number */}
                  <div className="text-center text-sm text-muted-foreground mt-4">
                    Page {currentPage + 1} of {totalPages}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Page Binding Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/10 to-transparent" />
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/20 to-transparent" />
          </Card>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mt-6 gap-4"
        >
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            variant="outline"
            size="lg"
            className={`flex-1 ${currentTheme.border} disabled:opacity-50`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          {/* Page Counter */}
          <div className="flex items-center justify-center px-4">
            <span className="text-sm font-semibold whitespace-nowrap">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>

          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            variant="outline"
            size="lg"
            className={`flex-1 ${currentTheme.border} disabled:opacity-50`}
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Quick Links Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button
              onClick={handleWebsiteClick}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              xenwinx.com
            </Button>
            <span className="text-muted-foreground">•</span>
            <Button
              onClick={handleAmazonClick}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Amazon Store
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2024 Xenwinx Studios. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
