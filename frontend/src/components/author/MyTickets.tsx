

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
  import.meta.env.VITE_API_URL || 'https://bookleaf-1-backend.onrender.com';

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

  const bookOptions = useMemo(() => {
    const books = tickets
      .map((ticket) => ticket.bookId?.title)
      .filter(
        (title): title is string =>
          Boolean(title)
      );

    return [...new Set(books)];
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    if (activeTab !== 'All') {
      result = result.filter(
        (ticket) => ticket.status === activeTab
      );
    }

    if (selectedBookFilter !== 'All Books') {
      result = result.filter(
        (ticket) =>
          ticket.bookId?.title === selectedBookFilter
      );
    }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] px-4 py-6 sm:px-6 lg:px-10 text-gray-800 font-sans">
        <div className="w-full">

          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">

              <div className="w-8 h-8 border-2 border-[#CFC7BB] border-t-[#9c6a3a] rounded-full animate-spin mx-auto mb-4" />

              <p className="text-sm text-gray-600">
                Loading your support tickets...
              </p>

            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] px-4 py-6 sm:px-6 lg:px-10 text-gray-800 font-sans">

      <div className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#D8D0C5] pb-4">

          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-semibold text-[#9c6a3a]">
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

          <div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#F2EDE4] border border-[#CFC7BB] text-[10px] font-semibold text-[#9c6a3a] uppercase tracking-wider mb-2">

              <Sparkles className="w-3 h-3 text-[#9c6a3a]" />

              <span>
                Editorial Docket & Author Correspondence
              </span>

            </div>

            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#9c6a3a]">
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
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-[#9c6a3a] hover:bg-[#85572f] text-white border border-[#9c6a3a] rounded-md text-xs font-semibold shadow-sm transition whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />

            <span>
               New Support Query
            </span>

          </button>

        </div>

        {/* ERROR */}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            <p className="text-xs text-red-700">
              {error}
            </p>

            <button
              onClick={fetchTickets}
              className="w-full sm:w-auto px-3 py-1.5 bg-[#9c6a3a] hover:bg-[#85572f] border border-[#9c6a3a] text-white rounded text-xs font-semibold transition"
            >
              Retry
            </button>

          </div>
        )}
        <div className="bg-[#F8F5EE] border border-[#CFC7BB] rounded-lg p-4 space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 relative">

              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9c6a3a]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search by ticket ID, subject, or manuscript..."
                className="w-full bg-[#FDFBF7] border border-[#9c6a3a] rounded pl-9 pr-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#9c6a3a]"
              />

            </div>
            <div className="md:col-span-3 relative">

              <select
                value={selectedBookFilter}
                onChange={(e) =>
                  setSelectedBookFilter(e.target.value)
                }
                className="w-full bg-[#FDFBF7] border border-[#9c6a3a] rounded px-3 py-2 text-xs text-gray-800 font-medium appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-[#9c6a3a]"
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

              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[#9c6a3a] pointer-events-none" />

            </div>
            <div className="md:col-span-3 relative">

              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
                className="w-full bg-[#FDFBF7] border border-[#9c6a3a] rounded px-3 py-2 text-xs text-gray-800 font-medium appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-[#9c6a3a]"
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

              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[#9c6a3a] pointer-events-none" />

            </div>

          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#D8D0C5]">

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
                    className={`px-3 py-1 rounded text-xs font-semibold transition flex items-center gap-1 border ${
                      isActive
                        ? 'bg-[#9c6a3a] text-white border-[#9c6a3a]'
                        : 'bg-[#F2EDE4] text-gray-700 hover:bg-[#E8E1D7] border-[#CFC7BB]'
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

              <Clock className="w-3.5 h-3.5 text-[#9c6a3a]" />

              <span>
                Guaranteed Desk Response: within 24 business hours
              </span>

            </div>

          </div>

        </div>
        <div className="space-y-4">

          {filteredTickets.length === 0 ? (

            <div className="bg-[#F8F5EE] border border-[#CFC7BB] rounded-lg p-8 sm:p-12 text-center">

              <FileText className="w-10 h-10 text-[#9c6a3a] mx-auto mb-3" />

              <h3 className="font-serif font-bold text-lg text-[#9c6a3a]">
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
                  className="bg-[#F8F5EE] border border-[#CFC7BB] rounded-lg p-5 lg:p-6 transition hover:shadow-sm space-y-4 relative"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8D0C5] pb-3">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="font-mono text-xs font-bold text-[#9c6a3a]">
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

                      <span className="text-[11px] font-medium text-[#9c6a3a]">
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
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">

                    <div className="md:col-span-8 space-y-2">

                      <h3 className="text-lg font-serif font-bold text-[#9c6a3a] leading-snug hover:underline cursor-pointer">
                        {ticket.subject}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed italic bg-[#F2EDE4]/60 p-3 rounded border border-[#CFC7BB]">
                        "{ticket.description}"
                      </p>

                    </div>
                    <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between h-full space-y-3">

                   

                      <button
                        onClick={() => {
                          window.location.href =
                            `/author/tickets/${ticket._id}`;
                        }}
                        className="w-full md:w-auto px-4 py-2 bg-[#9c6a3a]   text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5"
                      >

                        <span>
                          {ticket.status === 'Resolved' ||
                          ticket.status === 'Closed'
                            ? 'View Archival Proof'
                            : 'Open Ticket Dossier'}
                        </span>

                        <ArrowUpRight className="w-3.5 h-3.5 text-[#9c6a3a]" />

                      </button>

                    </div>

                  </div>
                  <div className="pt-3 border-t border-[#D8D0C5] flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 text-xs text-gray-500">

                    <div className="flex items-center gap-2">

                      <BookOpen className="w-3.5 h-3.5 text-[#9c6a3a]" />

                      <span className="font-medium text-gray-800">

                        {ticket.bookId?.title ||
                          'General / Account Level'}

                      </span>

                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px]">

                      <span>
                        Logged: {formatDate(ticket.createdAt)}
                      </span>

                      <span className="font-semibold text-[#9c6a3a]">
                        • Updated {getTimeAgo(ticket.updatedAt)}
                      </span>

                    </div>

                  </div>

                </div>
              );
            })
          )}

        </div>  </div>

    </div>
  );
};

export default MyTickets;
