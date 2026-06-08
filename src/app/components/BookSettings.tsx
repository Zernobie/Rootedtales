import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { BackButton } from './BackButton';
import { 
  BookOpen, 
  Type, 
  RotateCcw, 
  Sun,
  Smartphone,
  Monitor,
  Clock,
  Moon,
  Bell,
  Sparkles
} from 'lucide-react';
import { User } from '../App';
import { toast } from "sonner@2.0.3";

interface BookSettingsProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export function BookSettings({ user, setUser }: BookSettingsProps) {
  const [keepScreenOn, setKeepScreenOn] = useState(false);
  const [chapterCompletion, setChapterCompletion] = useState(true);

  const updatePreference = (key: keyof User['preferences'], value: any) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        [key]: value
      }
    };
    setUser(updatedUser);
  };

  const updateAudioSetting = (key: keyof User['preferences']['audioSettings'], value: any) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        audioSettings: {
          ...user.preferences.audioSettings,
          [key]: value
        }
      }
    };
    setUser(updatedUser);
  };

  // Wake Lock API for keeping screen on
  const toggleKeepScreenOn = async (checked: boolean) => {
    setKeepScreenOn(checked);
    
    if (checked) {
      try {
        if ('wakeLock' in navigator) {
          // @ts-ignore - Wake Lock API
          const wakeLock = await navigator.wakeLock.request('screen');
          toast.success('Screen will stay on while reading! 📱', {
            description: 'Your screen won\'t turn off during reading sessions',
            duration: 3000,
          });
        } else {
          toast.info('Keep Screen On enabled 📱', {
            description: 'Feature activated (Note: Wake Lock API not supported on this device)',
            duration: 3000,
          });
        }
      } catch (err) {
        console.error('Wake Lock error:', err);
        toast.error('Could not enable Wake Lock', {
          description: 'Your device may not support this feature',
        });
      }
    } else {
      toast.info('Screen will sleep normally 💤', {
        description: 'Device will follow normal sleep settings',
        duration: 2000,
      });
    }
  };

  const toggleChapterCompletion = (checked: boolean) => {
    setChapterCompletion(checked);
    
    if (checked) {
      toast.success('Chapter celebrations enabled! 🎉', {
        description: 'You\'ll see a celebration when completing chapters',
        duration: 2000,
      });
    } else {
      toast.info('Chapter celebrations disabled', {
        description: 'Chapters will complete quietly',
        duration: 2000,
      });
    }
  };

  const handleSleepTimerChange = (minutes: string) => {
    const mins = parseInt(minutes);
    updateAudioSetting('sleepTimer', mins);
    
    if (mins === 0) {
      toast.info('Sleep timer disabled', {
        description: 'No automatic pause scheduled',
        duration: 2000,
      });
    } else {
      toast.success(`Sleep timer set to ${mins} minutes ⏰`, {
        description: `Reading will pause automatically after ${mins} minutes`,
        duration: 3000,
      });
    }
  };

  const sleepTimerValue = user?.preferences.audioSettings.sleepTimer || 0;

  return (
    <div className="h-full overflow-y-auto bg-background book-settings-screen pb-24">
      {/* Back Button */}
      <BackButton onBack={() => window.history.back()} />
      
      <div className="p-6 space-y-6 screen-transparent-bg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-[rgb(255,255,255)] mb-2">
            Reading Settings
          </h1>
          <p className="text-[rgb(255,255,255)]">
            Customize your reading experience
          </p>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="display" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="reading">Reading</TabsTrigger>
            </TabsList>

            <TabsContent value="display" className="space-y-4">
              {/* Font Size */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Type className="w-5 h-5 mr-2" />
                    Font Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Font Size</label>
                      <Badge variant="outline">
                        {user?.preferences.fontSize || 'medium'}
                      </Badge>
                    </div>
                    <Select 
                      value={user?.preferences.fontSize || 'medium'}
                      onValueChange={(value: 'small' | 'medium' | 'large') => {
                        updatePreference('fontSize', value);
                        toast.success('Font size updated! 📝', {
                          description: `Text is now ${value} size`,
                          duration: 2000,
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Font Size Preview */}
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <p className={`${
                      user?.preferences.fontSize === 'small' ? 'text-sm' :
                      user?.preferences.fontSize === 'large' ? 'text-lg' :
                      'text-base'
                    }`}>
                      Once upon a time, in the lush green forests of the Himalayas, lived a friendly red panda named Rusty...
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Screen Orientation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Screen Orientation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-Rotate</p>
                      <p className="text-sm text-muted-foreground">
                        Allow screen to rotate automatically
                      </p>
                    </div>
                    <Switch
                      checked={user?.preferences.autoRotate || false}
                      onCheckedChange={async (checked) => {
                        updatePreference('autoRotate', checked);
                        
                        // Lock or unlock screen orientation
                        try {
                          if (checked) {
                            // Unlock orientation - allow auto-rotate
                            if (screen.orientation && screen.orientation.unlock) {
                              await screen.orientation.unlock();
                              toast.success('Auto-rotate enabled! 🔄', {
                                description: 'Screen will rotate with device orientation',
                                duration: 2000,
                              });
                            } else {
                              toast.info('Auto-rotate enabled! 🔄', {
                                description: 'Feature may not be fully supported on this device',
                                duration: 2000,
                              });
                            }
                          } else {
                            // Lock to portrait orientation
                            if (screen.orientation && screen.orientation.lock) {
                              await screen.orientation.lock('portrait-primary');
                              toast.success('Screen locked to portrait! 📱', {
                                description: 'Screen orientation is locked',
                                duration: 2000,
                              });
                            } else {
                              toast.info('Auto-rotate disabled', {
                                description: 'Feature may not be fully supported on this device',
                                duration: 2000,
                              });
                            }
                          }
                        } catch (error) {
                          console.error('Screen orientation error:', error);
                          toast.success(
                            checked ? 'Auto-rotate enabled! 🔄' : 'Auto-rotate disabled',
                            {
                              description: 'Setting saved (limited browser support)',
                              duration: 2000,
                            }
                          );
                        }
                      }}
                    />
                  </div>

                  <motion.div 
                    className="grid grid-cols-2 gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="border rounded-lg p-3 text-center bg-muted/30">
                      <Smartphone className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-xs font-medium">Portrait</p>
                    </div>
                    <div className={`border rounded-lg p-3 text-center ${user?.preferences.autoRotate ? 'bg-primary/10 border-primary' : 'bg-muted/30'}`}>
                      <Monitor className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs font-medium">Landscape</p>
                      {user?.preferences.autoRotate && (
                        <p className="text-[10px] text-primary mt-1">Enabled</p>
                      )}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reading" className="space-y-4">
              {/* Screen Control */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Monitor className="w-5 h-5 mr-2" />
                    Screen Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4" />
                      <div>
                        <p className="font-medium">Keep Screen On</p>
                        <p className="text-sm text-muted-foreground">
                          Prevent screen from sleeping while reading
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={keepScreenOn}
                      onCheckedChange={toggleKeepScreenOn}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🐼</span>
                      <div>
                        <p className="font-medium">Interactive Cursor</p>
                        <p className="text-sm text-muted-foreground">
                          Cute red panda follows your cursor
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={user?.preferences.interactiveCursor || false}
                      onCheckedChange={(checked) => {
                        updatePreference('interactiveCursor', checked);
                        toast.success(
                          checked ? 'Red Panda companion enabled! 🐼' : 'Red Panda companion disabled',
                          {
                            description: checked 
                              ? 'Your cute companion will follow your cursor' 
                              : 'Companion is now resting',
                            duration: 2000,
                          }
                        );
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Sleep Timer - For Bedtime & Screen Time */}
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Moon className="w-5 h-5 mr-2 text-purple-600" />
                    <span className="text-purple-900">Sleep Timer</span>
                    <Badge className="ml-2 bg-purple-600">Bedtime Control</Badge>
                  </CardTitle>
                  <p className="text-sm text-purple-700">
                    Monitor screen time and set bedtime for kids
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-purple-900">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Auto-Pause After
                      </label>
                      <Badge variant="outline" className="border-purple-300 text-purple-700">
                        {sleepTimerValue === 0 ? 'Off' : `${sleepTimerValue} min`}
                      </Badge>
                    </div>
                    <Select 
                      value={sleepTimerValue.toString()}
                      onValueChange={handleSleepTimerChange}
                    >
                      <SelectTrigger className="border-purple-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Off</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {sleepTimerValue > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-white/50 p-4 rounded-lg border border-purple-200"
                    >
                      <div className="flex items-start gap-3">
                        <Bell className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-purple-900">
                            Sleep Timer Active
                          </p>
                          <p className="text-xs text-purple-700 mt-1">
                            Reading will pause automatically after <strong>{sleepTimerValue} minutes</strong>. 
                            Perfect for bedtime routines and managing screen time! 🌙
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="bg-purple-100/50 p-3 rounded-lg">
                    <p className="text-xs text-purple-800">
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      <strong>Parent Tip:</strong> Use the sleep timer to help establish healthy 
                      bedtime routines and monitor your child's screen time during reading sessions.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Reading Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Reading Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reading Reminders</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new books and reading goals
                      </p>
                    </div>
                    <Switch
                      checked={user?.preferences.notifications || false}
                      onCheckedChange={(checked) => {
                        updatePreference('notifications', checked);
                        toast.success(
                          checked ? 'Reading reminders enabled! 🔔' : 'Reading reminders disabled',
                          {
                            description: checked 
                              ? 'We\'ll notify you about new books and goals' 
                              : 'You won\'t receive reading notifications',
                            duration: 2000,
                          }
                        );
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Chapter Completion</p>
                      <p className="text-sm text-muted-foreground">
                        Celebrate when you finish a chapter
                      </p>
                    </div>
                    <Switch
                      checked={chapterCompletion}
                      onCheckedChange={toggleChapterCompletion}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Background Sounds</p>
                      <p className="text-sm text-muted-foreground">
                        Ambient forest sounds while reading
                      </p>
                    </div>
                    <Switch
                      checked={user?.preferences.backgroundSounds || false}
                      onCheckedChange={(checked) => {
                        updatePreference('backgroundSounds', checked);
                        toast.success(
                          checked ? 'Background sounds enabled! 🎵' : 'Background sounds disabled',
                          {
                            description: checked 
                              ? 'Enjoy peaceful forest ambiance' 
                              : 'Reading will be silent',
                            duration: 2000,
                          }
                        );
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}