import React, { useState } from 'react';
import { motion } from 'motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { BackButton } from './BackButton';
import { 
  BookOpen, 
  Download, 
  Star, 
  Clock, 
  Grid3x3, 
  List,
  Play,
  Bookmark,
  TrendingUp
} from 'lucide-react';
import { User } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import rustyBookCover from 'figma:asset/188b17bb31b62592504df73220f0b92a4fcb6bdf.png';
import akaiBookCover from 'figma:asset/b5abfe2d983db76755f90003671db021277cd0cb.png';
import oceanOdysseyBookCover from 'figma:asset/35e57f0417a22480ba69edee9761e06a5a1836d1.png';
import curiousRaccoonsCover from 'figma:asset/5d0b398ad9ed28d2fc8dfc91b136d590ad7db509.png';
import quokkaQuestCover from 'figma:asset/92a93c5baf7979b4513517affe07c56b46488257.png';
import seaOtterCover from 'figma:asset/d9ecddc07a2bb0aa28c4d94b406385ea677afdf6.png';
import cozyKoalaCover from 'figma:asset/c0209ae3cfa35c80b09b6d8690a97b72b6fbbc30.png';
import treasureFriendshipCover from 'figma:asset/cc0283067ce656bd19ab11e061ae76d4a0df86d8.png';
import playfulMonkeysCover from 'figma:asset/a4a09538812d631cae47d9f561a58e8bc702fe4c.png';
import joyfulElephantCover from 'figma:asset/70d76b54c38e05ba6eaa723deaee45e880faff1f.png';
import wiseOwlsCover from 'figma:asset/4414bbc83b5efaadf524949b88ecd1086f1b4394.png';
import lostReindeerCover from 'figma:asset/def95e29c0eeae5105f409aeb9218afff0dec902.png';

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

function LibraryScreen({ user, setUser, theme = 'forest', onNavigate }: LibraryScreenProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const books: Book[] = [
    {
      id: '1',
      title: 'The Adventures of Rusty the Red Panda',
      author: 'Rooted Tales',
      category: 'Forest Adventures',
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
      category: 'Forest Adventures',
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
      category: 'Water Adventures',
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
      category: 'Forest Adventures',
      description: 'Join Akai on an exciting treasure hunt adventure with playful raccoons, discovering friendship and teamwork along the way.',
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
      category: 'Forest Adventures',
      description: 'Join Akai and cheerful quokkas on an epic quest to save a vital plant that sustains both their homes, discovering the power of unity and friendship.',
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
      category: 'Water Adventures',
      description: 'Join Kaito as he shares the magical tale of Mizuto the sea otter, who discovers that true treasure is friendship shared with others.',
      progress: 0,
      rating: 4.8,
      isDownloaded: false,
      isPurchased: true,
      coverColor: 'from-cyan-400 to-blue-500',
      readingTime: '26 min',
      pages: 58,
      price: '$13.99'
    },
    {
      id: '7',
      title: 'Akai Remarkable Adventure with The Cozy Koala',
      author: 'Rooted Tales',
      category: 'Forest Adventures',
      description: 'Join Akai on Memory Lane as he meets quokkas and discovers the magical Koala Kingdom, learning about the lasting power of friendship.',
      progress: 20,
      rating: 4.8,
      isDownloaded: false,
      isPurchased: true,
      coverColor: 'from-emerald-400 to-teal-500',
      readingTime: '28 min',
      pages: 86,
      price: '$18.99'
    },
    {
      id: '8',
      title: 'Akai and Hedge: The Treasure of Friendship',
      author: 'Rooted Tales',
      category: 'Forest Adventures',
      description: 'Follow Akai and Hedge the hedgehog as they embark on a treasure hunt adventure, discovering that the greatest treasures are the friendships we make along the way.',
      progress: 0,
      rating: 4.7,
      isDownloaded: false,
      isPurchased: true,
      coverColor: 'from-amber-400 to-orange-500',
      readingTime: '32 min',
      pages: 65,
      price: '$15.99'
    },
    {
      id: '9',
      title: 'Akai with The Playful Monkeys',
      author: 'Rooted Tales',
      category: 'Forest Adventures',
      description: 'Join Akai as he discovers the joy of play with a lively troop of monkeys, learning to embrace fun and carefree moments.',
      progress: 0,
      rating: 4.6,
      isDownloaded: false,
      isPurchased: true,
      coverColor: 'from-yellow-400 to-orange-400',
      readingTime: '26 min',
      pages: 52,
      price: '$12.99'
    },
    {
      id: '10',
      title: 'Akai and The Joyful Elephant',
      author: 'Rooted Tales',
      category: 'Forest Adventures',
      description: 'Join Akai as he meets Ella, a joyful dancing elephant, and discovers the power of friendship through shared adventures and playful moments.',
      progress: 0,
      rating: 4.8,
      isDownloaded: false,
      isPurchased: true,
      coverColor: 'from-blue-400 to-green-400',
      readingTime: '29 min',
      pages: 45,
      price: '$10.99'
    },
    {
      id: '11',
      title: 'Akai\'s lessons with The Wise Owls',
      author: 'Rooted Tales',
      category: 'Forest Adventures',
      description: 'Join Akai on a thoughtful journey as he seeks wisdom from the legendary Wise Owls, learning valuable life lessons about patience, empathy, and growth.',
      progress: 0,
      rating: 4.9,
      isDownloaded: false,
      isPurchased: true,
      coverColor: 'from-indigo-400 to-purple-500',
      readingTime: '25 min',
      pages: 48,
      price: '$11.99'
    },
    {
      id: '12',
      title: 'Akai and The Lost Reindeer',
      author: 'Rooted Tales',
      category: 'Snow Adventures',
      description: 'Join Akai as he helps Finn, a lost baby reindeer, find his way back to his family while learning about courage, trust, and the strength of friendship.',
      progress: 0,
      rating: 4.8,
      isDownloaded: false,
      isPurchased: true,
      coverColor: 'from-blue-300 to-indigo-400',
      readingTime: '27 min',
      pages: 50,
      price: '$11.99'
    }
  ];

  const continueReading = books.filter(book => book.progress > 0 && book.progress < 100);
  const userLibrary = books; // Show all books instead of just purchased ones

  const handleBookClick = (book: Book) => {
    // Check if user is signed in
    if (!user) {
      // User not signed in - redirect to auth
      if (onNavigate) {
        onNavigate('auth');
      }
      return;
    }
    
    // User is signed in - navigate to book overview for available books
    if ((book.id === '1' || book.id === '2' || book.id === '3' || book.id === '4' || book.id === '5' || book.id === '6' || book.id === '7' || book.id === '8' || book.id === '9' || book.id === '10' || book.id === '11' || book.id === '12') && onNavigate) {
      onNavigate('bookOverview', book.id);
    } else {
      // For other books, show a placeholder action
      console.log(`Opening book: ${book.title}`);
    }
  };

  const BookCard = ({ book, isCarousel = false }: { book: Book; isCarousel?: boolean }) => (
    <Card 
      className={`${isCarousel ? 'w-40' : 'w-full'} hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer`}
      onClick={() => handleBookClick(book)}
    >
      <CardContent className="pt-[19px] pr-[16px] pb-[24px] pl-[16px]">
        <div className={`aspect-[3/4] bg-gradient-to-br ${book.coverColor} rounded-lg mb-3 flex items-center justify-center relative overflow-hidden backdrop-blur-lg bg-opacity-75 border border-white/30 shadow-xl`}>
          {book.id === '1' ? (
            <ImageWithFallback
              src={rustyBookCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : book.id === '2' ? (
            <ImageWithFallback
              src={akaiBookCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : book.id === '3' ? (
            <ImageWithFallback
              src={oceanOdysseyBookCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : book.id === '4' ? (
            <ImageWithFallback
              src={curiousRaccoonsCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : book.id === '5' ? (
            <ImageWithFallback
              src={quokkaQuestCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : book.id === '6' ? (
            <ImageWithFallback
              src={seaOtterCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : book.id === '7' ? (
            <ImageWithFallback
              src={cozyKoalaCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : book.id === '8' ? (
            <ImageWithFallback
              src={treasureFriendshipCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : book.id === '9' ? (
            <ImageWithFallback
              src={playfulMonkeysCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : book.id === '10' ? (
            <ImageWithFallback
              src={joyfulElephantCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : book.id === '11' ? (
            <ImageWithFallback
              src={wiseOwlsCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : book.id === '12' ? (
            <ImageWithFallback
              src={lostReindeerCover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen className="w-12 h-12 text-white/80" />
          )}
          {book.progress > 0 && (
            <div className="absolute bottom-2 left-2 right-2">
              <Progress value={book.progress} className="h-1" />
            </div>
          )}
          {!book.isPurchased && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
              $2.99
            </Badge>
          )}
          {book.isDownloaded && (
            <Download className="absolute top-2 left-2 w-4 h-4 text-white" />
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground">{book.author}</p>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{book.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{book.readingTime}</span>
            </div>
          </div>

          {book.progress > 0 && (
            <div className="text-xs text-muted-foreground">
              {book.progress}% complete
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            {book.isPurchased ? (
              <Button 
                size="sm" 
                className="flex-1 h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookClick(book);
                }}
              >
                <Play className="w-3 h-3 mr-1" />
                {book.progress > 0 ? 'Continue' : 'Read'}
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Purchase book: ${book.title}`);
                }}
              >
                Purchase
              </Button>
            )}
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                console.log(`Bookmark toggled for: ${book.title}`);
              }}
            >
              <Bookmark className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-full overflow-y-auto bg-background library-screen pb-24">
      {/* Back Button */}
      <BackButton onBack={() => onNavigate?.('home')} />
      
      <div className="p-6 space-y-6 screen-transparent-bg">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {user ? `Welcome back, ${user.username}!` : 'Welcome to Rooted Tales!'}
          </h1>
          <p className="text-[rgba(48,48,51,1)]">
            {user ? 'Continue your magical reading journey' : 'Discover enchanting stories about forest animals'}
          </p>
        </motion.div>

        {/* Continue Reading */}
        {continueReading.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center text-[20px]">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Continue Reading
              </h2>
            </div>
            
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {continueReading.map((book) => (
                  <CarouselItem key={book.id} className="pl-2 md:pl-4 basis-auto">
                    <BookCard book={book} isCarousel />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </motion.section>
        )}



        {/* Your Library */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Book Library</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-4">
              {userLibrary.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {userLibrary.map((book) => (
                <Card key={book.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div 
                      className="flex space-x-4 cursor-pointer"
                      onClick={() => handleBookClick(book)}
                    >
                      <div className={`w-16 h-20 bg-gradient-to-br ${book.coverColor} rounded flex items-center justify-center flex-shrink-0 backdrop-blur-md bg-opacity-80 border border-white/20 shadow-lg`}>
                        <BookOpen className="w-6 h-6 text-white drop-shadow-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{book.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{book.readingTime}</span>
                          </div>
                        </div>
                        {book.progress > 0 && (
                          <div className="mt-2">
                            <Progress value={book.progress} className="h-1" />
                            <span className="text-xs text-muted-foreground">{book.progress}% complete</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          size="sm" 
                          className="h-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookClick(book);
                          }}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          {book.progress > 0 ? 'Continue' : 'Read'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Bookmark toggled for: ${book.title}`);
                          }}
                        >
                          <Bookmark className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.section>


      </div>
    </div>
  );
}

export default LibraryScreen;
export { LibraryScreen };
