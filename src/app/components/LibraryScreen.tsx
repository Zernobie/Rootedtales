import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { BackButton } from './BackButton';
import { 
  BookOpen, 
  Star, 
  Clock, 
  Grid3x3, 
  List as ListIcon,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { User } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import rustyBookCover from 'figma:asset/188b17bb31b62592504df73220f0b92a4fcb6bdf.png';
import akaiBookCover from 'figma:asset/b5abfe2d983db76755f90003671db021277cd0cb.png';
import oceanOdysseyBookCover from 'figma:asset/35e57f0417a22480ba69edee9761e06a5a1836d1.png';
import curiousRaccoonsCover from 'figma:asset/5d0b398ad9ed28d2fc8dfc91b136d590ad7db509.png';
import quokkaQuestCover from 'figma:asset/92a93c5baf7979b4513517affe07c56b46488257.png';
import seaOtterCover from 'figma:asset/d9ecddc07a2bb0aa28c4d94b406385ea677afdf6.png';

interface LibraryScreenProps {
  user: User | null;
  setUser?: (user: User | null) => void;
  theme?: string;
  onNavigate?: (screen: string, bookId?: string) => void;
}

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  progress: number;
  rating: number;
  isDownloaded: boolean;
  isPurchased: boolean;
  coverColor: string;
  readingTime: string;
  pages: number;
  price: string;
}

type ViewMode = 'carousel' | 'grid' | 'list';

function LibraryScreen({ user, setUser, theme = 'forest', onNavigate }: LibraryScreenProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('carousel');
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  const books: Book[] = [
    {
      id: '1',
      title: 'The Adventures of Rusty the Red Panda',
      author: 'Rooted Tales',
      category: 'Adventure',
      description: 'Join Rusty on an exciting journey through the mystical forest as he discovers friendship and courage.',
      progress: 75,
      rating: 4.8,
      isDownloaded: true,
      isPurchased: true,
      coverColor: 'from-red-400 to-orange-500',
      readingTime: '15 min',
      pages: 28,
      price: '$8.99'
    },
    {
      id: '2',
      title: 'The Adventures of Akai the Red Panda: A Heart-warming Panda Reunion',
      author: 'Rooted Tales',
      category: 'Family',
      description: 'A heartwarming tale of family reunion and the bonds that connect us all.',
      progress: 60,
      rating: 4.9,
      isDownloaded: true,
      isPurchased: true,
      coverColor: 'from-pink-400 to-red-500',
      readingTime: '35 min',
      pages: 76,
      price: '$16.99'
    },
    {
      id: '3',
      title: 'Akai and Kaito in the Great Ocean Odyssey',
      author: 'Rooted Tales',
      category: 'Adventure',
      description: 'Join Akai and Kaito on a heartwarming ocean adventure filled with friendship, courage, and magical discoveries.',
      progress: 30,
      rating: 4.8,
      isDownloaded: false,
      isPurchased: true,
      coverColor: 'from-blue-400 to-cyan-500',
      readingTime: '32 min',
      pages: 55,
      price: '$13.99'
    },
    {
      id: '4',
      title: 'Akai the Red Panda and The Curious Raccoons',
      author: 'Rooted Tales',
      category: 'Adventure',
      description: 'Join Akai on an exciting treasure hunt adventure with playful raccoons, discovering friendship and teamwork.',
      progress: 0,
      rating: 4.9,
      isDownloaded: false,
      isPurchased: true,
      coverColor: 'from-amber-400 to-orange-500',
      readingTime: '28 min',
      pages: 62,
      price: '$14.99'
    },
    {
      id: '5',
      title: 'Akai and The Red Panda and The Quokka Quest',
      author: 'Rooted Tales',
      category: 'Adventure',
      description: 'Join Akai and cheerful quokkas on an epic quest to save a vital plant, discovering the power of unity and friendship.',
      progress: 45,
      rating: 4.9,
      isDownloaded: true,
      isPurchased: true,
      coverColor: 'from-amber-400 to-yellow-500',
      readingTime: '30 min',
      pages: 65,
      price: '$15.99'
    },
    {
      id: '6',
      title: 'Akai and the Tale of The Sea Otter',
      author: 'Rooted Tales',
      category: 'Adventure',
      description: 'Join Kaito as he shares the magical tale of Mizuto the sea otter, discovering that true treasure is friendship.',
      progress: 0,
      rating: 4.8,
      isDownloaded: false,
      isPurchased: true,
      coverColor: 'from-cyan-400 to-blue-500',
      readingTime: '26 min',
      pages: 58,
      price: '$13.99'
    }
  ];

  const handleBookClick = (book: Book) => {
    if (!user) {
      if (onNavigate) {
        onNavigate('auth');
      }
      return;
    }
    
    if (onNavigate) {
      onNavigate('bookOverview', book.id);
    }
  };

  const nextCarouselBook = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % books.length);
  };

  const prevCarouselBook = () => {
    setCurrentCarouselIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  const getBookCoverImage = (bookId: string) => {
    switch (bookId) {
      case '1': return rustyBookCover;
      case '2': return akaiBookCover;
      case '3': return oceanOdysseyBookCover;
      case '4': return curiousRaccoonsCover;
      case '5': return quokkaQuestCover;
      case '6': return seaOtterCover;
      default: return null;
    }
  };

  // Carousel View
  const CarouselView = () => {
    const currentBook = books[currentCarouselIndex];
    const coverImage = getBookCoverImage(currentBook.id);

    return (
      <div className="flex flex-col items-center justify-center px-4 py-6 min-h-[calc(100vh-180px)]">
        <motion.div
          key={currentCarouselIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[340px]"
        >
          <Card className="backdrop-blur-lg bg-white/95 border border-white/40 shadow-2xl">
            <CardContent className="p-5 space-y-4">
              {/* Book Cover */}
              <div 
                className={`aspect-[3/4] bg-gradient-to-br ${currentBook.coverColor} rounded-2xl overflow-hidden shadow-xl`}
                onClick={() => handleBookClick(currentBook)}
              >
                {coverImage ? (
                  <ImageWithFallback
                    src={coverImage}
                    alt={currentBook.title}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center cursor-pointer">
                    <BookOpen className="w-20 h-20 text-white/80" />
                  </div>
                )}
              </div>

              {/* Book Title & Author */}
              <div className="text-center space-y-1.5">
                <h3 className="font-bold text-base leading-snug text-gray-800 line-clamp-2 px-2">
                  {currentBook.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  by {currentBook.author}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 text-center line-clamp-3 leading-relaxed px-2">
                {currentBook.description}
              </p>

              {/* Metadata Row */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
                  {currentBook.category}
                </Badge>
                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{currentBook.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{currentBook.readingTime}</span>
                </div>
              </div>

              {/* View Details Button */}
              <Button 
                className="w-full h-11 text-base font-semibold" 
                onClick={() => handleBookClick(currentBook)}
              >
                <Eye className="w-5 h-5 mr-2" />
                View Details
              </Button>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevCarouselBook}
                  className="rounded-full h-10 w-10"
                  aria-label="Previous book"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                {/* Dot Indicators */}
                <div className="flex items-center gap-2.5">
                  {books.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCarouselIndex(index)}
                      className={`transition-all duration-200 rounded-full ${
                        index === currentCarouselIndex
                          ? 'w-2.5 h-2.5 bg-blue-600'
                          : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to book ${index + 1}`}
                      style={{ minWidth: '8px', minHeight: '8px' }}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextCarouselBook}
                  className="rounded-full h-10 w-10"
                  aria-label="Next book"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Book Counter */}
              <p className="text-center text-sm text-gray-500 font-medium">
                Book {currentCarouselIndex + 1} of {books.length}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  };

  // Grid View
  const GridView = () => {
    return (
      <div className="grid grid-cols-2 gap-3 px-3 pb-4 pt-3">
        {books.map((book) => {
          const coverImage = getBookCoverImage(book.id);
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className="hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer backdrop-blur-lg bg-white/95 border border-white/40"
                onClick={() => handleBookClick(book)}
              >
                <CardContent className="p-3 space-y-2">
                  {/* Book Cover */}
                  <div className={`aspect-[3/4] bg-gradient-to-br ${book.coverColor} rounded-lg overflow-hidden shadow-lg`}>
                    {coverImage ? (
                      <ImageWithFallback
                        src={coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white/80" />
                      </div>
                    )}
                  </div>

                  {/* Book Title */}
                  <h3 className="font-bold text-[13px] leading-tight text-gray-800 line-clamp-2 min-h-[2.5rem]">
                    {book.title}
                  </h3>

                  {/* Author */}
                  <p className="text-[11px] text-gray-600 line-clamp-1 font-medium">
                    by {book.author}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between pt-1">
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full font-semibold">
                      {book.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-[11px] font-bold text-gray-700">{book.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // List View
  const ListView = () => {
    return (
      <div className="space-y-3 px-4 pb-4">
        {books.map((book) => {
          const coverImage = getBookCoverImage(book.id);
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className="hover:bg-gray-50 transition-all duration-200 cursor-pointer backdrop-blur-lg bg-white/90 border border-white/30"
                onClick={() => handleBookClick(book)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {/* Small Book Cover Thumbnail */}
                    <div className={`w-16 h-20 bg-gradient-to-br ${book.coverColor} rounded-lg overflow-hidden shadow-md flex-shrink-0`}>
                      {coverImage ? (
                        <ImageWithFallback
                          src={coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-white/80" />
                        </div>
                      )}
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      {/* Title */}
                      <h3 className="font-bold text-sm text-gray-800 line-clamp-2 leading-tight">
                        {book.title}
                      </h3>

                      {/* Author */}
                      <p className="text-xs text-gray-600">
                        by {book.author}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                        {book.description}
                      </p>

                      {/* Metadata Row */}
                      <div className="flex items-center gap-2 flex-wrap pt-1">
                        <Badge variant="secondary" className="text-xs px-2 py-0.5 rounded-full">
                          {book.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-semibold text-gray-700">{book.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-600" />
                          <span className="text-xs text-gray-600">{book.readingTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <BackButton onClick={() => onNavigate && onNavigate('home')} />
          <h1 className="text-xl font-bold text-gray-800">Library Browser</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* View Mode Toggle & Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">
            {books.length} {books.length === 1 ? 'Story' : 'Stories'}
          </p>

          {/* View Mode Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'carousel' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('carousel')}
              className="h-8 px-3"
              aria-label="Carousel view"
            >
              <BookOpen className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 px-3"
              aria-label="Grid view"
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 px-3"
              aria-label="List view"
            >
              <ListIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {viewMode === 'carousel' && <CarouselView />}
            {viewMode === 'grid' && <GridView />}
            {viewMode === 'list' && <ListView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default LibraryScreen;
export { LibraryScreen };