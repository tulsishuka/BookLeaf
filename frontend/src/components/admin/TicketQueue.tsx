/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  Clock,
  ChevronRight,
  Inbox,
} from 'lucide-react';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

type TicketStatus =
  | 'Open'
  | 'In Progress'
  | 'Resolved'
  | 'Closed';

type TicketPriority =
  | 'Critical'
  | 'High'
  | 'Medium'
  | 'Low';

type TicketCategory =
  | 'Royalty & Payments'
  | 'ISBN & Metadata Issues'
  | 'Printing & Quality'
  | 'Distribution & Availability'
  | 'Book Status & Production Updates'
  | 'General Inquiry';

interface Book {
  _id: string;
  title: string;
  isbn: string;
  genre?: string;
  publicationDate?: string;
  status?: string;
}

interface AssignedAdmin {
  _id: string;
  name?: string;
  email?: string;
}

interface Ticket {
  _id: string;
  authorId: string;
  bookId?: Book | null;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: AssignedAdmin | null;
  aiCategory?: string | null;
  aiPriority?: string | null;
  aiDraftResponse?: string | null;
  createdAt: string;
  updatedAt: string;
}

const TicketQueue = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] =
    useState<'All' | TicketStatus>('All');

  const [priorityFilter, setPriorityFilter] =
    useState<'All' | TicketPriority>('All');

  // ==================================================
  // FETCH ALL USER QUERIES
  // ==================================================

  const fetchAllTickets = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error(
          'Admin authentication token not found.'
        );
      }

      const response = await fetch(
        `${API_URL}/api/tickets/admin/all`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const contentType =
        response.headers.get('content-type');

      if (!contentType?.includes('application/json')) {
        const text = await response.text();

        console.error(
          'SERVER RETURNED NON-JSON:',
          text
        );

        throw new Error(
          `Backend returned ${response.status} ${response.statusText} instead of JSON.`
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Failed to fetch submitted queries.'
        );
      }

      const allTickets = Array.isArray(data)
        ? data
        : data.tickets || [];

      setTickets(allTickets);
    } catch (error) {
      console.error(
        'FETCH ALL TICKETS ERROR:',
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : 'Failed to load submitted queries.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  // ==================================================
  // FILTER
  // ==================================================

  const filteredTickets = tickets.filter((ticket) => {
    const searchValue =
      search.trim().toLowerCase();

    const matchesSearch =
      !searchValue ||
      ticket.subject
        ?.toLowerCase()
        .includes(searchValue) ||
      ticket.description
        ?.toLowerCase()
        .includes(searchValue) ||
      ticket.authorId
        ?.toLowerCase()
        .includes(searchValue) ||
      ticket.category
        ?.toLowerCase()
        .includes(searchValue) ||
      ticket.bookId?.title
        ?.toLowerCase()
        .includes(searchValue);

    const matchesStatus =
      statusFilter === 'All' ||
      ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'All' ||
      ticket.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  // ==================================================
  // DATE
  // ==================================================

  const formatDate = (date?: string) => {
    if (!date) return '—';

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    );
  };

  const formatTime = (date?: string) => {
    if (!date) return '';

    return new Date(date).toLocaleTimeString(
      'en-IN',
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    );
  };

  // ==================================================
  // PRIORITY STYLE
  // ==================================================

  const getPriorityStyle = (
    priority: TicketPriority
  ) => {
    switch (priority) {
      case 'Critical':
        return 'bg-[#FFF0EF] text-[#B42318] border-[#F5C7C3]';

      case 'High':
        return 'bg-[#FFF4E8] text-[#B54708] border-[#F5D6AE]';

      case 'Medium':
        return 'bg-[#FFF9DF] text-[#946200] border-[#EADCA7]';

      case 'Low':
        return 'bg-[#EEF8F0] text-[#26734D] border-[#C9E4D1]';

      default:
        return 'bg-[#F3F1EC] text-[#55524B] border-[#DED8CF]';
    }
  };

  // ==================================================
  // STATUS STYLE
  // ==================================================

  const getStatusStyle = (
    status: TicketStatus
  ) => {
    switch (status) {
      case 'Open':
        return 'bg-[#EEF5FF] text-[#315F9D] border border-[#D5E4F8]';

      case 'In Progress':
        return 'bg-[#F4EFFB] text-[#7045A5] border border-[#E3D7F7]';

      case 'Resolved':
        return 'bg-[#EEF8F0] text-[#26734D] border border-[#C9E4D1]';

      case 'Closed':
        return 'bg-[#F1F0ED] text-[#5E5B55] border border-[#DED8CF]';

      default:
        return 'bg-[#F3F1EC] text-[#55524B] border border-[#DED8CF]';
    }
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#F2EDE4] border border-[#D8CFC4] flex items-center justify-center">
            <RefreshCw className="w-5 h-5 animate-spin text-[#6F6A63]" />
          </div>

          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1C]">
              Ticket Queue
            </h1>

            <p className="text-sm text-[#6F6A63] mt-1">
              Fetching all author queries...
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-32 bg-[#F2EDE4] border border-[#E5DED4] rounded-2xl animate-pulse"
            />
          ))}
        </div>

      </div>
    );
  }

  // ==================================================
  // ERROR
  // ==================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-5 sm:p-8">

        <div className="max-w-lg w-full bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl p-7 sm:p-9 text-center shadow-[0_10px_40px_rgba(43,36,30,0.05)]">

          <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF0EF] border border-[#F5C7C3] flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#B42318]" />
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1C1C] mt-5">
            Unable to load queries
          </h2>

          <p className="text-sm text-[#B42318] mt-2 leading-6">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchAllTickets}
            className="mt-7 px-5 py-2.5 bg-[#2B241E] text-white rounded-lg text-xs font-semibold flex items-center gap-2 mx-auto hover:bg-[#1C1C1C] transition"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

        </div>

      </div>
    );
  }

  // ==================================================
  // PAGE
  // ==================================================

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1C1C]">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="border-b border-[#D8CFC4] bg-[#FDFBF7]">

        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <span className="w-1.5 h-1.5 rounded-full bg-[#9C6A3A]" />

                <span className="text-[10px] font-mono tracking-[0.2em] text-[#9C6A3A] uppercase font-bold">
                  Operations Console
                </span>

              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1C1C]">
                Ticket Queue
              </h1>

              <p className="text-sm sm:text-base text-[#6F6A63] mt-2">
                All queries submitted by authors.
              </p>

            </div>

            <button
              type="button"
              onClick={fetchAllTickets}
              className="self-start lg:self-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F8F5EE] border border-[#D8CFC4] rounded-lg text-xs font-semibold text-[#2B241E] hover:bg-[#F2EDE4] hover:border-[#9C6A3A] transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8 max-w-[1800px] mx-auto">

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-7">

          {/* TOTAL */}

          <div className="group bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl p-5 sm:p-6 hover:border-[#BCA993] transition">

            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#99938A]">
              Total Queries
            </p>

            <div className="flex items-end justify-between gap-3 mt-3">

              <p className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1C1C]">
                {tickets.length}
              </p>

              <span className="w-9 h-9 rounded-full bg-[#F2EDE4] flex items-center justify-center">
                <Inbox className="w-4 h-4 text-[#9C6A3A]" />
              </span>

            </div>

            <p className="text-xs text-[#99938A] mt-2">
              All submitted tickets
            </p>

          </div>

          {/* OPEN */}

          <div className="group bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl p-5 sm:p-6 hover:border-[#BCA993] transition">

            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#99938A]">
              Open
            </p>

            <div className="flex items-end justify-between gap-3 mt-3">

              <p className="text-3xl sm:text-4xl font-serif font-bold text-[#315F9D]">
                {
                  tickets.filter(
                    (ticket) =>
                      ticket.status === 'Open'
                  ).length
                }
              </p>

              <span className="w-9 h-9 rounded-full bg-[#EEF5FF] flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#315F9D]" />
              </span>

            </div>

            <p className="text-xs text-[#99938A] mt-2">
              Awaiting action
            </p>

          </div>

          {/* CRITICAL */}

          <div className="group bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl p-5 sm:p-6 hover:border-[#BCA993] transition">

            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#99938A]">
              Critical
            </p>

            <div className="flex items-end justify-between gap-3 mt-3">

              <p className="text-3xl sm:text-4xl font-serif font-bold text-[#B42318]">
                {
                  tickets.filter(
                    (ticket) =>
                      ticket.priority === 'Critical'
                  ).length
                }
              </p>

              <span className="w-9 h-9 rounded-full bg-[#FFF0EF] flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-[#B42318]" />
              </span>

            </div>

            <p className="text-xs text-[#99938A] mt-2">
              Needs immediate attention
            </p>

          </div>

          {/* IN PROGRESS */}

          <div className="group bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl p-5 sm:p-6 hover:border-[#BCA993] transition">

            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#99938A]">
              In Progress
            </p>

            <div className="flex items-end justify-between gap-3 mt-3">

              <p className="text-3xl sm:text-4xl font-serif font-bold text-[#7045A5]">
                {
                  tickets.filter(
                    (ticket) =>
                      ticket.status === 'In Progress'
                  ).length
                }
              </p>

              <span className="w-9 h-9 rounded-full bg-[#F4EFFB] flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-[#7045A5]" />
              </span>

            </div>

            <p className="text-xs text-[#99938A] mt-2">
              Currently being handled
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* SEARCH + FILTER */}
        {/* ================================================= */}

        <div className="bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl p-4 sm:p-5 mb-7">

          <div className="flex flex-col lg:flex-row gap-3">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99938A]" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search subject, author, book, category..."
                className="w-full h-11 bg-[#FDFBF7] border border-[#D8CFC4] rounded-lg py-2.5 pl-10 pr-4 text-sm text-[#1C1C1C] placeholder:text-[#99938A] outline-none focus:border-[#9C6A3A] focus:ring-1 focus:ring-[#9C6A3A]/20 transition"
              />

            </div>

            {/* STATUS */}

            <div className="flex items-center gap-2">

              <div className="hidden sm:flex w-9 h-9 rounded-lg bg-[#F2EDE4] items-center justify-center">
                <Filter className="w-4 h-4 text-[#6F6A63]" />
              </div>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | 'All'
                      | TicketStatus
                  )
                }
                className="w-full lg:w-auto h-11 bg-[#FDFBF7] border border-[#D8CFC4] rounded-lg px-3 text-sm text-[#1C1C1C] outline-none focus:border-[#9C6A3A] transition cursor-pointer"
              >

                <option value="All">
                  All Status
                </option>

                <option value="Open">
                  Open
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Resolved">
                  Resolved
                </option>

                <option value="Closed">
                  Closed
                </option>

              </select>

            </div>

            {/* PRIORITY */}

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(
                  e.target.value as
                    | 'All'
                    | TicketPriority
                )
              }
              className="w-full lg:w-auto h-11 bg-[#FDFBF7] border border-[#D8CFC4] rounded-lg px-3 text-sm text-[#1C1C1C] outline-none focus:border-[#9C6A3A] transition cursor-pointer"
            >

              <option value="All">
                All Priority
              </option>

              <option value="Critical">
                Critical
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

          </div>

        </div>

        {/* ================================================= */}
        {/* SUBMITTED QUERIES HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">

          <div>

            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#9C6A3A]">
              Submitted Queries
            </span>

            <p className="text-sm text-[#6F6A63] mt-1">
              Showing{' '}
              <span className="font-bold text-[#1C1C1C]">
                {filteredTickets.length}
              </span>{' '}
              of{' '}
              <span className="font-bold text-[#1C1C1C]">
                {tickets.length}
              </span>{' '}
              queries
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* TICKETS */}
        {/* ================================================= */}

        <div className="space-y-3">

          {filteredTickets.length === 0 ? (

            <div className="bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl p-12 sm:p-16 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-[#F2EDE4] border border-[#D8CFC4] flex items-center justify-center">

                <Inbox className="w-7 h-7 text-[#6F6A63]" />

              </div>

              <h3 className="font-serif font-bold text-xl text-[#1C1C1C] mt-5">
                No queries found
              </h3>

              <p className="text-sm text-[#6F6A63] mt-2 max-w-md mx-auto leading-6">
                No submitted author queries match your filters.
              </p>

            </div>

          ) : (

            filteredTickets.map((ticket) => (

              <button
                key={ticket._id}
                type="button"
                onClick={() =>
                  navigate(
                    `/admin/tickets/${ticket._id}`
                  )
                }
                className="w-full text-left bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl p-5 sm:p-6 hover:bg-[#FAF7F1] hover:border-[#BCA993] hover:shadow-[0_10px_30px_rgba(43,36,30,0.06)] transition-all duration-200 group"
              >

                <div className="flex flex-col xl:flex-row xl:items-center gap-5 xl:gap-6">

                  {/* QUERY */}

                  <div className="flex-1 min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="font-mono text-[10px] tracking-wide text-[#99938A]">
                        #{ticket._id.slice(-6).toUpperCase()}
                      </span>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getPriorityStyle(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>

                    </div>

                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1C1C] mt-3 group-hover:text-[#9C6A3A] transition-colors">
                      {ticket.subject}
                    </h3>

                    <p className="text-sm text-[#6F6A63] mt-1.5 line-clamp-2 leading-6">
                      {ticket.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-4">

                      <span className="text-[10px] bg-[#F2EDE4] border border-[#E5DED4] text-[#6F6A63] px-2.5 py-1.5 rounded-md">
                        {ticket.category}
                      </span>

                    </div>

                  </div>

                  {/* AUTHOR */}

                  <div className="xl:w-48 border-t xl:border-t-0 xl:border-l border-[#E5DED4] pt-4 xl:pt-0 xl:pl-5">

                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#99938A]">
                      Author
                    </p>

                    <p className="text-sm font-semibold text-[#1C1C1C] mt-2 truncate">
                      {ticket.authorId}
                    </p>

                    <p className="text-[10px] text-[#99938A] mt-1">
                      Author ID
                    </p>

                  </div>

                  {/* BOOK */}

                  <div className="xl:w-52 border-t xl:border-t-0 xl:border-l border-[#E5DED4] pt-4 xl:pt-0 xl:pl-5">

                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#99938A]">
                      Book
                    </p>

                    {ticket.bookId ? (

                      <>
                        <p className="text-sm font-semibold text-[#1C1C1C] mt-2 truncate">
                          {ticket.bookId.title}
                        </p>

                        <p className="text-[10px] text-[#99938A] font-mono mt-1">
                          ISBN: {ticket.bookId.isbn}
                        </p>
                      </>

                    ) : (

                      <p className="text-xs text-[#6F6A63] mt-2">
                        General / Account Level
                      </p>

                    )}

                  </div>

                  {/* DATE */}

                  <div className="xl:w-32 border-t xl:border-t-0 xl:border-l border-[#E5DED4] pt-4 xl:pt-0 xl:pl-5 xl:text-right">

                    <div className="flex xl:justify-end items-center gap-1.5 text-[#99938A]">

                      <Clock className="w-3.5 h-3.5" />

                      <span className="text-xs">
                        {formatDate(ticket.createdAt)}
                      </span>

                    </div>

                    <p className="text-[10px] text-[#99938A] mt-1">
                      {formatTime(ticket.createdAt)}
                    </p>

                  </div>

                  {/* ARROW */}

                  <div className="hidden xl:flex w-9 h-9 rounded-full bg-[#F2EDE4] items-center justify-center flex-shrink-0 group-hover:bg-[#2B241E] transition-colors">

                    <ChevronRight className="w-4 h-4 text-[#99938A] group-hover:text-white transition-colors" />

                  </div>

                  <ChevronRight className="xl:hidden w-5 h-5 text-[#B8B1A8] group-hover:text-[#9C6A3A] transition flex-shrink-0" />

                </div>

              </button>

            ))

          )}

        </div>

      </div>

    </div>
  );
};

export default TicketQueue;