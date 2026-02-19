// Maze Hunt Game Component - Completely Redesigned
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Target, MapPin, Clock, Footprints, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Character {
  id: string;
  name: string;
  image: string;
  category: 'forest' | 'ocean' | 'mountain' | 'desert';
  description: string;
  book: string;
  fact: string;
}

interface MazeHuntGameProps {
  characters: Character[];
  onBack: () => void;
  onScore: (points: number) => void;
  gameHeader: React.ReactNode;
  gameControls: React.ReactNode;
  isPaused: boolean;
  onNextGame: () => void;
  currentLevel: number;
  currentGameInLevel: number;
}

export function MazeHuntGame({ 
  characters, 
  onBack, 
  onScore, 
  gameHeader, 
  gameControls, 
  isPaused, 
  onNextGame, 
  currentLevel, 
  currentGameInLevel 
}: MazeHuntGameProps) {
  const [maze, setMaze] = useState<number[][]>([]);
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [goalPos, setGoalPos] = useState({ x: 0, y: 0 });
  const [currentChar, setCurrentChar] = useState<Character | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isComplete, setIsComplete] = useState(false);
  const [mazeSize, setMazeSize] = useState({ rows: 9, cols: 9 });
  const [moveCount, setMoveCount] = useState(0);
  const [visitedCells, setVisitedCells] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);

  // Generate maze using recursive backtracking algorithm with multiple paths
  const generateMaze = (rows: number, cols: number) => {
    const newMaze = Array(rows).fill(null).map(() => Array(cols).fill(1));
    
    const carve = (x: number, y: number) => {
      const directions = [
        [0, -2], [2, 0], [0, 2], [-2, 0]
      ].sort(() => Math.random() - 0.5);
      
      newMaze[y][x] = 0;
      
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && newMaze[ny][nx] === 1) {
          newMaze[y + dy / 2][x + dx / 2] = 0;
          carve(nx, ny);
        }
      }
    };
    
    carve(1, 1);
    newMaze[1][1] = 0;
    
    // Create additional random paths for multiple solutions
    const additionalPaths = Math.floor((rows * cols) / 30);
    for (let i = 0; i < additionalPaths; i++) {
      const x = Math.floor(Math.random() * (cols - 2)) + 1;
      const y = Math.floor(Math.random() * (rows - 2)) + 1;
      if (newMaze[y][x] === 1) {
        const neighbors = [
          [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]
        ];
        const pathNeighbors = neighbors.filter(([nx, ny]) => 
          nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && newMaze[ny][nx] === 0
        );
        
        if (pathNeighbors.length > 0) {
          newMaze[y][x] = 0;
        }
      }
    }
    
    const goalX = cols - 2;
    const goalY = rows - 2;
    newMaze[goalY][goalX] = 2;
    
    return { maze: newMaze, goal: { x: goalX, y: goalY } };
  };

  // Initialize maze when level changes
  useEffect(() => {
    const baseSize = 9;
    const sizeIncrease = Math.floor((currentLevel - 1) / 5) * 2;
    const newSize = { rows: baseSize + sizeIncrease, cols: baseSize + sizeIncrease };
    setMazeSize(newSize);
    
    const { maze: newMaze, goal } = generateMaze(newSize.rows, newSize.cols);
    setMaze(newMaze);
    setPlayerPos({ x: 1, y: 1 });
    setGoalPos(goal);
    setIsComplete(false);
    setMoveCount(0);
    setVisitedCells(new Set(['1-1']));
    setShowHint(false);
    
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    setCurrentChar(randomChar);
    
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
    
    if (newX < 0 || newX >= mazeSize.cols || newY < 0 || newY >= mazeSize.rows) return;
    if (maze[newY][newX] === 1) return;
    
    setPlayerPos({ x: newX, y: newY });
    setMoveCount(prev => prev + 1);
    setVisitedCells(prev => new Set(prev).add(`${newX}-${newY}`));
    
    if (newX === goalPos.x && newY === goalPos.y) {
      setIsComplete(true);
      const bonusPoints = timeLeft * 2;
      const efficiencyBonus = Math.max(0, 50 - moveCount);
      const totalPoints = 30 + bonusPoints + efficiencyBonus;
      onScore(totalPoints);
      toast.success(`Maze Complete! +${totalPoints} points! 🎉`, {
        description: `Base: 30 • Time: ${bonusPoints} • Efficiency: ${efficiencyBonus}`,
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
      forest: { icon: '🌲', color: 'from-green-500 to-emerald-600', bgGradient: 'from-green-50 to-emerald-100', name: 'Forest', pathColor: 'bg-green-100' },
      ocean: { icon: '🌊', color: 'from-blue-500 to-cyan-600', bgGradient: 'from-blue-50 to-cyan-100', name: 'Ocean', pathColor: 'bg-blue-100' },
      mountain: { icon: '⛰️', color: 'from-gray-500 to-slate-600', bgGradient: 'from-gray-50 to-slate-100', name: 'Mountain', pathColor: 'bg-gray-100' },
      desert: { icon: '🏜️', color: 'from-yellow-500 to-orange-600', bgGradient: 'from-yellow-50 to-orange-100', name: 'Desert', pathColor: 'bg-yellow-100' }
    };
    return info[category as keyof typeof info] || info.forest;
  };

  if (!currentChar) return null;
  
  const categoryInfo = getCategoryInfo(currentChar.category);
  const cellSize = Math.min(30, Math.floor(320 / mazeSize.cols));
  const progress = Math.round((visitedCells.size / ((mazeSize.rows * mazeSize.cols) / 3)) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 pb-24">
      <motion.div 
        className="max-w-md mx-auto space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Game Header & Controls */}
        <Card className="overflow-hidden shadow-xl border-2 border-purple-200">
          <CardContent className="p-4 space-y-3">
            {gameHeader}
            {gameControls}
          </CardContent>
        </Card>

        {/* Character & Mission Info */}
        <Card className={`overflow-hidden shadow-xl border-2 bg-gradient-to-br ${categoryInfo.bgGradient}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                className="relative w-20 h-20 flex-shrink-0"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/20 rounded-full blur-xl"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img src={currentChar.image} alt={currentChar.name} className="w-full h-full object-cover" />
                </div>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{currentChar.name}</h3>
                <p className="text-sm text-gray-700">{currentChar.description}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-gray-600" />
                  <span className="text-xs font-medium text-gray-600">
                    Journey to {categoryInfo.name} {categoryInfo.icon}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2">
              <div className={`p-2 rounded-lg border-2 text-center ${ 
                timeLeft <= 10 ? 'bg-red-100 border-red-300 animate-pulse' : 'bg-white/70 border-white/50'
              }`}>
                <Clock className={`w-4 h-4 mx-auto mb-1 ${timeLeft <= 10 ? 'text-red-600' : 'text-purple-600'}`} />
                <p className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-purple-900'}`}>
                  {timeLeft}s
                </p>
              </div>
              <div className="p-2 rounded-lg border-2 bg-white/70 border-white/50 text-center">
                <Footprints className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                <p className="text-lg font-bold text-blue-900">{moveCount}</p>
              </div>
              <div className="p-2 rounded-lg border-2 bg-white/70 border-white/50 text-center">
                <TrendingUp className="w-4 h-4 mx-auto mb-1 text-green-600" />
                <p className="text-lg font-bold text-green-900">{Math.min(progress, 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maze Display */}
        <Card className="overflow-hidden shadow-2xl border-4 border-purple-300">
          <CardContent className="p-3">
            <div className={`bg-gradient-to-br ${categoryInfo.color} p-3 rounded-xl shadow-inner`}>
              <div 
                className="mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-2xl border-2 border-gray-700" 
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
                      const isVisited = visitedCells.has(`${x}-${y}`);
                      const isStart = x === 1 && y === 1;
                      
                      return (
                        <div
                          key={`${x}-${y}`}
                          className={`relative transition-all duration-200 ${
                            isPath 
                              ? isVisited 
                                ? categoryInfo.pathColor + '/60' 
                                : 'bg-gray-200' 
                              : 'bg-gray-800'
                          }`}
                          style={{ 
                            width: cellSize, 
                            height: cellSize,
                            boxShadow: isPath ? 'inset 0 0 2px rgba(0,0,0,0.1)' : 'none'
                          }}
                        >
                          {/* Start marker */}
                          {isStart && !isPlayer && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-xs"
                              >
                                🏁
                              </motion.div>
                            </div>
                          )}
                          
                          {/* Player */}
                          {isPlayer && (
                            <motion.div
                              key={`player-${x}-${y}`}
                              className="absolute inset-0 flex items-center justify-center"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                            >
                              <div className="relative w-[85%] h-[85%]">
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-sm"
                                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                />
                                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-lg">
                                  <img 
                                    src={currentChar.image} 
                                    alt="Player" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                          
                          {/* Goal */}
                          {isGoal && !isComplete && (
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center"
                              animate={{ 
                                scale: [1, 1.3, 1], 
                                rotate: [0, 10, -10, 0] 
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <div className="relative">
                                <motion.div
                                  className={`absolute inset-0 bg-gradient-to-br ${categoryInfo.color} rounded-full blur-md`}
                                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <div className="relative text-xl drop-shadow-lg">
                                  {categoryInfo.icon}
                                </div>
                              </div>
                            </motion.div>
                          )}
                          
                          {/* Path sparkles for visited cells */}
                          {isVisited && isPath && !isPlayer && !isGoal && Math.random() > 0.9 && (
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center text-[8px]"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                            >
                              ✨
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Direction Controls */}
        <Card className="overflow-hidden shadow-xl border-2 border-purple-200">
          <CardContent className="p-4">
            <div className="flex flex-col items-center gap-2">
              <Button
                onClick={() => movePlayer(0, -1)}
                variant="outline"
                size="sm"
                className={`w-14 h-14 rounded-xl font-bold text-xl bg-gradient-to-br ${categoryInfo.color} text-white border-0 shadow-lg hover:shadow-xl transition-all`}
                disabled={isPaused || isComplete}
              >
                ↑
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={() => movePlayer(-1, 0)}
                  variant="outline"
                  size="sm"
                  className={`w-14 h-14 rounded-xl font-bold text-xl bg-gradient-to-br ${categoryInfo.color} text-white border-0 shadow-lg hover:shadow-xl transition-all`}
                  disabled={isPaused || isComplete}
                >
                  ←
                </Button>
                <Button
                  onClick={() => movePlayer(0, 1)}
                  variant="outline"
                  size="sm"
                  className={`w-14 h-14 rounded-xl font-bold text-xl bg-gradient-to-br ${categoryInfo.color} text-white border-0 shadow-lg hover:shadow-xl transition-all`}
                  disabled={isPaused || isComplete}
                >
                  ↓
                </Button>
                <Button
                  onClick={() => movePlayer(1, 0)}
                  variant="outline"
                  size="sm"
                  className={`w-14 h-14 rounded-xl font-bold text-xl bg-gradient-to-br ${categoryInfo.color} text-white border-0 shadow-lg hover:shadow-xl transition-all`}
                  disabled={isPaused || isComplete}
                >
                  →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`p-3 rounded-xl bg-gradient-to-r ${categoryInfo.color} text-white shadow-lg`}
        >
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-semibold">💡 Pro Tips:</p>
              <p>• Fewer moves = bigger efficiency bonus!</p>
              <p>• Visited paths are highlighted in color</p>
              <p>• Multiple routes available - explore!</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
