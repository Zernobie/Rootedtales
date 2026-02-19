import React from 'react';
import { useParams } from 'react-router-dom'; // or however you get bookId
import { useBooks, useBookCover } from '../hooks/useAssets';
import { getCharactersInBook } from '../utils/dataSync'; // keep temporarily – see note

export function BookOverview() {
  const { bookId } = useParams<{ bookId: string }>();
  const { books } = useBooks();
  const book = books.find(b => b.id === bookId);
  const { coverUrl, isLoading: coverLoading } = useBookCover(bookId);
  const [characters, setCharacters] = React.useState([]);

  React.useEffect(() => {
    async function loadCharacters() {
      if (book?.characters) {
        const chars = await getCharactersInBook(bookId);
        setCharacters(chars);
      }
    }
    loadCharacters();
  }, [bookId, book]);

  if (!book) return <div>Book not found</div>;

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <div className="w-1/3">
          {coverLoading ? (
            <div className="aspect-[2/3] bg-gray-200 animate-pulse" />
          ) : (
            <img src={coverUrl} alt={book.title} className="w-full object-cover rounded-lg" />
          )}
        </div>
        <div className="w-2/3">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-gray-600">{book.author}</p>
          <p className="mt-2">{book.description}</p>
          <p className="mt-2">Pages: {book.pageCount}</p>
          <p>Reading time: {book.readingTime}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold">Characters in this book</h2>
        <div className="flex gap-2 mt-2 flex-wrap">
          {characters.map(char => (
            <span key={char.id} className="px-3 py-1 bg-green-100 rounded-full text-sm">
              {char.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
