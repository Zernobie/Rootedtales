import React, { useState, useEffect } from 'react';
import { Volume2, Music, Headphones, Play, Pause, Lock, ShoppingCart, Download, Star, Check, Sparkles } from 'lucide-react';

interface Sound {
  id: string;
  title: string;
  description: string;
  category: 'narration' | 'ambient' | 'effects';
  duration: string;
  price: number;
  isFree: boolean;
  isPurchased: boolean;
  isDownloaded: boolean;
  rating: number;
  reviews: number;
  previewUrl: string;
  fullUrl?: string;
  theme: 'forest' | 'ocean' | 'sunset' | 'night' | 'all';
}

interface VoiceImmersiveExperienceProps {
  theme: 'forest' | 'ocean' | 'sunset' | 'night';
  userEmail: string;
}

const THEME_COLORS = {
  forest: { primary: 'emerald-600', secondary: 'green-100', text: 'green-900' },
  ocean: { primary: 'cyan-600', secondary: 'cyan-100', text: 'cyan-900' },
  sunset: { primary: 'orange-600', secondary: 'orange-100', text: 'orange-900' },
  night: { primary: 'indigo-600', secondary: 'indigo-100', text: 'indigo-900' }
};

export function VoiceImmersiveExperience({ theme, userEmail }: VoiceImmersiveExperienceProps) {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'narration' | 'ambient' | 'effects'>('all');
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchasedSounds, setPurchasedSounds] = useState<string[]>([]);

  const colors = THEME_COLORS[theme];

  useEffect(() => {
    loadSounds();
    loadPurchasedSounds();
  }, []);

  const loadSounds = () => {
    const mockSounds: Sound[] = [
      // FREE NARRATION VOICES
      {
        id: 'voice-1',
        title: 'Professional Narrator - Sarah',
        description: 'Warm, friendly voice perfect for bedtime stories',
        category: 'narration',
        duration: '∞',
        price: 0,
        isFree: true,
        isPurchased: true,
        isDownloaded: true,
        rating: 4.9,
        reviews: 1243,
        previewUrl: '/sounds/narrator-sarah-preview.mp3',
        theme: 'all'
      },
      {
        id: 'voice-2',
        title: 'Adventure Narrator - Jack',
        description: 'Energetic, engaging voice for action stories',
        category: 'narration',
        duration: '∞',
        price: 0,
        isFree: true,
        isPurchased: true,
        isDownloaded: true,
        rating: 4.8,
        reviews: 987,
        previewUrl: '/sounds/narrator-jack-preview.mp3',
        theme: 'all'
      },
      {
        id: 'voice-3',
        title: 'Gentle Reader - Emma',
        description: 'Soft, soothing voice ideal for relaxation',
        category: 'narration',
        duration: '∞',
        price: 0,
        isFree: true,
        isPurchased: true,
        isDownloaded: true,
        rating: 4.9,
        reviews: 1521,
        previewUrl: '/sounds/narrator-emma-preview.mp3',
        theme: 'all'
      },

      // PREMIUM NARRATION VOICES
      {
        id: 'voice-premium-1',
        title: 'Celebrity Narrator - Morgan',
        description: 'Famous voice actor with captivating storytelling',
        category: 'narration',
        duration: '∞',
        price: 4.99,
        isFree: false,
        isPurchased: false,
        isDownloaded: false,
        rating: 5.0,
        reviews: 2341,
        previewUrl: '/sounds/narrator-morgan-preview.mp3',
        theme: 'all'
      },
      {
        id: 'voice-premium-2',
        title: 'Character Voices - Alex',
        description: 'Multiple character voices for interactive reading',
        category: 'narration',
        duration: '∞',
        price: 6.99,
        isFree: false,
        isPurchased: false,
        isDownloaded: false,
        rating: 4.9,
        reviews: 1876,
        previewUrl: '/sounds/narrator-alex-preview.mp3',
        theme: 'all'
      },

      // FREE AMBIENT SOUNDS
      {
        id: 'ambient-1',
        title: 'Forest Birds & Breeze',
        description: 'Peaceful forest atmosphere with gentle bird songs',
        category: 'ambient',
        duration: '30:00',
        price: 0,
        isFree: true,
        isPurchased: true,
        isDownloaded: true,
        rating: 4.7,
        reviews: 834,
        previewUrl: '/sounds/forest-ambient-preview.mp3',
        theme: 'forest'
      },
      {
        id: 'ambient-2',
        title: 'Ocean Waves',
        description: 'Calming waves crashing on the beach',
        category: 'ambient',
        duration: '30:00',
        price: 0,
        isFree: true,
        isPurchased: true,
        isDownloaded: true,
        rating: 4.8,
        reviews: 1092,
        previewUrl: '/sounds/ocean-ambient-preview.mp3',
        theme: 'ocean'
      },

      // PREMIUM AMBIENT SOUNDS
      {
        id: 'ambient-premium-1',
        title: 'Enchanted Forest - Full Experience',
        description: 'Immersive 3D forest soundscape with magical elements',
        category: 'ambient',
        duration: '60:00',
        price: 2.99,
        isFree: false,
        isPurchased: false,
        isDownloaded: false,
        rating: 4.9,
        reviews: 1543,
        previewUrl: '/sounds/enchanted-forest-preview.mp3',
        theme: 'forest'
      },
      {
        id: 'ambient-premium-2',
        title: 'Underwater Adventure',
        description: '3D ocean depths with whale songs and bubbles',
        category: 'ambient',
        duration: '60:00',
        price: 2.99,
        isFree: false,
        isPurchased: false,
        isDownloaded: false,
        rating: 4.8,
        reviews: 1234,
        previewUrl: '/sounds/underwater-preview.mp3',
        theme: 'ocean'
      },
      {
        id: 'ambient-premium-3',
        title: 'Sunset Meadow',
        description: 'Peaceful evening sounds with crickets and fireflies',
        category: 'ambient',
        duration: '45:00',
        price: 2.99,
        isFree: false,
        isPurchased: false,
        isDownloaded: false,
        rating: 4.9,
        reviews: 987,
        previewUrl: '/sounds/sunset-meadow-preview.mp3',
        theme: 'sunset'
      },

      // FREE SOUND EFFECTS
      {
        id: 'effects-1',
        title: 'Basic Sound Effects Pack',
        description: 'Common sounds: footsteps, doors, wind, etc.',
        category: 'effects',
        duration: '50 sounds',
        price: 0,
        isFree: true,
        isPurchased: true,
        isDownloaded: true,
        rating: 4.6,
        reviews: 2134,
        previewUrl: '/sounds/basic-effects-preview.mp3',
        theme: 'all'
      },

      // PREMIUM SOUND EFFECTS
      {
        id: 'effects-premium-1',
        title: 'Adventure Sound Pack',
        description: '200+ adventure sounds: animals, nature, weather',
        category: 'effects',
        duration: '200 sounds',
        price: 3.99,
        isFree: false,
        isPurchased: false,
        isDownloaded: false,
        rating: 4.9,
        reviews: 1876,
        previewUrl: '/sounds/adventure-pack-preview.mp3',
        theme: 'all'
      },
      {
        id: 'effects-premium-2',
        title: 'Magical Effects Collection',
        description: 'Enchanting sounds: sparkles, transformations, magic',
        category: 'effects',
        duration: '150 sounds',
        price: 4.99,
        isFree: false,
        isPurchased: false,
        isDownloaded: false,
        rating: 5.0,
        reviews: 2543,
        previewUrl: '/sounds/magical-effects-preview.mp3',
        theme: 'all'
      }
    ];

    setSounds(mockSounds);
  };

  const loadPurchasedSounds = () => {
    const saved = localStorage.getItem('purchased_sounds');
    if (saved) {
      setPurchasedSounds(JSON.parse(saved));
    }
  };

  const handlePlayPreview = (soundId: string) => {
    if (playingSound === soundId) {
      setPlayingSound(null);
      // In production, pause audio
      console.log('Pausing:', soundId);
    } else {
      setPlayingSound(soundId);
      // In production, play audio preview
      console.log('Playing preview:', soundId);
      
      // Auto-stop after 30 seconds (preview limit)
      setTimeout(() => {
        if (playingSound === soundId) {
          setPlayingSound(null);
        }
      }, 30000);
    }
  };

  const handleAddToCart = (soundId: string) => {
    if (!cart.includes(soundId)) {
      setCart([...cart, soundId]);
    }
  };

  const handleRemoveFromCart = (soundId: string) => {
    setCart(cart.filter(id => id !== soundId));
  };

  const handlePurchase = async (soundIds: string[]) => {
    // In production, process payment through Google Play Billing
    console.log('Processing purchase for:', soundIds);
    
    // Simulate purchase
    const newPurchased = [...purchasedSounds, ...soundIds];
    setPurchasedSounds(newPurchased);
    localStorage.setItem('purchased_sounds', JSON.stringify(newPurchased));
    
    // Update sounds
    setSounds(sounds.map(sound => 
      soundIds.includes(sound.id)
        ? { ...sound, isPurchased: true }
        : sound
    ));
    
    // Clear cart
    setCart([]);
    setShowCheckout(false);
    
    alert('Purchase successful! Your sounds are now available.');
  };

  const handleDownload = async (soundId: string) => {
    // In production, download and encrypt sound file
    console.log('Downloading:', soundId);
    
    setSounds(sounds.map(sound => 
      sound.id === soundId
        ? { ...sound, isDownloaded: true }
        : sound
    ));
    
    alert('Sound downloaded successfully!');
  };

  const filteredSounds = sounds.filter(sound => {
    if (selectedCategory === 'all') return true;
    return sound.category === selectedCategory;
  });

  const freeSounds = filteredSounds.filter(s => s.isFree);
  const premiumSounds = filteredSounds.filter(s => !s.isFree);

  const cartTotal = cart.reduce((sum, id) => {
    const sound = sounds.find(s => s.id === id);
    return sum + (sound?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className={`text-2xl font-bold text-${colors.text} flex items-center gap-2`}>
            <Headphones className="w-7 h-7" />
            Voice & Immersive Experience
          </h1>
          <p className="text-sm text-gray-600 mt-1">Enhance your reading with premium audio</p>
        </div>

        {/* Category Filter */}
        <div className="max-w-md mx-auto px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === 'all'
                  ? `bg-${colors.primary} text-white`
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              All Sounds
            </button>
            <button
              onClick={() => setSelectedCategory('narration')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 ${
                selectedCategory === 'narration'
                  ? `bg-${colors.primary} text-white`
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              Narration
            </button>
            <button
              onClick={() => setSelectedCategory('ambient')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 ${
                selectedCategory === 'ambient'
                  ? `bg-${colors.primary} text-white`
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Music className="w-4 h-4" />
              Ambient
            </button>
            <button
              onClick={() => setSelectedCategory('effects')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 ${
                selectedCategory === 'effects'
                  ? `bg-${colors.primary} text-white`
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Effects
            </button>
          </div>
        </div>
      </div>

      {/* Shopping Cart Badge */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowCheckout(true)}
          className={`fixed bottom-24 right-4 z-40 bg-${colors.primary} text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:opacity-90`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-semibold">{cart.length} items</span>
          <span className="bg-white text-gray-900 px-2 py-0.5 rounded-full text-sm">
            ${cartTotal.toFixed(2)}
          </span>
        </button>
      )}

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Free Sounds Section */}
        {freeSounds.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Free Sounds</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {freeSounds.length} Free
              </span>
            </div>

            <div className="space-y-3">
              {freeSounds.map((sound) => (
                <SoundCard
                  key={sound.id}
                  sound={sound}
                  isPlaying={playingSound === sound.id}
                  onPlay={() => handlePlayPreview(sound.id)}
                  onDownload={() => handleDownload(sound.id)}
                  colors={colors}
                />
              ))}
            </div>
          </div>
        )}

        {/* Premium Sounds Section */}
        {premiumSounds.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Premium Sounds</h2>
              <span className={`bg-${colors.secondary} text-${colors.text} px-3 py-1 rounded-full text-sm font-medium`}>
                {premiumSounds.length} Premium
              </span>
            </div>

            <div className="space-y-3">
              {premiumSounds.map((sound) => (
                <SoundCard
                  key={sound.id}
                  sound={sound}
                  isPlaying={playingSound === sound.id}
                  onPlay={() => handlePlayPreview(sound.id)}
                  onAddToCart={() => handleAddToCart(sound.id)}
                  onRemoveFromCart={() => handleRemoveFromCart(sound.id)}
                  onDownload={() => handleDownload(sound.id)}
                  inCart={cart.includes(sound.id)}
                  isPurchased={purchasedSounds.includes(sound.id)}
                  colors={colors}
                />
              ))}
            </div>
          </div>
        )}

        {/* Information */}
        <div className={`bg-${colors.secondary} border border-${colors.primary} rounded-xl p-4`}>
          <h3 className={`font-semibold text-${colors.text} mb-2`}>Premium Audio Benefits</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <Check className={`w-4 h-4 text-${colors.primary} mt-0.5 flex-shrink-0`} />
              <span>Professional voice actors for narration</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className={`w-4 h-4 text-${colors.primary} mt-0.5 flex-shrink-0`} />
              <span>High-quality 3D immersive soundscapes</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className={`w-4 h-4 text-${colors.primary} mt-0.5 flex-shrink-0`} />
              <span>Extensive sound effects libraries</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className={`w-4 h-4 text-${colors.primary} mt-0.5 flex-shrink-0`} />
              <span>Offline playback with downloads</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className={`w-4 h-4 text-${colors.primary} mt-0.5 flex-shrink-0`} />
              <span>3 free sounds to get you started!</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className={`bg-${colors.primary} text-white p-4 flex items-center justify-between`}>
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <button onClick={() => setShowCheckout(false)} className="text-white/80 hover:text-white">
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4">
              {cart.map(soundId => {
                const sound = sounds.find(s => s.id === soundId);
                if (!sound) return null;

                return (
                  <div key={soundId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{sound.title}</p>
                      <p className="text-sm text-gray-600">${sound.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(soundId)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => handlePurchase(cart)}
                  className={`w-full bg-${colors.primary} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90`}
                >
                  Complete Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface SoundCardProps {
  sound: Sound;
  isPlaying: boolean;
  onPlay: () => void;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  onDownload?: () => void;
  inCart?: boolean;
  isPurchased?: boolean;
  colors: any;
}

function SoundCard({ sound, isPlaying, onPlay, onAddToCart, onRemoveFromCart, onDownload, inCart, isPurchased, colors }: SoundCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex gap-4">
        {/* Icon */}
        <div className={`w-16 h-16 bg-${colors.secondary} rounded-lg flex items-center justify-center flex-shrink-0`}>
          {sound.category === 'narration' && <Volume2 className={`w-8 h-8 text-${colors.primary}`} />}
          {sound.category === 'ambient' && <Music className={`w-8 h-8 text-${colors.primary}`} />}
          {sound.category === 'effects' && <Sparkles className={`w-8 h-8 text-${colors.primary}`} />}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{sound.title}</h3>
            {sound.isFree ? (
              <span className="bg-green-100 text-green-800 px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ml-2">
                FREE
              </span>
            ) : (
              <span className="text-lg font-bold text-gray-900 whitespace-nowrap ml-2">
                ${sound.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{sound.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{sound.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({sound.reviews})</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600">{sound.duration}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onPlay}
              className={`flex-1 px-4 py-2 border-2 border-${colors.primary} rounded-lg hover:bg-${colors.secondary} transition-colors flex items-center justify-center gap-2`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Stop Preview
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Preview
                </>
              )}
            </button>

            {!sound.isFree && !isPurchased && !sound.isPurchased && (
              <button
                onClick={inCart ? onRemoveFromCart : onAddToCart}
                className={`px-4 py-2 ${
                  inCart
                    ? 'bg-gray-200 text-gray-700'
                    : `bg-${colors.primary} text-white`
                } rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
              >
                <ShoppingCart className="w-4 h-4" />
                {inCart ? 'In Cart' : 'Add'}
              </button>
            )}

            {(sound.isFree || isPurchased || sound.isPurchased) && !sound.isDownloaded && (
              <button
                onClick={onDownload}
                className={`px-4 py-2 bg-${colors.primary} text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            )}

            {sound.isDownloaded && (
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Downloaded
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
