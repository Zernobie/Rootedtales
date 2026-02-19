import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCw,
  Settings,
  Bookmark,
  BookmarkCheck,
  Volume2,
  VolumeX,
  Timer,
  RefreshCw,
  Moon,
  Clock,
  Sun,
  Sunrise,
  Sunset as SunsetIcon,
  X
} from 'lucide-react';
import { Theme, User } from '../App';
import { toast } from 'sonner@2.0.3';

interface BookReaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
  theme: Theme;
  bookId: string;
  bookTitle: string;
  bookContent: string[];
  onBack: () => void;
}

export function BookReader({ 
  user, 
  setUser, 
  theme, 
  bookId, 
  bookTitle, 
  bookContent,
  onBack 
}: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(5); // seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  // Sleep Timer States
  const [sleepTimerActive, setSleepTimerActive] = useState(false);
  const [sleepTimerDuration, setSleepTimerDuration] = useState(30); // minutes
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState(0); // seconds
  const [nightModeEnabled, setNightModeEnabled] = useState(false);
  const [dimLevel, setDimLevel] = useState(70); // percentage
  
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(0);

  // Theme colors
  const themeColors = {
    forest: { primary: '#1a4d2e', secondary: '#4f772d', accent: '#8fbc8f' },
    ocean: { primary: '#1e40af', secondary: '#3b82f6', accent: '#06b6d4' },
    sunset: { primary: '#dc2626', secondary: '#f97316', accent: '#fbbf24' },
    night: { primary: '#1e3a8a', secondary: '#3b82f6', accent: '#f59e0b' },
  };

  const currentThemeColors = themeColors[theme];

  // Load reading progress
  useEffect(() => {
    if (user?.readingProgress?.[bookId]) {
      setCurrentPage(user.readingProgress[bookId]);
    }
  }, [user, bookId]);

  // Save reading progress
  const saveProgress = (page: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      readingProgress: {
        ...user.readingProgress,
        [bookId]: page
      }
    };
    setUser(updatedUser);
  };

  // Handle page changes
  const goToNextPage = () => {
    if (currentPage < bookContent.length - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      saveProgress(newPage);
    } else {
      // Book completed
      setAutoRotate(false);
      setIsPlaying(false);
      toast.success('Book completed! 🎉', {
        description: 'You\'ve finished reading this wonderful story!',
      });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      saveProgress(newPage);
    }
  };

  // Auto-rotation functionality
  useEffect(() => {
    if (autoRotate && isPlaying && !isPaused) {
      const timeToWait = remainingTimeRef.current > 0 ? remainingTimeRef.current : rotationSpeed * 1000;
      
      autoRotateTimerRef.current = setTimeout(() => {
        goToNextPage();
        remainingTimeRef.current = 0;
      }, timeToWait);
    }

    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
    };
  }, [autoRotate, isPlaying, isPaused, currentPage, rotationSpeed]);

  // Handle play/pause
  const handlePlayPause = () => {
    if (!autoRotate) {
      setAutoRotate(true);
      setIsPlaying(true);
      toast.success('Auto-rotation enabled', {
        description: `Pages will turn every ${rotationSpeed} seconds`,
      });
    } else {
      setIsPlaying(!isPlaying);
      if (isPlaying) {
        // Calculate remaining time when pausing
        pauseTimeRef.current = Date.now();
      } else {
        // Resume with remaining time
        const pauseDuration = Date.now() - pauseTimeRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - pauseDuration);
      }
    }
  };

  const stopAutoRotation = () => {
    setAutoRotate(false);
    setIsPlaying(false);
    remainingTimeRef.current = 0;
    toast.info('Auto-rotation stopped');
  };

  // Handle visibility change (phone calls, app switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // App goes to background
        if (isPlaying && autoRotate) {
          setIsPaused(true);
          pauseTimeRef.current = Date.now();
          
          // Calculate how much time has passed in current rotation
          if (autoRotateTimerRef.current) {
            clearTimeout(autoRotateTimerRef.current);
          }
          
          toast.info('Reading paused', {
            description: 'Your reading session has been paused',
            duration: 2000,
          });
        }
      } else {
        // App comes to foreground
        if (isPaused && autoRotate) {
          setIsPaused(false);
          
          toast.success('Welcome back!', {
            description: 'Continue reading where you left off',
            duration: 2000,
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying, autoRotate, isPaused]);

  // Handle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Bookmark removed' : 'Page bookmarked');
  };

  // Sleep Timer Logic
  useEffect(() => {
    if (sleepTimerActive && sleepTimerRemaining > 0) {
      // Show warning at 5 minutes
      if (sleepTimerRemaining === 300) {
        toast.info('Sleep timer', {
          description: '5 minutes remaining until reading stops',
          duration: 5000,
        });
      }
      
      // Show warning at 1 minute
      if (sleepTimerRemaining === 60) {
        toast.warning('Sleep timer', {
          description: '1 minute remaining',
          duration: 5000,
        });
      }

      // Show warning at 30 seconds
      if (sleepTimerRemaining === 30) {
        toast.warning('Sleep timer', {
          description: '30 seconds remaining',
          duration: 3000,
        });
      }
    }

    // Timer expired
    if (sleepTimerActive && sleepTimerRemaining <= 0) {
      // Stop auto-rotation
      setAutoRotate(false);
      setIsPlaying(false);
      setSleepTimerActive(false);
      
      // Clear timer
      if (sleepTimerRef.current) {
        clearInterval(sleepTimerRef.current);
      }

      // Save current page
      saveProgress(currentPage);

      // Show completion message with logout
      toast.success('Time to sleep! 🌙', {
        description: 'Logging you out... Sweet dreams! Your progress has been saved.',
        duration: 4000,
      });
      
      // Log out user after 2 seconds
      setTimeout(() => {
        setUser(null);
        localStorage.removeItem('currentUser');
      }, 2000);
    }

    return () => {
      if (sleepTimerRef.current && !sleepTimerActive) {
        clearInterval(sleepTimerRef.current);
      }
    };
  }, [sleepTimerActive, sleepTimerRemaining, nightModeEnabled]);

  // Start sleep timer
  const startSleepTimer = (minutes: number) => {
    setSleepTimerActive(true);
    setSleepTimerDuration(minutes);
    setSleepTimerRemaining(minutes * 60);
    
    if (sleepTimerRef.current) {
      clearInterval(sleepTimerRef.current);
    }
    
    sleepTimerRef.current = setInterval(() => {
      setSleepTimerRemaining((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast.success('Sleep timer set', {
      description: `Reading will stop in ${minutes} minutes`,
      duration: 3000,
    });
  };

  // Stop sleep timer
  const stopSleepTimer = () => {
    setSleepTimerActive(false);
    if (sleepTimerRef.current) {
      clearInterval(sleepTimerRef.current);
    }
    toast.info('Sleep timer cancelled');
  };

  // Format time remaining for display
  const formatTimeRemaining = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress
  const progress = ((currentPage + 1) / bookContent.length) * 100;

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="h-full flex flex-col p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Badge 
            style={{ 
              backgroundColor: currentThemeColors.primary,
              color: '#ffffff' 
            }}
          >
            Page {currentPage + 1} of {bookContent.length}
          </Badge>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{bookTitle}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full"
              style={{ backgroundColor: currentThemeColors.primary }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Sleep Timer Status Indicator */}
        {sleepTimerActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card style={{ backgroundColor: currentThemeColors.primary + '15', borderColor: currentThemeColors.primary }}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" style={{ color: currentThemeColors.primary }} />
                    <div>
                      <p className="text-sm font-medium">Sleep Timer Active</p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimeRemaining(sleepTimerRemaining)} remaining
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={stopSleepTimer}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {/* Timer progress bar */}
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: currentThemeColors.accent }}
                    initial={{ width: '100%' }}
                    animate={{ width: `${(sleepTimerRemaining / (sleepTimerDuration * 60)) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card>
                <CardContent className="p-4 space-y-4">
                  {/* Auto-rotation controls */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RotateCw className="w-4 h-4" style={{ color: currentThemeColors.primary }} />
                        <span className="font-medium">Auto Page Turn</span>
                      </div>
                      <Switch
                        checked={autoRotate}
                        onCheckedChange={(checked) => {
                          if (!checked) {
                            stopAutoRotation();
                          } else {
                            setAutoRotate(true);
                          }
                        }}
                      />
                    </div>

                    {autoRotate && (
                      <div className="space-y-2 pl-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Speed</span>
                          <span className="font-medium">{rotationSpeed}s per page</span>
                        </div>
                        <Slider
                          value={[rotationSpeed]}
                          onValueChange={(value) => {
                            setRotationSpeed(value[0]);
                            if (isPlaying) {
                              remainingTimeRef.current = value[0] * 1000;
                            }
                          }}
                          min={3}
                          max={15}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Audio toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {audioEnabled ? (
                        <Volume2 className="w-4 h-4" style={{ color: currentThemeColors.primary }} />
                      ) : (
                        <VolumeX className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="font-medium">Read Aloud</span>
                    </div>
                    <Switch
                      checked={audioEnabled}
                      onCheckedChange={setAudioEnabled}
                    />
                  </div>

                  {/* Sleep Timer */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: currentThemeColors.primary }} />
                        <span className="font-medium">Sleep Timer</span>
                      </div>
                      <Switch
                        checked={sleepTimerActive}
                        onCheckedChange={(checked) => {
                          if (!checked) {
                            stopSleepTimer();
                          } else {
                            startSleepTimer(sleepTimerDuration);
                          }
                        }}
                      />
                    </div>

                    {!sleepTimerActive && (
                      <div className="pl-6">
                        <p className="text-xs text-muted-foreground mb-2">Quick presets:</p>
                        <div className="grid grid-cols-4 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startSleepTimer(15)}
                            className="text-xs"
                          >
                            15m
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startSleepTimer(30)}
                            className="text-xs"
                          >
                            30m
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startSleepTimer(45)}
                            className="text-xs"
                          >
                            45m
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startSleepTimer(60)}
                            className="text-xs"
                          >
                            60m
                          </Button>
                        </div>
                      </div>
                    )}

                    {sleepTimerActive && (
                      <div className="space-y-2 pl-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time Remaining</span>
                          <span className="font-medium">{formatTimeRemaining(sleepTimerRemaining)}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newDuration = sleepTimerDuration + 5;
                              setSleepTimerDuration(newDuration);
                              setSleepTimerRemaining(sleepTimerRemaining + 300);
                              toast.info('Added 5 minutes');
                            }}
                            className="flex-1 text-xs"
                          >
                            +5 min
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newDuration = sleepTimerDuration + 10;
                              setSleepTimerDuration(newDuration);
                              setSleepTimerRemaining(sleepTimerRemaining + 600);
                              toast.info('Added 10 minutes');
                            }}
                            className="flex-1 text-xs"
                          >
                            +10 min
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Night Mode */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {nightModeEnabled ? (
                          <Moon className="w-4 h-4" style={{ color: currentThemeColors.primary }} />
                        ) : (
                          <Sun className="w-4 h-4" style={{ color: currentThemeColors.primary }} />
                        )}
                        <span className="font-medium">Night Mode</span>
                      </div>
                      <Switch
                        checked={nightModeEnabled}
                        onCheckedChange={(checked) => {
                          setNightModeEnabled(checked);
                          if (checked) {
                            document.body.style.backgroundColor = '#1e3a8a';
                            document.body.style.color = '#ffffff';
                          } else {
                            document.body.style.backgroundColor = '';
                            document.body.style.color = '';
                          }
                        }}
                      />
                    </div>

                    {nightModeEnabled && (
                      <div className="space-y-2 pl-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Dim Level</span>
                          <span className="font-medium">{dimLevel}%</span>
                        </div>
                        <Slider
                          value={[dimLevel]}
                          onValueChange={(value) => {
                            setDimLevel(value[0]);
                            document.body.style.backgroundColor = `rgba(30, 58, 138, ${value[0] / 100})`;
                          }}
                          min={30}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reading Content */}
        <Card className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <CardContent className="p-6 h-full overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {bookContent[currentPage]}
                  </p>
                </div>

                {/* Paused Overlay */}
                {isPaused && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center text-white space-y-2">
                      <Pause className="w-12 h-12 mx-auto" />
                      <p className="font-medium">Reading Paused</p>
                      <p className="text-sm opacity-80">Come back to continue</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </motion.div>
          </AnimatePresence>
        </Card>

        {/* Bottom Controls */}
        <div className="space-y-3">
          {/* Auto-rotation status */}
          {autoRotate && (
            <div className="flex items-center justify-center gap-2 text-sm">
              <Timer className="w-4 h-4" style={{ color: currentThemeColors.primary }} />
              <span className="text-muted-foreground">
                {isPlaying ? (isPaused ? 'Paused' : 'Auto-turning pages') : 'Ready to start'}
              </span>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {/* Play/Pause or Next Button */}
            {autoRotate ? (
              <Button
                onClick={handlePlayPause}
                style={{ 
                  backgroundColor: isPlaying ? currentThemeColors.secondary : currentThemeColors.primary,
                  color: '#ffffff'
                }}
                className="gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Play
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={toggleBookmark}
                variant="outline"
                className="gap-2"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
            )}

            {/* Next Button */}
            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === bookContent.length - 1}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Auto-rotation stop button */}
          {autoRotate && (
            <Button
              variant="ghost"
              onClick={stopAutoRotation}
              className="w-full gap-2"
              size="sm"
            >
              <RefreshCw className="w-3 h-3" />
              Stop Auto-rotation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
