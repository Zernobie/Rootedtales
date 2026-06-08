// Badge system utilities

export interface BadgeData {
  id: string;
  name: string;
  description: string;
  requirement: string;
  category: 'login' | 'reading' | 'games' | 'collection' | 'special';
}

export const ALL_BADGES: BadgeData[] = [
  {
    id: 'first-login',
    name: 'First Steps',
    description: 'Logged in for the first time',
    requirement: 'Login once',
    category: 'login'
  },
  {
    id: 'streak-3',
    name: 'Dedicated Reader',
    description: 'Maintained a 3-day login streak',
    requirement: '3-day streak',
    category: 'login'
  },
  {
    id: 'streak-7',
    name: 'Weekly Champion',
    description: 'Maintained a 7-day login streak',
    requirement: '7-day streak',
    category: 'login'
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: 'Maintained a 30-day login streak',
    requirement: '30-day streak',
    category: 'login'
  },
  {
    id: 'books-5',
    name: 'Book Collector',
    description: 'Completed 5 books',
    requirement: 'Complete 5 books',
    category: 'reading'
  },
  {
    id: 'books-10',
    name: 'Library Expert',
    description: 'Completed 10 books',
    requirement: 'Complete 10 books',
    category: 'reading'
  },
  {
    id: 'games-10',
    name: 'Game Master',
    description: 'Played 10 mini games',
    requirement: 'Play 10 games',
    category: 'games'
  },
  {
    id: 'points-100',
    name: 'Point Collector',
    description: 'Earned 100 game points',
    requirement: 'Earn 100 points',
    category: 'games'
  },
  {
    id: 'all-characters',
    name: 'Character Expert',
    description: 'Unlocked all character bios',
    requirement: 'View all characters',
    category: 'collection'
  }
];

/**
 * Check if a user has earned any new badges based on their current achievements
 * @param user - The user object with achievements
 * @returns Array of newly unlocked badge IDs
 */
export function checkNewBadges(user: any): string[] {
  if (!user || user.isGuest) return [];

  const unlockedBadges = user.achievements?.unlockedBadges || [];
  const newBadges: string[] = [];

  // Check reading badges
  const booksCompleted = user.achievements?.booksCompleted || 0;
  if (booksCompleted >= 5 && !unlockedBadges.includes('books-5')) {
    newBadges.push('books-5');
  }
  if (booksCompleted >= 10 && !unlockedBadges.includes('books-10')) {
    newBadges.push('books-10');
  }

  // Check game badges
  const gamesPlayed = user.achievements?.miniGamesPlayed || 0;
  const gamePoints = user.gamePoints || 0;
  if (gamesPlayed >= 10 && !unlockedBadges.includes('games-10')) {
    newBadges.push('games-10');
  }
  if (gamePoints >= 100 && !unlockedBadges.includes('points-100')) {
    newBadges.push('points-100');
  }

  // Check login streak badges (handled by DailyReward component)
  // These are included here for completeness but should be checked on login

  return newBadges;
}

/**
 * Award new badges to a user and return updated user object
 * @param user - The user object
 * @param newBadgeIds - Array of badge IDs to award
 * @returns Updated user object with new badges
 */
export function awardBadges(user: any, newBadgeIds: string[]): any {
  if (!user || newBadgeIds.length === 0) return user;

  const currentBadges = user.achievements?.unlockedBadges || [];
  const uniqueNewBadges = newBadgeIds.filter(id => !currentBadges.includes(id));

  if (uniqueNewBadges.length === 0) return user;

  return {
    ...user,
    achievements: {
      ...user.achievements,
      unlockedBadges: [...currentBadges, ...uniqueNewBadges]
    }
  };
}

/**
 * Get badge information by ID
 * @param badgeId - The badge ID to look up
 * @returns Badge data or undefined if not found
 */
export function getBadgeById(badgeId: string): BadgeData | undefined {
  return ALL_BADGES.find(badge => badge.id === badgeId);
}

/**
 * Calculate streak bonus points based on current streak
 * @param streak - Current login streak
 * @returns Bonus points for the streak
 */
export function calculateStreakBonus(streak: number): number {
  if (streak < 7) return 0;
  return Math.floor(streak / 7) * 10;
}

/**
 * Get daily reward points based on day in cycle (1-7)
 * @param dayInCycle - Day number (1-7)
 * @returns Points for that day
 */
export function getDailyRewardPoints(dayInCycle: number): number {
  const rewards = [10, 15, 20, 25, 30, 40, 50];
  const index = ((dayInCycle - 1) % 7);
  return rewards[index];
}
