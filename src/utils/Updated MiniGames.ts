import React, { useState, useEffect } from 'react';
import { useCharacters } from '../hooks/useAssets';

export function TriviaGame() {
  const { characters, loading } = useCharacters();
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    if (characters.length > 0) {
      // pick a random character for trivia
      const randomIndex = Math.floor(Math.random() * characters.length);
      setCurrentQuestion(characters[randomIndex]);
    }
  }, [characters]);

  if (loading) return <div>Loading game...</div>;
  if (!currentQuestion) return <div>No characters available </div>;

  return (
    <div>
    <h2>What animal is { currentQuestion.name }?</h2>
      < div className = "options" >
        {/* generate options etc */ }
        </div>
        </div>
  );
}