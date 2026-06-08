import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Check, Edit2, Sparkles } from 'lucide-react';
import { Theme } from '../App';

// Import the themed avatar images
import forestAvatar from 'figma:asset/7c9fee5a551fa9845ea57aed0c3abb13e0a9e154.png';
import oceanAvatar from 'figma:asset/6d7bc987afcd66fddb7bc12fc5902d6b7cce50d7.png';
import sunsetAvatar from 'figma:asset/0fdaf9af501215846e1f02a497878767ca49cad4.png';
import nightAvatar from 'figma:asset/4c1f0f30b39cbbef4b209a91a537ea15de9953d7.png';

interface LoginThemeSelectorProps {
  onSelect: (theme: Theme, themeTitle: string, avatar: string) => void;
  username: string;
}

export function LoginThemeSelector({ onSelect, username }: LoginThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const themeOptions = [
    {
      id: 'forest' as Theme,
      name: 'Forest Visitor',
      defaultTitle: 'Forest Visitor',
      avatar: forestAvatar,
      bg: 'from-green-400 via-emerald-500 to-teal-600',
      description: 'Explore the mystical forests with Akai the Red Panda'
    },
    {
      id: 'ocean' as Theme,
      name: 'Ocean Explorer',
      defaultTitle: 'Ocean Explorer',
      avatar: oceanAvatar,
      bg: 'from-blue-400 via-cyan-500 to-sky-600',
      description: 'Dive into underwater adventures with Marina the Turtle'
    },
    {
      id: 'sunset' as Theme,
      name: 'Sunset Wanderer',
      defaultTitle: 'Sunset Wanderer',
      avatar: sunsetAvatar,
      bg: 'from-orange-400 via-pink-500 to-rose-600',
      description: 'Journey through golden horizons with Ember the Tiger'
    },
    {
      id: 'night' as Theme,
      name: 'Night Dreamer',
      defaultTitle: 'Night Dreamer',
      avatar: nightAvatar,
      bg: 'from-indigo-400 via-purple-500 to-blue-600',
      description: 'Discover starlit mysteries with Luna the Fox'
    }
  ];

  const selectedThemeData = themeOptions.find(t => t.id === selectedTheme);

  const handleConfirm = () => {
    if (selectedTheme && selectedThemeData) {
      const finalTitle = customTitle || selectedThemeData.defaultTitle;
      onSelect(selectedTheme, finalTitle, selectedThemeData.avatar);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl my-8"
      >
        <Card className="bg-white/95 backdrop-blur-lg border-2 shadow-2xl p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-purple-900">
                Welcome back, {username}!
              </h1>
            </div>
            <p className="text-muted-foreground">
              Which adventure would you like to continue today?
            </p>
          </motion.div>

          {/* Theme Selection Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {themeOptions.map((theme, index) => (
              <motion.button
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedTheme(theme.id);
                  setCustomTitle('');
                  setIsEditingTitle(false);
                }}
                className="relative group"
              >
                <div className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ${
                  selectedTheme === theme.id 
                    ? 'ring-4 ring-purple-500 scale-105' 
                    : 'hover:scale-105'
                }`}>
                  {/* Avatar Image */}
                  <img
                    src={theme.avatar}
                    alt={theme.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${theme.bg} opacity-30 group-hover:opacity-40 transition-opacity`} />
                  
                  {/* Check mark */}
                  {selectedTheme === theme.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 bg-green-500 rounded-full p-2 shadow-lg"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Theme Info */}
                <div className="mt-3 text-center">
                  <h3 className="font-bold text-lg">{theme.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {theme.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Selected Theme Details */}
          <AnimatePresence mode="wait">
            {selectedThemeData && (
              <motion.div
                key={selectedTheme}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t pt-6 mt-6 space-y-4"
              >
                {/* Title Customization */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your Explorer Title
                  </label>
                  <div className="flex gap-2">
                    {!isEditingTitle ? (
                      <>
                        <div className="flex-1 px-4 py-2 bg-muted rounded-lg font-medium">
                          {customTitle || selectedThemeData.defaultTitle}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setIsEditingTitle(true)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <div className="flex-1 space-y-2">
                        <Input
                          value={customTitle}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          placeholder={selectedThemeData.defaultTitle}
                          className="w-full"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setCustomTitle('');
                              setIsEditingTitle(false);
                            }}
                            className="flex-1"
                          >
                            Use Default
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setIsEditingTitle(false)}
                            className="flex-1"
                            disabled={!customTitle}
                          >
                            Save Title
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    This is how you'll be known in your reading adventures!
                  </p>
                </div>

                {/* Confirm Button */}
                <Button
                  onClick={handleConfirm}
                  className={`w-full bg-gradient-to-r ${selectedThemeData.bg} text-white shadow-lg hover:shadow-xl transition-all`}
                  size="lg"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Begin {customTitle || selectedThemeData.defaultTitle} Adventure
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedTheme && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-muted-foreground mt-4"
            >
              Select a theme above to continue
            </motion.p>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
