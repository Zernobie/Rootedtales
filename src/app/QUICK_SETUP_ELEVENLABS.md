# 🎙️ Quick Setup: ElevenLabs Voice Integration

## ⚡ 5-Minute Setup Guide

### Step 1: Get Your ElevenLabs API Key (2 minutes)

1. Visit [https://elevenlabs.io/](https://elevenlabs.io/)
2. Sign up for a free account (10,000 characters/month free)
3. Go to your profile → **API Keys**
4. Click **Create API Key** or copy your existing key
5. Copy the key to your clipboard

### Step 2: Add API Key to Supabase (1 minute)

**Option A: Via Environment Variable Modal (Already Done!)**
You should have already seen a modal prompting you to add `ELEVENLABS_API_KEY`. If you haven't filled it yet, the app will prompt you again.

**Option B: Manually in Supabase Dashboard**
1. Open Supabase Dashboard
2. Navigate to: **Project Settings** → **Edge Functions** → **Secrets**
3. Click **Add New Secret**
4. Name: `ELEVENLABS_API_KEY`
5. Value: Paste your API key
6. Click **Save**

### Step 3: Test It! (2 minutes)

1. Open your Rooted Tales app
2. Click the **Volume icon** in the menubar
3. Go to the **Voice** tab
4. Click the **Play button** (▶) next to any voice
5. You should see a toast: "Playing [Voice Name] preview (AI Voice)" ✅

**If you see "Browser Voice" instead:**
- Check that your API key is correctly added
- Check the browser console for errors
- Verify your ElevenLabs account has available quota

### Step 4: Verify Everything Works

**Check Server Logs:**
1. Go to Supabase Dashboard
2. Navigate to **Edge Functions** → **make-server-eda44699**
3. Click **Logs**
4. You should see: "✅ TTS generated successfully: voice-luna-warm-[timestamp].mp3"

**Check Storage:**
1. Go to Supabase Dashboard → **Storage**
2. Open bucket: `make-eda44699-audio-tts`
3. You should see a `previews/` folder with generated MP3 files

---

## 🎯 What You Can Do Now

✅ **Test all 6 voices** in Audio Settings
✅ **Generate voice previews** with custom text
✅ **Create full book narrations** (see ELEVENLABS_INTEGRATION.md)
✅ **Adjust voice parameters** (speed, pitch, clarity)

---

## ❓ Quick Troubleshooting

**Problem: "TTS service not configured" error**
- **Solution:** Add your ELEVENLABS_API_KEY to Supabase secrets

**Problem: Voice plays but sounds robotic**
- **Solution:** This means it's using browser TTS fallback. Check your API key.

**Problem: "Failed to generate audio" error**
- **Solution:** Check ElevenLabs quota. Free tier = 10k characters/month.

---

## 📊 Voice Samples Explained

Each voice character text is approximately:
- **Luna:** 107 characters → ~0.1 minute of audio
- **Forest:** 95 characters → ~0.1 minute of audio  
- **Chirpy:** 81 characters → ~0.08 minute of audio
- **Sage:** 130 characters → ~0.13 minute of audio
- **Aurora:** 105 characters → ~0.1 minute of audio
- **Captain:** 97 characters → ~0.1 minute of audio

**Total for testing all voices:** ~615 characters (well within free tier!)

---

## 🚀 Next Steps

1. ✅ Test voice previews
2. 📝 Plan which books need full narration
3. 💰 Decide on ElevenLabs pricing tier based on needs
4. 🎨 Customize voice settings for each character
5. 📱 Implement full book playback in reading view

---

**That's it! Your AI voice narration is ready to go!** 🎉

For advanced usage and customization, see [ELEVENLABS_INTEGRATION.md](/ELEVENLABS_INTEGRATION.md)
