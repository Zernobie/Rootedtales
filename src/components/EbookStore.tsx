import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Lock, Download, Star, Filter, BookOpen, Shield } from 'lucide-react';

interface Ebook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  price: number;
  format: 'EPUB' | 'PDF';
  pages: number;
  rating: number;
  reviews: number;
  size: string;
  isPurchased: boolean;
  isDownloaded: boolean;
  isDRMProtected: boolean;
  theme: 'forest' | 'ocean' | 'sunset' | 'night';
  ageRange: string;
  category: string;
}

interface EbookStoreProps {
  theme: 'forest' | 'ocean' | 'sunset' | 'night';
  onPurchase: (ebookId: string) => void;
  onDownload: (ebookId: string) => void;
  onRead: (ebookId: string) => void;
  userEmail?: string;
  isAuthenticated: boolean;
}

const THEME_COLORS = {
  forest: { primary: 'emerald-600', secondary: 'green-100', text: 'green-900' },
  ocean: { primary: 'cyan-600', secondary: 'cyan-100', text: 'cyan-900' },
  sunset: { primary: 'orange-600', secondary: 'orange-100', text: 'orange-900' },
  night: { primary: 'indigo-600', secondary: 'indigo-100', text: 'indigo-900' }
};

export function EbookStore({ theme, onPurchase, onDownload, onRead, userEmail, isAuthenticated }: EbookStoreProps) {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price' | 'newest'>('popular');
  const [showSecureIndicator, setShowSecureIndicator] = useState(true);

  const colors = THEME_COLORS[theme];

  // Mock ebook data - In production, fetch from secure API
  useEffect(() => {
    const mockEbooks: Ebook[] = [
      {
        id: 'ebook-1',
        title: "Akai's Forest Adventure",
        author: "XenWinx Authors",
        coverUrl: '/covers/akai-forest.jpg',
        description: "Join Akai on an exciting journey through the mystical forest. Perfect for young readers!",
        price: 4.99,
        format: 'EPUB',
        pages: 48,
        rating: 4.8,
        reviews: 124,
        size: '12 MB',
        isPurchased: false,
        isDownloaded: false,
        isDRMProtected: true,
        theme: 'forest',
        ageRange: '4-8 years',
        category: 'Adventure'
      },
      {
        id: 'ebook-2',
        title: "Mei's Ocean Journey",
        author: "XenWinx Authors",
        coverUrl: '/covers/mei-ocean.jpg',
        description: "Dive deep into the ocean with Mei and discover amazing sea creatures!",
        price: 4.99,
        format: 'EPUB',
        pages: 52,
        rating: 4.9,
        reviews: 156,
        size: '15 MB',
        isPurchased: true,
        isDownloaded: false,
        isDRMProtected: true,
        theme: 'ocean',
        ageRange: '5-9 years',
        category: 'Adventure'
      }
    ];
    setEbooks(mockEbooks);
  }, []);

  const filteredEbooks = ebooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ebook.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ebook.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Secure Connection Indicator */}
      {showSecureIndicator && isAuthenticated && (
        <div className={`bg-${colors.primary} text-white px-4 py-2 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Secure connection • Your purchases are protected</span>
          </div>
          <button 
            onClick={() => setShowSecureIndicator(false)}
            className="text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Authentication Warning */}
      {!isAuthenticated && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-4">
          <div className="flex items-start">
            <Lock className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Sign in to purchase and download e-books
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                Create a free account to access your library across all devices
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className={`text-2xl font-bold text-${colors.text} mb-4`}>E-Book Store</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === 'all'
                  ? `bg-${colors.primary} text-white`
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              All Books
            </button>
            <button
              onClick={() => setSelectedCategory('Adventure')}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === 'Adventure'
                  ? `bg-${colors.primary} text-white`
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Adventure
            </button>
            <button
              onClick={() => setSelectedCategory('Educational')}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === 'Educational'
                  ? `bg-${colors.primary} text-white`
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Educational
            </button>
          </div>
        </div>
      </div>

      {/* E-Book Grid */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {filteredEbooks.map((ebook) => (
          <div key={ebook.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex gap-4">
                {/* Book Cover */}
                <div className="relative flex-shrink-0 w-24 h-32">
                  <div className={`w-full h-full bg-${colors.secondary} rounded-lg flex items-center justify-center`}>
                    <BookOpen className={`w-12 h-12 text-${colors.primary}`} />
                  </div>
                  {ebook.isDRMProtected && (
                    <div className="absolute top-1 right-1 bg-black/70 rounded p-1">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{ebook.title}</h3>
                  <p className="text-sm text-gray-600">{ebook.author}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{ebook.rating}</span>
                    <span className="text-sm text-gray-500">({ebook.reviews})</span>
                  </div>

                  {/* Details */}
                  <div className="flex gap-3 mt-2 text-xs text-gray-600">
                    <span>{ebook.format}</span>
                    <span>•</span>
                    <span>{ebook.pages} pages</span>
                    <span>•</span>
                    <span>{ebook.size}</span>
                  </div>

                  {/* Age Range */}
                  <div className="mt-1">
                    <span className={`inline-block px-2 py-0.5 text-xs bg-${colors.secondary} text-${colors.text} rounded`}>
                      {ebook.ageRange}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">{ebook.description}</p>

              {/* DRM Notice */}
              {ebook.isDRMProtected && (
                <div className="mt-3 flex items-start gap-2 bg-blue-50 p-2 rounded">
                  <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-800">
                    DRM Protected - This book is encrypted and tied to your account
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  ${ebook.price.toFixed(2)}
                </div>

                <div className="flex gap-2">
                  {!ebook.isPurchased && (
                    <button
                      onClick={() => isAuthenticated ? onPurchase(ebook.id) : alert('Please sign in to purchase')}
                      disabled={!isAuthenticated}
                      className={`flex items-center gap-2 px-4 py-2 bg-${colors.primary} text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Purchase
                    </button>
                  )}

                  {ebook.isPurchased && !ebook.isDownloaded && (
                    <button
                      onClick={() => onDownload(ebook.id)}
                      className={`flex items-center gap-2 px-4 py-2 bg-${colors.primary} text-white rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  )}

                  {ebook.isPurchased && ebook.isDownloaded && (
                    <button
                      onClick={() => onRead(ebook.id)}
                      className={`flex items-center gap-2 px-4 py-2 bg-${colors.primary} text-white rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      <BookOpen className="w-4 h-4" />
                      Read Now
                    </button>
                  )}
                </div>
              </div>

              {/* Purchase Info for Authenticated Users */}
              {ebook.isPurchased && isAuthenticated && (
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                  <Lock className="w-3 h-3" />
                  <span>Licensed to {userEmail}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEbooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No books found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Security Footer */}
      <div className="max-w-md mx-auto px-4 py-6 border-t border-gray-200 bg-white mt-8">
        <div className="flex items-start gap-3">
          <Shield className={`w-5 h-5 text-${colors.primary} flex-shrink-0 mt-0.5`} />
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Secure Purchase Guarantee</h4>
            <p className="text-xs text-gray-600 mt-1">
              All purchases are processed securely through Google Play. Your payment information is never stored on our servers.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Downloaded books are encrypted and DRM-protected to prevent unauthorized sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
