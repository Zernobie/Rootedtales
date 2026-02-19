/**
 * Asset Manager for Rooted Tales
 * 
 * Manages loading of images, audio, and other assets from Supabase Storage
 * with fallback to local cached versions.
 * 
 * Place this file at: src/lib/assetManager.ts
 */

import { projectId, publicAnonKey } from '../utils/supabase/info';

// Supabase Storage bucket names
const BUCKETS = {
  bookCovers: 'make-eda44699-book-covers',
  bookPages: 'make-eda44699-book-pages',
  bookContent: 'make-eda44699-book-content',
  characters: 'make-eda44699-characters',
  audioTTS: 'make-eda44699-audio-tts',
  audioEffects: 'make-eda44699-audio-effects',
  audioBackground: 'make-eda44699-audio-background',
  gameAssets: 'make-eda44699-game-assets',
  avatars: 'make-eda44699-avatars',
} as const;

// Cache for loaded assets
const assetCache = new Map<string, string>();

// Health check cache
let isBackendHealthy: boolean | null = null;
let lastHealthCheck = 0;
const HEALTH_CHECK_INTERVAL = 60000; // 1 minute

/**
 * Check if Supabase backend is available
 */
async function checkBackendHealth(): Promise<boolean> {
  const now = Date.now();

  // Use cached result if recent
  if (isBackendHealthy !== null && (now - lastHealthCheck) < HEALTH_CHECK_INTERVAL) {
    return isBackendHealthy;
  }

  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/health`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      }
    );

    isBackendHealthy = response.ok;
    lastHealthCheck = now;
    return isBackendHealthy;
  } catch (error) {
    isBackendHealthy = false;
    lastHealthCheck = now;
    return false;
  }
}

/**
 * Get a signed URL for an asset in Supabase Storage
 */
async function getSignedUrl(
  bucket: keyof typeof BUCKETS,
  filePath: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/storage/signed-url`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          bucket: BUCKETS[bucket],
          path: filePath,
          expiresIn,
        }),
      }
    );

    if (!response.ok) {
      console.warn(`Failed to get signed URL for ${bucket}/${filePath}`);
      return null;
    }

    const data = await response.json();
    return data.signedUrl;
  } catch (error) {
    console.warn(`Error getting signed URL for ${bucket}/${filePath}:`, error);
    return null;
  }
}

/**
 * Load an image asset with fallback
 */
export async function loadImage(
  bucket: keyof typeof BUCKETS,
  fileName: string,
  fallbackSrc?: string
): Promise<string> {
  const cacheKey = `${bucket}/${fileName}`;

  // Check cache first
  if (assetCache.has(cacheKey)) {
    return assetCache.get(cacheKey)!;
  }

  // Check if backend is healthy
  const backendHealthy = await checkBackendHealth();

  if (backendHealthy) {
    // Try to load from Supabase
    const signedUrl = await getSignedUrl(bucket, fileName);

    if (signedUrl) {
      assetCache.set(cacheKey, signedUrl);
      return signedUrl;
    }
  }

  // Fallback to local or provided fallback
  if (fallbackSrc) {
    assetCache.set(cacheKey, fallbackSrc);
    return fallbackSrc;
  }

  // Default fallback - placeholder
  const placeholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='sans-serif'%3EImage not available%3C/text%3E%3C/svg%3E`;
  assetCache.set(cacheKey, placeholder);
  return placeholder;
}

/**
 * Load a book cover image
 */
export async function loadBookCover(bookId: string, fallbackSrc?: string): Promise<string> {
  return loadImage('bookCovers', `${bookId}.jpg`, fallbackSrc);
}

/**
 * Load a character image
 */
export async function loadCharacterImage(characterId: string, fallbackSrc?: string): Promise<string> {
  return loadImage('characters', `${characterId}.png`, fallbackSrc);
}

/**
 * Load an audio file
 */
export async function loadAudio(
  type: 'audioTTS' | 'audioEffects' | 'audioBackground',
  fileName: string,
  fallbackSrc?: string
): Promise<string> {
  const cacheKey = `${type}/${fileName}`;

  // Check cache first
  if (assetCache.has(cacheKey)) {
    return assetCache.get(cacheKey)!;
  }

  // Check if backend is healthy
  const backendHealthy = await checkBackendHealth();

  if (backendHealthy) {
    // Try to load from Supabase
    const signedUrl = await getSignedUrl(type, fileName, 7200); // 2 hours for audio

    if (signedUrl) {
      assetCache.set(cacheKey, signedUrl);
      return signedUrl;
    }
  }

  // Fallback to local or provided fallback
  if (fallbackSrc) {
    assetCache.set(cacheKey, fallbackSrc);
    return fallbackSrc;
  }

  // No audio available
  return '';
}

/**
 * Preload multiple assets
 */
export async function preloadAssets(
  assets: Array<{
    bucket: keyof typeof BUCKETS;
    fileName: string;
    fallbackSrc?: string;
  }>
): Promise<void> {
  const promises = assets.map(({ bucket, fileName, fallbackSrc }) =>
    loadImage(bucket, fileName, fallbackSrc)
  );

  await Promise.allSettled(promises);
}

/**
 * Clear asset cache
 */
export function clearAssetCache(): void {
  assetCache.clear();
  isBackendHealthy = null;
  lastHealthCheck = 0;
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  size: number;
  keys: string[];
  backendHealthy: boolean | null;
} {
  return {
    size: assetCache.size,
    keys: Array.from(assetCache.keys()),
    backendHealthy: isBackendHealthy,
  };
}

// Export types
export type AssetBucket = keyof typeof BUCKETS;
export type AudioType = 'audioTTS' | 'audioEffects' | 'audioBackground';
