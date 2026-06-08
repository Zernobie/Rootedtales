/**
 * React Hooks for Asset Management - Rooted Tales
 * 
 * Provides React hooks for loading and managing assets from Supabase
 * with automatic caching and fallback support.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  loadImage,
  loadBookCover,
  loadCharacterImage,
  loadAudio,
  preloadAssets,
  clearAssetCache,
  getCacheStats,
  type AssetBucket,
  type AudioType,
} from '../lib/assetManager';

/**
 * Hook for loading a single image asset
 */
export function useImage(
  bucket: AssetBucket,
  fileName: string,
  fallbackSrc?: string
) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const url = await loadImage(bucket, fileName, fallbackSrc);
        
        if (isMounted) {
          setImageUrl(url);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load image'));
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [bucket, fileName, fallbackSrc]);

  return { imageUrl, isLoading, error };
}

/**
 * Hook for loading a book cover
 */
export function useBookCover(bookId: string, fallbackSrc?: string) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const url = await loadBookCover(bookId, fallbackSrc);
        
        if (isMounted) {
          setCoverUrl(url);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load book cover'));
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [bookId, fallbackSrc]);

  return { coverUrl, isLoading, error };
}

/**
 * Hook for loading a character image
 */
export function useCharacterImage(characterId: string, fallbackSrc?: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const url = await loadCharacterImage(characterId, fallbackSrc);
        
        if (isMounted) {
          setImageUrl(url);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load character image'));
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [characterId, fallbackSrc]);

  return { imageUrl, isLoading, error };
}

/**
 * Hook for loading an audio file
 */
export function useAudio(
  type: AudioType,
  fileName: string,
  fallbackSrc?: string
) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const url = await loadAudio(type, fileName, fallbackSrc);
        
        if (isMounted) {
          setAudioUrl(url);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load audio'));
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [type, fileName, fallbackSrc]);

  return { audioUrl, isLoading, error };
}

/**
 * Hook for preloading multiple assets
 */
export function usePreloadAssets(
  assets: Array<{
    bucket: AssetBucket;
    fileName: string;
    fallbackSrc?: string;
  }>,
  enabled: boolean = true
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;

    async function preload() {
      try {
        setIsLoading(true);
        setError(null);
        await preloadAssets(assets);
        
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to preload assets'));
          setIsLoading(false);
        }
      }
    }

    preload();

    return () => {
      isMounted = false;
    };
  }, [assets, enabled]);

  return { isLoading, error };
}

/**
 * Hook for managing asset cache
 */
export function useAssetCache() {
  const [stats, setStats] = useState(() => getCacheStats());

  const refresh = useCallback(() => {
    setStats(getCacheStats());
  }, []);

  const clear = useCallback(() => {
    clearAssetCache();
    setStats(getCacheStats());
  }, []);

  useEffect(() => {
    // Refresh stats periodically
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  return {
    stats,
    refresh,
    clear,
  };
}

/**
 * Hook for loading multiple images at once
 */
export function useImages(
  images: Array<{
    bucket: AssetBucket;
    fileName: string;
    fallbackSrc?: string;
  }>
) {
  const [imageUrls, setImageUrls] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      try {
        setIsLoading(true);
        setError(null);

        const promises = images.map(async ({ bucket, fileName, fallbackSrc }) => {
          const url = await loadImage(bucket, fileName, fallbackSrc);
          return { key: `${bucket}/${fileName}`, url };
        });

        const results = await Promise.all(promises);
        
        if (isMounted) {
          const urlMap = new Map<string, string>();
          results.forEach(({ key, url }) => {
            urlMap.set(key, url);
          });
          setImageUrls(urlMap);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load images'));
          setIsLoading(false);
        }
      }
    }

    loadAll();

    return () => {
      isMounted = false;
    };
  }, [images]);

  const getImageUrl = useCallback(
    (bucket: AssetBucket, fileName: string): string | null => {
      return imageUrls.get(`${bucket}/${fileName}`) || null;
    },
    [imageUrls]
  );

  return { imageUrls, getImageUrl, isLoading, error };
}
