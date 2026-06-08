import React, { useState } from 'react';
import { Plus, Edit, Trash2, Upload, Save, X, BookOpen, Shield, DollarSign, Image } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  format: 'EPUB' | 'PDF';
  pages: number;
  size: string;
  coverUrl: string;
  fileUrl: string;
  isDRMProtected: boolean;
  category: string;
  ageRange: string;
  theme: 'forest' | 'ocean' | 'sunset' | 'night';
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminBookManagerProps {
  theme: 'forest' | 'ocean' | 'sunset' | 'night';
}

const THEME_COLORS = {
  forest: { primary: 'emerald-600', secondary: 'green-100', text: 'green-900' },
  ocean: { primary: 'cyan-600', secondary: 'cyan-100', text: 'cyan-900' },
  sunset: { primary: 'orange-600', secondary: 'orange-100', text: 'orange-900' },
  night: { primary: 'indigo-600', secondary: 'indigo-100', text: 'indigo-900' }
};

export function AdminBookManager({ theme }: AdminBookManagerProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<Book> | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const colors = THEME_COLORS[theme];

  const handleAddNew = () => {
    setCurrentBook({
      title: '',
      author: 'XenWinx Authors',
      description: '',
      price: 4.99,
      format: 'EPUB',
      pages: 0,
      size: '',
      coverUrl: '',
      fileUrl: '',
      isDRMProtected: true,
      category: 'Adventure',
      ageRange: '4-8 years',
      theme: 'forest',
      isPublished: false
    });
    setIsEditing(true);
  };

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!currentBook) return;

    // In production, this would:
    // 1. Upload book file to secure storage (S3, Google Cloud Storage)
    // 2. Encrypt the book file with DRM
    // 3. Upload cover image
    // 4. Save metadata to database
    // 5. Generate secure download URLs
    // 6. Set up license keys

    const newBook: Book = {
      id: currentBook.id || `book_${Date.now()}`,
      title: currentBook.title || '',
      author: currentBook.author || '',
      description: currentBook.description || '',
      price: currentBook.price || 0,
      format: currentBook.format || 'EPUB',
      pages: currentBook.pages || 0,
      size: currentBook.size || '',
      coverUrl: currentBook.coverUrl || '',
      fileUrl: currentBook.fileUrl || '',
      isDRMProtected: currentBook.isDRMProtected !== false,
      category: currentBook.category || '',
      ageRange: currentBook.ageRange || '',
      theme: currentBook.theme || 'forest',
      isPublished: currentBook.isPublished || false,
      createdAt: currentBook.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (currentBook.id) {
      setBooks(prev => prev.map(b => b.id === currentBook.id ? newBook : b));
    } else {
      setBooks(prev => [...prev, newBook]);
    }

    setIsEditing(false);
    setCurrentBook(null);
  };

  const handleDelete = (bookId: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks(prev => prev.filter(b => b.id !== bookId));
    }
  };

  const handleFileUpload = async (file: File, type: 'book' | 'cover') => {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // In production:
    // 1. Upload to secure storage
    // 2. Apply DRM encryption for books
    // 3. Generate secure URL
    // 4. Return URL

    const mockUrl = `https://secure-storage.example.com/${type}/${file.name}`;
    
    if (type === 'book') {
      setCurrentBook(prev => ({ ...prev, fileUrl: mockUrl, size: `${(file.size / 1024 / 1024).toFixed(1)} MB` }));
    } else {
      setCurrentBook(prev => ({ ...prev, coverUrl: mockUrl }));
    }

    setUploadProgress(0);
  };

  const togglePublish = (bookId: string) => {
    setBooks(prev => prev.map(b => 
      b.id === bookId ? { ...b, isPublished: !b.isPublished, updatedAt: new Date().toISOString() } : b
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold text-${colors.text}`}>Book Manager</h1>
              <p className="text-sm text-gray-600 mt-1">Add, edit, and manage e-books</p>
            </div>
            <button
              onClick={handleAddNew}
              className={`flex items-center gap-2 px-4 py-2 bg-${colors.primary} text-white rounded-lg hover:opacity-90 transition-opacity`}
            >
              <Plus className="w-5 h-5" />
              Add New Book
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Total Books</p>
              <p className="text-2xl font-bold text-gray-900">{books.length}</p>
            </div>
            <div className={`bg-${colors.secondary} rounded-lg p-3`}>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {books.filter(b => b.isPublished).length}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">
                {books.filter(b => !b.isPublished).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {books.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No books yet</p>
            <p className="text-sm text-gray-500 mt-1">Add your first e-book to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex gap-4">
                  {/* Cover */}
                  <div className={`w-24 h-32 bg-${colors.secondary} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {book.coverUrl ? (
                      <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <BookOpen className={`w-12 h-12 text-${colors.primary}`} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{book.title}</h3>
                        <p className="text-sm text-gray-600">{book.author}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          book.isPublished
                            ? `bg-${colors.secondary} text-${colors.text}`
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {book.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{book.description}</p>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ${book.price.toFixed(2)}
                      </span>
                      <span>{book.format}</span>
                      <span>{book.pages} pages</span>
                      <span>{book.size}</span>
                      {book.isDRMProtected && (
                        <span className="flex items-center gap-1 text-blue-600">
                          <Shield className="w-4 h-4" />
                          DRM Protected
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(book)}
                        className={`px-4 py-2 border border-${colors.primary} text-${colors.primary} rounded-lg hover:bg-${colors.secondary} transition-colors`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => togglePublish(book.id)}
                        className={`px-4 py-2 ${
                          book.isPublished
                            ? 'bg-gray-100 text-gray-700'
                            : `bg-${colors.primary} text-white`
                        } rounded-lg hover:opacity-90 transition-opacity`}
                      >
                        {book.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && currentBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full my-8">
            <div className={`bg-${colors.primary} text-white p-4 flex items-center justify-between rounded-t-xl`}>
              <h2 className="text-lg font-semibold">
                {currentBook.id ? 'Edit Book' : 'Add New Book'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={currentBook.title || ''}
                  onChange={(e) => setCurrentBook(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter book title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={currentBook.author || ''}
                  onChange={(e) => setCurrentBook(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={currentBook.description || ''}
                  onChange={(e) => setCurrentBook(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter book description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={currentBook.price || ''}
                    onChange={(e) => setCurrentBook(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                  <select
                    value={currentBook.format || 'EPUB'}
                    onChange={(e) => setCurrentBook(prev => ({ ...prev, format: e.target.value as 'EPUB' | 'PDF' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="EPUB">EPUB</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                  <input
                    type="number"
                    value={currentBook.pages || ''}
                    onChange={(e) => setCurrentBook(prev => ({ ...prev, pages: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                  <input
                    type="text"
                    value={currentBook.ageRange || ''}
                    onChange={(e) => setCurrentBook(prev => ({ ...prev, ageRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g., 4-8 years"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={currentBook.category || 'Adventure'}
                    onChange={(e) => setCurrentBook(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Adventure">Adventure</option>
                    <option value="Educational">Educational</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Science">Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                  <select
                    value={currentBook.theme || 'forest'}
                    onChange={(e) => setCurrentBook(prev => ({ ...prev, theme: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="forest">Forest</option>
                    <option value="ocean">Ocean</option>
                    <option value="sunset">Sunset</option>
                    <option value="night">Night</option>
                  </select>
                </div>
              </div>

              {/* File Uploads */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Book File *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    accept=".epub,.pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'book')}
                    className="hidden"
                    id="book-upload"
                  />
                  <label htmlFor="book-upload" className="cursor-pointer">
                    <span className="text-sm text-gray-600">
                      {currentBook.fileUrl ? 'File uploaded ✓' : 'Click to upload EPUB or PDF'}
                    </span>
                  </label>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-${colors.primary} h-2 rounded-full transition-all`}
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'cover')}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label htmlFor="cover-upload" className="cursor-pointer">
                    <span className="text-sm text-gray-600">
                      {currentBook.coverUrl ? 'Cover uploaded ✓' : 'Click to upload cover image'}
                    </span>
                  </label>
                </div>
              </div>

              {/* DRM Protection */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  id="drm"
                  checked={currentBook.isDRMProtected !== false}
                  onChange={(e) => setCurrentBook(prev => ({ ...prev, isDRMProtected: e.target.checked }))}
                  className="w-4 h-4"
                />
                <label htmlFor="drm" className="text-sm text-gray-700 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Enable DRM Protection (Recommended)
                </label>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`flex-1 px-4 py-2 bg-${colors.primary} text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2`}
              >
                <Save className="w-5 h-5" />
                Save Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
