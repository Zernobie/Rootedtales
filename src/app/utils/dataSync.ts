/**
 * Data Sync Utility
 * 
 * Provides unified data access for characters and books across the app.
 * Fetches data from Supabase backend and provides fallback to local data.
 */

import { projectId, publicAnonKey } from './supabase/info';

// Import character images for fallback
import akaiImg from 'figma:asset/70617c341f4fc7e523e0c33c8a450d534da7cb15.png';
import daichiImg from 'figma:asset/b8a289023dcffbb75139847742fb391a77ee5ac1.png';
import raikuImg from 'figma:asset/5d1a3407432a48a33e983ec01ef8b763c76e4711.png';
import quinnImg from 'figma:asset/9e01cb1b3c7b9040cf93897070e320b0fd31725a.png';
import koaImg from 'figma:asset/f21b6362bbbb728ab211984daecd1198c4891d15.png';
import hedgeImg from 'figma:asset/afa1f84f18efc12e806b4f72c6311e9134a9f1de.png';
import maruImg from 'figma:asset/4c41363012829e7eadb1018aa51fac91365f481f.png';
import ellieImg from 'figma:asset/cd3854edde95e7d95c8f3be5ee342626dd061fca.png';
import orinImg from 'figma:asset/597b183411eea87ecaa55ae1411c0760a3f18b59.png';
import raineImg from 'figma:asset/c562c10384fe8dc409f7effd9a6132fe1c78bf5a.png';
import nikoImg from 'figma:asset/41838faca2e395e8d90f7ebb854e8fd978c7e805.png';
import kaitoImg from 'figma:asset/377bb5599437aea21b762a776405e46e9f27c644.png';
import mizutoImg from 'figma:asset/3e1a1526ff86d84511fcc67dd2b8e7cc6fc4d489.png';
import lumiImg from 'figma:asset/98b3603a7a40d3d8f5a8896e3976f8bd198bd8c8.png';
import calyxImg from 'figma:asset/0cb0d85ec14ea9e933485d6c7dce7a9541936b62.png';
import sageImg from 'figma:asset/e446629814afe5294f2b9923e6ee56ac.png';
import kaiImg from 'figma:asset/8d75731740558e8ae67f94e6080289b6ae855101.png';
import willowImg from 'figma:asset/b26ad57bb2680a0dc30d25bdacd17aed2003e6d7.png';
import namiImg from 'figma:asset/c45e8c3310a8760b79ddc379894957a9dbc4f56b.png';
import aoiImg from 'figma:asset/281e7ff23390688f24ed36c1f61c2e95e53cfc67.png';
import basiliskImg from 'figma:asset/c72d9d59101b6d3b0f79f13f0aeca6ad735aef65.png';
import blazeImg from 'figma:asset/0aaf3d04721e910224d19322fffb0982fccaf16c.png';
import amaruqImg from 'figma:asset/981674a51e042124c9681c0107d0aef1d134694a.png';
import rajinImg from 'figma:asset/f483df4ad9e48816b4c3991f9fb3e29bdc141bd0.png';
import isenImg from 'figma:asset/ed623911fad1e1cbcafeb4d00a8b9c9c49cfc4d9.png';
import kazanImg from 'figma:asset/30daf837dbeb1a00dcca2aa9651977b9b2d0dcad.png';
import nyraImg from 'figma:asset/7dd4e27026e02d039b5c157df85fe1edb0067a58.png';
import strixImg from 'figma:asset/cff7abf67463d0970810960be596b94145b93b24.png';
import snowflakeImg from 'figma:asset/4a4445f9a6d4f88fef8e64984266a3d4179c9c5a.png';
import tatsuImg from 'figma:asset/a2a63b674bdbe64a74378c8540b321453d897397.png';
import frostImg from 'figma:asset/e48de0b3ba7be208ecc3f59e4ee83a870b41e949.png';
import arcticImg from 'figma:asset/56c7a95a11bc476e3340f1588a9348e6cf483539.png';
import calicoImg from 'figma:asset/74cb16fdded8d1ee96a7b539c0ca516110520fa5.png';
import thorneImg from 'figma:asset/8df91e2e0c3906cd8be8217b237d9c8be25370b5.png';

export interface Character {
  id: string;
  name: string;
  image: string;
  category: 'forest' | 'ocean' | 'mountain' | 'desert';
  description: string;
  animalType: string;
  book: string;
  fact: string;
  skills?: string[];
  personality?: string[];
  habitat?: string;
  favoriteFood?: string;
  likes?: string[];
  dislikes?: string[];
  trivia?: string;
  funFact?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  progress?: number;
  rating?: number;
  isDownloaded?: boolean;
  isPurchased?: boolean;
  coverColor?: string;
  readingTime?: string;
  pages?: number;
  price?: string;
  characters?: string[]; // Character IDs featured in the book
}

// Fallback local character data
const FALLBACK_CHARACTERS: Character[] = [
  { id: '1', name: 'Akai', image: akaiImg, category: 'forest', description: 'Red Panda', animalType: 'Red Panda', book: 'The Adventures of Akai', fact: 'Akai is a playful and curious red panda who loves exploring the forest.', skills: ['Leadership', 'Problem Solving', 'Climbing', 'Friendship'], personality: ['Brave', 'Curious', 'Kind', 'Loyal'], habitat: 'Temperate forests', favoriteFood: 'Bamboo shoots and berries' },
  { id: '2', name: 'Daichi', image: daichiImg, category: 'desert', description: 'Giant Panda', animalType: 'Panda', book: 'Forest Friends', fact: 'Daichi is a gentle giant panda who enjoys the warmth of the desert sun.', skills: ['Meditation', 'Wisdom', 'Strength', 'Teaching'], personality: ['Wise', 'Patient', 'Gentle', 'Protective'], habitat: 'Mountainous regions', favoriteFood: 'Fresh bamboo' },
  { id: '3', name: 'Raiku', image: raikuImg, category: 'ocean', description: 'Sea Turtle', animalType: 'Sea Turtle', book: 'Ocean Odyssey', fact: 'Raiku is a wise sea turtle who guides travelers through the ocean.', skills: ['Swimming', 'Navigation', 'Wisdom', 'Patience'], personality: ['Wise', 'Calm', 'Patient', 'Friendly'], habitat: 'Ocean waters', favoriteFood: 'Seaweed and jellyfish' },
  { id: '4', name: 'Quinn', image: quinnImg, category: 'forest', description: 'Quokka', animalType: 'Quokka', book: 'Forest Friends', fact: 'Quinn is a joyful quokka who loves to play in the forest.', skills: ['Optimism', 'Climbing', 'Joy-spreading', 'Resilience'], personality: ['Optimistic', 'Friendly', 'Curious', 'Resilient'], habitat: 'Australian islands', favoriteFood: 'Leaves and grasses' },
  { id: '5', name: 'Koa', image: koaImg, category: 'forest', description: 'Koala', animalType: 'Koala', book: 'Koala Journey', fact: 'Koa is a lazy koala who spends most of his time sleeping in the trees.', skills: ['Tree Climbing', 'Relaxation', 'Patience', 'Herbalism'], personality: ['Sleepy', 'Peaceful', 'Wise', 'Gentle'], habitat: 'Eucalyptus forests', favoriteFood: 'Eucalyptus leaves' },
  { id: '6', name: 'Hedge', image: hedgeImg, category: 'forest', description: 'Hedgehog', animalType: 'Hedgehog', book: 'Forest Friends', fact: 'Hedge is a spiky hedgehog who is always on the lookout for food.', skills: ['Defense', 'Foraging', 'Determination', 'Courage'], personality: ['Brave', 'Cautious', 'Loyal', 'Resourceful'], habitat: 'Woodland areas', favoriteFood: 'Insects and berries' },
  { id: '7', name: 'Maru', image: maruImg, category: 'forest', description: 'Monkey', animalType: 'Monkey', book: 'Playful Monkeys', fact: 'Maru is a mischievous monkey who loves to swing from branch to branch.', skills: ['Climbing', 'Agility', 'Intelligence', 'Playfulness'], personality: ['Playful', 'Curious', 'Energetic', 'Social'], habitat: 'Tropical forests', favoriteFood: 'Fruits and nuts' },
  { id: '8', name: 'Ellie', image: ellieImg, category: 'ocean', description: 'Elephant', animalType: 'Elephant', book: 'Forest Friends', fact: 'Ellie is a gentle elephant who enjoys swimming in the ocean.', skills: ['Strength', 'Memory', 'Empathy', 'Leadership'], personality: ['Gentle', 'Wise', 'Caring', 'Strong'], habitat: 'Savannas and forests', favoriteFood: 'Leaves and grass' },
  { id: '9', name: 'Orin', image: orinImg, category: 'forest', description: 'Owl', animalType: 'Owl', book: 'Forest Wisdom', fact: 'Orin is a wise owl who shares knowledge with forest creatures.', skills: ['Wisdom', 'Night Vision', 'Flying', 'Teaching'], personality: ['Wise', 'Patient', 'Observant', 'Mysterious'], habitat: 'Forest trees', favoriteFood: 'Small rodents' },
  { id: '10', name: 'Raine', image: raineImg, category: 'mountain', description: 'Snow Leopard', animalType: 'Snow Leopard', book: 'Snow Adventures', fact: 'Raine is a graceful snow leopard who roams the mountain peaks.', skills: ['Agility', 'Stealth', 'Climbing', 'Hunting'], personality: ['Graceful', 'Independent', 'Mysterious', 'Strong'], habitat: 'Mountain peaks', favoriteFood: 'Mountain goats' },
  { id: '11', name: 'Niko', image: nikoImg, category: 'forest', description: 'Fox', animalType: 'Fox', book: 'Forest Friends', fact: 'Niko is a cunning fox who is always up to something.', skills: ['Cunning', 'Speed', 'Adaptability', 'Intelligence'], personality: ['Clever', 'Playful', 'Curious', 'Independent'], habitat: 'Various habitats', favoriteFood: 'Small animals and berries' },
  { id: '12', name: 'Kaito', image: kaitoImg, category: 'ocean', description: 'Fish', animalType: 'Fish', book: 'Ocean Odyssey', fact: 'Kaito is a playful fish who loves to swim in the ocean.', skills: ['Swimming', 'Speed', 'Agility', 'Playfulness'], personality: ['Playful', 'Energetic', 'Friendly', 'Adventurous'], habitat: 'Ocean waters', favoriteFood: 'Plankton and algae' },
  { id: '13', name: 'Mizuto', image: mizutoImg, category: 'ocean', description: 'Fish', animalType: 'Fish', book: 'Ocean Odyssey', fact: 'Mizuto is a curious fish who explores the depths of the ocean.', skills: ['Swimming', 'Exploration', 'Curiosity', 'Bravery'], personality: ['Curious', 'Brave', 'Adventurous', 'Friendly'], habitat: 'Deep ocean', favoriteFood: 'Small sea creatures' },
  { id: '14', name: 'Lumi', image: lumiImg, category: 'ocean', description: 'Fish', animalType: 'Fish', book: 'Ocean Odyssey', fact: 'Lumi is a bright fish who lights up the ocean with its glow.', skills: ['Bioluminescence', 'Swimming', 'Illumination', 'Beauty'], personality: ['Bright', 'Cheerful', 'Helpful', 'Calm'], habitat: 'Ocean depths', favoriteFood: 'Small organisms' },
  { id: '15', name: 'Calyx', image: calyxImg, category: 'ocean', description: 'Fish', animalType: 'Fish', book: 'Ocean Odyssey', fact: 'Calyx is a delicate fish who swims gracefully in the ocean.', skills: ['Graceful swimming', 'Agility', 'Beauty', 'Elegance'], personality: ['Graceful', 'Gentle', 'Calm', 'Artistic'], habitat: 'Coral reefs', favoriteFood: 'Small plankton' },
  { id: '16', name: 'Sage', image: sageImg, category: 'ocean', description: 'Fish', animalType: 'Fish', book: 'Ocean Odyssey', fact: 'Sage is a wise fish who shares its knowledge with other ocean creatures.', skills: ['Wisdom', 'Teaching', 'Swimming', 'Guidance'], personality: ['Wise', 'Patient', 'Helpful', 'Knowledgeable'], habitat: 'Ocean waters', favoriteFood: 'Algae and small fish' },
  { id: '17', name: 'Kai', image: kaiImg, category: 'ocean', description: 'Fish', animalType: 'Fish', book: 'Ocean Odyssey', fact: 'Kai is a friendly fish who loves to play with other ocean creatures.', skills: ['Swimming', 'Friendship', 'Playfulness', 'Social'], personality: ['Friendly', 'Social', 'Playful', 'Kind'], habitat: 'Shallow waters', favoriteFood: 'Small crustaceans' },
  { id: '18', name: 'Willow', image: willowImg, category: 'ocean', description: 'Fish', animalType: 'Fish', book: 'Ocean Odyssey', fact: 'Willow is a graceful fish who swims elegantly in the ocean.', skills: ['Graceful swimming', 'Agility', 'Elegance', 'Beauty'], personality: ['Graceful', 'Elegant', 'Calm', 'Peaceful'], habitat: 'Ocean currents', favoriteFood: 'Plankton' },
  { id: '19', name: 'Nami', image: namiImg, category: 'ocean', description: 'Seal', animalType: 'Seal', book: 'Ocean Tales', fact: 'Nami is a cheerful seal who loves to play and splash in the waves.', skills: ['Swimming', 'Diving', 'Playfulness', 'Social'], personality: ['Cheerful', 'Playful', 'Friendly', 'Energetic'], habitat: 'Coastal waters', favoriteFood: 'Fish and squid' },
  { id: '20', name: 'Aoi', image: aoiImg, category: 'forest', description: 'Heron', animalType: 'Heron', book: 'Forest Friends', fact: 'Aoi is a graceful heron who wades through streams in the forest.', skills: ['Fishing', 'Flying', 'Patience', 'Grace'], personality: ['Graceful', 'Patient', 'Calm', 'Observant'], habitat: 'Wetlands and streams', favoriteFood: 'Fish and frogs' },
  { id: '21', name: 'Basilisk', image: basiliskImg, category: 'forest', description: 'Snake', animalType: 'Snake', book: 'Forest Adventures', fact: 'Basilisk is a clever snake who slithers silently through the forest floor.', skills: ['Stealth', 'Speed', 'Hunting', 'Camouflage'], personality: ['Clever', 'Stealthy', 'Independent', 'Mysterious'], habitat: 'Forest floor', favoriteFood: 'Small rodents' },
  { id: '22', name: 'Blaze', image: blazeImg, category: 'desert', description: 'Lion Cub', animalType: 'Lion', book: 'Safari Stories', fact: 'Blaze is an energetic lion cub who loves to roar and play in the sun.', skills: ['Roaring', 'Playfulness', 'Courage', 'Energy'], personality: ['Energetic', 'Brave', 'Playful', 'Confident'], habitat: 'Savanna', favoriteFood: 'Meat' },
  { id: '23', name: 'Amaruq', image: amaruqImg, category: 'mountain', description: 'Wolf', animalType: 'Wolf', book: 'Mountain Pack', fact: 'Amaruq is a brave wolf who leads his pack through the mountain wilderness.', skills: ['Leadership', 'Hunting', 'Howling', 'Teamwork'], personality: ['Brave', 'Loyal', 'Strong', 'Leader'], habitat: 'Mountain forests', favoriteFood: 'Large game' },
  { id: '24', name: 'Rajin', image: rajinImg, category: 'desert', description: 'Lion Cub', animalType: 'Lion', book: 'Safari Stories', fact: 'Rajin is a playful lion cub who enjoys exploring the desert plains.', skills: ['Playfulness', 'Exploration', 'Courage', 'Social'], personality: ['Playful', 'Curious', 'Friendly', 'Brave'], habitat: 'Desert plains', favoriteFood: 'Meat' },
  { id: '25', name: 'Isen', image: isenImg, category: 'mountain', description: 'Polar Bear', animalType: 'Polar Bear', book: 'Arctic Adventures', fact: 'Isen is a strong polar bear who thrives in the icy mountain peaks.', skills: ['Strength', 'Swimming', 'Hunting', 'Endurance'], personality: ['Strong', 'Independent', 'Patient', 'Brave'], habitat: 'Arctic regions', favoriteFood: 'Seals' },
  { id: '26', name: 'Kazan', image: kazanImg, category: 'mountain', description: 'Koala', animalType: 'Koala', book: 'Mountain Friends', fact: 'Kazan is a peaceful koala who lives high in the mountain eucalyptus trees.', skills: ['Climbing', 'Relaxation', 'Patience', 'Calm'], personality: ['Peaceful', 'Calm', 'Wise', 'Gentle'], habitat: 'Mountain forests', favoriteFood: 'Eucalyptus leaves' },
  { id: '27', name: 'Nyra', image: nyraImg, category: 'mountain', description: 'Snow Leopard Cub', animalType: 'Snow Leopard', book: 'Mountain Tales', fact: 'Nyra is a curious snow leopard cub who loves playing in the sparkling snow.', skills: ['Climbing', 'Playfulness', 'Agility', 'Curiosity'], personality: ['Curious', 'Playful', 'Energetic', 'Brave'], habitat: 'Snowy mountains', favoriteFood: 'Small animals' },
  { id: '28', name: 'Strix', image: strixImg, category: 'forest', description: 'Snowy Owl', animalType: 'Owl', book: 'Forest Wisdom', fact: 'Strix is a wise snowy owl who watches over the forest at night.', skills: ['Night Vision', 'Flying', 'Wisdom', 'Hunting'], personality: ['Wise', 'Observant', 'Mysterious', 'Patient'], habitat: 'Snowy forests', favoriteFood: 'Small rodents' },
  { id: '29', name: 'Snowflake', image: snowflakeImg, category: 'forest', description: 'Mouse', animalType: 'Mouse', book: 'Forest Friends', fact: 'Snowflake is a tiny mouse who loves to gather seeds and explore.', skills: ['Foraging', 'Speed', 'Agility', 'Resourcefulness'], personality: ['Timid', 'Curious', 'Resourceful', 'Friendly'], habitat: 'Forest floor', favoriteFood: 'Seeds and grains' },
  { id: '30', name: 'Tatsu', image: tatsuImg, category: 'mountain', description: 'Chubby Bird', animalType: 'Bird', book: 'Mountain Friends', fact: 'Tatsu is a round little bird who chirps happily in the mountain meadows.', skills: ['Flying', 'Singing', 'Cheerfulness', 'Social'], personality: ['Cheerful', 'Friendly', 'Energetic', 'Happy'], habitat: 'Mountain meadows', favoriteFood: 'Seeds and insects' },
  { id: '31', name: 'Frost', image: frostImg, category: 'mountain', description: 'White Rabbit', animalType: 'Rabbit', book: 'Arctic Adventures', fact: 'Frost is a fluffy white rabbit who hops through snowy mountain trails.', skills: ['Hopping', 'Speed', 'Camouflage', 'Agility'], personality: ['Quick', 'Timid', 'Gentle', 'Alert'], habitat: 'Snowy areas', favoriteFood: 'Grass and vegetables' },
  { id: '32', name: 'Arctic', image: arcticImg, category: 'mountain', description: 'White Kitten', animalType: 'Cat', book: 'Mountain Friends', fact: 'Arctic is a playful white kitten who loves the cold mountain air.', skills: ['Playfulness', 'Climbing', 'Agility', 'Hunting'], personality: ['Playful', 'Curious', 'Energetic', 'Independent'], habitat: 'Cold regions', favoriteFood: 'Fish' },
  { id: '33', name: 'Calico', image: calicoImg, category: 'forest', description: 'Orange Kitten', animalType: 'Cat', book: 'Forest Friends', fact: 'Calico is a friendly orange kitten who purrs and plays in the forest.', skills: ['Playfulness', 'Climbing', 'Hunting', 'Social'], personality: ['Friendly', 'Playful', 'Affectionate', 'Curious'], habitat: 'Forest areas', favoriteFood: 'Fish and mice' },
  { id: '34', name: 'Thorne', image: thorneImg, category: 'forest', description: 'Terrier Puppy', animalType: 'Dog', book: 'Forest Adventures', fact: 'Thorne is an adventurous terrier puppy who explores every corner of the forest.', skills: ['Exploring', 'Loyalty', 'Energy', 'Bravery'], personality: ['Adventurous', 'Loyal', 'Energetic', 'Brave'], habitat: 'Various habitats', favoriteFood: 'Meat and bones' }
];

// Fallback local book data
const FALLBACK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Adventures of Rusty the Red Panda',
    author: 'Rooted Tales',
    category: 'Forest Adventures',
    description: 'Join Rusty on an exciting journey through the mystical forest as he discovers friendship and courage.',
    coverColor: 'from-red-400 to-orange-500',
    readingTime: '15 min',
    pages: 28,
    price: '$8.99',
    characters: ['1'] // Akai
  },
  {
    id: '2',
    title: 'The Adventures of Akai the Red Panda: A Heart-warming Panda Reunion',
    author: 'Rooted Tales',
    category: 'Forest Adventures',
    description: 'A heartwarming tale of family reunion and the bonds that connect us all.',
    coverColor: 'from-pink-400 to-red-500',
    readingTime: '35 min',
    pages: 76,
    price: '$16.99',
    characters: ['1', '2'] // Akai, Daichi
  },
  {
    id: '3',
    title: 'Akai and Kaito in the Great Ocean Odyssey',
    author: 'Rooted Tales',
    category: 'Water Adventures',
    description: 'Join Akai and Kaito on a heartwarming ocean adventure filled with friendship, courage, and magical discoveries.',
    coverColor: 'from-blue-400 to-cyan-500',
    readingTime: '30 min',
    pages: 64,
    price: '$14.99',
    characters: ['1', '12'] // Akai, Kaito
  },
  {
    id: '4',
    title: 'Akai the Red Panda and The Curious Raccoons',
    author: 'Rooted Tales',
    category: 'Forest Adventures',
    description: 'Akai meets clever raccoons and learns about problem-solving and ingenuity.',
    coverColor: 'from-amber-400 to-orange-500',
    readingTime: '25 min',
    pages: 52,
    price: '$12.99',
    characters: ['1', '3'] // Akai, Raiku
  },
  {
    id: '5',
    title: 'Akai the Red Panda and The Quokka Quest',
    author: 'Rooted Tales',
    category: 'Forest Adventures',
    description: 'An uplifting story about finding joy and happiness with the happiest animal on Earth.',
    coverColor: 'from-yellow-400 to-orange-400',
    readingTime: '20 min',
    pages: 48,
    price: '$11.99',
    characters: ['1', '4'] // Akai, Quinn
  },
  {
    id: '6',
    title: 'Akai and the Tale of The Sea Otter',
    author: 'Rooted Tales',
    category: 'Water Adventures',
    description: 'Dive into ocean adventures with playful sea otters.',
    coverColor: 'from-blue-300 to-teal-400',
    readingTime: '22 min',
    pages: 50,
    price: '$12.99',
    characters: ['1'] // Akai
  },
  {
    id: '7',
    title: 'Akai Remarkable Adventure with The Cozy Koala',
    author: 'Rooted Tales',
    category: 'Forest Adventures',
    description: 'Learn about rest and relaxation with Koa the Koala.',
    coverColor: 'from-green-300 to-emerald-400',
    readingTime: '18 min',
    pages: 44,
    price: '$10.99',
    characters: ['1', '5'] // Akai, Koa
  },
  {
    id: '8',
    title: 'Akai and Hedge: The Treasure of Friendship',
    author: 'Rooted Tales',
    category: 'Forest Adventures',
    description: 'Discover the true treasure of friendship with Hedge the Hedgehog.',
    coverColor: 'from-purple-400 to-pink-400',
    readingTime: '24 min',
    pages: 54,
    price: '$13.99',
    characters: ['1', '6'] // Akai, Hedge
  },
  {
    id: '9',
    title: 'Akai with The Playful Monkeys',
    author: 'Rooted Tales',
    category: 'Forest Adventures',
    description: 'Swing into action with mischievous monkeys in the treetops.',
    coverColor: 'from-orange-400 to-red-400',
    readingTime: '21 min',
    pages: 46,
    price: '$11.99',
    characters: ['1', '7'] // Akai, Maru
  },
  {
    id: '10',
    title: 'Akai and The Joyful Elephant',
    author: 'Rooted Tales',
    category: 'Forest Adventures',
    description: 'A gentle giant teaches about kindness and empathy.',
    coverColor: 'from-gray-400 to-blue-400',
    readingTime: '26 min',
    pages: 56,
    price: '$13.99',
    characters: ['1', '8'] // Akai, Ellie
  },
  {
    id: '11',
    title: "Akai's lessons with The Wise Owls",
    author: 'Rooted Tales',
    category: 'Forest Adventures',
    description: 'Gain wisdom and knowledge from the wisest creatures of the forest.',
    coverColor: 'from-indigo-400 to-purple-500',
    readingTime: '23 min',
    pages: 50,
    price: '$12.99',
    characters: ['1', '9'] // Akai, Orin
  },
  {
    id: '12',
    title: 'Akai and The Lost Reindeer',
    author: 'Rooted Tales',
    category: 'Mountain Adventures',
    description: 'Help find a lost reindeer in the snowy mountains.',
    coverColor: 'from-blue-300 to-white',
    readingTime: '27 min',
    pages: 58,
    price: '$14.99',
    characters: ['1', '10'] // Akai, Raine
  }
];

// Cache for fetched data
let charactersCache: Character[] | null = null;
let booksCache: Book[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let hasAttemptedSeed = false; // Track if we've already tried seeding
let backendAvailable: boolean | null = null; // Track if backend is available

/**
 * Check if the backend server is available
 */
async function checkBackendHealth(): Promise<boolean> {
  // Return cached result if we've already checked
  if (backendAvailable !== null) {
    return backendAvailable;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/health`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        signal: controller.signal,
      }
    );
    
    clearTimeout(timeoutId);
    backendAvailable = response.ok;
    
    if (backendAvailable) {
      console.log('✅ Backend server is available');
    } else {
      console.log('⚠️ Backend server responded with error, using local data');
    }
    
    return backendAvailable;
  } catch (error) {
    backendAvailable = false;
    console.log('ℹ️ Backend not deployed yet - using local fallback data');
    return false;
  }
}

/**
 * Attempt to seed the database with initial data
 * Only runs once per session
 */
async function seedDatabaseIfEmpty(): Promise<boolean> {
  if (hasAttemptedSeed) return false;
  hasAttemptedSeed = true;

  try {
    console.log('🌱 Attempting to seed database with initial data...');
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/seed-data`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Database seeding result:', result.message);
      return true;
    } else {
      console.warn('⚠️ Could not seed database:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return false;
  }
}

/**
 * Fetch all characters from Supabase backend
 * Falls back to local data if backend is unavailable
 */
export async function fetchCharacters(): Promise<Character[]> {
  // Return cached data if available and fresh
  if (charactersCache && Date.now() - lastFetchTime < CACHE_DURATION) {
    return charactersCache;
  }

  // Check if backend is available first
  const isBackendUp = await checkBackendHealth();
  if (!isBackendUp) {
    // Backend is not available, use fallback immediately
    charactersCache = FALLBACK_CHARACTERS;
    return FALLBACK_CHARACTERS;
  }

  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/characters`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // If backend returns empty array, try seeding once
    if (!data.characters || data.characters.length === 0) {
      console.log('📭 Backend database is empty, attempting to seed...');
      const seeded = await seedDatabaseIfEmpty();
      
      if (seeded) {
        // Retry fetch after seeding
        const retryResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/characters`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          if (retryData.characters && retryData.characters.length > 0) {
            charactersCache = retryData.characters.map((char: any) => ({
              id: char.id,
              name: char.name,
              image: char.image_url || FALLBACK_CHARACTERS.find(c => c.id === char.id)?.image,
              category: char.habitat || 'forest',
              description: char.species || char.description,
              animalType: char.species,
              book: char.book || 'Rooted Tales',
              fact: char.fun_facts?.[0] || char.description,
              skills: char.skills || char.personality_traits,
              personality: char.personality_traits,
              habitat: char.habitat,
              favoriteFood: char.favorite_food,
              likes: char.likes,
              dislikes: char.dislikes,
              trivia: char.trivia,
              funFact: char.fun_facts?.[0]
            }));
            lastFetchTime = Date.now();
            console.log('✅ Successfully loaded characters from backend after seeding');
            return charactersCache;
          }
        }
      }
      
      // If seeding failed, use fallback
      charactersCache = FALLBACK_CHARACTERS;
      return FALLBACK_CHARACTERS;
    }
    
    // Transform backend data to match our Character interface
    charactersCache = data.characters.map((char: any) => ({
      id: char.id,
      name: char.name,
      image: char.image_url || FALLBACK_CHARACTERS.find(c => c.id === char.id)?.image,
      category: char.habitat || 'forest',
      description: char.species || char.description,
      animalType: char.species,
      book: char.book || 'Rooted Tales',
      fact: char.fun_facts?.[0] || char.description,
      skills: char.skills || char.personality_traits,
      personality: char.personality_traits,
      habitat: char.habitat,
      favoriteFood: char.favorite_food,
      likes: char.likes,
      dislikes: char.dislikes,
      trivia: char.trivia,
      funFact: char.fun_facts?.[0]
    }));
    
    lastFetchTime = Date.now();
    console.log('✅ Successfully loaded characters from backend');
    return charactersCache;
  } catch (error) {
    // Silently fall back to local data
    charactersCache = FALLBACK_CHARACTERS;
    return FALLBACK_CHARACTERS;
  }
}

/**
 * Fetch all books from Supabase backend
 * Falls back to local data if backend is unavailable
 */
export async function fetchBooks(): Promise<Book[]> {
  // Return cached data if available and fresh
  if (booksCache && Date.now() - lastFetchTime < CACHE_DURATION) {
    return booksCache;
  }

  // Check if backend is available first (reuse cached result from characters check)
  const isBackendUp = await checkBackendHealth();
  if (!isBackendUp) {
    // Backend is not available, use fallback immediately
    booksCache = FALLBACK_BOOKS;
    return FALLBACK_BOOKS;
  }

  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/books`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // If backend returns empty array, try seeding once
    if (!data.books || data.books.length === 0) {
      console.log('📚 No books in backend, attempting to seed...');
      const seeded = await seedDatabaseIfEmpty();
      
      if (seeded) {
        // Retry fetch after seeding
        const retryResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-eda44699/books`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          if (retryData.books && retryData.books.length > 0) {
            booksCache = retryData.books.map((book: any) => ({
              id: book.id,
              title: book.title,
              author: book.author || 'Rooted Tales',
              category: book.category || 'Adventures',
              description: book.description,
              coverColor: book.cover_color,
              readingTime: book.reading_time,
              pages: book.pages,
              price: book.price,
              characters: book.character_ids || []
            }));
            lastFetchTime = Date.now();
            console.log('✅ Successfully loaded books from backend after seeding');
            return booksCache;
          }
        }
      }
      
      // If seeding failed, use fallback
      booksCache = FALLBACK_BOOKS;
      return FALLBACK_BOOKS;
    }
    
    // Transform backend data to match our Book interface
    booksCache = data.books.map((book: any) => ({
      id: book.id,
      title: book.title,
      author: book.author || 'Rooted Tales',
      category: book.category || 'Adventures',
      description: book.description,
      coverColor: book.cover_color,
      readingTime: book.reading_time,
      pages: book.pages,
      price: book.price,
      characters: book.character_ids || []
    }));
    
    lastFetchTime = Date.now();
    console.log('✅ Successfully loaded books from backend');
    return booksCache;
  } catch (error) {
    // Silently fall back to local data
    booksCache = FALLBACK_BOOKS;
    return FALLBACK_BOOKS;
  }
}

/**
 * Get a single character by ID
 */
export async function getCharacterById(id: string): Promise<Character | undefined> {
  const characters = await fetchCharacters();
  return characters.find(char => char.id === id);
}

/**
 * Get a single book by ID
 */
export async function getBookById(id: string): Promise<Book | undefined> {
  const books = await fetchBooks();
  return books.find(book => book.id === id);
}

/**
 * Get characters by category
 */
export async function getCharactersByCategory(category: string): Promise<Character[]> {
  const characters = await fetchCharacters();
  return characters.filter(char => char.category === category);
}

/**
 * Get books by category
 */
export async function getBooksByCategory(category: string): Promise<Book[]> {
  const books = await fetchBooks();
  return books.filter(book => book.category === category);
}

/**
 * Get characters featured in a specific book
 */
export async function getCharactersInBook(bookId: string): Promise<Character[]> {
  const book = await getBookById(bookId);
  if (!book || !book.characters) return [];
  
  const characters = await fetchCharacters();
  return characters.filter(char => book.characters?.includes(char.id));
}

/**
 * Get books that feature a specific character
 */
export async function getBooksWithCharacter(characterId: string): Promise<Book[]> {
  const books = await fetchBooks();
  return books.filter(book => book.characters?.includes(characterId));
}

/**
 * Clear the cache (useful for forcing a refresh)
 */
export function clearDataCache(): void {
  charactersCache = null;
  booksCache = null;
  lastFetchTime = 0;
}

/**
 * Prefetch data (useful for app initialization)
 */
export async function prefetchData(): Promise<void> {
  try {
    await Promise.all([
      fetchCharacters(),
      fetchBooks()
    ]);
    console.log('✅ Data prefetched successfully');
  } catch (error) {
    console.error('Error prefetching data:', error);
  }
}