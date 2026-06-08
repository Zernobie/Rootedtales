/**
 * useDataSync Hook
 * 
 * React hook for fetching and caching character and book data
 * across the Rooted Tales application.
 */

import { useState, useEffect } from 'react';
import { fetchCharacters, fetchBooks, Character, Book } from './dataSync';

interface UseDataSyncOptions {
  fetchOnMount?: boolean;
  refetchInterval?: number; // in milliseconds
}

interface UseDataSyncReturn {
  characters: Character[];
  books: Book[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage character and book data
 * 
 * @param options - Configuration options
 * @returns Object containing characters, books, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { characters, books, isLoading } = useDataSync();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   
 *   return (
 *     <div>
 *       {characters.map(char => <div key={char.id}>{char.name}</div>)}
 *     </div>
 *   );
 * }
 * ```
 */
export function useDataSync(options: UseDataSyncOptions = {}): UseDataSyncReturn {
  const { fetchOnMount = true, refetchInterval } = options;
  
  const [characters, setCharacters] = useState<Character[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(fetchOnMount);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [charactersData, booksData] = await Promise.all([
        fetchCharacters(),
        fetchBooks()
      ]);
      
      setCharacters(charactersData);
      setBooks(booksData);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch data');
      setError(error);
      console.error('Error in useDataSync:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }
  }, [fetchOnMount]);

  // Set up refetch interval if specified
  useEffect(() => {
    if (!refetchInterval) return;

    const intervalId = setInterval(() => {
      fetchData();
    }, refetchInterval);

    return () => clearInterval(intervalId);
  }, [refetchInterval]);

  return {
    characters,
    books,
    isLoading,
    error,
    refetch: fetchData
  };
}

/**
 * Hook to fetch only character data
 */
export function useCharacters(options: UseDataSyncOptions = {}) {
  const { fetchOnMount = true } = options;
  
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(fetchOnMount);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchCharacters();
      setCharacters(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch characters');
      setError(error);
      console.error('Error in useCharacters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }
  }, [fetchOnMount]);

  return {
    characters,
    isLoading,
    error,
    refetch: fetchData
  };
}

/**
 * Hook to fetch only book data
 */
export function useBooks(options: UseDataSyncOptions = {}) {
  const { fetchOnMount = true } = options;
  
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(fetchOnMount);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch books');
      setError(error);
      console.error('Error in useBooks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }
  }, [fetchOnMount]);

  return {
    books,
    isLoading,
    error,
    refetch: fetchData
  };
}
