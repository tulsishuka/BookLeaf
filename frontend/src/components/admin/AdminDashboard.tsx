/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */



import { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Download,
  Plus,
  ArrowUpRight,
  
  Clock,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  Bot,
  Sparkles,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface BookInfo {
  _id: string;
  title: string;
  isbn?: string;
}

interface Ticket {
  _id: string;
  authorId: string;
  bookId?: BookInfo | null;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: {
    _id: string;
    name?: string;
    email?: string;
  } | null;
  aiCategory?: string | null;
  aiPriority?: string | null;
  aiDraftResponse?: string | null;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Admin authentication token not found.');
        return;
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || 'Failed to fetch admin tickets'
        );
      }

      // Supports either:
      // { tickets: [...] }
      // or directly [...]
      const receivedTickets = Array.isArray(data)
        ? data
        : data.tickets || [];

      setTickets(receivedTickets);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('ADMIN DASHBOARD ERROR:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while loading tickets.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetchTickets();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------------------------------
     DATE / TIME HELPERS
  --------------------------------------- */

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const difference = now.getTime() - date.getTime();

    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  /* ---------------------------------------
     TODAY
  --------------------------------------- */

  const todayTickets = useMemo(() => {
    const today = new Date();

    return tickets.filter((ticket) => {
      const ticketDate = new Date(ticket.createdAt);

      return (
        ticketDate.getDate() === today.getDate() &&
        ticketDate.getMonth() === today.getMonth() &&
        ticketDate.getFullYear() === today.getFullYear()
      );
    });
  }, [tickets]);

  /* ---------------------------------------
     STATISTICS
  --------------------------------------- */

  const openTickets = useMemo(
    () =>
      tickets.filter(
        (ticket) => ticket.status === 'Open'
      ),
    [tickets]
  );

  const criticalTickets = useMemo(
    () =>
      tickets.filter(
        (ticket) =>
          ticket.priority === 'Critical' &&
          ticket.status !== 'Resolved' &&
          ticket.status !== 'Closed'
      ),
    [tickets]
  );

  const highPriorityTickets = useMemo(
    () =>
      tickets.filter(
        (ticket) =>
          (ticket.priority === 'Critical' ||
            ticket.priority === 'High') &&
          ticket.status !== 'Resolved' &&
          ticket.status !== 'Closed'
      ),
    [tickets]
  );

  const unassignedTickets = useMemo(
    () =>
      tickets.filter(
        (ticket) =>
          !ticket.assignedTo &&
          ticket.status !== 'Resolved' &&
          ticket.status !== 'Closed'
      ),
    [tickets]
  );

  const inProgressTickets = useMemo(
    () =>
      tickets.filter(
        (ticket) => ticket.status === 'In Progress'
      ),
    [tickets]
  );

  const resolvedToday = useMemo(
    () =>
      tickets.filter((ticket) => {
        if (ticket.status !== 'Resolved') return false;

        const updated = new Date(ticket.updatedAt);
        const today = new Date();

        return (
          updated.getDate() === today.getDate() &&
          updated.getMonth() === today.getMonth() &&
          updated.getFullYear() === today.getFullYear()
        );
      }),
    [tickets]
  );

  /* ---------------------------------------
     CATEGORY BREAKDOWN
  --------------------------------------- */

  const categoryBreakdown = useMemo(() => {
    const categories: TicketCategory[] = [
      'Royalty & Payments',
      'ISBN & Metadata Issues',
      'Printing & Quality',
      'Distribution & Availability',
      'Book Status & Production Updates',
      'General Inquiry',
    ];

    return categories.map((category) => ({
      category,
      count: tickets.filter(
        (ticket) => ticket.category === category
      ).length,
    }));
  }, [tickets]);

  const categoryColors: Record<TicketCategory, string> = {
    'Royalty & Payments': 'bg-amber-800',
    'ISBN & Metadata Issues': 'bg-blue-600',
    'Printing & Quality': 'bg-gray-800',
    'Distribution & Availability': 'bg-purple-600',
    'Book Status & Production Updates': 'bg-emerald-600',
    'General Inquiry': 'bg-amber-500',
  };

  const categoryBadgeColors: Record<TicketCategory, string> = {
    'Royalty & Payments':
      'bg-amber-100 text-amber-900 border border-amber-300',
    'ISBN & Metadata Issues':
      'bg-blue-100 text-blue-900 border border-blue-200',
    'Printing & Quality':
      'bg-gray-200 text-gray-800 border border-gray-300',
    'Distribution & Availability':
      'bg-purple-100 text-purple-900 border border-purple-200',
    'Book Status & Production Updates':
      'bg-emerald-100 text-emerald-900 border border-emerald-200',
    'General Inquiry':
      'bg-amber-100 text-amber-900 border border-amber-200',
  };

  /* ---------------------------------------
     HIGH PRIORITY QUEUE
  --------------------------------------- */

  const attentionTickets = useMemo(() => {
    return [...highPriorityTickets]
      .sort((a, b) => {
        const priorityOrder: Record<TicketPriority, number> = {
          Critical: 1,
          High: 2,
          Medium: 3,
          Low: 4,
        };

        const priorityDifference =
          priorityOrder[a.priority] -
          priorityOrder[b.priority];

        if (priorityDifference !== 0) {
          return priorityDifference;
        }

        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );
      })
      .slice(0, 5);
  }, [highPriorityTickets]);

  /* ---------------------------------------
     RECENT TICKETS
  --------------------------------------- */

  const recentTickets = useMemo(() => {
    return [...tickets]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 6);
  }, [tickets]);

  /* ---------------------------------------
     PRIORITY BADGE
  --------------------------------------- */

  const getPriorityClass = (
    priority: TicketPriority
  ) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-600 text-white';

      case 'High':
        return 'bg-amber-600 text-white';

      case 'Medium':
        return 'bg-amber-100 text-amber-900';

      case 'Low':
        return 'bg-gray-200 text-gray-800';

      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  /* ---------------------------------------
     STATUS BADGE
  --------------------------------------- */

  const getStatusClass = (status: TicketStatus) => {
    switch (status) {
      case 'Open':
        return 'bg-black text-white';

      case 'In Progress':
        return 'bg-emerald-100 text-emerald-900 border border-emerald-300';

      case 'Resolved':
        return 'bg-blue-100 text-blue-900 border border-blue-300';

      case 'Closed':
        return 'bg-gray-200 text-gray-800 border border-gray-300';

      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  /* ---------------------------------------
     ASSIGNEE
  --------------------------------------- */

  const getAssigneeName = (ticket: Ticket) => {
    if (!ticket.assignedTo) {
      return 'Unassigned';
    }

    return (
      ticket.assignedTo.name ||
      ticket.assignedTo.email ||
      'Assigned'
    );
  };

  /* ---------------------------------------
     AVG RESPONSE TIME
  --------------------------------------- */

  const averageResponseTime = useMemo(() => {
    const respondedTickets = tickets.filter(
      (ticket) =>
        ticket.status !== 'Open' &&
        new Date(ticket.updatedAt).getTime() >
          new Date(ticket.createdAt).getTime()
    );

    if (!respondedTickets.length) {
      return '—';
    }

    const totalMinutes = respondedTickets.reduce(
      (total, ticket) => {
        const created = new Date(
          ticket.createdAt
        ).getTime();

        const updated = new Date(
          ticket.updatedAt
        ).getTime();

        return (
          total +
          Math.max(
            0,
            Math.round(
              (updated - created) / (1000 * 60)
            )
          )
        );
      },
      0
    );

    const average = Math.round(
      totalMinutes / respondedTickets.length
    );

    if (average < 60) {
      return `${average}m`;
    }

    const hours = Math.floor(average / 60);
    const minutes = average % 60;

    return `${hours}h ${minutes}m`;
  }, [tickets]);

  /* ---------------------------------------
     EXPORT
  --------------------------------------- */

  const exportReport = () => {
    const headers = [
      'Ticket ID',
      'Author ID',
      'Subject',
      'Category',
      'Priority',
      'Status',
      'Book',
      'Created',
    ];

    const rows = tickets.map((ticket) => [
      ticket._id,
      ticket.authorId,
      ticket.subject,
      ticket.category,
      ticket.priority,
      ticket.status,
      ticket.bookId?.title || 'General / Account Level',
      ticket.createdAt,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? '').replace(/"/g, '""')}"`
          )
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `admin-ticket-report-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    link.click();

    URL.revokeObjectURL(url);
  };

  /* ---------------------------------------
     LOADING
  --------------------------------------- */

  if (loading && tickets.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-700" />

          <p className="mt-3 text-sm text-gray-500">
            Loading administrative ticket data...
          </p>
        </div>
      </div>
    );
  }

  /* ---------------------------------------
     ERROR
  --------------------------------------- */

  if (error && tickets.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10">
        <div className="max-w-xl mx-auto mt-20 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />

          <h2 className="font-serif font-bold text-xl text-red-900 mt-3">
            Unable to load dashboard
          </h2>

          <p className="text-sm text-red-700 mt-2">
            {error}
          </p>

          <button
            onClick={fetchTickets}
            className="mt-5 px-4 py-2 bg-black text-white rounded text-xs font-semibold"
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------------------
     MAIN DASHBOARD
  --------------------------------------- */

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans space-y-8">

      {/* HEADER */}

      <div className="space-y-4">

        <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          EDITORIAL COMMAND / ADMINISTRATION
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">

          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">
              Good morning, Tulasi.
            </h1>

            <p className="text-xs lg:text-sm text-gray-600 mt-1">
              Here is what's happening across author
              support today.{' '}

              <span className="font-semibold text-red-700">
                {criticalTickets.length} CRITICAL
              </span>{' '}
              tickets require immediate administrative
              review.
            </p>

            {lastUpdated && (
              <p className="text-[10px] text-gray-400 mt-2">
                Last updated:{' '}
                {lastUpdated.toLocaleTimeString('en-IN')}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">

            <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />

              <span>
                Today:{' '}
                {new Date().toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            <button
              type="button"
              onClick={exportReport}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded text-xs font-semibold text-gray-700 shadow-2xs transition"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />

              <span>EXPORT DAILY REPORT</span>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate('/admin/tickets')
              }
              className="flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-gray-800 text-white rounded text-xs font-semibold shadow-sm transition"
            >
              <Plus className="w-4 h-4" />

              <span>VIEW TICKET QUEUE</span>
            </button>

            <button
              type="button"
              onClick={fetchTickets}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  loading ? 'animate-spin' : ''
                }`}
              />

              <span>REFRESH</span>
            </button>

          </div>
        </div>
      </div>

      {/* STAT CARDS */}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

        {/* OPEN */}

        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">

            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              OPEN TICKETS
            </span>

            <span className="p-1 bg-gray-200/60 rounded text-gray-600">
              📋
            </span>

          </div>

          <div>
            <span className="text-3xl font-serif font-bold text-gray-900">
              {openTickets.length}
            </span>

            <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1 font-semibold">
              <span>Currently awaiting action</span>
            </div>
          </div>
        </div>

        {/* CRITICAL */}

        <div className="bg-[#FFF0F0] border border-red-200 rounded-lg p-4 space-y-3">

          <div className="flex items-center justify-between">

            <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider bg-red-100 px-1.5 py-0.5 rounded">
              CRITICAL
            </span>

            <AlertCircle className="w-4 h-4 text-red-600" />

          </div>

          <div>

            <span className="text-3xl font-serif font-bold text-red-900">
              {criticalTickets.length}
            </span>

            <div className="flex items-center gap-1 text-[10px] text-red-700 mt-1 font-semibold">

              <ArrowUpRight className="w-3 h-3" />

              <span>
                Requires immediate review
              </span>

            </div>

          </div>

        </div>

        {/* UNASSIGNED */}

        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-3">

          <div className="flex items-center justify-between">

            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              UNASSIGNED
            </span>

            <span className="p-1 bg-amber-100/60 rounded text-amber-800">
              ⏳
            </span>

          </div>

          <div>

            <span className="text-3xl font-serif font-bold text-gray-900">
              {unassignedTickets.length}
            </span>

            <div className="text-[10px] text-amber-800 mt-1 font-semibold">
              Requires triage assignment
            </div>

          </div>

        </div>

        {/* IN PROGRESS */}

        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-3">

          <div className="flex items-center justify-between">

            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              IN PROGRESS
            </span>

            <span className="p-1 bg-blue-100/60 rounded text-blue-800">
              ⚙️
            </span>

          </div>

          <div>

            <span className="text-3xl font-serif font-bold text-gray-900">
              {inProgressTickets.length}
            </span>

            <div className="text-[10px] text-gray-500 mt-1">
              Active investigation
            </div>

          </div>

        </div>

        {/* RESOLVED */}

        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-3">

          <div className="flex items-center justify-between">

            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              RESOLVED TODAY
            </span>

            <CheckCircle2 className="w-4 h-4 text-emerald-600" />

          </div>

          <div>

            <span className="text-3xl font-serif font-bold text-gray-900">
              {resolvedToday.length}
            </span>

            <div className="flex items-center gap-1 text-[10px] text-emerald-700 mt-1 font-semibold">

              <ArrowUpRight className="w-3 h-3" />

              <span>Resolved today</span>

            </div>

          </div>

        </div>

        {/* AVG RESPONSE */}

        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-3">

          <div className="flex items-center justify-between">

            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              AVG RESPONSE
            </span>

            <Clock className="w-4 h-4 text-purple-600" />

          </div>

          <div>

            <span className="text-3xl font-serif font-bold text-gray-900">
              {averageResponseTime}
            </span>

            <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
              Based on current ticket data
            </div>

          </div>

        </div>

      </div>

      {/* ATTENTION QUEUE */}

      <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-4">

        <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">

          <div className="flex items-center gap-2">

            <span className="w-2 h-2 rounded-full bg-red-600"></span>

            <h2 className="font-serif font-bold text-xl text-gray-900">
              Tickets Requiring Attention
            </h2>

            <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              HIGH PRIORITY QUEUE
            </span>

          </div>

          <span className="text-[11px] text-gray-500">
            Critical & High priority tickets
          </span>

        </div>

        {attentionTickets.length === 0 ? (

          <div className="py-10 text-center text-sm text-gray-500">
            No critical or high priority tickets right now.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left text-xs border-collapse">

              <thead>

                <tr className="border-b border-gray-300 text-[10px] font-bold uppercase tracking-wider text-gray-400">

                  <th className="py-2.5 px-3">
                    PRIORITY
                  </th>

                  <th className="py-2.5 px-3">
                    TICKET TITLE
                  </th>

                  <th className="py-2.5 px-3">
                    AUTHOR
                  </th>

                  <th className="py-2.5 px-3">
                    CATEGORY
                  </th>

                  <th className="py-2.5 px-3">
                    STATUS
                  </th>

                  <th className="py-2.5 px-3">
                    ASSIGNED TO
                  </th>

                  <th className="py-2.5 px-3 text-right">
                    ACTION
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-200/60 font-medium">

                {attentionTickets.map((ticket) => (

                  <tr
                    key={ticket._id}
                    className="hover:bg-[#F2EDE4] transition"
                  >

                    <td className="py-3 px-3">

                      <span
                        className={`${getPriorityClass(
                          ticket.priority
                        )} font-bold text-[10px] px-2 py-0.5 rounded uppercase`}
                      >
                        {ticket.priority}
                      </span>

                    </td>

                    <td className="py-3 px-3">

                      <div className="font-bold text-gray-900 max-w-xs">
                        {ticket.subject}
                      </div>

                      <div className="text-[10px] font-mono text-gray-400">
                        TKT-
                        {ticket._id
                          .slice(-6)
                          .toUpperCase()}
                      </div>

                    </td>

                    <td className="py-3 px-3">

                      <div className="font-semibold text-gray-900">
                        {ticket.authorId}
                      </div>

                      <div className="text-[10px] text-gray-500">
                        Author ID
                      </div>

                    </td>

                    <td className="py-3 px-3">

                      <span
                        className={`${
                          categoryBadgeColors[
                            ticket.category
                          ]
                        } text-[10px] px-2 py-0.5 rounded font-semibold`}
                      >
                        {ticket.category}
                      </span>

                    </td>

                    <td className="py-3 px-3">

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${getStatusClass(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>

                      <div className="text-[10px] text-gray-500 mt-1">
                        {formatTimeAgo(
                          ticket.createdAt
                        )}
                      </div>

                    </td>

                    <td className="py-3 px-3">

                      {!ticket.assignedTo ? (

                        <span className="text-gray-500 italic">
                          Unassigned
                        </span>

                      ) : (

                        <div className="flex items-center gap-1.5 text-gray-900 font-semibold">

                          <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                            {getAssigneeName(ticket)
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>

                          <span>
                            {getAssigneeName(ticket)}
                          </span>

                        </div>

                      )}

                    </td>

                    <td className="py-3 px-3 text-right">

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/admin/tickets/${ticket._id}`
                          )
                        }
                        className="px-3 py-1 bg-black text-white rounded text-[11px] font-semibold hover:bg-gray-800 transition"
                      >
                        Open
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* CATEGORY */}

        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-4">

          <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">

            <div>

              <span className="text-[10px] font-bold text-gray-400 uppercase block">
                ANALYTICS & VOLUME
              </span>

              <h3 className="font-serif font-bold text-lg text-gray-900">
                Category Volume Breakdown
              </h3>

            </div>

            <span className="text-[10px] font-mono text-gray-500 uppercase">
              All Tickets
            </span>

          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 py-2">

            {/* DONUT */}

            <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">

              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >

                {categoryBreakdown.map(
                  (item, index) => {

                    const total =
                      tickets.length || 1;

                    const percentage =
                      (item.count / total) * 100;

                    const previousPercentage =
                      categoryBreakdown
                        .slice(0, index)
                        .reduce(
                          (sum, current) =>
                            sum +
                            (current.count /
                              total) *
                              100,
                          0
                        );

                    return (
                      <circle
                        key={item.category}
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={`${percentage} ${
                          100 - percentage
                        }`}
                        strokeDashoffset={
                          -previousPercentage
                        }
                        className={
                          item.category ===
                          'Royalty & Payments'
                            ? 'text-amber-800'
                            : item.category ===
                              'Printing & Quality'
                            ? 'text-gray-800'
                            : item.category ===
                              'ISBN & Metadata Issues'
                            ? 'text-blue-600'
                            : item.category ===
                              'Distribution & Availability'
                            ? 'text-purple-600'
                            : item.category ===
                              'Book Status & Production Updates'
                            ? 'text-emerald-600'
                            : 'text-amber-500'
                        }
                      />
                    );
                  }
                )}

              </svg>

              <div className="absolute text-center">

                <span className="text-xl font-serif font-bold text-gray-900 block">
                  {tickets.length}
                </span>

                <span className="text-[9px] text-gray-500 uppercase tracking-wider block">
                  TOTAL TICKETS
                </span>

              </div>

            </div>

            {/* CATEGORY LIST */}

            <div className="space-y-2 w-full text-xs font-medium">

              {categoryBreakdown.map((item) => (

                <div
                  key={item.category}
                  className="flex items-center justify-between"
                >

                  <div className="flex items-center gap-2">

                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        categoryColors[
                          item.category
                        ]
                      }`}
                    />

                    <span>
                      {item.category}
                    </span>

                  </div>

                  <span className="font-bold font-mono">
                    {item.count}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* TRIAGE */}

        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-4">

          <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">

            <div>

              <span className="text-[10px] font-bold text-gray-400 uppercase block">
                OPERATIONAL PERFORMANCE
              </span>

              <h3 className="font-serif font-bold text-lg text-gray-900">
                Triage Progression
              </h3>

            </div>

            <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              LIVE DATA
            </span>

          </div>

          <div className="space-y-3.5 text-xs">

            {/* OPEN */}

            <div>

              <div className="flex justify-between mb-1">

                <span className="font-semibold text-gray-800">
                  1. Open / Awaiting Action
                </span>

                <span className="font-bold font-mono">
                  {openTickets.length} Tickets
                </span>

              </div>

              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">

                <div
                  className="bg-black h-full rounded-full"
                  style={{
                    width: `${
                      tickets.length
                        ? Math.min(
                            100,
                            (openTickets.length /
                              tickets.length) *
                              100
                          )
                        : 0
                    }%`,
                  }}
                />

              </div>

            </div>

            {/* IN PROGRESS */}

            <div>

              <div className="flex justify-between mb-1">

                <span className="font-semibold text-gray-800">
                  2. Desk Review
                </span>

                <span className="font-bold font-mono">
                  {inProgressTickets.length} Tickets
                </span>

              </div>

              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">

                <div
                  className="bg-amber-700 h-full rounded-full"
                  style={{
                    width: `${
                      tickets.length
                        ? Math.min(
                            100,
                            (inProgressTickets.length /
                              tickets.length) *
                              100
                          )
                        : 0
                    }%`,
                  }}
                />

              </div>

            </div>

            {/* RESOLVED */}

            <div>

              <div className="flex justify-between mb-1">

                <span className="font-semibold text-gray-800">
                  3. Resolved
                </span>

                <span className="font-bold font-mono">
                  {tickets.filter(
                    (ticket) =>
                      ticket.status ===
                      'Resolved'
                  ).length}{' '}
                  Tickets
                </span>

              </div>

              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">

                <div
                  className="bg-emerald-700 h-full rounded-full"
                  style={{
                    width: `${
                      tickets.length
                        ? Math.min(
                            100,
                            (tickets.filter(
                              (ticket) =>
                                ticket.status ===
                                'Resolved'
                            ).length /
                              tickets.length) *
                              100
                          )
                        : 0
                    }%`,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="bg-[#F2EDE4] p-4 rounded-md border border-gray-300/50 grid grid-cols-3 gap-2 text-center">

            <div>

              <span className="text-[9px] text-gray-400 font-bold uppercase block">
                TOTAL
              </span>

              <span className="font-serif font-bold text-base text-gray-900 block">
                {tickets.length}
              </span>

              <span className="text-[9px] text-gray-500">
                Tickets
              </span>

            </div>

            <div className="border-x border-gray-300/60 px-2">

              <span className="text-[9px] text-gray-400 font-bold uppercase block">
                TODAY
              </span>

              <span className="font-serif font-bold text-base text-gray-900 block">
                {todayTickets.length}
              </span>

              <span className="text-[9px] text-gray-500">
                New tickets
              </span>

            </div>

            <div>

              <span className="text-[9px] text-gray-400 font-bold uppercase block">
                RESPONSE
              </span>

              <span className="font-serif font-bold text-base text-gray-900 block">
                {averageResponseTime}
              </span>

              <span className="text-[9px] text-gray-500">
                Avg. time
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* RECENT TICKETS */}

      <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-4">

        <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">

          <div className="flex items-center gap-2">

            <h3 className="font-serif font-bold text-xl text-gray-900">
              Recent Tickets
            </h3>

            <span className="text-[10px] font-mono text-gray-500">
              ALL DEPARTMENTS
            </span>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate('/admin/tickets')
            }
            className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-black"
          >

            <SlidersHorizontal className="w-3.5 h-3.5" />

            <span>
              VIEW ALL ({tickets.length})
            </span>

          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left text-xs border-collapse">

            <thead>

              <tr className="border-b border-gray-300 text-[10px] font-bold uppercase tracking-wider text-gray-400">

                <th className="py-2.5 px-3">
                  FOLIO ID
                </th>

                <th className="py-2.5 px-3">
                  SUBJECT MATTER
                </th>

                <th className="py-2.5 px-3">
                  AUTHOR
                </th>

                <th className="py-2.5 px-3">
                  CATEGORY
                </th>

                <th className="py-2.5 px-3">
                  PRIORITY
                </th>

                <th className="py-2.5 px-3">
                  STAGE
                </th>

                <th className="py-2.5 px-3">
                  CREATED
                </th>

                <th className="py-2.5 px-3">
                  ASSIGNEE
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-200/60 font-medium">

              {recentTickets.map((ticket) => (

                <tr
                  key={ticket._id}
                  onClick={() =>
                    navigate(
                      `/admin/tickets/${ticket._id}`
                    )
                  }
                  className="hover:bg-[#F2EDE4] transition cursor-pointer"
                >

                  <td className="py-3 px-3 font-mono font-semibold text-gray-900">

                    #
                    {ticket._id
                      .slice(-6)
                      .toUpperCase()}

                  </td>

                  <td className="py-3 px-3">

                    <div className="font-semibold text-gray-900 max-w-xs truncate">
                      {ticket.subject}
                    </div>

                    {ticket.bookId?.title && (
                      <div className="text-[10px] text-gray-400 mt-1">
                        {ticket.bookId.title}
                      </div>
                    )}

                  </td>

                  <td className="py-3 px-3 text-gray-700">
                    {ticket.authorId}
                  </td>

                  <td className="py-3 px-3">

                    <span
                      className={`${
                        categoryBadgeColors[
                          ticket.category
                        ]
                      } text-[10px] px-2 py-0.5 rounded font-semibold`}
                    >
                      {ticket.category}
                    </span>

                  </td>

                  <td className="py-3 px-3">

                    <span
                      className={`${
                        getPriorityClass(
                          ticket.priority
                        )
                      } text-[10px] px-2 py-0.5 rounded font-semibold`}
                    >
                      {ticket.priority}
                    </span>

                  </td>

                  <td className="py-3 px-3">

                    <span
                      className={`${
                        getStatusClass(
                          ticket.status
                        )
                      } text-[10px] px-2 py-0.5 rounded font-bold uppercase`}
                    >
                      {ticket.status}
                    </span>

                  </td>

                  <td className="py-3 px-3 text-gray-500">
                    {formatTimeAgo(
                      ticket.createdAt
                    )}
                  </td>

                  <td className="py-3 px-3">

                    {ticket.assignedTo ? (

                      <span className="text-gray-800 font-semibold">
                        {getAssigneeName(ticket)}
                      </span>

                    ) : (

                      <span className="text-gray-400 italic">
                        Unassigned
                      </span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {recentTickets.length === 0 && (
            <div className="py-10 text-center text-sm text-gray-500">
              No tickets found in the database.
            </div>
          )}

        </div>

      </div>

      {/* AI BANNER */}

      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2B2B2B] text-white rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-gray-800">

        <div className="flex items-center gap-3">

          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">

            <Bot className="w-6 h-6" />

          </div>

          <div>

            <div className="flex items-center gap-2">

              <h4 className="font-serif font-bold text-base">
                Autonomic Triage Assistant
              </h4>

              <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider">
                System Normal
              </span>

            </div>

            <p className="text-xs text-gray-400 mt-0.5">

              {todayTickets.length} tickets received today.
              AI classification can be connected next.

            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 flex-shrink-0">

          <button
            type="button"
            onClick={() =>
              navigate('/admin/tickets')
            }
            className="px-3 py-2 bg-transparent hover:bg-white/10 text-xs font-semibold text-gray-300 rounded border border-gray-700 transition"
          >
            VIEW TICKET QUEUE
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-black text-xs font-bold rounded flex items-center gap-1.5 transition"
          >

            <Sparkles className="w-3.5 h-3.5 fill-black" />

            <span>RUN AUTONOMIC SWEEP</span>

          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;