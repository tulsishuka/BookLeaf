/* eslint-disable react-hooks/set-state-in-effect */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,

  BookOpen,
  Calendar,
  AlertTriangle,
  Clock,
  MessageSquare,
  Sparkles,
  Send,
  StickyNote,
  Loader2,
  RefreshCw,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

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



interface Book {
  _id?: string;
  title?: string;
  isbn?: string;
}

interface AssignedTo {
  _id?: string;
  name?: string;
  email?: string;
}

interface Ticket {
  _id: string;
  authorId: string;
  subject: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  aiCategory?: string | null;
  aiPriority?: string | null;
  aiDraftResponse?: string | null;
  bookId?: Book | string | null;
  assignedTo?: AssignedTo | null;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  _id: string;
  ticketId?: string;
  senderId?: string;
  senderRole: "author" | "admin";
  message: string;
  isInternal: boolean;
  createdAt: string;
}

interface ApiResponse {
  ticket: Ticket;
  messages: Message[];
  message?: string;
  data?: Message;
  aiDraftResponse?: string | null;
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ------------------------------------------------
  // STATE
  // ------------------------------------------------

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [response, setResponseState] = useState("");
  const [internalNote, setInternalNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  const [error, setError] = useState("");

  // ------------------------------------------------
  // REFS
  // ------------------------------------------------

  /**
   * These refs are important because ticket polling happens
   * every few seconds.
   *
   * Without refs, polling can overwrite an admin's manually
   * edited AI response because of stale React state.
   */
  const responseRef = useRef("");

  const loadedAIDraftRef = useRef("");

  // ------------------------------------------------
  // RESPONSE HANDLER
  // ------------------------------------------------

  const updateResponse = (value: string) => {
    responseRef.current = value;
    setResponseState(value);
  };

  // ------------------------------------------------
  // GET BOOK TITLE
  // ------------------------------------------------

  const getBookTitle = () => {
    if (!ticket?.bookId) {
      return "General / Account Level";
    }

    if (typeof ticket.bookId === "string") {
      return ticket.bookId;
    }

    return ticket.bookId.title || "Book";
  };

  // ------------------------------------------------
  // FETCH TICKET
  // ------------------------------------------------

  const fetchTicket = useCallback(
    async (showLoader = false) => {
      if (!id) return;

      try {
        if (showLoader) {
          setLoading(true);
        }

        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(
          `${API_URL}/api/tickets/admin/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data: ApiResponse = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to fetch ticket"
          );
        }

        const incomingTicket = data.ticket;
        const incomingMessages = data.messages || [];

        setTicket(incomingTicket);
        setMessages(incomingMessages);

        // --------------------------------------------
        // HANDLE NEW AI DRAFT
        // --------------------------------------------

        const incomingDraft =
          incomingTicket?.aiDraftResponse || "";

        /**
         * Update the textarea when:
         *
         * 1. It is empty
         *
         * OR
         *
         * 2. The admin has not manually changed the
         *    previously loaded AI draft.
         *
         * This means:
         *
         * Old AI draft
         *       ↓
         * Admin edits it
         *       ↓
         * Polling happens
         *       ↓
         * Admin edit stays
         *
         * But if author replies and backend generates
         * a completely new AI draft:
         *
         * New AI draft
         *       ↓
         * Textarea updates automatically
         */

        if (
          !responseRef.current.trim() ||
          responseRef.current === loadedAIDraftRef.current
        ) {
          responseRef.current = incomingDraft;
          setResponseState(incomingDraft);
        }

        loadedAIDraftRef.current = incomingDraft;
      } catch (err) {
        console.error(
          "FETCH TICKET ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        );
      } finally {
        if (showLoader) {
          setLoading(false);
        }
      }
    },
    [id, navigate]
  );

  // ------------------------------------------------
  // INITIAL FETCH + POLLING
  // ------------------------------------------------

  useEffect(() => {
    if (!id) return;

    fetchTicket(true);

    /**
     * Poll every 5 seconds.
     *
     * This allows the admin dashboard to automatically
     * detect when the author has replied and the backend
     * has generated a new AI draft.
     */
    const interval = window.setInterval(() => {
      fetchTicket(false);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [id, fetchTicket]);

  // ------------------------------------------------
  // SEND ADMIN RESPONSE
  // ------------------------------------------------

  const sendResponse = async () => {
    if (!id || !response.trim()) return;

    try {
      setSending(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const messageToSend = response.trim();

      const res = await fetch(
        `${API_URL}/api/tickets/${id}/respond`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: messageToSend,
          }),
        }
      );

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to send response"
        );
      }

      // --------------------------------------------
      // IMPORTANT:
      // Backend returns the message as `data`
      // --------------------------------------------

      if (data.data) {
        setMessages((prev) => [
          ...prev,
          data.data as Message,
        ]);
      }

      // --------------------------------------------
      // UPDATE TICKET
      // --------------------------------------------

      if (data.ticket) {
        setTicket(data.ticket);

        loadedAIDraftRef.current =
          data.ticket.aiDraftResponse || "";
      } else {
        setTicket((prev) =>
          prev
            ? {
                ...prev,
                status: "In Progress",
              }
            : prev
        );
      }

      // --------------------------------------------
      // CLEAR RESPONSE
      // --------------------------------------------

      responseRef.current = "";
      setResponseState("");

      /**
       * Fetch fresh data immediately.
       * This makes sure the conversation and ticket
       * state exactly match the backend.
       */
      await fetchTicket(false);
    } catch (err) {
      console.error(
        "SEND RESPONSE ERROR:",
        err
      );

      alert(
        err instanceof Error
          ? err.message
          : "Failed to send response"
      );
    } finally {
      setSending(false);
    }
  };

  // ------------------------------------------------
  // ADD INTERNAL NOTE
  // ------------------------------------------------

  const addInternalNote = async () => {
    if (!id || !internalNote.trim()) return;

    try {
      setAddingNote(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const noteToSend = internalNote.trim();

      const res = await fetch(
        `${API_URL}/api/tickets/${id}/internal-note`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: noteToSend,
          }),
        }
      );

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to add internal note"
        );
      }

      // Backend returns created message as data
      if (data.data) {
        setMessages((prev) => [
          ...prev,
          data.data as Message,
        ]);
      }

      setInternalNote("");

      await fetchTicket(false);
    } catch (err) {
      console.error(
        "ADD INTERNAL NOTE ERROR:",
        err
      );

      alert(
        err instanceof Error
          ? err.message
          : "Failed to add internal note"
      );
    } finally {
      setAddingNote(false);
    }
  };

  // ------------------------------------------------
  // STATUS COLOR
  // ------------------------------------------------

  const getStatusClasses = (
    status: TicketStatus
  ) => {
    switch (status) {
      case "Open":
        return "bg-amber-100 text-amber-800";

      case "In Progress":
        return "bg-blue-100 text-blue-800";

      case "Resolved":
        return "bg-emerald-100 text-emerald-800";

      case "Closed":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ------------------------------------------------
  // PRIORITY COLOR
  // ------------------------------------------------

  const getPriorityClasses = (
    priority: TicketPriority
  ) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "Low":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ------------------------------------------------
  // FORMAT DATE
  // ------------------------------------------------

  const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ------------------------------------------------
  // LOADING
  // ------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={30}
            className="animate-spin text-[#9C6A3A]"
          />

          <p className="text-sm text-[#6E6258]">
            Loading ticket...
          </p>
        </div>
      </div>
    );
  }

  // ------------------------------------------------
  // ERROR
  // ------------------------------------------------

  if (error && !ticket) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-[#6E6258] hover:text-[#2B241E] mb-6"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={20}
                className="text-red-600 mt-0.5"
              />

              <div>
                <h2 className="font-semibold text-red-800">
                  Unable to load ticket
                </h2>

                <p className="text-sm text-red-700 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------
  // NO TICKET
  // ------------------------------------------------

  if (!ticket) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6E6258]">
            Ticket not found.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[#9C6A3A] font-medium"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  // ------------------------------------------------
  // RENDER
  // ------------------------------------------------

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B241E]">
      {/* -------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------- */}

      <div className="border-b border-[#D8CFC4] bg-[#FDFBF7]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start gap-3">
              <button
                onClick={() => navigate(-1)}
                className="mt-1 w-9 h-9 rounded-full border border-[#D8CFC4] flex items-center justify-center hover:bg-[#F8F5EE] transition"
              >
                <ArrowLeft size={18} />
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                    {ticket.subject}
                  </h1>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span>
                </div>

                <p className="text-sm text-[#7A6E64] mt-1">
                  Ticket #{ticket._id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchTicket(false)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#D8CFC4] bg-white hover:bg-[#F8F5EE] text-sm transition"
              >
                <RefreshCw size={15} />
                Refresh
              </button>

              <div
                className={`px-3 py-2 rounded-xl text-sm font-medium ${getPriorityClasses(
                  ticket.priority
                )}`}
              >
                {ticket.priority} Priority
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------- */}
      {/* MAIN */}
      {/* -------------------------------------------- */}

      <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
          {/* ======================================== */}
          {/* LEFT */}
          {/* ======================================== */}

          <div className="space-y-6">
            {/* -------------------------------------- */}
            {/* TICKET SUMMARY */}
            {/* -------------------------------------- */}

            <section className="rounded-2xl border border-[#D8CFC4] bg-white overflow-hidden">
              <div className="px-5 sm:px-6 py-5 border-b border-[#E8E1D9]">
                <div className="flex items-center gap-2">
                  <MessageSquare
                    size={18}
                    className="text-[#9C6A3A]"
                  />

                  <h2 className="font-semibold">
                    Ticket Details
                  </h2>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#9A8C80]">
                      Category
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {ticket.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#9A8C80]">
                      Priority
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {ticket.priority}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#9A8C80]">
                      Created
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <Calendar
                        size={15}
                        className="text-[#9C6A3A]"
                      />

                      <p className="text-sm">
                        {formatDate(
                          ticket.createdAt
                        )}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#9A8C80]">
                      Last Updated
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <Clock
                        size={15}
                        className="text-[#9C6A3A]"
                      />

                      <p className="text-sm">
                        {formatDate(
                          ticket.updatedAt
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E8E1D9]">
                  <p className="text-xs uppercase tracking-wide text-[#9A8C80]">
                    Original Request
                  </p>

                  <div className="mt-3 rounded-xl bg-[#F8F5EE] border border-[#E8E1D9] p-4">
                    <p className="text-sm leading-6 whitespace-pre-wrap text-[#4E433B]">
                      {ticket.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------- */}
            {/* CONVERSATION */}
            {/* -------------------------------------- */}

            <section className="rounded-2xl border border-[#D8CFC4] bg-white overflow-hidden">
              <div className="px-5 sm:px-6 py-5 border-b border-[#E8E1D9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare
                    size={18}
                    className="text-[#9C6A3A]"
                  />

                  <h2 className="font-semibold">
                    Conversation
                  </h2>
                </div>

                <span className="text-xs text-[#9A8C80]">
                  {messages.filter(
                    (msg) => !msg.isInternal
                  ).length}{" "}
                  messages
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {messages.length === 0 ? (
                  <div className="py-12 text-center">
                    <MessageSquare
                      size={28}
                      className="mx-auto text-[#C6B9AC]"
                    />

                    <p className="mt-3 text-sm text-[#8A7D72]">
                      No messages yet.
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isAdmin =
                      msg.senderRole === "admin";

                    if (msg.isInternal) {
                      return (
                        <div
                          key={msg._id}
                          className="rounded-xl border border-amber-200 bg-amber-50 p-4"
                        >
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <StickyNote
                                size={16}
                                className="text-amber-700"
                              />

                              <span className="text-sm font-semibold text-amber-900">
                                Internal Note
                              </span>
                            </div>

                            <span className="text-xs text-amber-700">
                              {formatDate(
                                msg.createdAt
                              )}
                            </span>
                          </div>

                          <p className="text-sm leading-6 text-amber-900 whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={msg._id}
                        className={`flex ${
                          isAdmin
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[90%] sm:max-w-[78%] ${
                            isAdmin
                              ? "bg-[#9c6a3a] text-white rounded-2xl rounded-br-md"
                              : "bg-[#F8F5EE] border border-[#E8E1D9] rounded-2xl rounded-bl-md"
                          } px-4 py-4`}
                        >
                          <div className="flex items-center justify-between gap-5 mb-2">
                            <span
                              className={`text-xs font-semibold ${
                                isAdmin
                                  ? "text-white/80"
                                  : "text-[#8B7D72]"
                              }`}
                            >
                              {isAdmin
                                ? "Support Admin"
                                : "Author"}
                            </span>

                            <span
                              className={`text-xs ${
                                isAdmin
                                  ? "text-white/45"
                                  : "text-[#A19387]"
                              }`}
                            >
                              {formatDate(
                                msg.createdAt
                              )}
                            </span>
                          </div>

                          <p
                            className={`text-sm leading-6 whitespace-pre-wrap ${
                              isAdmin
                                ? "text-white/90"
                                : "text-[#4E433B]"
                            }`}
                          >
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {/* -------------------------------------- */}
            {/* AI RESPONSE */}
            {/* -------------------------------------- */}

            <section className="rounded-2xl border border-[#D8CFC4] bg-white overflow-hidden">
              <div className="px-5 sm:px-6 py-5 border-b border-[#E8E1D9]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={18}
                        className="text-[#9C6A3A]"
                      />

                      <h2 className="font-semibold">
                        Admin Response
                      </h2>

                      {ticket.aiDraftResponse && (
                        <span className="px-2 py-1 rounded-full bg-[#F3E9DE] text-[#9C6A3A] text-[11px] font-semibold">
                          AI Draft
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#8B7D72] mt-1">
                      Review the response before sending it
                      to the author.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                {ticket.aiDraftResponse ? (
                  <div className="mb-5 rounded-xl border border-[#E3D4C5] bg-[#F8F1E9] p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#9C6A3A] text-white flex items-center justify-center shrink-0">
                        <Sparkles size={16} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#5A3C25]">
                          Latest AI Draft
                        </p>

                        <p className="text-sm text-[#6F5948] leading-6 mt-1 whitespace-pre-wrap">
                          {ticket.aiDraftResponse}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#E3D4C5]">
                      <p className="text-xs text-[#8A6F5A]">
                        This draft is based on the latest
                        author message and the previous
                        conversation. Review and edit it
                        before sending.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-5 rounded-xl border border-[#E8E1D9] bg-[#F8F5EE] p-4">
                    <div className="flex items-center gap-3">
                      <Sparkles
                        size={17}
                        className="text-[#9C6A3A]"
                      />

                      <p className="text-sm text-[#6E6258]">
                        No AI draft is currently available.
                      </p>
                    </div>
                  </div>
                )}

                <label className="block text-sm font-medium mb-2">
                  Response
                </label>

                <textarea
                  value={response}
                  onChange={(e) =>
                    updateResponse(e.target.value)
                  }
                  rows={7}
                  placeholder="Write a response to the author..."
                  className="w-full resize-none rounded-xl border border-[#D8CFC4] bg-[#FDFBF7] px-4 py-3 text-sm text-[#2B241E] placeholder:text-[#A4968A] outline-none focus:ring-2 focus:ring-[#9C6A3A]/20 focus:border-[#9C6A3A] transition"
                />

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-xs text-[#9A8C80]">
                    The AI draft can be edited before sending.
                  </p>

                  <button
                    onClick={sendResponse}
                    disabled={
                      sending ||
                      !response.trim()
                    }
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#9C6A3A] text-white text-sm font-medium hover:bg-[#82562F] disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {sending ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Response
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* -------------------------------------- */}
            {/* INTERNAL NOTE */}
            {/* -------------------------------------- */}

            <section className="rounded-2xl border border-[#D8CFC4] bg-white overflow-hidden">
              <div className="px-5 sm:px-6 py-5 border-b border-[#E8E1D9]">
                <div className="flex items-center gap-2">
                  <StickyNote
                    size={18}
                    className="text-[#9C6A3A]"
                  />

                  <h2 className="font-semibold">
                    Internal Note
                  </h2>
                </div>

                <p className="text-xs text-[#8B7D72] mt-1">
                  Internal notes are visible only to admins.
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <textarea
                  value={internalNote}
                  onChange={(e) =>
                    setInternalNote(e.target.value)
                  }
                  rows={4}
                  placeholder="Add an internal note..."
                  className="w-full resize-none rounded-xl border border-[#D8CFC4] bg-[#FDFBF7] px-4 py-3 text-sm text-[#2B241E] placeholder:text-[#A4968A] outline-none focus:ring-2 focus:ring-[#9C6A3A]/20 focus:border-[#9C6A3A] transition"
                />

                <div className="flex justify-end mt-3">
                  <button
                    onClick={addInternalNote}
                    disabled={
                      addingNote ||
                      !internalNote.trim()
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D8CFC4] bg-[#F8F5EE] text-[#4E433B] text-sm font-medium hover:bg-[#EEE8DF] disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {addingNote ? (
                      <>
                        <Loader2
                          size={15}
                          className="animate-spin"
                        />
                        Adding...
                      </>
                    ) : (
                      <>
                        <StickyNote size={15} />
                        Add Note
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>
          </div>


          <aside className="space-y-6">
           

            <section className="rounded-2xl border border-[#D8CFC4] bg-white overflow-hidden">
              <div className="px-5 py-5 border-b border-[#E8E1D9]">
                <div className="flex items-center gap-2">
                  <BookOpen
                    size={18}
                    className="text-[#9C6A3A]"
                  />

                  <h2 className="font-semibold">
                    Related Book
                  </h2>
                </div>
              </div>

              <div className="p-5">
                <p className="font-medium text-sm leading-5">
                  {getBookTitle()}
                </p>

                {typeof ticket.bookId ===
                  "object" &&
                  ticket.bookId?.isbn && (
                    <p className="text-xs text-[#8B7D72] mt-2">
                      ISBN: {ticket.bookId.isbn}
                    </p>
                  )}
              </div>
            </section>

            {/* -------------------------------------- */}
            {/* AI ANALYSIS */}
            {/* -------------------------------------- */}

            <section className="rounded-2xl bg-[#9c6a3a] text-white overflow-hidden">
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={18}
                    className="text-[#D7A36F]"
                  />

                  <h2 className="font-semibold">
                    AI Analysis
                  </h2>
                </div>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    Category
                  </p>

                  <p className="text-sm text-white/85 mt-1">
                    {ticket.aiCategory ||
                      ticket.category ||
                      "Not available"}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    Priority
                  </p>

                  <p className="text-sm text-white/85 mt-1">
                    {ticket.aiPriority ||
                      ticket.priority ||
                      "Not available"}
                  </p>
                </div>

                <div className="mt-5 pt-5 border-t border-white/10">
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    Latest AI Draft
                  </p>

                  {ticket.aiDraftResponse ? (
                    <p className="text-sm text-white/65 leading-6 mt-3 whitespace-pre-wrap">
                      {ticket.aiDraftResponse}
                    </p>
                  ) : (
                    <p className="text-sm text-white/35 mt-2">
                      No AI draft available.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* -------------------------------------- */}
            {/* TICKET TIMELINE */}
            {/* -------------------------------------- */}

            <section className="rounded-2xl border border-[#D8CFC4] bg-white overflow-hidden">
              <div className="px-5 py-5 border-b border-[#E8E1D9]">
                <div className="flex items-center gap-2">
                  <Clock
                    size={18}
                    className="text-[#9C6A3A]"
                  />

                  <h2 className="font-semibold">
                    Ticket Timeline
                  </h2>
                </div>
              </div>

              <div className="p-5 space-y-5">
                <div className="flex gap-3">
                  <div className="mt-1 w-2.5 h-2.5 rounded-full bg-[#9C6A3A] shrink-0" />

                  <div>
                    <p className="text-sm font-medium">
                      Ticket created
                    </p>

                    <p className="text-xs text-[#8B7D72] mt-1">
                      {formatDate(
                        ticket.createdAt
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 w-2.5 h-2.5 rounded-full bg-[#C9B7A6] shrink-0" />

                  <div>
                    <p className="text-sm font-medium">
                      Last activity
                    </p>

                    <p className="text-xs text-[#8B7D72] mt-1">
                      {formatDate(
                        ticket.updatedAt
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 w-2.5 h-2.5 rounded-full bg-[#C9B7A6] shrink-0" />

                  <div>
                    <p className="text-sm font-medium">
                      Current status
                    </p>

                    <p className="text-xs text-[#8B7D72] mt-1">
                      {ticket.status}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default TicketDetail;
