import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark,
  BookmarkCheck,
  Settings,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Music,
  Volume2,
  VolumeX,
  Home,
  Save,
  BookOpen
} from 'lucide-react';
import { Theme, User } from '../App';
import { BookmarkPanel } from './BookmarkPanel';
import { SoundscapePlayer } from './SoundscapePlayer';
import { FlipPage } from './FlipPage';
import { toast } from 'sonner@2.0.3';
import { Card, CardContent } from './ui/card';

interface BookmarkData {
  id: string;
  pageNumber: number;
  timestamp: Date;
  note?: string;
}

interface ImmersiveBookReaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
  theme: Theme;
  bookId: string;
  bookTitle: string;
  bookContent: string[];
  contentType?: 'text' | 'image';  // NEW: Specify content type
  coverImage?: string;
  onBack: () => void;
  onPause?: () => void;
  onStop?: () => void;
}

export function ImmersiveBookReader({ 
  user, 
  setUser, 
  theme, 
  bookId, 
  bookTitle, 
  bookContent,
  contentType = 'text',  // NEW: default to text
  coverImage,
  onBack,
  onPause,
  onStop
}: ImmersiveBookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showSoundscape, setShowSoundscape] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [pageDirection, setPageDirection] = useState<'next' | 'prev'>('next');
  const [isFlipping, setIsFlipping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showEscHint, setShowEscHint] = useState(true);
  
  const readerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastSavedPageRef = useRef<number>(0);

  // Load reading progress and bookmarks
  useEffect(() => {
    if (user?.readingProgress?.[bookId]) {
      setCurrentPage(user.readingProgress[bookId]);
      lastSavedPageRef.current = user.readingProgress[bookId];
    }
    // Load bookmarks from user data
    const savedBookmarks = localStorage.getItem(`bookmarks_${bookId}`);
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    // Show ESC hint for 5 seconds on first load
    const escHintTimer = setTimeout(() => {
      setShowEscHint(false);
    }, 5000);

    return () => clearTimeout(escHintTimer);
  }, [user, bookId]);

  // Detect orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      setOrientation(isLandscape ? 'landscape' : 'portrait');
    };

    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  // Auto-save on page change (for app backgrounding/closing)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // App is being backgrounded (e.g., phone call received)
        saveProgress(currentPage);
        lastSavedPageRef.current = currentPage;
        console.log('Auto-saved progress on app background:', currentPage);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // App is closing accidentally
      saveProgress(currentPage);
      lastSavedPageRef.current = currentPage;
      console.log('Auto-saved progress on app close:', currentPage);
    };

    // Auto-save periodically (every 30 seconds if page changed)
    const autoSaveInterval = setInterval(() => {
      if (currentPage !== lastSavedPageRef.current) {
        saveProgress(currentPage);
        lastSavedPageRef.current = currentPage;
        console.log('Auto-saved progress (periodic):', currentPage);
      }
    }, 30000); // 30 seconds

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(autoSaveInterval);
    };
  }, [currentPage, bookId, user]);

  // Save progress on unmount (when component is destroyed)
  useEffect(() => {
    return () => {
      // Save one last time when reader closes
      if (currentPage !== lastSavedPageRef.current) {
        saveProgress(currentPage);
      }
    };
  }, [currentPage, bookId, user]);

  // ESC key handler - quick exit option
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // If exit modal is open, close it
        if (showExitModal) {
          setShowExitModal(false);
        } 
        // If bookmarks panel is open, close it
        else if (showBookmarks) {
          setShowBookmarks(false);
        }
        // If soundscape is open, close it
        else if (showSoundscape) {
          setShowSoundscape(false);
        }
        // Otherwise, show exit modal
        else {
          setShowExitModal(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showExitModal, showBookmarks, showSoundscape]);

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
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Auto-hide controls
  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Page navigation
  const goToPage = (page: number, direction: 'next' | 'prev') => {
    if (page < 0 || page >= bookContent.length || isFlipping) return;
    
    setPageDirection(direction);
    setIsFlipping(true);
    
    setTimeout(() => {
      setCurrentPage(page);
      saveProgress(page);
      setIsFlipping(false);
      setDragProgress(0);
    }, 600);
  };

  const nextPage = () => {
    if (currentPage < bookContent.length - 1) {
      goToPage(currentPage + 1, 'next');
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1, 'prev');
    }
  };

  // Touch/click handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    
    const deltaX = e.touches[0].clientX - touchStartRef.current.x;
    const containerWidth = readerRef.current?.offsetWidth || 385;
    const progress = Math.abs(deltaX) / containerWidth;
    
    if (Math.abs(deltaX) > 20) {
      setIsDragging(true);
      setDragProgress(Math.min(progress, 1));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    
    // Swipe gesture
    if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 50) {
      if (deltaX > 0) {
        prevPage();
      } else {
        nextPage();
      }
    } else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      // Tap gesture
      const containerWidth = readerRef.current?.offsetWidth || 385;
      const clickX = touch.clientX;
      
      if (clickX < containerWidth * 0.3) {
        prevPage();
      } else if (clickX > containerWidth * 0.7) {
        nextPage();
      } else {
        showControlsTemporarily();
      }
    }
    
    touchStartRef.current = null;
    setIsDragging(false);
    setDragProgress(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    const containerWidth = readerRef.current?.offsetWidth || 385;
    const clickX = e.clientX - (readerRef.current?.getBoundingClientRect().left || 0);
    
    if (clickX < containerWidth * 0.3) {
      prevPage();
    } else if (clickX > containerWidth * 0.7) {
      nextPage();
    } else {
      showControlsTemporarily();
    }
  };

  // Bookmark management
  const toggleBookmark = () => {
    const existingBookmark = bookmarks.find(b => b.pageNumber === currentPage);
    
    if (existingBookmark) {
      const newBookmarks = bookmarks.filter(b => b.pageNumber !== currentPage);
      setBookmarks(newBookmarks);
      localStorage.setItem(`bookmarks_${bookId}`, JSON.stringify(newBookmarks));
      toast.success('Bookmark removed');
    } else {
      const newBookmark: BookmarkData = {
        id: Date.now().toString(),
        pageNumber: currentPage,
        timestamp: new Date()
      };
      const newBookmarks = [...bookmarks, newBookmark];
      setBookmarks(newBookmarks);
      localStorage.setItem(`bookmarks_${bookId}`, JSON.stringify(newBookmarks));
      toast.success('Bookmark added');
    }
  };

  const goToBookmark = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    saveProgress(pageNumber);
    setShowBookmarks(false);
  };

  const isPageBookmarked = bookmarks.some(b => b.pageNumber === currentPage);

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 1));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  // Double tap zoom
  const handleDoubleClick = () => {
    setZoomLevel(zoomLevel === 1 ? 1.5 : 1);
  };

  // Pause and Stop handlers
  const handlePause = () => {
    saveProgress(currentPage);
    toast.success(`Progress saved at page ${currentPage + 1}`);
    if (onPause) {
      onPause();
    } else {
      onBack();
    }
  };

  const handleStop = () => {
    if (onStop) {
      onStop();
    } else {
      onBack();
    }
  };

  // Exit modal handler - saves and returns to library
  const handleSaveAndExit = () => {
    saveProgress(currentPage);
    toast.success(`Progress saved at page ${currentPage + 1}`);
    setShowExitModal(false);
    onBack();
  };

  const pagesPerView = orientation === 'landscape' ? 2 : 1;
  const displayPages = orientation === 'landscape' 
    ? [currentPage, currentPage + 1].filter(p => p < bookContent.length)
    : [currentPage];

  return (
    <div className="fixed inset-0 bg-[#f5f1e8] flex flex-col overflow-hidden">
      {/* Top Bar - Only visible when controls are shown */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent p-4"
          >
            <div className="flex items-center justify-between text-white">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExitModal(true)}
                className="text-white hover:text-white/80"
              >
                <Home className="w-5 h-5 mr-2" />
                Library
              </Button>
              
              <h1 className="text-sm font-medium truncate mx-4 flex-1 text-center">
                {bookTitle}
              </h1>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSoundscape(!showSoundscape)}
                  className="text-white hover:text-white/80"
                >
                  <Music className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleBookmark}
                  className="text-white hover:text-white/80"
                >
                  {isPageBookmarked ? (
                    <BookmarkCheck className="w-5 h-5 fill-white" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Reading Area */}
      <div 
        ref={readerRef}
        className="flex-1 relative flex items-center justify-center overflow-hidden select-none bg-[#0d421cb3]"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        style={{
          cursor: isDragging ? 'grabbing' : 'pointer'
        }}
      >
        {/* Page Content */}
        <div 
          className={`relative ${orientation === 'landscape' ? 'flex gap-4' : ''}`}
          style={{
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.3s ease'
          }}
        >
          {orientation === 'landscape' && (
            <div className="w-1 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 shadow-lg" 
                 style={{ height: '100%' }} 
            />
          )}
          
          {displayPages.map((pageIndex, idx) => (
            <FlipPage
              key={pageIndex}
              content={bookContent[pageIndex]}
              pageNumber={pageIndex}
              isFlipping={isFlipping && (idx === 0 || orientation === 'portrait')}
              direction={pageDirection}
              dragProgress={isDragging ? dragProgress : 0}
              orientation={orientation}
              contentType={contentType}
            />
          ))}
        </div>

        {/* Tap Zone Indicators (only shown briefly on first load) */}
        {currentPage === 0 && showControls && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 bottom-0 w-1/3 border-2 border-dashed border-white/30 flex items-center justify-center">
              <ChevronLeft className="w-12 h-12 text-white/30" />
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 border-2 border-dashed border-white/30 flex items-center justify-center">
              <ChevronRight className="w-12 h-12 text-white/30" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls - Only visible when controls are shown */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/50 to-transparent p-4"
          >
            <div className="space-y-4">
              {/* Page Progress */}
              <div className="flex items-center gap-4 text-white">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="text-white hover:text-white/80 disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>Page {currentPage + 1} of {bookContent.length}</span>
                    <span>{Math.round((currentPage / bookContent.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all"
                      style={{ width: `${(currentPage / bookContent.length) * 100}%` }}
                    />
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage >= bookContent.length - 1}
                  className="text-white hover:text-white/80 disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 1}
                    className="text-white hover:text-white/80 disabled:opacity-30"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetZoom}
                    className="text-white hover:text-white/80 text-xs"
                  >
                    {Math.round(zoomLevel * 100)}%
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 2}
                    className="text-white hover:text-white/80 disabled:opacity-30"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBookmarks(true)}
                    className="text-white hover:text-white/80"
                  >
                    <Bookmark className="w-5 h-5 mr-1" />
                    Bookmarks ({bookmarks.length})
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePause}
                    className="text-white hover:text-white/80 bg-white/10"
                  >
                    Pause
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleStop}
                    className="text-white hover:text-white/80"
                  >
                    Stop
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bookmark Panel */}
      <BookmarkPanel
        isOpen={showBookmarks}
        onClose={() => setShowBookmarks(false)}
        bookmarks={bookmarks}
        currentPage={currentPage}
        onGoToBookmark={goToBookmark}
        onDeleteBookmark={(id) => {
          const newBookmarks = bookmarks.filter(b => b.id !== id);
          setBookmarks(newBookmarks);
          localStorage.setItem(`bookmarks_${bookId}`, JSON.stringify(newBookmarks));
        }}
      />

      {/* Soundscape Player */}
      <SoundscapePlayer
        isOpen={showSoundscape}
        onClose={() => setShowSoundscape(false)}
        theme={theme}
      />

      {/* Exit Modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <Card className="bg-white p-6 rounded-lg shadow-lg">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Exit Reading</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowExitModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Are you sure you want to exit reading? Your progress will be saved.
                </p>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowExitModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSaveAndExit}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Save className="w-5 h-5 mr-1" />
                    Save and Exit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ESC Key Hint - Shows for 5 seconds on first load */}
      <AnimatePresence>
        {showEscHint && !showExitModal && !showBookmarks && !showSoundscape && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="bg-black/80 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <kbd className="bg-white/20 px-2 py-1 rounded text-xs font-mono">ESC</kbd>
              <span className="text-sm">Press to exit</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ImmersiveBookReader;