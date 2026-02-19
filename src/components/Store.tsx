import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BackButton } from './BackButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  ShoppingCart, 
  BookOpen, 
  Crown, 
  Star, 
  Download,
  Check,
  Gift,
  Sparkles,
  Users,
  Coins,
  ExternalLink,
  Plus,
  Minus,
  Info,
  Package,
  Award,
  TrendingUp
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingCartComponent } from './ShoppingCart';
import { CheckoutFlow } from './CheckoutFlow';
import { toast } from 'sonner';
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
import journalIcon from 'figma:asset/573817ad27ab8b33688ccbb35f2e34bd779d415f.png';
import akaiClubIcon from 'figma:asset/c93be1fc85939baa10b7cab9649cebd186655436.png';

interface StoreProps {
  user: any;
  setUser: (user: any) => void;
  onNavigate?: (screen: string) => void;
}

interface StoreItem {
  id: string;
  type: 'book' | 'avatar' | 'journal' | 'membership';
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  pages?: number;
  isPurchased?: boolean;
  isPopular?: boolean;
  features?: string[];
  icon: string;
  category: string;
  coverImage?: any;
}

type StoreView = 'browse' | 'cart' | 'checkout';

export function Store({ user, setUser, onNavigate }: StoreProps) {
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [cart, setCart] = useState<StoreItem[]>([]);
  const [view, setView] = useState<StoreView>('browse');

  const storeItems: StoreItem[] = [
    // Books
    {
      id: '1',
      type: 'book',
      title: 'The Adventures of Rusty the Red Panda',
      description: 'Join Rusty on his first adventure through the mystical forest.',
      price: '$4.99',
      pages: 28,
      isPurchased: user?.purchasedBooks?.includes('1'),
      icon: '🐾',
      category: 'Forest Adventures',
      coverImage: rustyBookCover,
      features: ['eBook: $4.99', 'Paperback: $8.99 (Amazon)', 'Hardcover: $14.99 (Amazon)']
    },
    {
      id: '2',
      type: 'book',
      title: 'The Adventures of Akai the Red Panda: A Heart-warming Panda Reunion',
      description: 'A touching story about family bonds and reunion.',
      price: '$8.99',
      pages: 76,
      isPurchased: user?.purchasedBooks?.includes('2'),
      icon: '🐼',
      category: 'Forest Adventures',
      coverImage: akaiBookCover,
      features: ['eBook: $8.99', 'Paperback: $16.99 (Amazon)', 'Hardcover: $24.99 (Amazon)']
    },
    {
      id: '3',
      type: 'book',
      title: 'Akai and Kaito in the Great Ocean Odyssey',
      description: 'Dive into underwater adventures with Akai and Kaito.',
      price: '$6.99',
      pages: 55,
      isPurchased: user?.purchasedBooks?.includes('3'),
      icon: '🌊',
      category: 'Water Adventures',
      coverImage: oceanOdysseyBookCover,
      features: ['eBook: $6.99', 'Paperback: $13.99 (Amazon)', 'Hardcover: $19.99 (Amazon)']
    },
    {
      id: '4',
      type: 'book',
      title: 'Akai the Red Panda and The Curious Raccoons',
      description: 'Meet the mischievous raccoon family and their adventures.',
      price: '$6.99',
      pages: 53,
      isPurchased: user?.purchasedBooks?.includes('4'),
      icon: '🦝',
      category: 'Forest Adventures',
      coverImage: curiousRaccoonsCover,
      features: ['eBook: $6.99', 'Paperback: $12.99 (Amazon)', 'Hardcover: $18.99 (Amazon)']
    },
    {
      id: '5',
      type: 'book',
      title: 'Akai and The Red Panda and The Quokka Quest',
      description: 'Help a lost quokka find their way home.',
      price: '$7.99',
      pages: 61,
      isPurchased: user?.purchasedBooks?.includes('5'),
      isPopular: true,
      icon: '😊',
      category: 'Forest Adventures',
      coverImage: quokkaQuestCover,
      features: ['eBook: $7.99', 'Paperback: $14.99 (Amazon)', 'Hardcover: $21.99 (Amazon)']
    },
    {
      id: '6',
      type: 'book',
      title: 'Akai and the Tale of The Sea Otter',
      description: 'Discover friendship in the ocean depths.',
      price: '$7.99',
      pages: 62,
      isPurchased: user?.purchasedBooks?.includes('6'),
      icon: '🦦',
      category: 'Water Adventures',
      coverImage: seaOtterCover,
      features: ['eBook: $7.99', 'Paperback: $14.99 (Amazon)', 'Hardcover: $21.99 (Amazon)']
    },
    {
      id: '7',
      type: 'book',
      title: 'Akai Remarkable Adventure with The Cozy Koala',
      description: 'Learn about comfort and finding home.',
      price: '$9.99',
      pages: 86,
      isPurchased: user?.purchasedBooks?.includes('7'),
      icon: '🐨',
      category: 'Forest Adventures',
      coverImage: cozyKoalaCover,
      features: ['eBook: $9.99', 'Paperback: $18.99 (Amazon)', 'Hardcover: $26.99 (Amazon)']
    },
    {
      id: '8',
      type: 'book',
      title: 'Akai and Hedge: The Treasure of Friendship',
      description: 'Discover that friendship is the greatest treasure.',
      price: '$7.99',
      pages: 65,
      isPurchased: user?.purchasedBooks?.includes('8'),
      icon: '🦔',
      category: 'Forest Adventures',
      coverImage: treasureFriendshipCover,
      features: ['eBook: $7.99', 'Paperback: $15.99 (Amazon)', 'Hardcover: $22.99 (Amazon)']
    },
    {
      id: '9',
      type: 'book',
      title: 'Akai with The Playful Monkeys',
      description: 'Swing into fun with a troop of playful monkeys.',
      price: '$6.99',
      pages: 52,
      isPurchased: user?.purchasedBooks?.includes('9'),
      icon: '🐵',
      category: 'Forest Adventures',
      coverImage: playfulMonkeysCover,
      features: ['eBook: $6.99', 'Paperback: $12.99 (Amazon)', 'Hardcover: $18.99 (Amazon)']
    },
    {
      id: '10',
      type: 'book',
      title: 'Akai and The Joyful Elephant',
      description: 'Learn about kindness from a gentle giant.',
      price: '$5.99',
      pages: 45,
      isPurchased: user?.purchasedBooks?.includes('10'),
      icon: '🐘',
      category: 'Forest Adventures',
      coverImage: joyfulElephantCover,
      features: ['eBook: $5.99', 'Paperback: $10.99 (Amazon)', 'Hardcover: $16.99 (Amazon)']
    },
    {
      id: '11',
      type: 'book',
      title: "Akai's lessons with The Wise Owls",
      description: 'Gain wisdom from the ancient forest guardians.',
      price: '$6.49',
      pages: 48,
      isPurchased: user?.purchasedBooks?.includes('11'),
      icon: '🦉',
      category: 'Forest Adventures',
      coverImage: wiseOwlsCover,
      features: ['eBook: $6.49', 'Paperback: $11.99 (Amazon)', 'Hardcover: $17.99 (Amazon)']
    },
    {
      id: '12',
      type: 'book',
      title: 'Akai and The Lost Reindeer',
      description: 'Guide a lost reindeer through the winter landscape.',
      price: '$6.49',
      pages: 50,
      isPurchased: user?.purchasedBooks?.includes('12'),
      icon: '🦌',
      category: 'Snow Adventures',
      coverImage: lostReindeerCover,
      features: ['eBook: $6.49', 'Paperback: $11.99 (Amazon)', 'Hardcover: $17.99 (Amazon)']
    },

    // Journal
    {
      id: 'journal1',
      type: 'journal',
      title: 'Rooted Tales Journal',
      description: 'Your perfect creative companion for documenting curious wanderings, peaceful thoughts, and joyful moments.',
      price: '$39.99',
      pages: 96,
      isPopular: true,
      icon: '📖',
      category: 'Journals',
      coverImage: journalIcon,
      features: ['96 Beautiful Pages', '64 Blank Pages for Sketching', '30 Classic Lined Pages', 'Adorable Animal Illustrations', 'Full-Page Cover Art', 'Animal Muse on Every Lined Page']
    },

    // Membership
    {
      id: 'membership1',
      type: 'membership',
      title: "Akai's Adventure Club - Premium",
      description: 'Unlimited access to all ebooks, mini-games, badges, and exclusive content.',
      price: '$4.99/month',
      originalPrice: '$34.99/year',
      isPopular: true,
      icon: '⭐',
      category: 'Membership',
      coverImage: akaiClubIcon,
      features: [
        '✅ Full Ebook Library (All 12 Books)',
        '✅ All Mini-Games & Badges',
        '✅ Character Lore & Extras',
        '✅ Ad-Free Experience',
        '✅ 25% Off Physical Books',
        '✅ Priority Customer Support',
        '✅ Early Access to New Releases',
        '🎁 7-Day FREE Trial',
        '💰 Save 40% with Annual Plan ($34.99/year)'
      ]
    },
    {
      id: 'membership2',
      type: 'membership',
      title: "Akai's Adventure Club - Premium+",
      description: 'Everything in Premium PLUS the complete audiobook library with unlimited streaming.',
      price: '$6.99/month',
      originalPrice: '$49.99/year',
      isPopular: false,
      icon: '🎧',
      category: 'Membership',
      coverImage: akaiClubIcon,
      features: [
        '✅ Everything in Premium',
        '✅ Full Audiobook Library',
        '✅ Unlimited Streaming & Downloads',
        '✅ Exclusive Read-Along Mode',
        '✅ Premium Audio Quality',
        '✅ Offline Listening',
        '✅ Ad-Free Experience',
        '✅ 25% Off Physical Books',
        '🎁 7-Day FREE Trial',
        '💰 Save 40% with Annual Plan ($49.99/year)'
      ]
    }
  ];

  const handlePurchase = (item: StoreItem) => {
    if (item.type === 'book') {
      const updatedUser = {
        ...user,
        purchasedBooks: [...(user?.purchasedBooks || []), item.id]
      };
      setUser(updatedUser);
    }
    setSelectedItem(null);
  };

  const handleAmazonClick = () => {
    window.open('https://www.amazon.com/stores/author/B0DJKHMXKP', '_blank', 'noopener,noreferrer');
  };

  const canPurchase = (item: StoreItem) => {
    return true;
  };

  const isItemPurchased = (item: StoreItem) => {
    if (item.type === 'book') {
      return user?.purchasedBooks?.includes(item.id);
    }
    return false;
  };

  const categories = [
    { id: 'all', name: 'All', count: storeItems.length },
    { id: 'book', name: 'Books', count: storeItems.filter(item => item.type === 'book').length },
    { id: 'journal', name: 'Journals', count: storeItems.filter(item => item.type === 'journal').length },
    { id: 'membership', name: 'Premium', count: storeItems.filter(item => item.type === 'membership').length }
  ];

  const addToCart = (item: StoreItem) => {
    if (isItemPurchased(item)) {
      toast.info('You already own this item!');
      return;
    }
    if (cart.find(cartItem => cartItem.id === item.id)) {
      toast.info('Item already in cart!');
      return;
    }
    setCart([...cart, item]);
    toast.success(`Added ${item.title} to cart!`);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(cartItem => cartItem.id !== itemId));
  };

  const handleCompleteCheckout = () => {
    const bookIds = cart.filter(item => item.type === 'book').map(item => item.id);
    const updatedUser = {
      ...user,
      purchasedBooks: [...(user?.purchasedBooks || []), ...bookIds]
    };
    setUser(updatedUser);
    setCart([]);
    setView('browse');
    
    if (onNavigate) {
      onNavigate('library');
    }
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return sum + price;
  }, 0);

  const cartItemsForCheckout = cart.map(item => ({
    ...item,
    price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
    originalPrice: item.originalPrice ? parseFloat(item.originalPrice.replace(/[^0-9.]/g, '')) : undefined
  }));

  if (view === 'cart') {
    return (
      <ShoppingCartComponent
        cartItems={cartItemsForCheckout}
        onRemoveItem={removeFromCart}
        onCheckout={() => setView('checkout')}
        onContinueShopping={() => setView('browse')}
      />
    );
  }

  if (view === 'checkout') {
    return (
      <CheckoutFlow
        cartItems={cartItemsForCheckout}
        total={cartTotal}
        onComplete={handleCompleteCheckout}
        onBack={() => setView('cart')}
      />
    );
  }

  const totalBooks = storeItems.filter(item => item.type === 'book').length;
  const purchasedCount = user?.purchasedBooks?.length || 0;

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-primary/5 via-white to-primary/10 pb-24">
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative"
        >
          <div className="flex items-center justify-center mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <ShoppingCart className="w-10 h-10 text-primary mr-3" />
            </motion.div>
            <h1 className="text-3xl font-bold text-black">
              Rooted Tales Store
            </h1>
          </div>
          <p className="text-gray-700">
            Discover new adventures and unlock exclusive content
          </p>
        </motion.div>

        {/* Cart Button - Below Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('cart')}
            className="bg-gradient-to-br from-white via-white to-primary/5 border-2 border-primary/20 rounded-xl px-4 py-2 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-primary" />
              {cart.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
                >
                  {cart.length}
                </motion.div>
              )}
            </div>
            <span className="font-semibold text-black">Cart</span>
          </motion.button>
        </motion.div>

        {/* Premium Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate && onNavigate('subscription')}
            className="cursor-pointer"
          >
            <Card className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 border-0 overflow-hidden shadow-xl">
              <CardContent className="p-6 relative">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-6 h-6 text-white" />
                        <h3 className="text-xl font-bold text-white">Join Akai's Adventure Club!</h3>
                      </div>
                      <p className="text-sm text-white/95 mb-3 max-w-xs">
                        Get unlimited access to all 12 books, games & exclusive content
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-white text-orange-600 font-bold border-0 shadow-md">
                          From $4.99/month
                        </Badge>
                        <Badge className="bg-green-500 text-white border-0 shadow-md">
                          🎁 7-Day FREE Trial
                        </Badge>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-5xl ml-4"
                    >
                      ⭐
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-gradient-to-br from-white via-white to-primary/5 border-2 border-primary/20 p-1 h-auto shadow-lg">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="text-xs font-semibold text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white py-2 rounded-lg"
                >
                  <div className="flex flex-col items-center">
                    <span>{category.name}</span>
                    <span className="text-[10px] opacity-70">({category.count})</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {storeItems.map((item, idx) => (
                <StoreItemCard 
                  key={item.id} 
                  item={item} 
                  onSelect={setSelectedItem}
                  isPurchased={isItemPurchased(item)}
                  canPurchase={canPurchase(item)}
                  addToCart={addToCart}
                  index={idx}
                />
              ))}
            </TabsContent>

            <TabsContent value="book" className="space-y-4">
              {storeItems.filter(item => item.type === 'book').map((item, idx) => (
                <StoreItemCard 
                  key={item.id} 
                  item={item} 
                  onSelect={setSelectedItem}
                  isPurchased={isItemPurchased(item)}
                  canPurchase={canPurchase(item)}
                  addToCart={addToCart}
                  index={idx}
                />
              ))}
            </TabsContent>

            <TabsContent value="journal" className="space-y-4">
              {storeItems.filter(item => item.type === 'journal').map((item, idx) => (
                <StoreItemCard 
                  key={item.id} 
                  item={item} 
                  onSelect={setSelectedItem}
                  isPurchased={isItemPurchased(item)}
                  canPurchase={canPurchase(item)}
                  addToCart={addToCart}
                  index={idx}
                />
              ))}
            </TabsContent>

            <TabsContent value="membership" className="space-y-4">
              {storeItems.filter(item => item.type === 'membership').map((item, idx) => (
                <StoreItemCard 
                  key={item.id} 
                  item={item} 
                  onSelect={setSelectedItem}
                  isPurchased={isItemPurchased(item)}
                  canPurchase={canPurchase(item)}
                  addToCart={addToCart}
                  index={idx}
                />
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Purchase Dialog */}
        <AnimatePresence>
          {selectedItem && (
            <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
              <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-white via-white to-primary/5 border-2 border-primary/20">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl font-bold text-black">
                    {selectedItem.title}
                  </DialogTitle>
                  <DialogDescription className="text-center text-gray-700">
                    {selectedItem.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  {selectedItem.coverImage && (
                    <div className="w-full h-48 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg">
                      <ImageWithFallback
                        src={selectedItem.coverImage}
                        alt={selectedItem.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {selectedItem.features && (
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 border-2 border-primary/20">
                      <h4 className="font-bold mb-3 text-black flex items-center gap-2">
                        <Package className="w-4 h-4 text-primary" />
                        What's Included:
                      </h4>
                      <ul className="space-y-2">
                        {selectedItem.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedItem.pages && (
                    <div className="flex justify-center">
                      <Badge variant="outline" className="text-black border-2 border-primary/20 bg-white">
                        <BookOpen className="w-4 h-4 mr-2 text-primary" />
                        {selectedItem.pages} pages
                      </Badge>
                    </div>
                  )}

                  {selectedItem.type === 'book' && (
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-2xl border-2 border-blue-500/20">
                      <p className="text-sm text-center text-gray-700 mb-3 font-medium">
                        📚 Also available in physical format
                      </p>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAmazonClick();
                        }}
                        variant="outline"
                        className="w-full border-2 border-blue-400 hover:bg-blue-50 text-black font-semibold"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Amazon
                      </Button>
                    </div>
                  )}

                  <div className="text-center py-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border-2 border-primary/20">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {selectedItem.price}
                    </div>
                    {selectedItem.originalPrice && (
                      <div className="text-sm text-gray-600 line-through mt-1">
                        {selectedItem.originalPrice}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedItem(null)}
                      className="flex-1 border-2 border-primary/20 text-black font-semibold hover:bg-primary/5"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        addToCart(selectedItem);
                        setSelectedItem(null);
                      }}
                      disabled={isItemPurchased(selectedItem)}
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl"
                    >
                      {isItemPurchased(selectedItem) ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Owned
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface StoreItemCardProps {
  item: StoreItem;
  onSelect: (item: StoreItem) => void;
  isPurchased: boolean;
  canPurchase: boolean;
  addToCart: (item: StoreItem) => void;
  index: number;
}

function StoreItemCard({ item, onSelect, isPurchased, canPurchase, addToCart, index }: StoreItemCardProps) {
  const isMembership = item.type === 'membership';
  const isJournal = item.type === 'journal';
  const shouldRedirectToAmazon = isJournal; // Only journals redirect to Amazon
  
  const handleAmazonRedirect = () => {
    window.open('https://www.amazon.com/stores/author/B0DJKHMXKP', '_blank', 'noopener,noreferrer');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="bg-gradient-to-br from-white via-white to-primary/5 border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {item.isPopular && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-4 py-1.5 flex items-center justify-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-white" />
            POPULAR CHOICE
          </div>
        )}
        
        <CardContent className="p-3">
          <div className="flex gap-3">
            {/* Cover Image */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onClick={() => onSelect(item)}
              className={`${isMembership ? 'w-16 h-16' : 'w-20 h-28'} flex-shrink-0 cursor-pointer relative overflow-hidden rounded-lg`}
            >
              {item.coverImage ? (
                <ImageWithFallback
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
              )}
              {isPurchased && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm"
                >
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg">
                    <Check className="w-3 h-3" />
                    OWNED
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            {/* Content */}
            <div className="flex-1 flex flex-col min-w-0">
              <div 
                onClick={() => onSelect(item)}
                className="cursor-pointer flex-1"
              >
                <h3 className={`font-bold text-black ${isMembership ? 'text-xs' : 'text-sm'} mb-1 line-clamp-2 leading-tight`}>
                  {item.title}
                </h3>
                <p className="text-[10px] text-gray-700 mb-2 line-clamp-2">
                  {item.description}
                </p>
                
                {!isMembership && (
                  <div className="flex items-center gap-1.5 mb-2">
                    {item.pages && (
                      <Badge variant="outline" className="text-[9px] text-black border-primary/30 bg-primary/5 px-1.5 py-0">
                        <BookOpen className="w-2.5 h-2.5 mr-0.5" />
                        {item.pages}p
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[9px] text-black border-primary/30 bg-primary/5 px-1.5 py-0">
                      {item.category}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                <div className="flex-1 min-w-0 mr-2">
                  <div className="text-sm font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent truncate">
                    {item.price}
                  </div>
                  {item.originalPrice && (
                    <div className="text-[9px] text-gray-600 line-through truncate">
                      {item.originalPrice}
                    </div>
                  )}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (shouldRedirectToAmazon) {
                      handleAmazonRedirect();
                    } else if (!isPurchased) {
                      addToCart(item);
                    }
                  }}
                  disabled={isPurchased && !shouldRedirectToAmazon}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1 transition-all shadow-md flex-shrink-0 ${
                    shouldRedirectToAmazon
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
                      : isPurchased
                      ? 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-lg'
                  }`}
                >
                  {shouldRedirectToAmazon ? (
                    <>
                      <ExternalLink className="w-3 h-3" />
                      Amazon
                    </>
                  ) : isPurchased ? (
                    <>
                      <Check className="w-3 h-3" />
                      Owned
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      Add
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
