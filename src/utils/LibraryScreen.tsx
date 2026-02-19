import React from 'react';
import { useBooks } from '../hooks/useAssets';
import { useBookCover } from '../hooks/useAssets';
import { Card, CardContent } from './ui/card';

export function LibraryScreen() {
  const { books, loading, error } = useBooks();

  if (loading) return <div className="text-center p-8">Loading books...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

function BookCard({ book }) {
  const { coverUrl, isLoading, error } = useBookCover(book.id);

  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition">
      <div className="aspect-[2/3] bg-gray-100">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">Loading...</div>
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center text-red-400">❌</div>
        ) : (
          <img src={coverUrl} alt={book.title} className="w-full h-full object-cover" />
        )}
      </div>
      <CardContent className="p-2">
        <h3 className="font-bold text-sm line-clamp-2">{book.title}</h3>
        <p className="text-xs text-gray-600">{book.author}</p>
      </CardContent>
    </Card>
  );
}
