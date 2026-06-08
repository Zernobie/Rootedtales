import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Menu, Settings, BookmarkPlus, X, Home, Sun, Moon } from 'lucide-react';

interface ReadingProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  progress: number;
  lastReadAt: string;
  scrollPosition?: number;
  chapter?: string;
}

interface Bookmark {
  id: string;
  page: number;
  note?: string;
  createdAt: string;
}

interface EbookReaderProps {
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  totalPages: number;
  initialPage?: number;
  theme: 'forest' | 'ocean' | 'sunset' | 'night';
  onClose: () => void;
  onProgressUpdate: (progress: ReadingProgress) => void;
}

const THEME_COLORS = {
  forest: { primary: 'emerald-600', secondary: 'green-100', text: 'green-900', bg: 'green-50' },
  ocean: { primary: 'cyan-600', secondary: 'cyan-100', text: 'cyan-900', bg: 'cyan-50' },
  sunset: { primary: 'orange-600', secondary: 'orange-100', text: 'orange-900', bg: 'orange-50' },
  night: { primary: 'indigo-600', secondary: 'indigo-100', text: 'indigo-900', bg: 'indigo-50' }
};

export function EbookReader({ 
  bookId, 
  bookTitle, 
  bookAuthor, 
  totalPages, 
  initialPage = 1,
  theme,
  onClose,
  onProgressUpdate
}: EbookReaderProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showMenu, setShowMenu] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [fontSize, setFontSize] = useState(16);
  const [brightness, setBrightness] = useState(100);
  const [nightMode, setNightMode] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressTimerRef = useRef<NodeJS.Timeout>();

  const colors = THEME_COLORS[theme];

  // Load saved bookmarks and settings
  useEffect(() => {
    loadBookmarks();
    loadSettings();
  }, [bookId]);

  // Auto-save progress every 30 seconds
  useEffect(() => {
    progressTimerRef.current = setInterval(() => {
      saveProgress();
    }, 30000); // 30 seconds

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [currentPage]);

  // Save progress when page changes
  useEffect(() => {
    saveProgress();
  }, [currentPage]);

  // Save progress when leaving
  useEffect(() => {
    return () => {
      saveProgress();
    };
  }, []);

  const loadBookmarks = () => {
    const saved = localStorage.getItem(`bookmarks_${bookId}`);
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  };

  const loadSettings = () => {
    const savedFontSize = localStorage.getItem('reader_fontSize');
    const savedBrightness = localStorage.getItem('reader_brightness');
    const savedNightMode = localStorage.getItem('reader_nightMode');
    
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedBrightness) setBrightness(parseInt(savedBrightness));
    if (savedNightMode) setNightMode(savedNightMode === 'true');
  };

  const saveProgress = () => {
    const progress: ReadingProgress = {
      bookId,
      currentPage,
      totalPages,
      progress: Math.round((currentPage / totalPages) * 100),
      lastReadAt: new Date().toISOString(),
      scrollPosition: contentRef.current?.scrollTop || 0
    };

    // Save to localStorage
    localStorage.setItem(`reading_progress_${bookId}`, JSON.stringify(progress));

    // Update reading history
    updateReadingHistory(progress);

    // Callback to parent
    onProgressUpdate(progress);
  };

  const updateReadingHistory = (progress: ReadingProgress) => {
    const history = JSON.parse(localStorage.getItem('reading_history') || '[]');
    
    // Remove existing entry for this book
    const filteredHistory = history.filter((item: any) => item.bookId !== bookId);
    
    // Add new entry at the beginning
    const newHistory = [
      {
        bookId,
        bookTitle,
        bookAuthor,
        ...progress
      },
      ...filteredHistory
    ].slice(0, 20); // Keep only last 20 items

    localStorage.setItem('reading_history', JSON.stringify(newHistory));
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  const addBookmark = () => {
    const newBookmark: Bookmark = {
      id: `bookmark_${Date.now()}`,
      page: currentPage,
      createdAt: new Date().toISOString()
    };

    const updatedBookmarks = [...bookmarks, newBookmark];
    setBookmarks(updatedBookmarks);
    localStorage.setItem(`bookmarks_${bookId}`, JSON.stringify(updatedBookmarks));
    
    // Show confirmation
    alert(`Bookmark added on page ${currentPage}`);
  };

  const removeBookmark = (bookmarkId: string) => {
    const updatedBookmarks = bookmarks.filter(b => b.id !== bookmarkId);
    setBookmarks(updatedBookmarks);
    localStorage.setItem(`bookmarks_${bookId}`, JSON.stringify(updatedBookmarks));
  };

  const goToBookmark = (page: number) => {
    goToPage(page);
    setShowBookmarks(false);
  };

  const handleFontSizeChange = (delta: number) => {
    const newSize = Math.max(12, Math.min(24, fontSize + delta));
    setFontSize(newSize);
    localStorage.setItem('reader_fontSize', newSize.toString());
  };

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
    localStorage.setItem('reader_brightness', value.toString());
  };

  const toggleNightMode = () => {
    const newMode = !nightMode;
    setNightMode(newMode);
    localStorage.setItem('reader_nightMode', newMode.toString());
  };

  const handleClose = () => {
    saveProgress();
    onClose();
  };

  // Generate mock page content
  const getPageContent = (page: number) => {
    const chapters = [
      { start: 1, end: 10, title: "Chapter 1: The Beginning" },
      { start: 11, end: 20, title: "Chapter 2: The Journey" },
      { start: 21, end: 30, title: "Chapter 3: New Friends" },
      { start: 31, end: 40, title: "Chapter 4: The Challenge" },
      { start: 41, end: 48, title: "Chapter 5: The Resolution" }
    ];

    const currentChapter = chapters.find(ch => page >= ch.start && page <= ch.end);

    return {
      chapter: currentChapter?.title || "Chapter",
      content: `This is page ${page} of "${bookTitle}". In a real implementation, this would display the actual book content loaded from the encrypted EPUB or PDF file.\n\nThe content would be decrypted in memory and rendered here, maintaining the DRM protection while allowing the user to read.\n\n${currentChapter ? `You are reading: ${currentChapter.title}` : ''}\n\nEach page turn is automatically saved to your reading history, so you can always come back to where you left off.\n\nYour progress: ${Math.round((page / totalPages) * 100)}% complete`
    };
  };

  const pageContent = getPageContent(currentPage);

  return (
    <div 
      className={`fixed inset-0 z-50 ${nightMode ? 'bg-gray-900' : 'bg-white'}`}
      style={{ filter: `brightness(${brightness}%)` }}
    >
      {/* Header */}
      <div className={`${nightMode ? 'bg-gray-800 border-gray-700' : `bg-${colors.primary}`} text-white p-4 flex items-center justify-between shadow-lg`}>
        <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-lg">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="font-semibold truncate">{bookTitle}</h1>
          <p className="text-xs text-white/80">{bookAuthor}</p>
        </div>
        <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-white/10 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className={`h-1 ${nightMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div 
          className={`h-full ${nightMode ? 'bg-blue-500' : `bg-${colors.primary}`} transition-all`}
          style={{ width: `${(currentPage / totalPages) * 100}%` }}
        />
      </div>

      {/* Content Area */}
      <div 
        ref={contentRef}
        className={`flex-1 overflow-y-auto px-6 py-8`}
        style={{ 
          height: 'calc(100vh - 120px)',
          fontSize: `${fontSize}px`,
          lineHeight: '1.8'
        }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Chapter Title */}
          <h2 className={`text-xl font-bold mb-6 ${nightMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {pageContent.chapter}
          </h2>

          {/* Page Content */}
          <div className={`whitespace-pre-wrap ${nightMode ? 'text-gray-300' : 'text-gray-800'}`}>
            {pageContent.content}
          </div>

          {/* Page Number */}
          <div className={`mt-8 text-center text-sm ${nightMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className={`fixed bottom-0 left-0 right-0 ${nightMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} border-t p-4`}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`p-3 rounded-lg ${
              currentPage === 1
                ? `${nightMode ? 'bg-gray-700 text-gray-600' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                : `${nightMode ? 'bg-gray-700 text-white hover:bg-gray-600' : `bg-${colors.secondary} text-${colors.text} hover:bg-${colors.primary} hover:text-white`}`
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowBookmarks(!showBookmarks)}
              className={`p-3 rounded-lg ${nightMode ? 'bg-gray-700 text-white hover:bg-gray-600' : `bg-${colors.secondary} text-${colors.text} hover:bg-${colors.primary} hover:text-white`}`}
            >
              <BookOpen className="w-5 h-5" />
            </button>
            <button
              onClick={addBookmark}
              className={`p-3 rounded-lg ${nightMode ? 'bg-gray-700 text-white hover:bg-gray-600' : `bg-${colors.secondary} text-${colors.text} hover:bg-${colors.primary} hover:text-white`}`}
            >
              <BookmarkPlus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`p-3 rounded-lg ${nightMode ? 'bg-gray-700 text-white hover:bg-gray-600' : `bg-${colors.secondary} text-${colors.text} hover:bg-${colors.primary} hover:text-white`}`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`p-3 rounded-lg ${
              currentPage === totalPages
                ? `${nightMode ? 'bg-gray-700 text-gray-600' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                : `${nightMode ? 'bg-gray-700 text-white hover:bg-gray-600' : `bg-${colors.secondary} text-${colors.text} hover:bg-${colors.primary} hover:text-white`}`
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Settings Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className={`${nightMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto`}>
            <div className={`p-4 border-b ${nightMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
              <h3 className={`font-semibold ${nightMode ? 'text-white' : 'text-gray-900'}`}>Reading Settings</h3>
              <button onClick={() => setShowMenu(false)} className={nightMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Font Size */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${nightMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Font Size: {fontSize}px
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleFontSizeChange(-2)}
                    className={`px-4 py-2 rounded-lg ${nightMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    A-
                  </button>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-full ${nightMode ? 'bg-blue-500' : `bg-${colors.primary}`} rounded-full`}
                      style={{ width: `${((fontSize - 12) / (24 - 12)) * 100}%` }}
                    />
                  </div>
                  <button
                    onClick={() => handleFontSizeChange(2)}
                    className={`px-4 py-2 rounded-lg ${nightMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Brightness */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${nightMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Brightness: {brightness}%
                </label>
                <div className="flex items-center gap-4">
                  <Sun className={`w-5 h-5 ${nightMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={brightness}
                    onChange={(e) => handleBrightnessChange(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className={`text-sm ${nightMode ? 'text-gray-400' : 'text-gray-600'}`}>{brightness}%</span>
                </div>
              </div>

              {/* Night Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className={`w-5 h-5 ${nightMode ? 'text-blue-400' : 'text-gray-500'}`} />
                  <span className={`font-medium ${nightMode ? 'text-gray-300' : 'text-gray-700'}`}>Night Mode</span>
                </div>
                <button
                  onClick={toggleNightMode}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    nightMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                    nightMode ? 'right-0.5' : 'left-0.5'
                  }`} />
                </button>
              </div>

              {/* Go to Page */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${nightMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Go to Page
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    defaultValue={currentPage}
                    className={`flex-1 px-3 py-2 border rounded-lg ${
                      nightMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                    }`}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const page = parseInt((e.target as HTMLInputElement).value);
                        goToPage(page);
                        setShowMenu(false);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                      goToPage(parseInt(input.value));
                      setShowMenu(false);
                    }}
                    className={`px-4 py-2 ${nightMode ? 'bg-blue-600' : `bg-${colors.primary}`} text-white rounded-lg hover:opacity-90`}
                  >
                    Go
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks Panel */}
      {showBookmarks && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className={`${nightMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto`}>
            <div className={`p-4 border-b ${nightMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
              <h3 className={`font-semibold ${nightMode ? 'text-white' : 'text-gray-900'}`}>
                Bookmarks ({bookmarks.length})
              </h3>
              <button onClick={() => setShowBookmarks(false)} className={nightMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              {bookmarks.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className={`w-12 h-12 mx-auto mb-3 ${nightMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  <p className={`${nightMode ? 'text-gray-400' : 'text-gray-600'}`}>No bookmarks yet</p>
                  <p className={`text-sm ${nightMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                    Tap the bookmark icon to save your place
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {bookmarks.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      className={`p-3 rounded-lg ${nightMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}
                    >
                      <button
                        onClick={() => goToBookmark(bookmark.page)}
                        className="flex-1 text-left"
                      >
                        <p className={`font-medium ${nightMode ? 'text-white' : 'text-gray-900'}`}>
                          Page {bookmark.page}
                        </p>
                        <p className={`text-xs ${nightMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(bookmark.createdAt).toLocaleDateString()}
                        </p>
                      </button>
                      <button
                        onClick={() => removeBookmark(bookmark.id)}
                        className={`p-2 ${nightMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
