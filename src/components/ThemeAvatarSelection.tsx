import React, { useState } from 'react';
import { motion } from 'motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Sparkles, Check, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import forestVisitor from 'figma:asset/7c9fee5a551fa9845ea57aed0c3abb13e0a9e154.png';
import oceanExplorer from 'figma:asset/6d7bc987afcd66fddb7bc12fc5902d6b7cce50d7.png';
import sunsetWanderer from 'figma:asset/0fdaf9af501215846e1f02a497878767ca49cad4.png';
import nightDreamer from 'figma:asset/4c1f0f30b39cbbef4b209a91a537ea15de9953d7.png';

interface ThemeOption {
  id: string;
  name: string;
  defaultTitle: string;
  avatar: string;
  gradient: string;
  description: string;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'forest',
    name: 'Forest Visitor',
    defaultTitle: 'Forest Explorer',
    avatar: forestVisitor,
    gradient: 'from-green-400 to-emerald-600',
    description: 'Explore mystical forests and discover woodland tales with Akai the red panda as your guide.',
  },
  {
    id: 'ocean',
    name: 'Ocean Explorer',
    defaultTitle: 'Ocean Adventurer',
    avatar: oceanExplorer,
    gradient: 'from-blue-400 to-cyan-600',
    description: 'Dive into underwater adventures and explore the depths of the ocean with your turtle companion.',
  },
  {
    id: 'sunset',
    name: 'Sunset Wanderer',
    defaultTitle: 'Sunset Seeker',
    avatar: sunsetWanderer,
    gradient: 'from-orange-400 to-rose-600',
    description: 'Journey through golden horizons and sunset landscapes with your friendly tiger cub.',
  },
  {
    id: 'night',
    name: 'Night Dreamer',
    defaultTitle: 'Night Dreamer Reader Access',
    avatar: nightDreamer,
    gradient: 'from-purple-500 to-indigo-700',
    description: 'Embark on starlit adventures and moonlit dreams with your wise wolf companion.',
  },
];

interface ThemeAvatarSelectionProps {
  isOpen: boolean;
  onComplete: (theme: string, avatar: string, customTitle?: string) => void;
  currentTheme?: string;
}

export function ThemeAvatarSelection({ isOpen, onComplete, currentTheme }: ThemeAvatarSelectionProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(
    themeOptions.find(t => t.id === currentTheme) || themeOptions[0]
  );
  const [customTitle, setCustomTitle] = useState('');
  const [useCustomTitle, setUseCustomTitle] = useState(false);

  const handleComplete = () => {
    const finalTitle = useCustomTitle && customTitle.trim() 
      ? customTitle.trim() 
      : selectedTheme.defaultTitle;
    
    onComplete(selectedTheme.id, selectedTheme.avatar, finalTitle);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-center gap-2 mb-2">
            <DialogTitle className="text-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-2 text-primary" />
              Choose Your Adventure Style
            </DialogTitle>
            
            {/* Info Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0 rounded-full hover:bg-primary/10"
                >
                  <Info className="w-4 h-4 text-primary" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" side="bottom" align="end">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">What are Themes?</h4>
                      <p className="text-xs text-muted-foreground">
                        Themes personalize your reading journey! Each theme comes with:
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                        <li>• A unique avatar companion</li>
                        <li>• Custom background visuals</li>
                        <li>• Themed achievements & badges</li>
                        <li>• Personalized reader title</li>
                        <li>• Special unlockable content</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        You can change your theme anytime from your profile!
                      </p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <DialogDescription className="text-center">
            Select an avatar and customize your reader identity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Theme/Avatar Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Choose Your Avatar</Label>
            <div className="grid grid-cols-1 gap-3">
              {themeOptions.map((theme) => (
                <motion.div
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all ${
                      selectedTheme.id === theme.id 
                        ? `ring-2 ring-primary shadow-lg bg-gradient-to-br ${theme.gradient} bg-opacity-10` 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => {
                      setSelectedTheme(theme);
                      setCustomTitle('');
                      setUseCustomTitle(false);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Avatar Image */}
                        <div className="relative">
                          <img 
                            src={theme.avatar} 
                            alt={theme.name}
                            className="w-20 h-20 rounded-2xl object-cover"
                          />
                          {selectedTheme.id === theme.id && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        
                        {/* Theme Info */}
                        <div className="flex-1">
                          <h3 className="font-bold text-base mb-1">{theme.name}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {theme.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Custom Title Section */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Your Reader Title</Label>
            
            {/* Default Title Option */}
            <Card 
              className={`cursor-pointer transition-all ${
                !useCustomTitle ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
              }`}
              onClick={() => setUseCustomTitle(false)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Use Default Title</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {selectedTheme.defaultTitle}
                    </p>
                  </div>
                  {!useCustomTitle && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Custom Title Option */}
            <Card 
              className={`cursor-pointer transition-all ${
                useCustomTitle ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
              }`}
              onClick={() => setUseCustomTitle(true)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Create Custom Title</p>
                    {useCustomTitle && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {useCustomTitle && (
                    <div>
                      <Input
                        placeholder="Enter your custom title..."
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        maxLength={30}
                        className="text-base"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {customTitle.length}/30 characters
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <Card className={`bg-gradient-to-br ${selectedTheme.gradient} border-0`}>
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center gap-3">
                <img 
                  src={selectedTheme.avatar} 
                  alt={selectedTheme.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <div className="text-white">
                  <p className="text-sm opacity-90">Your Reader Identity</p>
                  <p className="text-xl font-bold">
                    {useCustomTitle && customTitle.trim() ? customTitle : selectedTheme.defaultTitle}
                  </p>
                  <p className="text-xs opacity-75 mt-1">{selectedTheme.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complete Button */}
          <Button
            onClick={handleComplete}
            className="w-full py-6 text-lg font-bold"
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Begin My Adventure
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
