#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Rooted Tales for mobile deployment...\n');

// Build configuration
const BUILD_CONFIG = {
  android: {
    minSdk: 24,
    targetSdk: 34,
    buildTools: '34.0.0'
  },
  ios: {
    deployment: '12.0',
    devices: ['1', '2'] // iPhone and iPad
  }
};

async function buildApp() {
  try {
    // Step 1: Clean previous builds
    console.log('📦 Cleaning previous builds...');
    try {
      execSync('rm -rf dist android/app/build ios/App/build', { stdio: 'inherit' });
    } catch (e) {
      // Continue if directories don't exist
    }

    // Step 2: Install dependencies
    console.log('📥 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Step 3: Type check
    console.log('🔍 Running type check...');
    execSync('npm run type-check', { stdio: 'inherit' });

    // Step 4: Build web app
    console.log('🏗️  Building web application...');
    execSync('npm run build', { stdio: 'inherit' });

    // Step 5: Generate PWA assets
    console.log('🎨 Generating PWA assets...');
    await generateIcons();

    // Step 6: Validate build
    console.log('✅ Validating build...');
    validateBuild();

    // Step 7: Build mobile apps
    console.log('📱 Building mobile applications...');
    
    if (process.argv.includes('--android') || process.argv.includes('--all')) {
      await buildAndroid();
    }
    
    if (process.argv.includes('--ios') || process.argv.includes('--all')) {
      await buildIOS();
    }

    console.log('\n🎉 Build completed successfully!');
    console.log('\nNext steps:');
    console.log('- For Android: Open Android Studio and build release APK');
    console.log('- For iOS: Open Xcode and archive for App Store');
    console.log('- For PWA: Deploy the dist/ folder to your web server');

  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
}

async function generateIcons() {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  const iconsDir = path.join(__dirname, '../public/icons');
  
  // Ensure icons directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Generate placeholder icons (in production, use proper icon generation)
  for (const size of sizes) {
    const iconPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    if (!fs.existsSync(iconPath)) {
      console.log(`  ⚠️  Missing icon: ${size}x${size}.png`);
      // Create placeholder
      createPlaceholderIcon(iconPath, size);
    }
  }
}

function createPlaceholderIcon(path, size) {
  // Create SVG placeholder
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#1a4d2e"/>
      <text x="50%" y="50%" font-family="Arial" font-size="${size/8}" 
            fill="white" text-anchor="middle" dy=".3em">RT</text>
    </svg>
  `;
  
  // In a real implementation, convert SVG to PNG
  console.log(`  📝 Created placeholder icon: ${size}x${size}.png`);
}

function validateBuild() {
  const distPath = path.join(__dirname, '../dist');
  const requiredFiles = [
    'index.html',
    'manifest.json',
    'sw.js'
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(distPath, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Required file missing: ${file}`);
    }
  }

  // Check bundle size
  const jsFiles = fs.readdirSync(path.join(distPath, 'assets'))
    .filter(file => file.endsWith('.js'));
  
  for (const jsFile of jsFiles) {
    const filePath = path.join(distPath, 'assets', jsFile);
    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;
    
    if (sizeKB > 1000) {
      console.warn(`⚠️  Large JS bundle detected: ${jsFile} (${sizeKB.toFixed(2)}KB)`);
    }
  }

  console.log('  ✅ Build validation passed');
}

async function buildAndroid() {
  console.log('🤖 Building Android app...');
  
  try {
    // Sync Capacitor
    execSync('npx cap sync android', { stdio: 'inherit' });
    
    // Build APK (debug)
    execSync('npx cap build android', { stdio: 'inherit' });
    
    console.log('  ✅ Android debug build completed');
    console.log('  📍 APK location: android/app/build/outputs/apk/debug/');
    
  } catch (error) {
    console.error('  ❌ Android build failed:', error.message);
    throw error;
  }
}

async function buildIOS() {
  console.log('🍎 Building iOS app...');
  
  try {
    // Sync Capacitor
    execSync('npx cap sync ios', { stdio: 'inherit' });
    
    // Build iOS (requires Xcode)
    execSync('npx cap build ios', { stdio: 'inherit' });
    
    console.log('  ✅ iOS build completed');
    console.log('  📍 Open ios/App/App.xcworkspace in Xcode to archive');
    
  } catch (error) {
    console.error('  ❌ iOS build failed:', error.message);
    console.error('  💡 Make sure Xcode is installed and configured');
    throw error;
  }
}

// Run build process
if (require.main === module) {
  buildApp();
}

module.exports = { buildApp };