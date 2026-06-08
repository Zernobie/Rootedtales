# ElevenLabs TTS Integration Guide

## Overview
Your Rooted Tales app now includes professional AI voice narration powered by ElevenLabs! This integration provides high-quality, natural-sounding voices for all your book narrations and voice previews.

## ✅ What's Been Implemented

### 1. Server-Side TTS Endpoints
Location: `/supabase/functions/server/index.tsx`

**Endpoints Available:**
- `POST /make-server-eda44699/audio/tts/generate` - Generate voice sample/preview
- `GET /make-server-eda44699/audio/tts/voices` - List available voices
- `POST /make-server-eda44699/audio/tts/book/:bookId` - Generate full book narration
- `GET /make-server-eda44699/audio/tts/book/:bookId/:voiceId` - Get book audio chapters

### 2. Voice Mappings
Your 6 character voices are mapped to professional ElevenLabs voices:

```typescript
'luna-warm'         → Rachel (Warm, nurturing female voice)
'forest-deep'       → Josh (Deep male narrator)
'chirpy-joy'        → Freya (Energetic young female)
'sage-wisdom'       → Adam (Wise narrator)
'aurora-mystical'   → Bella (Mystical female)
'captain-adventure' → Arnold (Bold adventurous male)
```

### 3. Audio Storage
- Generated audio files are stored in Supabase Storage bucket: `make-eda44699-audio-tts`
- Previews are stored in `/previews/` subfolder
- Full book narrations are stored in `/books/{bookId}/` subfolders
- All audio files are served via secure signed URLs (1-hour expiry)

### 4. Frontend Integration
Location: `/components/AudioSettings.tsx`

**Features:**
- ✅ Automatic fallback to browser TTS if ElevenLabs is unavailable
- ✅ Smart preview system with loading states
- ✅ Volume and speed control integration
- ✅ Professional toast notifications
- ✅ Error handling with graceful degradation

## 🔑 Setup Instructions

### Step 1: Get Your ElevenLabs API Key
1. Go to [ElevenLabs](https://elevenlabs.io/)
2. Sign up or log in to your account
3. Navigate to Profile Settings → API Keys
4. Create a new API key or copy your existing one

### Step 2: Add API Key to Supabase
The system has already prompted you to add your `ELEVENLABS_API_KEY` secret. If you haven't added it yet:

1. Open the Supabase dashboard for your project
2. Go to **Settings** → **Edge Functions** → **Secrets**
3. Add a new secret:
   - Name: `ELEVENLABS_API_KEY`
   - Value: Your ElevenLabs API key

**OR** you can redeploy the edge function and the system will prompt you again.

### Step 3: Test the Integration
1. Open your app
2. Navigate to **Audio Settings** (Volume icon in menubar)
3. Go to the **Voice** tab
4. Click the play button on any voice to hear a preview
5. If configured correctly, you'll see "AI Voice" in the toast notification

## 🎯 How It Works

### Voice Preview Flow
```
User clicks preview button
       ↓
Frontend calls /audio/tts/generate with sample text
       ↓
Server calls ElevenLabs API
       ↓
Audio file is generated (MP3)
       ↓
File is uploaded to Supabase Storage
       ↓
Signed URL is created and returned
       ↓
Frontend plays the audio
```

### Fallback Mechanism
If ElevenLabs fails (no API key, network error, quota exceeded):
1. System automatically falls back to browser TTS
2. User is notified via toast message
3. App continues working without interruption

## 📊 Voice Quality Comparison

| Feature | Browser TTS | ElevenLabs TTS |
|---------|-------------|----------------|
| Voice Quality | Robotic, basic | Professional, natural |
| Emotional Range | Limited | Excellent |
| Pronunciation | Variable | Consistent |
| Language Support | Good | Excellent |
| Cost | Free | Paid (API usage) |
| Offline Support | Yes | No (requires API) |

## 💰 ElevenLabs Pricing (as of 2026)

**Free Tier:**
- 10,000 characters/month
- ~5-10 minutes of audio
- Perfect for testing

**Creator Tier (~$5/month):**
- 30,000 characters/month
- ~15-30 minutes of audio
- Good for development

**Pro Tier (~$22/month):**
- 100,000 characters/month
- ~50-100 minutes of audio
- Production ready

For full book narrations, you may want the Creator or Pro tier.

## 🚀 Advanced Usage

### Generate Full Book Narration

```typescript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/audio/tts/book/1`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify({
      voiceId: 'luna-warm',
      chapters: [
        {
          title: 'Chapter 1: A New Beginning',
          text: 'Once upon a time, in a mystical forest...'
        },
        {
          title: 'Chapter 2: The Adventure Begins',
          text: 'Rusty woke up to the sound of birds...'
        }
      ]
    }),
  }
);
```

### Retrieve Book Audio

```typescript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/audio/tts/book/1/luna-warm`,
  {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  }
);

const data = await response.json();
// data.chapters contains array of chapters with signed URLs
```

## 🎨 Customization Options

### Voice Settings
You can customize the following parameters in your API calls:

- **speed** (0.25 - 4.0) - Reading speed multiplier
- **stability** (0.0 - 1.0) - Voice consistency (higher = more stable)
- **clarity** (0.0 - 1.0) - Similarity to original voice (higher = closer match)

Example:
```typescript
{
  voiceId: 'luna-warm',
  text: 'Hello world',
  speed: 1.2,      // 20% faster
  stability: 0.7,   // More consistent
  clarity: 0.85     // Very close to original
}
```

### Using Different ElevenLabs Voices
To use different voices from your ElevenLabs account:

1. Get voice IDs from ElevenLabs dashboard
2. Update the `VOICE_MAPPINGS` in `/supabase/functions/server/index.tsx`:

```typescript
const VOICE_MAPPINGS: Record<string, string> = {
  'luna-warm': 'YOUR_VOICE_ID_HERE',
  'forest-deep': 'ANOTHER_VOICE_ID',
  // ... etc
};
```

## 🐛 Troubleshooting

### "TTS service not configured" error
- **Cause:** ElevenLabs API key is missing
- **Fix:** Add `ELEVENLABS_API_KEY` secret in Supabase dashboard

### Voice preview plays but with browser voice
- **Cause:** API key invalid or quota exceeded
- **Fix:** Check API key validity and ElevenLabs account status

### Audio won't play
- **Cause:** Signed URL expired (1 hour expiry)
- **Fix:** Request the audio again to generate a fresh signed URL

### High latency on first preview
- **Cause:** Cold start of edge function + ElevenLabs API call
- **Fix:** This is normal; subsequent calls will be faster

## 📈 Monitoring Usage

Track your ElevenLabs usage:
1. Log in to [ElevenLabs Dashboard](https://elevenlabs.io/)
2. Go to **Usage** tab
3. Monitor character count and API calls

## 🔒 Security Notes

- ✅ API key is stored securely in Supabase environment variables
- ✅ Never exposed to frontend
- ✅ All requests go through your backend
- ✅ Audio files use signed URLs with expiration
- ✅ Private storage buckets (not publicly accessible)

## 🎯 Next Steps

1. **Add API key** to Supabase secrets
2. **Test voice previews** in Audio Settings
3. **Generate sample narration** for a book chapter
4. **Implement full book narration** for purchased books
5. **Add download feature** for offline listening

## 📚 Resources

- [ElevenLabs Documentation](https://docs.elevenlabs.io/)
- [ElevenLabs Voice Library](https://elevenlabs.io/voice-library)
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

## 💡 Pro Tips

1. **Character Estimation:** ~1,000 characters = 1 minute of audio
2. **Optimize Costs:** Cache generated audio files instead of regenerating
3. **Batch Processing:** Generate multiple chapters at once to reduce API calls
4. **Voice Testing:** Use the free tier to test all voices before committing
5. **Error Handling:** Always provide browser TTS fallback for reliability

---

**Need Help?** Check server logs in Supabase Functions dashboard for detailed error messages.
