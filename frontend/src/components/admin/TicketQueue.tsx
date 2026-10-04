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
        return 'bg-red-100 text-red-700 border-red-200';

      case 'High':
        return 'bg-orange-100 text-orange-700 border-orange-200';

      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';

      case 'Low':
        return 'bg-gray-100 text-gray-600 border-gray-200';

      default:
        return 'bg-gray-100 text-gray-600';
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
        return 'bg-blue-100 text-blue-700';

      case 'In Progress':
        return 'bg-purple-100 text-purple-700';

      case 'Resolved':
        return 'bg-green-100 text-green-700';

      case 'Closed':
        return 'bg-gray-200 text-gray-600';

      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] p-8">

        <div className="flex items-center gap-3 mb-8">
          <RefreshCw className="w-6 h-6 animate-spin text-gray-700" />

          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">
              Ticket Queue
            </h1>

            <p className="text-sm text-gray-500">
              Fetching all author queries...
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-28 bg-[#F2EDE4] rounded-xl animate-pulse"
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
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-8">

        <div className="max-w-lg w-full bg-white border border-red-200 rounded-xl p-8 text-center">

          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />

          <h2 className="font-serif text-xl font-bold text-gray-900">
            Unable to load queries
          </h2>

          <p className="text-sm text-red-600 mt-2">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchAllTickets}
            className="mt-6 px-5 py-2.5 bg-black text-white rounded-lg text-xs font-semibold flex items-center gap-2 mx-auto"
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
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="border-b border-gray-200 bg-[#FDFBF7]">

        <div className="px-8 py-7">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

            <div>

              <div className="flex items-center gap-2 mb-2">

                <span className="w-2 h-2 rounded-full bg-amber-800" />

                <span className="text-[10px] font-mono tracking-widest text-amber-900 uppercase font-bold">
                  Operations Console
                </span>

              </div>

              <h1 className="font-serif text-3xl font-bold text-gray-900">
                Ticket Queue
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                All queries submitted by authors.
              </p>

            </div>

            <button
              type="button"
              onClick={fetchAllTickets}
              className="self-start lg:self-auto flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50"
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

      <div className="p-8">

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* TOTAL */}

          <div className="bg-white border border-gray-200 rounded-xl p-5">

            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Total Queries
            </p>

            <p className="text-3xl font-serif font-bold mt-2 text-gray-900">
              {tickets.length}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              All submitted tickets
            </p>

          </div>

          {/* OPEN */}

          <div className="bg-white border border-gray-200 rounded-xl p-5">

            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Open
            </p>

            <p className="text-3xl font-serif font-bold mt-2 text-blue-700">
              {
                tickets.filter(
                  (ticket) =>
                    ticket.status === 'Open'
                ).length
              }
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Awaiting action
            </p>

          </div>

          {/* CRITICAL */}

          <div className="bg-white border border-gray-200 rounded-xl p-5">

            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Critical
            </p>

            <p className="text-3xl font-serif font-bold mt-2 text-red-600">
              {
                tickets.filter(
                  (ticket) =>
                    ticket.priority === 'Critical'
                ).length
              }
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Needs immediate attention
            </p>

          </div>

          {/* IN PROGRESS */}

          <div className="bg-white border border-gray-200 rounded-xl p-5">

            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              In Progress
            </p>

            <p className="text-3xl font-serif font-bold mt-2 text-purple-700">
              {
                tickets.filter(
                  (ticket) =>
                    ticket.status === 'In Progress'
                ).length
              }
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Currently being handled
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* SEARCH + FILTER */}
        {/* ================================================= */}

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">

          <div className="flex flex-col lg:flex-row gap-3">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search subject, author, book, category..."
                className="w-full bg-[#FDFBF7] border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-amber-800"
              />

            </div>

            {/* STATUS */}

            <div className="flex items-center gap-2">

              <Filter className="w-4 h-4 text-gray-400" />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | 'All'
                      | TicketStatus
                  )
                }
                className="bg-[#FDFBF7] border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none"
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
              className="bg-[#FDFBF7] border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none"
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

       
        <div className="flex items-center justify-between mb-3">

          <div>

            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Submitted Queries
            </span>

            <p className="text-sm text-gray-600 mt-1">
              Showing{' '}
              <span className="font-bold text-gray-900">
                {filteredTickets.length}
              </span>{' '}
              of{' '}
              <span className="font-bold text-gray-900">
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

            <div className="bg-white border border-gray-200 rounded-xl p-14 text-center">

              <div className="w-14 h-14 mx-auto rounded-full bg-[#F2EDE4] flex items-center justify-center">

                <Inbox className="w-6 h-6 text-gray-500" />

              </div>

              <h3 className="font-serif font-bold text-lg mt-4">
                No queries found
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                No submitted author queries match your filters.
              </p>

            </div>

          ) : (

            filteredTickets.map((ticket) => (

              // <button
              //   key={ticket._id}
              //   type="button"
              //   onClick={() =>
              //     navigate(
              //       `/admin/tickets/${ticket._id}`
              //     )
              //   }
              //   className="w-full text-left bg-white border border-red-900 rounded-xl p-5 hover:border-gray-400 hover:shadow-sm transition group"
              // >

              //   <div className="flex flex-col xl:flex-row xl:items-center gap-5">

              //     {/* ===================================== */}
              //     {/* QUERY */}
              //     {/* ===================================== */}

              //     <div className="flex-1 min-w-0">

              //       <div className="flex flex-wrap items-center gap-2">

              //         <span className="font-mono text-[10px] text-gray-400">
              //           #
              //           {ticket._id
              //             .slice(-6)
              //             .toUpperCase()}
              //         </span>

              //         <span
              //           className={`px-2 py-1 rounded-full text-[10px] font-bold border ${getPriorityStyle(
              //             ticket.priority
              //           )}`}
              //         >
              //           {ticket.priority}
              //         </span>

              //         <span
              //           className={`px-2 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(
              //             ticket.status
              //           )}`}
              //         >
              //           {ticket.status}
              //         </span>

              //       </div>

              //       <h3 className="font-serif font-bold text-lg text-gray-900 mt-2">
              //         {ticket.subject}
              //       </h3>

              //       <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              //         {ticket.description}
              //       </p>

              //       <div className="flex flex-wrap items-center gap-2 mt-3">

              //         <span className="text-[10px] bg-[#F2EDE4] text-gray-600 px-2 py-1 rounded">
              //           {ticket.category}
              //         </span>

              //       </div>

              //     </div>

              //     {/* ===================================== */}
              //     {/* AUTHOR */}
              //     {/* ===================================== */}

              //     <div className="xl:w-48">

              //       <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              //         Author
              //       </p>

              //       <p className="text-sm font-semibold text-gray-900 mt-1">
              //         {ticket.authorId}
              //       </p>

              //       <p className="text-[10px] text-gray-400 mt-1">
              //         Author ID
              //       </p>

              //     </div>

              //     {/* ===================================== */}
              //     {/* BOOK */}
              //     {/* ===================================== */}

              //     <div className="xl:w-52">

              //       <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              //         Book
              //       </p>

              //       {ticket.bookId ? (

              //         <>
              //           <p className="text-sm font-semibold text-gray-900 mt-1 truncate">
              //             {ticket.bookId.title}
              //           </p>

              //           <p className="text-[10px] text-gray-400 font-mono mt-1">
              //             ISBN: {ticket.bookId.isbn}
              //           </p>
              //         </>

              //       ) : (

              //         <p className="text-xs text-gray-500 mt-1">
              //           General / Account Level
              //         </p>

              //       )}

              //     </div>

              //     {/* ===================================== */}
              //     {/* DATE */}
              //     {/* ===================================== */}

              //     <div className="xl:w-32 xl:text-right">

              //       <div className="flex xl:justify-end items-center gap-1.5 text-gray-400">

              //         <Clock className="w-3.5 h-3.5" />

              //         <span className="text-xs">
              //           {formatDate(
              //             ticket.createdAt
              //           )}
              //         </span>

              //       </div>

              //       <p className="text-[10px] text-gray-400 mt-1">
              //         {formatTime(
              //           ticket.createdAt
              //         )}
              //       </p>

              //     </div>

              //     {/* ===================================== */}
              //     {/* ARROW */}
              //     {/* ===================================== */}

              //     <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition flex-shrink-0" />

              //   </div>

              // </button>
<button
  key={ticket._id}
  type="button"
  onClick={() => navigate(`/admin/tickets/${ticket._id}`)}
  className="w-full text-left bg-white border border-red-900 rounded-xl p-5 hover:border-gray-400 hover:shadow-sm transition group"
>
  <div className="flex flex-col xl:flex-row xl:items-center gap-5">

    {/* QUERY */}
    <div className="flex-1 min-w-0">

      <div className="flex flex-wrap items-center gap-2">

        <span className="font-mono text-[10px] text-gray-400">
          #{ticket._id.slice(-6).toUpperCase()}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold border ${getPriorityStyle(
            ticket.priority
          )}`}
        >
          {ticket.priority}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(
            ticket.status
          )}`}
        >
          {ticket.status}
        </span>

      </div>

      <h3 className="font-serif font-bold text-lg text-gray-900 mt-2">
        {ticket.subject}
      </h3>

      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
        {ticket.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-[10px] bg-[#F2EDE4] text-gray-600 px-2 py-1 rounded">
          {ticket.category}
        </span>
      </div>

    </div>

    {/* AUTHOR */}
    <div className="xl:w-48">

      <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
        Author
      </p>

      <p className="text-sm font-semibold text-gray-900 mt-1">
        {ticket.authorId}
      </p>

      <p className="text-[10px] text-gray-400 mt-1">
        Author ID
      </p>

    </div>

    {/* BOOK */}
    <div className="xl:w-52">

      <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
        Book
      </p>

      {ticket.bookId ? (
        <>
          <p className="text-sm font-semibold text-gray-900 mt-1 truncate">
            {ticket.bookId.title}
          </p>

          <p className="text-[10px] text-gray-400 font-mono mt-1">
            ISBN: {ticket.bookId.isbn}
          </p>
        </>
      ) : (
        <p className="text-xs text-gray-500 mt-1">
          General / Account Level
        </p>
      )}

    </div>

    {/* DATE */}
    <div className="xl:w-32 xl:text-right">

      <div className="flex xl:justify-end items-center gap-1.5 text-gray-400">

        <Clock className="w-3.5 h-3.5" />

        <span className="text-xs">
          {formatDate(ticket.createdAt)}
        </span>

      </div>

      <p className="text-[10px] text-gray-400 mt-1">
        {formatTime(ticket.createdAt)}
      </p>

    </div>

    {/* ARROW */}
    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition flex-shrink-0" />

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