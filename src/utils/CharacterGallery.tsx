import React from 'react';
import { useCharacters } from '../hooks/useAssets';
import { useCharacterImage } from '../hooks/useAssets';
import { Card, CardContent } from './ui/card';

export function CharacterGallery() {
  const { characters, loading, error } = useCharacters();

  if (loading) return <div className="text-center p-8">Loading characters...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}

function CharacterCard({ character }) {
  const { imageUrl, isLoading: imageLoading, error: imageError } = useCharacterImage(character.id);

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-gray-100">
        {imageLoading ? (
          <div className="w-full h-full flex items-center justify-center">Loading...</div>
        ) : imageError ? (
          <div className="w-full h-full flex items-center justify-center text-red-400">❌</div>
        ) : (
          <img src={imageUrl} alt={character.name} className="w-full h-full object-cover" />
        )}
      </div>
      <CardContent className="p-2">
        <h3 className="font-bold">{character.name}</h3>
        <p className="text-sm text-gray-600">{character.animalType}</p>
      </CardContent>
    </Card>
  );
}