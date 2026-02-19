import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ThemeUserBadge } from './ThemeUserBadge';
import { 
  Palette, 
  TreePine, 
  Waves, 
  Sunset, 
  Moon,
  Check,
  Sparkles
} from 'lucide-react';
import { Theme } from '../App';
import { toast } from 'sonner@2.0.3';

interface ThemeSelectionProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  user?: any;
}

interface ThemeOption {
  id: Theme;
  name: string;
  description: string;
  icon: React.ElementType;
  bgGradient: string;
  bgImage?: string;
  animation: string;
  features: string[];
  userType: string;
}

export function ThemeSelection({ currentTheme, onThemeChange, user }: ThemeSelectionProps) {
  
  const handleThemeSelect = (themeId: Theme) => {
    onThemeChange(themeId);
    const themeName = themes.find(t => t.id === themeId)?.name || themeId;
    toast.success(`Theme changed to ${themeName}`, {
      description: `Your reading environment is now ${themeName.toLowerCase()}`,
      duration: 3000,
    });
  };
  const themes: ThemeOption[] = [
    {
      id: 'forest',
      name: 'Mystical Forest 🌲',
      description: 'Journey through enchanted woods where ethereal light streams through ancient trees',
      icon: TreePine,
      bgGradient: 'from-emerald-900 via-green-700 to-emerald-500',
      animation: 'Floating leaves',
      features: ['Ethereal streams', 'Ancient magic', 'Forest spirits', 'Golden light'],
      userType: 'Forest Visitor Reader Access'
    },
    {
      id: 'ocean',
      name: 'Ocean Depth 🌊', 
      description: 'Dive deep into coral wonderlands beneath mysterious blue depths',
      icon: Waves,
      bgGradient: 'from-blue-900 via-cyan-700 to-blue-500',
      animation: 'Floating bubbles',
      features: ['Coral gardens', 'Deep mysteries', 'Sea magic', 'Ocean waves'],
      userType: 'Ocean Explorer Reader Access'
    },
    {
      id: 'sunset',
      name: 'Sunset Glow 🌅',
      description: 'Join red pandas in golden meadows under warm orange-red horizons',
      icon: Sunset,
      bgGradient: 'from-orange-900 via-red-700 to-orange-500',
      animation: 'Floating clouds',
      features: ['Golden fields', 'Red panda friends', 'Warm glow', 'Amber skies'],
      userType: 'Sunset Wanderer Reader Access'
    },
    {
      id: 'night',
      name: 'Starry Night ✨',
      description: 'Join sleepy red pandas under magical starlit indigo skies',
      icon: Moon,
      bgGradient: 'from-indigo-900 via-purple-700 to-indigo-500',
      animation: 'Floating stars',
      features: ['Purple magic', 'Sleepy pandas', 'Night forest', 'Twinkling stars'],
      userType: 'Night Dreamer Reader Access'
    }
  ];

  const getThemeAnimationElements = (theme: Theme) => {
    const animationElements = {
      forest: Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 text-lime-400 opacity-80"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 5, -3, 0],
            rotate: [0, 15, -10, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {i % 4 === 0 ? '🍃' : i % 4 === 1 ? '🌿' : i % 4 === 2 ? '✨' : '🦌'}
        </motion.div>
      )),
      ocean: Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, 3, -2, 0],
            scale: [0.9, 1.3, 0.9],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {i % 5 === 0 ? '🫧' : i % 5 === 1 ? '🐠' : i % 5 === 2 ? '🪸' : i % 5 === 3 ? '🐚' : '🌊'}
        </motion.div>
      )),
      sunset: Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-400 opacity-80"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 15, 0],
            y: [0, -5, 0],
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {i % 4 === 0 ? '☁️' : i % 4 === 1 ? '🐾' : i % 4 === 2 ? '🌾' : '🦝'}
        </motion.div>
      )),
      night: Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-85"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.85, 1, 0.85],
            scale: [1, 1.2, 1],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {i % 6 === 0 ? '🌟' : i % 6 === 1 ? '✨' : i % 6 === 2 ? '🌙' : i % 6 === 3 ? '🐾' : i % 6 === 4 ? '💫' : '🌲'}
        </motion.div>
      ))
    };

    return animationElements[theme] || [];
  };

  return (
    <div className="h-full overflow-y-auto bg-background themes-screen">
      <div className="p-6 space-y-6 screen-transparent-bg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Palette className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-[rgb(255,255,255)]">Theme Selection</h1>
          </div>
          <p className="text-[rgb(255,255,255)]">
            Choose your magical reading environment
          </p>
        </motion.div>

        {/* Current Theme Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${themes.find(t => t.id === currentTheme)?.bgGradient} opacity-20`} />
            <div className="absolute inset-0 pointer-events-none">
              {getThemeAnimationElements(currentTheme)}
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="text-center">
                <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">
                  Current Theme
                </Badge>
                <h2 className="text-xl font-bold mb-2">
                  {themes.find(t => t.id === currentTheme)?.name}
                </h2>
                <p className="text-muted-foreground">
                  {themes.find(t => t.id === currentTheme)?.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Theme Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-4"
        >
          {themes.map((theme, index) => {
            const Icon = theme.icon;
            const isActive = currentTheme === theme.id;
            
            return (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    isActive 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-10`} />
                  
                  {/* Theme Animation Preview */}
                  <div className="absolute inset-0 pointer-events-none opacity-30">
                    {getThemeAnimationElements(theme.id).slice(0, 3)}
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center shadow-md`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-[rgb(1,46,69)]">{theme.name}</h3>
                          {isActive && (
                            <Badge className="bg-green-500 text-white">
                              <Check className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-[rgb(0,0,0)] mb-3">
                          {theme.description}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Sparkles className="w-4 h-4 mr-2" />
                            <span className="text-[rgb(4,34,51)]">{theme.animation}</span>
                          </div>
                          
                          <div>
                            <div className="mb-2">
                              <ThemeUserBadge theme={theme.id} size="sm" />
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {theme.features.map((feature, featureIndex) => (
                                <Badge 
                                  key={featureIndex} 
                                  variant="secondary" 
                                  className="text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isActive && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <Button 
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleThemeSelect(theme.id);
                          }}
                        >
                          Select Theme
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Theme Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4 text-center">Theme Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Immersive Experience</p>
                    <p className="text-sm text-muted-foreground">Matching animations and sound effects</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Palette className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Visual Harmony</p>
                    <p className="text-sm text-muted-foreground">Colors and icons match story themes</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Badge className="w-4 h-4 bg-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Reader Status</p>
                    <p className="text-sm text-muted-foreground">Special profile badges for each theme</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
