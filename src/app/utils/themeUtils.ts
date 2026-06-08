import { Theme } from '../App';

export interface ThemeUserInfo {
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

export function getThemeUserInfo(theme: Theme): ThemeUserInfo {
  switch (theme) {
    case 'forest':
      return {
        title: 'Forest Visitor',
        description: 'Reader Access',
        icon: '🌲',
        color: 'text-green-600',
        gradient: 'from-green-600 to-emerald-600'
      };
    case 'ocean':
      return {
        title: 'Ocean Explorer',
        description: 'Reader Access',
        icon: '🌊',
        color: 'text-blue-600',
        gradient: 'from-blue-600 to-cyan-600'
      };
    case 'sunset':
      return {
        title: 'Sunset Wanderer',
        description: 'Reader Access',
        icon: '🌅',
        color: 'text-orange-600',
        gradient: 'from-orange-600 to-pink-600'
      };
    case 'night':
      return {
        title: 'Night Dreamer',
        description: 'Reader Access',
        icon: '🌙',
        color: 'text-indigo-600',
        gradient: 'from-indigo-600 to-purple-600'
      };
    default:
      return {
        title: 'Forest Visitor',
        description: 'Reader Access',
        icon: '🌲',
        color: 'text-green-600',
        gradient: 'from-green-600 to-emerald-600'
      };
  }
}

export function getThemeAvatarProps(theme: Theme) {
  const themeInfo = getThemeUserInfo(theme);
  return {
    backgroundColor: theme === 'forest' ? '#1a4d2e' :
                    theme === 'ocean' ? '#1e40af' :
                    theme === 'sunset' ? '#dc2626' :
                    '#1e3a8a',
    borderColor: theme === 'forest' ? '#2d5016' :
                theme === 'ocean' ? '#3b82f6' :
                theme === 'sunset' ? '#f97316' :
                '#3b82f6',
    textColor: '#ffffff'
  };
}