import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X, Bookmark, Trash2, MapPin } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface BookmarkData {
  id: string;
  pageNumber: number;
  timestamp: Date;
  note?: string;
}

interface BookmarkPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkData[];
  currentPage: number;
  onGoToBookmark: (pageNumber: number) => void;
  onDeleteBookmark: (id: string) => void;
}

export function BookmarkPanel({
  isOpen,
  onClose,
  bookmarks,
  currentPage,
  onGoToBookmark,
  onDeleteBookmark
}: BookmarkPanelProps) {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedBookmarks = [...bookmarks].sort((a, b) => b.pageNumber - a.pageNumber);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Bookmark className="w-5 h-5 mr-2 text-amber-600" />
                  Bookmarks
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''} saved
              </p>
            </div>

            {/* Current Page Indicator */}
            <div className="px-6 py-3 bg-blue-50 border-b border-blue-100">
              <div className="flex items-center text-sm text-blue-700">
                <MapPin className="w-4 h-4 mr-2" />
                Currently on page {currentPage + 1}
              </div>
            </div>

            {/* Bookmarks List */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {sortedBookmarks.length === 0 ? (
                  <div className="text-center py-12">
                    <Bookmark className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-sm">No bookmarks yet</p>
                    <p className="text-gray-400 text-xs mt-2">
                      Tap the bookmark icon while reading to save your place
                    </p>
                  </div>
                ) : (
                  sortedBookmarks.map((bookmark) => (
                    <Card 
                      key={bookmark.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        bookmark.pageNumber === currentPage 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div 
                            className="flex-1"
                            onClick={() => onGoToBookmark(bookmark.pageNumber)}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Bookmark 
                                className={`w-4 h-4 ${
                                  bookmark.pageNumber === currentPage 
                                    ? 'text-blue-600 fill-blue-600' 
                                    : 'text-amber-600 fill-amber-600'
                                }`} 
                              />
                              <span className="font-medium text-gray-800">
                                Page {bookmark.pageNumber + 1}
                              </span>
                              {bookmark.pageNumber === currentPage && (
                                <span className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 ml-6">
                              {formatDate(bookmark.timestamp)}
                            </p>
                            {bookmark.note && (
                              <p className="text-sm text-gray-600 mt-2 ml-6 italic">
                                "{bookmark.note}"
                              </p>
                            )}
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteBookmark(bookmark.id);
                            }}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 -mr-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-500 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5" />
                  <p>Tap a bookmark to jump to that page</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5" />
                  <p>The last page you read is automatically saved</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default BookmarkPanel;
