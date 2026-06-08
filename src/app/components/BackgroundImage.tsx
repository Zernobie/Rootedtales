import React from 'react';
import forestBackground from 'figma:asset/88cced24bb39aac025c3d87fa0e7982a19c3acf7.png';
import oceanBackground from 'figma:asset/f8afa3dae94126a2a889d688db401acf6ff3cb08.png';
import sunsetBackground from 'figma:asset/f36cc7f352eab06026ea08f68ca0ad4dd0bd7e4f.png';
import nightBackground from 'figma:asset/15aae33c041ff843eeab94df624a5bfa0e2306e1.png';

interface BackgroundImageProps {
  theme: string;
  children: React.ReactNode;
}

export function BackgroundImage({ theme, children }: BackgroundImageProps) {
  const getBackgroundStyle = () => {
    switch (theme) {
      case 'forest':
        return {
          backgroundColor: '#1a2f1a', // Dark forest green
          backgroundImage: `
            radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 70%, rgba(52, 211, 153, 0.12) 0%, transparent 50%),
            linear-gradient(180deg, rgba(6, 78, 59, 0.2) 0%, rgba(5, 150, 105, 0.3) 50%, rgba(6, 78, 59, 0.4) 100%),
            url(${forestBackground})
          `,
          backgroundSize: 'cover, cover, cover, cover',
          backgroundPosition: 'center, center, center, center',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
          backgroundAttachment: 'fixed, fixed, fixed, fixed'
        };
      case 'ocean':
        return {
          backgroundColor: '#0c4a6e', // Deep ocean blue
          backgroundImage: `
            radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 20%, rgba(8, 145, 178, 0.12) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 70%, rgba(14, 165, 233, 0.10) 0%, transparent 45%),
            linear-gradient(180deg, rgba(3, 105, 161, 0.15) 0%, rgba(7, 89, 133, 0.20) 50%, rgba(8, 145, 178, 0.25) 100%),
            url(${oceanBackground})
          `,
          backgroundSize: 'cover, cover, cover, cover, cover',
          backgroundPosition: 'center, center, center, center, center',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat, no-repeat',
          backgroundAttachment: 'fixed, fixed, fixed, fixed, fixed'
        };
      case 'sunset':
        return {
          backgroundColor: '#7c2d12', // Warm brown/orange
          backgroundImage: `
            radial-gradient(ellipse at 50% 80%, rgba(251, 191, 36, 0.20) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 30%, rgba(249, 115, 22, 0.18) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 60%, rgba(239, 68, 68, 0.15) 0%, transparent 45%),
            linear-gradient(180deg, rgba(153, 27, 27, 0.25) 0%, rgba(194, 65, 12, 0.30) 35%, rgba(234, 88, 12, 0.25) 70%, rgba(251, 146, 60, 0.20) 100%),
            url(${sunsetBackground})
          `,
          backgroundSize: 'cover, cover, cover, cover, cover',
          backgroundPosition: 'center, center, center, center, center',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat, no-repeat',
          backgroundAttachment: 'fixed, fixed, fixed, fixed, fixed'
        };
      case 'night':
        return {
          backgroundColor: '#1e1b4b', // Deep indigo/purple
          backgroundImage: `
            radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 70%, rgba(79, 70, 229, 0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 40%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
            linear-gradient(180deg, rgba(30, 27, 75, 0.30) 0%, rgba(49, 46, 129, 0.25) 35%, rgba(67, 56, 202, 0.20) 70%, rgba(79, 70, 229, 0.15) 100%),
            url(${nightBackground})
          `,
          backgroundSize: 'cover, cover, cover, cover, cover',
          backgroundPosition: 'center, center, center, center, center',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat, no-repeat',
          backgroundAttachment: 'fixed, fixed, fixed, fixed, fixed'
        };
      default:
        return {
          backgroundColor: '#1a2f1a'
        };
    }
  };

  const getOverlayStyle = () => {
    switch (theme) {
      case 'forest':
        return 'bg-gradient-to-b from-emerald-900/20 via-green-800/30 to-emerald-900/40';
      case 'ocean':
        return 'bg-gradient-to-b from-blue-900/20 via-cyan-800/25 to-blue-900/30';
      case 'sunset':
        return 'bg-gradient-to-b from-orange-900/25 via-red-800/30 to-orange-900/35';
      case 'night':
        return 'bg-gradient-to-b from-indigo-900/25 via-purple-800/30 to-indigo-900/35';
      default:
        return 'bg-gradient-to-b from-emerald-900/20 via-green-800/30 to-emerald-900/40';
    }
  };

  return (
    <div 
      className={`min-h-screen theme-${theme} relative transition-all duration-1000 ease-in-out`}
      style={getBackgroundStyle()}
    >
      {/* Base transparent overlay for all screens */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${getOverlayStyle()}`} />
      
      {/* Floating animations overlay */}
      <div className={`fixed inset-0 pointer-events-none z-1 ${
        theme === 'forest' ? 'forest-animations' :
        theme === 'ocean' ? 'ocean-animations' :
        theme === 'sunset' ? 'sunset-animations' :
        theme === 'night' ? 'night-animations' : ''
      }`} />
      
      {/* Content overlay with screen-specific transparency */}
      <div className="relative z-10 min-h-screen">
        <div className="absolute inset-0 bg-white/3 backdrop-blur-[0.5px] pointer-events-none" />
        <div className="relative z-20 bg-white min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}