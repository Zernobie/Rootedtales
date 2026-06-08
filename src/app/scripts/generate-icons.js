#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📱 Generating mobile app icons...\n');

// Icon sizes needed for mobile apps
const iconSizes = [
  { size: 72, name: 'icon-72x72.png', desc: 'Android LDPI' },
  { size: 96, name: 'icon-96x96.png', desc: 'Android MDPI' },
  { size: 128, name: 'icon-128x128.png', desc: 'Android HDPI' },
  { size: 144, name: 'icon-144x144.png', desc: 'Android XHDPI' },
  { size: 152, name: 'icon-152x152.png', desc: 'iOS iPad' },
  { size: 192, name: 'icon-192x192.png', desc: 'Android XXHDPI' },
  { size: 384, name: 'icon-384x384.png', desc: 'Android XXXHDPI' },
  { size: 512, name: 'icon-512x512.png', desc: 'Maskable Icon' },
  
  // iOS specific sizes
  { size: 57, name: 'icon-57x57.png', desc: 'iOS iPhone' },
  { size: 60, name: 'icon-60x60.png', desc: 'iOS iPhone @2x' },
  { size: 76, name: 'icon-76x76.png', desc: 'iOS iPad' },
  { size: 114, name: 'icon-114x114.png', desc: 'iOS iPhone @2x' },
  { size: 120, name: 'icon-120x120.png', desc: 'iOS iPhone @3x' },
  { size: 180, name: 'icon-180x180.png', desc: 'iOS iPhone @3x' },
  
  // Special icons
  { size: 70, name: 'icon-70x70.png', desc: 'Windows Small' },
  { size: 150, name: 'icon-150x150.png', desc: 'Windows Medium' },
  { size: 310, name: 'icon-310x310.png', desc: 'Windows Large' },
];

// Shortcut icons
const shortcutIcons = [
  { name: 'shortcut-library.png', desc: 'Library Shortcut' },
  { name: 'shortcut-characters.png', desc: 'Characters Shortcut' },
];

// Create icons directory
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log('📁 Created icons directory');
}

// Generate SVG template for icons
function generateIconSVG(size, title) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a4d2e"/>
      <stop offset="50%" stop-color="#2d5016"/>
      <stop offset="100%" stop-color="#1a4d2e"/>
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  
  <!-- Background circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 4}" fill="url(#gradient)" filter="url(#shadow)"/>
  
  <!-- Panda face -->
  <g transform="translate(${size/2}, ${size/2})">
    <!-- Ears -->
    <circle cx="-${size/6}" cy="-${size/6}" r="${size/12}" fill="#2d1810"/>
    <circle cx="${size/6}" cy="-${size/6}" r="${size/12}" fill="#2d1810"/>
    
    <!-- Face -->
    <circle cx="0" cy="0" r="${size/4}" fill="#f5f5f5"/>
    
    <!-- Eyes -->
    <ellipse cx="-${size/12}" cy="-${size/24}" rx="${size/24}" ry="${size/16}" fill="#2d1810"/>
    <ellipse cx="${size/12}" cy="-${size/24}" rx="${size/24}" ry="${size/16}" fill="#2d1810"/>
    
    <!-- Nose -->
    <ellipse cx="0" cy="${size/24}" rx="${size/48}" ry="${size/32}" fill="#2d1810"/>
    
    <!-- Book symbol -->
    <rect x="-${size/16}" y="${size/8}" width="${size/8}" height="${size/12}" fill="#8fbc8f" rx="1"/>
    <line x1="-${size/24}" y1="${size/8}" x2="-${size/24}" y2="${size/8 + size/12}" stroke="#1a4d2e" stroke-width="1"/>
  </g>
  
  <!-- App title -->
  <text x="${size/2}" y="${size - 8}" text-anchor="middle" font-family="Arial, sans-serif" 
        font-size="${Math.max(8, size/20)}" font-weight="bold" fill="white">RT</text>
</svg>`;
}

// Generate placeholder icons
console.log('🎨 Generating icon files...');

iconSizes.forEach(({ size, name, desc }) => {
  const iconPath = path.join(iconsDir, name);
  
  if (!fs.existsSync(iconPath)) {
    const svg = generateIconSVG(size, 'Rooted Tales');
    fs.writeFileSync(iconPath.replace('.png', '.svg'), svg);
    console.log(`  ✅ Generated ${name} (${size}x${size}) - ${desc}`);
  } else {
    console.log(`  ⚠️  Exists: ${name} - ${desc}`);
  }
});

// Generate shortcut icons
console.log('\n🔗 Generating shortcut icons...');

shortcutIcons.forEach(({ name, desc }) => {
  const iconPath = path.join(iconsDir, name);
  
  if (!fs.existsSync(iconPath)) {
    const svg = generateIconSVG(96, desc);
    fs.writeFileSync(iconPath.replace('.png', '.svg'), svg);
    console.log(`  ✅ Generated ${name} - ${desc}`);
  } else {
    console.log(`  ⚠️  Exists: ${name} - ${desc}`);
  }
});

// Generate favicons
console.log('\n⭐ Generating favicons...');

const faviconSizes = [16, 32, 48];
faviconSizes.forEach(size => {
  const faviconPath = path.join(__dirname, '../public', `favicon-${size}x${size}.svg`);
  
  if (!fs.existsSync(faviconPath)) {
    const svg = generateIconSVG(size, 'Rooted Tales');
    fs.writeFileSync(faviconPath, svg);
    console.log(`  ✅ Generated favicon-${size}x${size}.svg`);
  }
});

// Generate main favicon
const mainFaviconPath = path.join(__dirname, '../public/favicon.svg');
if (!fs.existsSync(mainFaviconPath)) {
  const svg = generateIconSVG(32, 'Rooted Tales');
  fs.writeFileSync(mainFaviconPath, svg);
  console.log(`  ✅ Generated favicon.svg`);
}

// Generate apple-touch-icon
const appleTouchIconPath = path.join(__dirname, '../public/apple-touch-icon.svg');
if (!fs.existsSync(appleTouchIconPath)) {
  const svg = generateIconSVG(180, 'Rooted Tales');
  fs.writeFileSync(appleTouchIconPath, svg);
  console.log(`  ✅ Generated apple-touch-icon.svg`);
}

// Generate splash screens info
console.log('\n🌊 Splash screen info:');
console.log('  📱 iOS splash screens should be created at 2x and 3x resolutions');
console.log('  🤖 Android splash screens are handled by Capacitor automatically');
console.log('  🎨 Use the theme colors: #1a4d2e (primary), #8fbc8f (accent)');

// Generate manifest validation
console.log('\n📋 Validating manifest.json...');
const manifestPath = path.join(__dirname, '../public/manifest.json');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log(`  ✅ Manifest valid - App: ${manifest.name}`);
    console.log(`  📱 Icons configured: ${manifest.icons?.length || 0}`);
    console.log(`  🔗 Shortcuts configured: ${manifest.shortcuts?.length || 0}`);
  } catch (error) {
    console.log(`  ❌ Manifest validation failed: ${error.message}`);
  }
} else {
  console.log('  ❌ manifest.json not found');
}

console.log('\n✨ Icon generation completed!');
console.log('\n📝 Next steps:');
console.log('  1. Replace SVG files with proper PNG versions for production');
console.log('  2. Use a tool like sharp or imagemagick to convert SVG to PNG');
console.log('  3. Optimize PNG files for smaller file sizes');
console.log('  4. Test icons on actual devices');
console.log('\n🚀 Ready for mobile app deployment!');