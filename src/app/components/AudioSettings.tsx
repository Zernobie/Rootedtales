import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { BackButton } from './BackButton';
import { 
  Volume2, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack,
  Settings,
  Mic,
  Headphones,
  Speaker,
  VolumeX,
  Volume1,
  Music,
  Wind,
  Waves,
  Mountain,
  Sun,
  Moon,
  Shuffle,
  Repeat,
  Download,
  Share2,
  BookOpen,
  Timer,
  Zap,
  Eye,
  Brain,
  Heart,
  Star,
  Trees,
  Droplets,
  Sparkles,
  Radio,
  Check,
  ChevronRight,
  Bell,
  Navigation,
  Flame
} from 'lucide-react';
import { User } from '../App';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AudioSettingsProps {
  user: User | null;
  setUser?: (user: User | null) => void;
}

interface VoiceOption {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'child' | 'narrator';
  accent: 'american' | 'british' | 'australian' | 'canadian';
  description: string;
  personality: string;
  premium: boolean;
  sample: string;
}

interface BackgroundSound {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'nature' | 'weather' | 'ambient' | 'magical';
  premium: boolean;
  volume: number;
}

export function AudioSettings({ user, setUser }: AudioSettingsProps) {
  // Core audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([user?.preferences?.voiceSettings?.volume || 75]);
  const [speed, setSpeed] = useState([user?.preferences?.voiceSettings?.speed || 1]);
  const [selectedVoice, setSelectedVoice] = useState(user?.preferences?.voiceSettings?.voice || 'luna-warm');
  
  // Enhanced audio controls
  const [pitch, setPitch] = useState([1]);
  const [pauseDuration, setPauseDuration] = useState([0.5]);
  const [emphasisLevel, setEmphasisLevel] = useState([1]);
  
  // Immersive experience
  const [backgroundSounds, setBackgroundSounds] = useState(user?.preferences?.backgroundSounds || false);
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>(['forest']);
  const [spatialAudio, setSpatialAudio] = useState(true);
  const [adaptiveVolume, setAdaptiveVolume] = useState(false);
  const [immersiveMode, setImmersiveMode] = useState(false);
  
  // Sound Effects settings
  const [clickSoundsEnabled, setClickSoundsEnabled] = useState(true);
  const [pageFlipSounds, setPageFlipSounds] = useState(true);
  const [achievementSounds, setAchievementSounds] = useState(true);
  const [notificationSounds, setNotificationSounds] = useState(true);
  const [soundEffectsVolume, setSoundEffectsVolume] = useState([70]);
  
  // Advanced options
  const [autoPlay, setAutoPlay] = useState(true);
  const [pronunciationHelp, setPronunciationHelp] = useState(true);
  const [wordHighlighting, setWordHighlighting] = useState(true);
  const [sleepTimer, setSleepTimer] = useState(0);
  const [autoBookmark, setAutoBookmark] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  
  // Audio analytics
  const [listeningTime, setListeningTime] = useState(0);
  const [wordsPerMinute, setWordsPerMinute] = useState(180);
  
  // Player state
  const [currentTime, setCurrentTime] = useState(154);
  const [duration, setDuration] = useState(922);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChapter, setCurrentChapter] = useState('Chapter 1: A New Beginning');
  const [bookTitle, setBookTitle] = useState('The Adventures of Rusty the Red Panda');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Enhanced voice options with more personality
  const voiceOptions: VoiceOption[] = [
    {
      id: 'luna-warm',
      name: 'Luna',
      gender: 'female',
      accent: 'american',
      description: 'Warm and nurturing storyteller',
      personality: 'Perfect for bedtime stories and gentle adventures',
      premium: false,
      sample: 'Hello little adventurer! Let me take you on a magical journey through the enchanted forest where Rusty lives.'
    },
    {
      id: 'forest-deep',
      name: 'Forest',
      gender: 'male',
      accent: 'british',
      description: 'Deep and calming narrator',
      personality: 'Wise and experienced, perfect for epic adventures',
      premium: false,
      sample: 'Welcome to the ancient forest where legends come alive and every tree whispers secrets of old.'
    },
    {
      id: 'chirpy-joy',
      name: 'Chirpy',
      gender: 'child',
      accent: 'american',
      description: 'Playful and energetic companion',
      personality: 'Excited and enthusiastic, great for young listeners',
      premium: false,
      sample: 'Wow! This is so exciting! Come on, let\'s follow Rusty on his amazing adventure!'
    },
    {
      id: 'sage-wisdom',
      name: 'Professor Sage',
      gender: 'narrator',
      accent: 'british',
      description: 'Scholarly and articulate',
      personality: 'Educational and sophisticated storytelling',
      premium: true,
      sample: 'In the grand tapestry of nature\'s wonder, we find ourselves witnessing the extraordinary tale of a remarkable red panda.'
    },
    {
      id: 'aurora-mystical',
      name: 'Aurora',
      gender: 'female',
      accent: 'australian',
      description: 'Mystical and enchanting',
      personality: 'Magical and dreamy, perfect for fantasy tales',
      premium: true,
      sample: 'Once upon a time, in a realm where magic dances with reality, lived a special red panda named Rusty.'
    },
    {
      id: 'captain-adventure',
      name: 'Captain Storm',
      gender: 'male',
      accent: 'canadian',
      description: 'Bold and adventurous',
      personality: 'Heroic and inspiring for action-packed stories',
      premium: true,
      sample: 'Ahoy there, brave listeners! Prepare yourselves for the most thrilling adventure of Rusty\'s lifetime!'
    }
  ];

  // Enhanced background sounds with categories
  const backgroundSoundOptions: BackgroundSound[] = [
    { id: 'forest', name: 'Enchanted Forest', description: 'Birds & rustling leaves', icon: <Trees className="w-4 h-4" />, category: 'nature', premium: false, volume: 30 },
    { id: 'ocean', name: 'Ocean Waves', description: 'Gentle ocean sounds', icon: <Waves className="w-4 h-4" />, category: 'nature', premium: false, volume: 25 },
    { id: 'mountain', name: 'Mountain Breeze', description: 'Wind through peaks', icon: <Mountain className="w-4 h-4" />, category: 'nature', premium: true, volume: 20 },
    { id: 'stream', name: 'Babbling Brook', description: 'Peaceful water sounds', icon: <Droplets className="w-4 h-4" />, category: 'nature', premium: false, volume: 35 },
    { id: 'rain', name: 'Gentle Rain', description: 'Soft rainfall', icon: <Wind className="w-4 h-4" />, category: 'weather', premium: false, volume: 40 },
    { id: 'fireplace', name: 'Cozy Fireplace', description: 'Crackling fire', icon: <Flame className="w-4 h-4" />, category: 'ambient', premium: false, volume: 30 },
    { id: 'bells', name: 'Wind Chimes', description: 'Magical chimes', icon: <Music className="w-4 h-4" />, category: 'magical', premium: true, volume: 20 },
    { id: 'night', name: 'Night Crickets', description: 'Peaceful night sounds', icon: <Moon className="w-4 h-4" />, category: 'nature', premium: false, volume: 25 }
  ];

  // Audio control functions
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
      toast.success('Audio playback started');
    } else {
      toast.info('Audio paused');
    }
  };

  const handleVoicePreview = async (voiceId: string) => {
    const voice = voiceOptions.find(v => v.id === voiceId);
    if (!voice) return;

    setIsLoading(true);
    
    try {
      // Try to use ElevenLabs TTS first for higher quality
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/audio/tts/generate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            text: voice.sample,
            voiceId: voiceId,
            speed: speed[0],
            stability: 0.5,
            clarity: 0.75,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        if (data.success && data.url) {
          // Play the ElevenLabs generated audio
          if (audioRef.current) {
            audioRef.current.pause();
          }
          
          const audio = new Audio(data.url);
          audio.volume = volume[0] / 100;
          audioRef.current = audio;
          
          toast.success(`Playing ${voice.name} preview (AI Voice)`, {
            description: 'Professional quality narration'
          });
          
          audio.onended = () => {
            setIsLoading(false);
          };
          
          audio.onerror = () => {
            setIsLoading(false);
            toast.error('Playback failed');
          };
          
          await audio.play();
          return;
        }
      }
      
      // Fallback to browser TTS if ElevenLabs fails or API key not configured
      console.log('Falling back to browser TTS');
      
      if (speechRef.current) {
        speechSynthesis.cancel();
      }

      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(voice.sample);
        utterance.rate = speed[0];
        utterance.volume = volume[0] / 100;
        utterance.pitch = pitch[0];
        
        utterance.onstart = () => {
          toast.success(`Playing ${voice.name} preview (Browser Voice)`, {
            description: 'Upgrade to ElevenLabs for professional narration'
          });
        };
        
        utterance.onend = () => {
          setIsLoading(false);
        };
        
        utterance.onerror = () => {
          setIsLoading(false);
          toast.error('Voice preview failed');
        };
        
        speechRef.current = utterance;
        speechSynthesis.speak(utterance);
      } else {
        setIsLoading(false);
        toast.error('Text-to-speech not supported in this browser');
      }
    } catch (error) {
      console.error('Voice preview error:', error);
      setIsLoading(false);
      toast.error('Voice preview failed. Using browser TTS instead.');
      
      // Final fallback to browser TTS
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(voice.sample);
        utterance.rate = speed[0];
        utterance.volume = volume[0] / 100;
        utterance.pitch = pitch[0];
        utterance.onend = () => setIsLoading(false);
        speechRef.current = utterance;
        speechSynthesis.speak(utterance);
      }
    }
  };

  const handleSkipBack = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
    toast.info('Skipped back 10 seconds');
  };

  const handleSkipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10));
    toast.info('Skipped forward 10 seconds');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getVolumeIcon = () => {
    if (volume[0] === 0) return <VolumeX className="w-5 h-5" />;
    if (volume[0] < 50) return <Volume1 className="w-5 h-5" />;
    return <Volume2 className="w-5 h-5" />;
  };

  // User preference update functions
  const updateUserPreferences = (updates: any) => {
    if (user && setUser) {
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          ...updates
        }
      };
      setUser(updatedUser);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    updateUserPreferences({
      voiceSettings: {
        ...user?.preferences?.voiceSettings,
        volume: newVolume[0]
      }
    });
  };

  const handleSpeedChange = (newSpeed: number[]) => {
    setSpeed(newSpeed);
    updateUserPreferences({
      voiceSettings: {
        ...user?.preferences?.voiceSettings,
        speed: newSpeed[0]
      }
    });
  };

  const handleVoiceChange = (newVoice: string) => {
    setSelectedVoice(newVoice);
    updateUserPreferences({
      voiceSettings: {
        ...user?.preferences?.voiceSettings,
        voice: newVoice
      }
    });
    toast.success('Voice updated successfully');
  };

  const handleBackgroundSoundsChange = (enabled: boolean) => {
    setBackgroundSounds(enabled);
    updateUserPreferences({ backgroundSounds: enabled });
    toast.success(enabled ? 'Background sounds enabled' : 'Background sounds disabled');
  };

  const toggleBackgroundSound = (soundId: string) => {
    setSelectedBackgrounds(prev => {
      const newSelection = prev.includes(soundId) 
        ? prev.filter(id => id !== soundId)
        : [...prev, soundId];
      toast.success(prev.includes(soundId) ? 'Background removed' : 'Background added');
      return newSelection;
    });
  };

  const downloadForOffline = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOfflineMode(true);
      toast.success('Book downloaded for offline listening');
    }, 2000);
  };

  const resetToDefaults = () => {
    setVolume([75]);
    setSpeed([1]);
    setPitch([1]);
    setPauseDuration([0.5]);
    setEmphasisLevel([1]);
    setSelectedVoice('luna-warm');
    setBackgroundSounds(false);
    setSelectedBackgrounds(['forest']);
    setSpatialAudio(true);
    setAdaptiveVolume(false);
    setAutoPlay(true);
    setPronunciationHelp(true);
    setWordHighlighting(true);
    setSleepTimer(0);
    setAutoBookmark(true);
    setImmersiveMode(false);
    setClickSoundsEnabled(true);
    setPageFlipSounds(true);
    setAchievementSounds(true);
    setNotificationSounds(true);
    setSoundEffectsVolume([70]);
    
    updateUserPreferences({
      voiceSettings: { voice: 'luna-warm', speed: 1, volume: 75 },
      backgroundSounds: false
    });
    
    toast.success('Settings reset to defaults');
  };

  // Sleep timer effect
  useEffect(() => {
    if (sleepTimer > 0) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
        setSleepTimer(0);
        toast.success('Time to sleep! 🌙', {
          description: 'Logging you out... Sweet dreams!',
          duration: 3000,
        });
        
        setTimeout(() => {
          if (setUser) {
            setUser(null);
            localStorage.removeItem('currentUser');
          }
        }, 2000);
      }, sleepTimer * 60 * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [sleepTimer, setUser]);

  // Listening time tracking
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setListeningTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const playTestSound = () => {
    if (clickSoundsEnabled) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjCH0fPTgjMGHm7A7+OZRQ0aYLLr7ZxPERBOou');
      audio.volume = soundEffectsVolume[0] / 100;
      audio.play().catch(() => {});
      toast.success('🔊 Pop!', { duration: 1000 });
    } else {
      toast.info('Click sounds are disabled');
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-background audio-settings-screen">
      <BackButton onBack={() => window.history.back()} />
      
      <div className="p-4 space-y-6 screen-transparent-bg pb-24">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 border-2 border-white/20 p-6"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative">
            <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl"
              >
                <Headphones className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-[rgb(255,255,255)] mb-2">
              🎵 Audio Settings
            </h1>
            <p className="text-center text-sm text-[rgb(255,255,255)] mb-4">
              Customize your immersive listening experience
            </p>

            {/* Stats badges */}
            <div className="flex gap-2 justify-center flex-wrap">
              <Badge className="bg-white/90 text-foreground border-0 px-3 py-1.5">
                <Timer className="w-3 h-3 mr-1" />
                {Math.floor(listeningTime / 60)}m today
              </Badge>
              <Badge className="bg-white/90 text-foreground border-0 px-3 py-1.5">
                <Zap className="w-3 h-3 mr-1" />
                {wordsPerMinute} WPM
              </Badge>
              {offlineMode && (
                <Badge className="bg-green-500/90 text-white border-0 px-3 py-1.5">
                  <Download className="w-3 h-3 mr-1" />
                  Offline Ready
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="player" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1">
            <TabsTrigger value="player" className="text-xs py-2">
              <div className="flex flex-col items-center gap-1">
                <Play className="w-4 h-4" />
                <span>Player</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="voice" className="text-xs py-2">
              <div className="flex flex-col items-center gap-1">
                <Mic className="w-4 h-4" />
                <span>Voice</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="experience" className="text-xs py-2">
              <div className="flex flex-col items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>Experience</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs py-2">
              <div className="flex flex-col items-center gap-1">
                <Settings className="w-4 h-4" />
                <span>Advanced</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* PLAYER TAB */}
          <TabsContent value="player" className="space-y-4 mt-4">
            {/* Now Playing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-2 border-primary/20 overflow-hidden">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      <Radio className="w-3 h-3 mr-1" />
                      Now Playing
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Shuffle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Repeat className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <motion.div
                      animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
                      transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                      className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-2xl"
                    >
                      <BookOpen className="w-12 h-12 text-white" />
                    </motion.div>
                    
                    <div>
                      <h3 className="font-bold text-foreground line-clamp-1">{bookTitle}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{currentChapter}</p>
                    </div>

                    <Badge className="bg-primary text-primary-foreground">
                      {voiceOptions.find(v => v.id === selectedVoice)?.name || 'Luna'}
                    </Badge>
                  </div>
                </div>

                <CardContent className="pt-6 space-y-4">
                  {/* Playback Controls */}
                  <div className="flex items-center justify-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSkipBack}
                      className="h-10 w-10 rounded-full"
                    >
                      <SkipBack className="w-5 h-5" />
                    </Button>
                    
                    <Button 
                      onClick={handlePlayPause}
                      className="rounded-full h-14 w-14 shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-1" />
                      )}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSkipForward}
                      className="h-10 w-10 rounded-full"
                    >
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Progress value={(currentTime / duration) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatTime(currentTime)}</span>
                      <span className="flex items-center gap-1">
                        <Timer className="w-3 h-3" />
                        {formatTime(duration - currentTime)} left
                      </span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={downloadForOffline}>
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Offline
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-3.5 h-3.5 mr-1.5" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-3.5 h-3.5 mr-1.5" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Audio Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    {getVolumeIcon()}
                    <span className="ml-2">Audio Controls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Volume */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Volume</label>
                      <Badge variant="secondary" className="text-xs">{volume[0]}%</Badge>
                    </div>
                    <Slider
                      value={volume}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Reading Speed */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Reading Speed</label>
                      <Badge variant="secondary" className="text-xs">{speed[0]}x</Badge>
                    </div>
                    <Slider
                      value={speed}
                      onValueChange={handleSpeedChange}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.5x Slow</span>
                      <span>1.0x Normal</span>
                      <span>2.0x Fast</span>
                    </div>
                  </div>

                  {/* Pitch Control */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Voice Pitch</label>
                      <Badge variant="secondary" className="text-xs">{pitch[0]}x</Badge>
                    </div>
                    <Slider
                      value={pitch}
                      onValueChange={setPitch}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* VOICE TAB */}
          <TabsContent value="voice" className="space-y-4 mt-4">
            {/* Voice Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Mic className="w-5 h-5 mr-2" />
                    Choose Your Narrator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {voiceOptions.map(voice => (
                    <motion.div
                      key={voice.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all border-2 ${
                          selectedVoice === voice.id 
                            ? 'ring-2 ring-primary border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleVoiceChange(voice.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold text-sm">{voice.name}</h4>
                                {selectedVoice === voice.id && (
                                  <Badge className="bg-primary text-primary-foreground h-5 px-1.5">
                                    <Check className="w-3 h-3" />
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex gap-1.5 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  {voice.gender}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {voice.accent}
                                </Badge>
                                {voice.premium && (
                                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs">
                                    <Star className="w-2.5 h-2.5 mr-1" />
                                    Premium
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {voice.description}
                              </p>
                              <p className="text-xs text-muted-foreground italic leading-relaxed">
                                {voice.personality}
                              </p>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="shrink-0 h-9 w-9 p-0 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleVoicePreview(voice.id);
                              }}
                              disabled={isLoading}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Voice Fine-tuning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Voice Fine-tuning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Pause Between Sentences</label>
                      <Badge variant="secondary" className="text-xs">{pauseDuration[0]}s</Badge>
                    </div>
                    <Slider
                      value={pauseDuration}
                      onValueChange={setPauseDuration}
                      min={0.1}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Quick</span>
                      <span>Slow</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Emphasis Level</label>
                      <Badge variant="secondary" className="text-xs">{emphasisLevel[0]}x</Badge>
                    </div>
                    <Slider
                      value={emphasisLevel}
                      onValueChange={setEmphasisLevel}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Subtle</span>
                      <span>Dramatic</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* EXPERIENCE TAB */}
          <TabsContent value="experience" className="space-y-4 mt-4">
            {/* Sound Effects Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-2 border-orange-200">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                  <CardTitle className="flex items-center text-base">
                    <Music className="w-5 h-5 mr-2 text-orange-600" />
                    Sound Effects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Click Sounds</p>
                        <p className="text-xs text-muted-foreground">Play pop sound on taps</p>
                      </div>
                      <Switch
                        checked={clickSoundsEnabled}
                        onCheckedChange={(value) => {
                          setClickSoundsEnabled(value);
                          toast.success(value ? '🔊 Click sounds enabled' : '🔇 Click sounds disabled');
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Page Flip Sounds</p>
                        <p className="text-xs text-muted-foreground">Realistic page turning</p>
                      </div>
                      <Switch
                        checked={pageFlipSounds}
                        onCheckedChange={(value) => {
                          setPageFlipSounds(value);
                          toast.success(value ? '📖 Page sounds enabled' : 'Page sounds disabled');
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Achievement Sounds</p>
                        <p className="text-xs text-muted-foreground">Celebrate your wins</p>
                      </div>
                      <Switch
                        checked={achievementSounds}
                        onCheckedChange={(value) => {
                          setAchievementSounds(value);
                          toast.success(value ? '🏆 Achievement sounds on' : 'Achievement sounds off');
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Notification Sounds</p>
                        <p className="text-xs text-muted-foreground">Alert sounds</p>
                      </div>
                      <Switch
                        checked={notificationSounds}
                        onCheckedChange={(value) => {
                          setNotificationSounds(value);
                          toast.success(value ? '🔔 Notifications on' : 'Notifications off');
                        }}
                      />
                    </div>
                  </div>

                  {/* Sound Effects Volume */}
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Effects Volume</label>
                      <Badge variant="secondary" className="text-xs">{soundEffectsVolume[0]}%</Badge>
                    </div>
                    <Slider
                      value={soundEffectsVolume}
                      onValueChange={setSoundEffectsVolume}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Test Sound */}
                  <Button 
                    onClick={playTestSound}
                    className="w-full"
                    variant="outline"
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Test Click Sound
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Background Soundscapes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-base">
                      <Speaker className="w-5 h-5 mr-2 text-blue-600" />
                      Background Soundscapes
                    </CardTitle>
                    <Switch
                      checked={backgroundSounds}
                      onCheckedChange={handleBackgroundSoundsChange}
                    />
                  </div>
                </CardHeader>
                {backgroundSounds && (
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-2">
                      {backgroundSoundOptions.map(sound => (
                        <motion.div
                          key={sound.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant={selectedBackgrounds.includes(sound.id) ? "default" : "outline"}
                            size="sm"
                            className="flex flex-col items-center p-3 h-auto w-full relative"
                            onClick={() => toggleBackgroundSound(sound.id)}
                          >
                            {sound.premium && (
                              <Star className="w-3 h-3 text-yellow-500 absolute top-1 right-1" />
                            )}
                            <div className="mb-2">
                              {sound.icon}
                            </div>
                            <span className="font-medium text-xs text-center">{sound.name}</span>
                            <span className="text-[10px] text-muted-foreground text-center mt-1">
                              {sound.description}
                            </span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>

            {/* Immersive Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2 border-purple-200">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center text-base">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    Immersive Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">Spatial Audio</p>
                      <p className="text-xs text-muted-foreground">3D positional effects</p>
                    </div>
                    <Switch
                      checked={spatialAudio}
                      onCheckedChange={setSpatialAudio}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">Adaptive Volume</p>
                      <p className="text-xs text-muted-foreground">Auto-adjust to noise</p>
                    </div>
                    <Switch
                      checked={adaptiveVolume}
                      onCheckedChange={setAdaptiveVolume}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">Immersive Mode</p>
                      <p className="text-xs text-muted-foreground">Full-screen with effects</p>
                    </div>
                    <Switch
                      checked={immersiveMode}
                      onCheckedChange={setImmersiveMode}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ADVANCED TAB */}
          <TabsContent value="advanced" className="space-y-4 mt-4">
            {/* Reading Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Reading Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">Auto-play Next Chapter</p>
                      <p className="text-xs text-muted-foreground">Continue automatically</p>
                    </div>
                    <Switch
                      checked={autoPlay}
                      onCheckedChange={setAutoPlay}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">Word Highlighting</p>
                      <p className="text-xs text-muted-foreground">Follow along visually</p>
                    </div>
                    <Switch
                      checked={wordHighlighting}
                      onCheckedChange={setWordHighlighting}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">Pronunciation Help</p>
                      <p className="text-xs text-muted-foreground">Highlight tricky words</p>
                    </div>
                    <Switch
                      checked={pronunciationHelp}
                      onCheckedChange={setPronunciationHelp}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">Auto Bookmark</p>
                      <p className="text-xs text-muted-foreground">Save position</p>
                    </div>
                    <Switch
                      checked={autoBookmark}
                      onCheckedChange={setAutoBookmark}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sleep Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2 border-indigo-200">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle className="flex items-center text-base">
                    <Moon className="w-5 h-5 mr-2 text-indigo-600" />
                    Sleep Timer
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[0, 15, 30, 60].map(minutes => (
                      <Button
                        key={minutes}
                        variant={sleepTimer === minutes ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSleepTimer(minutes);
                          if (minutes > 0) {
                            toast.success(`Sleep timer set for ${minutes} minutes`);
                          } else {
                            toast.info('Sleep timer disabled');
                          }
                        }}
                        className="h-12 flex flex-col items-center justify-center"
                      >
                        <span className="font-bold">{minutes === 0 ? 'Off' : `${minutes}`}</span>
                        {minutes > 0 && <span className="text-[10px]">min</span>}
                      </Button>
                    ))}
                  </div>
                  {sleepTimer > 0 && (
                    <div className="p-3 bg-indigo-50 rounded-lg text-center">
                      <p className="text-sm font-medium text-indigo-900">
                        🌙 Audio will pause in {sleepTimer} minutes
                      </p>
                      <p className="text-xs text-indigo-600 mt-1">
                        You'll be logged out for a good night's sleep
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Reset Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2 border-red-200">
                <CardContent className="p-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-red-200 hover:bg-red-50 hover:text-red-600"
                    onClick={resetToDefaults}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Reset All Settings to Default
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Status Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-green-900">
                    Audio System Active
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap justify-end">
                  {offlineMode && (
                    <Badge className="bg-green-500 text-white text-xs">
                      Offline Ready
                    </Badge>
                  )}
                  {sleepTimer > 0 && (
                    <Badge variant="outline" className="text-xs border-indigo-300 text-indigo-700">
                      Sleep: {sleepTimer}m
                    </Badge>
                  )}
                  {immersiveMode && (
                    <Badge className="bg-purple-500 text-white text-xs">
                      Immersive
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}