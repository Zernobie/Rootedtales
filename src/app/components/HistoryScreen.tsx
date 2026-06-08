import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  History, 
  BookOpen, 
  Clock, 
  Calendar,
  Star,
  Play,
  Bookmark
} from 'lucide-react';
import { User, Theme } from '../App';
import { toast } from 'sonner@2.0.3';

interface HistoryScreenProps {
  user: User | null;
  theme: Theme;
  setUser?: (user: User | null) => void;
}

export function HistoryScreen({ user, theme, setUser }: HistoryScreenProps) {
  const readingHistory = [
    {
      id: '1',
      title: 'The Adventures of Rusty the Red Panda',
      progress: 100,
      lastRead: '2024-01-15',
      timeSpent: '45 min',
      rating: 5,
      completed: true
    },
    {
      id: '2',
      title: 'Akai and The Quokka Quest',
      progress: 75,
      lastRead: '2024-01-14',
      timeSpent: '32 min',
      rating: 0,
      completed: false
    },

    {
      id: '4',
      title: 'Akai and The Curious Raccoons',
      progress: 45,
      lastRead: '2024-01-10',
      timeSpent: '20 min',
      rating: 0,
      completed: false
    },
    {
      id: '5',
      title: 'Akai and The Lost Reindeer',
      progress: 30,
      lastRead: '2024-01-08',
      timeSpent: '15 min',
      rating: 0,
      completed: false
    }
  ];

  const recentSessions = [
    { date: '2024-01-15', duration: '45 min', books: 2 },
    { date: '2024-01-14', duration: '32 min', books: 1 },
    { date: '2024-01-12', duration: '60 min', books: 3 },
    { date: '2024-01-10', duration: '25 min', books: 1 },
  ];

  const totalStats = {
    booksRead: readingHistory.filter(book => book.completed).length,
    totalTime: '3h 20m',
    currentStreak: user?.readerStatus?.activeStreak || 0,
    longestStreak: 12,
    averageRating: 4.5,
    totalReadingTime: user?.readerStatus?.totalReadingTime || 0,
    booksStarted: user?.readerStatus?.booksStarted || 0,
    averageSessionTime: user?.readerStatus?.averageSessionTime || 0
  };

  const handleContinueReading = (bookId: string, title: string) => {
    toast.success(`Continuing "${title}"`);
    // Update reading progress
    if (user && setUser) {
      const updatedUser = {
        ...user,
        readingProgress: {
          ...user.readingProgress,
          [bookId]: Math.min((user.readingProgress[bookId] || 0) + 10, 100)
        }
      };
      setUser(updatedUser);
    }
  };

  const handleBookmark = (bookId: string, title: string) => {
    toast.success(`"${title}" bookmarked`);
  };

  const handleRateBook = (bookId: string, title: string, rating: number) => {
    toast.success(`Rated "${title}" ${rating} stars`);
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <Card className="w-full max-w-sm text-center">
          <CardContent className="p-8">
            <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Sign In Required</h2>
            <p className="text-muted-foreground">
              Please sign in to view your reading history.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-background history-screen">
      <div className="p-6 space-y-6 screen-transparent-bg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <History className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-foreground">Reading History</h1>
          </div>
          <p className="text-[rgba(40,40,46,1)]">
            Track your reading journey and progress
          </p>
        </motion.div>

        {/* Reading Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Reading Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{totalStats.booksRead}</div>
                  <div className="text-xs text-muted-foreground">Books Completed</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{totalStats.totalTime}</div>
                  <div className="text-xs text-muted-foreground">Total Reading Time</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{totalStats.currentStreak}</div>
                  <div className="text-xs text-muted-foreground">Current Streak</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{totalStats.averageRating}</div>
                  <div className="text-xs text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Reading History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Recent Books
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {readingHistory.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{book.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={book.completed ? "default" : "secondary"} className="text-xs">
                        {book.completed ? 'Completed' : `${book.progress}%`}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {book.timeSpent}
                      </span>
                      {book.completed && book.rating > 0 && (
                        <div className="flex items-center">
                          {[...Array(book.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last read: {new Date(book.lastRead).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    {!book.completed && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContinueReading(book.id, book.title)}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Continue
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleBookmark(book.id, book.title)}
                    >
                      <Bookmark className="w-3 h-3" />
                    </Button>
                    {book.completed && book.rating === 0 && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleRateBook(book.id, book.title, 5)}
                      >
                        <Star className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Reading Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">
                        {new Date(session.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.books} book{session.books !== 1 ? 's' : ''} read
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {session.duration}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}