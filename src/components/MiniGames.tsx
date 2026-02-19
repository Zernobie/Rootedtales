import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BackButton } from './BackButton';
import { 
  Gamepad2, 
  Trophy, 
  Play, 
  RotateCcw, 
  Star,
  Target,
  Brain,
  Puzzle,
  Grid3x3,
  Crown,
  ArrowLeft,
  Pause,
  XCircle,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Flame,
  Award,
  TrendingUp,
  Medal,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { User } from '../App';
import { toast } from 'sonner@2.0.3';
import { GameCompletionPopup } from './GameCompletionPopup';
import { MazeHuntGame } from './MazeHuntGameRedesigned';
import { fetchCharacters, fetchBooks, Character as DataCharacter, Book } from '../utils/dataSync';

interface MiniGamesProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Use the Character type from dataSync
type Character = DataCharacter;

type GameType = 'maze-hunt' | 'trivia' | 'word-puzzle' | 'memory-match' | null;

export function MiniGames({ user, setUser }: MiniGamesProps) {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentGameInLevel, setCurrentGameInLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [lastGameScore, setLastGameScore] = useState(0);
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState<any>(null);
  
  // State for dynamically loaded characters and books
  const [characters, setCharacters] = useState<Character[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load characters and books from backend on mount
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [charactersData, booksData] = await Promise.all([
          fetchCharacters(),
          fetchBooks()
        ]);
        setCharacters(charactersData);
        setBooks(booksData);
        console.log(`✅ Loaded ${charactersData.length} characters and ${booksData.length} books for mini games`);
      } catch (error) {
        console.error('Error loading game data:', error);
        toast.error('Failed to load game data', {
          description: 'Using default character set'
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const games = [
    {
      id: 'maze-hunt',
      name: 'Maze Hunt',
      icon: Target,
      description: 'Find path to habitat',
      color: 'from-purple-500 to-pink-500',
      levels: 20
    },
    {
      id: 'trivia',
      name: 'Character Trivia',
      icon: Brain,
      description: 'Test your knowledge',
      color: 'from-blue-500 to-cyan-500',
      levels: 20
    },
    {
      id: 'word-puzzle',
      name: 'Word Puzzle',
      icon: Puzzle,
      description: 'Spell character names',
      color: 'from-green-500 to-emerald-500',
      levels: 20
    },
    {
      id: 'memory-match',
      name: 'Memory Match',
      icon: Grid3x3,
      description: 'Match character pairs',
      color: 'from-orange-500 to-red-500',
      levels: 20
    }
  ];

  const handleStartGame = (gameId: string) => {
    setSelectedGame(gameId as GameType);
    setCurrentLevel(1);
    setCurrentGameInLevel(1);
    setScore(0);
    setIsPaused(false);
    toast.success(`Starting ${games.find(g => g.id === gameId)?.name}!`, {
      description: 'Good luck! 🎮',
    });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    toast.info(isPaused ? 'Game resumed' : 'Game paused');
  };

  const handleRestart = () => {
    setCurrentLevel(1);
    setCurrentGameInLevel(1);
    setScore(0);
    setIsPaused(false);
    toast.info('Game restarted!');
  };

  const handleEndGame = () => {
    // Update user stats and save to localStorage
    if (user && !user.isGuest) {
      const updatedUser = {
        ...user,
        achievements: {
          ...user.achievements,
          miniGamesPlayed: (user.achievements.miniGamesPlayed || 0) + 1
        },
        gamePoints: (user.gamePoints || 0) + score
      };
      setUser(updatedUser);
      
      // Persist to localStorage immediately
      localStorage.setItem('rootedTalesUser', JSON.stringify(updatedUser));
      
      toast.success(`Game ended! You earned ${score} points! 🎉`, {
        description: `Total: ${updatedUser.gamePoints} points • ${updatedUser.achievements.miniGamesPlayed} games played`,
      });
    }
    
    setSelectedGame(null);
    setCurrentLevel(1);
    setCurrentGameInLevel(1);
    setScore(0);
    setIsPaused(false);
  };

  const handleNextGame = () => {
    // Store current score before moving to next game
    const currentGameScore = score;
    setLastGameScore(currentGameScore);
    
    // Increment games won for badge tracking
    if (user && !user.isGuest) {
      const previousGamesWon = user.achievements.gamesWon || 0;
      const newGamesWon = previousGamesWon + 1;
      
      const updatedUser = {
        ...user,
        achievements: {
          ...user.achievements,
          gamesWon: newGamesWon
        }
      };
      setUser(updatedUser);
      localStorage.setItem('rootedTalesUser', JSON.stringify(updatedUser));
      
      // Check if a badge was just unlocked
      const badges = [
        { count: 5, id: 'game-starter', name: 'Game Starter', description: 'Discovered the fun of games', icon: Gamepad2, color: 'from-orange-300 to-orange-400', requirement: 'Play any game 5 times' },
        { count: 10, id: 'skill-sharer', name: 'Skill Sharer', description: 'Developing game mastery', icon: Target, color: 'from-orange-400 to-orange-500', requirement: 'Win 10 mini-games' },
        { count: 25, id: 'challenge-champion', name: 'Challenge Champion', description: 'Rising to every challenge', icon: Medal, color: 'from-orange-500 to-red-500', requirement: 'Win 25 mini-games' },
        { count: 50, id: 'arcade-ace', name: 'Arcade Ace', description: 'Dominating the game arena', icon: Trophy, color: 'from-red-500 to-pink-500', requirement: 'Win 50 mini-games' },
        { count: 100, id: 'sunset-master', name: '🎮 Sunset Master', description: 'Legendary game champion', icon: Crown, color: 'from-pink-500 via-orange-500 to-yellow-500', requirement: 'Win 100 mini-games' }
      ];
      
      const unlockedBadge = badges.find(b => b.count === newGamesWon);
      
      if (unlockedBadge) {
        setNewBadgeUnlocked(unlockedBadge);
      } else {
        setNewBadgeUnlocked(null);
      }
      
      // Show completion popup
      setShowCompletionPopup(true);
    }

    // Don't automatically proceed - wait for popup to close
  };
  
  const handleContinueAfterPopup = () => {
    setShowCompletionPopup(false);
    setNewBadgeUnlocked(null);
    
    if (currentGameInLevel < 10) {
      setCurrentGameInLevel(currentGameInLevel + 1);
    } else if (currentLevel < 20) {
      setCurrentLevel(currentLevel + 1);
      setCurrentGameInLevel(1);
    } else {
      toast.success('Congratulations! All levels completed! 🏆');
      handleEndGame();
    }
  };

  // Helper function to update user stats in real-time
  const updateUserStats = (pointsEarned: number) => {
    if (user && !user.isGuest) {
      const updatedUser = {
        ...user,
        gamePoints: (user.gamePoints || 0) + pointsEarned
      };
      setUser(updatedUser);
      localStorage.setItem('rootedTalesUser', JSON.stringify(updatedUser));
    }
  };

  // Game controls component
  const GameControls = () => (
    <div className="flex items-center justify-center gap-1 p-2 bg-muted/50 rounded-lg">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setSelectedGame(null)}
        className="h-8 px-2"
      >
        <ArrowLeft className="w-3 h-3" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handlePause}
        className="h-8 px-2"
      >
        <Pause className="w-3 h-3" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleRestart}
        className="h-8 px-2"
      >
        <RotateCcw className="w-3 h-3" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="h-8 px-2"
      >
        {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={handleEndGame}
        className="h-8 px-2 text-xs"
      >
        <XCircle className="w-3 h-3 mr-1" />
        Exit
      </Button>
    </div>
  );

  // Game header component
  const GameHeader = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">
            Level {currentLevel} - Game {currentGameInLevel}/10
          </h3>
          <p className="text-sm text-muted-foreground">
            Score: {score} points
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <Trophy className="w-3 h-3 mr-1" />
          {user?.gamePoints || 0} Total Points
        </Badge>
      </div>
      
      <Progress value={(currentGameInLevel / 10) * 100} className="h-2" />
    </div>
  );

  if (selectedGame === 'maze-hunt') {
    return (
      <>
        <MazeHuntGame characters={characters} onBack={handleEndGame} onScore={(points) => setScore(score + points)} gameHeader={<GameHeader />} gameControls={<GameControls />} isPaused={isPaused} onNextGame={handleNextGame} currentLevel={currentLevel} currentGameInLevel={currentGameInLevel} />
        <GameCompletionPopup
          show={showCompletionPopup}
          score={lastGameScore}
          totalGamesWon={user?.achievements?.gamesWon || 0}
          newBadge={newBadgeUnlocked}
          onContinue={handleContinueAfterPopup}
        />
      </>
    );
  }

  if (selectedGame === 'trivia') {
    return (
      <>
        <TriviaGame characters={characters} onBack={handleEndGame} onScore={(points) => setScore(score + points)} gameHeader={<GameHeader />} gameControls={<GameControls />} isPaused={isPaused} onNextGame={handleNextGame} />
        <GameCompletionPopup
          show={showCompletionPopup}
          score={lastGameScore}
          totalGamesWon={user?.achievements?.gamesWon || 0}
          newBadge={newBadgeUnlocked}
          onContinue={handleContinueAfterPopup}
        />
      </>
    );
  }

  if (selectedGame === 'word-puzzle') {
    return (
      <>
        <WordPuzzleGame characters={characters} onBack={handleEndGame} onScore={(points) => setScore(score + points)} gameHeader={<GameHeader />} gameControls={<GameControls />} isPaused={isPaused} onNextGame={handleNextGame} />
        <GameCompletionPopup
          show={showCompletionPopup}
          score={lastGameScore}
          totalGamesWon={user?.achievements?.gamesWon || 0}
          newBadge={newBadgeUnlocked}
          onContinue={handleContinueAfterPopup}
        />
      </>
    );
  }

  if (selectedGame === 'memory-match') {
    return (
      <>
        <MemoryMatchGame characters={characters} onBack={handleEndGame} onScore={(points) => setScore(score + points)} gameHeader={<GameHeader />} gameControls={<GameControls />} isPaused={isPaused} onNextGame={handleNextGame} />
        <GameCompletionPopup
          show={showCompletionPopup}
          score={lastGameScore}
          totalGamesWon={user?.achievements?.gamesWon || 0}
          newBadge={newBadgeUnlocked}
          onContinue={handleContinueAfterPopup}
        />
      </>
    );
  }

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="h-full overflow-y-auto bg-gradient-to-b from-background via-background to-primary/5">
        <div className="p-6 space-y-6 pb-24">
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Gamepad2 className="w-16 h-16 text-purple-500" />
            </motion.div>
            <p className="text-lg font-medium text-gray-700">Loading game data...</p>
            <p className="text-sm text-gray-500">Syncing characters and books from library</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-background via-background to-primary/5">
      <div className="p-6 space-y-6 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-3xl -z-10" />
          <div className="flex items-center justify-center mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Gamepad2 className="w-10 h-10 text-purple-500 mr-3" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Mini Games
            </h1>
          </div>
          <p className="text-gray-700">
            Play fun games and earn rewards!
          </p>
          {characters.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {characters.length} characters • {books.length} books loaded
            </p>
          )}
        </motion.div>

        {/* Progress Overview Card */}
        {user && !user.isGuest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-white via-white to-primary/5 border-2 border-primary/20 shadow-xl overflow-hidden">
              <CardContent className="p-6 relative">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <p className="text-xs text-gray-600 mb-1">Total Points</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {user.gamePoints || 0}
                    </p>
                    <p className="text-[10px] text-gray-600 mt-1">Game Points</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                    <p className="text-xs text-gray-600 mb-1">Games Played</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      {user.achievements.miniGamesPlayed || 0}
                    </p>
                    <p className="text-[10px] text-gray-600 mt-1">Total Sessions</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-black">Your Progress</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <span className="font-medium">Keep playing!</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Games Grid - 2 Column Layout like Badge Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card 
                  className="relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border-2 border-primary/20 shadow-lg hover:shadow-2xl cursor-pointer h-full"
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-5 pointer-events-none`} />
                  
                  <CardContent className="pt-5 pb-4 px-3 relative">
                    <div className="flex flex-col items-center text-center space-y-2">
                      {/* Game Icon */}
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${game.color} shadow-lg`}>
                        <Icon className="w-7 h-7 text-white drop-shadow-md" />
                      </div>
                      
                      {/* Game Name */}
                      <div>
                        <h3 className="font-bold text-sm text-black leading-tight">
                          {game.name}
                        </h3>
                        <p className="text-[10px] text-gray-600 mt-0.5 line-clamp-2">
                          {game.description}
                        </p>
                      </div>
                      
                      {/* Levels Info */}
                      <div className="w-full pt-2 border-t border-gray-200">
                        <div className="flex items-center justify-center gap-1 text-[10px] text-gray-600 mb-2">
                          <Target className="w-3 h-3" />
                          <span>{game.levels} Levels • 10 Games Each</span>
                        </div>
                        
                        {/* Play Button */}
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartGame(game.id);
                          }}
                          size="sm"
                          className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white border-0 h-8 text-xs shadow-md`}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Play Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* How to Play Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-white via-white to-primary/5 border-2 border-primary/20 shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-black">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                How to Play
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <Star className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Each game has 20 levels with 10 games per level</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Earn points by completing games successfully</span>
                </li>
                <li className="flex items-start gap-2">
                  <Flame className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Use Pause, Restart, or End Game controls anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span>Complete all levels to become a master!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Games use live character data from Gallery & Library!</span>
                </li>
              </ul>
              
              {/* Data Sync Status */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium text-gray-600">Data Sync Status:</span>
                  <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200">
                    <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                    {characters.length} Characters Synced
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// Maze Hunt Game Component - Now imported from MazeHuntGameRedesigned.tsx

// Maze Hunt Game Component
function MazeHuntGame({ characters, onBack, onScore, gameHeader, gameControls, isPaused, onNextGame, currentLevel, currentGameInLevel }: any) {
  const [maze, setMaze] = useState<number[][]>([]);
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [goalPos, setGoalPos] = useState({ x: 0, y: 0 });
  const [currentChar, setCurrentChar] = useState<Character | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isComplete, setIsComplete] = useState(false);
  const [mazeSize, setMazeSize] = useState({ rows: 9, cols: 9 });

  // Generate maze using recursive backtracking algorithm with multiple paths
  const generateMaze = (rows: number, cols: number) => {
    // Initialize maze with walls (1)
    const newMaze = Array(rows).fill(null).map(() => Array(cols).fill(1));
    
    // Carve paths using recursive backtracker
    const carve = (x: number, y: number) => {
      const directions = [
        [0, -2], [2, 0], [0, 2], [-2, 0]
      ].sort(() => Math.random() - 0.5);
      
      newMaze[y][x] = 0; // Mark as path
      
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && newMaze[ny][nx] === 1) {
          newMaze[y + dy / 2][x + dx / 2] = 0; // Carve path between cells
          carve(nx, ny);
        }
      }
    };
    
    carve(1, 1);
    
    // Ensure start is clear
    newMaze[1][1] = 0;
    
    // Create additional random paths to make multiple solutions
    // Add more paths for higher difficulty and multiple routes
    const additionalPaths = Math.floor((rows * cols) / 30); // Scale with maze size
    for (let i = 0; i < additionalPaths; i++) {
      const x = Math.floor(Math.random() * (cols - 2)) + 1;
      const y = Math.floor(Math.random() * (rows - 2)) + 1;
      if (newMaze[y][x] === 1) {
        // Try to connect to an existing path
        const neighbors = [
          [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]
        ];
        const pathNeighbors = neighbors.filter(([nx, ny]) => 
          nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && newMaze[ny][nx] === 0
        );
        
        if (pathNeighbors.length > 0) {
          newMaze[y][x] = 0; // Create additional path
        }
      }
    }
    
    // Find a good goal position (far from start)
    let goalX = cols - 2;
    let goalY = rows - 2;
    newMaze[goalY][goalX] = 2; // Mark goal
    
    return { maze: newMaze, goal: { x: goalX, y: goalY } };
  };

  // Initialize maze when level changes
  useEffect(() => {
    // Increase maze size based on level
    const baseSize = 9;
    const sizeIncrease = Math.floor((currentLevel - 1) / 5) * 2; // Increase every 5 levels
    const newSize = { rows: baseSize + sizeIncrease, cols: baseSize + sizeIncrease };
    setMazeSize(newSize);
    
    const { maze: newMaze, goal } = generateMaze(newSize.rows, newSize.cols);
    setMaze(newMaze);
    setPlayerPos({ x: 1, y: 1 });
    setGoalPos(goal);
    setIsComplete(false);
    
    // Select random character
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    setCurrentChar(randomChar);
    
    // Set time based on level (decreases as levels increase)
    const baseTime = 90;
    const timeDecrease = Math.floor((currentLevel - 1) / 3) * 5;
    setTimeLeft(Math.max(30, baseTime - timeDecrease));
  }, [currentLevel, currentGameInLevel]);

  // Timer countdown
  useEffect(() => {
    if (isPaused || isComplete || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          toast.error('Time\'s up! Try again! ⏰');
          setTimeout(onNextGame, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPaused, isComplete, timeLeft]);

  // Handle player movement
  const movePlayer = (dx: number, dy: number) => {
    if (isPaused || isComplete) return;
    
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;
    
    // Check bounds and walls
    if (newX < 0 || newX >= mazeSize.cols || newY < 0 || newY >= mazeSize.rows) return;
    if (maze[newY][newX] === 1) return; // Hit wall
    
    setPlayerPos({ x: newX, y: newY });
    
    // Check if reached goal
    if (newX === goalPos.x && newY === goalPos.y) {
      setIsComplete(true);
      const bonusPoints = timeLeft * 2; // Bonus for remaining time
      const totalPoints = 30 + bonusPoints;
      onScore(totalPoints);
      toast.success(`Maze Complete! +${totalPoints} points! 🎉`, {
        description: `Base: 30 pts + Time Bonus: ${bonusPoints} pts`,
      });
      setTimeout(() => {
        onNextGame();
      }, 1500);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') movePlayer(0, -1);
      if (e.key === 'ArrowDown' || e.key === 's') movePlayer(0, 1);
      if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer(-1, 0);
      if (e.key === 'ArrowRight' || e.key === 'd') movePlayer(1, 0);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, isPaused, isComplete]);

  const getCategoryInfo = (category: string) => {
    const info = {
      forest: { icon: '🌲', color: 'from-green-500 to-emerald-600', name: 'Forest' },
      ocean: { icon: '🌊', color: 'from-blue-500 to-cyan-600', name: 'Ocean' },
      mountain: { icon: '⛰️', color: 'from-gray-500 to-slate-600', name: 'Mountain' },
      desert: { icon: '🏜️', color: 'from-yellow-500 to-orange-600', name: 'Desert' }
    };
    return info[category as keyof typeof info] || info.forest;
  };

  if (!currentChar) return null;
  
  const categoryInfo = getCategoryInfo(currentChar.category);
  const cellSize = Math.min(28, Math.floor(280 / mazeSize.cols));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6" />
              Maze Hunt
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Guide {currentChar.name} to their {categoryInfo.name} habitat!
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {gameHeader}
            {gameControls}
            
            {/* Timer and Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl border-2 text-center ${ 
                timeLeft <= 10 ? 'bg-red-100 border-red-300 animate-pulse' : 'bg-blue-100 border-blue-300'
              }`}>
                <p className="text-xs text-gray-600 mb-1">Time Left</p>
                <p className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </p>
              </div>
              <div className="p-3 rounded-xl border-2 bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300 text-center">
                <p className="text-xs text-gray-600 mb-1">Destination</p>
                <p className="text-2xl font-bold text-purple-600">
                  {categoryInfo.icon} {categoryInfo.name}
                </p>
              </div>
            </div>

            {/* Character Info */}
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-white to-primary/5 rounded-xl border-2 border-primary/20">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-lg flex-shrink-0">
                <img src={currentChar.image} alt={currentChar.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm">{currentChar.name}</p>
                <p className="text-xs text-muted-foreground">{currentChar.description}</p>
              </div>
            </div>

            {/* Maze Display */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border-4 border-gray-700 overflow-auto">
              <div 
                className="mx-auto" 
                style={{ 
                  width: mazeSize.cols * cellSize,
                  height: mazeSize.rows * cellSize 
                }}
              >
                {maze.map((row, y) => (
                  <div key={y} className="flex">
                    {row.map((cell, x) => {
                      const isPlayer = playerPos.x === x && playerPos.y === y;
                      const isGoal = goalPos.x === x && goalPos.y === y;
                      const isPath = cell === 0 || cell === 2;
                      
                      return (
                        <div
                          key={`${x}-${y}`}
                          className={`relative transition-colors ${ 
                            isPath ? 'bg-gray-200' : 'bg-gray-800'
                          }`}
                          style={{ 
                            width: cellSize, 
                            height: cellSize,
                            border: '1px solid rgba(0,0,0,0.1)'
                          }}
                        >
                          {isPlayer && (
                            <motion.div
                              key={`player-${x}-${y}`}
                              className="absolute inset-0.5 rounded-full overflow-hidden shadow-lg ring-2 ring-blue-400"
                              initial={{ scale: 1 }}
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                            >
                              <img 
                                src={currentChar.image} 
                                alt="Player" 
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                          )}
                          {isGoal && !isComplete && (
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center text-2xl"
                              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              {categoryInfo.icon}
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Direction Controls */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-center text-gray-600">
                Use Arrow Keys or Buttons to Move
              </p>
              <div className="flex flex-col items-center gap-2">
                <Button
                  onClick={() => movePlayer(0, -1)}
                  variant="outline"
                  size="sm"
                  className="w-12 h-12"
                  disabled={isPaused || isComplete}
                >
                  ↑
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={() => movePlayer(-1, 0)}
                    variant="outline"
                    size="sm"
                    className="w-12 h-12"
                    disabled={isPaused || isComplete}
                  >
                    ←
                  </Button>
                  <Button
                    onClick={() => movePlayer(0, 1)}
                    variant="outline"
                    size="sm"
                    className="w-12 h-12"
                    disabled={isPaused || isComplete}
                  >
                    ↓
                  </Button>
                  <Button
                    onClick={() => movePlayer(1, 0)}
                    variant="outline"
                    size="sm"
                    className="w-12 h-12"
                    disabled={isPaused || isComplete}
                  >
                    →
                  </Button>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">
                🎯 How to Play:
              </p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Navigate through the maze to reach the habitat goal</li>
                <li>• Use arrow keys (↑↓←→) or on-screen buttons to move</li>
                <li>• Complete the maze before time runs out</li>
                <li>• Faster completion = more bonus points!</li>
                <li>• Maze gets bigger and more complex as you progress</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Trivia Game Component
function TriviaGame({ characters, onBack, onScore, gameHeader, gameControls, isPaused, onNextGame }: any) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  
  // Generate random questions on component mount
  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const newQuestions = [];
    const usedCharacters = new Set();
    
    // Generate 10 random questions
    for (let i = 0; i < 10; i++) {
      // Select a random character that hasn't been used yet
      let randomChar;
      let attempts = 0;
      do {
        randomChar = characters[Math.floor(Math.random() * characters.length)];
        attempts++;
        // If we've used all characters, allow repeats
        if (attempts > 20) {
          usedCharacters.clear();
        }
      } while (usedCharacters.has(randomChar.id) && usedCharacters.size < characters.length);
      
      usedCharacters.add(randomChar.id);
      
      // Get 3 random wrong answers (different character names)
      const wrongAnswers = characters
        .filter((c: Character) => c.id !== randomChar.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((c: Character) => c.name);
      
      // Combine correct answer with wrong answers and shuffle
      const options = [randomChar.name, ...wrongAnswers].sort(() => Math.random() - 0.5);
      
      // Remove character name from the fact to avoid giving away the answer
      const sanitizedFact = randomChar.fact
        .replace(new RegExp(randomChar.name, 'gi'), '???')
        .replace(/^(\?\?\?) is /, 'This character is ')
        .replace(/^(\?\?\?) loves /, 'This character loves ')
        .replace(/^(\?\?\?) enjoys /, 'This character enjoys ')
        .replace(/^(\?\?\?) lives /, 'This character lives ');
      
      newQuestions.push({
        question: sanitizedFact,
        options: options,
        correct: randomChar.name,
        character: randomChar,
        hint: `${randomChar.description} from "${randomChar.book}"`
      });
    }
    
    setQuestions(newQuestions);
  };

  const handleAnswer = (answer: string) => {
    if (isPaused || !questions[currentQuestion]) return;
    
    setSelectedAnswer(answer);
    
    if (answer === questions[currentQuestion].correct) {
      onScore(20);
      toast.success(`Correct! It's ${answer}! +20 points 🎉`, {
        description: questions[currentQuestion].hint,
      });
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          toast.success('Trivia round complete! 🎊');
          setTimeout(() => {
            onNextGame();
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            generateQuestions(); // Generate new questions for next round
          }, 1000);
        }
      }, 1500);
    } else {
      toast.error(`Wrong! The correct answer is ${questions[currentQuestion].correct}`, {
        description: questions[currentQuestion].hint,
      });
      setTimeout(() => setSelectedAnswer(null), 1500);
    }
  };

  // Show loading state while questions are being generated
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6 pb-24 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 animate-pulse text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Preparing trivia questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Character Trivia
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {gameHeader}
            {gameControls}
            
            <div className="text-center p-6">
              {/* Character Image Hint - Blurred until correct answer */}
              <motion.div
                key={currentQuestion}
                initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl relative"
              >
                <img 
                  src={questions[currentQuestion].character.image} 
                  alt="Mystery Character" 
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    selectedAnswer === questions[currentQuestion].correct 
                      ? 'blur-none' 
                      : 'blur-xl'
                  }`}
                />
                {/* Overlay with question mark when blurred */}
                {selectedAnswer !== questions[currentQuestion].correct && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20 backdrop-blur-sm">
                    <div className="text-6xl font-bold text-white drop-shadow-lg">?</div>
                  </div>
                )}
                {/* Reveal animation on correct answer */}
                {selectedAnswer === questions[currentQuestion].correct && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="text-6xl">✨</div>
                  </motion.div>
                )}
              </motion.div>
              
              {/* Question */}
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <h3 className="text-2xl font-bold mb-2">
                  {questions[currentQuestion].question}
                </h3>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <p>Who is this character? Pick the correct name!</p>
                </div>
              </motion.div>
              
              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-3">
                {questions[currentQuestion].options.map((option: string, index: number) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === questions[currentQuestion].correct;
                  const showResult = selectedAnswer !== null;
                  
                  let buttonVariant: "default" | "outline" | "destructive" = "outline";
                  let buttonClass = "";
                  
                  if (showResult) {
                    if (isCorrect) {
                      buttonVariant = "default";
                      buttonClass = "bg-green-500 hover:bg-green-600 text-white border-green-600";
                    } else if (isSelected && !isCorrect) {
                      buttonVariant = "destructive";
                      buttonClass = "bg-red-500 hover:bg-red-600 text-white border-red-600";
                    }
                  }
                  
                  return (
                    <motion.div
                      key={option}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        onClick={() => handleAnswer(option)}
                        variant={buttonVariant}
                        className={`h-16 w-full text-lg font-semibold transition-all ${buttonClass} ${
                          isSelected && !showResult ? 'ring-4 ring-blue-300' : ''
                        }`}
                        disabled={!!selectedAnswer || isPaused}
                      >
                        {showResult && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Hint Section (shows after wrong answer) */}
              {selectedAnswer && selectedAnswer !== questions[currentQuestion].correct && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-blue-100 border-2 border-blue-300 rounded-xl"
                >
                  <div className="flex items-start gap-2 text-blue-900">
                    <Star className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="font-semibold text-sm mb-1">Character Info:</p>
                      <p className="text-sm">{questions[currentQuestion].hint}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* How to Play Instructions */}
            <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">
                🧠 How to Play:
              </p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Study the blurred character image</li>
                <li>• Read the personality clue (name removed)</li>
                <li>• Select the correct character name from 4 options</li>
                <li>• Image reveals when you guess correctly!</li>
                <li>• Complete all 10 questions to finish the round</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Word Puzzle Game Component
function WordPuzzleGame({ characters, onBack, onScore, gameHeader, gameControls, isPaused, onNextGame }: any) {
  const [currentChar, setCurrentChar] = useState(characters[0]);
  const [userInput, setUserInput] = useState('');
  const [revealed, setRevealed] = useState(false);

  const handleSubmit = () => {
    if (isPaused) return;
    
    if (userInput.toLowerCase() === currentChar.name.toLowerCase()) {
      setRevealed(true);
      onScore(15);
      toast.success(`Correct! ${currentChar.name} revealed! +15 points`);
      setTimeout(() => {
        onNextGame();
        setRevealed(false);
        setUserInput('');
      }, 2000);
    } else {
      toast.error('Incorrect spelling! Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Puzzle className="w-6 h-6" />
              Word Puzzle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gameHeader}
            {gameControls}
            
            <div className="text-center p-6">
              <AnimatePresence mode="wait">
                {revealed ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-500"
                  >
                    <img src={currentChar.image} alt={currentChar.name} className="w-full h-full object-cover" />
                  </motion.div>
                ) : (
                  <div className="w-40 h-40 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <Puzzle className="w-16 h-16 text-white" />
                  </div>
                )}
              </AnimatePresence>
              
              <p className="text-sm text-muted-foreground mb-2">
                Category: {currentChar.category}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Hint: {currentChar.description}
              </p>
              
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type character name..."
                className="w-full p-3 border-2 rounded-lg mb-4 text-center text-lg"
                disabled={revealed || isPaused}
              />
              
              <Button onClick={handleSubmit} className="w-full" disabled={revealed || isPaused}>
                Submit Answer
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-900 mb-2">
                ✏️ How to Play:
              </p>
              <ul className="text-xs text-green-800 space-y-1">
                <li>• Look at the category and hint</li>
                <li>• Type the character's name correctly</li>
                <li>• Submit to reveal the character!</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Memory Match Game Component
function MemoryMatchGame({ characters, onBack, onScore, gameHeader, gameControls, isPaused, onNextGame }: any) {
  const [cards, setCards] = useState<Array<{char: Character, flipped: boolean, matched: boolean, id: number}>>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  const initializeCards = () => {
    // Randomly select 6 characters for this round
    const shuffledChars = [...characters].sort(() => Math.random() - 0.5);
    const gameChars = shuffledChars.slice(0, 6);
    const cardPairs = [...gameChars, ...gameChars].map((char, i) => ({
      char,
      flipped: false,
      matched: false,
      id: i
    })).sort(() => Math.random() - 0.5);
    setCards(cardPairs);
  };

  useEffect(() => {
    initializeCards();
  }, []);

  const handleCardClick = (index: number) => {
    if (isPaused || isResetting) return;
    if (cards[index].flipped || cards[index].matched) return;
    if (flippedIndices.length >= 2) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setFlippedIndices([...flippedIndices, index]);
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (cards[first].char.id === cards[second].char.id) {
        // Match found!
        const newCards = [...cards];
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlippedIndices([]);
        onScore(25);
        toast.success(`Match found! ${cards[first].char.name}! +25 points`);

        // Check if all matched
        if (newCards.every(card => card.matched)) {
          const newRounds = roundsCompleted + 1;
          setRoundsCompleted(newRounds);
          if (newRounds >= 3) {
            toast.success('Memory Match complete! 3 rounds done! 🎉');
            setTimeout(() => {
              onNextGame();
              setRoundsCompleted(0);
            }, 1500);
          } else {
            toast.success(`Round ${newRounds} complete! Next round starting...`);
            setIsResetting(true);
            setTimeout(() => {
              initializeCards();
              setIsResetting(false);
            }, 1500);
          }
        }
      } else {
        // No match
        setTimeout(() => {
          const newCards = [...cards];
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards(newCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Grid3x3 className="w-6 h-6" />
              Memory Match
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Round {roundsCompleted + 1} of 3
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {gameHeader}
            {gameControls}
            
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ scale: 0, rotateY: -180 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="aspect-square"
                >
                  <div
                    onClick={() => handleCardClick(index)}
                    className={`relative w-full h-full rounded-xl cursor-pointer transition-all transform ${
                      card.matched ? 'opacity-50 scale-95' : 'hover:scale-105'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {card.flipped || card.matched ? (
                        <motion.div
                          key="front"
                          initial={{ rotateY: 90 }}
                          animate={{ rotateY: 0 }}
                          exit={{ rotateY: -90 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          <div className={`w-full h-full rounded-xl overflow-hidden border-4 ${
                            card.matched ? 'border-green-500' : 'border-purple-500'
                          }`}>
                            <img
                              src={card.char.image}
                              alt={card.char.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="back"
                          initial={{ rotateY: 90 }}
                          animate={{ rotateY: 0 }}
                          exit={{ rotateY: -90 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center border-4 border-purple-600">
                            <Puzzle className="w-12 h-12 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* How to Play */}
            <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-lg">
              <p className="text-sm font-medium text-purple-900 mb-2">
                🧩 How to Play:
              </p>
              <ul className="text-xs text-purple-800 space-y-1">
                <li>• Tap cards to flip them over</li>
                <li>• Find matching pairs of characters</li>
                <li>• Complete 3 rounds to finish!</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
