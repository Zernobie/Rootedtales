import React, { useState } from 'react';
import { motion } from 'motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { SupportChatbot } from './SupportChatbot';
import { 
  Settings,
  User,
  Mail,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Trash2,
  Check,
  X,
  ExternalLink,
  Info,
  BookOpen,
  Heart,
  Star,
  Trophy,
  TrendingUp,
  MessageCircle,
  Download,
  Volume2,
  HelpCircle,
  MessageSquare,
  Bot,
  Globe,
  Instagram,
  BarChart3,
  Clock,
  Award,
  Users,
  Moon
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AccountSectionProps {
  user: any;
  setUser: (user: any) => void;
  onNavigate?: (screen: string) => void;
}

export function AccountSection({ user, setUser, onNavigate }: AccountSectionProps) {
  const [showChatbot, setShowChatbot] = useState(false);
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    newBooks: true,
    achievements: true,
    dailyReminder: true,
    weeklyReport: true,
    specialOffers: false,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00'
  });
  
  const handleNotificationToggle = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
    toast.success(`${setting.replace(/([A-Z])/g, ' $1').trim()} ${value ? 'enabled' : 'disabled'}`, {
      description: 'Notification preferences updated',
    });
  };

  const handlePrivacySetting = (setting: string, value: string) => {
    toast.success(`${setting} ${value}`, {
      description: 'Your privacy preferences have been updated',
    });
  };

  const handleDataManagement = (action: string) => {
    if (action === 'download') {
      toast.success('Data download initiated', {
        description: 'Your data will be emailed to you within 24 hours',
      });
    } else if (action === 'delete') {
      toast.error('Account deletion requested', {
        description: 'Please check your email to confirm',
      });
    }
  };

  const handleSupportAction = (action: string) => {
    switch (action) {
      case 'email':
        toast.success('Support email opened');
        break;
      case 'download-help':
        toast.info('Opening download guide');
        break;
      case 'audio-help':
        toast.info('Opening audio settings help');
        break;
      case 'account-help':
        toast.info('Opening account management guide');
        break;
      case 'purchase-help':
        toast.info('Opening purchase support');
        break;
      case 'rate':
        toast.success('Thank you for your feedback!');
        break;
    }
  };

  const readingStats = {
    totalBooks: user?.purchasedBooks?.length || 3,
    totalReadingTime: '12.5 hours',
    currentStreak: 5,
    longestStreak: 12,
    favoriteGenre: 'Forest Adventures',
    completionRate: 85,
    averageRating: 4.8,
    booksThisMonth: 2
  };

  const achievements = [
    { title: 'First Book', description: 'Read your first complete book', earned: true },
    { title: 'Speed Reader', description: 'Read 5 books in one week', earned: true },
    { title: 'Forest Explorer', description: 'Complete all Forest series books', earned: false },
    { title: 'Daily Reader', description: 'Read for 30 consecutive days', earned: false }
  ];

  return (
    <div className="h-full overflow-y-auto bg-background account-screen">
      <div className="p-6 space-y-6 screen-transparent-bg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-[rgb(255,255,255)] mb-2">
            Account & Settings
          </h1>
          <p className="text-[rgb(255,255,255)]">
            Your reading journey and app information
          </p>
        </motion.div>

        {/* Account Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="notifications">Alerts</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-4">
              {/* Reading Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Reading Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg backdrop-blur-lg bg-opacity-75 border border-white/30 shadow-xl">
                      <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2 drop-shadow-lg" />
                      <div className="text-2xl font-bold text-blue-600">{readingStats.totalBooks}</div>
                      <div className="text-sm text-muted-foreground">Books Read</div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-lg backdrop-blur-lg bg-opacity-75 border border-white/30 shadow-xl">
                      <Clock className="w-8 h-8 text-green-600 mx-auto mb-2 drop-shadow-lg" />
                      <div className="text-2xl font-bold text-green-600">{readingStats.totalReadingTime}</div>
                      <div className="text-sm text-muted-foreground">Reading Time</div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg backdrop-blur-lg bg-opacity-75 border border-white/30 shadow-xl">
                      <Star className="w-8 h-8 text-purple-600 mx-auto mb-2 drop-shadow-lg" />
                      <div className="text-2xl font-bold text-purple-600">{readingStats.currentStreak}</div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                    
                    <div className="text-center p-4 bg-orange-50 rounded-lg backdrop-blur-lg bg-opacity-75 border border-white/30 shadow-xl">
                      <Award className="w-8 h-8 text-orange-600 mx-auto mb-2 drop-shadow-lg" />
                      <div className="text-2xl font-bold text-orange-600">{readingStats.averageRating}</div>
                      <div className="text-sm text-muted-foreground">Avg Rating</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Monthly Goal Progress</span>
                        <span>{readingStats.booksThisMonth}/3 books</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(readingStats.booksThisMonth / 3) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Favorite Genre</span>
                      <Badge className="bg-green-500 text-white">{readingStats.favoriteGenre}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Longest Streak</span>
                      <span className="font-bold">{readingStats.longestStreak} days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements section removed - now shown in Profile view */}
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">New Books</p>
                      <p className="text-sm text-muted-foreground">Get notified about new releases</p>
                    </div>
                    <Switch
                      checked={notificationSettings.newBooks}
                      onCheckedChange={(value) => handleNotificationToggle('newBooks', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Achievements</p>
                      <p className="text-sm text-muted-foreground">Celebrate your milestones</p>
                    </div>
                    <Switch
                      checked={notificationSettings.achievements}
                      onCheckedChange={(value) => handleNotificationToggle('achievements', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Daily Reading Reminder</p>
                      <p className="text-sm text-muted-foreground">Stay on track with daily prompts</p>
                    </div>
                    <Switch
                      checked={notificationSettings.dailyReminder}
                      onCheckedChange={(value) => handleNotificationToggle('dailyReminder', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Weekly Report</p>
                      <p className="text-sm text-muted-foreground">Summary of your reading activity</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReport}
                      onCheckedChange={(value) => handleNotificationToggle('weeklyReport', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Special Offers</p>
                      <p className="text-sm text-muted-foreground">Exclusive deals and promotions</p>
                    </div>
                    <Switch
                      checked={notificationSettings.specialOffers}
                      onCheckedChange={(value) => handleNotificationToggle('specialOffers', value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Volume2 className="w-5 h-5 mr-2" />
                    Notification Behavior
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Sound</p>
                      <p className="text-sm text-muted-foreground">Play sound for notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.soundEnabled}
                      onCheckedChange={(value) => handleNotificationToggle('soundEnabled', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Vibration</p>
                      <p className="text-sm text-muted-foreground">Vibrate on notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.vibrationEnabled}
                      onCheckedChange={(value) => handleNotificationToggle('vibrationEnabled', value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quiet Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Moon className="w-5 h-5 mr-2" />
                    Quiet Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Enable Quiet Hours</p>
                      <p className="text-sm text-muted-foreground">Silence notifications during rest time</p>
                    </div>
                    <Switch
                      checked={notificationSettings.quietHours}
                      onCheckedChange={(value) => handleNotificationToggle('quietHours', value)}
                    />
                  </div>

                  {notificationSettings.quietHours && (
                    <div className="space-y-3 border-t pt-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Start Time</label>
                        <Badge variant="secondary">{notificationSettings.quietStart}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">End Time</label>
                        <Badge variant="secondary">{notificationSettings.quietEnd}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground text-center p-2 bg-blue-50 rounded">
                        🌙 Notifications will be silenced from {notificationSettings.quietStart} to {notificationSettings.quietEnd}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4">
              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Reading Analytics</p>
                        <p className="text-sm text-muted-foreground">Allow collection of reading habits for recommendations</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePrivacySetting('Reading Analytics', 'disabled')}
                      >
                        Enabled
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications about new releases</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePrivacySetting('Push Notifications', 'disabled')}
                      >
                        Enabled
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Data Sharing</p>
                        <p className="text-sm text-muted-foreground">Share anonymous usage data to improve the app</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePrivacySetting('Data Sharing', 'enabled')}
                      >
                        Disabled
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">Make your reading profile visible to other users</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePrivacySetting('Profile Visibility', 'public')}
                      >
                        Private
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Data Management</h4>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleDataManagement('download')}
                      >
                        Download My Data
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-red-600 hover:text-red-700"
                        onClick={() => handleDataManagement('delete')}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="space-y-4">
              {/* Contact Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contact Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-muted/50 rounded-lg">
                    <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Need Help?</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Our support team is here to help with any questions or issues you may have.
                    </p>
                    <p className="text-sm font-medium text-primary mb-4">
                      hub@xenwinx.com
                    </p>
                    <div className="space-y-2">
                      <Button 
                        className="w-full"
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate('faq');
                          } else {
                            toast.info('Opening FAQ & Support page');
                          }
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        View FAQ & Support
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          window.location.href = 'mailto:hub@xenwinx.com';
                          toast.success('Opening email client');
                        }}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Chatbot */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="text-blue-900">AI Chat Assistant</span>
                  </CardTitle>
                  <p className="text-sm text-blue-700">
                    Get instant answers from Akai, your reading companion! 🐼
                  </p>
                </CardHeader>
                <CardContent>
                  {!showChatbot ? (
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Chat with Akai for instant help with:
                      </p>
                      <div className="text-left text-sm text-muted-foreground mb-4 space-y-1">
                        <p>• Account & Login questions</p>
                        <p>• Downloading books</p>
                        <p>• Membership & payments</p>
                        <p>• App features & settings</p>
                        <p>• Troubleshooting help</p>
                      </div>
                      <Button
                        onClick={() => setShowChatbot(true)}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Start Chat with Akai
                      </Button>
                    </div>
                  ) : (
                    <div className="h-[500px]">
                      <SupportChatbot onClose={() => setShowChatbot(false)} />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Help Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Quick Help
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleSupportAction('download-help')}
                    >
                      How to download books
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleSupportAction('audio-help')}
                    >
                      Audio settings help
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleSupportAction('account-help')}
                    >
                      Account management
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleSupportAction('purchase-help')}
                    >
                      Purchase support
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* App Info */}
              <Card>
                <CardHeader>
                  <CardTitle>App Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span className="font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-medium">Dec 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">App Size</span>
                    <span className="font-medium">45.2 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Downloads</span>
                    <span className="font-medium">10K+</span>
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
