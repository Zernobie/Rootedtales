import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Trash2, Play, Calendar, TrendingUp, Award } from 'lucide-react';

interface HistoryItem {
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  currentPage: number;
  totalPages: number;
  progress: number;
  lastReadAt: string;
  coverUrl?: string;
}

interface ReadingHistoryProps {
  theme: 'forest' | 'ocean' | 'sunset' | 'night';
  onContinueReading: (bookId: string, page: number) => void;
}

const THEME_COLORS = {
  forest: { primary: 'emerald-600', secondary: 'green-100', text: 'green-900' },
  ocean: { primary: 'cyan-600', secondary: 'cyan-100', text: 'cyan-900' },
  sunset: { primary: 'orange-600', secondary: 'orange-100', text: 'orange-900' },
  night: { primary: 'indigo-600', secondary: 'indigo-100', text: 'indigo-900' }
};

export function ReadingHistory({ theme, onContinueReading }: ReadingHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [stats, setStats] = useState({
    totalBooksRead: 0,
    booksInProgress: 0,
    booksCompleted: 0,
    totalPagesRead: 0,
    currentStreak: 0
  });

  const colors = THEME_COLORS[theme];

  useEffect(() => {
    loadHistory();
    calculateStats();

    // Listen for storage changes (when reading progress is updated)
    const handleStorageChange = () => {
      loadHistory();
      calculateStats();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also set up an interval to check for updates
    const interval = setInterval(() => {
      loadHistory();
      calculateStats();
    }, 5000); // Check every 5 seconds

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const loadHistory = () => {
    const savedHistory = localStorage.getItem('reading_history');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setHistory(parsed);
    }
  };

  const calculateStats = () => {
    const savedHistory = localStorage.getItem('reading_history');
    if (!savedHistory) return;

    const parsed: HistoryItem[] = JSON.parse(savedHistory);
    
    const completed = parsed.filter(item => item.progress >= 100).length;
    const inProgress = parsed.filter(item => item.progress < 100 && item.progress > 0).length;
    const totalPages = parsed.reduce((sum, item) => sum + item.currentPage, 0);

    // Calculate reading streak
    const streak = calculateStreak(parsed);

    setStats({
      totalBooksRead: parsed.length,
      booksCompleted: completed,
      booksInProgress: inProgress,
      totalPagesRead: totalPages,
      currentStreak: streak
    });
  };

  const calculateStreak = (items: HistoryItem[]): number => {
    if (items.length === 0) return 0;

    const sortedDates = items
      .map(item => new Date(item.lastReadAt).toDateString())
      .filter((date, index, self) => self.indexOf(date) === index)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    for (let i = 0; i < sortedDates.length; i++) {
      const expectedDate = new Date(Date.now() - (i * 86400000)).toDateString();
      
      if (sortedDates[i] === expectedDate) {
        streak++;
      } else if (i === 0 && sortedDates[i] === yesterday) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear your reading history? This cannot be undone.')) {
      localStorage.setItem('reading_history', JSON.stringify([]));
      setHistory([]);
      calculateStats();
    }
  };

  const removeItem = (bookId: string) => {
    const updated = history.filter(item => item.bookId !== bookId);
    localStorage.setItem('reading_history', JSON.stringify(updated));
    setHistory(updated);
    calculateStats();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className={`text-2xl font-bold text-${colors.text}`}>Reading History</h1>
          <p className="text-sm text-gray-600 mt-1">Track your reading journey</p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className={`bg-${colors.secondary} rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className={`w-5 h-5 text-${colors.primary}`} />
              <span className="text-sm font-medium text-gray-700">In Progress</span>
            </div>
            <p className={`text-2xl font-bold text-${colors.text}`}>{stats.booksInProgress}</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Completed</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{stats.booksCompleted}</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Pages Read</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{stats.totalPagesRead}</p>
          </div>

          <div className="bg-orange-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Day Streak</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">{stats.currentStreak}</p>
          </div>
        </div>

        {/* Clear History Button */}
        {history.length > 0 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All History
            </button>
          </div>
        )}

        {/* History List */}
        {history.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No reading history yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Start reading a book to see it here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, index) => (
              <div key={`${item.bookId}-${index}`} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex gap-4">
                    {/* Book Cover */}
                    <div className={`w-16 h-22 bg-${colors.secondary} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {item.coverUrl ? (
                        <img src={item.coverUrl} alt={item.bookTitle} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <BookOpen className={`w-8 h-8 text-${colors.primary}`} />
                      )}
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.bookTitle}</h3>
                      <p className="text-sm text-gray-600 truncate">{item.bookAuthor}</p>
                      
                      {/* Progress */}
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Page {item.currentPage} of {item.totalPages}</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${item.progress >= 100 ? 'bg-blue-600' : `bg-${colors.primary}`} h-2 rounded-full transition-all`}
                            style={{ width: `${Math.min(item.progress, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Last Read */}
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimeAgo(item.lastReadAt)}</span>
                      </div>

                      {/* Completion Badge */}
                      {item.progress >= 100 && (
                        <div className="mt-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            <Award className="w-3 h-3" />
                            Completed
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => onContinueReading(item.bookId, item.currentPage)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-${colors.primary} text-white rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      <Play className="w-4 h-4" />
                      {item.progress >= 100 ? 'Read Again' : 'Continue Reading'}
                    </button>
                    <button
                      onClick={() => removeItem(item.bookId)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Achievements Section */}
      {stats.currentStreak >= 3 && (
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8" />
              <h3 className="font-bold text-lg">Amazing Streak! 🔥</h3>
            </div>
            <p className="text-white/90">
              You've read for {stats.currentStreak} days in a row. Keep it up!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
