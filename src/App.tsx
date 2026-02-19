console.log('App.tsx is rendering');
import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { LandingPage } from './components/LandingPage';
import { AuthScreen } from './components/AuthScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { CharacterGallery } from './components/CharacterGallery';
import { SearchScreen } from './components/SearchScreen';
import { AudioSettings } from './components/AudioSettings';
import { BookSettings } from './components/BookSettings';
import { EnhancedUserProfile } from './components/EnhancedUserProfile';
import { ExitScreen } from './components/ExitScreen';
import { AdminScreen } from './components/AdminScreen';
import { MiniGames } from './components/MiniGames';
import { Store } from './components/Store';
import { ThemeSelection } from './components/ThemeSelection';
import { AccountSection } from './components/AccountSection';
import { BookOverview } from './components/BookOverview';
import { HistoryScreen } from './components/HistoryScreen';
import { DailyReward } from './components/DailyReward';
import { BadgeCollection } from './components/BadgeCollection';
import { BookReader } from './components/BookReader';
import { BottomNavigation } from './components/BottomNavigation';
import { EnhancedMenubar } from './components/EnhancedMenubar';
import { SlidingSidebar } from './components/SlidingSidebar';
import { BackgroundImage } from './components/BackgroundImage';
import { InteractiveCursor } from './components/InteractiveCursor';
import { SignInPrompt } from './components/SignInPrompt';
import { LogoutDialog } from './components/LogoutDialog';
import { FAQSupport } from './components/FAQSupport';
import { Toaster } from './components/ui/sonner';

// Mobile app utilities and hooks
import { useDeviceDetection } from './utils/deviceUtils';
import { useMobileOptimizations } from './utils/mobileUtils';
import { registerServiceWorker, showUpdateAvailableNotification } from './utils/serviceWorker';
import { Journal } from './components/Journal';
import { SubscriptionComparison } from './components/SubscriptionComparison';
import { ThemeAvatarSelection } from './components/ThemeAvatarSelection';

export type Screen =
  | 'splash'
  | 'loading'
  | 'home'
  | 'auth'
  | 'library'
  | 'characters'
  | 'search'
  | 'audio'
  | 'bookSettings'
  | 'profile'
  | 'exit'
  | 'admin'
  | 'minigames'
  | 'store'
  | 'themes'
  | 'account'
  | 'bookOverview'
  | 'history'
  | 'badges'
  | 'bookReader'
  | 'faq'
  | 'journal'
  | 'subscription';

export type Theme = 'forest' | 'ocean' | 'sunset' | 'night';

export interface User {
  id: string;
  email: string;
  username: string;
  isGuest: boolean;
  isAdmin: boolean;
  profilePicture?: string;
  avatar?: string; // Theme avatar image
  readingProgress: Record<string, number>;
  purchasedBooks: string[];
  gamePoints: number;
  theme: Theme;
  themeTitle?: string; // Dynamic theme-based title
  lastLoginDate?: string; // Track last login for daily rewards
  loginStreak?: number; // Track consecutive login days
  totalLogins?: number; // Track total number of logins
  readerStatus?: {
    totalReadingTime: number; // in minutes
    booksStarted: number;
    averageSessionTime: number; // in minutes
    lastActiveDate: string;
    activeStreak: number;
  };
  achievements: {
    booksCompleted: number;
    miniGamesPlayed: number;
    gamesWon: number; // Track successful game completions
    readingVictories: number;
    unlockedBadges: string[];
  };
  preferences: {
    fontSize: 'small' | 'medium' | 'large';
    autoRotate: boolean;
    notifications: boolean;
    backgroundSounds: boolean;
    voiceSettings: {
      voice: string;
      speed: number;
      volume: number;
      pitch: number;
      pauseDuration: number;
      emphasisLevel: number;
    };
    audioSettings: {
      spatialAudio: boolean;
      adaptiveVolume: boolean;
      immersiveMode: boolean;
      selectedBackgrounds: string[];
      sleepTimer: number;
      autoBookmark: boolean;
      wordHighlighting: boolean;
      pronunciationHelp: boolean;
      languageSupport: string;
      accessibility: boolean;
      offlineMode: boolean;
    };
    interactiveCursor: boolean;
  };
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showThemeAvatarSelection, setShowThemeAvatarSelection] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [promptFeature, setPromptFeature] = useState('this feature');
  const [promptDescription, setPromptDescription] = useState('');
  const [pendingScreen, setPendingScreen] = useState<Screen | null>(null);

  const [currentTheme, setCurrentTheme] = useState<Theme>('forest');
  const [selectedBookId, setSelectedBookId] = useState<string>('1');
  const [volume, setVolume] = useState<'high' | 'medium' | 'low' | 'mute'>('high');

  // Mobile app optimizations
  const deviceInfo = useDeviceDetection();
  useMobileOptimizations(deviceInfo);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('rootedTalesUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setCurrentTheme(parsedUser.theme || 'forest');
        // Check if daily reward should be shown
        checkDailyRewardEligibility(parsedUser);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('rootedTalesUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('rootedTalesUser');
    }
  }, [user]);

  // Check if user is eligible for daily reward
  const checkDailyRewardEligibility = (currentUser: User) => {
    if (currentUser.isGuest) return;

    const today = new Date().toDateString();
    const lastLogin = currentUser.lastLoginDate;

    if (lastLogin !== today) {
      setTimeout(() => setShowDailyReward(true), 500);
    }
  };

  // Service Worker registration for mobile app
  useEffect(() => {
    registerServiceWorker({
      onSuccess: (registration) => {
        console.log('Service Worker registered successfully');
      },
      onUpdate: (registration) => {
        console.log('App update available');
        showUpdateAvailableNotification();
      },
      onOfflineReady: () => {
        console.log('App ready to work offline');
      },
      onError: (error) => {
        console.error('Service Worker registration failed:', error);
      }
    });
  }, []);

  const handleBeginJourney = () => {
    setCurrentScreen('loading');
  };

  const handleLoadComplete = () => {
    setCurrentScreen('home');
  };

  const handleLogin = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      readingProgress: {},
      purchasedBooks: [],
      gamePoints: 0,
      theme: 'forest',
      themeTitle: getThemeUserTitle('forest'),
      lastLoginDate: undefined,
      loginStreak: 0,
      totalLogins: 0,
      achievements: {
        booksCompleted: 0,
        miniGamesPlayed: 0,
        gamesWon: 0, // Track successful game completions
        readingVictories: 0,
        unlockedBadges: []
      },
      preferences: {
        fontSize: 'medium',
        autoRotate: true,
        notifications: true,
        backgroundSounds: false,
        voiceSettings: {
          voice: 'luna-warm',
          speed: 1,
          volume: 75,
          pitch: 1,
          pauseDuration: 0.5,
          emphasisLevel: 1,
        },
        audioSettings: {
          spatialAudio: true,
          adaptiveVolume: false,
          immersiveMode: false,
          selectedBackgrounds: ['forest'],
          sleepTimer: 0,
          autoBookmark: true,
          wordHighlighting: true,
          pronunciationHelp: true,
          languageSupport: 'english',
          accessibility: false,
          offlineMode: false,
        },
        interactiveCursor: true,
      },
    };
    setUser(newUser);
    setCurrentScreen('home');
    // Show daily reward after login
    setTimeout(() => setShowDailyReward(true), 500);
  };

  const handleGuestLogin = () => {
    const guestUser: User = {
      id: 'guest',
      email: '',
      username: 'Guest User',
      isGuest: true,
      isAdmin: false,
      readingProgress: {},
      purchasedBooks: [],
      gamePoints: 0,
      theme: 'forest',
      themeTitle: getThemeUserTitle('forest'),
      lastLoginDate: undefined,
      loginStreak: 0,
      totalLogins: 0,
      achievements: {
        booksCompleted: 0,
        miniGamesPlayed: 0,
        gamesWon: 0, // Track successful game completions
        readingVictories: 0,
        unlockedBadges: []
      },
      preferences: {
        fontSize: 'medium',
        autoRotate: true,
        notifications: false,
        backgroundSounds: false,
        voiceSettings: {
          voice: 'luna-warm',
          speed: 1,
          volume: 75,
          pitch: 1,
          pauseDuration: 0.5,
          emphasisLevel: 1,
        },
        audioSettings: {
          spatialAudio: true,
          adaptiveVolume: false,
          immersiveMode: false,
          selectedBackgrounds: ['forest'],
          sleepTimer: 0,
          autoBookmark: true,
          wordHighlighting: true,
          pronunciationHelp: true,
          languageSupport: 'english',
          accessibility: false,
          offlineMode: false,
        },
        interactiveCursor: true,
      },
    };
    setUser(guestUser);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('home');
    setShowLogoutDialog(false);
  };

  const handleLogoutAndExit = () => {
    setUser(null);
    setShowLogoutDialog(false);
    setCurrentScreen('exit');
  };

  const handleShowLogoutDialog = () => {
    setShowLogoutDialog(true);
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    if (user) {
      setUser({
        ...user,
        theme,
        // Update theme-based title when theme changes
        themeTitle: getThemeUserTitle(theme)
      });
    }
  };

  // Helper function to get theme-based title
  const getThemeUserTitle = (theme: Theme): string => {
    switch (theme) {
      case 'forest': return 'Forest Visitor Reader Access';
      case 'ocean': return 'Ocean Explorer Reader Access';
      case 'sunset': return 'Sunset Wanderer Reader Access';
      case 'night': return 'Night Dreamer Reader Access';
      default: return 'Forest Visitor Reader Access';
    }
  };

  const handleVolumeChange = () => {
    const volumeStates: Array<'high' | 'medium' | 'low' | 'mute'> = ['high', 'medium', 'low', 'mute'];
    const currentIndex = volumeStates.indexOf(volume);
    const nextIndex = (currentIndex + 1) % volumeStates.length;
    setVolume(volumeStates[nextIndex]);

    // Update user volume preferences if user exists
    if (user) {
      const volumeMapping = { high: 100, medium: 75, low: 25, mute: 0 };
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          voiceSettings: {
            ...user.preferences.voiceSettings,
            volume: volumeMapping[volumeStates[nextIndex]]
          }
        }
      });
    }
  };

  // Sync volume with user preferences
  useEffect(() => {
    if (user) {
      const userVolume = user.preferences.voiceSettings.volume;
      if (userVolume > 75) setVolume('high');
      else if (userVolume > 50) setVolume('medium');
      else if (userVolume > 0) setVolume('low');
      else setVolume('mute');
    }
  }, [user]);

  // Helper function to check if guest access is allowed for a screen
  const checkGuestAccess = (screen: Screen): boolean => {
    const restrictedScreens: Screen[] = [
      'audio',
      'bookSettings',
      'profile',
      'admin',
      'store',
      'themes',
      'account',
      'badges',
      'minigames',
      'bookReader'
    ];
    return !restrictedScreens.includes(screen);
  };

  // Helper function to handle navigation with guest restrictions
  const handleNavigateWithGuestCheck = (screen: Screen, feature?: string, desc?: string) => {
    if (user?.isGuest && !checkGuestAccess(screen)) {
      setPromptFeature(feature || getFeatureName(screen));
      setPromptDescription(desc || '');
      setPendingScreen(screen);
      setShowSignInPrompt(true);
    } else {
      setCurrentScreen(screen);
    }
  };

  // Helper to get user-friendly feature names
  const getFeatureName = (screen: Screen): string => {
    const featureNames: Record<string, string> = {
      audio: 'Audio Settings',
      bookSettings: 'Reading Settings',
      profile: 'User Profile',
      admin: 'Admin Panel',
      store: 'the Store',
      themes: 'Theme Customization',
      account: 'Account Management',
      badges: 'Badge Collection',
      minigames: 'Mini Games',
      bookReader: 'Full Book Reading'
    };
    return featureNames[screen] || 'this feature';
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onBeginJourney={handleBeginJourney} />;
      case 'loading':
        return <LoadingScreen onLoadComplete={handleLoadComplete} />;
      case 'home':
        return (
          <LandingPage
            onSignIn={() => setCurrentScreen('auth')}
            onGuestMode={handleGuestLogin}
            theme={currentTheme}
            user={user}
          />
        );
      case 'auth':
        return (
          <AuthScreen
            onLogin={handleLogin}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'library':
        return <LibraryScreen user={user} setUser={setUser} theme={currentTheme} onNavigate={(screen, bookId) => {
          if (screen === 'bookOverview' && bookId) {
            setSelectedBookId(bookId);
          }
          setCurrentScreen(screen);
        }} />;
      case 'characters':
        return <CharacterGallery user={user} theme={currentTheme} />;
      case 'search':
        return <SearchScreen user={user} theme={currentTheme} setUser={setUser} />;
      case 'audio':
        return <AudioSettings user={user} setUser={setUser} />;
      case 'bookSettings':
        return <BookSettings user={user} setUser={setUser} />;
      case 'profile':
        return <EnhancedUserProfile
          user={user!}
          onUpdateUser={(updates) => {
            const updatedUser = { ...user!, ...updates };
            setUser(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          }}
          onNavigate={setCurrentScreen}
        />;
      case 'admin':
        return <AdminScreen user={user} />;
      case 'minigames':
        return <MiniGames user={user} setUser={setUser} />;
      case 'store':
        return <Store user={user} setUser={setUser} onNavigate={setCurrentScreen} />;
      case 'themes':
        return <ThemeSelection currentTheme={currentTheme} onThemeChange={handleThemeChange} />;
      case 'account':
        return <AccountSection user={user} setUser={setUser} onNavigate={setCurrentScreen} />;
      case 'history':
        return <HistoryScreen user={user} theme={currentTheme} setUser={setUser} />;
      case 'badges':
        return <BadgeCollection user={user} theme={currentTheme} />;
      case 'bookOverview':
        return (
          <BookOverview
            user={user}
            theme={currentTheme}
            selectedBookId={selectedBookId}
            onBack={() => setCurrentScreen('library')}
            onStartReading={(bookId) => {
              setSelectedBookId(bookId);
              setCurrentScreen('bookReader');
            }}
          />
        );
      case 'exit':
        return (
          <ExitScreen
            onExit={() => window.close()}
            onCancel={() => setCurrentScreen('home')}
          />
        );
      case 'bookReader':
        return (
          <BookReader
            user={user}
            setUser={setUser}
            theme={currentTheme}
            bookId={selectedBookId}
            bookTitle="The Adventures of Rusty the Red Panda"
            bookContent={[
              "Once upon a time, in the lush green forests of the Himalayas, lived a friendly and adventurous red panda named Rusty. Rusty loved exploring the forest and playing with his animal friends, but he often felt lonely because he was the only red panda in the forest.",
              "One day, Rusty met a group of young explorers who were hiking through the forest. The explorers were fascinated by Rusty's fluffy tail and adorable face, and Rusty was happy to have found new friends.",
              "The explorers introduced Rusty to their world of games and adventures, and Rusty introduced them to the hidden wonders of the forest. Together, they went on exciting expeditions, discovered new trails, and made unforgettable memories.",
              "But one day, Rusty's animal friends in the forest were in trouble, and Rusty had to leave his new friends to help them. The explorers were sad to see Rusty go, but they understood the importance of helping those in need.",
              "After Rusty saved his friends, he realized that he had learned a valuable lesson about the importance of friendship and being there for others. Rusty was happy to be back in the forest with his animal friends, but he also knew that he had made some wonderful new friends in the explorers.",
              "And so, Rusty continued to explore the forest and make new friends, always remembering the value of loyalty, kindness, and adventure. The End."
            ]}
            onBack={() => setCurrentScreen('bookOverview')}
          />
        );
      case 'faq':
        return <FAQSupport user={user} />;
      case 'journal':
        return <Journal user={user} theme={currentTheme} />;
      case 'subscription':
        return <SubscriptionComparison user={user} onSelectPlan={(planId) => {
          console.log('Selected plan:', planId);
          // In a real app, this would initiate the subscription flow
          setCurrentScreen('store');
        }} />;
      default:
        return (
          <LandingPage
            onSignIn={() => setCurrentScreen('auth')}
            onGuestMode={handleGuestLogin}
            theme={currentTheme}
            user={user}
          />
        );
    }
  };

  const shouldShowNavigation = !['splash', 'loading', 'auth', 'exit'].includes(currentScreen) && user !== null;

  // Theme-based background classes
  const themeClasses = {
    forest: 'theme-forest',
    ocean: 'theme-ocean',
    sunset: 'theme-sunset',
    night: 'theme-night'
  };

  // Font size classes based on user preferences
  const fontSizeClass = user?.preferences.fontSize ? `font-size-${user.preferences.fontSize}` : 'font-size-medium';

  return (
    <BackgroundImage theme={currentTheme}>
      <div className={`max-w-[385px] mx-auto h-screen bg-background/95 backdrop-blur-sm overflow-hidden relative ${themeClasses[currentTheme]} ${fontSizeClass}`}>
        {shouldShowNavigation && (
          <>
            <EnhancedMenubar
              currentScreen={currentScreen}
              setCurrentScreen={handleNavigateWithGuestCheck}
              user={user}
              onLogout={handleShowLogoutDialog}
              onExit={() => setCurrentScreen('exit')}
              theme={currentTheme}
              volume={volume}
              onVolumeChange={handleVolumeChange}
              onOpenSidebar={() => setIsSidebarOpen(true)}
            />
            <BottomNavigation
              currentScreen={currentScreen}
              setCurrentScreen={handleNavigateWithGuestCheck}
              theme={currentTheme}
              user={user}
            />
            <SlidingSidebar
              currentScreen={currentScreen}
              setCurrentScreen={handleNavigateWithGuestCheck}
              theme={currentTheme}
              user={user}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              onLogout={handleShowLogoutDialog}
            />
          </>
        )}

        <main className={`main-content h-full ${shouldShowNavigation ? 'has-navigation' : ''}`}>
          {renderScreen()}
        </main>

        {/* Interactive Cursor - Red Panda Companion */}
        <InteractiveCursor
          enabled={user?.preferences?.interactiveCursor ?? false}
          size={60}
        />

        {/* Toast notifications */}
        <Toaster position="top-center" />

        {/* Daily Reward Modal */}
        {showDailyReward && user && !user.isGuest && (
          <DailyReward
            user={user}
            setUser={setUser}
            onClose={() => setShowDailyReward(false)}
          />
        )}

        {/* Sign In Prompt */}
        {showSignInPrompt && (
          <SignInPrompt
            isOpen={showSignInPrompt}
            feature={promptFeature}
            description={promptDescription}
            onSignIn={() => {
              setShowSignInPrompt(false);
              setCurrentScreen('auth');
            }}
            onClose={() => {
              setShowSignInPrompt(false);
            }}
          />
        )}

        {/* Logout Dialog */}
        {showLogoutDialog && (
          <LogoutDialog
            isOpen={showLogoutDialog}
            username={user?.username}
            onLogout={handleLogout}
            onExit={handleLogoutAndExit}
            onCancel={() => {
              setShowLogoutDialog(false);
            }}
          />
        )}

        {/* Theme Avatar Selection */}
        {showThemeAvatarSelection && (
          <ThemeAvatarSelection
            isOpen={showThemeAvatarSelection}
            currentTheme={user?.theme || 'forest'}
            onComplete={(theme, avatar, customTitle) => {
              if (user) {
                setUser({
                  ...user,
                  theme: theme as Theme,
                  avatar: avatar,
                  themeTitle: customTitle || getThemeUserTitle(theme as Theme)
                });
                setCurrentTheme(theme as Theme);
              }
              setShowThemeAvatarSelection(false);
            }}
          />
        )}
      </div>
    </BackgroundImage>
  );
}
