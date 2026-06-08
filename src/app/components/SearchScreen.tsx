import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { BackButton } from './BackButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Download, 
  Star, 
  Clock,
  Bookmark,
  Play,
  X
} from 'lucide-react';
import { User, Theme } from '../App';
import { toast } from 'sonner@2.0.3';

interface SearchScreenProps {
  user: User | null;
  theme: Theme;
  setUser?: (user: User | null) => void;
}

interface SearchResult {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  rating: number;
  readingTime: string;
  isDownloaded: boolean;
  isPurchased: boolean;
  isBookmarked: boolean;
  coverColor: string;
  tags: string[];
}

export function SearchScreen({ user, theme, setUser }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const searchResults: SearchResult[] = [
    {
      id: '1',
      title: 'The Adventures of Rusty the Red Panda',
      author: 'Forest Tales',
      category: 'Forest',
      description: 'Join Rusty on an exciting journey through the mystical forest.',
      rating: 4.8,
      readingTime: '15 min',
      isDownloaded: true,
      isPurchased: true,
      isBookmarked: true,
      coverColor: 'from-red-400 to-orange-500',
      tags: ['Adventure', 'Friendship', 'Forest']
    },



  ];

  const categories = ['all', 'Forest', 'Water', 'Snow', 'Predators'];
  const filters = [
    { value: 'all', label: 'All Books' },
    { value: 'downloaded', label: 'Downloaded' },
    { value: 'purchased', label: 'Purchased' },
    { value: 'bookmarked', label: 'Bookmarked' },
    { value: 'new', label: 'New Releases' },
  ];

  const filteredResults = searchResults.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    
    let matchesFilter = true;
    if (selectedFilter === 'downloaded') matchesFilter = book.isDownloaded;
    if (selectedFilter === 'purchased') matchesFilter = book.isPurchased;
    if (selectedFilter === 'bookmarked') matchesFilter = book.isBookmarked;
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFilter('all');
    setActiveFilters([]);
  };

  const handleBookAction = (book: SearchResult, action: 'read' | 'purchase' | 'bookmark' | 'download') => {
    if (!user && !setUser) {
      toast.error('Please sign in to perform this action');
      return;
    }

    switch (action) {
      case 'read':
        if (book.isPurchased) {
          toast.success(`Starting "${book.title}"`);
          // Navigate to reading screen
        } else {
          toast.error('Purchase this book first to start reading');
        }
        break;
      case 'purchase':
        if (!book.isPurchased) {
          toast.success(`Purchased "${book.title}" for $2.99`);
          // Update user's purchased books
          if (user && setUser) {
            const updatedUser = {
              ...user,
              purchasedBooks: [...(user.purchasedBooks || []), book.id]
            };
            setUser(updatedUser);
          }
        }
        break;
      case 'bookmark':
        const action = book.isBookmarked ? 'removed from' : 'added to';
        toast.success(`Book ${action} bookmarks`);
        // Toggle bookmark state
        book.isBookmarked = !book.isBookmarked;
        break;
      case 'download':
        if (book.isPurchased) {
          toast.success(`Downloading "${book.title}" for offline reading`);
          book.isDownloaded = true;
        } else {
          toast.error('Purchase this book first to download');
        }
        break;
    }
  };

  const BookCard = ({ book }: { book: SearchResult }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className={`w-16 h-20 bg-gradient-to-br ${book.coverColor} rounded flex items-center justify-center flex-shrink-0 relative`}>
              <BookOpen className="w-6 h-6 text-white" />
              {book.isDownloaded && (
                <Download className="absolute top-1 right-1 w-3 h-3 text-white" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate text-black">{book.title}</h3>
              <p className="text-sm text-[rgb(25,26,26)]">{book.author}</p>
              <p className="text-xs text-[rgb(22,22,23)] mt-1 line-clamp-2">
                {book.description}
              </p>
              
              <div className="flex items-center space-x-4 mt-2 text-xs">
                <div className="flex items-center space-x-1 text-black">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{book.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>{book.readingTime}</span>
                </div>
                <Badge variant="outline" className="text-xs text-black">
                  {book.category}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {book.tags.slice(0, 3).map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!activeFilters.includes(tag)) {
                        toggleFilter(tag);
                        toast.info(`Filtering by "${tag}"`);
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              {book.isPurchased ? (
                <Button 
                  size="sm" 
                  className="h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookAction(book, 'read');
                  }}
                >
                  <Play className="w-3 h-3 mr-1" />
                  Read
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookAction(book, 'purchase');
                  }}
                >
                  $2.99
                </Button>
              )}
              <div className="flex space-x-1">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className={`h-8 w-8 p-0 ${book.isBookmarked ? 'text-yellow-500' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookAction(book, 'bookmark');
                  }}
                >
                  <Bookmark className={`w-3 h-3 ${book.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
                {book.isPurchased && !book.isDownloaded && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookAction(book, 'download');
                    }}
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="h-full overflow-y-auto bg-background explore-screen">
      {/* Back Button */}
      <BackButton onBack={() => window.history.back()} />
      
      <div className="p-6 space-y-6 screen-transparent-bg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-[rgb(255,255,255)] mb-2">
            Discover Stories
          </h1>
          <p className="text-[rgb(242,242,255)]">
            Search through our magical library
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books, authors, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value="filters" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="filters" className="flex-1">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </TabsTrigger>
            </TabsList>

            <TabsContent value="filters" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-[rgb(255,255,255)]">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-[rgb(255,255,255)]">Filter By</label>
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filters.map(filter => (
                        <SelectItem key={filter.value} value={filter.value}>
                          {filter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Quick Filter Tags */}
              <div className="flex flex-wrap gap-2">
                {['Adventure', 'Magic', 'Friendship', 'Mystery'].map(tag => (
                  <Button
                    key={tag}
                    variant={activeFilters.includes(tag) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleFilter(tag)}
                    className="text-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'all' || selectedFilter !== 'all' || activeFilters.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear all filters
                </Button>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[rgb(255,255,255)]">
              Search Results
            </h2>
            <Badge variant="secondary">
              {filteredResults.length} book{filteredResults.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {filteredResults.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filters
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredResults.map(book => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-3 text-[rgb(255,255,255)]">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {['Red Panda', 'Forest Adventure', 'Magic', 'Friendship', 'Adventure', 'Rooted Tales'].map(term => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery(term)}
                className="text-xs"
              >
                {term}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}