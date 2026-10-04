/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  AlertCircle,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

type Ticket = {
  _id: string;
  authorId: string;
  subject: string;
  description: string;
  category: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
  bookId?: {
    _id: string;
    title: string;
    isbn: string;
  } | null;
  assignedTo?: {
    _id: string;
    name?: string;
    email?: string;
  } | null;
};

const AdminTicketList = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // ================= FETCH TICKETS =================

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Admin authentication token not found.');
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
          'Backend returned an invalid response.'
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || 'Failed to fetch tickets'
        );
      }

      const receivedTickets = Array.isArray(data)
        ? data
        : data.tickets || [];

      setTickets(receivedTickets);
    } catch (error) {
      console.error(
        'ADMIN TICKET LIST ERROR:',
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : 'Failed to load tickets.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // ================= FILTER =================

  const filteredTickets = tickets.filter((ticket) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      ticket.subject
        ?.toLowerCase()
        .includes(searchText) ||
      ticket.description
        ?.toLowerCase()
        .includes(searchText) ||
      ticket.authorId
        ?.toLowerCase()
        .includes(searchText) ||
      ticket.bookId?.title
        ?.toLowerCase()
        .includes(searchText);

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

  // ================= HELPERS =================

  const formatDate = (date: string) => {
    if (!date) return '-';

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    );
  };

  const formatTime = (date: string) => {
    if (!date) return '';

    return new Date(date).toLocaleTimeString(
      'en-IN',
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    );
  };

  const getPriorityStyle = (
    priority: Ticket['priority']
  ) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-700 border-red-200';

      case 'High':
        return 'bg-orange-100 text-orange-700 border-orange-200';

      case 'Medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';

      case 'Low':
        return 'bg-gray-100 text-gray-600 border-gray-200';

      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusStyle = (
    status: Ticket['status']
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

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] p-8">

        <div className="animate-pulse space-y-6">

          <div className="h-8 bg-[#F2EDE4] rounded w-64" />

          <div className="h-20 bg-[#F2EDE4] rounded" />

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-24 bg-[#F2EDE4] rounded"
              />
            ))}
          </div>

        </div>

      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] p-8">

        <div className="max-w-xl mx-auto mt-20 bg-white border border-red-200 rounded-2xl p-8 text-center">

          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />

          <h2 className="font-serif text-xl font-bold text-gray-900">
            Unable to load tickets
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {error}
          </p>

          <button
            onClick={fetchTickets}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

        </div>

      </div>
    );
  }

  // ================= MAIN UI =================

  return (
    <div className="min-h-screen bg-[#FDFBF7]">

      {/* HEADER */}

      <div className="border-b border-gray-200 bg-[#FDFBF7]">

        <div className="px-8 py-7">

          <div className="flex items-start justify-between">

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
                Manage author support queries and
                conversations.
              </p>

            </div>

            <button
              onClick={fetchTickets}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-8">

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Total Queries
            </p>

            <p className="text-2xl font-serif font-bold mt-2">
              {tickets.length}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Open
            </p>

            <p className="text-2xl font-serif font-bold mt-2">
              {
                tickets.filter(
                  (ticket) => ticket.status === 'Open'
                ).length
              }
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Critical
            </p>

            <p className="text-2xl font-serif font-bold mt-2 text-red-600">
              {
                tickets.filter(
                  (ticket) =>
                    ticket.priority === 'Critical'
                ).length
              }
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              In Progress
            </p>

            <p className="text-2xl font-serif font-bold mt-2">
              {
                tickets.filter(
                  (ticket) =>
                    ticket.status === 'In Progress'
                ).length
              }
            </p>
          </div>

        </div>

        {/* FILTER BAR */}

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">

          <div className="flex flex-col lg:flex-row gap-3">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search by subject, author, book..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-[#FDFBF7] border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-amber-800"
              />

            </div>

            {/* STATUS */}

            <div className="flex items-center gap-2">

              <Filter className="w-4 h-4 text-gray-400" />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
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
                setPriorityFilter(e.target.value)
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

        {/* TICKET LIST */}

        <div className="space-y-3">

          {filteredTickets.length === 0 ? (

            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

              <InboxIcon />

              <h3 className="font-serif font-bold text-lg mt-4">
                No tickets found
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                There are no author queries matching
                your filters.
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
                className="w-full text-left bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-400 hover:shadow-sm transition group"
              >

                <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                  {/* LEFT */}

                  <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-2 flex-wrap">

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

                    <h3 className="font-serif font-bold text-lg text-gray-900 mt-2 truncate">
                      {ticket.subject}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {ticket.description}
                    </p>

                  </div>

                  {/* MIDDLE */}

                  <div className="lg:w-56">

                    <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                      Author
                    </p>

                    <p className="text-sm font-semibold text-gray-800 mt-1">
                      {ticket.authorId}
                    </p>

                    {ticket.bookId && (
                      <>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mt-3">
                          Book
                        </p>

                        <p className="text-xs text-gray-700 mt-1 truncate">
                          {ticket.bookId.title}
                        </p>
                      </>
                    )}

                  </div>

                  {/* RIGHT */}

                  <div className="lg:w-36 flex lg:flex-col lg:items-end justify-between gap-2">

                    <div className="flex items-center gap-1.5 text-gray-400">

                      <Clock className="w-3.5 h-3.5" />

                      <span className="text-xs">
                        {formatDate(ticket.createdAt)}
                      </span>

                    </div>

                    <span className="text-[10px] text-gray-400">
                      {formatTime(ticket.createdAt)}
                    </span>

                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition" />

                  </div>

                </div>

              </button>

            ))

          )}

        </div>

      </div>

    </div>
  );
};

// Small empty-state icon
const InboxIcon = () => (
  <div className="w-12 h-12 mx-auto rounded-full bg-[#F2EDE4] flex items-center justify-center">
    <span className="text-xl">📭</span>
  </div>
);

export default AdminTicketList;