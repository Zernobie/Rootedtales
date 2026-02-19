import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  X, 
  Menu, 
  Volume2, 
  VolumeX, 
  Volume1, 
  VolumeOff,
  User as UserIcon
} from 'lucide-react';
import { User, Theme } from '../App';

interface TopBarProps {
  user: User | null;
  onExit: () => void;
  onToggleSidebar: () => void;
  onProfileClick?: () => void;
  theme: Theme;
}

export function TopBar({ user, onExit, onToggleSidebar, onProfileClick, theme }: TopBarProps) {
  const getVolumeFromUser = () => {
    if (!user) return 'high';
    const userVolume = user.preferences.voiceSettings.volume;
    if (userVolume > 75) return 'high';
    if (userVolume > 50) return 'medium';
    if (userVolume > 0) return 'low';
    return 'mute';
  };

  const [volume, setVolume] = useState<'high' | 'medium' | 'low' | 'mute'>(getVolumeFromUser());

  const handleVolumeChange = () => {
    const volumeStates: Array<'high' | 'medium' | 'low' | 'mute'> = ['high', 'medium', 'low', 'mute'];
    const currentIndex = volumeStates.indexOf(volume);
    const nextIndex = (currentIndex + 1) % volumeStates.length;
    setVolume(volumeStates[nextIndex]);
  };

  const getVolumeIcon = () => {
    switch (volume) {
      case 'high':
        return <Volume2 className="w-5 h-5" />;
      case 'medium':
        return <Volume1 className="w-5 h-5" />;
      case 'low':
        return <VolumeOff className="w-5 h-5" />;
      case 'mute':
        return <VolumeX className="w-5 h-5" />;
    }
  };

  const getVolumeLabel = () => {
    switch (volume) {
      case 'high':
        return 'Loud';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Soft';
      case 'mute':
        return 'Muted';
    }
  };

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[385px] bg-white/95 backdrop-blur-md border-b border-border z-50">
      <div className="flex items-center justify-between p-4">
        {/* Left side - Menu button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="p-2"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Center - User status and app title */}
        <div className="flex items-center space-x-2">
          <h1 className="font-bold text-foreground">Rooted Tales</h1>
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onProfileClick}
              className="p-1 h-auto"
            >
              <Badge variant={user.isGuest ? "secondary" : "default"} className="text-xs flex items-center space-x-1">
                <UserIcon className="w-3 h-3" />
                <span>{user.isGuest ? 'Guest' : user.username}</span>
              </Badge>
            </Button>
          )}
        </div>

        {/* Right side - Volume and Exit */}
        <div className="flex items-center space-x-2">
          {/* Volume Control */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVolumeChange}
              className="p-2"
              title={`Volume: ${getVolumeLabel()}`}
            >
              {getVolumeIcon()}
            </Button>
          </div>

          {/* Exit Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="p-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Volume indicator */}
      {volume !== 'high' && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
          <Badge variant="outline" className="text-xs bg-background/95 backdrop-blur-sm">
            {getVolumeLabel()}
          </Badge>
        </div>
      )}
    </div>
  );
}
