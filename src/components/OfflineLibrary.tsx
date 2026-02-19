import React, { useState, useEffect } from 'react';
import { Download, Trash2, BookOpen, HardDrive, Lock, Wifi, WifiOff, RefreshCw, Shield, Play } from 'lucide-react';
import { EbookReader } from './EbookReader';
import { ReadingHistory } from './ReadingHistory';

interface DownloadedBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  format: 'EPUB' | 'PDF';
  size: string;
  downloadDate: string;
  lastRead?: string;
  progress: number;
  currentPage?: number;
  totalPages: number;
  isEncrypted: boolean;
  encryptionKey?: string;
  offlineAvailable: boolean;
}

interface OfflineLibraryProps {
  theme: 'forest' | 'ocean' | 'sunset' | 'night';
  userEmail: string;
  onReadBook?: (bookId: string) => void;
}

const THEME_COLORS = {
  forest: { primary: 'emerald-600', secondary: 'green-100', text: 'green-900' },
  ocean: { primary: 'cyan-600', secondary: 'cyan-100', text: 'cyan-900' },
  sunset: { primary: 'orange-600', secondary: 'orange-100', text: 'orange-900' },
  night: { primary: 'indigo-600', secondary: 'indigo-100', text: 'indigo-900' }
};

export function OfflineLibrary({ theme, userEmail, onReadBook }: OfflineLibraryProps) {
  const [downloads, setDownloads] = useState<DownloadedBook[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageTotal, setStorageTotal] = useState(100);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [activeReader, setActiveReader] = useState<{
    bookId: string;
    title: string;
    author: string;
    totalPages: number;
    currentPage: number;
  } | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<'library' | 'history'>('library');

  const colors = THEME_COLORS[theme];

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load downloaded books from IndexedDB/localStorage
    loadDownloadedBooks();

    // Calculate storage usage
    calculateStorageUsage();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadDownloadedBooks = async () => {
    // In production, load from IndexedDB with encrypted content
    const mockDownloads: DownloadedBook[] = [
      {
        id: 'book-1',
        title: "Akai's Forest Adventure",
        author: "XenWinx Authors",
        coverUrl: '/covers/akai-forest.jpg',
        format: 'EPUB',
        size: '12 MB',
        downloadDate: '2025-12-28',
        lastRead: '2025-12-29',
        progress: 45,
        currentPage: 22,
        totalPages: 48,
        isEncrypted: true,
        encryptionKey: 'encrypted_key_xyz123',
        offlineAvailable: true
      },
      {
        id: 'book-2',
        title: "Mei's Ocean Journey",
        author: "XenWinx Authors",
        coverUrl: '/covers/mei-ocean.jpg',
        format: 'EPUB',
        size: '15 MB',
        downloadDate: '2025-12-27',
        progress: 0,
        currentPage: 1,
        totalPages: 52,
        isEncrypted: true,
        encryptionKey: 'encrypted_key_abc456',
        offlineAvailable: true
      }
    ];

    // Update with saved progress from reading history
    const history = JSON.parse(localStorage.getItem('reading_history') || '[]');
    const updatedDownloads = mockDownloads.map(book => {
      const historyItem = history.find((h: any) => h.bookId === book.id);
      if (historyItem) {
        return {
          ...book,
          currentPage: historyItem.currentPage,
          progress: historyItem.progress,
          lastRead: historyItem.lastReadAt
        };
      }
      return book;
    });

    setDownloads(updatedDownloads);
  };

  const calculateStorageUsage = async () => {
    // In production, calculate actual storage usage
    // This is a mock calculation
    const used = 27; // MB
    const total = 500; // MB available for app
    setStorageUsed(used);
    setStorageTotal(total);
  };

  const handleDeleteBook = async (bookId: string) => {
    // In production, securely delete encrypted book and keys from IndexedDB
    setDownloads(prev => prev.filter(book => book.id !== bookId));
    setShowDeleteConfirm(null);
    calculateStorageUsage();
  };

  const handleRedownload = async (bookId: string) => {
    if (!isOnline) {
      alert('Internet connection required to re-download books');
      return;
    }
    // In production, re-download and re-encrypt the book
    alert('Re-downloading book...');
  };

  const verifyBookIntegrity = async (bookId: string) => {
    // In production, verify book encryption and integrity
    const book = downloads.find(b => b.id === bookId);
    if (!book) return false;

    // Check encryption
    if (!book.isEncrypted || !book.encryptionKey) {
      return false;
    }

    // Verify DRM
    // In production, verify with server that user still has license
    return true;
  };

  const handleReadBook = async (bookId: string, startPage?: number) => {
    // Verify book integrity before reading
    const isValid = await verifyBookIntegrity(bookId);
    
    if (!isValid) {
      alert('Book verification failed. Please re-download.');
      return;
    }

    const book = downloads.find(b => b.id === bookId);
    if (!book) return;

    // Open reader with the book
    setActiveReader({
      bookId: book.id,
      title: book.title,
      author: book.author,
      totalPages: book.totalPages,
      currentPage: startPage || book.currentPage || 1
    });
  };

  const handleProgressUpdate = (progress: any) => {
    // Update local book progress
    setDownloads(prev => prev.map(book => 
      book.id === progress.bookId
        ? {
            ...book,
            currentPage: progress.currentPage,
            progress: progress.progress,
            lastRead: progress.lastReadAt
          }
        : book
    ));
  };

  const handleContinueReading = (bookId: string, page: number) => {
    handleReadBook(bookId, page);
    setShowHistory(false);
    setActiveTab('library');
  };

  // If reader is active, show it
  if (activeReader) {
    return (
      <EbookReader
        bookId={activeReader.bookId}
        bookTitle={activeReader.title}
        bookAuthor={activeReader.author}
        totalPages={activeReader.totalPages}
        initialPage={activeReader.currentPage}
        theme={theme}
        onClose={() => setActiveReader(null)}
        onProgressUpdate={handleProgressUpdate}
      />
    );
  }

  // If history is active, show it
  if (activeTab === 'history') {
    return <ReadingHistory theme={theme} onContinueReading={handleContinueReading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Online Status */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-2xl font-bold text-${colors.text}`}>My Library</h1>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
            }`}>
              {isOnline ? (
                <>
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm font-medium">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4" />
                  <span className="text-sm font-medium">Offline</span>
                </>
              )}
            </div>
          </div>

          {/* Storage Info */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Storage</span>
              </div>
              <span className="text-sm text-gray-600">
                {storageUsed} MB / {storageTotal} MB
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-${colors.primary} h-2 rounded-full transition-all`}
                style={{ width: `${(storageUsed / storageTotal) * 100}%` }}
              />
            </div>
          </div>

          {/* Offline Notice */}
          {!isOnline && (
            <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <WifiOff className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800">
                  You're offline. You can still read downloaded books.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Downloaded Books */}
      <div className="max-w-md mx-auto px-4 py-6">
        {downloads.length === 0 ? (
          <div className="text-center py-12">
            <Download className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No downloaded books</p>
            <p className="text-sm text-gray-500 mt-1">
              Download books from the store to read offline
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {downloads.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex gap-4">
                    {/* Book Cover */}
                    <div className="relative flex-shrink-0 w-20 h-28">
                      <div className={`w-full h-full bg-${colors.secondary} rounded-lg flex items-center justify-center`}>
                        <BookOpen className={`w-10 h-10 text-${colors.primary}`} />
                      </div>
                      {book.isEncrypted && (
                        <div className="absolute top-1 right-1 bg-black/70 rounded p-1">
                          <Lock className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {book.offlineAvailable && (
                        <div className="absolute bottom-1 left-1 bg-green-600 rounded p-1">
                          <Download className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{book.title}</h3>
                      <p className="text-sm text-gray-600">{book.author}</p>
                      
                      {/* Progress */}
                      {book.progress > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>{book.progress}% complete</span>
                            {book.lastRead && <span>Last read: {book.lastRead}</span>}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`bg-${colors.primary} h-1.5 rounded-full`}
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="flex gap-3 mt-2 text-xs text-gray-600">
                        <span>{book.format}</span>
                        <span>•</span>
                        <span>{book.size}</span>
                        <span>•</span>
                        <span>Downloaded {book.downloadDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="mt-3 flex items-center gap-2 bg-blue-50 p-2 rounded text-xs text-blue-800">
                    <Shield className="w-3 h-3 flex-shrink-0" />
                    <span>DRM Protected • Licensed to {userEmail}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleReadBook(book.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-${colors.primary} text-white rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      <BookOpen className="w-4 h-4" />
                      {book.progress > 0 ? 'Continue Reading' : 'Start Reading'}
                    </button>

                    <button
                      onClick={() => handleRedownload(book.id)}
                      disabled={!isOnline}
                      className={`px-4 py-2 border border-${colors.primary} text-${colors.primary} rounded-lg hover:bg-${colors.secondary} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setShowDeleteConfirm(book.id)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Book?</h3>
            <p className="text-gray-600 mb-4">
              This will remove the downloaded book from your device. You can re-download it anytime from the store.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBook(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Encryption Info Footer */}
      <div className="max-w-md mx-auto px-4 py-6 bg-white mt-8 border-t border-gray-200">
        <div className="flex items-start gap-3">
          <Lock className={`w-5 h-5 text-${colors.primary} flex-shrink-0 mt-0.5`} />
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Offline Security</h4>
            <p className="text-xs text-gray-600 mt-1">
              All downloaded books are encrypted and can only be accessed with your account. Books are automatically removed if your license expires.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
