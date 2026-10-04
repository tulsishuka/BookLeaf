

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  TrendingUp,
  CreditCard,
  MessageSquare,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import book1 from '../../assets/book1.png';
import butterfly from '../../assets/butterfly.png';

import api from '../../api/api';

interface Book {
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
  authorId: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  joinedDate?: string;
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

const AuthDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ================= FETCH REAL BACKEND DATA =================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/auth/author/dashboard');

        setData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Dashboard error:', error);

        setError(
          error.response?.data?.message ||
            'Unable to load dashboard data.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] px-4 py-6 sm:p-6 lg:p-10 text-gray-800 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px] sm:min-h-[500px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4" />

            <p className="text-sm text-gray-500">
              Loading your publishing dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] px-4 py-6 sm:p-6 lg:p-10 text-gray-800 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px] sm:min-h-[500px]">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5 sm:p-6 text-center max-w-md w-full">
            <h2 className="font-serif font-bold text-lg text-red-900">
              Unable to load dashboard
            </h2>

            <p className="text-sm text-red-600 mt-2 break-words">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // ================= REAL DATA =================

  const { author, stats, books } = data;

  // ================= TOP STATS =================

  const topStats = [
    {
      title: 'TITLES BOUND',
      value: String(stats.totalBooks).padStart(2, '0'),
      subtext: `${stats.totalBooks} titles in your collection`,
      icon: BookOpen,
    },
    {
      title: 'TOTAL READERSHIP REACH',
      value: stats.totalCopiesSold.toLocaleString(),
      subtext: 'Total copies sold',
      icon: Users,
    },
    {
      title: 'TOTAL ROYALTY (Gross)',
      value: `₹${stats.totalRoyaltyEarned.toLocaleString()}`,
      subtext: 'Total royalty earned',
      icon: TrendingUp,
    },
    {
      title: 'OUTSTANDING PAYOUT',
      value: `₹${stats.royaltyPending.toLocaleString()}`,
      subtext: 'Royalty currently pending',
      icon: CreditCard,
      highlight: true,
    },
  ];

  // ================= ACTIVE BOOK =================

  const activeBook =
    books.find(
      (book) =>
        book.status?.toLowerCase().includes('production') ||
        book.status?.toLowerCase().includes('progress')
    ) || books[0];

  // ================= BOOK STATUS =================

  const getStatusStyle = (status: string) => {
    const normalizedStatus = status?.toLowerCase() || '';

    if (
      normalizedStatus.includes('production') ||
      normalizedStatus.includes('progress')
    ) {
      return 'bg-[#9c6a3a] text-white border-[#9c6a3a]';
    }

    if (
      normalizedStatus.includes('publish') ||
      normalizedStatus.includes('complete')
    ) {
      return 'bg-[#9c6a3a] text-white border-[#9c6a3a]';
    }

    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

 

  const getBookImage = (book: Book, index: number) => {
  if (book.coverImage) {
    return book.coverImage;
  }

  const fallbackImages = [
    book1,
    butterfly,
  ];

  return fallbackImages[index % fallbackImages.length];
};

  return (
    <div className="min-h-screen bg-[#FDFBF7] px-4 py-5 sm:p-6 lg:p-10 text-gray-800 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

      
        <div className="flex flex-col gap-5 border-b border-gray-200/80 pb-5 sm:pb-6 md:flex-row md:items-center md:justify-between">

          <div className="min-w-0">
           

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#9c6a3a] mt-1 break-words">
              Good morning, {author.name.split(' ')[0]}
            </h1>

            <p className="text-xs sm:text-sm text-[#6e6357] mt-1 max-w-2xl leading-relaxed">
              Welcome back to your Bookleaf publishing portal.
              Your books, royalties, and publishing information are
              available here.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
  <Link
    to="/author/submit-query"
    className="flex w-full items-center justify-center gap-2 rounded-md bg-[#9c6a3a]  px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-gray-800 sm:w-auto sm:px-5"
  >
    <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" />
    <span className="whitespace-nowrap">Submit a Support Query</span>
  </Link>
</div>
        </div>


        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

          {topStats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-lg border bg-[#F8F5EE] border-[#9c6a3a] flex flex-col justify-between min-w-0"
              >
                <div className="flex items-center justify-between gap-2">

                  <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-gray-400 uppercase leading-tight">
                    {stat.title}
                  </span>

                  <div className="p-1.5 rounded bg-white border border-gray-200 text-gray-700 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>

                </div>

                <div className="my-3">
                  <span
                    className={`text-2xl sm:text-3xl font-serif font-bold break-words ${
                      stat.highlight
                        ? 'text-amber-900'
                        : 'text-gray-900'
                    }`}
                  >
                    {stat.value}
                  </span>
                </div>

                <div className="text-[11px] sm:text-xs pt-2 border-t border-gray-200/80 text-gray-500 truncate">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================================================= */}
        {/* ACTIVE PRODUCTION WORKBENCH */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

          {/* ACTIVE BOOK */}

          <div className="lg:col-span-5 bg-[#F8F5EE] border border-[#9c6a3a] rounded-lg p-4 sm:p-5 flex flex-col justify-between min-w-0">

            <div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">

                <span
                  className={`self-start max-w-full truncate ${getStatusStyle(
                    activeBook?.status || ''
                  )} text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded tracking-wide uppercase`}
                >
                  {activeBook?.status || 'NO ACTIVE BOOK'}
                </span>

                <span className="text-[10px] sm:text-[11px] font-mono text-gray-400 truncate">
                  FOLIO NO. {activeBook?.bookId || '—'}
                </span>

              </div>

              {activeBook ? (
                <div className="flex gap-3 sm:gap-4 items-start min-w-0">

                  <img
                    src={getBookImage(activeBook, 0)}
                    alt={activeBook.title}
                    className="w-20 h-28 sm:w-24 sm:h-32 lg:w-28 lg:h-36 object-cover rounded border border-gray-300 shadow-sm flex-shrink-0"
                  />

                  <div className="space-y-1 min-w-0 flex-1">

                    <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-gray-400 uppercase block truncate">
                      BOOKLEAF PUBLISHING
                    </span>

                    <h3 className="font-serif font-bold text-lg sm:text-xl text-gray-900 leading-tight break-words">
                      {activeBook.title}
                    </h3>

                    <p className="text-xs text-gray-500 truncate">
                      {author.name}
                    </p>

                    <div className="pt-2 text-xs space-y-1 text-gray-600">

                      <div className="font-mono text-[10px] sm:text-[11px] break-all">
                        ISBN: {activeBook.isbn}
                      </div>

                      <div className="flex items-start gap-1.5 text-emerald-800 font-medium">

                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />

                        <span className="break-words">
                          {activeBook.status}
                        </span>

                      </div>

                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No books found in your account.
                </p>
              )}
            </div>

            {/* BOTTOM ACTION */}

            <div className="mt-5 pt-3 border-t border-gray-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">

              <span className="text-gray-500 font-medium">
                PUBLISHING STATUS
              </span>

              <button className="text-gray-900 font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto">
                <span>Detailed Status</span>

                <ChevronRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>

      

          <div className="lg:col-span-7 bg-[#F8F5EE] border border-[#9c6a3a] rounded-lg p-4 sm:p-6 flex flex-col justify-between min-w-0">

            <div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#9c6a3a] pb-3 mb-4">

                <div className="min-w-0">

                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    CURRENT MILESTONE
                  </span>

                  <h3 className="font-serif font-bold text-lg text-gray-900">
                    Publishing Progress
                  </h3>

                </div>

                <span className="self-start sm:self-auto max-w-full truncate bg-[#9c6a3a] text-white font-mono text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded border border-amber-200">
                  {activeBook
                    ? activeBook.status
                    : 'No active project'}
                </span>

              </div>

              {/* PROGRESS STATS */}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-5">

                <div className="bg-[#F2EDE4] p-2.5 rounded min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-gray-400 block font-bold">
                    BOOKS
                  </span>

                  <span className="font-semibold text-gray-800 break-words">
                    {stats.totalBooks} Titles
                  </span>
                </div>

                <div className="bg-[#F2EDE4] p-2.5 rounded min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-gray-400 block font-bold">
                    COPIES SOLD
                  </span>

                  <span className="font-semibold text-gray-800 break-words">
                    {stats.totalCopiesSold.toLocaleString()}
                  </span>
                </div>

                <div className="bg-amber-50 p-2.5 rounded border border-amber-300 min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-amber-800 block font-bold">
                    ROYALTY PAID
                  </span>

                  <span className="font-semibold text-amber-900 break-words">
                    ₹{stats.royaltyPaid.toLocaleString()}
                  </span>
                </div>

                <div className="bg-[#F2EDE4] p-2.5 rounded opacity-60 min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-gray-400 block font-bold">
                    ROYALTY PENDING
                  </span>

                  <span className="font-semibold text-gray-700 break-words">
                    ₹{stats.royaltyPending.toLocaleString()}
                  </span>
                </div>

              </div>

              {/* EDITORIAL NOTE */}

              <div className="bg-[#F2EDE4] p-3 sm:p-4 rounded-md border border-gray-300/50 relative">

                <div className="flex items-start gap-3">

                  <div className="w-8 h-8 rounded-full bg-amber-800 text-white font-serif font-bold flex items-center justify-center text-xs flex-shrink-0">
                    BL
                  </div>

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">

                      <span className="font-serif font-bold text-gray-900 text-sm">
                        BookLeaf Publishing
                      </span>

                      <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase">
                        Editorial Team
                      </span>

                    </div>

                    <p className="text-xs text-gray-700 italic mt-1 leading-relaxed">
                      Your publishing information, book details,
                      and royalty records are connected to your
                      author account.
                    </p>

                    <div className="mt-2 text-[9px] sm:text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                      Live account information
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* ROYALTY ACTION */}

            <div className="mt-4 pt-3 border-t border-gray-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-500">

              <span className="break-words">
                Total royalty earned: ₹
                {stats.totalRoyaltyEarned.toLocaleString()}
              </span>

              <button className="text-gray-900 font-semibold hover:underline whitespace-nowrap flex items-center gap-1 self-start sm:self-auto">
                <span>View Royalty Details</span>

                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* MY BOOKS COLLECTION */}
        {/* ================================================= */}

        <div className="space-y-4">

  {/* SECTION HEADER */}
  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
    <div className="min-w-0">
      <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
        COLOPHON & BIBLIOGRAPHY
      </span>

      <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
        My Books Collection
      </h2>
    </div>

    <Link
      to="/author/books"
      className="text-xs font-semibold text-gray-800 hover:underline flex items-center gap-1 self-start sm:self-auto"
    >
      <span>View All Books</span>
      <ChevronRight className="w-4 h-4" />
    </Link>
  </div>

  {/* BOOK GRID */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

    {books.map((book, index) => (
      <div
        key={book.bookId}
        className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg flex flex-col justify-between hover:shadow-sm transition min-w-0 overflow-hidden"
      >

        {/* COVER */}
        <div className="relative aspect-[3/4] overflow-hidden">

          <img
            src={getBookImage(book, index)}
            alt={book.title}
            className="w-full h-full object-cover"
          />

          <span
            className={`absolute top-2 left-2 right-2 sm:right-auto max-w-[calc(100%-16px)] truncate px-2 py-1 rounded text-[8px] sm:text-[9px] font-bold border ${getStatusStyle(
              book.status
            )}`}
          >
            {book.status}
          </span>

        </div>

        {/* CONTENT WITH PADDING */}
        <div className="p-3.5 sm:p-4">

          {/* BOOK TITLE */}
          <h3 className="font-serif font-bold text-base text-gray-900 truncate">
            {book.title}
          </h3>

          <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5 truncate">
            {book.genre} • {book.isbn}
          </p>

          {/* BOOK DETAILS */}
          <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between gap-3 text-xs">

            <div className="min-w-0">
              <span className="text-[8px] sm:text-[9px] text-gray-400 font-semibold block">
                CIRCULATION
              </span>

              <span className="font-semibold text-gray-800 text-[10px] sm:text-[11px] truncate block">
                {book.totalCopiesSold.toLocaleString()} COPIES
              </span>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="text-[8px] sm:text-[9px] text-gray-400 font-semibold block">
                MSRP
              </span>

              <span className="font-serif font-bold text-gray-900">
                {book.mrp !== null ? `₹${book.mrp}` : '—'}
              </span>
            </div>

          </div>

        </div>

      </div>
    ))}

  </div>

  {/* EMPTY STATE */}
  {books.length === 0 && (
    <div className="bg-[#F8F5EE] border border-gray-200 rounded-lg p-8 text-center">
      <BookOpen className="w-8 h-8 mx-auto text-gray-400 mb-3" />

      <p className="text-sm text-gray-500">
        No books found in your account.
      </p>
    </div>
  )}

</div>
      </div>
    </div>
  );
};

export default AuthDashboard;