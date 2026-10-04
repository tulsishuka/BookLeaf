

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
  Plus,
  Clock,
  CheckCircle2,
  HelpCircle,
  FileText,
} from 'lucide-react';

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
        const response = await api.get(
          '/auth/author/dashboard'
        );

        setData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(
          'Dashboard error:',
          error
        );

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
      <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[500px]">
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
      <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[500px]">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
            <h2 className="font-serif font-bold text-lg text-red-900">
              Unable to load dashboard
            </h2>

            <p className="text-sm text-red-600 mt-2">
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

  const {
    author,
    stats,
    books,
  } = data;

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
        book.status
          ?.toLowerCase()
          .includes('production') ||
        book.status
          ?.toLowerCase()
          .includes('progress')
    ) || books[0];

  // ================= BOOK STATUS =================

  const getStatusStyle = (
    status: string
  ) => {
    const normalizedStatus =
      status?.toLowerCase() || '';

    if (
      normalizedStatus.includes('production') ||
      normalizedStatus.includes('progress')
    ) {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }

    if (
      normalizedStatus.includes('publish') ||
      normalizedStatus.includes('complete')
    ) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }

    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  // ================= BOOK IMAGE =================

  const getBookImage = (
    book: Book,
    index: number
  ) => {
    if (book.coverImage) {
      return book.coverImage;
    }

    const fallbackImages = [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
    ];

    return fallbackImages[
      index % fallbackImages.length
    ];
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* --- TOP HEADER & ACTIONS --- */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">

          <div>

            <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              EDITORIAL OVERVIEW | AUTUMN 2026
            </span>

            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-0.5">
              Good morning, {author.name.split(' ')[0]}
            </h1>

            <p className="text-xs lg:text-sm text-gray-600 mt-1 max-w-2xl">
              Welcome back to your Bookleaf publishing portal.
              Your books, royalties, and publishing information
              are available here.
            </p>

          </div>

          <div className="flex items-center gap-3">

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F2EDE4] hover:bg-[#EAE4D8] text-gray-800 rounded-md text-xs font-semibold border border-gray-300/60 transition"
            >
              <Clock className="w-3.5 h-3.5 text-gray-600" />

              View Active Milestones
            </button>

            <Link
              to="/author/submit-query"
              className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 text-white rounded-md text-xs font-semibold shadow-sm transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />

              Submit a Support Query
            </Link>

          </div>

        </div>

        {/* --- TOP STATS ROW --- */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {topStats.map((stat, idx) => {

            const Icon = stat.icon;

            return (
              <div
                key={idx}
                className="p-5 rounded-lg border bg-[#F8F5EE] border-gray-200/80 flex flex-col justify-between"
              >

                <div className="flex items-center justify-between">

                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    {stat.title}
                  </span>

                  <div className="p-1.5 rounded bg-white border border-gray-200 text-gray-700">
                    <Icon className="w-4 h-4" />
                  </div>

                </div>

                <div className="my-3">

                  <span
                    className={`text-3xl font-serif font-bold ${
                      stat.highlight
                        ? 'text-amber-900'
                        : 'text-gray-900'
                    }`}
                  >
                    {stat.value}
                  </span>

                </div>

                <div className="text-xs pt-2 border-t border-gray-200/80 text-gray-500 truncate">
                  {stat.subtext}
                </div>

              </div>
            );
          })}

        </div>

        {/* --- MIDDLE FEATURE: ACTIVE PRODUCTION WORKBENCH --- */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Active Book Showcase */}

          <div className="lg:col-span-5 bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 flex flex-col justify-between">

            <div>

              <div className="flex items-center justify-between mb-4">

                <span className="bg-orange-100 text-orange-800 border border-orange-200 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                  {activeBook?.status || 'NO ACTIVE BOOK'}
                </span>

                <span className="text-[11px] font-mono text-gray-400">
                  FOLIO NO. {activeBook?.bookId || '—'}
                </span>

              </div>

              {activeBook ? (
                <div className="flex gap-4 items-start">

                  <img
                    src={getBookImage(
                      activeBook,
                      0
                    )}
                    alt={activeBook.title}
                    className="w-28 h-36 object-cover rounded border border-gray-300 shadow-sm flex-shrink-0"
                  />

                  <div className="space-y-1">

                    <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase block">
                      BOOKLEAF PUBLISHING
                    </span>

                    <h3 className="font-serif font-bold text-xl text-gray-900 leading-tight">
                      {activeBook.title}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {author.name}
                    </p>

                    <div className="pt-2 text-xs space-y-1 text-gray-600">

                      <div className="font-mono text-[11px]">
                        ISBN: {activeBook.isbn}
                      </div>

                      <div className="flex items-center gap-1.5 text-emerald-800 font-medium">

                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />

                        <span>
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

            <div className="mt-5 pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs">

              <span className="text-gray-500 font-medium">
                PUBLISHING STATUS
              </span>

              <button className="text-gray-900 font-semibold hover:underline flex items-center gap-1">
                <span>Detailed Status</span>

                <ChevronRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

          {/* Active Milestone Progress & Editorial Note */}

          <div className="lg:col-span-7 bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 flex flex-col justify-between">

            <div>

              <div className="flex items-center justify-between border-b border-gray-200/80 pb-3 mb-4">

                <div>

                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    CURRENT MILESTONE
                  </span>

                  <h3 className="font-serif font-bold text-lg text-gray-900">
                    Publishing Progress
                  </h3>

                </div>

                <span className="bg-amber-100 text-amber-900 font-mono text-xs font-bold px-2.5 py-1 rounded border border-amber-200">
                  {activeBook
                    ? activeBook.status
                    : 'No active project'}
                </span>

              </div>

              {/* Progress Steps Overview */}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-5">

                <div className="bg-[#F2EDE4] p-2 rounded">
                  <span className="text-[10px] text-gray-400 block font-bold">
                    BOOKS
                  </span>

                  <span className="font-semibold text-gray-800">
                    {stats.totalBooks} Titles
                  </span>
                </div>

                <div className="bg-[#F2EDE4] p-2 rounded">
                  <span className="text-[10px] text-gray-400 block font-bold">
                    COPIES SOLD
                  </span>

                  <span className="font-semibold text-gray-800">
                    {stats.totalCopiesSold.toLocaleString()}
                  </span>
                </div>

                <div className="bg-[#F2EDE4] p-2 rounded border border-amber-300 bg-amber-50">
                  <span className="text-[10px] text-amber-800 block font-bold">
                    ROYALTY PAID
                  </span>

                  <span className="font-semibold text-amber-900">
                    ₹{stats.royaltyPaid.toLocaleString()}
                  </span>
                </div>

                <div className="bg-[#F2EDE4] p-2 rounded opacity-60">
                  <span className="text-[10px] text-gray-400 block font-bold">
                    ROYALTY PENDING
                  </span>

                  <span className="font-semibold text-gray-700">
                    ₹{stats.royaltyPending.toLocaleString()}
                  </span>
                </div>

              </div>

              {/* Editorial Quote Box */}

              <div className="bg-[#F2EDE4] p-4 rounded-md border border-gray-300/50 relative">

                <div className="flex items-start gap-3">

                  <div className="w-8 h-8 rounded-full bg-amber-800 text-white font-serif font-bold flex items-center justify-center text-xs flex-shrink-0">
                    BL
                  </div>

                  <div>

                    <div className="flex items-center gap-2">

                      <span className="font-serif font-bold text-gray-900 text-sm">
                        BookLeaf Publishing
                      </span>

                      <span className="text-[10px] font-semibold text-gray-400 uppercase">
                        Editorial Team
                      </span>

                    </div>

                    <p className="text-xs text-gray-700 italic mt-1 leading-relaxed">
                      Your publishing information, book
                      details, and royalty records are
                      connected to your author account.
                    </p>

                    <div className="mt-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                      Live account information
                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs text-gray-500">

              <span className="truncate">
                Total royalty earned: ₹
                {stats.totalRoyaltyEarned.toLocaleString()}
              </span>

              <button className="text-gray-900 font-semibold hover:underline whitespace-nowrap flex items-center gap-1">
                <span>View Royalty Details</span>

                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>

        {/* --- MY BOOKS COLLECTION --- */}

        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <div>

              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                COLOPHON & BIBLIOGRAPHY
              </span>

              <h2 className="text-2xl font-serif font-bold text-gray-900">
                My Books Collection
              </h2>

            </div>

            <Link
              to="/author/books"
              className="text-xs font-semibold text-gray-800 hover:underline flex items-center gap-1"
            >
              <span>View All Books</span>

              <ChevronRight className="w-4 h-4" />
            </Link>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {books.map((book, index) => (

              <div
                key={book.bookId}
                className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 flex flex-col justify-between hover:shadow-sm transition"
              >

                <div>

                  <div className="relative aspect-[3/4] rounded overflow-hidden mb-3 bg-gray-200 border border-gray-300/60">

                    <img
                      src={getBookImage(
                        book,
                        index
                      )}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />

                    <span
                      className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold border ${getStatusStyle(
                        book.status
                      )}`}
                    >
                      {book.status}
                    </span>

                  </div>

                  <h3 className="font-serif font-bold text-base text-gray-900 truncate">
                    {book.title}
                  </h3>

                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                    {book.genre} • {book.isbn}
                  </p>

                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs">

                  <div>

                    <span className="text-[9px] text-gray-400 font-semibold block">
                      CIRCULATION
                    </span>

                    <span className="font-semibold text-gray-800 text-[11px]">
                      {book.totalCopiesSold.toLocaleString()} COPIES
                    </span>

                  </div>

                  <div className="text-right">

                    <span className="text-[9px] text-gray-400 font-semibold block">
                      MSRP
                    </span>

                    <span className="font-serif font-bold text-gray-900">
                      {book.mrp !== null
                        ? `₹${book.mrp}`
                        : '—'}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* --- BOTTOM SECTION: SUPPORT TICKETS & HELP CARD --- */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Recent Support Activity */}

          <div className="lg:col-span-8 bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6">

            <div className="flex items-center justify-between border-b border-gray-200/80 pb-4 mb-4">

              <div>

                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  AUTHOR SUPPORT DESK
                </span>

                <h3 className="text-lg font-serif font-bold text-gray-900">
                  Recent Support Activity
                </h3>

              </div>

              <button className="text-xs font-semibold text-gray-700 hover:underline">
                View All Tickets
              </button>

            </div>

            {/* Tickets are not connected yet */}
            <div className="bg-[#F2EDE4] p-5 rounded border border-gray-300/40">

              <div className="flex items-center gap-3">

                <div className="p-2 bg-white rounded border border-gray-200 text-gray-700">
                  <FileText className="w-4 h-4" />
                </div>

                <div>

                  <h4 className="font-semibold text-xs text-gray-900">
                    No support activity available yet
                  </h4>

                  <p className="text-[11px] text-gray-500 mt-1">
                    Your support tickets will appear here once
                    the ticket system is connected to the backend.
                  </p>

                </div>

              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs text-gray-500">

              <span>
                Support tickets
              </span>

              <Link
                to="/author/submit-query"
                className="text-gray-900 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />

                <span>New Ticket</span>
              </Link>

            </div>

          </div>

          {/* Need Help CTA Banner */}

          <div className="lg:col-span-4 bg-[#1C1A17] text-white rounded-lg p-6 flex flex-col justify-between h-full min-h-[300px]">

            <div>

              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-amber-400 mb-4">

                <HelpCircle className="w-5 h-5" />

              </div>

              <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase block">
                EDITORIAL CONCIERGE
              </span>

              <h3 className="text-xl font-serif font-bold text-white mt-1">
                Need Help with Your Publication?
              </h3>

              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Have questions regarding ISBN assignment,
                typesetting timelines, distribution queries,
                or ordering author copies?
              </p>

              <ul className="mt-4 space-y-2 text-xs text-gray-300">

                <li className="flex items-center gap-2">

                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />

                  <span>
                    Direct access to lead typesetters
                  </span>

                </li>

                <li className="flex items-center gap-2">

                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />

                  <span>
                    Royalty statement audit assistance
                  </span>

                </li>

                <li className="flex items-center gap-2">

                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />

                  <span>
                    Sample proof sign-off approval
                  </span>

                </li>

              </ul>

            </div>

            <Link
              to="/author/submit-query"
              className="mt-6 w-full py-2.5 bg-[#B87A4B] hover:bg-[#A36A3F] text-white text-xs font-semibold rounded transition flex items-center justify-center gap-2 shadow-sm"
            >

              <MessageSquare className="w-3.5 h-3.5" />

              <span>
                Submit a Support Query
              </span>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthDashboard;