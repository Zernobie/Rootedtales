import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BackButton } from './BackButton';
import { 
  Star, 
  Heart, 
  Zap, 
  Shield, 
  Sparkles,
  TreePine,
  Waves,
  Snowflake,
  Crown,
  Home,
  BookOpen,
  MapPin
} from 'lucide-react';
import akaiImage from 'figma:asset/a1577137ec1384a9dc5d1713160a3f2195d24e3f.png';
import daichiImage from 'figma:asset/a4a50dd6d697a37ea3f028ed0a15295e53f98c09.png';
import raikuImage from 'figma:asset/3c091d5ff3c499a45e86ad2987bda0c8371700f3.png';
import quinnImage from 'figma:asset/682dcdc03e662482b7d6702f4a367acf9bc969c1.png';
import koaImage from 'figma:asset/2db3569a2c818a5d6b5d33ac69d8cf23bd58601e.png';
import hedgeImage from 'figma:asset/4f3447e87ea5efc6399d3f918c8ac821d04469ee.png';
import maruImage from 'figma:asset/ddf5c2fe9865e875c3350ea6442b474e1d1cd62e.png';
import ellieImage from 'figma:asset/4a35340fa22fb25cc72642063e1cd4810e453de2.png';
import orinImage from 'figma:asset/3ecca6e32d9e515c91c0001461929dea539e6376.png';
import raineImage from 'figma:asset/97dd664bc1e7fab943695cde860425a3ace0c6bb.png';
import nikoImage from 'figma:asset/3b52f072886ed4447a06d4ba4fdb6cb7a5cc6e34.png';
import kaitoImage from 'figma:asset/4f3bab6996d6cae64f03a58c076a3fffac439a04.png';
import mizutoImage from 'figma:asset/c84bf5fc5a4e8260702488d2efdf82729f330cd2.png';
import lumiImage from 'figma:asset/a340d2c6e8dcbff93e53f0c53b9ffe6600247fb9.png';
import sageImage from 'figma:asset/02e2c936052f659e756874d9dedee0beb39259bb.png';
import kaiImage from 'figma:asset/a4186f827742dfa2e7435e7545bbe3df834de587.png';
import willowImage from 'figma:asset/f041a38911a46bb4aa48ca81de8fe5ffdc964240.png';
import namiImage from 'figma:asset/0b42428e94a09d1e4ef6954723c9e8d8ef37bef6.png';
import aoiImage from 'figma:asset/1d38a37c027b4a9ab938ce515379bfdb793ec84a.png';
import basiliskImage from 'figma:asset/24c390ac003a4b49ebd1fb6414176c47d1d78832.png';
import blazeImage from 'figma:asset/1308d994682acb288ada2794b0227489df115885.png';
import amaruqImage from 'figma:asset/4d2d6ea1fe7163fa54b6ab81402d54d7d450a53e.png';
import rajinImage from 'figma:asset/050c9c827aa7bb8774c992a31d56446a1d225272.png';
import isenImage from 'figma:asset/69a3ff801d5c28946ec33ced2fd03cf1afa34b1f.png';
import kazanImage from 'figma:asset/f86d3322537052377703145a650e89a5afbc9cbf.png';
import nyraImage from 'figma:asset/e8e075ba1660c3851a8eee030e2c11a9431041f1.png';
import strixImage from 'figma:asset/6de98a50bb13365d4e2199e707b4e96574d9aea9.png';
import snowflakeImage from 'figma:asset/5392c744a97288a10791d960fac3d5a20937c9e2.png';
import tatsuImage from 'figma:asset/5493881b67e34604555cda365be60a475b3a7491.png';
import frostImage from 'figma:asset/01af1c83b759ce25ceefb393d0206308e685875c.png';
import arcticImage from 'figma:asset/db50f6fd4711ea7eb7f741b3c26d60fffd6f7d54.png';
import thorneImage from 'figma:asset/ac973c4bc0ae1a02108cc9ce70148dc0d0e28111.png';
import calicoImage from 'figma:asset/5b4445c1c4abdcb5613b0a7fc064e6e1cb4c5a10.png';
import calyxImage from 'figma:asset/ffd345bec28c96127a802c1d7920b7d567dd27c8.png';

interface Character {
  id: string;
  name: string;
  series: 'forest' | 'water' | 'snow' | 'predators' | 'pets';
  part: number;
  animalType: string;
  description: string;
  skills: string[];
  trivia: string;
  personality: string[];
  favoriteFood?: string;
  habitat: string;
  color: string;
  icon: string;
  likes: string[];
  dislikes: string[];
  image?: string;
  generalDescription?: string;
  booksFeatures?: string[];
  locations?: string[];
  diet?: string[];
  names?: {
    adult: string;
    baby: string;
  };
  mythology?: string[];
  otherNames?: string[];
  funFact?: string;
  additionalFacts?: string[];
}

interface CharacterGalleryProps {
  user?: any;
  theme?: string;
}

export function CharacterGallery({ user, theme = 'forest' }: CharacterGalleryProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const characters: Character[] = [
    // Forest Adventures Series (Parts 1-11)
    {
      id: '1',
      name: 'Akai',
      series: 'forest',
      part: 1,
      animalType: 'Red Panda',
      description: 'The main character of our forest adventures. Akai is a brave and curious red panda who leads his friends on amazing journeys through the mystical forest.',
      generalDescription: 'Red pandas are small, arboreal mammals with reddish-brown fur, a long, bushy tail with rings, and a face that resembles that of a raccoon. They have a distinctive appearance with white markings on their face and a black underbelly and legs. They are known for their agility and spend much of their time in trees.',
      skills: ['Leadership', 'Problem Solving', 'Climbing', 'Friendship'],
      trivia: 'Akai can identify over 100 different types of berries and knows every secret path in the forest!',
      personality: ['Brave', 'Curious', 'Kind', 'Loyal'],
      favoriteFood: 'Bamboo shoots and berries',
      habitat: 'Temperate forests of the Himalayas',
      color: 'from-red-400 to-orange-500',
      icon: '🐾',
      image: akaiImage,
      likes: ['Adventures', 'Helping friends', 'Exploring', 'Bamboo'],
      dislikes: ['Bullies', 'Being alone', 'Thunder storms'],
      booksFeatures: [
        'The Adventures of Rusty the Red Panda',
        'The Adventures of Akai the Red Panda : A Heart-warming Panda Reunion',
        'Akai and Kaito in the Great Ocean Odyssey',
        'Akai the Red Panda and The Curious Raccoons',
        'Akai and The Red Panda and The Quokka Quest',
        'Akai and the Tale of The Sea Otter',
        'Akai Remarkable Adventure with The Cozy Koala',
        'Akai and Hedge : The Treasure of Friendship',
        'Akai with The Playful Monkeys',
        'Akai and The Joyful Elephant',
        "Akai's lessons with The Wise Owls",
        'Akai and The Lost Reindeer'
      ],
      locations: [
        'Nepal',
        'Bhutan', 
        'India',
        'Myanmar',
        'China (Sichuan and Yunnan provinces)'
      ],
      diet: [
        'Bamboo leaves and shoots',
        'Fruits',
        'Acorns',
        'Berries',
        'Insects',
        'Small mammals',
        'Bird eggs'
      ],
      names: {
        adult: 'Red Panda',
        baby: 'Cub'
      },
      mythology: [
        'Nepal: Known as "fire foxes" or "shining cats," symbol of Himalayas biodiversity',
        'China: Called "small pandas" or "lesser pandas," important for ecological balance',
        'Global Culture: Inspiration for Firefox logo, popular in worldwide media'
      ],
      otherNames: [
        'Ailurus fulgens (scientific name meaning "shining cat")',
        'Similar to raccoons in appearance but not closely related',
        'Different family from Giant Pandas despite name similarity',
        'Share similarities with weasel family (Mustelids) in behavior'
      ],
      funFact: 'Red pandas have a "false thumb" or extended wrist bone, much like the giant panda. This adaptation helps them grasp and handle bamboo, which is their primary food source.',
      additionalFacts: [
        'Nocturnal and Crepuscular: Most active at dawn, dusk, and night',
        'Solitary Animals: Generally alone except during mating or when mothers care for cubs',
        'Communication: Use vocalizations, body language, and scent markings',
        'Conservation Status: Classified as endangered due to habitat loss and poaching'
      ]
    },
    {
      id: '2',
      name: 'Daichi',
      series: 'forest',
      part: 2,
      animalType: 'Panda',
      description: 'A gentle giant panda who teaches everyone about patience and inner peace. Daichi is Akai\'s wise mentor and friend.',
      skills: ['Meditation', 'Wisdom', 'Strength', 'Teaching'],
      trivia: 'Daichi can meditate for hours without moving and can sense the emotions of other forest creatures!',
      personality: ['Wise', 'Patient', 'Gentle', 'Protective'],
      favoriteFood: 'Fresh bamboo',
      habitat: 'Giant pandas are native to south-central China, particularly in the mountainous regions of Sichuan, Shaanxi, and Gansu provinces. They inhabit temperate broadleaf and mixed forests, where bamboo is abundant.',
      color: 'from-black to-white',
      icon: '🐼',
      image: daichiImage,
      likes: ['Peaceful moments', 'Teaching', 'Bamboo', 'Meditation'],
      dislikes: ['Violence', 'Loud noises', 'Conflict'],
      generalDescription: 'Pandas, specifically the Giant Panda, are large, bear-like mammals known for their distinctive black and white coloring. They have round faces, large black patches around their eyes, ears, and limbs, and a relatively bulky body. Pandas are known for their gentle demeanor and unique diet primarily consisting of bamboo.',
      booksFeatures: [
        'The Adventures of Akai the Red Panda : A Heartwarming Panda Reunion'
      ],
      locations: [
        'Sichuan Province, China',
        'Shaanxi Province, China', 
        'Gansu Province, China'
      ],
      diet: [
        'Bamboo (99% of diet)',
        'Bamboo leaves',
        'Bamboo stems',
        'Bamboo shoots',
        'Other vegetation (occasionally)',
        'Fruits (occasionally)',
        'Small animals (rarely)'
      ],
      names: {
        adult: 'Panda or Giant Panda',
        baby: 'Cub'
      },
      mythology: [
        'Symbol of Peace: In ancient China, pandas were thought to have medicinal properties and symbolized peace and harmony',
        'Cultural Icon: The panda is an emblem of wildlife conservation and is the symbol of the World Wide Fund for Nature (WWF)',
        'National Treasure: In Chinese culture, pandas are considered national treasures and are associated with diplomacy'
      ],
      otherNames: [
        'Red Panda: Despite the name, the red panda is not closely related to the giant panda. Red pandas are smaller, have reddish-brown fur, and are more similar to raccoons in appearance',
        'Bears: Pandas are part of the bear family (Ursidae), which includes species like the American black bear, the brown bear, and the polar bear'
      ],
      funFact: 'Newborn panda cubs are incredibly small compared to their mothers, weighing only about 100 grams (3.5 ounces), which is about 1/900th the size of an adult panda. This is the smallest ratio of newborn to mother size among placental mammals.',
      additionalFacts: [
        'Bamboo Consumption: An adult panda can consume 12-38 kilograms (26-84 pounds) of bamboo per day to meet its nutritional needs',
        'Thumb: Pandas have a pseudo-thumb, which is an extended wrist bone that helps them grip bamboo stalks',
        'Solitary Nature: Pandas are generally solitary animals, with adults meeting only during the breeding season',
        'Conservation Status: Giant pandas are classified as vulnerable, with significant conservation efforts underway to protect their habitat and increase their population'
      ]
    },
    {
      id: '3',
      name: 'Raiku',
      series: 'forest',
      part: 3,
      animalType: 'Raccoon',
      description: 'A clever and curious raccoon with remarkable problem-solving abilities. Raiku uses intelligence and dexterity to help friends overcome challenges in their forest adventures.',
      generalDescription: 'The raccoon is a medium-sized mammal known for its distinctive black "mask" of fur around its eyes and its bushy, ringed tail. Raccoons have a grayish-brown coat and dexterous front paws, which they use to grasp and manipulate food. Adults typically weigh between 4 to 23 kg (9 to 50 lbs) and measure 40 to 70 cm (16 to 28 inches) in length, excluding the tail.',
      skills: ['Problem Solving', 'Dexterity', 'Intelligence', 'Curiosity'],
      trivia: 'Raiku can open complex puzzles and locks with incredible ease, and loves to explore every nook and cranny of the forest!',
      personality: ['Curious', 'Clever', 'Mischievous', 'Helpful'],
      favoriteFood: 'Fresh berries and fish',
      habitat: 'Raccoons are native to North America and are found across a wide range of habitats, including forests, urban areas, marshes, and prairies. They are highly adaptable and can thrive in both rural and urban environments. Their range extends from southern Canada to Panama.',
      color: 'from-gray-400 to-amber-600',
      icon: '🦝',
      image: raikuImage,
      likes: ['Solving puzzles', 'Washing food', 'Night adventures', 'Shiny objects'],
      dislikes: ['Being rushed', 'Loud sudden noises', 'Being underestimated'],
      booksFeatures: [
        'Akai the Red Panda and The Curious Raccoons'
      ],
      locations: [
        'North America (southern Canada to Panama)',
        'Forests',
        'Urban areas',
        'Marshes',
        'Prairies'
      ],
      diet: [
        'Fruits',
        'Nuts',
        'Berries',
        'Insects',
        'Frogs',
        'Fish',
        'Small mammals',
        'Birds',
        'Eggs',
        'Human food waste (scavenging)'
      ],
      names: {
        adult: 'Boar (male), Sow (female)',
        baby: 'Kit'
      },
      mythology: [
        'Native American folklore: Often depicted as tricksters and clever animals',
        'Featured in various tales and legends where they use intelligence and agility to outwit other animals or humans',
        'Modern culture: Popular in literature, films, and as mascots due to their distinctive appearance and curious nature'
      ],
      otherNames: [
        'Coati: A relative of the raccoon found in Central and South America, with a longer snout and different coloration',
        'Ringtail: Also known as the ring-tailed cat, this small carnivore is a relative of the raccoon found in arid regions of North America',
        'Kinkajou: Another relative, found in Central and South American rainforests, known for its prehensile tail and nocturnal habits'
      ],
      funFact: 'Raccoons have highly sensitive front paws with five fingers, which they use almost like hands. They can open jars, doors, and latches, showcasing their remarkable problem-solving abilities.',
      additionalFacts: [
        'Raccoons have excellent night vision and a keen sense of touch, which helps them forage in the dark',
        'They typically live in dens located in tree hollows, rock crevices, or abandoned buildings',
        'Raccoons communicate through a variety of vocalizations, including purrs, growls, hisses, and screams',
        'They are solitary animals but may share dens during the winter for warmth',
        'Raccoons are known to be curious and intelligent, often figuring out complex mechanisms to access food sources'
      ]
    },
    {
      id: '4',
      name: 'Quinn',
      series: 'forest',
      part: 4,
      animalType: 'Quokka',
      description: 'The happiest and most optimistic character in the forest! Quinn spreads joy and positivity wherever they go, teaching friends about resilience and finding happiness in every adventure.',
      generalDescription: 'The quokka is a small marsupial native to Australia, recognized for its round, compact body, short tail, and facial expression that often resembles a smile. Quokkas have a coarse brown-grey fur and a stocky build, with adults typically weighing between 2.5 to 5 kg (5.5 to 11 lbs) and measuring about 40 to 54 cm (16 to 21 inches) in length. They are primarily nocturnal animals, known for their friendly and curious nature.',
      skills: ['Optimism', 'Resilience', 'Climbing', 'Joy-spreading'],
      trivia: 'Quinn has an infectious smile that can cheer up even the grumpiest forest creatures, and always finds the bright side of any situation!',
      personality: ['Optimistic', 'Friendly', 'Curious', 'Resilient'],
      favoriteFood: 'Various leaves and grasses',
      habitat: 'Quokkas are found primarily on Rottnest Island and Bald Island off the coast of Western Australia. Smaller populations also exist in the mainland\'s southwestern region. They prefer habitats with dense vegetation such as shrublands and forests, where they can find shelter and food.',
      color: 'from-amber-300 to-orange-400',
      icon: '😊',
      image: quinnImage,
      likes: ['Making friends', 'Sunny days', 'Posing for photos', 'Exploring'],
      dislikes: ['Being alone', 'Predators', 'Harsh weather'],
      booksFeatures: [
        'Akai the Red Panda and the Quokka Quest'
      ],
      locations: [
        'Rottnest Island, Western Australia',
        'Bald Island, Western Australia',
        'Southwestern mainland Australia'
      ],
      diet: [
        'Various types of vegetation',
        'Grasses',
        'Leaves',
        'Stems',
        'Bark',
        'Guichenotia ledifolia',
        'Plants from Myrtaceae family'
      ],
      names: {
        adult: 'Buck (male), Doe (female)',
        baby: 'Joey'
      },
      mythology: [
        'Australian cultural icon: Known as "the world\'s happiest animal" due to their perceived smile and friendly disposition',
        'Modern culture: Popular subjects for selfies with tourists, leading to significant boost in ecotourism for their native habitats',
        'Symbol of joy: Represents optimism and happiness in contemporary wildlife imagery'
      ],
      otherNames: [
        'Wallaby: Another small to medium-sized macropod, similar in appearance but typically larger than quokkas',
        'Kangaroo: Larger relatives in the macropod family, known for their powerful hind legs and long tails',
        'Pademelon: Small forest-dwelling macropods similar to wallabies and quokkas, found in Australia and New Guinea'
      ],
      funFact: 'Quokkas have a unique reproductive strategy; if threatened by predators, they may sacrifice their joey by expelling it from the pouch. This action gives the mother a better chance to escape and survive, thereby ensuring she can reproduce again in the future.',
      additionalFacts: [
        'Quokkas are capable of climbing small trees and shrubs',
        'They typically give birth to one joey at a time, which stays in the mother\'s pouch for about six months before gradually becoming independent',
        'Quokkas have a gestation period of about a month and can reproduce twice a year under favorable conditions',
        'They do not have a fear of humans and have adapted well to human presence, particularly on Rottnest Island',
        'Quokkas are classified as vulnerable due to habitat loss and predation by introduced species such as foxes and cats. Conservation efforts are in place to protect their populations',
        'They have a unique ability to store fat in their tails, which helps them survive periods when food is scarce'
      ]
    },
    {
      id: '5',
      name: 'Koa',
      series: 'forest',
      part: 5,
      animalType: 'Koala',
      description: 'A sleepy and cozy koala who teaches friends about the importance of rest, relaxation, and taking time to enjoy the simple pleasures of life in the treetops.',
      generalDescription: 'Koalas are arboreal (tree-dwelling) marsupials native to Australia. They have stout, tailless bodies, large heads with round, fluffy ears, and spoon-shaped noses. Their fur is thick and typically grey with a lighter underside. Koalas are known for their distinctive slow movements and spending most of their time in eucalyptus trees.',
      skills: ['Tree Climbing', 'Relaxation', 'Patience', 'Herbalism'],
      trivia: 'Koa sleeps up to 20 hours a day and knows exactly which eucalyptus leaves are the most delicious and nutritious!',
      personality: ['Sleepy', 'Peaceful', 'Wise', 'Gentle'],
      favoriteFood: 'Fresh eucalyptus leaves',
      habitat: 'Koalas are found in the wild in the eucalyptus forests of eastern Australia, including Queensland, New South Wales, Victoria, and South Australia. They prefer habitats with plenty of eucalyptus trees, which provide both food and shelter.',
      color: 'from-gray-300 to-green-400',
      icon: '🐨',
      image: koaImage,
      likes: ['Napping', 'Eucalyptus leaves', 'Quiet time', 'Tree branches'],
      dislikes: ['Loud noises', 'Being rushed', 'Ground level', 'Rainy weather'],
      booksFeatures: [
        'Akai Remarkable Adventure with The Cozy Koala'
      ],
      locations: [
        'Queensland, Australia',
        'New South Wales, Australia',
        'Victoria, Australia',
        'South Australia'
      ],
      diet: [
        'Eucalyptus leaves (almost exclusively)',
        'Eucalyptus shoots',
        'Eucalyptus bark',
        'Leaves from a limited number of eucalyptus species'
      ],
      names: {
        adult: 'Koala',
        baby: 'Joey'
      },
      mythology: [
        'Australian cultural icon: Often seen as a symbol of Australia\'s unique wildlife',
        'Indigenous Australian stories: Appear in various Aboriginal art and stories',
        'European fascination: Beloved by settlers and have since become a national icon',
        'Modern symbol: Represents conservation efforts and Australian wildlife protection'
      ],
      otherNames: [
        'Koala bear: A misnomer, as they are not bears but marsupials',
        'Wombats: Close relatives with similar sturdy build',
        'Possums: Other marsupials found in Australian forests',
        'Kangaroos and wallabies: Fellow marsupials in the Australian ecosystem'
      ],
      funFact: 'Koalas have fingerprints that are remarkably similar to human fingerprints, making it difficult to distinguish between the two under a microscope.',
      additionalFacts: [
        'Koalas sleep up to 18-22 hours a day due to their low-energy diet and slow metabolic rate',
        'Despite their cute and cuddly appearance, koalas can be quite territorial and have a strong bite',
        'A newborn koala, or joey, is only about the size of a jellybean and is blind, hairless, and earless',
        'Koalas have a specialized digestive system that detoxifies the poisonous compounds in eucalyptus leaves',
        'They are very selective eaters, choosing leaves from only a limited number of eucalyptus species',
        'There is no specific name for a group of koalas as they are largely solitary animals'
      ]
    },
    {
      id: '6',
      name: 'Hedge',
      series: 'forest',
      part: 6,
      animalType: 'Hedgehog',
      description: 'A clever and defensive hedgehog who teaches friends about wisdom, protection, and the power of friendship. Hedge shows that sometimes the best treasures are the bonds we create with others.',
      generalDescription: 'Hedgehogs are small mammals known for their distinctive spiny coats, which are made up of modified hairs called quills. These quills are used for defense, and when threatened, hedgehogs can roll into a tight ball, with the quills sticking outwards to deter predators. Hedgehogs have a pointed snout, small eyes, and short legs.',
      skills: ['Defense', 'Wisdom', 'Problem Solving', 'Friendship'],
      trivia: 'Hedge has a unique self-anointing behavior where they spread frothy saliva over their quills, and knows exactly when to roll into a protective ball!',
      personality: ['Wise', 'Cunning', 'Protective', 'Loyal'],
      favoriteFood: 'Insects and worms',
      habitat: 'Hedgehogs are found in Europe, Asia, Africa, and New Zealand (introduced). In Europe, they are common in gardens, woodlands, and meadows. African species are often found in savannas and grasslands.',
      color: 'from-amber-600 to-brown-500',
      icon: '🦔',
      image: hedgeImage,
      likes: ['Nighttime foraging', 'Insects', 'Safe spaces', 'Friendship treasures'],
      dislikes: ['Loud predators', 'Being exposed', 'Daytime activity'],
      booksFeatures: [
        'Akai and Hedge : The Treasure of Friendship'
      ],
      locations: [
        'Europe (gardens, woodlands, meadows)',
        'Asia',
        'Africa (savannas and grasslands)',
        'New Zealand (introduced)'
      ],
      diet: [
        'Insects (primary food)',
        'Worms',
        'Snails',
        'Small invertebrates',
        'Fruits',
        'Vegetables',
        'Small vertebrates (occasionally)',
        'Eggs (occasionally)'
      ],
      names: {
        adult: 'Hedgehog',
        baby: 'Hoglet or Piglet'
      },
      mythology: [
        'Ancient Egypt: Associated with rebirth and good luck',
        'European folklore: Often seen as wise and cunning creatures',
        'Famous tales: Featured in "The Hedgehog and the Hare," where the hedgehog outsmarts the hare in a race',
        'Cultural symbol: Represents wisdom, protection, and cleverness in various stories and fables'
      ],
      otherNames: [
        'Urchin: Historical name for hedgehogs',
        'Hedgepig: Traditional colloquial name',
        'Tenrec: Similar spiny mammal found in Madagascar',
        'Echidna: Spiny egg-laying mammal found in Australia'
      ],
      funFact: 'Hedgehogs have a unique self-anointing behavior where they produce frothy saliva and spread it over their quills. The exact purpose of this behavior is unknown, but it is speculated to be a way to camouflage their scent or a response to new scents or tastes.',
      additionalFacts: [
        'Hedgehogs have around 5,000 to 7,000 quills on their backs',
        'They have poor eyesight but an excellent sense of smell and hearing',
        'Hedgehogs can travel up to 2 kilometers in a single night while foraging',
        'They are primarily nocturnal animals, most active during night hours',
        'When threatened, they roll into a tight defensive ball with quills pointing outward',
        'Their quills are modified hairs that serve as their primary defense mechanism'
      ]
    },
    {
      id: '7',
      name: 'Maru',
      series: 'forest',
      part: 7,
      animalType: 'Monkey',
      description: 'A playful and intelligent monkey who teaches friends about social bonds, problem-solving, and the joy of community. Maru shows that teamwork and friendship can overcome any challenge.',
      generalDescription: 'Monkeys are primates characterized by their agile bodies, dexterous hands and feet, and often prehensile tails. They vary greatly in size, appearance, and behaviour, but most are known for their intelligence, social structures, and ability to use tools.',
      skills: ['Problem Solving', 'Tool Use', 'Social Leadership', 'Agility'],
      trivia: 'Maru is an expert at using tools like rocks to crack open nuts and sticks to extract insects, showcasing incredible intelligence and adaptability!',
      personality: ['Playful', 'Intelligent', 'Social', 'Curious'],
      favoriteFood: 'Fruits and nuts',
      habitat: 'Monkeys are primarily found in tropical and subtropical regions. They inhabit a variety of environments, including rainforests, savannas, mountains, and even urban areas.',
      color: 'from-orange-400 to-amber-600',
      icon: '🐒',
      image: maruImage,
      likes: ['Playing with friends', 'Solving puzzles', 'Fruit treats', 'Tree swinging'],
      dislikes: ['Being alone', 'Loud predators', 'Cold weather', 'Confined spaces'],
      booksFeatures: [
        'The Adventures of Akai the Red Panda :A Heart-warming Panda Reunion',
        'Akai with The Playful Monkeys'
      ],
      locations: [
        'Central and South America: New World monkeys like capuchins, spider monkeys, and howler monkeys',
        'Africa and Asia: Old World monkeys like baboons, macaques, and colobus monkeys',
        'Tropical rainforests',
        'Savannas and grasslands',
        'Mountain regions',
        'Urban areas (some species)'
      ],
      diet: [
        'Fruits: A major part of the diet for many monkey species',
        'Leaves: Especially for folivorous species like colobus monkeys',
        'Insects: Supplement the diet during certain seasons',
        'Seeds and nuts',
        'Flowers',
        'Small animals and eggs: Some species like chimpanzees may hunt small animals or eat bird eggs'
      ],
      names: {
        adult: 'Monkey (no specific term differentiates male/female)',
        baby: 'Infant'
      },
      mythology: [
        'Hinduism: The monkey god Hanuman is a central figure, symbolizing strength, loyalty, and devotion',
        'Chinese Culture: The monkey is one of the twelve animals of the Chinese zodiac, associated with cleverness and curiosity',
        'African Folklore: Monkeys are often depicted as tricksters, using their wits to overcome challenges',
        'South American Myths: Some indigenous cultures see monkeys as mediators between the human world and the spirit world'
      ],
      otherNames: [
        'Ape: Larger primates without tails, such as gorillas, chimpanzees, and orangutans',
        'Lemur: Primates native to Madagascar, distinct from monkeys and apes',
        'Tarsier: Small primates from Southeast Asia, known for their large eyes and nocturnal habits',
        'Prosimian: A more primitive group of primates, including lemurs and lorises'
      ],
      funFact: 'Monkeys are known for their impressive problem-solving abilities and use of tools. For example, capuchin monkeys have been observed using rocks to crack open nuts, showcasing their intelligence and adaptability.',
      additionalFacts: [
        'Social Structure: Monkeys are highly social animals, often living in groups with complex hierarchies and social bonds',
        'Communication: They communicate through vocalizations, facial expressions, and body language',
        'Tool Use: Some species are adept at using tools, such as using sticks to extract insects from holes or leaves to soak up water',
        'Color Vision: Many monkeys have color vision similar to humans, which helps them find ripe fruits and young leaves',
        'Intelligence: Monkeys show remarkable problem-solving abilities and can learn complex behaviors',
        'Dexterous hands: Their hands and feet are incredibly agile, allowing them to manipulate objects with precision'
      ]
    },
    {
      id: '8',
      name: 'Ellie',
      series: 'forest',
      part: 8,
      animalType: 'Elephant',
      description: 'A wise and gentle giant elephant who teaches friends about family bonds, memory, and the strength that comes from community. Ellie shows that true power lies in kindness and protecting those we love.',
      generalDescription: 'Elephants are the largest land mammals, characterized by their long trunks, large ears, tusks, and massive bodies. They are known for their intelligence, complex social structures, and strong family bonds. Elephants have thick, wrinkled skin and sparse hair, and they are generally gray in color.',
      skills: ['Memory', 'Leadership', 'Communication', 'Family Protection'],
      trivia: 'Ellie has an extraordinary memory that helps her remember locations, individuals, and events for many years, making her the perfect guide for family migrations and adventures!',
      personality: ['Wise', 'Gentle', 'Protective', 'Nurturing'],
      favoriteFood: 'Fresh grasses and fruits',
      habitat: 'Elephants are found in various parts of Africa and Asia, inhabiting savannas, forests, grasslands, and even some desert regions.',
      color: 'from-gray-400 to-slate-600',
      icon: '🐘',
      image: ellieImage,
      likes: ['Family gatherings', 'Water holes', 'Teaching youngsters', 'Peaceful moments'],
      dislikes: ['Separation from family', 'Loud predators', 'Drought', 'Conflict'],
      booksFeatures: [
        'Akai and The Joyful Elephant'
      ],
      locations: [
        'African Elephants: Sub-Saharan Africa, savannas, forests, and deserts',
        'Asian Elephants: India, Sri Lanka, Thailand, Vietnam, and other parts of Southeast Asia',
        'Typically found in forests and grasslands',
        'Near water sources and migration routes'
      ],
      diet: [
        'Grasses: Primary food source',
        'Leaves: From various trees and shrubs',
        'Bark: Stripped from trees',
        'Fruits: When available seasonally',
        'Roots: Dug up during dry seasons',
        'Can consume up to 150 kg (330 lbs) of food daily'
      ],
      names: {
        adult: 'Elephant',
        baby: 'Calf'
      },
      mythology: [
        'India: Elephants are revered in Hinduism, with Lord Ganesha, the god of wisdom and remover of obstacles, depicted with an elephant head',
        'Africa: Elephants are symbols of strength, power, and wisdom. Many African cultures have folklore and stories that feature elephants prominently',
        'Asia: In Buddhism, elephants symbolize mental strength and enlightenment. White elephants are particularly sacred',
        'Royalty association: White elephants are associated with royalty and good fortune across Asian cultures'
      ],
      otherNames: [
        'Pachyderm: An old term also used for rhinos and hippos',
        'Woolly Mammoth: Extinct relative with thick fur adapted for cold climates',
        'Mastodon: Another extinct relative with different tooth structure',
        'Bush Elephant: African elephant subspecies living in savannas'
      ],
      funFact: 'Elephants have extraordinary memories and are known to remember locations, individuals, and events for many years. This memory helps them in migration and social interactions, making them excellent leaders of their herds.',
      additionalFacts: [
        'Tusks: Both male and female African elephants have tusks, while only some male Asian elephants do',
        'Communication: Elephants communicate using a range of sounds, including infrasound, which is below the range of human hearing and can travel long distances',
        'Social Structure: Elephants live in matriarchal societies, with groups led by the oldest female. Males typically leave the herd when they reach adolescence',
        'Intelligence: Elephants show self-awareness, empathy, and complex problem-solving abilities',
        'Trunk versatility: Their trunks contain over 40,000 muscles and can lift objects weighing up to 770 pounds',
        'Conservation: Elephants play a crucial role in their ecosystems as keystone species, creating paths and water holes used by other animals'
      ]
    },
    {
      id: '9',
      name: 'Orin',
      series: 'forest',
      part: 9,
      animalType: 'Owl',
      description: 'A wise and silent owl who teaches friends about knowledge, patience, and the power of observation. Orin shows that wisdom comes from watching, listening, and understanding the world around us.',
      generalDescription: 'Owls are birds of prey belonging to the order Strigiformes. They are characterized by their upright stance, large forward-facing eyes, sharp beak, and keen hearing. Owls are known for their silent flight and nocturnal hunting habits, making them efficient predators.',
      skills: ['Silent Flight', 'Keen Observation', 'Wisdom', 'Night Vision'],
      trivia: 'Orin has specialized feathers that enable completely silent flight, allowing him to ambush prey and move through the forest like a shadow!',
      personality: ['Wise', 'Observant', 'Patient', 'Mysterious'],
      favoriteFood: 'Mice and small mammals',
      habitat: 'Owls are found on every continent except Antarctica, inhabiting a wide range of habitats, including forests, grasslands, deserts, tundras, and urban areas. They are most abundant in diverse woodland environments.',
      color: 'from-amber-700 to-yellow-600',
      icon: '🦉',
      image: orinImage,
      likes: ['Nighttime wisdom', 'Silent observation', 'Teaching lessons', 'Moonlit forests'],
      dislikes: ['Loud disruptions', 'Bright daylight', 'Rushed decisions', 'Careless behavior'],
      booksFeatures: [
        'The Adventures of Akai the Red Panda :A Heartwarming Panda Reunion',
        'Akai\'s lessons with The Wise Owls'
      ],
      locations: [
        'Global distribution: Found on every continent except Antarctica',
        'Forests: Most abundant in diverse woodland environments',
        'Grasslands and savannas',
        'Desert regions',
        'Tundras and arctic areas',
        'Urban areas and city parks'
      ],
      diet: [
        'Small mammals: Mice, rats, voles (primary food)',
        'Birds: Various small bird species',
        'Insects: Beetles, moths, grasshoppers',
        'Fish: Some species hunt aquatic prey',
        'Reptiles: Lizards and small snakes',
        'Amphibians: Frogs and salamanders'
      ],
      names: {
        adult: 'Owl (no specific term differentiates male/female)',
        baby: 'Owlet'
      },
      mythology: [
        'Greek Mythology: Owls were associated with Athena, the goddess of wisdom. They symbolized knowledge, foresight, and protection',
        'Native American Cultures: Owls are often seen as symbols of wisdom, insight, and spiritual guidance. However, in some tribes, they are considered symbols of death or omens of ill fortune',
        'Japanese Folklore: Owls are believed to bring luck and protection from hardship. They are often depicted as guardians of the home',
        'European Folklore: Often associated with magic, mystery, and the supernatural realm'
      ],
      otherNames: [
        'Birds of Prey: Owls are part of a larger group of raptors, which includes eagles, hawks, falcons, and vultures',
        'Eagle Owl: One of the largest species of owls, known for its powerful build and formidable hunting abilities',
        'Barn Owl: A common species found worldwide, known for its heart-shaped facial disc and pale plumage',
        'Snowy Owl: Native to the Arctic regions, known for its striking white plumage and large, piercing yellow eyes'
      ],
      funFact: 'Owls have specialized feathers that enable silent flight. Their unique wing morphology and soft fringe on the leading edge of their flight feathers reduce turbulence, allowing them to fly silently and ambush prey effectively.',
      additionalFacts: [
        'Nocturnal Habits: Owls are primarily nocturnal, meaning they are most active at night. Their large eyes are adapted to low light conditions',
        'Exceptional Hearing: Owls have exceptionally keen hearing, with some species able to locate prey solely by sound. Their facial discs help funnel sound to their ears',
        'Nesting: Owls typically nest in tree cavities, abandoned nests, or even on the ground. They do not build their own nests but may line the nest site with feathers',
        'Regurgitation: Owls cannot digest fur, bones, and other indigestible parts of their prey, so they regurgitate these parts in the form of pellets',
        'Head Rotation: Owls can rotate their heads up to 270 degrees due to their flexible neck vertebrae',
        'Asymmetrical Ears: Many owl species have asymmetrically placed ears, which helps them pinpoint the exact location of sounds in three-dimensional space'
      ]
    },
    {
      id: '10',
      name: 'Raine',
      series: 'forest',
      part: 10,
      animalType: 'Reindeer',
      description: 'A gentle and graceful young reindeer who teaches friends about resilience, family bonds, and finding your way home. Raine shows that even when lost, love and determination can guide us back to where we belong.',
      generalDescription: 'A baby deer, known as a fawn, is typically characterized by its reddish-brown coat with white spots, which provides excellent camouflage in its woodland habitat. Fawns are born with their eyes open and can stand and walk within hours of birth.',
      skills: ['Swift Movement', 'Camouflage', 'Navigation', 'Family Bonding'],
      trivia: 'Raine was born with almost no scent, which helps protect from predators, and can run within just a few days of birth - a crucial adaptation for escaping danger!',
      personality: ['Gentle', 'Graceful', 'Swift', 'Resilient'],
      favoriteFood: 'Fresh grass and herbs',
      habitat: 'Deer are found on every continent except Antarctica and Australia. They inhabit a variety of ecosystems, including forests, grasslands, wetlands, and deserts.',
      color: 'from-amber-500 to-orange-400',
      icon: '🦌',
      image: raineImage,
      likes: ['Family gatherings', 'Forest meadows', 'Running free', 'Safe hiding spots'],
      dislikes: ['Being separated', 'Loud predators', 'Open exposed areas', 'Harsh weather'],
      booksFeatures: [
        'The Adventures of Rusty The Red Panda',
        'Akai and The Lost Reindeer'
      ],
      locations: [
        'North America: White-tailed deer',
        'Europe and Asia: Red deer',
        'Various regions: Fallow deer',
        'Global distribution: Forests, grasslands, wetlands, and deserts',
        'Arctic and Subarctic regions: Reindeer/Caribou',
        'Found on every continent except Antarctica and Australia'
      ],
      diet: [
        'Mother\'s milk: First few weeks of life (nursing)',
        'Leaves: From various trees and shrubs',
        'Grass: Primary vegetation food source',
        'Herbs: Wild forest herbs and plants',
        'Fruits: Seasonal berries and fruits',
        'Nuts: When available in autumn',
        'Adult deer: Primarily herbivorous grazing on vegetation'
      ],
      names: {
        adult: 'Stag (male) or Buck (male), Doe (female)',
        baby: 'Fawn'
      },
      mythology: [
        'Celtic mythology: Deer are associated with the supernatural and are considered messengers from the otherworld',
        'Native American folklore: Deer are often seen as symbols of fertility and renewal',
        'Hindu mythology: The deer is a significant figure linked to various deities',
        'Universal symbolism: In various cultures, deer represent gentleness, grace, and swiftness'
      ],
      otherNames: [
        'Elk/Wapiti: Larger relatives of deer found in North America and Eastern Asia',
        'Moose: The largest species of the deer family, found in North America, Europe, and Asia',
        'Reindeer/Caribou: Known for their migrations and domestication in some cultures, found in Arctic and Subarctic regions',
        'Roe Deer: A smaller species of deer found throughout Europe and Asia'
      ],
      funFact: 'Fawns are born with almost no scent, which helps protect them from predators. For the first few weeks of life, they remain hidden and very still while their mother forages, returning periodically to nurse.',
      additionalFacts: [
        'Fawns start to grow their adult coat and lose their spots after a few months',
        'They are capable of running within a few days of birth, a crucial adaptation for escaping predators',
        'Deer communicate through vocalizations, scent marking, and body language',
        'Baby deer have excellent camouflage with their spotted coats that blend into dappled forest light',
        'Fawns can stand and walk within hours of birth, showing remarkable early development',
        'Mother deer leave their fawns hidden while foraging, returning several times a day to nurse them'
      ]
    },
    {
      id: '11',
      name: 'Niko',
      series: 'forest',
      part: 11,
      animalType: 'Squirrel',
      description: 'A resourceful and industrious squirrel who teaches friends about preparation, memory, and the importance of hard work. Niko shows that planning ahead and being organized can help us overcome any challenge.',
      generalDescription: 'Squirrels are small to medium-sized rodents belonging to the family Sciuridae. They are known for their bushy tails, sharp claws for climbing, and often have a characteristic habit of storing food in caches for later use. Squirrels have a diverse range of species, each with its own unique adaptations and behaviours.',
      skills: ['Food Storage', 'Tree Climbing', 'Memory', 'Resourcefulness'],
      trivia: 'Niko has excellent spatial memory and can remember the locations of hundreds or even thousands of food caches, relying on this incredible memory to find hidden food during times of scarcity!',
      personality: ['Resourceful', 'Industrious', 'Organized', 'Energetic'],
      favoriteFood: 'Nuts and acorns',
      habitat: 'Squirrels are found worldwide, inhabiting various ecosystems such as forests, woodlands, urban parks, and suburban areas. They are most abundant in North and South America, Europe, and Asia.',
      color: 'from-orange-400 to-amber-500',
      icon: '🐿️',
      image: nikoImage,
      likes: ['Collecting nuts', 'Tree climbing', 'Organizing caches', 'Sunny days'],
      dislikes: ['Empty storage', 'Predators', 'Winter storms', 'Being unprepared'],
      booksFeatures: [
        'The Adventures of Akai the Red Panda :A Heart-warming Panda Reunion',
        'New Title still to be released'
      ],
      locations: [
        'Global distribution: Found worldwide in various ecosystems',
        'North and South America: Most abundant populations',
        'Europe: Common in forests and urban areas',
        'Asia: Diverse species across different regions',
        'Forests and woodlands: Primary natural habitat',
        'Urban parks and suburban areas: Adapted populations'
      ],
      diet: [
        'Nuts: Such as acorns, walnuts, and hazelnuts (primary food)',
        'Seeds: From pine cones, sunflowers, and other plants',
        'Fruits: Including berries, apples, and pears',
        'Vegetation: Leaves, buds, and flowers',
        'Insects: Some species supplement their diet with insects and small invertebrates'
      ],
      names: {
        adult: 'Squirrel (no specific term differentiates male/female)',
        baby: 'Kit or Pup'
      },
      mythology: [
        'Native American Mythology: Some tribes see squirrels as messengers or symbols of agility and resourcefulness',
        'European Folklore: Squirrels are often associated with industriousness and thriftiness, as seen in the tale of "The Ant and the Grasshopper"',
        'Hindu Mythology: The god Rama is sometimes depicted with a squirrel companion, highlighting its role in the epic Ramayana',
        'Cultural symbolism: Represents preparation, hard work, and the wisdom of saving for the future'
      ],
      otherNames: [
        'Chipmunk: A closely related species to squirrels, known for their stripes along the back',
        'Flying Squirrel: A type of squirrel with membranes between its legs that allow it to glide between trees',
        'Ground Squirrel: Squirrels that primarily live on the ground rather than in trees, such as prairie dogs and marmots',
        'Tree Squirrel: The common arboreal squirrels most people are familiar with'
      ],
      funFact: 'Squirrels have excellent spatial memory and can remember the locations of hundreds or even thousands of food caches. They rely on this memory to locate their hidden food during times of scarcity.',
      additionalFacts: [
        'Habitat: Squirrels are adaptable and can be found in a wide range of habitats, from dense forests to urban areas',
        'Communication: Squirrels use vocalizations, body language, and scent marking to communicate with each other',
        'Dental Anatomy: Squirrels have ever-growing incisors that continuously grow throughout their lives. They must gnaw on hard objects to keep them from overgrowing',
        'Reproduction: Squirrels typically breed twice a year, producing litters of 2-8 offspring. The young are born blind and hairless and are cared for by their mother',
        'Adaptability: Squirrels have successfully adapted to urban environments, showing remarkable problem-solving abilities',
        'Agility: Their sharp claws and bushy tails make them excellent climbers and help them maintain balance while navigating tree branches'
      ]
    },
    {
      id: '12',
      name: 'Kaito',
      series: 'water',
      part: 12,
      animalType: 'Sea Turtle',
      description: 'A wise and graceful sea turtle who teaches friends about navigation, longevity, and the importance of protecting our oceans. Kaito shows that with patience and wisdom, we can overcome any current and find our way home.',
      generalDescription: 'Sea turtles are marine reptiles known for their distinctive hard shells, flippers adapted for swimming, and long lifespans. They belong to the superfamily Chelonioidea and are characterized by their streamlined bodies, which allow them to glide gracefully through the water.',
      skills: ['Ocean Navigation', 'Deep Diving', 'Long-distance Migration', 'Magnetic Field Sensing'],
      trivia: 'Kaito has an extraordinary ability to navigate using the Earth\'s magnetic field, allowing migration of thousands of miles between feeding grounds and nesting sites - some species can travel up to 8,000 miles!',
      personality: ['Wise', 'Patient', 'Graceful', 'Protective'],
      favoriteFood: 'Seagrass and jellyfish',
      habitat: 'Sea turtles are found in oceans around the world, primarily in warm and temperate seas. Their habitats include tropical and subtropical oceans, coastal regions and estuaries, coral reefs, seagrass beds, and the open ocean.',
      color: 'from-teal-500 to-blue-400',
      icon: '🐢',
      image: kaitoImage,
      likes: ['Ocean currents', 'Coral reefs', 'Peaceful waters', 'Ancient migration routes'],
      dislikes: ['Ocean pollution', 'Plastic waste', 'Bright beach lights', 'Fishing nets'],
      booksFeatures: [
        'Akai and Kaito in the Great Ocean Odyssey',
        'Akai and the Tale of The Sea Otter'
      ],
      locations: [
        'Tropical and subtropical oceans: Primary habitat worldwide',
        'Coastal regions and estuaries: Feeding and resting areas',
        'Coral reefs: Rich feeding grounds with diverse marine life',
        'Seagrass beds: Important grazing areas especially for Green Sea Turtles',
        'Open ocean: Migration routes and deep water habitats',
        'Nesting beaches: Sandy shores for laying eggs (females only)'
      ],
      diet: [
        'Green Sea Turtle: Primarily herbivorous, feeding on seagrasses and algae',
        'Loggerhead Sea Turtle: Carnivorous, eating crustaceans, mollusks, and jellyfish',
        'Leatherback Sea Turtle: Mostly feed on jellyfish and other soft-bodied invertebrates',
        'Hawksbill Sea Turtle: Feeds mainly on sponges, anemones, and shrimp',
        'Olive Ridley and Kemp\'s Ridley Sea Turtles: Omnivorous, eating jellyfish, shrimp, crabs, and fish'
      ],
      names: {
        adult: 'Sea Turtle (no specific term differentiates male/female)',
        baby: 'Hatchling'
      },
      mythology: [
        'Hawaiian Culture: Sea turtles (known as "honu") are considered sacred and are symbols of longevity, peace, and wisdom',
        'Native American Mythology: Many tribes have stories of the "Great Turtle" that holds the world on its back',
        'Asian Mythology: In some Asian cultures, sea turtles are seen as symbols of good luck, endurance, and longevity',
        'Hindu Mythology: The god Vishnu is said to have taken the form of a turtle (Kurma) to support the mountain used to churn the ocean'
      ],
      otherNames: [
        'Terrapin: Refers to turtles that live in brackish or freshwater, particularly those in the family Emydidae',
        'Tortoise: Land-dwelling reptiles in the family Testudinidae, distinct from sea turtles due to their terrestrial habitat and dome-shaped shells',
        'Freshwater Turtle: Various species of turtles that inhabit freshwater environments like rivers, lakes, and ponds',
        'Marine Turtle: Alternative name for sea turtles emphasizing their ocean habitat'
      ],
      funFact: 'Sea turtles have an extraordinary ability to navigate. They use the Earth\'s magnetic field to migrate thousands of miles between feeding grounds and nesting sites. Some species, like the loggerhead turtle, can travel up to 8,000 miles during migration.',
      additionalFacts: [
        'Lifespan: Sea turtles can live for several decades, with some individuals reaching over 50 years old',
        'Reproduction: Female sea turtles return to the beaches where they were born (natal homing) to lay their eggs, often traveling long distances',
        'Conservation Status: Many sea turtle species are listed as endangered or vulnerable due to threats like habitat destruction, pollution, bycatch in fishing gear, and illegal poaching',
        'Adaptations: Sea turtles have adaptations like salt glands to excrete excess salt from their bodies and lungs that allow them to hold their breath for extended periods while diving',
        'Temperature-Dependent Sex Determination: The sex of sea turtle hatchlings is determined by the temperature of the sand where the eggs are incubated, with warmer temperatures generally producing more females',
        'Ancient mariners: Sea turtles have been navigating Earth\'s oceans for over 100 million years, surviving since the time of dinosaurs'
      ]
    },
    {
      id: '13',
      name: 'Mizuto',
      series: 'water',
      part: 13,
      animalType: 'Sea Otter',
      description: 'A playful and ingenious sea otter who teaches friends about using tools, staying warm, and the importance of family bonds. Mizuto shows that with cleverness and cooperation, we can solve any problem.',
      generalDescription: 'Sea otters are marine mammals belonging to the family Mustelidae. They have dense fur, which is the thickest of any animal, and this helps them stay warm in cold ocean waters. Sea otters have a streamlined body, webbed feet for swimming, and strong, dexterous paws used for handling prey and tools.',
      skills: ['Tool Use', 'Swimming', 'Floating', 'Shellfish Cracking'],
      trivia: 'Mizuto is known to hold hands while sleeping to avoid drifting apart in the water - this behavior, called "rafting," helps sea otters stay together and maintain social bonds!',
      personality: ['Playful', 'Ingenious', 'Social', 'Resourceful'],
      favoriteFood: 'Sea urchins and clams',
      habitat: 'Sea otters are found along the coasts of the northern and eastern North Pacific Ocean. Their primary habitats include California coast, Alaska, British Columbia, Russia\'s Kamchatka Peninsula, and Japan.',
      color: 'from-cyan-500 to-blue-600',
      icon: '🦦',
      image: mizutoImage,
      likes: ['Tool collecting', 'Floating with friends', 'Cracking shells', 'Kelp forests'],
      dislikes: ['Oil spills', 'Cold without fur', 'Being alone', 'Polluted water'],
      booksFeatures: [
        'Akai and the Tale of the Sea Otter'
      ],
      locations: [
        'California coast: Southern sea otter populations',
        'Alaska: Largest sea otter populations in North America',
        'British Columbia: Pacific Northwest coastal waters',
        'Russia\'s Kamchatka Peninsula: Northern Pacific populations',
        'Japan: Small populations in coastal areas',
        'Kelp forests and nearshore marine environments'
      ],
      diet: [
        'Sea urchins: Primary prey helping maintain kelp forest health',
        'Clams: Cracked open using rocks as tools',
        'Mussels: Harvested from rocky shorelines',
        'Crabs: Caught and eaten with dexterous paws',
        'Snails: Small marine gastropods',
        'Small fish: Occasional supplementary prey',
        'Marine invertebrates: Diverse diet of ocean creatures'
      ],
      names: {
        adult: 'Sea Otter (no specific term differentiates male/female)',
        baby: 'Pup'
      },
      mythology: [
        'Native American Tribes: In coastal tribes of North America, sea otters are revered and often symbolize loyalty, kindness, and resourcefulness',
        'Traditional significance: Their pelts were highly valued and traded among indigenous communities',
        'Aleutian and Alaskan Natives: Sea otters were historically hunted for their pelts, which were used in clothing and as a trade commodity',
        'Cultural symbolism: Represents adaptability, playfulness, and the wisdom of using tools to solve problems'
      ],
      otherNames: [
        'River Otter: A relative of the sea otter, river otters inhabit freshwater rivers and lakes. They are more streamlined and agile on land compared to sea otters',
        'European Otter: Found in Europe and parts of Asia, this otter is similar to river otters but adapted to both freshwater and coastal marine environments',
        'Giant Otter: Native to South America, these are much larger and more social than sea otters, often found in rivers and lakes',
        'Marine Otter: Smaller South American species that lives in coastal marine environments'
      ],
      funFact: 'Sea otters are known to hold hands while sleeping to avoid drifting apart in the water. This behavior, called "rafting," helps them stay together and maintain social bonds.',
      additionalFacts: [
        'Fur Density: Sea otters have around 600,000 to 1,000,000 hair follicles per square inch of skin. Their dense fur provides insulation as they lack the blubber layer that most marine mammals have',
        'Keystone Species: Sea otters play a crucial role in their ecosystem by controlling the population of sea urchins, which helps maintain healthy kelp forests',
        'High Metabolism: Sea otters have a very high metabolic rate to help them stay warm in cold water, and they need to eat about 25-30% of their body weight each day',
        'Tool Use: They are one of the few non-human animals known to use tools. They often use rocks to crack open shellfish and other hard-shelled prey',
        'Conservation Status: Sea otters were once hunted to near extinction for their fur. Conservation efforts have helped their populations recover in many areas, but they still face threats from oil spills, pollution, and habitat loss',
        'Social behavior: Sea otters often float together in groups called rafts, with mothers and pups staying close together for protection and warmth'
      ]
    },
    {
      id: '14',
      name: 'Lumi',
      series: 'water',
      part: 14,
      animalType: 'Jellyfish',
      description: 'A graceful and mysterious jellyfish who teaches friends about adaptability, fluidity, and the beauty of going with the flow. Lumi shows that being flexible and embracing change can lead to amazing discoveries.',
      generalDescription: 'Jellyfish are gelatinous marine creatures belonging to the phylum Cnidaria and class Scyphozoa. They come in various shapes and sizes, often with a bell-shaped body and trailing tentacles.',
      skills: ['Floating', 'Bioluminescence', 'Adaptability', 'Grace'],
      trivia: 'Lumi has existed for over 500 million years, making jellyfish one of the oldest known animal groups on Earth, and can produce beautiful light shows with natural bioluminescence!',
      personality: ['Graceful', 'Mysterious', 'Fluid', 'Ancient'],
      favoriteFood: 'Plankton and small fish',
      habitat: 'Jellyfish can be found in oceans worldwide, from coastal waters to the deep sea. They inhabit both warm and cold waters, and some species are found in freshwater environments as well.',
      color: 'from-purple-400 to-pink-500',
      icon: '🪼',
      image: lumiImage,
      likes: ['Ocean currents', 'Floating peacefully', 'Light displays', 'Deep waters'],
      dislikes: ['Rough waters', 'Being trapped', 'Pollution', 'Predators'],
      booksFeatures: [
        'Akai and Kaito in the Great Ocean Odyssey',
        'New Title still to be released'
      ],
      locations: [
        'Oceans worldwide: Global marine distribution',
        'Coastal waters: Shallow nearshore environments',
        'Deep sea: Abyssal and pelagic zones',
        'Warm waters: Tropical and temperate seas',
        'Cold waters: Arctic and Antarctic regions',
        'Freshwater environments: Some species in lakes and rivers'
      ],
      diet: [
        'Plankton: Primary food source for most species',
        'Fish eggs: Small reproductive cells from marine fish',
        'Small fish: Juvenile and small adult fish species',
        'Other small marine organisms: Various tiny sea creatures',
        'Captured using stinging tentacles: Prey immobilized by cnidocytes'
      ],
      names: {
        adult: 'Jellyfish (also known as sea jellies or jellies)',
        baby: 'Ephyra (juvenile stage) or Polyp (earlier stage)'
      },
      mythology: [
        'Mediterranean cultures: Jellyfish are known by various names across different cultures, such as "medusa" in some Mediterranean regions',
        'Tales of the sea: In mythology, jellyfish are often associated with tales of the sea and the mysterious depths',
        'Symbolism: They may symbolize fluidity, adaptability, and the ever-changing nature of life',
        'Ancient wisdom: Representing the ancient knowledge of the oceans and the flow of time'
      ],
      otherNames: [
        'Sea jellies: Alternative common name emphasizing their marine habitat',
        'Jellies: Shortened informal name',
        'Comb jellies (phylum Ctenophora): Often confused with true jellyfish but belong to a different group',
        'Medusae: Scientific term for the free-swimming adult stage of jellyfish'
      ],
      funFact: 'Jellyfish have existed for over 500 million years, making them one of the oldest known animal groups on Earth.',
      additionalFacts: [
        'Composition: Jellyfish are composed of more than 95% water',
        'Nervous system: They have a simple nervous system and lack a brain or central nervous system',
        'Bioluminescence: Some jellyfish species are bioluminescent, meaning they can produce light',
        'Reproduction: Most jellyfish have complex life cycles involving both sexual and asexual reproduction',
        'Survival: Their simple body structure has allowed them to survive mass extinction events throughout Earth\'s history',
        'Ecosystem role: They play important roles as both predators and prey in marine food webs'
      ]
    },
    {
      id: '15',
      name: 'Calyx',
      series: 'water',
      part: 15,
      animalType: 'Octopus',
      description: 'An intelligent and adaptable octopus who demonstrates problem-solving skills, creativity, and the power of thinking outside the box. Calyx teaches that intelligence comes in many forms and being different is a strength.',
      generalDescription: 'Octopuses are cephalopods with soft, bilaterally symmetrical bodies and eight arms. They are known for their intelligence, ability to camouflage, and unique locomotion. They have a bulbous head, large eyes, and no internal or external skeleton, allowing them to squeeze into small crevices.',
      skills: ['Problem-solving', 'Camouflage', 'Tool Use', 'Shape-shifting'],
      trivia: 'Calyx has three hearts! Two pump blood to the gills, while the third pumps it to the rest of the body. Their blood is blue due to a copper-based molecule called hemocyanin!',
      personality: ['Intelligent', 'Creative', 'Adaptable', 'Curious'],
      favoriteFood: 'Crabs and clams',
      habitat: 'Octopuses are found in oceans worldwide, from shallow coastal waters to deep ocean floors. They inhabit various marine environments, including coral reefs, pelagic waters, and the ocean floor.',
      color: 'from-purple-400 to-pink-500',
      icon: '🐙',
      image: calyxImage,
      likes: ['Solving puzzles', 'Hidden caves', 'Changing colors', 'Exploring crevices'],
      dislikes: ['Bright lights', 'Being predictable', 'Open spaces', 'Tight situations'],
      booksFeatures: [
        'Akai and Kaito in the Great Ocean Odyssey',
        'New Release coming'
      ],
      locations: [
        'Oceans worldwide: Found in all major ocean basins',
        'Shallow coastal waters: Tidal pools and nearshore habitats',
        'Coral reefs: Complex reef systems providing shelter',
        'Deep ocean floors: Abyssal and hadal zones',
        'Pelagic waters: Open ocean mid-water zones',
        'Notable species: Common Octopus (Octopus vulgaris), Giant Pacific Octopus (Enteroctopus dofleini), Blue-ringed Octopus (Hapalochlaena)'
      ],
      diet: [
        'Octopuses are carnivorous predators:',
        'Crustaceans: Crabs and shrimp (primary prey)',
        'Mollusks: Clams, snails, and even other octopuses',
        'Fish: Small fish caught with swift movements',
        'Worms: Polychaete worms as supplementary food',
        'Hunting method: Using intelligence and stealth to capture prey'
      ],
      names: {
        adult: 'Octopus',
        baby: 'Larva (also called paralarvae during early development stages)'
      },
      mythology: [
        'Japanese Folklore: Octopuses are featured in legends such as the Akkorokamui, a gigantic octopus-like monster. The creature is considered a yōkai (supernatural entity)',
        'Greek Mythology: The octopus-like creature called the Kraken is a legendary sea monster that is said to dwell off the coasts of Norway and Greenland',
        'Hawaiian Culture: The octopus, or heʻe, is believed to be the lone survivor of a previous world and holds a mystical significance'
      ],
      otherNames: [
        'Cephalopod: Class of marine mollusks including octopuses, squids, and cuttlefish',
        'Similar Species: Cuttlefish (related cephalopods with internal shell and color-changing ability)',
        'Similar Species: Squid (elongated bodies with eight arms plus two tentacles)',
        'Similar Species: Nautilus (unlike octopuses, have external shells and numerous tentacles without suckers)',
        'Scientific name: Order Octopoda'
      ],
      funFact: 'Octopuses have three hearts: two pump blood to the gills, while the third pumps it to the rest of the body. Their blood is blue due to a copper-based molecule called hemocyanin, which is more efficient at transporting oxygen in cold, low-oxygen environments.',
      additionalFacts: [
        'Intelligence: Octopuses are considered one of the most intelligent invertebrates, capable of problem-solving, using tools, and exhibiting complex behaviors',
        'Camouflage: They can change color and texture to blend in with their surroundings using specialized cells called chromatophores',
        'Regeneration: Octopuses can regenerate lost arms, making them effective survivors of predatory attacks',
        'Lifespan: Most octopuses have relatively short lifespans, ranging from six months to five years, depending on the species',
        'Escape artists: Their soft bodies and lack of skeleton allow them to squeeze through incredibly small openings'
      ]
    },
    {
      id: '16',
      name: 'Sage',
      series: 'water',
      part: 16,
      animalType: 'Seahorse',
      description: 'A wise and patient seahorse who teaches friends about the importance of taking time, being gentle, and the unique beauty of being different. Sage shows that strength comes in many forms and patience is a powerful virtue.',
      generalDescription: 'Seahorses are small marine fish belonging to the genus Hippocampus. They are known for their unique horse-like head, prehensile tail, and upright swimming posture. Their bodies are covered with bony plates instead of scales, and they have a long, tubular snout used for feeding.',
      skills: ['Patience', 'Camouflage', 'Precision', 'Nurturing'],
      trivia: 'Sage is extra special because male seahorses are the ones who become pregnant and give birth! They also have no teeth and must suck up their food through their long snouts like tiny vacuum cleaners.',
      personality: ['Patient', 'Wise', 'Gentle', 'Protective'],
      favoriteFood: 'Small shrimp and tiny crustaceans',
      habitat: 'Seahorses are found in shallow coastal waters, particularly in seagrass beds, coral reefs, and mangroves. They are distributed worldwide in both temperate and tropical regions.',
      color: 'from-cyan-400 to-emerald-500',
      icon: '🦄',
      image: sageImage,
      likes: ['Seagrass beds', 'Gentle currents', 'Coral gardens', 'Peaceful waters'],
      dislikes: ['Strong currents', 'Loud noises', 'Pollution', 'Rough handling'],
      booksFeatures: [
        'Akai and Kaito in the Great Ocean Odyssey',
        'New Title still to be released'
      ],
      locations: [
        'Atlantic Ocean: Temperate and tropical coastal regions',
        'Indian Ocean: Coral reefs and seagrass meadows',
        'Pacific Ocean: Shallow coastal waters and mangroves',
        'Seagrass beds: Primary habitat for protection and feeding',
        'Coral reefs: Complex reef systems with hiding places',
        'Mangroves: Coastal wetland areas with rich marine life'
      ],
      diet: [
        'Small shrimp: Primary food source captured with precision',
        'Mysis shrimp: Tiny crustaceans abundant in coastal waters',
        'Copepods: Microscopic zooplankton and small crustaceans',
        'Larval fish: Young fish in early development stages',
        'Small invertebrates: Various tiny marine creatures',
        'Feeding method: Use long snouts to suck in prey, swallowing them whole since they lack teeth'
      ],
      names: {
        adult: 'Seahorse (both male and female)',
        baby: 'Fry (juvenile seahorses after birth)'
      },
      mythology: [
        'Greek Mythology: Seahorses were believed to be the offspring of the sea god Poseidon\'s horses and were often depicted pulling his chariot across the ocean',
        'Chinese Culture: Seahorses are considered a symbol of good luck and were traditionally used in medicine for their supposed healing properties',
        'General Symbolism: Seahorses are often seen as symbols of patience, contentment, and protection',
        'Modern meaning: Represent uniqueness, gentleness, and the beauty of being different from others'
      ],
      otherNames: [
        'Pipefish: Closely related to seahorses, pipefish have elongated bodies and a similar feeding mechanism',
        'Leafy Sea Dragon: A related species with elaborate leaf-like appendages that provide camouflage among seaweed and kelp',
        'Weedy Sea Dragon: Another relative with less elaborate appendages than the leafy sea dragon, found in the waters of southern Australia',
        'Sea needles: Alternative name for pipefish, highlighting their elongated appearance'
      ],
      funFact: 'Male seahorses are unique among animals in that they are the ones who become pregnant and give birth. Female seahorses transfer their eggs to a special brood pouch on the male\'s abdomen, where he fertilizes and carries them until they hatch.',
      additionalFacts: [
        'Camouflage: Seahorses can change color to blend in with their surroundings, helping them avoid predators and ambush prey',
        'Monogamous Pairs: Many seahorse species form monogamous pair bonds, sometimes lasting for life. They perform daily courtship rituals to reinforce their bond',
        'Swimming: Seahorses are not strong swimmers and rely on their dorsal fin to propel themselves slowly through the water, while their pectoral fins help them steer',
        'Conservation Status: Many seahorse species are threatened by habitat destruction, pollution, and overfishing for traditional medicine and the aquarium trade. Conservation efforts are ongoing to protect their habitats and populations',
        'Unique anatomy: Their prehensile tail acts like a fifth limb, allowing them to anchor securely to coral and seagrass',
        'Eyes: Seahorses can move their eyes independently of each other, allowing them to watch for predators and prey simultaneously'
      ]
    },
    {
      id: '17',
      name: 'Kai',
      series: 'water',
      part: 17,
      animalType: 'Shark',
      description: 'A powerful and protective shark who teaches friends about strength, courage, and overcoming fears. Kai shows that being strong doesn\'t mean being scary, and that true courage comes from protecting others.',
      generalDescription: 'Sharks are a diverse group of cartilaginous fish characterized by their streamlined bodies, multiple rows of teeth, and sharp senses. They have skeletons made of cartilage rather than bone, and most species have powerful jaws that allow them to feed on a variety of prey.',
      skills: ['Swimming', 'Protection', 'Leadership', 'Electroreception'],
      trivia: 'Kai has amazing superpowers! Some shark species can detect electrical fields produced by other animals, which helps them locate prey and navigate their environment. This ability is called electroreception!',
      personality: ['Strong', 'Protective', 'Courageous', 'Loyal'],
      favoriteFood: 'Fish and marine mammals',
      habitat: 'Sharks are found in oceans all over the world, from shallow coastal waters to the deep sea. They inhabit a wide range of environments, including coral reefs, open ocean, and even freshwater rivers and lakes in some cases.',
      color: 'from-blue-600 to-gray-700',
      icon: '🦈',
      image: kaiImage,
      likes: ['Open ocean', 'Protecting friends', 'Swimming fast', 'Deep waters'],
      dislikes: ['Being misunderstood', 'Pollution', 'Being called scary', 'Overfishing'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Oceans worldwide: Global marine distribution from Arctic to Antarctic',
        'Shallow coastal waters: Nearshore reef and sandy environments',
        'Deep sea: Abyssal and bathypelagic zones',
        'Coral reefs: Complex reef ecosystems with abundant prey',
        'Open ocean: Pelagic environments for migratory species',
        'Freshwater environments: Some species in rivers and lakes'
      ],
      diet: [
        'Fish: Primary prey for most shark species',
        'Seals and marine mammals: Larger species prey on pinnipeds',
        'Squid: Important food source for many species',
        'Other sharks: Some species are cannibalistic',
        'Carrion and dead animals: Many species are opportunistic scavengers',
        'Plankton: Filter-feeding species like whale sharks consume microscopic organisms'
      ],
      names: {
        adult: 'Shark',
        baby: 'Pup (shark pups born live or hatched from eggs)'
      },
      mythology: [
        'Diverse cultural significance: In some cultures, sharks are revered as symbols of strength, power, and protection',
        'Feared predators: In other cultures, they are associated with danger and are featured in myths and legends about sea monsters',
        'Hawaiian culture: Sharks are considered \'aumākua (family guardians) and are deeply respected',
        'Modern perception: Often misunderstood due to media portrayals, but actually play crucial roles in ocean health'
      ],
      otherNames: [
        'Sea predators: Alternative name emphasizing their role as ocean hunters',
        'Elasmobranchs: Scientific classification that includes sharks, rays, and skates',
        'Rays and skates: Related species with flattened bodies adapted for life on the ocean floor',
        'Chimaeras: Related cartilaginous fish in the same class Chondrichthyes'
      ],
      funFact: 'Some shark species can detect electrical fields produced by other animals, which helps them locate prey and navigate their environment. This ability is known as electroreception.',
      additionalFacts: [
        'Unique immune system: Sharks have a remarkable immune system that allows them to resist diseases and heal wounds quickly',
        'Not all apex predators: Contrary to popular belief, not all sharks are apex predators. Some species, like the whale shark, are filter feeders that primarily consume plankton',
        'Ecosystem role: Sharks play a crucial role in maintaining the health of marine ecosystems by controlling populations of prey species and scavenging on dead animals',
        'Conservation status: Many shark species are threatened by overfishing, habitat destruction, and pollution. Conservation efforts are underway to protect these important marine animals',
        'Cartilaginous skeleton: Their skeletons are made of cartilage, which is lighter and more flexible than bone',
        'Tooth replacement: Sharks continuously replace their teeth throughout their lives, with some species losing thousands of teeth annually'
      ]
    },
    {
      id: '18',
      name: 'Willow',
      series: 'water',
      part: 18,
      animalType: 'Whale',
      description: 'A gentle giant whale who teaches friends about wisdom, compassion, and the importance of family bonds. Willow shows that true strength comes from kindness and that the biggest hearts make the greatest difference.',
      generalDescription: 'Whales are large marine mammals belonging to the order Cetacea. They are characterized by their streamlined bodies, paddle-shaped flippers, and blowholes for breathing. Whales are adapted to life in the ocean and have evolved a variety of specialized features, such as baleen plates for filter-feeding or teeth for hunting prey.',
      skills: ['Communication', 'Navigation', 'Wisdom', 'Family Leadership'],
      trivia: 'Willow belongs to the same family as the blue whale - the largest animal ever known to have existed on Earth! Despite their immense size, blue whales primarily feed on tiny organisms called krill.',
      personality: ['Wise', 'Gentle', 'Protective', 'Compassionate'],
      favoriteFood: 'Krill and small fish',
      habitat: 'Whales are found in oceans all over the world, from polar regions to tropical seas. They inhabit both coastal and offshore waters and undertake long migrations between feeding and breeding grounds.',
      color: 'from-blue-500 to-teal-600',
      icon: '🐋',
      image: willowImage,
      likes: ['Deep songs', 'Family gatherings', 'Ocean migrations', 'Teaching young'],
      dislikes: ['Loud ship noises', 'Pollution', 'Being separated from family', 'Shallow waters'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Oceans worldwide: Global distribution from polar to tropical regions',
        'Polar regions: Arctic and Antarctic feeding grounds',
        'Tropical seas: Warm water breeding areas',
        'Coastal waters: Nearshore environments for some species',
        'Offshore waters: Deep ocean pelagic zones',
        'Migration routes: Long-distance travel corridors between feeding and breeding areas'
      ],
      diet: [
        'Baleen whales: Plankton and small fish filtered through baleen plates',
        'Krill: Tiny planktonic organisms (primary food for many large whales)',
        'Small fish: Schooling fish species for filter-feeding whales',
        'Toothed whales: Fish, squid, and marine mammals',
        'Squid: Important prey for deep-diving toothed whale species',
        'Marine mammals: Seals and other cetaceans for some toothed whale species'
      ],
      names: {
        adult: 'Whale (bull for male, cow for female)',
        baby: 'Calf (whale calves born tail-first and nursed for extended periods)'
      },
      mythology: [
        'Indigenous cultures: Whales are revered as sacred beings and are believed to possess spiritual powers',
        'Folklore and mythology: Feature prominently in stories, often symbolizing wisdom, strength, and the mysteries of the sea',
        'Cultural art: Important subjects in traditional art and storytelling across maritime cultures',
        'Modern symbolism: Represent conservation, environmental protection, and the majesty of ocean life'
      ],
      otherNames: [
        'Sea giants: Alternative name emphasizing their massive size',
        'Marine mammals: Scientific classification highlighting their mammalian nature',
        'Baleen whales (Mysticeti): Including blue whale, humpback whale, and gray whale',
        'Toothed whales (Odontoceti): Including sperm whale, killer whale, and dolphins'
      ],
      funFact: 'The blue whale is the largest animal ever known to have existed on Earth, with adults reaching lengths of up to 100 feet (30 meters) and weights of over 200 tons. Despite their immense size, blue whales primarily feed on tiny planktonic organisms called krill.',
      additionalFacts: [
        'Social behavior: Whales are highly social animals and often travel in family groups or pods',
        'Complex vocalizations: Some whale species are known for their elaborate songs used for communication and navigation. The songs of humpback whales are among the most complex in the animal kingdom',
        'Ecosystem role: Whales play a crucial role in marine ecosystems by regulating prey populations and nutrient cycling',
        'Carbon sequestration: They contribute to carbon storage through the "whale pump," transporting nutrients from deep waters to the surface',
        'Intelligence: Many whale species demonstrate high intelligence, complex social behaviors, and cultural transmission of knowledge',
        'Conservation importance: Many whale species are threatened and serve as flagship species for ocean conservation efforts'
      ]
    },
    {
      id: '19',
      name: 'Nami',
      series: 'water',
      part: 19,
      animalType: 'Seal',
      description: 'A playful and resilient seal who teaches friends about adaptability, community, and the magic of transformation. Nami shows that being comfortable both in water and on land represents the beautiful balance of life.',
      generalDescription: 'Seals are marine mammals belonging to the order Pinnipedia, which includes three families: Phocidae (true seals), Otariidae (eared seals), and Odobenidae (walruses). Seals are characterized by their streamlined bodies, which are adapted for swimming in the water. Most species have thick fur and a layer of blubber beneath the skin, which provides insulation against cold temperatures.',
      skills: ['Swimming', 'Diving', 'Adaptation', 'Community Building'],
      trivia: 'Nami has the amazing ability to sleep underwater! Most species of seals can sleep while floating in the water, using unihemispheric slow-wave sleep where one half of their brain stays alert while the other half rests.',
      personality: ['Playful', 'Resilient', 'Social', 'Adaptable'],
      favoriteFood: 'Fish and squid',
      habitat: 'Seals are found in oceans around the world, inhabiting both the Arctic and Antarctic regions as well as temperate and tropical seas. They generally prefer coastal areas with access to ice floes, beaches for haul-out sites, and productive marine environments for feeding.',
      color: 'from-slate-400 to-blue-400',
      icon: '🦭',
      image: namiImage,
      likes: ['Playing in waves', 'Sunbathing on ice', 'Group gatherings', 'Deep diving'],
      dislikes: ['Pollution', 'Loud boats', 'Being separated from family', 'Overfishing'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Arctic regions: Including ice-covered waters and Arctic coastlines',
        'Antarctic regions: Southern Ocean and Antarctic ice floes',
        'Temperate seas: North America, Europe, and parts of Asia coastlines',
        'Tropical waters: Hawaiian Monk Seal in warmer regions',
        'Coastal areas: Beaches, rocky shores, and haul-out sites for resting',
        'Ice floes: Specialized habitats for ice-dependent species like Crabeater Seals'
      ],
      diet: [
        'Fish: Primary prey including small fish and schooling species',
        'Squid: Important food source for most seal species',
        'Krill: Especially for specialized feeders like Crabeater Seals',
        'Crustaceans: Various marine crustaceans and invertebrates',
        'Marine mammals: Larger prey for species like Leopard Seals',
        'Diving depths: Can dive up to 1,500 feet (450 meters) and hold breath for up to 30 minutes'
      ],
      names: {
        adult: 'Seal (Scientific examples: Phoca vitulina - Harbor Seal, Leptonychotes weddellii - Weddell Seal)',
        baby: 'Pup (seal pups born on land or ice and nursed by mothers)'
      },
      mythology: [
        'Norse mythology: The selkie is a shape-shifting seal, believed to be able to transform into a human when shedding its skin, representing themes of transformation and freedom',
        'Celtic traditions: Seals are associated with water spirits and represent healing, transformation, and renewal due to their dual life on land and water',
        'Indigenous Arctic cultures: The Ringed Seal is central to spiritual and ceremonial practices and serves as an important food source',
        'Symbol of fertility: Their ability to give birth on land and nurse their young symbolizes life\'s cyclical and nourishing qualities'
      ],
      otherNames: [
        'Common Seals: Alternative name for Harbor Seals in some regions',
        'Sea Lions (Zalophus californianus): Eared seals with external ear flaps and ability to walk on land using foreflippers',
        'Fur Seals (Arctocephalinae): Eared seals known for their dense, waterproof fur',
        'Walruses (Odobenus rosmarus): Larger pinniped relatives with long tusks, primarily found in Arctic regions'
      ],
      funFact: 'A fun fact about seals is their ability to sleep underwater. While they are usually seen resting on land, most species of seals are capable of sleeping while floating in the water, often drifting while keeping their heads above the surface. Seals engage in a type of unihemispheric slow-wave sleep, meaning that one half of their brain is active and alert while the other half rests.',
      additionalFacts: [
        'Blubber insulation: Seals have a thick layer of blubber under their skin that can make up to 30% of their body weight, serving as insulation and energy reserve',
        'Breeding and pup rearing: Seals typically give birth to one pup per year, with newborns nursed for weeks or months. Some species provide exceptionally rich milk to aid rapid growth',
        'Endangered species: Some seal species face threats from climate change, hunting, habitat destruction, and pollution. Monk Seals are classified as endangered due to habitat loss',
        'Specialized adaptations: True seals lack external ear flaps and are more awkward on land, while eared seals can rotate their hind flippers for better land mobility',
        'Conservation importance: Polar ice-dependent species like Ringed Seals are affected by climate change, impacting Arctic ecosystem predators',
        'Diving mastery: Seals have excellent underwater vision and hearing, with specialized physiological adaptations for extended breath-holding during deep dives'
      ]
    },
    {
      id: '20',
      name: 'Aoi',
      series: 'water',
      part: 20,
      animalType: 'Heron',
      description: 'An elegant and patient heron who teaches friends about grace, patience, and the art of mindful waiting. Aoi shows that sometimes the most powerful action is standing still and observing the world around us.',
      generalDescription: 'Herons are large, long-legged, and long-necked wading birds belonging to the family Ardeidae. They are known for their elegant appearance, with a slender body, sharp beak, and graceful flight. They typically have a wingspan of 1.5 to 2 meters and are often seen standing still in the water, waiting to catch prey.',
      skills: ['Patience', 'Precision', 'Grace', 'Observation'],
      trivia: 'Aoi has a specialized vertebrae structure in her neck, allowing her to retract it into an "S" shape. This adaptation helps her strike quickly at prey with incredible precision!',
      personality: ['Patient', 'Graceful', 'Observant', 'Wise'],
      favoriteFood: 'Fish and amphibians',
      habitat: 'Herons are found worldwide except for the polar regions and some desert areas. They are most commonly associated with wetlands, including marshes, lakes, rivers, ponds, and coastal regions.',
      color: 'from-gray-400 to-blue-500',
      icon: '🪶',
      image: aoiImage,
      likes: ['Peaceful mornings', 'Still water', 'Quiet reflection', 'Teaching patience'],
      dislikes: ['Rushing water', 'Loud disturbances', 'Impatience', 'Polluted wetlands'],
      booksFeatures: [
        'The Adventures of Akai the Red Panda: A Heartwarming Panda Reunion',
        'New Title still to be released'
      ],
      locations: [
        'Worldwide distribution: Found on all continents except polar regions and some desert areas',
        'Wetlands: Marshes, swamps, and wetland ecosystems',
        'Lakes and rivers: Freshwater environments with abundant fish populations',
        'Ponds: Small water bodies ideal for hunting and nesting',
        'Coastal regions: Saltwater marshes and estuarine environments',
        'Notable species habitats: Great Blue Heron in North America, Grey Heron in Europe and Asia, Black-crowned Night Heron in various global regions'
      ],
      diet: [
        'Fish: Primary food source, caught with precision strikes',
        'Amphibians: Frogs, toads, and salamanders',
        'Small mammals: Rodents and other small terrestrial animals',
        'Insects: Various aquatic and terrestrial insects',
        'Crustaceans: Crabs, crayfish, and other shellfish',
        'Hunting technique: Standing still for long periods, then striking quickly with sharp beaks'
      ],
      names: {
        adult: 'Heron (both male and female)',
        baby: 'Chick or Fledgling (young herons learning to hunt and fly)'
      },
      mythology: [
        'Ancient Egypt: The heron was considered a symbol of creation and was associated with the sun god Ra, representing renewal and rebirth',
        'Chinese culture: The heron is a symbol of longevity and purity, often depicted in traditional art as a representation of wisdom and grace',
        'Japanese culture: Regards the heron as a symbol of grace and beauty, frequently featured in traditional art and literature as embodying elegance and patience',
        'Native American tribes: Often viewed the heron as a symbol of patience and determination, teaching the importance of waiting for the right moment'
      ],
      otherNames: [
        'Egret: Closely related to herons, egrets are generally smaller and often have white plumage',
        'Bittern: Another member of the Ardeidae family, bitterns are more secretive and have shorter necks',
        'Crane: Though similar in appearance, cranes belong to a different family (Gruidae) and are known for their elaborate courtship dances',
        'Stork: Large wading birds related to herons, storks are typically larger and have a distinctive bill shape'
      ],
      funFact: 'Herons have a specialized vertebrae structure in their necks, allowing them to retract their necks into an "S" shape. This adaptation helps them strike quickly at prey with precision. The neck acts like a coiled spring, allowing for lightning-fast strikes that can catch fish in a split second.',
      additionalFacts: [
        'Colonial nesting: Herons often nest in colonies called heronries, which can consist of hundreds of nests in trees or shrubs near water',
        'Excellent eyesight: They have exceptional vision, allowing them to hunt effectively both during the day and at night, with some species being primarily nocturnal',
        'Distinctive calls: Herons are known for their harsh, distinctive calls, which can be quite loud and are often heard during breeding season',
        'Flight characteristics: Despite their large size, herons are graceful fliers with slow, deliberate wingbeats and their necks folded back in an S-curve during flight',
        'Adaptability: Different heron species have adapted to various aquatic environments, from tropical mangroves to temperate wetlands',
        'Conservation status: While many heron species are stable, some face threats from habitat loss, pollution, and climate change affecting their wetland ecosystems'
      ]
    },
    {
      id: '21',
      name: 'Basilisk',
      series: 'predators',
      part: 21,
      animalType: 'Snake',
      description: 'A wise and mysterious snake who teaches friends about transformation, patience, and the power of adaptation. Basilisk shows that change is natural and that patience combined with precise action leads to success.',
      generalDescription: 'Snakes are a diverse group of elongated, legless reptiles belonging to the suborder Serpentes. Known for their ability to slither across the ground, snakes exhibit a wide range of sizes, colors, and ecological adaptations. They have a distinctive elongated body with scales, and many species possess specialized structures, such as venomous fangs or constricting muscles, that enable them to capture and consume prey.',
      skills: ['Stealth', 'Precision', 'Adaptation', 'Heat Detection'],
      trivia: 'Basilisk has the amazing ability to sense heat through specialized infrared vision! Species like pit vipers, boas, and pythons have heat-sensing pits on their heads that allow them to detect prey body heat even in complete darkness.',
      personality: ['Wise', 'Patient', 'Mysterious', 'Precise'],
      favoriteFood: 'Rodents and birds',
      habitat: 'Snakes are found on every continent except Antarctica, inhabiting a wide variety of ecosystems ranging from deserts and rainforests to grasslands and wetlands. They have successfully adapted to diverse environments from tropical jungles to arid deserts.',
      color: 'from-emerald-600 to-yellow-500',
      icon: '🐍',
      image: basiliskImage,
      likes: ['Warm sunlight', 'Hidden places', 'Quiet observation', 'Transformation rituals'],
      dislikes: ['Cold weather', 'Sudden movements', 'Loud noises', 'Being misunderstood'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Global distribution: Found on every continent except Antarctica',
        'Tropical rainforests: Dense, terrestrial environments (Amazon rainforests)',
        'Deserts: Arid regions of Africa and other continents',
        'Grasslands: Open savanna and prairie ecosystems',
        'Wetlands: Marshy and swampy areas',
        'Marine environments: Sea snakes (Hydrophiinae) spending most time in oceans',
        'Specialized niches: From apex predators to scavengers across diverse food webs'
      ],
      diet: [
        'Carnivorous diet: Predominantly consuming other animals from insects to large prey',
        'Small mammals: Rodents and other small terrestrial animals',
        'Birds: Various bird species depending on snake size and habitat',
        'Amphibians: Frogs, toads, and salamanders',
        'Other reptiles: Including other snakes for specialist species like King Cobras',
        'Feeding methods: Venomous injection (vipers), constriction (boas), or direct consumption',
        'Jaw adaptation: Unhinging lower jaw to consume prey larger than head diameter'
      ],
      names: {
        adult: 'Snake (Scientific suborder: Serpentes with species-specific names like Naja naja for Indian Cobra)',
        baby: 'Snakelet or Hatchling (young snakes emerging from eggs or born live depending on species)'
      },
      mythology: [
        'Greek mythology: The Gorgon Medusa depicted with snakes for hair, symbolizing danger and power',
        'Hinduism: The Nāga are serpent-like beings believed to be guardians of water and wealth, revered and feared in equal measure',
        'Medical symbolism: Asclepius, the Greek god of healing, depicted with a staff entwined by a serpent, still used in modern medical imagery',
        'Native American cultures: Snake seen as symbol of healing, transformation, and spiritual rebirth due to skin-shedding ability',
        'Christian symbolism: Often depicted as symbols of temptation and evil, notably in the biblical story of Adam and Eve in the Garden of Eden',
        'Universal themes: Embodying dualities of life and death, wisdom and danger, renewal and destruction across cultures'
      ],
      otherNames: [
        'Species-specific names: Cobra, Viper, Python, Boa, Rattlesnake depending on family and characteristics',
        'Boa Constrictor (Boa constrictor): Large, non-venomous snake that kills prey by constriction',
        'Anaconda (Eunectes): Another large constrictor related to boas',
        'Viperidae family: Including Rattlesnakes and Vipers that rely on venom to immobilize and digest prey',
        'Colubridae family: Wide range of non-venomous snakes including Garter Snake (Thamnophis)',
        'Regional variations: Various local names depending on species, region, and cultural context'
      ],
      funFact: 'One remarkable fun fact about snakes is their ability to sense heat through specialized infrared vision. Species such as pit vipers, boas, and pythons have specialized heat-sensing pits on their heads that allow them to detect the body heat of their prey, even in complete darkness. This adaptation is particularly useful for hunting warm-blooded animals, such as rodents, in dark environments.',
      additionalFacts: [
        'Venomous diversity: Over 600 species of venomous snakes exist, but not all are dangerous to humans. Venom is primarily used for subduing prey rather than defense',
        'Unique locomotion: Snakes achieve serpentine locomotion using muscular bodies to push against surfaces in "S" curves. Some species like Sidewinders have evolved specialized movement for loose sand',
        'Reproductive strategies: Most reproduce sexually, with some laying eggs (oviparous) and others giving birth to live young (viviparous). Courtship often involves complex competitive rituals',
        'Size diversity: Ranges dramatically from tiny Thread Snakes (Leptotyphlops) only a few inches long to Reticulated Pythons (Python reticulatus) over 30 feet (9 meters)',
        'Anatomical adaptations: Lack limbs, external ears, and eyelids, but have highly flexible jaws and specialized scales for their elongated lifestyle',
        'Ecological roles: Occupy various niches from apex predators to specialized feeders, playing crucial roles in ecosystem balance and prey population control'
      ]
    },
    {
      id: '22',
      name: 'Blaze',
      series: 'predators',
      part: 22,
      animalType: 'Lion',
      description: 'A brave and playful lion cub who teaches friends about courage, leadership, and the importance of family bonds. Blaze shows that true strength comes from protecting those you love and that even the smallest cub can have the heart of a king.',
      generalDescription: 'Lion cubs are the offspring of lions (Panthera leo), one of the four big cats in the genus Panthera. They are born with spotted fur, which serves as camouflage in their grassland habitat. As they mature, their fur becomes a uniform golden color. Lion cubs have a playful and curious nature, spending much of their time exploring and interacting with their siblings.',
      skills: ['Leadership', 'Courage', 'Teamwork', 'Communication'],
      trivia: 'Blaze belongs to the only social species of big cat! Lions are known for their distinctive roar, which can be heard from up to 8 kilometers (5 miles) away. Roaring is used to advertise their presence, establish territory, and communicate with pride members.',
      personality: ['Brave', 'Playful', 'Loyal', 'Protective'],
      favoriteFood: 'Meat from large ungulates',
      habitat: 'Lions are native to sub-Saharan Africa and a small population exists in the Gir Forest of India. They inhabit savannas, grasslands, and open woodlands where they can find suitable prey and water sources.',
      color: 'from-yellow-400 to-orange-500',
      icon: '🦁',
      image: blazeImage,
      likes: ['Playing with siblings', 'Learning to hunt', 'Pride gatherings', 'Sunny grasslands'],
      dislikes: ['Being separated from family', 'Loud predators', 'Drought conditions', 'Territory disputes'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Sub-Saharan Africa: Primary native habitat across African savannas',
        'Gir Forest, India: Small population of Asiatic lions in this protected area',
        'Savannas: Open grasslands with scattered trees, ideal for hunting',
        'Grasslands: Vast plains providing abundant prey and visibility',
        'Open woodlands: Mixed environments with trees for shade and water sources nearby',
        'Protected reserves: National parks and conservation areas ensuring species survival'
      ],
      diet: [
        'Large ungulates: Zebras, wildebeests, and buffalo as primary prey',
        'Mother\'s milk: Lion cubs initially feed on nutrient-rich maternal milk',
        'Meat transition: Cubs begin eating meat around three months of age',
        'Hunting education: Learning to hunt by observing and participating with the pride',
        'Opportunistic feeding: Adapting diet based on available prey in their territory',
        'Collaborative hunting: Pride members working together to take down large prey'
      ],
      names: {
        adult: 'Lion (Panthera leo - males develop distinctive manes, females remain mane-less)',
        baby: 'Cub (lion cubs born blind and rely on mother for nourishment and protection during early weeks)'
      },
      mythology: [
        'African cultures: Lions are revered as symbols of strength, courage, and royalty, representing power and leadership in traditional beliefs',
        'Folklore and mythology: Feature prominently in stories across cultures, often symbolizing bravery, nobility, and divine authority',
        'Religious symbolism: Appear in various religious traditions as symbols of power, protection, and spiritual strength',
        'Royal associations: Known as "king of the jungle" or "king of beasts," representing supreme authority and majesty in cultural narratives'
      ],
      otherNames: [
        'King of the jungle: Traditional title emphasizing their regal status and dominance',
        'King of beasts: Alternative royal title highlighting their position as apex predators',
        'Panthera leo: Scientific name for the lion species',
        'Asiatic lion: Specific subspecies found in India\'s Gir Forest',
        'African lion: The more numerous subspecies found across sub-Saharan Africa'
      ],
      funFact: 'Lions are known for their distinctive roar, which can be heard from up to 8 kilometers (5 miles) away. Roaring is a form of communication used by lions to advertise their presence, establish territory, and communicate with other members of the pride. A lion\'s roar can reach 114 decibels, which is louder than a rock concert!',
      additionalFacts: [
        'Vulnerability of cubs: Lion cubs are vulnerable to predation from hyenas, leopards, and other lions, especially when left unattended by the pride',
        'Social structure: Lions are highly social animals living in prides consisting of related females, their offspring, and coalitions of one or more male lions',
        'Gender roles: Male lions are responsible for defending the pride\'s territory, while females are the primary hunters and caretakers',
        'Conservation status: Lion populations have declined significantly in recent decades due to habitat loss, human-wildlife conflict, and poaching',
        'Protective efforts: Conservation programs are underway to protect remaining lion populations and their habitats through protected reserves and anti-poaching initiatives',
        'Unique among big cats: Lions are the only truly social big cat species, with complex pride dynamics and cooperative behaviors essential for survival'
      ]
    },
    {
      id: '23',
      name: 'Amaruq',
      series: 'predators',
      part: 23,
      animalType: 'Wolf',
      description: 'A loyal and social wolf pup who teaches friends about teamwork, family bonds, and the strength that comes from unity. Amaruq shows that working together as a pack can overcome any challenge.',
      generalDescription: 'Wolf pups are the offspring of wolves, members of the species Canis lupus. Wolf pups are born blind and deaf, relying entirely on their mother and the pack for survival. They are covered in a fine, soft fur and are usually a dark color at birth, which lightens as they grow older.',
      skills: ['Teamwork', 'Hunting', 'Communication', 'Pack Coordination'],
      trivia: 'Amaruq is highly social from a young age! Wolf pups engage in play that helps them develop the skills needed for hunting and social interaction within the pack. They begin to explore outside the den at about 3 weeks old.',
      personality: ['Loyal', 'Social', 'Brave', 'Protective'],
      favoriteFood: 'Meat from pack hunts',
      habitat: 'Wolves are found in various habitats across the Northern Hemisphere, including forests, tundras, grasslands, and deserts. They are native to North America, Europe, and Asia. Wolf pups are born in dens, which can be natural caves, hollow logs, or dug-out burrows.',
      color: 'from-gray-600 to-blue-600',
      icon: '🐺',
      image: amaruqImage,
      likes: ['Pack gatherings', 'Playful learning', 'Howling together', 'Exploring territory'],
      dislikes: ['Being alone', 'Loud human activity', 'Separation from family', 'Harsh winter storms'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Northern Hemisphere: Various habitats across North America, Europe, and Asia',
        'Forests: Dense woodland environments providing cover and prey',
        'Tundras: Arctic and subarctic regions with seasonal migrations',
        'Grasslands: Open plains and prairies with abundant ungulate prey',
        'Deserts: Arid regions where wolves have adapted to harsh conditions',
        'Den sites: Natural caves, hollow logs, or dug-out burrows for raising pups'
      ],
      diet: [
        'Mother\'s milk: Wolf pups initially feed on nutrient-rich maternal milk',
        'Regurgitated meat: At 3-4 weeks old, adult wolves provide regurgitated meat to pups',
        'Solid food transition: Pups gradually start eating solid food as they develop',
        'Pack hunting participation: By 6-8 months, pups start traveling with the pack on hunting trips',
        'Large ungulates: Deer, elk, moose, and caribou as primary pack prey',
        'Small mammals: Rabbits, rodents, and other smaller prey as supplementary food'
      ],
      names: {
        adult: 'Wolf (Canis lupus - males and females living in family groups called packs)',
        baby: 'Pup (wolf pups born blind and deaf, relying entirely on mother and pack for survival)'
      },
      mythology: [
        'Norse mythology: The wolf Fenrir is a significant figure, prophesied to bring about the end of the world during Ragnarok, representing both destruction and transformation',
        'Roman mythology: According to legend, Romulus and Remus, the founders of Rome, were raised by a she-wolf, symbolizing protection and nurturing strength',
        'Native American culture: Wolves are often seen as symbols of loyalty, strength, and perseverance, representing the importance of family and community bonds',
        'Global folklore: Wolves feature in countless stories worldwide, often representing both the wild, untamed aspects of nature and the importance of social bonds'
      ],
      otherNames: [
        'Young wolf: Alternative name for wolf pups in various regions',
        'Coyotes (Canis latrans): Closely related species, smaller than wolves but with similar pack behaviors',
        'Domestic dogs (Canis lupus familiaris): Subspecies of wolves that have been domesticated by humans',
        'Jackals: Related canids found in Africa and Asia',
        'Foxes: Smaller canid relatives with different social structures'
      ],
      funFact: 'Wolf pups are highly social from a young age, engaging in play that helps them develop the skills needed for hunting and social interaction within the pack. This playful behavior is crucial for learning pack hierarchy, communication signals, and cooperative hunting techniques that will be essential for their survival as adults.',
      additionalFacts: [
        'Early exploration: Wolf pups begin to explore outside the den at about 3 weeks old, gradually expanding their territory as they grow stronger',
        'Hunting education: By the age of 6-8 months, wolf pups start to travel with the pack on hunting trips, learning essential survival skills through observation and practice',
        'High mortality rate: About 50% of wolf pups do not survive their first year due to predation, disease, and environmental factors, making pack protection crucial',
        'Pack structure: Wolves live in complex social groups with established hierarchies, cooperation strategies, and communication systems that pups must learn',
        'Communication skills: Wolf pups learn various forms of communication including howls, body language, and scent marking that are essential for pack coordination',
        'Conservation challenges: Wolf populations face threats from habitat loss, human-wildlife conflict, and climate change, making conservation efforts crucial for species survival'
      ]
    },
    {
      id: '24',
      name: 'Rajin',
      series: 'predators',
      part: 24,
      animalType: 'Tiger',
      description: 'A powerful and majestic tiger cub who teaches friends about strength, independence, and the importance of protecting what you love. Rajin shows that true power comes from within and that even the mightiest hunters can be gentle guardians.',
      generalDescription: 'Tigers (Panthera tigris) are the largest members of the cat family (Felidae) and are renowned for their striking orange coat with black stripes. They have powerful bodies, strong limbs, and sharp claws, making them formidable predators. Tigers have a keen sense of sight, smell, and hearing, which aids them in hunting.',
      skills: ['Stealth', 'Swimming', 'Territory Defense', 'Solitary Hunting'],
      trivia: 'Rajin is an excellent swimmer! Tigers are known to traverse rivers and lakes in search of prey or to cool off in hot weather. They are one of the few cat species that enjoy water and can swim several kilometers.',
      personality: ['Powerful', 'Independent', 'Protective', 'Majestic'],
      favoriteFood: 'Large ungulates like deer and wild boar',
      habitat: 'Tigers are native to various habitats across Asia, including tropical rainforests, grasslands, mangrove swamps, and deciduous forests. They are found in countries such as India, Nepal, Bhutan, Bangladesh, Myanmar, Thailand, Malaysia, Indonesia, Russia, and China.',
      color: 'from-orange-400 to-red-600',
      icon: '🐅',
      image: rajinImage,
      likes: ['Cool water', 'Dense forests', 'Solitary exploration', 'Territory marking'],
      dislikes: ['Habitat destruction', 'Human encroachment', 'Loud machinery', 'Competition for prey'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Asian distribution: Native to various habitats across Asia from India to China and Russia',
        'Tropical rainforests: Dense, humid forests providing cover and abundant prey',
        'Grasslands: Open savannas and plains where tigers hunt large ungulates',
        'Mangrove swamps: Coastal wetlands where some tigers have adapted to semi-aquatic life',
        'Deciduous forests: Seasonal forests with varying canopy coverage',
        'Protected reserves: National parks and conservation areas in India, Nepal, Bhutan, Bangladesh, Myanmar, Thailand, Malaysia, Indonesia, Russia, and China'
      ],
      diet: [
        'Large ungulates: Deer, wild boar, and buffalo as primary prey',
        'Carnivorous diet: Exclusively meat-eating with powerful hunting adaptations',
        'Smaller prey: Monkeys, birds, and fish when larger prey is scarce',
        'Solitary hunting: Using stealth and ambush tactics to catch prey',
        'Swimming prey: Tigers can hunt aquatic animals and cross water bodies',
        'Territorial feeding: Defending hunting grounds from other predators'
      ],
      names: {
        adult: 'Tiger (Panthera tigris - males are larger with prominent territorial markings)',
        baby: 'Cub (tiger cubs born blind and rely on mother for nourishment and protection during early weeks)'
      },
      mythology: [
        'Asian cultures: Tigers hold significant cultural and symbolic importance across Asia, revered as symbols of strength, power, and courage',
        'Religious symbolism: Feature prominently in folklore, mythology, and religious traditions, often representing royalty and protection',
        'Cultural art: Important subjects in traditional Asian art, literature, and ceremonial objects across multiple civilizations',
        'Royal symbolism: Associated with kingdoms and empires, representing supreme power and divine authority in many Asian societies'
      ],
      otherNames: [
        'Big cats: Alternative name emphasizing their status as the largest cat species',
        'Jungle cats: Regional name highlighting their forest habitat preferences',
        'Panthera tigris: Scientific name for the tiger species',
        'Six extant subspecies: Bengal tiger, Indochinese tiger, Malayan tiger, Siberian tiger, South China tiger, and Sumatran tiger',
        'Regional variations: Each subspecies adapted to specific geographic regions and climate conditions'
      ],
      funFact: 'Tigers are excellent swimmers and are known to traverse rivers and lakes in search of prey or to cool off in hot weather. They are one of the few cat species that enjoy water. Tigers can swim several kilometers and have been observed hunting in water, making them truly versatile apex predators.',
      additionalFacts: [
        'Apex predators: Tigers play a crucial role in maintaining the balance of their ecosystems by controlling prey populations',
        'Subspecies diversity: There are six extant subspecies of tigers, each adapted to different habitats and geographic regions',
        'Conservation status: All tiger subspecies are listed as endangered or critically endangered due to habitat loss, poaching, and human-wildlife conflict',
        'Distinctive features: Each tiger has a unique stripe pattern, like human fingerprints, making individual identification possible',
        'Territorial behavior: Tigers are solitary animals with large territories that they mark and defend from other tigers',
        'Conservation efforts: Extensive programs are underway to protect remaining tiger populations through habitat preservation, anti-poaching measures, and breeding programs'
      ]
    },
    {
      id: '25',
      name: 'Isen',
      series: 'predators',
      part: 25,
      animalType: 'Polar Bear',
      description: 'A resilient and strong polar bear cub who teaches friends about adaptation, survival, and the importance of protecting our environment. Isen shows that even in the harshest conditions, strength and determination can help us thrive.',
      generalDescription: 'The Polar Bear (Ursus maritimus) is a large, apex predator found in the Arctic region. Characterized by its thick white fur, which provides camouflage in the snowy and icy environment, the Polar Bear has evolved to thrive in extreme cold. It has a robust body with a thick layer of fat underneath the skin to insulate against the freezing temperatures. The adult male can weigh up to 1,500 pounds (680 kg) and reach lengths of over 10 feet (3 meters) from head to tail. Polar Bears are powerful swimmers, able to traverse large distances in search of food, and they are excellent hunters, primarily preying on seals. Their large paws act like snowshoes, allowing them to traverse the Arctic ice with ease.',
      skills: ['Swimming', 'Ice Navigation', 'Hunting', 'Cold Adaptation'],
      trivia: 'Isen has an extraordinary sense of smell! Polar bears can detect seals nearly a mile away and under several feet of compacted snow. Their exceptional olfactory ability allows them to track prey over vast areas of sea ice.',
      personality: ['Resilient', 'Strong', 'Adaptive', 'Determined'],
      favoriteFood: 'Seals, particularly ringed and bearded seals',
      habitat: 'Polar Bears are native to the Arctic region, specifically within the territories that extend across the northern coastlines of Canada, Greenland, Alaska (USA), and Russia. They are typically found on sea ice, which is their primary hunting ground for seals. As sea ice diminishes due to climate change, Polar Bears have had to adapt to more land-based habitats, though this significantly affects their hunting patterns and survival strategies. Their range is primarily limited to the ice-covered seas, as these areas provide the necessary conditions for hunting and denning.',
      color: 'from-blue-200 to-white',
      icon: '🐻‍❄️',
      image: isenImage,
      likes: ['Icy waters', 'Seal hunting', 'Snow dens', 'Arctic exploration'],
      dislikes: ['Warm temperatures', 'Melting ice', 'Food scarcity', 'Human interference'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Arctic region: Native to territories across northern coastlines of Canada, Greenland, Alaska, and Russia',
        'Sea ice: Primary hunting ground for seals, essential for survival and reproduction',
        'Coastal areas: Northern coastlines where sea ice meets land masses',
        'Ice-covered seas: Preferred habitat providing necessary conditions for hunting and denning',
        'Land-based habitats: Increasingly used as sea ice diminishes due to climate change',
        'Denning sites: Snow dens and ice caves where mothers raise cubs during harsh winter months'
      ],
      diet: [
        'Seals: Primary diet consisting of ringed and bearded seals, providing high-calorie blubber and meat',
        'Blubber and meat: Essential high-caloric intake needed to sustain large body mass in harsh Arctic climate',
        'Ice hunting: Exceptional hunting through sea ice using sharp claws and keen sense of smell',
        'Breathing holes: Locate seals\' breathing holes in ice using extraordinary olfactory abilities',
        'Summer scavenging: May scavenge on carcasses when sea ice melts and food becomes scarce',
        'Occasional vegetation: Plant matter consumption during summer months, though not typical for the species'
      ],
      names: {
        adult: 'Polar Bear (Ursus maritimus - scientific name, with males significantly larger than females)',
        baby: 'Cub (polar bear cubs born small and dependent, staying with mother for extended periods)'
      },
      mythology: [
        'Inuit culture: Polar Bears hold significant cultural importance for indigenous Arctic peoples, particularly the Inuit, seen as spirits of strength, endurance, and resilience',
        'Inuit name Nanuq: "Polar bear" in Inuktitut language, representing the harshness and majesty of the Arctic environment',
        'Spiritual significance: Often considered symbols of power and wisdom in Arctic indigenous cultures, representing both survival and respect for nature',
        'Folklore traditions: In some Inuit folklore, Polar Bears were believed to be transformed human beings or supernatural entities with the ability to communicate with humans',
        'Cultural art: Important subjects in traditional Arctic art, storytelling, and spiritual practices, representing the connection between humans and the natural world'
      ],
      otherNames: [
        'White Bear: Alternative name due to fur color, though misleading as fur is actually translucent for camouflage',
        'Scientific name: Ursus maritimus, emphasizing their marine-adapted lifestyle',
        'Inuit Nanuq: Traditional name meaning "polar bear" in Inuktitut language',
        'Grizzly Bear (Ursus arctos horribilis): Similar species sharing behavioral traits but found in temperate regions',
        'Kodiak Bear (Ursus arctos middendorffi): Related large bear species with similar size characteristics',
        'Grolar Bear: Hybrid cross between Polar Bear and Grizzly Bear, occurring due to climate change-induced habitat overlap'
      ],
      funFact: 'One fascinating fact about Polar Bears is that they have a keen sense of smell—they can detect seals nearly a mile away and under several feet of compacted snow. Their extraordinary olfactory ability allows them to track prey over vast areas of sea ice, helping them to locate breathing holes and dens where seals rest. This hunting adaptation is crucial for their survival in the harsh Arctic conditions, where food is often scarce.',
      additionalFacts: [
        'Cold adaptations: Superbly adapted to Arctic life with dense, oily fur that repels water, fur-covered paws for insulation and ice grip, and thick fat layer up to 4.5 inches for heat regulation and energy storage',
        'Swimming abilities: Highly proficient swimmers covering hundreds of miles in open water, using large forepaws as paddles to propel through icy waters while searching for food',
        'Endangered status: Increasingly threatened due to climate change and melting sea ice, with predictions suggesting potential extinction by century\'s end if current ice loss rates continue',
        'Habitat dependence: Reliance on sea ice for hunting and reproduction places them in vulnerable position as global temperatures rise and Arctic ice diminishes',
        'Conservation importance: Critical conservation efforts needed to safeguard their future, including habitat protection, climate action, and reduced human-wildlife conflict',
        'Cultural relationships: Historical and ongoing importance to indigenous Arctic communities for food, clothing, tools, and cultural practices, representing respectful human-nature relationships'
      ]
    },
    {
      id: '26',
      name: 'Kazan',
      series: 'predators',
      part: 26,
      animalType: 'Siberian Tiger',
      description: 'A majestic and powerful Siberian tiger cub who teaches friends about resilience, adaptability, and the importance of protecting our natural heritage. Kazan shows that even the largest cats can be gentle guardians of their forest home.',
      generalDescription: 'The Siberian tiger (Panthera tigris altaica), also known as the Amur tiger, is the largest cat species and a subspecies of tiger. Siberian tiger cubs are born with soft fur that has distinctive black stripes for camouflage in their forest habitat. As they grow, their fur becomes more orange with black stripes, and they develop the characteristic white spots on the back of their ears.',
      skills: ['Swimming', 'Forest Navigation', 'Cold Weather Adaptation', 'Territory Protection'],
      trivia: 'Kazan is an excellent swimmer! Siberian tigers are known to traverse large bodies of water, including rivers and lakes, in search of prey. They are one of the few cat species that enjoy water and are capable of swimming long distances.',
      personality: ['Majestic', 'Resilient', 'Powerful', 'Protective'],
      favoriteFood: 'Large ungulates such as deer, wild boar, and elk',
      habitat: 'Siberian tigers are found in the forests of eastern Russia, particularly in the Primorsky Krai region and the Sikhote-Alin mountain range. They also inhabit parts of northeastern China and occasionally venture into North Korea.',
      color: 'from-orange-500 to-amber-600',
      icon: '🐅',
      image: kazanImage,
      likes: ['Dense forests', 'Cold climates', 'Swimming adventures', 'Peaceful territories'],
      dislikes: ['Habitat destruction', 'Human conflict', 'Poaching threats', 'Environmental changes'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Eastern Russia: Primarily found in forests of Primorsky Krai region and Sikhote-Alin mountain range',
        'Northeastern China: Small populations inhabiting border forest regions',
        'North Korea: Occasional ventures into northern forest territories',
        'Taiga forests: Dense coniferous forests providing ideal hunting and denning habitat',
        'Mountain ranges: Sikhote-Alin mountains offering varied terrain and abundant prey',
        'River valleys: Waterways and riparian forests supporting diverse ecosystem'
      ],
      diet: [
        'Large ungulates: Deer, wild boar, and elk as primary prey sources',
        'Apex predator diet: Exclusively carnivorous with specialized hunting adaptations',
        'Smaller animals: Rabbits and fish when larger prey is scarce',
        'Solitary hunting: Using stealth and ambush tactics to catch prey efficiently',
        'Seasonal variations: Adapting hunting strategies based on prey availability',
        'High caloric needs: Requiring substantial food intake to maintain large body mass in cold climate'
      ],
      names: {
        adult: 'Siberian Tiger (Panthera tigris altaica - largest cat species, also known as Amur tiger)',
        baby: 'Cub (Siberian tiger cubs born blind and rely on mother for protection and nourishment during early stages)'
      },
      mythology: [
        'Russian folklore: Siberian tigers have significant cultural importance in regions where they are found, revered as symbols of strength, power, and courage',
        'Chinese culture: Feature prominently in traditional art and mythology, representing supreme power and royal authority',
        'Indigenous cultures: Important symbols in local folklore and spiritual practices of native Siberian peoples',
        'Cultural art: Depicted in traditional Russian and Chinese art, literature, and ceremonial objects across multiple civilizations'
      ],
      otherNames: [
        'Amur tiger: Named after the Amur River region where they are found',
        'Manchurian tiger: Historical name referring to their Manchurian habitat range',
        'Ussurian tiger: Named after the Ussuri River region in their territory',
        'Panthera tigris altaica: Scientific subspecies name distinguishing them from other tiger subspecies',
        'Six tiger subspecies: Related to Bengal tiger, Indochinese tiger, Malayan tiger, Sumatran tiger, and South China tiger'
      ],
      funFact: 'Siberian tigers are excellent swimmers and are known to traverse large bodies of water, including rivers and lakes, in search of prey. They are one of the few cat species that enjoy water and are capable of swimming long distances. This remarkable ability allows them to access different hunting territories and demonstrates their incredible adaptability to their harsh northern environment.',
      additionalFacts: [
        'Largest subspecies: Siberian tigers are the largest of all tiger subspecies, with males weighing up to 300 kilograms (660 pounds) and measuring over 3 meters (10 feet) in length from nose to tail',
        'Cold climate adaptations: Their large size and thick fur coat are specific adaptations to the cold climate of their habitat, helping them survive harsh Siberian winters',
        'Critically endangered: With an estimated population of around 500 individuals in the wild, they face severe conservation challenges',
        'Primary threats: Habitat loss, poaching, and human-wildlife conflict are the main threats to their survival in the wild',
        'Conservation efforts: Extensive programs including habitat protection, anti-poaching measures, and international breeding programs are crucial for their long-term survival',
        'Ecological importance: As apex predators, they play a vital role in maintaining the balance of their forest ecosystems by controlling prey populations and supporting biodiversity'
      ]
    },
    {
      id: '27',
      name: 'Nyra',
      series: 'predators',
      part: 27,
      animalType: 'Snow Leopard',
      description: 'An elusive and graceful snow leopard cub who teaches friends about patience, stealth, and the beauty of mountain solitude. Nyra shows that being mysterious and quiet can be a powerful strength, earning her the nickname "ghost of the mountains."',
      generalDescription: 'Snow leopards (Panthera uncia) are large cats native to the mountainous regions of Central and South Asia. Snow leopard cubs are born with thick fur to keep them warm in their cold habitat. They have a unique coat pattern with rosettes and spots that help provide camouflage in their rocky environment. Cubs are born with their eyes closed and are entirely dependent on their mother.',
      skills: ['Mountain Navigation', 'Stealth', 'Long-distance Leaping', 'Cold Weather Survival'],
      trivia: 'Nyra is born blind with eyes that open after about 7-10 days! Snow leopard cubs start to venture out of the den at around 2 months old and begin to learn hunting skills from their mother. They can leap up to 50 feet in a single bound!',
      personality: ['Elusive', 'Graceful', 'Patient', 'Mysterious'],
      favoriteFood: 'Blue sheep (bharal), ibex, marmots, pikas, and hares',
      habitat: 'Snow leopards are found in the high-altitude regions of the Himalayas, the Tibetan Plateau, and the mountains of Central Asia, including countries such as India, Nepal, Bhutan, China, Mongolia, and Russia.',
      color: 'from-slate-300 to-blue-400',
      icon: '🐆',
      image: nyraImage,
      likes: ['Mountain peaks', 'Rocky terrain', 'Solitary exploration', 'Cold mountain air'],
      dislikes: ['Human disturbance', 'Livestock conflict', 'Habitat destruction', 'Warm weather'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Himalayas: High-altitude mountain regions providing ideal rocky terrain and prey habitat',
        'Tibetan Plateau: Vast elevated plateau with sparse vegetation and suitable hunting grounds',
        'Central Asian mountains: Mountain ranges across India, Nepal, Bhutan, China, Mongolia, and Russia',
        'Alpine zones: High-altitude areas typically between 3,000-4,500 meters elevation',
        'Rocky outcrops: Steep, rugged terrain providing excellent camouflage and denning sites',
        'Snow-covered peaks: Mountain summits and ridges where snow leopards traverse and hunt'
      ],
      diet: [
        'Blue sheep (bharal): Primary prey species providing essential nutrition in high-altitude environments',
        'Ibex: Large mountain goats that snow leopards hunt with stealth and patience',
        'Marmots: Smaller mammals hunted during warmer months when they emerge from hibernation',
        'Pikas and hares: Small prey animals that supplement diet when larger prey is scarce',
        'Livestock predation: Occasionally prey on domestic animals, leading to human-wildlife conflict',
        'Carnivorous specialization: Adapted for hunting in extreme mountain conditions with powerful hunting abilities'
      ],
      names: {
        adult: 'Snow Leopard (Panthera uncia - also referred to as "ounce" in some regions)',
        baby: 'Cub (snow leopard cubs typically born in litters of 1 to 5, nursed by mother for several months before learning to hunt)'
      },
      mythology: [
        'Tibetan culture: Snow leopards are considered symbols of the mountains and are often featured in folklore and art, representing the spirit of high-altitude wilderness',
        'National heritage: The snow leopard is a national heritage animal of Pakistan, symbolizing the country\'s mountainous regions and conservation efforts',
        'Mountain spirituality: In various Central Asian cultures, they represent the connection between earth and sky, embodying the mysterious power of mountain peaks',
        'Cultural symbolism: Featured prominently in traditional art and stories across their range, often representing grace, stealth, and adaptation to harsh environments'
      ],
      otherNames: [
        'Ounce: Alternative name for snow leopards used in some regions and historical texts',
        'Panthera uncia: Scientific name distinguishing them from other big cat species',
        'Leopard (Panthera pardus): Related species with broader range and different spot patterns',
        'Amur leopard (Panthera pardus orientalis): Similar cold-climate leopard with more robust build and distinct markings',
        'Ghost of the mountains: Nickname earned due to their elusive nature and difficulty to study in the wild'
      ],
      funFact: 'Snow leopard cubs are born blind and their eyes open after about 7-10 days. They start to venture out of the den at around 2 months old and begin to learn hunting skills from their mother. Most amazingly, they are capable of leaping up to 50 feet (15 meters) in a single bound, an incredible adaptation for hunting in steep, rugged mountain terrain!',
      additionalFacts: [
        'Natural snowshoes: Snow leopards have large, powerful paws that act like natural snowshoes, helping them navigate their snowy habitat with ease',
        'Multi-purpose tail: They have long, thick tails that they use for balance during dramatic leaps and can wrap around their bodies for warmth while resting',
        'Solitary parenting: Snow leopards are solitary animals, and the mother raises the cubs alone until they are old enough to fend for themselves, usually around 18-24 months',
        'Incredible leaping ability: They are capable of leaping up to 50 feet (15 meters) in a single bound, an adaptation for hunting in steep, rugged terrain',
        'Elusive nature: Snow leopards are primarily nocturnal and extremely elusive, which makes them difficult to study in the wild and has earned them the nickname "ghost of the mountains"',
        'Conservation challenges: They face threats from habitat loss, climate change, poaching for their beautiful fur, and human-wildlife conflict due to livestock predation'
      ]
    },
    {
      id: '28',
      name: 'Strix',
      series: 'snow',
      part: 28,
      animalType: 'Snow Owl',
      description: 'A wise and majestic snowy owl who teaches friends about wisdom, keen observation, and the beauty of Arctic landscapes. Strix shows that being active during both day and night gives you unique perspectives on the world.',
      generalDescription: 'The snowy owl (Bubo scandiacus) is a large, white owl of the true owl family. It is notable for its striking appearance, with white plumage that often features dark spots or bars. Male snowy owls tend to be whiter than females, which have more extensive black or brown markings. They have yellow eyes, a black beak, and powerful talons.',
      skills: ['Day and Night Vision', 'Silent Flight', 'Arctic Survival', 'Prey Detection'],
      trivia: 'Strix is diurnal, meaning active during the day as well as at night! Unlike most owls, snowy owls hunt during daylight hours, which is likely an adaptation to the continuous daylight during Arctic summers.',
      personality: ['Wise', 'Observant', 'Majestic', 'Adaptable'],
      favoriteFood: 'Small mammals, particularly lemmings and voles',
      habitat: 'Snowy owls are native to the Arctic regions of North America and Eurasia. They breed in the treeless tundra and winter in open areas, often migrating southward to Canada, the northern United States, and parts of northern Europe and Asia when food is scarce.',
      color: 'from-white to-blue-200',
      icon: '🦉',
      image: strixImage,
      likes: ['Open tundra', 'Daylight hunting', 'Arctic winds', 'Migration adventures'],
      dislikes: ['Dense forests', 'Extreme weather', 'Food scarcity', 'Habitat disturbance'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Arctic regions: Native to Arctic territories of North America and Eurasia',
        'Treeless tundra: Primary breeding habitat providing open hunting grounds',
        'Open areas: Winter habitats including fields, prairies, and coastal regions',
        'Canada: Major wintering territory during southern migrations',
        'Northern United States: Seasonal habitat during winter food searches',
        'Northern Europe and Asia: Parts of range during migration and wintering periods'
      ],
      diet: [
        'Lemmings and voles: Primary prey species providing essential nutrition in Arctic environments',
        'Small mammals: Opportunistic hunting of rabbits and other small rodents',
        'Birds: Secondary prey when mammals are scarce, including waterfowl and songbirds',
        'Fish and carrion: Occasional feeding on aquatic prey and scavenged remains',
        'Day and night hunting: Using excellent vision and hearing to locate prey at all hours',
        'Population-dependent feeding: Diet fluctuates with prey availability, particularly lemming cycles'
      ],
      names: {
        adult: 'Snowy Owl (Bubo scandiacus - males tend to be whiter than females with more extensive markings)',
        baby: 'Owlet (snowy owl young hatch from eggs and are initially covered in white down feathers)'
      },
      mythology: [
        'Inuit mythology: Snowy owls are seen as symbols of guidance and protection, representing wisdom and the connection between earth and sky',
        'Popular culture: Gained widespread recognition due to Hedwig, Harry Potter\'s pet owl in the "Harry Potter" series, symbolizing loyalty and magical wisdom',
        'Arctic folklore: Featured in various indigenous stories as messengers and guides through harsh winter landscapes',
        'Cultural symbolism: Represent wisdom, patience, and adaptation across many northern cultures and traditions'
      ],
      otherNames: [
        'Arctic owl: Alternative name emphasizing their Arctic habitat and adaptations',
        'Great white owl: Name highlighting their impressive size and predominantly white plumage',
        'Ermine owl: Historical name referring to their white winter coloration similar to ermine fur',
        'Bubo scandiacus: Scientific name distinguishing them from other owl species',
        'Similar species: Barn owl (Tyto alba) and Great horned owl (Bubo virginianus), though snowy owls are distinct in white plumage and Arctic habitat'
      ],
      funFact: 'Unlike most owls, snowy owls are diurnal, meaning they are active during the day as well as at night. This behavior is likely an adaptation to the continuous daylight during Arctic summers. They have exceptional eyesight and can spot prey from great distances, making them incredibly effective hunters in the vast Arctic landscape.',
      additionalFacts: [
        'Impressive wingspan: Snowy owls have a wingspan of up to 5 feet (1.5 meters), making them powerful and graceful fliers',
        'Cold climate adaptations: Well adapted to harsh conditions with thick feathers covering even their legs and feet for insulation',
        'Longevity: Can live up to 10 years in the wild and even longer in captivity with proper care',
        'Solitary nature: They are solitary birds outside the breeding season, preferring to hunt and roost alone',
        'Population fluctuations: Their numbers fluctuate dramatically with the availability of prey, particularly lemming population cycles',
        'Migration patterns: Some individuals migrate great distances southward during winter when Arctic prey becomes scarce, creating exciting birding opportunities in temperate regions'
      ]
    },
    {
      id: '29',
      name: 'Snowflake',
      series: 'snow',
      part: 29,
      animalType: 'Snow Squirrel',
      description: 'A clever and resourceful Arctic ground squirrel who teaches friends about preparation, survival, and the importance of planning ahead. Snowflake shows that being prepared and working together can help overcome even the harshest challenges.',
      generalDescription: 'The Arctic ground squirrel (Urocitellus parryii) is a small rodent known for its distinctive seasonal behavior and adaptations to the extreme cold of the Arctic. It has a robust body, short legs, and a bushy tail. Its fur is a mixture of brown, gray, and white, providing camouflage against the tundra landscape. During winter, they enter a state of hibernation, which is crucial for their survival in such harsh conditions.',
      skills: ['Hibernation', 'Food Storage', 'Burrowing', 'Cold Survival'],
      trivia: 'Snowflake has one of the most extreme hibernation patterns of any mammal! During hibernation, their body temperature can drop to as low as -2.9 degrees Celsius (26.8 degrees Fahrenheit), which is below freezing!',
      personality: ['Resourceful', 'Prepared', 'Social', 'Clever'],
      favoriteFood: 'Plants, seeds, berries, mushrooms, and insects',
      habitat: 'Arctic ground squirrels are found in the tundra regions of North America, including Alaska and northwestern Canada. They inhabit areas with well-drained soils where they can dig extensive burrow systems.',
      color: 'from-amber-200 to-orange-300',
      icon: '���️',
      image: snowflakeImage,
      likes: ['Gathering food', 'Digging burrows', 'Colony life', 'Summer foraging'],
      dislikes: ['Harsh predators', 'Food scarcity', 'Flooded burrows', 'Extreme storms'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Alaska: Primary habitat across tundra regions with well-drained soils',
        'Northwestern Canada: Extensive range throughout Arctic territories',
        'Tundra regions: Specialized ecosystem with permafrost and seasonal changes',
        'Well-drained soils: Essential for extensive burrow system construction',
        'Arctic grasslands: Open areas providing foraging opportunities and visibility',
        'Permafrost areas: Underground habitat construction in frozen soil layers'
      ],
      diet: [
        'Plants and vegetation: Primary food source including Arctic grasses and herbs',
        'Seeds: Essential protein and fat storage for winter hibernation preparation',
        'Berries: Seasonal fruit providing crucial nutrients during short Arctic summer',
        'Mushrooms: Fungi supplement providing important minerals and nutrients',
        'Insects: High-protein food source when available during active months',
        'Small vertebrates and carrion: Opportunistic feeding when other food sources are scarce',
        'Intensive summer foraging: Building fat reserves essential for 8-month hibernation survival'
      ],
      names: {
        adult: 'Arctic Ground Squirrel (Urocitellus parryii - also called "parka squirrel" due to thick fur traditionally used by indigenous peoples)',
        baby: 'Pup (Arctic ground squirrel young born in underground burrows, initially blind and hairless)'
      },
      mythology: [
        'Arctic indigenous folklore: Often seen as symbols of preparedness and survival due to extensive food storage and hibernation habits',
        'Traditional food source: Important sustenance for Arctic indigenous communities during harsh winter months',
        'Fur utilization: Thick fur traditionally used by indigenous peoples to line parkas for warmth and protection',
        'Cultural wisdom: Represents the values of preparation, community cooperation, and surviving extreme conditions through planning'
      ],
      otherNames: [
        'Parka squirrel: Traditional name referencing the use of their thick fur for clothing insulation',
        'Urocitellus parryii: Scientific name honoring Arctic explorer William Edward Parry',
        'Columbian ground squirrel (Urocitellus columbianus): Similar species inhabiting more temperate regions with comparable burrowing habits',
        'Richardson\'s ground squirrel (Urocitellus richardsonii): Related species found in temperate areas, sharing similar social behaviors',
        'Arctic souslik: Alternative name used in some regions for ground squirrels adapted to cold climates'
      ],
      funFact: 'Arctic ground squirrels have one of the most extreme hibernation patterns of any mammal. During hibernation, their body temperature can drop to as low as -2.9 degrees Celsius (26.8 degrees Fahrenheit), which is below freezing. They have a unique ability to supercool their body fluids, preventing ice crystal formation in their tissues during this incredible survival adaptation!',
      additionalFacts: [
        'True hibernators: Can hibernate for up to 8 months, one of the longest hibernation periods in the animal kingdom',
        'Supercooling ability: Unique physiological adaptation preventing ice crystal formation in body fluids during sub-freezing hibernation',
        'Ecosystem engineers: Play crucial role aerating soil through extensive burrowing systems, improving tundra soil health',
        'Prey species importance: Serve as essential food source for Arctic predators including foxes, owls, bears, and other carnivores',
        'Complex communication: Use variety of vocalizations including alarm calls to warn colony members of approaching predators',
        'Highly social colonies: Live in cooperative communities sharing burrow systems, mutual grooming, and collective protection strategies',
        'Seasonal weight gain: Can increase body weight by up to 40% during summer to survive the long hibernation period'
      ]
    },
    {
      id: '30',
      name: 'Tatsu',
      series: 'snow',
      part: 30,
      animalType: 'Japanese Long-tail Tit',
      description: 'A delicate and charming Japanese Long-tailed Tit who teaches friends about balance, good fortune, and the beauty of seasonal changes. Tatsu shows that grace and agility can help navigate even the most challenging winter landscapes.',
      generalDescription: 'The Japanese Long-Tailed Tit (Aegithalos caudatus) is a small, distinctive bird species characterized by its long, slender tail, which often exceeds the length of its body. These birds possess a fluffy, rounded body with predominantly white and pinkish plumage. The combination of their striking tail feathers and petite size—around 13 cm in length—gives them a unique and delicate appearance. Their large eyes and energetic behavior add to their charming persona, making them a favorite among birdwatchers.',
      skills: ['Balance', 'Agility', 'Social Cooperation', 'Seasonal Adaptation'],
      trivia: 'Tatsu has an amazing habit of huddling together with friends in small groups during winter, forming mixed-species flocks where they share warmth, safety, and information about food sources!',
      personality: ['Graceful', 'Social', 'Energetic', 'Charming'],
      favoriteFood: 'Small insects, spiders, seeds, and berries',
      habitat: 'The Japanese Long-Tailed Tit is native to East Asia, with a primary distribution across Japan, including its main islands of Honshu, Shikoku, and Kyushu. Smaller populations can also be found in parts of China, Korea, and Taiwan. These birds are commonly found in wooded areas, gardens, and forests, particularly those with dense shrubbery where they can nest and forage efficiently.',
      color: 'from-pink-200 to-white',
      icon: '🐦',
      image: tatsuImage,
      likes: ['Mixed-species flocks', 'Dense shrubbery', 'Winter huddling', 'Foraging adventures'],
      dislikes: ['Predators', 'Harsh storms', 'Food scarcity', 'Isolation'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Japan: Primary distribution across main islands of Honshu, Shikoku, and Kyushu',
        'China: Smaller populations in specific regions with suitable forest habitat',
        'Korea: Limited populations in wooded areas and forest environments',
        'Taiwan: Small populations in mountainous and forested regions',
        'Wooded areas: Dense forests providing nesting and foraging opportunities',
        'Gardens and parks: Human-modified landscapes with adequate tree cover and shrub density'
      ],
      diet: [
        'Small insects: Primary food source providing essential protein for energy and growth',
        'Spiders and invertebrates: Important supplements during active foraging seasons',
        'Seeds: Secondary food source especially during colder months when insects are scarce',
        'Berries: Seasonal fruit providing crucial nutrients during autumn and winter periods',
        'Active foraging: Highly energetic behavior darting through branches using long tail for balance',
        'Seasonal variation: Diet shifts from invertebrates in spring/summer to seeds and berries in autumn/winter',
        'Cooperative feeding: Sharing food source information among mixed-species flocks for efficient foraging'
      ],
      names: {
        adult: 'Japanese Long-Tailed Tit (Aegithalos caudatus - Scientific name; Shima Enaga しまえなが in Japanese)',
        baby: 'Chick (Japanese Long-tailed Tit young born in carefully constructed nests, cared for by both parents until independence)'
      },
      mythology: [
        'Japanese cultural symbolism: Represents good fortune, happiness, and purity in traditional Japanese art and folklore',
        'Seasonal associations: Frequently depicted in traditional prints and paintings associated with changing seasons, especially winter renewal',
        'New Year imagery: Common motif during New Year period symbolizing renewal, joy of life, and fresh beginnings',
        'Divine messenger: In some Japanese mythology, considered a messenger from the divine carrying wishes for prosperity and protection',
        'Auspicious presence: Cheerful and lively nature seen as positive sign during festivals and celebrations, representing serenity and hope',
        'Art and literature: Embedded within national consciousness through frequent appearance in various forms of Japanese cultural expression'
      ],
      otherNames: [
        'Shima Enaga: Traditional Japanese name (しまえなが) emphasizing cultural significance and local identification',
        'Aegithalos caudatus: Scientific classification shared with related Eurasian Long-Tailed Tit species',
        'Eurasian Long-Tailed Tit: Closely related species found in Europe and mainland Asia with similar features',
        'Chinese Long-Tailed Tit: Related species found in mainland Asia sharing long tail and small body characteristics',
        'Black-Tailed Tit (Aegithalos melanurus): Another genus species with darker plumage and comparatively shorter tail than Japanese variety'
      ],
      funFact: 'One amazing fact about Tatsu and Japanese Long-Tailed Tits is their habit of huddling together in small groups during winter! These birds form mixed-species flocks where they seek warmth and safety from predators. Their social nature includes cooperative behaviors that help ensure group survival, and they share information about food sources among flock members. Their long tails aren\'t just for balance—they also play a crucial role in courtship displays and visual signaling to attract potential mates!',
      additionalFacts: [
        'High metabolic rate: Requires frequent feeding necessitating rapid movement between branches in constant search for sustenance',
        'Human adaptation: Remarkably resilient and well-adapted to human-modified landscapes, particularly suburban and rural areas with tree cover',
        'Courtship displays: Long tail feathers used in visual signaling during mating season, making tail crucial feature for reproductive success',
        'Winter flocking behavior: Forms mixed-species groups with other small birds like tits and warblers to enhance foraging opportunities and predator protection',
        'Nest construction: Builds elaborate, carefully woven nests using moss, lichen, and spider webs, often taking weeks to complete',
        'Agility and balance: Exceptional ability to navigate dense vegetation using long tail as counterbalance for accessing hard-to-reach feeding areas',
        'Cultural impact: Popular subject for wildlife photography and birdwatching, contributing to ecotourism and nature appreciation in Japan'
      ]
    },
    {
      id: '31',
      name: 'Frost',
      series: 'snow',
      part: 31,
      animalType: 'Snow Rabbit (Arctic Hare)',
      description: 'A resilient and resourceful Arctic hare who teaches friends about seasonal adaptation, survival skills, and the beauty of Arctic landscapes. Frost shows that being prepared and working together can help overcome any winter challenge.',
      generalDescription: 'The Arctic hare (Lepus arcticus) is a species of hare adapted to polar and mountainous habitats. It has a thick coat of fur that changes color with the seasons—white in winter to blend with the snow and blue-gray or brown in summer to match the rocks and vegetation. They have large hind legs and long ears, though shorter than those of other hares, to minimize heat loss.',
      skills: ['Seasonal Adaptation', 'Speed Running', 'Group Cooperation', 'Winter Survival'],
      trivia: 'Frost can run up to 60 kilometers per hour (37 miles per hour) to escape predators, making Arctic hares one of the fastest mammals in the Arctic!',
      personality: ['Resilient', 'Resourceful', 'Fast', 'Social'],
      favoriteFood: 'Woody plants, mosses, lichens, leaves, berries, and bark',
      habitat: 'Arctic hares are found in the tundra regions of the Arctic, including northern Canada, Greenland, and parts of Alaska. They inhabit areas with rocky outcrops and sparse vegetation, as well as open tundra.',
      color: 'from-blue-100 to-white',
      icon: '🐰',
      image: frostImage,
      likes: ['Group living', 'Winter shelter digging', 'Speed running', 'Arctic tundra exploration'],
      dislikes: ['Predators', 'Extreme storms', 'Food scarcity', 'Being alone in danger'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Northern Canada: Primary habitat across vast tundra regions with rocky outcrops and sparse vegetation',
        'Greenland: Extensive populations throughout Arctic coastal and inland tundra environments',
        'Alaska: Northern regions with suitable Arctic tundra and mountainous polar habitats',
        'Rocky outcrops: Preferred areas providing shelter, protection, and elevated viewpoints for predator detection',
        'Open tundra: Vast Arctic plains offering foraging opportunities and group living spaces',
        'Sparse vegetation areas: Regions with scattered Arctic plants providing essential food sources and camouflage'
      ],
      diet: [
        'Woody plants: Primary food source including Arctic shrubs and small trees providing essential nutrients',
        'Mosses and lichens: Important cold-weather food sources rich in minerals and easily digestible',
        'Leaves and berries: Seasonal supplements providing vitamins and energy during warmer periods',
        'Bark and twigs: Winter emergency food from willow and other Arctic shrubs when other sources are scarce',
        'Winter foraging: Digging through snow to find buried vegetation and accessing food beneath surface',
        'Seasonal diet variation: Adapting food choices based on availability and harsh Arctic weather conditions',
        'Group foraging: Cooperating with other hares to locate and access food sources more efficiently'
      ],
      names: {
        adult: 'Arctic Hare (Lepus arcticus - Scientific name; also known as Polar Rabbit)',
        baby: 'Leveret (Arctic hare young born in shallow ground depressions, well-furred with eyes open for early independence)'
      },
      mythology: [
        'Arctic indigenous cultures: Seen as symbol of resilience and resourcefulness in harsh Arctic environments',
        'Traditional food source: Important for Inuit and other indigenous peoples providing meat and warm fur for clothing',
        'Cultural survival symbol: Represents ability to thrive in extreme conditions through adaptation and cooperation',
        'Arctic folklore: Featured in traditional stories about surviving harsh winters and finding food in barren landscapes',
        'Seasonal wisdom: Associated with teachings about preparation, timing, and working together during difficult times',
        'Indigenous crafts: Fur traditionally used for warm clothing, boots, and essential survival gear in Arctic regions'
      ],
      otherNames: [
        'Polar Rabbit: Alternative common name emphasizing Arctic habitat and cold climate adaptation',
        'Lepus arcticus: Scientific classification identifying species within Arctic hare family',
        'Snowshoe Hare (Lepus americanus): Similar species known for large hind feet preventing sinking into snow',
        'Mountain Hare (Lepus timidus): Related species that also changes coat color seasonally but inhabits temperate regions',
        'Varying Hare: General term for hares that change coat color with seasons for camouflage purposes'
      ],
      funFact: 'Amazing fact about Frost and Arctic hares: they can run up to 60 kilometers per hour (37 miles per hour) to escape predators, making them one of the fastest mammals in the Arctic! Their incredible speed combined with their seasonal color-changing coat makes them perfectly adapted for Arctic survival. They also live in groups, especially during winter, which provides better protection against predators and helps them share warmth in extreme cold!',
      additionalFacts: [
        'Group living benefits: Often live in groups especially during winter providing better protection against predators and shared warmth',
        'Enhanced senses: Keen eyesight and excellent hearing help detect predators from long distances across open tundra',
        'Winter shelter strategies: Dig shelters in snowdrifts and huddle together in groups to stay warm in extreme cold',
        'High reproductive rate: Females typically give birth to several leverets each year ensuring species survival in harsh conditions',
        'Arctic food web importance: Serve as crucial prey for Arctic foxes, wolves, and birds of prey maintaining ecosystem balance',
        'Seasonal coat adaptation: Thick fur changes from white in winter for snow camouflage to blue-gray or brown in summer for rock blending',
        'Energy conservation: Shorter ears than other hare species minimize heat loss in extremely cold Arctic temperatures',
        'Snow navigation: Large hind legs and specialized feet help them move efficiently across deep snow and icy terrain'
      ]
    },
    {
      id: '32',
      name: 'Arctic',
      series: 'snow',
      part: 32,
      animalType: 'Snow Fox (Arctic Fox)',
      description: 'A cunning and adaptable Arctic fox who teaches friends about survival, resourcefulness, and the magic of seasonal transformation. Arctic shows that being clever and prepared can help overcome any winter challenge.',
      generalDescription: 'The snow fox, also known as the Arctic fox (Vulpes lagopus), is a small fox native to the Arctic regions. It has a compact body with thick fur that changes color with the seasons: white in winter to blend with the snow and brown or gray in summer for camouflage against the tundra landscape. The Arctic fox has a bushy tail, short legs, and rounded ears, all adaptations to minimize heat loss.',
      skills: ['Seasonal Camouflage', 'Winter Survival', 'Cunning Intelligence', 'Temperature Adaptation'],
      trivia: 'Arctic has the warmest fur of any mammal, which helps survive in temperatures as low as -50 degrees Celsius (-58 degrees Fahrenheit)! The fur is so insulating that Arctic can maintain a core body temperature of 38 degrees Celsius (100.4 degrees Fahrenheit) even in freezing conditions!',
      personality: ['Cunning', 'Adaptable', 'Resourceful', 'Independent'],
      favoriteFood: 'Small mammals like lemmings and voles, birds, eggs, fish, and carrion',
      habitat: 'Arctic foxes are found throughout the Arctic and sub-Arctic regions, including Alaska, Canada, Greenland, Iceland, Norway, Sweden, and Russia. They inhabit tundra and coastal areas, as well as pack ice.',
      color: 'from-white to-blue-200',
      icon: '🦊',
      image: arcticImage,
      likes: ['Seasonal transformation', 'Pack ice exploration', 'Scavenging adventures', 'Snow hunting'],
      dislikes: ['Polar bear encounters', 'Food scarcity', 'Extreme storms', 'Wolf competition'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Alaska: Northern Arctic tundra regions with coastal access and abundant prey opportunities',
        'Canada: Vast Arctic territories including tundra, coastal areas, and pack ice environments',
        'Greenland: Extensive Arctic habitats with seasonal ice formations and marine ecosystems',
        'Iceland: Sub-Arctic regions providing unique volcanic tundra and coastal hunting grounds',
        'Norway: Arctic archipelagos and northern coastal areas with seasonal ice coverage',
        'Sweden: Northern Arctic regions with tundra landscapes and seasonal hunting opportunities',
        'Russia: Siberian Arctic territories including vast tundra expanses and pack ice access'
      ],
      diet: [
        'Small mammals: Primary diet consisting of lemmings and voles providing essential protein and energy',
        'Birds and eggs: Seasonal supplements from Arctic bird species and ground-nesting opportunities',
        'Fish and marine life: Coastal and pack ice hunting providing omega-rich nutrition and variety',
        'Carrion and scavenging: Opportunistic feeding following polar bears and wolves for leftover meals',
        'Summer additions: Berries, seaweed, and insects providing vitamins during warmer months',
        'Polar bear following: Strategic scavenging behavior maximizing food opportunities in harsh environment',
        'Opportunistic adaptation: Flexible feeding strategies adjusting to seasonal availability and environmental changes'
      ],
      names: {
        adult: 'Arctic Fox (Vulpes lagopus - Scientific name; also known as White Fox, Polar Fox, or Snow Fox)',
        baby: 'Kit, Pup, or Cub (Arctic fox young born in dens, initially covered in dark fur which lightens as they grow)'
      },
      mythology: [
        'Inuit mythology: Often depicted as trickster figure similar to coyote in Native American tales, representing cunning and adaptability',
        'Norse mythology: Believed to have connection with god Loki, known for cunning and trickery, embodying cleverness and transformation',
        'Arctic indigenous cultures: Featured in folklore as symbol of survival, resourcefulness, and seasonal wisdom in harsh environments',
        'Cultural trickster archetype: Represents intelligence, adaptability, and ability to thrive through wit rather than strength',
        'Seasonal transformation symbolism: Associated with change, adaptation, and ability to reinvent oneself for survival',
        'Traditional hunting respect: Indigenous cultures honor Arctic fox for fur quality and survival skills in extreme conditions'
      ],
      otherNames: [
        'White Fox: Alternative name emphasizing winter coat coloration and Arctic habitat specialization',
        'Polar Fox: Common name highlighting Arctic polar region habitat and extreme cold adaptation',
        'Snow Fox: Descriptive name focusing on snowy environment and seasonal camouflage abilities',
        'Vulpes lagopus: Scientific classification distinguishing from other fox species through Arctic specialization',
        'Red Fox (Vulpes vulpes): Similar species with more widespread distribution and characteristic reddish coat coloration',
        'Fennec Fox (Vulpes zerda): Desert-adapted relative known for large ears and hot climate specialization'
      ],
      funFact: 'Amazing fact about Arctic and Arctic foxes: they have the warmest fur of any mammal, which helps them survive in temperatures as low as -50 degrees Celsius (-58 degrees Fahrenheit)! Their fur is so incredibly insulating that they can maintain a core body temperature of 38 degrees Celsius (100.4 degrees Fahrenheit) even in freezing conditions. They also have keen senses of smell and hearing that allow them to detect prey beneath the snow, and they\'re known to follow polar bears to scavenge leftovers from their kills!',
      additionalFacts: [
        'Enhanced senses: Keen smell and hearing abilities allowing detection of prey beneath snow from considerable distances',
        'High reproductive rate: Capable of producing litters up to 14 kits ensuring species survival in harsh Arctic conditions',
        'Perfect camouflage: Seasonal fur color changes provide excellent camouflage vital for hunting and evading larger predators',
        'Polar bear partnership: Strategic following behavior scavenging leftovers from polar bear kills maximizing food opportunities',
        'Solitary nature: Independent animals forming pairs only during breeding season then returning to solitary survival strategies',
        'Temperature extremes: Specialized adaptations including compact body, short legs, rounded ears minimizing heat loss in severe cold',
        'Pack ice navigation: Ability to travel and hunt on shifting pack ice accessing marine food sources and seasonal territories',
        'Winter den construction: Skilled at creating insulated snow dens for shelter during extreme weather and kit-rearing periods'
      ]
    },
    {
      id: '34',
      name: 'Thorne',
      series: 'pets',
      part: 34,
      animalType: 'Dog',
      description: 'A loyal and friendly dog who demonstrates unconditional love, loyalty, and the joy of friendship. Thorne shows that true companionship and devotion make the world a better place.',
      generalDescription: 'Dogs are domesticated mammals known for their loyalty, companionship, and diverse roles in human society. They vary greatly in size, shape, and appearance due to selective breeding. Dogs have keen senses of smell and hearing, which make them excellent hunters, herders, and companions.',
      skills: ['Loyalty', 'Friendship', 'Protection', 'Joy'],
      trivia: 'Thorne can sense emotions and always knows exactly when someone needs a friend or a hug! With over 340 different breeds, dogs are one of the most diverse species on Earth.',
      personality: ['Loyal', 'Friendly', 'Joyful', 'Caring'],
      favoriteFood: 'Treats and kibble',
      habitat: 'Dogs are found all over the world, living in a wide range of environments from urban settings to rural areas and wilderness. They have adapted to various climates and terrains due to their close association with humans.',
      color: 'from-amber-400 to-orange-500',
      icon: '🐕',
      image: thorneImage,
      likes: ['Playing fetch', 'Belly rubs', 'Meeting new people', 'Protecting family'],
      dislikes: ['Being left alone', 'Loud noises', 'Bath time', 'Vacuum cleaners'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Worldwide: Found in all continents except Antarctica',
        'Urban settings: Cities and suburban neighborhoods',
        'Rural areas: Farms, ranches, and countryside',
        'Wilderness: Remote areas with human settlements',
        'Various climates: Adapted to tropical, temperate, arctic, and desert environments'
      ],
      diet: [
        'Dogs are omnivores, primarily eating a diet that includes:',
        'Meat: Beef, chicken, lamb, and fish (primary protein source)',
        'Vegetables: Carrots, peas, green beans, and sweet potatoes',
        'Grains: Rice, oats, and wheat',
        'Commercial dog food: Specially formulated kibble and wet food',
        'Home-cooked or raw diets: Some owners provide fresh prepared meals'
      ],
      names: {
        adult: 'Dog',
        baby: 'Puppy'
      },
      mythology: [
        'Greek Mythology: Cerberus, the three-headed dog, guards the entrance to the underworld',
        'Norse Mythology: Garm is a guardian dog associated with Hel, the realm of the dead',
        'Egyptian Mythology: Anubis, the god of mummification and the afterlife, is often depicted with a canine head',
        'Chinese Culture: Dogs are one of the 12 animals of the Chinese zodiac, symbolizing loyalty and protection'
      ],
      otherNames: [
        'Other Names: Canine',
        'Similar Species: Wolves (ancestors), Foxes, Coyotes',
        'Scientific name: Canis familiaris'
      ],
      funFact: 'Dogs have been bred for various tasks, resulting in over 340 different breeds recognized by the Fédération Cynologique Internationale (FCI). These breeds range from tiny Chihuahuas to massive Great Danes, each with unique traits and abilities.',
      additionalFacts: [
        'Communication: Dogs communicate through barking, growling, whining, and body language. They use these signals to express emotions and intentions',
        'Sense of Smell: A dog\'s sense of smell is 10,000 to 100,000 times more acute than that of humans, allowing them to detect scents from great distances and even identify individual people by smell',
        'Roles: Dogs have diverse roles, including service dogs for the disabled, search and rescue dogs, therapy dogs, and working dogs in law enforcement and the military',
        'Intelligence: Dogs can understand up to 250 words and gestures, count up to five, and perform simple mathematical calculations'
      ]
    },
    {
      id: '33',
      name: 'Calico',
      series: 'pets',
      part: 33,
      animalType: 'Cat',
      description: 'An independent and playful cat who demonstrates grace, curiosity, and the value of self-reliance. Calico teaches that being independent doesn\'t mean being alone.',
      generalDescription: 'Cats, also known as domestic cats or house cats, are small, carnivorous mammals that belong to the Felidae family. They have a flexible body, quick reflexes, sharp retractable claws, and teeth adapted to killing small prey. Cats are known for their agility, playfulness, and independence.',
      skills: ['Agility', 'Stealth', 'Independence', 'Playfulness'],
      trivia: 'Calico can rotate her ears 180 degrees and has excellent night vision, able to see in light levels six times lower than what a human needs!',
      personality: ['Independent', 'Curious', 'Playful', 'Graceful'],
      favoriteFood: 'Fish and mice',
      habitat: 'Domestic cats are found worldwide and can adapt to a variety of environments. They thrive in urban, suburban, and rural areas. Wild relatives of domestic cats, such as the African wildcat, are native to various regions in Africa, the Middle East, and Central Asia.',
      color: 'from-orange-400 to-pink-300',
      icon: '🐱',
      image: calicoImage,
      likes: ['Chasing toys', 'Sunny spots', 'Climbing high places', 'Grooming herself'],
      dislikes: ['Water', 'Loud noises', 'Being picked up unexpectedly', 'Closed doors'],
      booksFeatures: [
        'New Title still to be released'
      ],
      locations: [
        'Worldwide: Domestic cats found on all inhabited continents',
        'Urban areas: Cities and apartment buildings',
        'Suburban neighborhoods: Houses with yards and gardens',
        'Rural settings: Farms and countryside',
        'Wild relatives: Africa, Middle East, Central Asia (African wildcat)'
      ],
      diet: [
        'Cats are obligate carnivores, requiring meat in their diet:',
        'Small prey: Rodents, birds, and insects in the wild',
        'Protein-rich foods: Essential for their health and energy',
        'Commercial cat food: Specially formulated kibble and wet food',
        'Nutritional needs: High protein, vitamins, and minerals',
        'Hunting instinct: Natural predators of small animals'
      ],
      names: {
        adult: 'Cat',
        baby: 'Kitten',
        group: 'Clowder (group of cats), Litter (group of kittens)'
      },
      mythology: [
        'Ancient Egypt: Cats were considered sacred and associated with the goddess Bastet. They were often mummified and buried with their owners',
        'Japanese Culture: The "Maneki-neko" or beckoning cat is a popular symbol of good fortune and luck',
        'Norse Mythology: Cats were associated with the goddess Freyja, who had a chariot pulled by cats'
      ],
      otherNames: [
        'Other Names: Felis catus, domestic cat, house cat',
        'Similar Species: Wildcat (Felis silvestris), Bobcat (Lynx rufus), Lynx, Cheetah (Acinonyx jubatus)',
        'Scientific name: Felis catus'
      ],
      funFact: 'Cats have a unique grooming behavior where they use their tongue to clean their fur. Their tongue has tiny, hook-like structures called papillae that help remove loose fur and dirt.',
      additionalFacts: [
        'Cats can rotate their ears 180 degrees, allowing them to hear in all directions',
        'They have excellent night vision and can see in light levels six times lower than what a human needs',
        'Cats have a specialized collarbone (clavicle) that allows them to always land on their feet when they fall, a skill known as the "righting reflex"',
        'Purring: Cats purr at a frequency of 25-150 Hz, which has been shown to promote healing and reduce stress'
      ]
    }
  ];

  const filteredCharacters = characters.filter(character => 
    activeCategory === 'all' || character.series === activeCategory
  );

  // Sort characters by part number to ensure correct sequence
  const sortedCharacters = [...filteredCharacters].sort((a, b) => a.part - b.part);

  const getSeriesIcon = (series: string) => {
    switch (series) {
      case 'forest': return <TreePine className="w-4 h-4" />;
      case 'water': return <Waves className="w-4 h-4" />;
      case 'snow': return <Snowflake className="w-4 h-4" />;
      case 'predators': return <Crown className="w-4 h-4" />;
      case 'pets': return <Home className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const CharacterCard = ({ character }: { character: Character }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Card 
        className="cursor-pointer hover:shadow-xl transition-all duration-300 h-full border-0 overflow-hidden"
        onClick={() => setSelectedCharacter(character)}
      >
        <CardContent className="p-3 bg-gray-400/30 backdrop-blur-lg border border-gray-300/40 shadow-lg h-full flex flex-col bg-[rgba(130,150,153,0.21)]">
          <div className="aspect-square rounded-xl mb-3 relative backdrop-blur-sm bg-gray-200/20 border border-gray-300/30 shadow-md overflow-hidden">
            {character.image ? (
              <>
                <ImageWithFallback
                  src={character.image}
                  alt={`${character.name} the ${character.animalType}`}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-10`} />
              </>
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${character.color} flex items-center justify-center text-4xl`}>
                <span className="drop-shadow-lg">{character.icon}</span>
              </div>
            )}
            <Badge className="absolute top-2 right-2 text-xs font-semibold bg-gray-800/80 backdrop-blur-md border-gray-600/50">
              Part {character.part}
            </Badge>
          </div>
          
          <div className="space-y-1.5 flex-1 flex flex-col">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                {getSeriesIcon(character.series)}
              </div>
              <h3 className="font-semibold text-sm truncate flex-1 text-[rgb(3,43,63)]">{character.name}</h3>
            </div>
            <p className="text-xs text-[rgb(37,45,56)] font-medium">{character.animalType}</p>
            <p className="text-xs text-[rgb(0,0,0)] line-clamp-2 leading-relaxed">{character.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="h-full overflow-y-auto bg-background gallery-screen">
      {/* Back Button */}
      <BackButton onBack={() => window.history.back()} />
      
      <div className="p-6 space-y-6 screen-transparent-bg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Character Gallery
          </h1>
          <p className="text-[rgba(40,40,42,1)]">
            Meet all 36+ characters from Rooted Tales adventures!
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { key: 'all', label: 'All', icon: <Star className="w-4 h-4" /> },
              { key: 'forest', label: 'Forest', icon: <TreePine className="w-4 h-4" /> },
              { key: 'water', label: 'Water', icon: <Waves className="w-4 h-4" /> },
              { key: 'snow', label: 'Snow', icon: <Snowflake className="w-4 h-4" /> },
              { key: 'predators', label: 'Predators', icon: <Crown className="w-4 h-4" /> },
              { key: 'pets', label: 'Pets', icon: <Home className="w-4 h-4" /> }
            ].map((category) => (
              <Button
                key={category.key}
                variant={activeCategory === category.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category.key)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {category.icon}
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Character Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3 pb-4"
        >
          <AnimatePresence>
            {sortedCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Character Detail Dialog */}
      <Dialog open={!!selectedCharacter} onOpenChange={() => setSelectedCharacter(null)}>
        <DialogContent className="max-w-[95%] w-[95%] max-h-[85vh] p-0 overflow-hidden">
          <DialogHeader className="pt-[0px] pr-[88px] pb-[0px] pl-[0px]">
            <DialogTitle className="text-center leading-tight">
              Meet {selectedCharacter?.name} the {selectedCharacter?.animalType}
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              Learn about {selectedCharacter?.name}'s adventures and personality
            </DialogDescription>
          </DialogHeader>
          
          {selectedCharacter && (
            <ScrollArea className="max-h-[calc(85vh-100px)]">
              <div className="space-y-4 px-4 pb-4">
                {/* Character Image */}
                <div className="flex justify-center mb-4">
                  {selectedCharacter.image ? (
                    <div className="relative">
                      <ImageWithFallback
                        src={selectedCharacter.image}
                        alt={`${selectedCharacter.name} the ${selectedCharacter.animalType}`}
                        className="w-24 h-24 object-cover rounded-lg shadow-lg border border-white/30"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${selectedCharacter.color} rounded-lg opacity-20`} />
                    </div>
                  ) : (
                    <div className={`w-24 h-24 bg-gradient-to-br ${selectedCharacter.color} rounded-lg flex items-center justify-center text-4xl border border-white/20 shadow-lg`}>
                      <span className="drop-shadow-lg">{selectedCharacter.icon}</span>
                    </div>
                  )}
                </div>

                {/* Character Details */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 gap-0.5 h-auto p-1">
                    <TabsTrigger value="overview" className="px-1 py-2 text-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="px-1 py-2 text-xs">
                      <Zap className="w-3.5 h-3.5" />
                    </TabsTrigger>
                    <TabsTrigger value="personality" className="px-1 py-2 text-xs">
                      <Heart className="w-3.5 h-3.5" />
                    </TabsTrigger>
                    <TabsTrigger value="bio" className="px-1 py-2 text-xs">
                      <BookOpen className="w-3.5 h-3.5" />
                    </TabsTrigger>
                    <TabsTrigger value="details" className="px-1 py-2 text-xs">
                      <Shield className="w-3.5 h-3.5" />
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-3 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-sm">About {selectedCharacter.name}</h3>
                      <p className="text-xs text-muted-foreground break-words leading-relaxed">{selectedCharacter.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2 text-sm">Fun Fact</h3>
                      <p className="text-xs text-muted-foreground break-words leading-relaxed">{selectedCharacter.trivia}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-3 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-sm">Special Skills</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCharacter.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs break-words">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="personality" className="space-y-3 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-sm">Personality Traits</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCharacter.personality.map((trait, index) => (
                          <Badge key={index} variant="outline" className="text-xs break-words">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-sm">Likes</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCharacter.likes.map((like, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200 text-xs break-words">
                            {like}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-sm">Dislikes</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCharacter.dislikes.map((dislike, index) => (
                          <Badge key={index} className="bg-red-100 text-red-800 hover:bg-red-200 text-xs break-words">
                            {dislike}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bio" className="space-y-3 mt-4">
                    {selectedCharacter.generalDescription && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm">General Description</h3>
                        <p className="text-xs text-muted-foreground break-words leading-relaxed">{selectedCharacter.generalDescription}</p>
                      </div>
                    )}

                    {selectedCharacter.booksFeatures && selectedCharacter.booksFeatures.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5" />
                          Featured in Books
                        </h3>
                        <div className="space-y-1.5">
                          {selectedCharacter.booksFeatures.map((book, index) => (
                            <div key={index} className="text-xs text-muted-foreground bg-blue-50 p-2 rounded break-words leading-relaxed">
                              📖 {book}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedCharacter.locations && selectedCharacter.locations.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          Natural Locations
                        </h3>
                        <div className="space-y-1.5">
                          {selectedCharacter.locations.map((location, index) => (
                            <div key={index} className="text-xs bg-purple-50 text-purple-800 p-2 rounded break-words leading-relaxed">
                              📍 {location}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedCharacter.diet && selectedCharacter.diet.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm">Diet</h3>
                        <div className="space-y-1.5">
                          {selectedCharacter.diet.map((food, index) => (
                            <div key={index} className="text-xs bg-orange-50 text-orange-800 p-2 rounded break-words leading-relaxed">
                              🍽️ {food}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedCharacter.names && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm">Names</h3>
                        <div className="space-y-2">
                          <div className="text-xs break-words bg-gray-50 p-2 rounded leading-relaxed">
                            <span className="font-medium">Adult:</span> {selectedCharacter.names.adult}
                          </div>
                          <div className="text-xs break-words bg-gray-50 p-2 rounded leading-relaxed">
                            <span className="font-medium">Baby:</span> {selectedCharacter.names.baby}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedCharacter.mythology && selectedCharacter.mythology.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm">Mythology & Cultural Significance</h3>
                        <div className="space-y-1.5">
                          {selectedCharacter.mythology.map((myth, index) => (
                            <div key={index} className="text-xs text-muted-foreground bg-yellow-50 p-2 rounded break-words leading-relaxed">
                              ✨ {myth}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedCharacter.otherNames && selectedCharacter.otherNames.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm">Other Names & Similar Species</h3>
                        <div className="space-y-1.5">
                          {selectedCharacter.otherNames.map((name, index) => (
                            <div key={index} className="text-xs text-muted-foreground bg-gray-50 p-2 rounded break-words leading-relaxed">
                              • {name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedCharacter.funFact && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm">Amazing Fun Fact</h3>
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-200">
                          <p className="text-xs text-muted-foreground italic break-words leading-relaxed">💡 {selectedCharacter.funFact}</p>
                        </div>
                      </div>
                    )}

                    {selectedCharacter.additionalFacts && selectedCharacter.additionalFacts.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm">Additional Facts</h3>
                        <div className="space-y-1.5">
                          {selectedCharacter.additionalFacts.map((fact, index) => (
                            <div key={index} className="text-xs text-muted-foreground bg-indigo-50 p-2 rounded break-words leading-relaxed">
                              • {fact}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="details" className="space-y-3 mt-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-xs mb-1">Series</h4>
                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                          {getSeriesIcon(selectedCharacter.series)}
                          <span className="text-xs capitalize break-words">{selectedCharacter.series}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs mb-1">Part</h4>
                        <p className="text-xs text-muted-foreground bg-gray-50 p-2 rounded break-words">Part {selectedCharacter.part}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs mb-1">Habitat</h4>
                        <p className="text-xs text-muted-foreground bg-gray-50 p-2 rounded break-words leading-relaxed">{selectedCharacter.habitat}</p>
                      </div>
                      {selectedCharacter.favoriteFood && (
                        <div>
                          <h4 className="font-semibold text-xs mb-1">Favorite Food</h4>
                          <p className="text-xs text-muted-foreground bg-gray-50 p-2 rounded break-words leading-relaxed">{selectedCharacter.favoriteFood}</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
