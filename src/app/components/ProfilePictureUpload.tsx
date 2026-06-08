import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Camera, Upload, X, Check } from 'lucide-react';
import { User, Theme } from '../App';

// Import the themed avatar images
import forestAvatar from 'figma:asset/7c9fee5a551fa9845ea57aed0c3abb13e0a9e154.png';
import oceanAvatar from 'figma:asset/6d7bc987afcd66fddb7bc12fc5902d6b7cce50d7.png';
import sunsetAvatar from 'figma:asset/0fdaf9af501215846e1f02a497878767ca49cad4.png';
import nightAvatar from 'figma:asset/4c1f0f30b39cbbef4b209a91a537ea15de9953d7.png';

interface ProfilePictureUploadProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onClose: () => void;
}

export function ProfilePictureUpload({ user, onUpdateUser, onClose }: ProfilePictureUploadProps) {
  const [selectedOption, setSelectedOption] = useState<'avatar' | 'upload'>('avatar');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatarOptions = [
    { id: 'forest', image: forestAvatar, name: 'Forest Visitor', color: 'from-green-500 to-emerald-600' },
    { id: 'ocean', image: oceanAvatar, name: 'Ocean Explorer', color: 'from-blue-500 to-cyan-600' },
    { id: 'sunset', image: sunsetAvatar, name: 'Sunset Wanderer', color: 'from-orange-500 to-pink-600' },
    { id: 'night', image: nightAvatar, name: 'Night Dreamer', color: 'from-indigo-500 to-purple-600' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setSelectedOption('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectAvatar = (avatarId: string) => {
    const avatar = avatarOptions.find(a => a.id === avatarId);
    if (avatar) {
      onUpdateUser({ 
        avatar: avatar.image,
        profilePicture: avatar.image 
      });
      onClose();
    }
  };

  const handleSaveUpload = () => {
    if (uploadedImage) {
      onUpdateUser({ 
        profilePicture: uploadedImage,
        avatar: undefined 
      });
      onClose();
    }
  };

  const themeStyles = {
    forest: { bg: 'bg-gradient-to-br from-green-50 to-emerald-50', accent: 'text-green-700' },
    ocean: { bg: 'bg-gradient-to-br from-blue-50 to-cyan-50', accent: 'text-blue-700' },
    sunset: { bg: 'bg-gradient-to-br from-orange-50 to-pink-50', accent: 'text-orange-700' },
    night: { bg: 'bg-gradient-to-br from-indigo-50 to-purple-50', accent: 'text-indigo-700' }
  };

  const currentTheme = themeStyles[user.theme];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md"
      >
        <Card className={`${currentTheme.bg} border-2 shadow-2xl p-6`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${currentTheme.accent}`}>
              Set Profile Picture
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

          {/* Option Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={selectedOption === 'avatar' ? 'default' : 'outline'}
              onClick={() => setSelectedOption('avatar')}
              className="flex-1"
            >
              <Camera className="w-4 h-4 mr-2" />
              Choose Avatar
            </Button>
            <Button
              variant={selectedOption === 'upload' ? 'default' : 'outline'}
              onClick={() => setSelectedOption('upload')}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          </div>

          {/* Avatar Selection */}
          {selectedOption === 'avatar' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Choose your explorer avatar:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {avatarOptions.map((avatar) => (
                  <motion.button
                    key={avatar.id}
                    onClick={() => handleSelectAvatar(avatar.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-lg">
                      <img
                        src={avatar.image}
                        alt={avatar.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${avatar.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                      
                      {/* Check mark if currently selected */}
                      {user.avatar === avatar.image && (
                        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium mt-2 text-center">
                      {avatar.name}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Upload Section */}
          {selectedOption === 'upload' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {!uploadedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Upload Your Photo</p>
                  <p className="text-xs text-muted-foreground">
                    Click to browse or drag and drop
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-2 right-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSaveUpload} className="w-full">
                    <Check className="w-4 h-4 mr-2" />
                    Save Photo
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
