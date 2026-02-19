import React, { useState } from 'react';
import { motion } from 'motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Download,
  Cloud,
  HardDrive,
  Trash2,
  CheckCircle2,
  ArrowDown,
  Database,
  Wifi,
  WifiOff,
  PlayCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

interface Book {
  id: string;
  title: string;
  coverImage?: any;
  icon: string;
  size: number; // in MB
  isDownloaded: boolean;
  downloadProgress?: number;
}

interface DownloadManagerProps {
  books: Book[];
  onDownload: (bookId: string) => void;
  onDelete: (bookId: string) => void;
  onRead: (bookId: string) => void;
}

export function DownloadManager({ books, onDownload, onDelete, onRead }: DownloadManagerProps) {
  const [activeDownloads, setActiveDownloads] = useState<string[]>([]);
  
  const downloadedBooks = books.filter(b => b.isDownloaded);
  const cloudBooks = books.filter(b => !b.isDownloaded);
  
  const totalStorage = 500; // MB
  const usedStorage = downloadedBooks.reduce((sum, book) => sum + book.size, 0);
  const storagePercent = (usedStorage / totalStorage) * 100;

  const handleDownload = (bookId: string) => {
    setActiveDownloads([...activeDownloads, bookId]);
    toast.info('Download started');
    
    // Simulate download
    setTimeout(() => {
      onDownload(bookId);
      setActiveDownloads(activeDownloads.filter(id => id !== bookId));
      toast.success('Download complete!');
    }, 3000);
  };

  const handleDelete = (bookId: string, bookTitle: string) => {
    if (confirm(`Delete "${bookTitle}" from your device?`)) {
      onDelete(bookId);
      toast.success('Book removed from device');
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Database className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-foreground">Download Manager</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your downloaded books and storage
          </p>
        </motion.div>

        {/* Storage Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <HardDrive className="w-5 h-5 mr-2" />
                Storage Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    {usedStorage.toFixed(1)} MB of {totalStorage} MB used
                  </span>
                  <span className="font-medium">{storagePercent.toFixed(0)}%</span>
                </div>
                <Progress value={storagePercent} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {downloadedBooks.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Downloaded</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {cloudBooks.length}
                  </div>
                  <div className="text-xs text-muted-foreground">In Cloud</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Downloads */}
        {activeDownloads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <ArrowDown className="w-5 h-5 mr-2 text-blue-600" />
                  Downloading
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeDownloads.map((bookId) => {
                  const book = books.find(b => b.id === bookId);
                  if (!book) return null;
                  
                  return (
                    <div key={bookId} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium line-clamp-1 flex-1">
                          {book.title}
                        </span>
                        <span className="text-muted-foreground ml-2">
                          {book.size} MB
                        </span>
                      </div>
                      <Progress value={book.downloadProgress || 45} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tabs for Downloaded vs Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="downloaded" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="downloaded" className="flex items-center gap-2">
                <WifiOff className="w-4 h-4" />
                Downloaded ({downloadedBooks.length})
              </TabsTrigger>
              <TabsTrigger value="cloud" className="flex items-center gap-2">
                <Cloud className="w-4 h-4" />
                Cloud ({cloudBooks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="downloaded" className="space-y-3 mt-4">
              {downloadedBooks.length === 0 ? (
                <div className="text-center py-12">
                  <WifiOff className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Downloaded Books</h3>
                  <p className="text-sm text-muted-foreground">
                    Download books to read offline
                  </p>
                </div>
              ) : (
                downloadedBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-xl overflow-hidden backdrop-blur-md bg-opacity-80 border border-white/20 shadow-lg flex-shrink-0">
                            {book.coverImage ? (
                              <ImageWithFallback
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span>{book.icon}</span>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm line-clamp-2 mb-1">
                              {book.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Downloaded
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {book.size} MB
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => onRead(book.id)}
                            >
                              <PlayCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(book.id, book.title)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </TabsContent>

            <TabsContent value="cloud" className="space-y-3 mt-4">
              {cloudBooks.length === 0 ? (
                <div className="text-center py-12">
                  <Cloud className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">All Books Downloaded</h3>
                  <p className="text-sm text-muted-foreground">
                    All your purchased books are on this device
                  </p>
                </div>
              ) : (
                cloudBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-xl overflow-hidden backdrop-blur-md bg-opacity-80 border border-white/20 shadow-lg flex-shrink-0">
                            {book.coverImage ? (
                              <ImageWithFallback
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span>{book.icon}</span>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm line-clamp-2 mb-1">
                              {book.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <Cloud className="w-3 h-3 mr-1" />
                                In Cloud
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {book.size} MB
                              </span>
                            </div>
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={() => handleDownload(book.id)}
                            disabled={activeDownloads.includes(book.id)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            {activeDownloads.includes(book.id) ? 'Downloading...' : 'Download'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Network Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wifi className="w-5 h-5 text-green-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Connected to Wi-Fi</p>
                    <p className="text-xs text-muted-foreground">
                      Download books faster on Wi-Fi
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Online
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
