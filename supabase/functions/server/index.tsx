import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Supabase client for storage operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Storage bucket names
const BUCKETS = {
  BOOK_COVERS: 'make-eda44699-book-covers',
  BOOK_PAGES: 'make-eda44699-book-pages',
  BOOK_CONTENT: 'make-eda44699-book-content',
  CHARACTERS: 'make-eda44699-characters',
  AUDIO_TTS: 'make-eda44699-audio-tts',
  AUDIO_EFFECTS: 'make-eda44699-audio-effects',
  AUDIO_BACKGROUND: 'make-eda44699-audio-background',
  GAME_ASSETS: 'make-eda44699-game-assets',
  AVATARS: 'make-eda44699-avatars',
};

// Initialize storage buckets on startup
async function initializeBuckets() {
  const bucketNames = Object.values(BUCKETS);
  
  for (const bucketName of bucketNames) {
    try {
      // Check if bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
      
      if (!bucketExists) {
        // Create bucket if it doesn't exist
        const { error } = await supabase.storage.createBucket(bucketName, {
          public: false, // Private buckets - use signed URLs
        });
        
        if (error && error.message !== 'The resource already exists') {
          console.error(`Error creating bucket ${bucketName}:`, error);
        } else if (!error) {
          console.log(`✅ Created bucket: ${bucketName}`);
        }
      } else {
        console.log(`✅ Bucket already exists: ${bucketName}`);
      }
    } catch (error: any) {
      // Ignore "already exists" errors (409)
      if (error.status !== 409 && error.statusCode !== '409') {
        console.error(`Error initializing bucket ${bucketName}:`, error.message || error);
      }
    }
  }
  
  console.log('✅ Storage buckets initialized');
}

// Initialize buckets on server start
initializeBuckets().catch(console.error);

// ============================================================================
// DATA SEEDING ENDPOINT
// ============================================================================

// Seed initial character and book data
app.post("/make-server-eda44699/seed-data", async (c) => {
  try {
    // Check if data already exists
    const existingCharacters = await kv.getByPrefix('character:');
    const existingBooks = await kv.getByPrefix('book:');
    
    if (existingCharacters && existingCharacters.length > 0) {
      return c.json({ 
        message: 'Data already seeded',
        characterCount: existingCharacters.length,
        bookCount: existingBooks?.length || 0
      });
    }

    // Seed sample characters
    const sampleCharacters = [
      {
        id: '1',
        name: 'Akai',
        species: 'Red Panda',
        habitat: 'forest',
        description: 'A playful and curious red panda who loves exploring the forest',
        personality_traits: ['Brave', 'Curious', 'Kind', 'Loyal'],
        fun_facts: ['Akai loves bamboo shoots and berries', 'Expert climber'],
        discovered: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Daichi',
        species: 'Giant Panda',
        habitat: 'desert',
        description: 'A gentle giant panda who enjoys the warmth of the desert sun',
        personality_traits: ['Wise', 'Patient', 'Gentle', 'Protective'],
        fun_facts: ['Daichi loves fresh bamboo', 'Excellent teacher'],
        discovered: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Raiku',
        species: 'Sea Turtle',
        habitat: 'ocean',
        description: 'A wise sea turtle who guides travelers through the ocean',
        personality_traits: ['Wise', 'Calm', 'Patient', 'Friendly'],
        fun_facts: ['Raiku can navigate by the stars', 'Loves seaweed'],
        discovered: true,
        created_at: new Date().toISOString(),
      }
    ];

    // Seed sample books
    const sampleBooks = [
      {
        id: '1',
        title: 'The Adventures of Rusty the Red Panda',
        author: 'Rooted Tales',
        category: 'Forest Adventures',
        description: 'Join Rusty on an exciting journey through the mystical forest as he discovers friendship and courage.',
        cover_color: 'from-red-400 to-orange-500',
        reading_time: '15 min',
        pages: 28,
        price: '$8.99',
        character_ids: ['1'],
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'The Adventures of Akai the Red Panda: A Heart-warming Panda Reunion',
        author: 'Rooted Tales',
        category: 'Forest Adventures',
        description: 'A heartwarming tale of family reunion and the bonds that connect us all.',
        cover_color: 'from-pink-400 to-red-500',
        reading_time: '35 min',
        pages: 76,
        price: '$16.99',
        character_ids: ['1', '2'],
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Akai and Kaito in the Great Ocean Odyssey',
        author: 'Rooted Tales',
        category: 'Water Adventures',
        description: 'Join Akai and Kaito on a heartwarming ocean adventure filled with friendship, courage, and magical discoveries.',
        cover_color: 'from-blue-400 to-cyan-500',
        reading_time: '30 min',
        pages: 64,
        price: '$14.99',
        character_ids: ['1', '3'],
        created_at: new Date().toISOString(),
      }
    ];

    // Store characters
    for (const char of sampleCharacters) {
      await kv.set(`character:${char.id}`, char);
    }

    // Store books
    for (const book of sampleBooks) {
      await kv.set(`book:${book.id}`, book);
    }

    return c.json({ 
      success: true,
      message: 'Data seeded successfully',
      characterCount: sampleCharacters.length,
      bookCount: sampleBooks.length
    }, 201);
  } catch (error: any) {
    console.error('Error seeding data:', error);
    return c.json({ 
      error: 'Failed to seed data',
      message: error.message 
    }, 500);
  }
});

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-eda44699/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================================================
// CHARACTER ENDPOINTS (Using KV Store)
// ============================================================================

// Get all characters
app.get("/make-server-eda44699/characters", async (c) => {
  try {
    const characters = await kv.getByPrefix('character:');
    return c.json({ 
      characters: characters || [],
      count: characters?.length || 0 
    });
  } catch (error: any) {
    console.error('Error fetching characters:', error);
    return c.json({ 
      error: 'Failed to fetch characters',
      message: error.message 
    }, 500);
  }
});

// Get single character
app.get("/make-server-eda44699/characters/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const character = await kv.get(`character:${id}`);
    
    if (!character) {
      return c.json({ error: 'Character not found' }, 404);
    }
    
    return c.json({ character });
  } catch (error: any) {
    console.error('Error fetching character:', error);
    return c.json({ 
      error: 'Failed to fetch character',
      message: error.message 
    }, 500);
  }
});

// Create character
app.post("/make-server-eda44699/characters", async (c) => {
  try {
    const body = await c.req.json();
    const { id, name, species, habitat, description, image_url, personality_traits, fun_facts } = body;
    
    if (!id || !name || !species) {
      return c.json({ error: 'Missing required fields: id, name, species' }, 400);
    }
    
    const character = {
      id,
      name,
      species,
      habitat: habitat || 'forest',
      description: description || '',
      image_url: image_url || '',
      personality_traits: personality_traits || [],
      fun_facts: fun_facts || [],
      discovered: true,
      created_at: new Date().toISOString(),
    };
    
    await kv.set(`character:${id}`, character);
    
    return c.json({ 
      success: true,
      character 
    }, 201);
  } catch (error: any) {
    console.error('Error creating character:', error);
    return c.json({ 
      error: 'Failed to create character',
      message: error.message 
    }, 500);
  }
});

// Update character
app.put("/make-server-eda44699/characters/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existingCharacter = await kv.get(`character:${id}`);
    if (!existingCharacter) {
      return c.json({ error: 'Character not found' }, 404);
    }
    
    const updatedCharacter = {
      ...existingCharacter,
      ...body,
      id, // Prevent ID change
      updated_at: new Date().toISOString(),
    };
    
    await kv.set(`character:${id}`, updatedCharacter);
    
    return c.json({ 
      success: true,
      character: updatedCharacter 
    });
  } catch (error: any) {
    console.error('Error updating character:', error);
    return c.json({ 
      error: 'Failed to update character',
      message: error.message 
    }, 500);
  }
});

// Delete character
app.delete("/make-server-eda44699/characters/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    const character = await kv.get(`character:${id}`);
    if (!character) {
      return c.json({ error: 'Character not found' }, 404);
    }
    
    await kv.del(`character:${id}`);
    
    return c.json({ 
      success: true,
      message: 'Character deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error deleting character:', error);
    return c.json({ 
      error: 'Failed to delete character',
      message: error.message 
    }, 500);
  }
});

// Get character image signed URL
app.get("/make-server-eda44699/characters/:id/image", async (c) => {
  try {
    const id = c.req.param('id');
    const character = await kv.get(`character:${id}`);
    
    if (!character) {
      return c.json({ error: 'Character not found' }, 404);
    }
    
    // If character has a storage path, get signed URL
    if (character.storage_path) {
      const { data, error } = await supabase.storage
        .from(BUCKETS.CHARACTERS)
        .createSignedUrl(character.storage_path, 3600); // 1 hour expiry
      
      if (error) {
        console.error('Error creating signed URL:', error);
        return c.json({ url: character.image_url || null });
      }
      
      return c.json({ url: data.signedUrl });
    }
    
    // Return direct image URL if available
    return c.json({ url: character.image_url || null });
  } catch (error: any) {
    console.error('Error fetching character image:', error);
    return c.json({ 
      error: 'Failed to fetch character image',
      message: error.message 
    }, 500);
  }
});

// ============================================================================
// BOOK ENDPOINTS (Using KV Store)
// ============================================================================

// Get all books
app.get("/make-server-eda44699/books", async (c) => {
  try {
    const books = await kv.getByPrefix('book:');
    return c.json({ 
      books: books || [],
      count: books?.length || 0 
    });
  } catch (error: any) {
    console.error('Error fetching books:', error);
    return c.json({ 
      error: 'Failed to fetch books',
      message: error.message 
    }, 500);
  }
});

// Get single book
app.get("/make-server-eda44699/books/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const book = await kv.get(`book:${id}`);
    
    if (!book) {
      return c.json({ error: 'Book not found' }, 404);
    }
    
    return c.json({ book });
  } catch (error: any) {
    console.error('Error fetching book:', error);
    return c.json({ 
      error: 'Failed to fetch book',
      message: error.message 
    }, 500);
  }
});

// Get book cover URL
app.get("/make-server-eda44699/books/:id/cover", async (c) => {
  try {
    const id = c.req.param('id');
    const book = await kv.get(`book:${id}`);
    
    if (!book) {
      return c.json({ error: 'Book not found' }, 404);
    }
    
    if (book.cover_storage_path) {
      const { data, error } = await supabase.storage
        .from(BUCKETS.BOOK_COVERS)
        .createSignedUrl(book.cover_storage_path, 3600);
      
      if (error) {
        console.error('Error creating signed URL:', error);
        return c.json({ url: book.cover_image_url || null });
      }
      
      return c.json({ url: data.signedUrl });
    }
    
    return c.json({ url: book.cover_image_url || null });
  } catch (error: any) {
    console.error('Error fetching book cover:', error);
    return c.json({ 
      error: 'Failed to fetch book cover',
      message: error.message 
    }, 500);
  }
});

// ============================================================================
// AUDIO ENDPOINTS
// ============================================================================

// Get background music URL
app.get("/make-server-eda44699/audio/background/:soundName", async (c) => {
  try {
    const soundName = c.req.param('soundName');
    
    const { data, error } = await supabase.storage
      .from(BUCKETS.AUDIO_BACKGROUND)
      .createSignedUrl(`${soundName}.mp3`, 3600);
    
    if (error) {
      console.error('Error getting background music:', error);
      return c.json({ error: 'Audio file not found' }, 404);
    }
    
    return c.json({ url: data.signedUrl });
  } catch (error: any) {
    console.error('Error fetching background music:', error);
    return c.json({ 
      error: 'Failed to fetch background music',
      message: error.message 
    }, 500);
  }
});

// Get sound effect URL
app.get("/make-server-eda44699/audio/effect/:soundName", async (c) => {
  try {
    const soundName = c.req.param('soundName');
    
    const { data, error } = await supabase.storage
      .from(BUCKETS.AUDIO_EFFECTS)
      .createSignedUrl(`${soundName}.mp3`, 3600);
    
    if (error) {
      console.error('Error getting sound effect:', error);
      return c.json({ error: 'Audio file not found' }, 404);
    }
    
    return c.json({ url: data.signedUrl });
  } catch (error: any) {
    console.error('Error fetching sound effect:', error);
    return c.json({ 
      error: 'Failed to fetch sound effect',
      message: error.message 
    }, 500);
  }
});

Deno.serve(app.fetch);