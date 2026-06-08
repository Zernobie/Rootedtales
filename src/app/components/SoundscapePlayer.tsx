import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { 
  X, 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  CloudRain,
  Flame,
  Coffee,
  Wind,
  Waves,
  TreePine
} from 'lucide-react';
import { Theme } from '../App';

interface Soundscape {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface SoundscapePlayerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

export function SoundscapePlayer({ isOpen, onClose, theme }: SoundscapePlayerProps) {
  const [selectedSoundscape, setSelectedSoundscape] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const soundscapes: Soundscape[] = [
    {
      id: 'rain',
      name: 'Gentle Rain',
      icon: <CloudRain className="w-6 h-6" />,
      description: 'Soft rainfall on leaves',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'fireplace',
      name: 'Cozy Fireplace',
      icon: <Flame className="w-6 h-6" />,
      description: 'Crackling warm fire',
      color: 'from-orange-400 to-red-600'
    },
    {
      id: 'coffee-shop',
      name: 'Coffee Shop',
      icon: <Coffee className="w-6 h-6" />,
      description: 'Gentle café ambiance',
      color: 'from-amber-400 to-brown-600'
    },
    {
      id: 'forest',
      name: 'Forest Breeze',
      icon: <TreePine className="w-6 h-6" />,
      description: 'Rustling leaves and birds',
      color: 'from-green-400 to-green-700'
    },
    {
      id: 'ocean',
      name: 'Ocean Waves',
      icon: <Waves className="w-6 h-6" />,
      description: 'Peaceful sea sounds',
      color: 'from-cyan-400 to-blue-600'
    },
    {
      id: 'white-noise',
      name: 'White Noise',
      icon: <Wind className="w-6 h-6" />,
      description: 'Consistent background hum',
      color: 'from-gray-400 to-gray-600'
    }
  ];

  useEffect(() => {
    // In a real implementation, this would load actual audio files
    // For now, we'll simulate the audio player behavior
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleSoundscapeSelect = (soundscapeId: string) => {
    if (selectedSoundscape === soundscapeId) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedSoundscape(soundscapeId);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  const selectedSoundscapeData = soundscapes.find(s => s.id === selectedSoundscape);

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

          {/* Player Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-50 rounded-t-3xl max-h-[80vh] overflow-hidden"
          >
            {/* Handle */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />

            {/* Header */}
            <div className="px-6 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Soundscapes</h2>
                  <p className="text-xs text-gray-500">Ambient sounds for focus</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Soundscape Grid */}
            <div className="px-6 pb-6 grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {soundscapes.map((soundscape) => (
                <Card
                  key={soundscape.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedSoundscape === soundscape.id
                      ? 'ring-2 ring-purple-500 shadow-md'
                      : ''
                  }`}
                  onClick={() => handleSoundscapeSelect(soundscape.id)}
                >
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${soundscape.color} flex items-center justify-center text-white mb-3 mx-auto`}>
                      {soundscape.icon}
                    </div>
                    <h3 className="font-medium text-sm text-center text-gray-800">
                      {soundscape.name}
                    </h3>
                    <p className="text-xs text-gray-500 text-center mt-1">
                      {soundscape.description}
                    </p>
                    {selectedSoundscape === soundscape.id && isPlaying && (
                      <div className="mt-3 flex items-center justify-center">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-1 h-4 bg-purple-500 rounded-full"
                            animate={{ height: [16, 24, 16] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                          />
                          <motion.div
                            className="w-1 h-4 bg-purple-500 rounded-full"
                            animate={{ height: [16, 24, 16] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-1 h-4 bg-purple-500 rounded-full"
                            animate={{ height: [16, 24, 16] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Player Controls */}
            {selectedSoundscapeData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-gray-200"
              >
                <div className="flex items-center gap-4">
                  {/* Play/Pause Button */}
                  <Button
                    variant="default"
                    size="sm"
                    onClick={togglePlayPause}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full w-12 h-12 p-0"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </Button>

                  {/* Now Playing Info */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {selectedSoundscapeData.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isPlaying ? 'Now playing' : 'Paused'}
                    </p>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2 w-32">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      className="p-1"
                    >
                      {isMuted || volume[0] === 0 ? (
                        <VolumeX className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-gray-600" />
                      )}
                    </Button>
                    <Slider
                      value={isMuted ? [0] : volume}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Info Section */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-xs text-gray-500 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                  <p>Soundscapes continue playing while you read</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                  <p>Perfect for creating an immersive reading atmosphere</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SoundscapePlayer;
