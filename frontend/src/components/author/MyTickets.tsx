/* eslint-disable react-hooks/set-state-in-effect */


import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Plus,
  ChevronDown,
  ArrowUpRight,
  BookOpen,
  Clock,
  Sparkles,
  FileText,
  ShieldCheck,
} from 'lucide-react';

interface BookInfo {
  _id: string;
  title: string;
  isbn: string;
}

interface Ticket {
  _id: string;
  authorId: string;
  bookId?: BookInfo | null;
  subject: string;
  description: string;
  category:
    | 'Royalty & Payments'
    | 'ISBN & Metadata Issues'
    | 'Printing & Quality'
    | 'Distribution & Availability'
    | 'Book Status & Production Updates'
    | 'General Inquiry';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo?: string | null;
  createdAt: string;
  updatedAt: string;
}

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ============================================================
// HELPERS
// ============================================================

const formatDate = (dateString: string) => {
  if (!dateString) return '';

  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getTicketId = (id: string) => {
  return `TKT-${id.slice(-6).toUpperCase()}`;
};

const getTimeAgo = (dateString: string) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return 'just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} ${
      diffHours === 1 ? 'hour' : 'hours'
    } ago`;
  }

  if (diffDays < 30) {
    return `${diffDays} ${
      diffDays === 1 ? 'day' : 'days'
    } ago`;
  }

  return formatDate(dateString);
};

const getStatusClass = (status: Ticket['status']) => {
  switch (status) {
    case 'Open':
      return 'bg-blue-100 text-blue-900 border-blue-300';

    case 'In Progress':
      return 'bg-amber-100 text-amber-900 border-amber-300';

    case 'Resolved':
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';

    case 'Closed':
      return 'bg-gray-100 text-gray-700 border-gray-300';

    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const getPriorityClass = (
  priority: Ticket['priority']
) => {
  switch (priority) {
    case 'Critical':
      return 'bg-red-200 text-red-900 border-red-300';

    case 'High':
      return 'bg-red-100 text-red-800 border-red-200';

    case 'Medium':
      return 'bg-amber-100 text-amber-900 border-amber-200';

    case 'Low':
      return 'bg-gray-100 text-gray-700 border-gray-200';

    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

// ============================================================
// COMPONENT
// ============================================================

const MyTickets = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedBookFilter, setSelectedBookFilter] =
    useState('All Books');

  const [sortOrder, setSortOrder] =
    useState('Latest Updated');

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ============================================================
  // FETCH AUTHOR TICKETS
  // ============================================================

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please login again.');
        return;
      }

      const response = await fetch(
        `${API_URL}/api/tickets/my`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || 'Failed to fetch tickets'
        );
      }

      setTickets(data.tickets || []);
    } catch (err) {
      console.error('Get tickets error:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load tickets'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // ============================================================
  // BOOK FILTER OPTIONS
  // ============================================================

  const bookOptions = useMemo(() => {
    const books = tickets
      .map((ticket) => ticket.bookId?.title)
      .filter(
        (title): title is string =>
          Boolean(title)
      );

    return [...new Set(books)];
  }, [tickets]);

  // ============================================================
  // FILTER + SEARCH + SORT
  // ============================================================

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    // -----------------------------------------
    // STATUS FILTER
    // -----------------------------------------

    if (activeTab !== 'All') {
      result = result.filter(
        (ticket) => ticket.status === activeTab
      );
    }

    // -----------------------------------------
    // BOOK FILTER
    // -----------------------------------------

    if (selectedBookFilter !== 'All Books') {
      result = result.filter(
        (ticket) =>
          ticket.bookId?.title === selectedBookFilter
      );
    }

    // -----------------------------------------
    // SEARCH
    // -----------------------------------------

    if (searchQuery.trim()) {
      const query = searchQuery
        .toLowerCase()
        .trim();

      result = result.filter((ticket) => {
        const ticketId = getTicketId(ticket._id);

        return (
          ticketId
            .toLowerCase()
            .includes(query) ||
          ticket.subject
            .toLowerCase()
            .includes(query) ||
          ticket.description
            .toLowerCase()
            .includes(query) ||
          ticket.bookId?.title
            ?.toLowerCase()
            .includes(query)
        );
      });
    }

    // -----------------------------------------
    // SORT
    // -----------------------------------------

    if (sortOrder === 'Latest Updated') {
      result.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      );
    }

    if (sortOrder === 'Oldest First') {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
      );
    }

    if (sortOrder === 'Priority') {
      const priorityOrder: Record<
        Ticket['priority'],
        number
      > = {
        Critical: 1,
        High: 2,
        Medium: 3,
        Low: 4,
      };

      result.sort(
        (a, b) =>
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
      );
    }

    return result;
  }, [
    tickets,
    activeTab,
    selectedBookFilter,
    searchQuery,
    sortOrder,
  ]);

  // ============================================================
  // STATUS COUNTS
  // ============================================================

  const filterTabs = useMemo(() => {
    return [
      {
        label: 'All',
        count: tickets.length,
      },
      {
        label: 'Open',
        count: tickets.filter(
          (ticket) => ticket.status === 'Open'
        ).length,
      },
      {
        label: 'In Progress',
        count: tickets.filter(
          (ticket) => ticket.status === 'In Progress'
        ).length,
      },
      {
        label: 'Resolved',
        count: tickets.filter(
          (ticket) => ticket.status === 'Resolved'
        ).length,
      },
      {
        label: 'Closed',
        count: tickets.filter(
          (ticket) => ticket.status === 'Closed'
        ).length,
      },
    ];
  }, [tickets]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">

              <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4" />

              <p className="text-sm text-gray-600">
                Loading your support tickets...
              </p>

            </div>
          </div>

        </div>
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* --- BREADCRUMB & HEADER TOP --- */}

        <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">

          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-semibold text-gray-900">
              My Tickets
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">

            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

            <span>DESPATCH QUEUE SYNCED</span>

            <span>
              • Registry BL - A1024
            </span>

          </div>

        </div>

        {/* --- PAGE HEADING & MAIN CTA --- */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#F2EDE4] border border-gray-300/50 text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2">

              <Sparkles className="w-3 h-3 text-amber-800" />

              <span>
                Editorial Docket & Author Correspondence
              </span>

            </div>

            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">
              My Support Tickets & Archival Inquiries
            </h1>

            <p className="text-xs lg:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Track your inquiries, follow direct dialogue with your managing editor, and inspect historical resolutions across your published bibliography.
            </p>

          </div>

          <button
            onClick={() => {
              window.location.href =
                '/author/submit-query';
            }}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-md text-xs font-semibold shadow-sm transition whitespace-nowrap self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />

            <span>
              + New Support Query
            </span>

          </button>

        </div>

        {/* --- ERROR --- */}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between gap-4">

            <p className="text-xs text-red-700">
              {error}
            </p>

            <button
              onClick={fetchTickets}
              className="px-3 py-1.5 bg-black text-white rounded text-xs font-semibold"
            >
              Retry
            </button>

          </div>
        )}

        {/* --- CONTROLS BAR --- */}

        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-4">

          {/* Row 1 */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

            {/* Search */}

            <div className="md:col-span-6 relative">

              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search by ticket ID, subject, or manuscript..."
                className="w-full bg-white border border-gray-300 rounded pl-9 pr-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
              />

            </div>

            {/* Book Filter */}

            <div className="md:col-span-3 relative">

              <select
                value={selectedBookFilter}
                onChange={(e) =>
                  setSelectedBookFilter(e.target.value)
                }
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 font-medium appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-black"
              >

                <option>
                  All Books ({bookOptions.length})
                </option>

                {bookOptions.map((book) => (
                  <option
                    key={book}
                    value={book}
                  >
                    {book}
                  </option>
                ))}

              </select>

              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

            </div>

            {/* Sort */}

            <div className="md:col-span-3 relative">

              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 font-medium appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-black"
              >

                <option value="Latest Updated">
                  Sort: Latest Updated
                </option>

                <option value="Oldest First">
                  Sort: Oldest First
                </option>

                <option value="Priority">
                  Sort: Priority
                </option>

              </select>

              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

            </div>

          </div>

          {/* Row 2 */}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-200/60">

            <div className="flex flex-wrap items-center gap-1.5">

              {filterTabs.map((tab) => {

                const isActive =
                  activeTab === tab.label;

                return (
                  <button
                    key={tab.label}
                    onClick={() =>
                      setActiveTab(tab.label)
                    }
                    className={`px-3 py-1 rounded text-xs font-semibold transition flex items-center gap-1 ${
                      isActive
                        ? 'bg-black text-white'
                        : 'bg-[#F2EDE4] text-gray-700 hover:bg-gray-200 border border-gray-300/40'
                    }`}
                  >

                    <span>
                      {tab.label}
                    </span>

                    <span
                      className={`text-[10px] ${
                        isActive
                          ? 'opacity-80'
                          : 'text-gray-500'
                      }`}
                    >
                      ({tab.count})
                    </span>

                  </button>
                );
              })}

            </div>

            <div className="text-[11px] text-gray-500 flex items-center gap-1.5">

              <Clock className="w-3.5 h-3.5 text-amber-800" />

              <span>
                Guaranteed Desk Response: within 24 business hours
              </span>

            </div>

          </div>

        </div>

        {/* ======================================================
            TICKETS LIST
        ====================================================== */}

        <div className="space-y-4">

          {filteredTickets.length === 0 ? (

            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-12 text-center">

              <FileText className="w-10 h-10 text-gray-400 mx-auto mb-3" />

              <h3 className="font-serif font-bold text-lg text-gray-900">
                No support tickets found
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {tickets.length === 0
                  ? 'You have not submitted any support queries yet.'
                  : 'Try changing your search or filters.'}
              </p>

            </div>

          ) : (

            filteredTickets.map((ticket) => {

              const statusClass =
                getStatusClass(ticket.status);

              const priorityClass =
                getPriorityClass(ticket.priority);

              return (
                <div
                  key={ticket._id}
                  className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 lg:p-6 transition hover:shadow-sm space-y-4 relative"
                >

                  {/* Card Header */}

                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200/80 pb-3">

                    <div className="flex items-center gap-2">

                      <span className="font-mono text-xs font-bold text-gray-900">
                        {getTicketId(ticket._id)}
                      </span>

                      {ticket.priority && (
                        <span
                          className={`${priorityClass} text-[9px] font-bold px-2 py-0.5 rounded tracking-wide uppercase`}
                        >
                          {ticket.priority} PRIORITY
                        </span>
                      )}

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${statusClass}`}
                      >
                        {ticket.status}
                      </span>

                      <span className="text-gray-300">
                        •
                      </span>

                      <span className="text-[11px] font-medium text-gray-500">
                        {ticket.category}
                      </span>

                    </div>

                    {ticket.status === 'Resolved' ||
                    ticket.status === 'Closed' ? (
                      <span className="text-[11px] text-gray-500 flex items-center gap-1 font-mono">

                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />

                        Case Closed & Registered

                      </span>
                    ) : null}

                  </div>

                  {/* Main Content */}

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">

                    <div className="md:col-span-8 space-y-2">

                      <h3 className="text-lg font-serif font-bold text-gray-900 leading-snug hover:underline cursor-pointer">
                        {ticket.subject}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed italic bg-[#F2EDE4]/60 p-3 rounded border border-gray-200/60">
                        "{ticket.description}"
                      </p>

                    </div>

                    {/* Right Side */}

                    <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between h-full space-y-3">

                      <div className="bg-[#F2EDE4] p-2.5 rounded border border-gray-300/50 flex items-center gap-2.5 max-w-xs w-full">

                        <div className="w-8 h-8 rounded bg-amber-800 text-white font-serif font-bold flex items-center justify-center text-xs flex-shrink-0">
                          AD
                        </div>

                        <div className="min-w-0">

                          <div className="font-semibold text-xs text-gray-900 truncate">
                            Author Support Desk
                          </div>

                          <div className="text-[10px] text-gray-500 truncate">
                            Managing Editorial Team
                          </div>

                        </div>

                      </div>

                      <button
                        onClick={() => {
                          window.location.href =
                            `/author/tickets/${ticket._id}`;
                        }}
                        className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs font-semibold rounded flex items-center gap-1.5 transition shadow-2xs"
                      >

                        <span>
                          {ticket.status === 'Resolved' ||
                          ticket.status === 'Closed'
                            ? 'View Archival Proof'
                            : 'Open Ticket Dossier'}
                        </span>

                        <ArrowUpRight className="w-3.5 h-3.5 text-gray-600" />

                      </button>

                    </div>

                  </div>

                  {/* Footer */}

                  <div className="pt-3 border-t border-gray-200/80 flex flex-wrap items-center justify-between text-xs text-gray-500">

                    <div className="flex items-center gap-2">

                      <BookOpen className="w-3.5 h-3.5 text-amber-800" />

                      <span className="font-medium text-gray-800">

                        {ticket.bookId?.title ||
                          'General / Account Level'}

                      </span>

                    </div>

                    <div className="flex items-center gap-3 text-[11px]">

                      <span>
                        Logged: {formatDate(ticket.createdAt)}
                      </span>

                      <span className="font-semibold text-amber-900">
                        • Updated {getTimeAgo(ticket.updatedAt)}
                      </span>

                    </div>

                  </div>

                </div>
              );
            })
          )}

        </div>

        {/* --- BOTTOM CALLOUT BANNER --- */}

        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="p-2.5 bg-[#F2EDE4] border border-gray-300/50 rounded text-amber-800 flex-shrink-0">

              <FileText className="w-5 h-5" />

            </div>

            <div>

              <h4 className="font-serif font-bold text-sm text-gray-900">
                Need an immediate editorial clarification?
              </h4>

              <p className="text-xs text-gray-500">
                Managing editors review manuscript and ledger inquiries Mon–Fri, 9:00 AM – 6:00 PM IST.
              </p>

            </div>

          </div>

          <button
            onClick={() => {
              window.location.href =
                '/author/submit-query';
            }}
            className="px-4 py-2.5 bg-black hover:bg-gray-800 text-white rounded text-xs font-semibold transition whitespace-nowrap shadow-xs"
          >
            Draft New Dispatch
          </button>

        </div>

      </div>

    </div>
  );
};

export default MyTickets;

