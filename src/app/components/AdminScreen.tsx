import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  Shield, 
  Upload, 
  BookOpen, 
  Users, 
  Volume2, 
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Download,
  UserCheck,
  Settings,
  Database,
  Mic,
  Play,
  Pause,
  FileAudio,
  Music,
  Headphones,
  Check,
  X,
  Image as ImageIcon,
  FileText,
  Eye,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminScreenProps {
  user: any;
}

interface NewBook {
  title: string;
  author: string;
  description: string;
  price: string;
  pages: string;
  category: string;
  coverImage: File | null;
  bookFile: File | null;
}

export function AdminScreen({ user }: AdminScreenProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedBook, setSelectedBook] = useState('');
  const [audioFiles, setAudioFiles] = useState<any[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [showAddBookDialog, setShowAddBookDialog] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [newBook, setNewBook] = useState<NewBook>({
    title: '',
    author: '',
    description: '',
    price: '',
    pages: '',
    category: 'Forest Adventures',
    coverImage: null,
    bookFile: null
  });

  if (!user?.isAdmin) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <Card className="w-full max-w-sm text-center">
          <CardContent className="p-8">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              You don't have permission to access the admin panel.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const dashboardStats = {
    totalBooks: 12,
    totalCharacters: 34,
    totalUsers: 1247,
    activeUsers: 89,
    downloadsToday: 156,
    revenueThisMonth: 2840
  };

  const recentActivity = [
    { type: 'book', action: 'New book uploaded', item: 'Akai and The Lost Reindeer', time: '2 hours ago' },
    { type: 'user', action: 'New user registered', item: 'reading_lover_42', time: '4 hours ago' },
    { type: 'character', action: 'Character updated', item: 'Akai - Red Panda', time: '1 day ago' },
    { type: 'download', action: 'Book downloaded', item: 'The Adventures of Rusty', time: '1 day ago' }
  ];

  const handleFileUpload = (type: 'book' | 'character' | 'audio') => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
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
            <Shield className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-foreground">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Welcome back, {user.username}
          </p>
        </motion.div>

        {/* Dashboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="characters">Characters</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{dashboardStats.totalBooks}</div>
                    <div className="text-sm text-muted-foreground">Total Books</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{dashboardStats.totalCharacters}</div>
                    <div className="text-sm text-muted-foreground">Characters</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <UserCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
                    <div className="text-sm text-muted-foreground">Total Users</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Download className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{dashboardStats.downloadsToday}</div>
                    <div className="text-sm text-muted-foreground">Downloads Today</div>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Revenue This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${dashboardStats.revenueThisMonth.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    +12% from last month
                  </div>
                  <Progress value={65} className="h-2" />
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'book' ? 'bg-blue-500' :
                          activity.type === 'user' ? 'bg-green-500' :
                          activity.type === 'character' ? 'bg-purple-500' : 'bg-orange-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.item}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="books" className="space-y-4">
              {/* Book Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Book Management
                    </div>
                    <Button size="sm" onClick={() => setShowAddBookDialog(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Book
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Upload New Book */}
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Upload New Book</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Support PDF and ePub formats
                    </p>
                    <Button onClick={() => handleFileUpload('book')} disabled={isUploading}>
                      {isUploading ? 'Uploading...' : 'Choose File'}
                    </Button>
                    {isUploading && (
                      <div className="mt-4">
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-2">{uploadProgress}% uploaded</p>
                      </div>
                    )}
                  </div>

                  {/* Book Form */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="book-title">Book Title</Label>
                      <Input id="book-title" placeholder="Enter book title" />
                    </div>
                    <div>
                      <Label htmlFor="book-price">Price</Label>
                      <Input id="book-price" placeholder="$0.00" />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="book-description">Description</Label>
                      <Textarea id="book-description" placeholder="Enter book description" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Books */}
              <Card>
                <CardHeader>
                  <CardTitle>Existing Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['The Adventures of Rusty the Red Panda', 'Akai and The Quokka Quest'].map((book, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{book}</p>
                          <p className="text-sm text-muted-foreground">Published • 1,234 downloads</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audio" className="space-y-4">
              {/* Audio Recording & Upload Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Headphones className="w-5 h-5 mr-2 text-purple-600" />
                    Book Audio Recordings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Book Selection */}
                  <div>
                    <Label htmlFor="select-book">Select Book</Label>
                    <Select value={selectedBook} onValueChange={setSelectedBook}>
                      <SelectTrigger id="select-book">
                        <SelectValue placeholder="Choose a book to add audio..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rusty">The Adventures of Rusty the Red Panda</SelectItem>
                        <SelectItem value="akai">Akai and The Heartwarming Panda Reunion</SelectItem>
                        <SelectItem value="ocean">Akai and Kaito in the Great Ocean Odyssey</SelectItem>
                        <SelectItem value="raccoons">Akai and The Curious Raccoons</SelectItem>
                        <SelectItem value="quokka">Akai and The Quokka Quest</SelectItem>
                        <SelectItem value="otter">Sammy the Sea Otter's Day at the Beach</SelectItem>
                        <SelectItem value="koala">Cozy the Koala's Bedtime Story</SelectItem>
                        <SelectItem value="treasure">Treasure of Friendship</SelectItem>
                        <SelectItem value="monkeys">The Playful Monkeys</SelectItem>
                        <SelectItem value="elephant">Joyful Elephant's Party</SelectItem>
                        <SelectItem value="owls">Wise Owl's Lesson</SelectItem>
                        <SelectItem value="reindeer">Akai and The Lost Reindeer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedBook && (
                    <>
                      {/* Upload Options */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Upload Pre-recorded Audio */}
                        <Card className="border-2 border-dashed">
                          <CardContent className="p-6 text-center space-y-3">
                            <FileAudio className="w-10 h-10 text-blue-600 mx-auto" />
                            <div>
                              <h3 className="font-medium mb-1">Upload Recording</h3>
                              <p className="text-xs text-muted-foreground">
                                MP3, WAV, M4A up to 50MB
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="audio/*"
                              className="hidden"
                              id="audio-upload"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleFileUpload('audio');
                                  toast.success('Audio file uploaded successfully!');
                                }
                              }}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => document.getElementById('audio-upload')?.click()}
                              disabled={isUploading}
                              className="w-full"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              {isUploading ? 'Uploading...' : 'Choose File'}
                            </Button>
                            {isUploading && (
                              <div className="mt-2">
                                <Progress value={uploadProgress} className="h-2" />
                                <p className="text-xs text-muted-foreground mt-1">{uploadProgress}%</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* Record Live Audio */}
                        <Card className="border-2 border-dashed">
                          <CardContent className="p-6 text-center space-y-3">
                            <Mic className="w-10 h-10 text-red-600 mx-auto" />
                            <div>
                              <h3 className="font-medium mb-1">Record Live</h3>
                              <p className="text-xs text-muted-foreground">
                                Record narration directly
                              </p>
                            </div>
                            <Button 
                              size="sm" 
                              variant={isRecording ? "destructive" : "default"}
                              onClick={() => {
                                setIsRecording(!isRecording);
                                if (!isRecording) {
                                  toast.info('Recording started');
                                  setRecordingDuration(0);
                                  const interval = setInterval(() => {
                                    setRecordingDuration(prev => prev + 1);
                                  }, 1000);
                                  (window as any).recordingInterval = interval;
                                } else {
                                  clearInterval((window as any).recordingInterval);
                                  toast.success('Recording saved!');
                                }
                              }}
                              className="w-full"
                            >
                              {isRecording ? (
                                <>
                                  <Pause className="w-4 h-4 mr-2" />
                                  Stop ({Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')})
                                </>
                              ) : (
                                <>
                                  <Mic className="w-4 h-4 mr-2" />
                                  Start Recording
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Audio Details */}
                      <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium flex items-center">
                          <Music className="w-4 h-4 mr-2" />
                          Audio Details
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="audio-chapter">Chapter/Page</Label>
                            <Input 
                              id="audio-chapter" 
                              placeholder="e.g., Chapter 1 or Page 1-5" 
                            />
                          </div>
                          <div>
                            <Label htmlFor="audio-narrator">Narrator Name</Label>
                            <Input 
                              id="audio-narrator" 
                              placeholder="e.g., John Smith" 
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="audio-notes">Notes (optional)</Label>
                          <Textarea 
                            id="audio-notes" 
                            placeholder="Add any notes about this recording..." 
                            rows={2}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="audio-featured"
                            className="rounded"
                          />
                          <Label htmlFor="audio-featured" className="cursor-pointer">
                            Set as featured narration for this book
                          </Label>
                        </div>

                        <Button className="w-full" disabled={isUploading || isRecording}>
                          <Check className="w-4 h-4 mr-2" />
                          Save Audio Recording
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Existing Audio Recordings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileAudio className="w-5 h-5 mr-2" />
                      Uploaded Audio Recordings
                    </div>
                    <Badge variant="secondary">{audioFiles.length} recordings</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {audioFiles.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Volume2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No audio recordings yet</p>
                      <p className="text-xs">Upload or record audio for your books above</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {[
                        {
                          book: 'The Adventures of Rusty the Red Panda',
                          chapter: 'Full Book',
                          narrator: 'Sarah Johnson',
                          duration: '15:32',
                          size: '14.2 MB',
                          uploaded: '2 days ago',
                          featured: true
                        },
                        {
                          book: 'Akai and The Quokka Quest',
                          chapter: 'Chapter 1-3',
                          narrator: 'Michael Chen',
                          duration: '12:18',
                          size: '11.8 MB',
                          uploaded: '5 days ago',
                          featured: false
                        }
                      ].map((audio, index) => (
                        <div key={index} className="p-4 bg-muted/50 rounded-lg space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{audio.book}</p>
                                {audio.featured && (
                                  <Badge variant="default" className="text-xs">Featured</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {audio.chapter} • Narrated by {audio.narrator}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Play className="w-3 h-3" />
                                  {audio.duration}
                                </span>
                                <span>{audio.size}</span>
                                <span>{audio.uploaded}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toast.info('Playing audio...')}
                              >
                                <Play className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this audio recording?')) {
                                    toast.success('Audio recording deleted');
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Audio Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Audio Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-generate subtitles</p>
                      <p className="text-sm text-muted-foreground">
                        Create subtitles from audio recordings
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Audio quality</p>
                      <p className="text-sm text-muted-foreground">
                        Set default recording quality
                      </p>
                    </div>
                    <Select defaultValue="high">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (32kbps)</SelectItem>
                        <SelectItem value="medium">Medium (128kbps)</SelectItem>
                        <SelectItem value="high">High (320kbps)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable TTS fallback</p>
                      <p className="text-sm text-muted-foreground">
                        Use text-to-speech when no recording is available
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="characters" className="space-y-4">
              {/* Character Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Character Management
                    </div>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Character
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Upload Character Image */}
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Upload Character Image</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      PNG, JPG up to 5MB
                    </p>
                    <Button onClick={() => handleFileUpload('character')} disabled={isUploading}>
                      Choose Image
                    </Button>
                  </div>

                  {/* Character Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="char-name">Character Name</Label>
                        <Input id="char-name" placeholder="Enter character name" />
                      </div>
                      <div>
                        <Label htmlFor="char-series">Series</Label>
                        <Input id="char-series" placeholder="Forest, Water, etc." />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="char-bio">Character Bio</Label>
                      <Textarea id="char-bio" placeholder="Enter character biography" />
                    </div>
                    <div>
                      <Label htmlFor="char-skills">Skills (comma separated)</Label>
                      <Input id="char-skills" placeholder="Climbing, Swimming, etc." />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              {/* User Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCheck className="w-5 h-5 mr-2" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Active Users */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{dashboardStats.activeUsers}</div>
                        <div className="text-sm text-muted-foreground">Active Now</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{dashboardStats.totalUsers}</div>
                        <div className="text-sm text-muted-foreground">Total Users</div>
                      </div>
                    </div>

                    {/* Recent Users */}
                    <div>
                      <h4 className="font-medium mb-3">Recent Registrations</h4>
                      <div className="space-y-2">
                        {['alice_reader', 'book_lover_123', 'story_fan', 'young_explorer'].map((username, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium">{username}</p>
                              <p className="text-sm text-muted-foreground">Joined {index + 1} day{index > 0 ? 's' : ''} ago</p>
                            </div>
                            <Badge variant="secondary">Active</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Add Book Dialog */}
      <Dialog open={showAddBookDialog} onOpenChange={setShowAddBookDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new book to the library.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="book-title">Book Title</Label>
                <Input
                  id="book-title"
                  placeholder="Enter book title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="book-author">Author</Label>
                <Input
                  id="book-author"
                  placeholder="Enter author name"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="book-price">Price</Label>
                <Input
                  id="book-price"
                  placeholder="$0.00"
                  value={newBook.price}
                  onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="book-pages">Pages</Label>
                <Input
                  id="book-pages"
                  placeholder="Enter number of pages"
                  value={newBook.pages}
                  onChange={(e) => setNewBook({ ...newBook, pages: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="book-category">Category</Label>
                <Select
                  value={newBook.category}
                  onValueChange={(value) => setNewBook({ ...newBook, category: value })}
                >
                  <SelectTrigger id="book-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Forest Adventures">Forest Adventures</SelectItem>
                    <SelectItem value="Water World">Water World</SelectItem>
                    <SelectItem value="Sky High">Sky High</SelectItem>
                    <SelectItem value="Mystical Creatures">Mystical Creatures</SelectItem>
                    <SelectItem value="Space Exploration">Space Exploration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="book-cover">Cover Image</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="book-cover"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setNewBook({ ...newBook, coverImage: e.target.files[0] });
                        setCoverPreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => document.getElementById('book-cover')?.click()}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
                {coverPreview && (
                  <div className="mt-2">
                    <img
                      src={coverPreview}
                      alt="Book Cover"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="book-description">Description</Label>
              <Textarea
                id="book-description"
                placeholder="Enter book description"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="book-file">Book File</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="application/pdf,application/epub+zip"
                  className="hidden"
                  id="book-file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setNewBook({ ...newBook, bookFile: e.target.files[0] });
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => document.getElementById('book-file')?.click()}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAddBookDialog(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="ml-2"
              onClick={() => {
                // Handle book submission logic here
                toast.success('Book added successfully!');
                setShowAddBookDialog(false);
              }}
            >
              Add Book
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}