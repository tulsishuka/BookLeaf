/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Globe,
  Award,
  BookOpen,
  TrendingUp,
  Info,
  Sparkles,
 
} from 'lucide-react';

import l from '../../assets/l.png';
import butterfly from '../../assets/butterfly.png';

import api from '../../api/api';

interface Book {
  _id: string;
  bookId: string;
  authorId: string;
  title: string;
  isbn: string;
  genre: string;
  publicationDate: string | null;
  status: string;
  mrp: number | null;
  authorRoyaltyPerCopy: number | null;
  totalCopiesSold: number;
  totalRoyaltyEarned: number;
  royaltyPaid: number;
  royaltyPending: number;
  lastRoyaltyPayoutDate: string | null;
  printPartner: string | null;
  availableOn: string[];
  coverImage: string | null;
}

interface Author {
  _id: string;
  authorId?: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  joinedDate?: string;
  role: string;
}

interface DashboardData {
  author: Author;
  stats: {
    totalBooks: number;
    totalCopiesSold: number;
    totalRoyaltyEarned: number;
    royaltyPaid: number;
    royaltyPending: number;
  };
  books: Book[];
}

const MyBook = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get('/auth/author/dashboard');

        setData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('My Books error:', error);

        setError(
          error.response?.data?.message ||
            'Unable to load your books.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const books = data?.books || [];

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        book.isbn
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        book.genre
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const normalizedStatus =
        book.status.toLowerCase();

      let matchesFilter = true;

      if (activeFilter === 'Published') {
        matchesFilter =
          normalizedStatus === 'published';
      }

      if (activeFilter === 'In Production') {
        matchesFilter =
          normalizedStatus === 'in production';
      }

      if (activeFilter === 'Draft') {
        matchesFilter =
          normalizedStatus === 'draft';
      }

      return matchesSearch && matchesFilter;
    });
  }, [books, searchQuery, activeFilter]);

  const publishedCount = books.filter(
    (book) =>
      book.status.toLowerCase() === 'published'
  ).length;

  const productionCount = books.filter(
    (book) =>
      book.status.toLowerCase() === 'in production'
  ).length;

  const stats = data
    ? [
        {
          title: 'WORKS CATALOGUED',
          value: String(data.stats.totalBooks).padStart(2, '0'),
          unit: 'Titles bound',
          subtext:
            'Your books currently recorded in BookLeaf',
          icon: BookOpen,
          isDark: false,
        },
        {
          title: 'WORLDWIDE DISTRIBUTION',
          value: String(
            new Set(
              books.flatMap(
                (book) => book.availableOn || []
              )
            ).size
          ).padStart(2, '0'),
          unit: 'Channels active',
          subtext:
            'Distribution channels across your books',
          icon: Globe,
          isDark: false,
        },
        {
          title: 'IMPACT & STATUS',
          value: String(publishedCount).padStart(2, '0'),
          unit: 'Published titles',
          subtext: `${productionCount} currently in production`,
          icon: Award,
          isDark: false,
        },
        {
          title: 'LIFETIME ACCRUALS',
          value: `₹${data.stats.totalRoyaltyEarned.toLocaleString(
            'en-IN'
          )}`,
          unit: 'Gross INR',
          subtext: `₹${data.stats.royaltyPaid.toLocaleString(
            'en-IN'
          )} Settled | ₹${data.stats.royaltyPending.toLocaleString(
            'en-IN'
          )} Pending`,
          icon: TrendingUp,
          isDark: true,
        },
      ]
    : [];

  const getBookImage = (book: Book, index: number) => {
    if (book.coverImage) {
      return book.coverImage;
    }

    const fallbackImages = [l, butterfly];

    return fallbackImages[index % fallbackImages.length];
  };

  const getStatusColor = (status: string) => {
    const normalized = status.toLowerCase();

    if (normalized === 'published') {
      return 'bg-[#9c6a3a] text-white border-[#9c6a3a]';
    }

    if (normalized === 'in production') {
      return 'bg-[#9c6a3a] text-white border-[#9c6a3a]';
    }

    if (normalized === 'draft') {
      return 'bg-[#F2EDE4] text-[#6e6357] border-[#9c6a3a]';
    }

    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const formatDate = (date: string | null) => {
    if (!date) {
      return 'Date not available';
    }

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        month: 'short',
        year: 'numeric',
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-[#9c6a3a] rounded-full animate-spin mx-auto mb-4" />

            <p className="text-sm text-gray-500">
              Loading your books...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5 text-red-700 text-sm">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">

          <div>
           

            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#9c6a3a] mt-1">
              My Books
            </h1>

            <p className="text-sm text-[#6e6357] mt-1 max-w-2xl">
              Your published stories, archival records, and
              multi-channel circulation performance recorded
              under Bookleaf press mark.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">

           

            <button
              className="
                flex items-center justify-center gap-2
                px-5 py-2.5
                bg-[#9c6a3a]
                hover:bg-gray-800
                text-white
                rounded-md
                text-xs
                font-semibold
                shadow-sm
                transition
                w-full sm:w-auto
              "
            >
              <Plus className="w-4 h-4" />
              Submit New Manuscript
            </button>

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <div
                key={idx}
                className={`p-5 rounded-lg border flex flex-col justify-between transition-all ${
                  stat.isDark
                    ? 'bg-[#F8F5EE] text-gray-900 border-[#9c6a3a]  '
                    : 'bg-[#F8F5EE] text-gray-900 border-[#9c6a3a] '
                }`}
              >

                <div className="flex items-center justify-between">

                  <span
                    className={`text-[10px] font-bold tracking-wider uppercase ${
                      stat.isDark
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {stat.title}
                  </span>

                  <div
                    className={`p-1.5 rounded ${
                      stat.isDark
                        ? 'bg-white/10 text-white'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                </div>

                <div className="my-4">

                  <div className="flex items-baseline gap-2">

                    <span className="text-3xl font-serif font-bold tracking-tight">
                      {stat.value}
                    </span>

                    <span
                      className={`text-xs ${
                        stat.isDark
                          ? 'text-gray-300'
                          : 'text-gray-600'
                      }`}
                    >
                      {stat.unit}
                    </span>

                  </div>

                </div>

                <div
                  className={`text-xs pt-3 border-t ${
                    stat.isDark
                      ? 'border-white/10 text-gray-400'
                      : 'border-gray-200/80 text-gray-500'
                  }`}
                >
                  {stat.subtext}
                </div>

              </div>
            );
          })}

        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          <div className="relative flex-1 max-w-md">

            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search by title, ISBN, or edition..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="
                w-full
                pl-10
                pr-4
                py-2
                bg-[#F8F5EE]
                border border-[#9c6a3a]
                rounded-md
                text-xs
                text-gray-800
                placeholder-gray-400
                focus:outline-none
                focus:ring-1
                focus:ring-[#9c6a3a]
              "
            />

          </div>

          <div className="flex items-center gap-2 flex-wrap">

            {[
              'All',
              'Published',
              'In Production',
              'Draft',
            ].map((filter) => (

              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(filter)
                }
                className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                  activeFilter === filter
                    ? 'bg-[#9c6a3a] text-white'
                    : 'bg-[#F2EDE4] text-gray-700 hover:bg-[#EAE4D8] border border-gray-300/50'
                }`}
              >

                {filter}

                {filter === 'Published' && (
                  <span className="ml-1 text-[10px] opacity-75">
                    {publishedCount}
                  </span>
                )}

                {filter === 'In Production' && (
                  <span className="ml-1 text-[10px] opacity-75">
                    {productionCount}
                  </span>
                )}

              </button>

            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {filteredBooks.length === 0 ? (

            <div className="lg:col-span-2 bg-[#F8F5EE] border border-[#9c6a3a] rounded-lg p-10 text-center">

              <BookOpen className="w-8 h-8 mx-auto text-[#9c6a3a] mb-3" />

              <h3 className="font-serif text-lg font-bold text-gray-800">
                No books found
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            filteredBooks.map((book, index) => (

              <div
                key={book.bookId || book._id}
                className="
                  bg-[#F8F5EE]
                  border border-[#9c6a3a]
                  rounded-lg
                  p-5
                  flex flex-col
                  justify-between
                  hover:shadow-md
                  transition-shadow
                "
              >

                <div>

                  <div className="flex gap-5">

                    <div className="relative w-28 sm:w-36 h-40 sm:h-48 flex-shrink-0 bg-gray-200 rounded overflow-hidden shadow-sm border border-gray-300/60">

                      <img
                        src={getBookImage(book, index)}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-xs text-white text-[9px] font-bold py-0.5 px-1.5 rounded text-center uppercase tracking-wider">
                        {book.genre || 'BOOK'}
                      </div>

                    </div>

                    <div className="flex-1 min-w-0">

                      <div className="flex items-center justify-between gap-2 mb-1.5">

                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusColor(
                            book.status
                          )}`}
                        >
                          {book.status}
                        </span>

                        <span className="text-[11px] font-medium text-gray-400">
                          {formatDate(book.publicationDate)}
                        </span>

                      </div>

                      <h3 className="font-serif font-bold text-xl text-gray-900 leading-tight">
                        {book.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-0.5 mb-3">
                        {book.genre}
                      </p>

                      <div className="grid grid-cols-2 gap-2 bg-[#F2EDE4] p-2.5 rounded text-xs mb-3">

                        <div>
                          <span className="text-[10px] font-semibold text-gray-400 uppercase block">
                            ISBN-13
                          </span>

                          <span className="font-medium text-gray-800">
                            {book.isbn}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-semibold text-gray-400 uppercase block">
                            Retail Listing
                          </span>

                          <span className="font-medium text-gray-800">
                            {book.mrp !== null
                              ? `₹${book.mrp.toLocaleString(
                                  'en-IN'
                                )}`
                              : '—'}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-semibold text-gray-400 uppercase block">
                            Total Circulation
                          </span>

                          <span className="font-semibold text-gray-900">
                            {book.totalCopiesSold.toLocaleString(
                              'en-IN'
                            )}{' '}
                            copies
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-semibold text-gray-400 uppercase block">
                            Accrued Royalties
                          </span>

                          <span className="font-semibold text-gray-900">
                            ₹
                            {book.totalRoyaltyEarned.toLocaleString(
                              'en-IN'
                            )}
                          </span>
                        </div>

                      </div>

                      {book.status.toLowerCase() ===
                        'in production' && (

                        <div className="space-y-1 mb-2">

                          <div className="flex justify-between text-[10px] font-semibold text-gray-600">

                            <span>
                              Production Status
                            </span>

                            <span>
                              Active
                            </span>

                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">

                            <div
                              className="bg-[#9c6a3a] h-1.5 rounded-full"
                              style={{
                                width: '70%',
                              }}
                            />

                          </div>

                        </div>

                      )}

                      {book.availableOn &&
                        book.availableOn.length > 0 && (

                        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 rounded px-2 py-1 text-[11px] font-medium">

                          <Sparkles className="w-3 h-3 text-[#9c6a3a]" />

                          <span>
                            {book.availableOn.join(
                              ' • '
                            )}
                          </span>

                        </div>

                      )}

                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-3 border-t border-gray-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 min-w-0">

                    <Info className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />

                    <span className="truncate">
                      {book.printPartner
                        ? `Print partner: ${book.printPartner}`
                        : book.lastRoyaltyPayoutDate
                        ? `Last payout: ${formatDate(
                            book.lastRoyaltyPayoutDate
                          )}`
                        : 'Book information available in your catalog'}
                    </span>

                  </div>

                 

                </div>

              </div>

            ))
          )}

        </div>

      

      </div>
    </div>
  );
};

export default MyBook;
