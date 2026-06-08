/**
 * Audio Helpers for ElevenLabs TTS Integration
 * Utility functions for generating and managing AI voice narration
 */

import { projectId, publicAnonKey } from './supabase/info';

export interface TTSGenerateRequest {
  text: string;
  voiceId: string;
  speed?: number;
  stability?: number;
  clarity?: number;
}

export interface TTSGenerateResponse {
  success: boolean;
  url: string;
  filename: string;
  voiceId: string;
  duration: number;
}

export interface BookChapter {
  title: string;
  text: string;
}

export interface BookNarrationRequest {
  bookId: string;
  voiceId: string;
  chapters: BookChapter[];
}

export interface BookNarrationResponse {
  success: boolean;
  bookId: string;
  voiceId: string;
  totalChapters: number;
  generatedChapters: number;
  chapters: Array<{
    chapterIndex: number;
    title: string;
    filename: string;
    path: string;
  }>;
}

export interface BookAudioChapter {
  chapterIndex: number;
  title: string;
  filename: string;
  path: string;
  url: string | null;
}

export interface BookAudioResponse {
  bookId: string;
  voiceId: string;
  chapters: BookAudioChapter[];
  generated_at: string;
}

/**
 * Generate a single voice sample/preview using ElevenLabs TTS
 */
export async function generateVoicePreview(
  request: TTSGenerateRequest
): Promise<TTSGenerateResponse> {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/audio/tts/generate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        text: request.text,
        voiceId: request.voiceId,
        speed: request.speed ?? 1.0,
        stability: request.stability ?? 0.5,
        clarity: request.clarity ?? 0.75,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate voice preview');
  }

  return await response.json();
}

/**
 * Generate full book narration with multiple chapters
 * This may take a while depending on book length
 */
export async function generateBookNarration(
  request: BookNarrationRequest,
  onProgress?: (current: number, total: number) => void
): Promise<BookNarrationResponse> {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/audio/tts/book/${request.bookId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        voiceId: request.voiceId,
        chapters: request.chapters,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate book narration');
  }

  const data = await response.json();
  
  if (onProgress) {
    onProgress(data.generatedChapters, data.totalChapters);
  }

  return data;
}

/**
 * Retrieve existing book audio with signed URLs for playback
 */
export async function getBookAudio(
  bookId: string,
  voiceId: string
): Promise<BookAudioResponse> {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/audio/tts/book/${bookId}/${voiceId}`,
    {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Book audio not found. Generate narration first.');
    }
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch book audio');
  }

  return await response.json();
}

/**
 * List all available ElevenLabs voices and mappings
 */
export async function getAvailableVoices(): Promise<{
  voices: any[];
  mappings: Record<string, string>;
}> {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/audio/tts/voices`,
    {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch available voices');
  }

  return await response.json();
}

/**
 * Estimate character count for a book
 * Useful for calculating ElevenLabs costs
 */
export function estimateCharacterCount(chapters: BookChapter[]): {
  totalCharacters: number;
  estimatedMinutes: number;
  estimatedCost: string;
} {
  const totalCharacters = chapters.reduce(
    (sum, chapter) => sum + chapter.title.length + chapter.text.length,
    0
  );

  // Approximate: 1000 characters ≈ 1 minute of audio
  const estimatedMinutes = Math.ceil(totalCharacters / 1000);

  // ElevenLabs pricing (approximate)
  // Free: 10,000 chars/month
  // Creator: 30,000 chars/month ($5)
  // Pro: 100,000 chars/month ($22)
  let estimatedCost = 'Free';
  if (totalCharacters > 10000) {
    estimatedCost = 'Creator tier ($5/mo)';
  }
  if (totalCharacters > 30000) {
    estimatedCost = 'Pro tier ($22/mo)';
  }

  return {
    totalCharacters,
    estimatedMinutes,
    estimatedCost,
  };
}

/**
 * Check if book narration exists
 */
export async function checkBookNarrationExists(
  bookId: string,
  voiceId: string
): Promise<boolean> {
  try {
    await getBookAudio(bookId, voiceId);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Example usage in a component:
 * 
 * import { generateVoicePreview, generateBookNarration, estimateCharacterCount } from '@/utils/audioHelpers';
 * 
 * // Generate voice preview
 * const preview = await generateVoicePreview({
 *   text: 'Hello, welcome to Rooted Tales!',
 *   voiceId: 'luna-warm',
 *   speed: 1.0
 * });
 * 
 * // Play the preview
 * const audio = new Audio(preview.url);
 * audio.play();
 * 
 * // Generate full book narration
 * const chapters = [
 *   { title: 'Chapter 1', text: 'Once upon a time...' },
 *   { title: 'Chapter 2', text: 'The adventure continues...' }
 * ];
 * 
 * const estimate = estimateCharacterCount(chapters);
 * console.log(`This will cost approximately: ${estimate.estimatedCost}`);
 * console.log(`Estimated audio length: ${estimate.estimatedMinutes} minutes`);
 * 
 * const narration = await generateBookNarration(
 *   {
 *     bookId: '1',
 *     voiceId: 'luna-warm',
 *     chapters
 *   },
 *   (current, total) => {
 *     console.log(`Generated ${current}/${total} chapters`);
 *   }
 * );
 * 
 * // Later, retrieve the audio
 * const bookAudio = await getBookAudio('1', 'luna-warm');
 * bookAudio.chapters.forEach(chapter => {
 *   console.log(`Chapter: ${chapter.title}`);
 *   console.log(`Audio URL: ${chapter.url}`);
 * });
 */
