import React from 'react';
import { ArrowLeft, Play, Bookmark, Share2, Volume2, Star, Pause as PauseIcon, StopCircle, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BackButton } from './BackButton';
import { Theme, User } from '../App';
import rustyBookCover from 'figma:asset/ebb58a2ba4a0993173180ff612fa43fda252af78.png';
import akaiBookCover from 'figma:asset/fe0e85d237426482e6c2de130a4f58cc512cd41f.png';
import oceanOdysseyBookCover from 'figma:asset/ad8630553bb17fbdecae960e3d0f203dd39c376d.png';
import curiousRaccoonsCover from 'figma:asset/0697701a4e4f11976dd3f5e37bf95191a659553c.png';
import quokkaQuestCover from 'figma:asset/df7f69fe4bd2c1323ff6e402d01b6945ce6bdff5.png';
import seaOtterCover from 'figma:asset/69fed43ec8af9a8774f3bb08b17a077f8b4f76f4.png';
import cozyKoalaCover from 'figma:asset/ce79a7c11724b2d1bfc337bcaa2ea79e12907506.png';
import treasureFriendshipCover from 'figma:asset/b7135ad237819d35487a64537eb8304fd6695bf1.png';
import playfulMonkeysCover from 'figma:asset/fc515718ef7b54c3c4c093fb1adfaf2e92c6bbb8.png';
import joyfulElephantCover from 'figma:asset/d31aae0e00a3c032d67c4eb7593caca3d5691733.png';
import wiseOwlsCover from 'figma:asset/90d5a28f34539dea0a471c5f5b6f610864688220.png';
import lostReindeerCover from 'figma:asset/aae5ee3f19923d74b5219228f0053c8918f85a85.png';

interface BookOverviewProps {
  user: User | null;
  theme: Theme;
  selectedBookId?: string;
  onBack: () => void;
  onStartReading: (bookId: string) => void;
  onPauseReading?: (bookId: string) => void;
  onStopReading?: (bookId: string) => void;
}

export const BookOverview: React.FC<BookOverviewProps> = ({
  user,
  theme,
  selectedBookId = '1',
  onBack,
  onStartReading,
  onPauseReading,
  onStopReading
}) => {
  const booksData = {
    '1': {
      id: 'rusty-red-panda',
      title: 'The Adventures of Rusty the Red Panda',
      author: 'Rooted Tales',
      rating: 4.8,
      ageRange: '3-8 years',
      readTime: '15 minutes',
      category: 'Forest Tales',
      image: rustyBookCover,
      isBookmarked: user?.readingProgress?.['rusty-red-panda'] ? true : false,
      overview: `Once upon a time, in the lush green forests of the Himalayas, lived a friendly and adventurous red panda named Rusty. Rusty loved exploring the forest and playing with his animal friends, but he often felt lonely because he was the only red panda in the forest.

One day, Rusty met a group of young explorers who were hiking through the forest. The explorers were fascinated by Rusty's fluffy tail and adorable face, and Rusty was happy to have found new friends.

The explorers introduced Rusty to their world of games and adventures, and Rusty introduced them to the hidden wonders of the forest. Together, they went on exciting expeditions, discovered new trails, and made unforgettable memories.

But one day, Rusty's animal friends in the forest were in trouble, and Rusty had to leave his new friends to help them. The explorers were sad to see Rusty go, but they understood the importance of helping those in need.

After Rusty saved his friends, he realized that he had learned a valuable lesson about the importance of friendship and being there for others. Rusty was happy to be back in the forest with his animal friends, but he also knew that he had made some wonderful new friends in the explorers.

And so, Rusty continued to explore the forest and make new friends, always remembering the value of loyalty, kindness, and adventure.`
    },
    '2': {
      id: 'akai-red-panda-reunion',
      title: 'The Adventures of Akai the Red Panda: A Heartwarming Panda Reunion',
      author: 'Rooted Tales',
      rating: 4.9,
      ageRange: '3-8 years',
      readTime: '35 minutes',
      category: 'Forest Adventures',
      image: akaiBookCover,
      isBookmarked: user?.readingProgress?.['akai-red-panda-reunion'] ? true : false,
      overview: `In "The Adventures of Akai the Red Panda: A Heartwarming Panda Reunion," Akai, a curious and energetic red panda, embarks on a journey to visit his cousin panda in the distant bamboo forest.

Along the way, Akai encounters various challenges and makes new friends, including mischievous monkeys, wise old owls, and playful squirrels.

As Akai continues his adventure, he learns valuable lessons about friendship, teamwork, and the importance of family bonds.

Through heartwarming moments and exciting escapades, Akai and his cousin panda create cherished memories together, forging a lasting connection between their two worlds.

With vibrant illustrations and engaging storytelling, this enchanting tale captures the spirit of exploration, discovery, and the enduring power of family love.

"The Adventures of Akai the Red Panda: A Heartwarming Panda Reunion" is a delightful storybook that inspires young readers to embrace new adventures.`
    },
    '3': {
      id: 'akai-kaito-ocean-odyssey',
      title: 'Akai and Kaito in the Great Ocean Odyssey',
      author: 'Rooted Tales',
      rating: 4.8,
      ageRange: '3-8 years',
      readTime: '32 minutes',
      category: 'Water Adventures',
      image: oceanOdysseyBookCover,
      isBookmarked: user?.readingProgress?.['akai-kaito-ocean-odyssey'] ? true : false,
      overview: `In a lush green forest, Akai, a cheerful red panda, meets Kaito, a tiny sea turtle who is lost and far from his ocean home. Determined to help, Akai embarks on a journey with Kaito, guiding him through forests, streams, and beautiful landscapes. Along the way, their friendship blossoms as they laugh, explore, and marvel at nature's wonders.

When they finally reach the ocean, Kaito is overjoyed and invites Akai to swim with him. Together, they dive into the vibrant underwater world, meeting new friends—Squiggle and Sage, playful sea creatures. But their adventure takes a dangerous turn when a fierce storm strikes, tossing them in violent waves. Braving the tempest together, they hold on to each other, proving that their bond is unbreakable.

After surviving the storm, they discover a magical island filled with golden sands and hidden treasures. Yet, they realize that the real treasure is their friendship, stronger than any storm. As their journey comes to an end, they return home—Kaito to the sea and Akai to the forest—knowing that though their adventure is over, their friendship will last forever.`
    },
    '4': {
      id: 'akai-curious-raccoons',
      title: 'Akai the Red Panda and The Curious Raccoons',
      author: 'Rooted Tales',
      rating: 4.9,
      ageRange: '3-8 years',
      readTime: '28 minutes',
      category: 'Forest Adventures',
      image: curiousRaccoonsCover,
      isBookmarked: user?.readingProgress?.['akai-curious-raccoons'] ? true : false,
      overview: `Akai the red panda, a curious and adventurous soul, loves exploring every corner of his vibrant forest home. One sunny afternoon, he stumbles upon the playful raccoons, led by the mischievous Riku, who invite him into their den beneath an ancient oak tree. Intrigued, Akai joins them, and together they embark on a day full of excitement—climbing trees, leaping through branches, and discovering hidden wonders.

The adventure deepens when Riku proposes a treasure hunt, presenting a crinkled map with riddles leading to a hidden prize. Working together, Akai and the raccoons solve the clues, learning the value of teamwork and problem-solving along the way. After finding the treasure, they celebrate with a forest feast, sharing stories and laughter as the sun sets.

As night falls, they gather around a crackling fire, exchanging tales and teaching each other new skills—Akai shows them the beauty of the treetops, while the raccoons impress him with their clever tricks. Filled with gratitude and friendship, Akai bids them farewell, returning home with a heart full of joy and a deeper appreciation for the forest.

In the days that follow, Akai continues his explorations with a renewed sense of belonging, cherishing both old and new friendships. The forest, once just a place of wonder, now feels like a warm embrace, filled with endless possibilities. With his friends by his side, Akai eagerly anticipates each new adventure, knowing that the forest holds countless more treasures and memories waiting to be discovered.`
    },
    '5': {
      id: 'akai-quokka-quest',
      title: 'Akai and The Red Panda and The Quokka Quest',
      author: 'Rooted Tales',
      rating: 4.9,
      ageRange: '3-8 years',
      readTime: '30 minutes',
      category: 'Forest Adventures',
      image: quokkaQuestCover,
      isBookmarked: user?.readingProgress?.['akai-quokka-quest'] ? true : false,
      overview: `In a vibrant bamboo forest near a misty mountain, a curious red panda named Akai discovers a group of cheerful quokkas—small, bushy-tailed creatures from a distant island. Excited to make new friends, Akai welcomes them, and they quickly bond over dances, songs, and games. The quokkas introduce Akai to their lively culture, teaching him about teamwork and community.

However, their joy is interrupted when the quokkas reveal a troubling problem: a vital plant that sustains their island is disappearing, and it may be affecting Akai's forest as well. Determined to help, Akai and the quokkas embark on a quest, journeying through forests, streams, and cliffs. Along the way, they face challenges that test their courage, but their unity and resilience help them overcome every obstacle.

Their adventure leads them to a hidden grove, where they find the rare plant thriving. Relieved and triumphant, they realize their teamwork has saved both their homes. When the quokkas eventually return to their island, Akai bids them a heartfelt goodbye, knowing their friendship will last despite the distance.

Back in his bamboo forest, Akai reflects on the journey, grateful for the lessons learned. He now understands the power of friendship and unity, carrying the memories of his quokka friends in his heart. With newfound hope, he faces the future knowing that true friends will always stand by him, no matter how far apart they may be.`
    },
    '6': {
      id: 'akai-sea-otter-tale',
      title: 'Akai and the Tale of The Sea Otter',
      author: 'Rooted Tales',
      rating: 4.8,
      ageRange: '3-8 years',
      readTime: '26 minutes',
      category: 'Water Adventures',
      image: seaOtterCover,
      isBookmarked: user?.readingProgress?.['akai-sea-otter-tale'] ? true : false,
      overview: `The story begins with Kaito, a young and wise sea turtle, calling his friend Akai, a playful red panda, to share an exciting tale. Akai eagerly listens as Kaito recounts the adventure of Mizuto, a brave and cheerful sea otter who loves exploring the ocean. One day, Mizuto discovers a magical glowing shell on the shore, which reveals a map leading to a hidden, treasure-filled cave.

Determined to uncover its secrets, Mizuto sets off on a journey across the vast ocean. Along the way, he meets a group of friendly dolphins who join him, guiding him through the waves. Together, they reach the glowing cave, filled with dazzling treasures like pearls, sea stars, and rare crystals. Instead of keeping the riches for himself, Mizuto invites the dolphins inside, realizing that true treasure is meant to be shared with friends.

After celebrating in the cave, Mizuto returns home and shares his discoveries with his other friends, who rejoice in his adventure. The story ends with a joyful feast under the stars, where Mizuto reflects on the greatest treasure of all—friendship.

Inspired by Mizuto's tale, Kaito and Akai decide to embark on their own adventures someday, promising to cherish the magic of friendship just as Mizuto did. The story celebrates curiosity, bravery, and the joy of sharing with loved ones.`
    },
    '7': {
      id: 'akai-cozy-koala-adventure',
      title: 'Akai Remarkable Adventure with The Cozy Koala',
      author: 'Rooted Tales',
      rating: 4.8,
      ageRange: '3-8 years',
      readTime: '28 minutes',
      category: 'Forest Adventures',
      image: cozyKoalaCover,
      isBookmarked: user?.readingProgress?.['akai-cozy-koala-adventure'] ? true : false,
      overview: `In the enchanting bamboo forests of Memory Lane, a curious red panda named Akai yearns for adventure. One radiant morning, driven by wonder, Akai sets off on a life-changing journey. Along the way, he meets a joyful group of quokkas—Skip, Mimi, and Bounce—who welcome him with warmth and tales of their adventures.

Inspired by their stories about koalas, Akai and his new friends travel deeper into the forest to find the fabled Koala Kingdom. There, they encounter serene, charismatic koalas living among the eucalyptus trees. The animals quickly bond, sharing laughter, games, and stories, forming lasting friendships.

Eventually, Akai must return home. Though parting is bittersweet, the love and memories he carries sustain him. Back in his bamboo grove, Akai shares the magic of his journey with others, proving that the friendships and discoveries made along Memory Lane live on in the heart, forever unchanged by distance.`
    },
    '8': {
      id: 'akai-hedge-treasure-friendship',
      title: 'Akai and Hedge: The Treasure of Friendship',
      author: 'Rooted Tales',
      rating: 4.7,
      ageRange: '3-8 years',
      readTime: '32 minutes',
      category: 'Forest Adventures',
      image: treasureFriendshipCover,
      isBookmarked: user?.readingProgress?.['akai-hedge-treasure-friendship'] ? true : false,
      overview: `"Akai and Hedge: The Treasure of Friendship" follows the journey of Akai, a curious and adventurous red panda, and Hedge, a spunky hedgehog with a thirst for exploration. The story unfolds in the lush bamboo forests of Memory Lane, where Akai, seeking something beyond his familiar surroundings, crosses paths with Hedge, who dreams of discovering the world.

Their bond forms quickly, driven by their shared passion for adventure. The two friends embark on a journey when Hedge stumbles upon a mysterious map that leads to a hidden treasure located at the summit of a distant mountain. As they navigate through dense forests, thick fog, and rugged terrain, Akai's doubts are met with Hedge's unwavering optimism and clever solutions to the challenges they face.

Throughout their journey, Akai learns the value of trust and teamwork as they solve puzzles, overcome physical obstacles, and persevere through harsh weather conditions. As they reach the mountain's summit, they find the glowing treasure—a crystal with mysterious powers. However, the true value of their journey lies not in the treasure they find, but in the friendship they forged, the lessons learned, and the memories made.

The story concludes with Akai and Hedge returning home, their bond stronger than ever, and ready to embark on new adventures. Through their experience, they discover that the most valuable treasures in life are not material, but the relationships and moments shared along the way.

This heartwarming tale is an exploration of friendship, adventure, and the idea that the greatest rewards often come from the journey itself rather than the destination.`
    },
    '9': {
      id: 'akai-playful-monkeys',
      title: 'Akai with The Playful Monkeys',
      author: 'Rooted Tales',
      rating: 4.6,
      ageRange: '3-8 years',
      readTime: '26 minutes',
      category: 'Forest Adventures',
      image: playfulMonkeysCover,
      isBookmarked: user?.readingProgress?.['akai-playful-monkeys'] ? true : false,
      overview: `"Akai and the Playful Monkeys" is a heartwarming tale of adventure, friendship, and the joy of play. The story follows Akai, a curious and somewhat reserved red panda, who stumbles upon a troop of lively monkeys in the vibrant jungle. Initially cautious and unsure of their wild antics, Akai is gradually drawn into their playful world.

The monkeys, known for their mischievous nature and endless energy, invite Akai to join their favorite game—tag. Although hesitant at first, Akai soon finds himself laughing and having fun, discovering the excitement of carefree play. As the day progresses, the monkeys propose a swinging contest, and despite Akai's initial doubts about his skills, he surprises everyone with his unique approach, blending his climbing skills with the monkeys' swinging techniques.

When a sudden storm hits the jungle, the monkeys' unwavering joy and playful spirit teach Akai to embrace the rain, showing him that every moment—no matter how challenging—can be transformed into fun. After the storm clears, Akai reflects on the true meaning of play. He realizes that it's not just about having fun, but about embracing life's ups and downs, finding joy in every experience, and cherishing the bonds we form with others.

In the end, Akai bids farewell to the monkeys, promising to return for more adventures, now with a renewed perspective on the importance of play, laughter, and camaraderie. The story emphasizes the value of letting go, enjoying the present moment, and embracing the joy of connection with others.`
    },
    '10': {
      id: 'akai-joyful-elephant',
      title: 'Akai and The Joyful Elephant',
      author: 'Rooted Tales',
      rating: 4.8,
      ageRange: '3-8 years',
      readTime: '29 minutes',
      category: 'Forest Adventures',
      image: joyfulElephantCover,
      isBookmarked: user?.readingProgress?.['akai-joyful-elephant'] ? true : false,
      overview: `"Akai and the Joyful Elephant" is a heartwarming tale of friendship and adventure between Akai, a curious red panda, and Ella, a joyful and playful elephant. The story begins when Akai, intrigued by a mysterious sound, ventures into the forest and meets Ella, whose exuberant personality and love for dancing bring an immediate bond between the two. Ella's morning routine involves splashing in the river and singing, something Akai finds both puzzling and captivating. Initially shy and hesitant, Akai slowly becomes more comfortable and joins in the fun.

As their friendship deepens, Akai and Ella embark on playful adventures, including a game of hide-and-seek in the forest, where they learn to appreciate each other's unique qualities. Akai is small and quick, while Ella is large and clever, and through this game, they understand that their differences only make their bond stronger. Their next adventure takes them along the river, where Akai, although initially uncertain about keeping up with Ella, finds the confidence to explore and enjoy the journey together.

By the end of their adventures, Akai realizes that the true power of friendship lies in the joy of shared experiences. He understands that even though they are very different, their unique strengths complement each other perfectly, making their friendship even more special. The story ends with Akai and Ella promising to continue exploring the world together, their bond stronger than ever, and with a renewed appreciation for the beauty of life's simple pleasures.

This story highlights the value of friendship, embracing differences, and finding joy in the present moment, making it a warm and uplifting read.`
    },
    '11': {
      id: 'akai-wise-owls',
      title: 'Akai\'s lessons with The Wise Owls',
      author: 'Rooted Tales',
      rating: 4.9,
      ageRange: '3-8 years',
      readTime: '25 minutes',
      category: 'Forest Adventures',
      image: wiseOwlsCover,
      isBookmarked: user?.readingProgress?.['akai-wise-owls'] ? true : false,
      overview: `"Akai and the Wise Owls" is a thoughtful and enriching tale that follows Akai, a curious red panda, on a quest to seek wisdom from the legendary Wise Owls of the forest. Akai, eager to learn more about life, sets out on a journey to find the owls, known for their deep understanding and insightful teachings.

As Akai meets the owls, he is introduced to a series of valuable lessons that shape his understanding of wisdom. The first lesson reveals that true wisdom comes from within and is not simply about finding answers, but about seeking understanding. The second lesson teaches Akai the importance of patience, showing him that wisdom often requires time and quiet observation. The third lesson emphasizes empathy, explaining that wisdom is deeply rooted in understanding others' perspectives and showing compassion.

By the end of the story, Akai learns the most important lesson of all: that wisdom is a lifelong journey, not a destination. He discovers that wisdom is about continuous growth, reflection, and connection with others, and that each lesson he learns will contribute to his personal development throughout life.

This story highlights the value of introspection, patience, empathy, and the ongoing pursuit of knowledge. Through Akai's journey, readers are reminded that wisdom is not something that can be rushed, but rather a path of constant learning and understanding.`
    },
    '12': {
      id: 'akai-lost-reindeer',
      title: 'Akai and The Lost Reindeer',
      author: 'Rooted Tales',
      rating: 4.8,
      ageRange: '3-8 years',
      readTime: '27 minutes',
      category: 'Snow Adventures',
      image: lostReindeerCover,
      isBookmarked: user?.readingProgress?.['akai-lost-reindeer'] ? true : false,
      overview: `"Akai and the Lost Reindeer" is a heartwarming tale that follows the journey of Akai, a gentle red panda, and Finn, a lost baby reindeer, through the forest. When Akai finds Finn wandering alone and scared, he decides to help the little reindeer find his way back to his family. Along the way, Akai teaches Finn important lessons about courage, trust, and the strength that comes from friendship.

The story takes the two friends through various challenges, such as crossing a fast-moving river and climbing a steep mountain. Through each obstacle, Finn learns to overcome his fears with Akai's support, growing more confident and capable as they journey together. The bond between Akai and Finn deepens, illustrating the power of kindness, patience, and teamwork.

At the end of their adventure, Akai successfully reunites Finn with his family, and Finn, now brave and strong, thanks Akai for his guidance. Akai, feeling fulfilled, leaves the forest knowing that the true gift of the journey was the friendship they formed and the growth they both experienced.

This story emphasizes themes of friendship, compassion, and personal growth, showing how even the smallest acts of kindness can help others discover their own strength and courage.`
    }
  };

  const bookData = booksData[selectedBookId] || booksData['1'];

  // Get last read page from user progress
  const lastReadPage = user?.readingProgress?.[bookData.id] || 0;
  const hasProgress = lastReadPage > 0;

  const handleBookmark = () => {
    // Toggle bookmark functionality would be implemented here
    console.log('Bookmark toggled');
  };

  const handleShare = () => {
    // Share functionality would be implemented here
    console.log('Share book');
  };
  
  const handlePause = () => {
    if (onPauseReading) {
      onPauseReading(bookData.id);
    }
  };
  
  const handleStop = () => {
    if (onStopReading) {
      onStopReading(bookData.id);
    }
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'forest':
        return {
          primary: 'text-green-700',
          accent: 'bg-green-100 text-green-800',
          button: 'bg-green-600 hover:bg-green-700'
        };
      case 'ocean':
        return {
          primary: 'text-blue-700',
          accent: 'bg-blue-100 text-blue-800',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'sunset':
        return {
          primary: 'text-orange-700',
          accent: 'bg-orange-100 text-orange-800',
          button: 'bg-orange-600 hover:bg-orange-700'
        };
      case 'night':
        return {
          primary: 'text-indigo-700',
          accent: 'bg-indigo-100 text-indigo-800',
          button: 'bg-indigo-600 hover:bg-indigo-700'
        };
      default:
        return {
          primary: 'text-green-700',
          accent: 'bg-green-100 text-green-800',
          button: 'bg-green-600 hover:bg-green-700'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <div className="h-full overflow-y-auto pb-4">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <BackButton
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </BackButton>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className="p-2"
            >
              <Bookmark 
                className={`w-5 h-5 ${bookData.isBookmarked ? 'fill-current' : ''}`} 
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="p-2"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Book Cover and Basic Info */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <ImageWithFallback
                  src={bookData.image}
                  alt={bookData.title}
                  className="w-24 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
              
              <div className="flex-1 space-y-2">
                <h1 className={`text-xl ${themeColors.primary}`}>
                  {bookData.title}
                </h1>
                
                <p className="text-muted-foreground">
                  by {bookData.author}
                </p>
                
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{bookData.rating}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className={themeColors.accent}>
                    {bookData.ageRange}
                  </Badge>
                  <Badge variant="secondary" className={themeColors.accent}>
                    {bookData.readTime}
                  </Badge>
                  <Badge variant="secondary" className={themeColors.accent}>
                    {bookData.category}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {hasProgress && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <BookOpen className="w-4 h-4" />
                <span>Last read: Page {lastReadPage + 1}</span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-3 gap-3">
          <Button 
            onClick={() => onStartReading(bookData.id)}
            className={`${themeColors.button} text-white`}
          >
            <Play className="w-4 h-4 mr-1" />
            {hasProgress ? 'Continue' : 'Okay'}
          </Button>
          
          {onPauseReading && (
            <Button 
              variant="outline"
              onClick={handlePause}
              className="border-gray-300"
            >
              <PauseIcon className="w-4 h-4 mr-1" />
              Pause
            </Button>
          )}
          
          {onStopReading && (
            <Button 
              variant="outline"
              onClick={handleStop}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <StopCircle className="w-4 h-4 mr-1" />
              Stop
            </Button>
          )}
          
          <Button variant="outline" size="icon">
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Overview Section */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className={`text-lg ${themeColors.primary}`}>
              Book Overview
            </h2>
            
            <Separator />
            
            <div className="space-y-4">
              {bookData.overview.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed text-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Features */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className={`${themeColors.primary}`}>
              Features
            </h3>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Interactive Reading</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Audio Narration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Character Gallery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Mini Games</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reading Progress (if user has started) */}
        {user?.readingProgress?.[bookData.id] && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className={`${themeColors.primary}`}>
                Your Progress
              </h3>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Reading Progress</span>
                  <span>{Math.round(user.readingProgress[bookData.id] * 100)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${themeColors.button} transition-all duration-300`}
                    style={{ width: `${user.readingProgress[bookData.id] * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};