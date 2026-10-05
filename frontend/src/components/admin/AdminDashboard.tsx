/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  Bot,
  
  Loader2,

} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "https://bookleaf-1-backend.onrender.com/";

type TicketStatus =
  | "Open"
  | "In Progress"
  | "Resolved"
  | "Closed";

type TicketPriority =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

type TicketCategory =
  | "Royalty & Payments"
  | "ISBN & Metadata Issues"
  | "Printing & Quality"
  | "Distribution & Availability"
  | "Book Status & Production Updates"
  | "General Inquiry";

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
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Admin authentication token not found.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/tickets/admin/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to fetch admin tickets"
        );
      }

      const receivedTickets = Array.isArray(data)
        ? data
        : data.tickets || [];

      setTickets(receivedTickets);
    } catch (err) {
      console.error("ADMIN DASHBOARD ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading tickets."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();

    const interval = setInterval(() => {
      fetchTickets();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const difference = now.getTime() - date.getTime();

    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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

  const openTickets = useMemo(
    () =>
      tickets.filter(
        (ticket) => ticket.status === "Open"
      ),
    [tickets]
  );

  const criticalTickets = useMemo(
    () =>
      tickets.filter(
        (ticket) =>
          ticket.priority === "Critical" &&
          ticket.status !== "Resolved" &&
          ticket.status !== "Closed"
      ),
    [tickets]
  );


  const unassignedTickets = useMemo(
    () =>
      tickets.filter(
        (ticket) =>
          !ticket.assignedTo &&
          ticket.status !== "Resolved" &&
          ticket.status !== "Closed"
      ),
    [tickets]
  );

  const inProgressTickets = useMemo(
    () =>
      tickets.filter(
        (ticket) => ticket.status === "In Progress"
      ),
    [tickets]
  );

  const resolvedToday = useMemo(
    () =>
      tickets.filter((ticket) => {
        if (ticket.status !== "Resolved") return false;

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

  const categoryBadgeColors: Record<TicketCategory, string> = {
    "Royalty & Payments":
      "bg-[#F3E7D6] text-[#7A4F28] border border-[#D8BFA1]",
    "ISBN & Metadata Issues":
      "bg-[#EEE8E1] text-[#684F38] border border-[#D8CFC4]",
    "Printing & Quality":
      "bg-[#EDE9E3] text-gray-800 border border-[#D4CEC5]",
    "Distribution & Availability":
      "bg-[#F0E9E2] text-[#70553C] border border-[#D7C8B8]",
    "Book Status & Production Updates":
      "bg-[#E8EEE8] text-[#49604D] border border-[#C4D2C5]",
    "General Inquiry":
      "bg-[#F4EBDD] text-[#76552F] border border-[#DECBAA]",
  };


  const recentTickets = useMemo(() => {
    return [...tickets]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 6);
  }, [tickets]);


  const getPriorityClass = (
    priority: TicketPriority
  ) => {
    switch (priority) {
      case "Critical":
        return "bg-red-600 text-white border border-red-600";

      case "High":
        return "bg-[#F3E7D6] text-[#7A4F28] border border-[#D8BFA1]";

      case "Medium":
        return "bg-[#F4EBDD] text-[#76552F] border border-[#DECBAA]";

      case "Low":
        return "bg-[#EDE9E3] text-gray-700 border border-[#D4CEC5]";

      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getStatusClass = (status: TicketStatus) => {
    switch (status) {
      case "Open":
        return "bg-[#9c6a3a] text-white border border-[#9c6a3a]";

      case "In Progress":
        return "bg-[#E8EEE8] text-[#49604D] border border-[#C4D2C5]";

      case "Resolved":
        return "bg-[#EEE8E1] text-[#684F38] border border-[#D8CFC4]";

      case "Closed":
        return "bg-[#EDE9E3] text-gray-700 border border-[#D4CEC5]";

      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getAssigneeName = (ticket: Ticket) => {
    if (!ticket.assignedTo) {
      return "Unassigned";
    }

    return (
      ticket.assignedTo.name ||
      ticket.assignedTo.email ||
      "Assigned"
    );
  };

  const averageResponseTime = useMemo(() => {
    const respondedTickets = tickets.filter(
      (ticket) =>
        ticket.status !== "Open" &&
        new Date(ticket.updatedAt).getTime() >
          new Date(ticket.createdAt).getTime()
    );

    if (!respondedTickets.length) {
      return "—";
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

  if (loading && tickets.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#9c6a3a]" />

          <p className="mt-3 text-sm text-gray-500">
            Loading administrative ticket data...
          </p>
        </div>
      </div>
    );
  }

  if (error && tickets.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] p-4 sm:p-6 lg:p-10">
        <div className="max-w-xl mx-auto mt-16 sm:mt-20 bg-[#F8F5EE] border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />

          <h2 className="font-serif font-bold text-xl text-red-900 mt-3">
            Unable to load dashboard
          </h2>

          <p className="text-sm text-red-700 mt-2">
            {error}
          </p>

          <button
            onClick={fetchTickets}
            className="mt-5 px-5 py-2.5 bg-[#9c6a3a] hover:bg-[#82552f] text-white rounded-md text-xs font-semibold transition"
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 sm:p-6 lg:p-10 text-gray-800 font-sans space-y-6 lg:space-y-8">
  <div className="bg-[#2B241E] text-white rounded-lg p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 shadow-sm border border-[#594838]">

        <div className="flex items-start gap-3">

          <div className="p-2.5 bg-[#9c6a3a]/20 text-[#D9A875] rounded-lg border border-[#9c6a3a]/40 flex-shrink-0">
            <Bot className="w-6 h-6" />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h4 className="font-serif font-bold text-base sm:text-lg">
                Welcome to the Admin Dashboard
              </h4>

              <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider">
                System Normal
              </span>

            </div>

            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              {todayTickets.length} tickets received today.
              AI classification can be connected next.
            </p>

          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto flex-shrink-0">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/tickets")
            }
            className="px-4 py-2.5 bg-[#9c6a3a] hover:bg-white/10 text-xs font-semibold text-gray-300 rounded border border-[#66594D] transition"
          >
            VIEW TICKET QUEUE
          </button>

         

        </div>

      </div>
     

      {/* STAT CARDS */}

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 ">

        {/* OPEN */}

        <div className="bg-[#F8F5EE] border border-[#9c6a3a] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              OPEN TICKETS
            </span>

            <span className="p-1 bg-[#EEE8E1] rounded text-[#795536]">
              📋
            </span>
          </div>

          <div>
            <span className="text-3xl font-serif font-bold text-gray-900">
              {openTickets.length}
            </span>

            <div className="text-[10px] text-gray-500 mt-1 font-semibold">
              Currently awaiting action
            </div>
          </div>
        </div>

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
              <span>Requires immediate review</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F8F5EE] border border-[#9c6a3a] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              UNASSIGNED
            </span>

            <span className="p-1 bg-[#F3E7D6] rounded text-[#9c6a3a]">
              ⏳
            </span>
          </div>

          <div>
            <span className="text-3xl font-serif font-bold text-gray-900">
              {unassignedTickets.length}
            </span>

            <div className="text-[10px] text-[#8A6037] mt-1 font-semibold">
              Requires triage assignment
            </div>
          </div>
        </div>

    

        <div className="bg-[#F8F5EE] border border-[#9c6a3a] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              IN PROGRESS
            </span>

            <span className="p-1 bg-[#EEE8E1] rounded text-[#795536]">
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
        <div className="bg-[#F8F5EE] border border-[#9c6a3a] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              RESOLVED TODAY
            </span>

            <CheckCircle2 className="w-4 h-4 text-[#607A64]" />
          </div>

          <div>
            <span className="text-3xl font-serif font-bold text-gray-900">
              {resolvedToday.length}
            </span>

            <div className="flex items-center gap-1 text-[10px] text-[#607A64] mt-1 font-semibold">
              <ArrowUpRight className="w-3 h-3" />
              <span>Resolved today</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F8F5EE] border border-[#9c6a3a] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              AVG RESPONSE
            </span>

            <Clock className="w-4 h-4 text-[#9c6a3a]" />
          </div>

          <div>
            <span className="text-3xl font-serif font-bold text-gray-900">
              {averageResponseTime}
            </span>

            <div className="text-[10px] text-gray-500 mt-1">
              Based on current ticket data
            </div>
          </div>
        </div>

      </div>

      <div className="bg-[#F8F5EE] border border-[#9c6a3a] rounded-lg p-4 sm:p-6 space-y-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#DED5CA] pb-3">

          <div>
            <div className="flex flex-wrap items-center gap-2">

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-gray-900">
                Recent Tickets
              </h3>

              <span className="text-[9px] sm:text-[10px] font-mono text-[#9c6a3a] border border-[#D8CFC4] bg-[#FDFBF7] px-2 py-1 rounded">
                ALL DEPARTMENTS
              </span>

            </div>

            <p className="text-xs text-gray-500 mt-1">
              Latest author support requests requiring attention.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/admin/tickets")
            }
            className="self-start sm:self-auto flex items-center gap-1 text-xs font-semibold text-[#7A522E] hover:text-[#9c6a3a] transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />

            <span>
              VIEW ALL ({tickets.length})
            </span>
          </button>

        </div>

        <div className="overflow-x-auto -mx-1">
          <table className="w-full min-w-[900px] text-left text-xs border-collapse">

            <thead>
              <tr className="border-b border-[#D8CFC4] text-[10px] font-bold uppercase tracking-wider text-gray-400">

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

            <tbody className="divide-y divide-[#E4DDD4] font-medium">

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
                      } text-[10px] px-2 py-0.5 rounded font-semibold whitespace-nowrap`}
                    >
                      {ticket.category}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`${getPriorityClass(
                        ticket.priority
                      )} text-[10px] px-2 py-0.5 rounded font-semibold whitespace-nowrap`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`${getStatusClass(
                        ticket.status
                      )} text-[10px] px-2 py-0.5 rounded font-bold uppercase whitespace-nowrap`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                    {formatTimeAgo(ticket.createdAt)}
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
    

    </div>
  );
};

export default AdminDashboard;
