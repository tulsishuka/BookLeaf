import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Calendar,
  AlertTriangle,
  Clock,
  MessageSquare,
  Sparkles,
  Send,
  StickyNote,
  Loader2,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

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
  subject: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  bookId?: Book | null;
  assignedTo?: AssignedAdmin | null;
  aiCategory?: string | null;
  aiPriority?: string | null;
  aiDraftResponse?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  _id: string;
  senderId: string;
  senderRole: "author" | "admin";
  message: string;
  isInternal: boolean;
  createdAt: string;
}

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [response, setResponse] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchTicket = async () => {
      try {
        setLoading(true);
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

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to fetch ticket"
          );
        }

        setTicket(data.ticket);
        setMessages(data.messages || []);

        // Automatically put AI draft into response box
        if (data.ticket?.aiDraftResponse) {
          setResponse(data.ticket.aiDraftResponse);
        }
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, navigate]);

  const sendResponse = async () => {
    if (!id || !response.trim()) return;

    try {
      setSending(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/tickets/${id}/respond`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: response,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to send response"
        );
      }

      setMessages((prev) => [
        ...prev,
        data.message || {
          _id: Date.now().toString(),
          senderRole: "admin",
          message: response,
          isInternal: false,
          createdAt: new Date().toISOString(),
          senderId: "",
        },
      ]);

      setResponse("");

      setTicket((prev) =>
        prev
          ? {
              ...prev,
              status: "In Progress",
            }
          : prev
      );
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to send response"
      );
    } finally {
      setSending(false);
    }
  };

  const addInternalNote = async () => {
    if (!id || !internalNote.trim()) return;

    try {
      setSending(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/tickets/${id}/internal-note`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: internalNote,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to add note"
        );
      }

      setMessages((prev) => [
        ...prev,
        data.message || {
          _id: Date.now().toString(),
          senderRole: "admin",
          message: internalNote,
          isInternal: true,
          createdAt: new Date().toISOString(),
          senderId: "",
        },
      ]);

      setInternalNote("");
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to add internal note"
      );
    } finally {
      setSending(false);
    }
  };

  const updateTicket = async (
    field: "status" | "priority" | "category",
    value: string
  ) => {
    if (!id) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/tickets/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [field]: value,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update ticket"
        );
      }

      setTicket(data.ticket || data);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to update ticket"
      );
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityClass = (priority?: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";

      case "High":
        return "bg-orange-100 text-orange-700 border-orange-200";

      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      default:
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getStatusClass = (status?: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-700";

      case "In Progress":
        return "bg-purple-100 text-purple-700";

      case "Resolved":
        return "bg-green-100 text-green-700";

      case "Closed":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f4ee] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading ticket details...
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-[#f7f4ee] p-8">
        <button
          onClick={() => navigate("/admin/tickets")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-8"
        >
          <ArrowLeft size={17} />
          Back to Ticket Queue
        </button>

        <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">
          <AlertTriangle className="mx-auto mb-3 text-red-500" />
          <h2 className="text-xl font-semibold">
            Unable to load ticket
          </h2>

          <p className="text-gray-500 mt-2">
            {error || "Ticket not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee] p-6 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => navigate("/admin/tickets")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-4 transition"
          >
            <ArrowLeft size={17} />
            Back to Ticket Queue
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif text-gray-900">
              Ticket Details
            </h1>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                ticket.status
              )}`}
            >
              {ticket.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Ticket #{ticket._id}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-2 rounded-full border text-sm font-medium ${getPriorityClass(
              ticket.priority
            )}`}
          >
            <span className="inline-flex items-center gap-2">
              <AlertTriangle size={15} />
              {ticket.priority} Priority
            </span>
          </span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr_320px] gap-6">
        {/* AUTHOR INFORMATION */}
        <aside className="space-y-6">
          <section className="bg-white border border-black/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full bg-[#e9e3d7] flex items-center justify-center">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Author Information
                </h2>

                <p className="text-xs text-gray-500">
                  Author ID: {ticket.authorId}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex gap-3">
                <User
                  size={17}
                  className="text-gray-400 mt-0.5"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Author ID
                  </p>

                  <p className="text-sm font-medium mt-1">
                    {ticket.authorId}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail
                  size={17}
                  className="text-gray-400 mt-0.5"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Email
                  </p>

                  <p className="text-sm font-medium mt-1">
                    Author email will appear here
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={17}
                  className="text-gray-400 mt-0.5"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Phone
                  </p>

                  <p className="text-sm font-medium mt-1">
                    Author phone will appear here
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin
                  size={17}
                  className="text-gray-400 mt-0.5"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Location
                  </p>

                  <p className="text-sm font-medium mt-1">
                    Author location will appear here
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* BOOK INFORMATION */}
          <section className="bg-white border border-black/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <BookOpen size={20} />

              <h2 className="font-semibold">
                Book Information
              </h2>
            </div>

            {ticket.bookId ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400">
                    Book Title
                  </p>

                  <p className="font-medium mt-1">
                    {ticket.bookId.title}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    ISBN
                  </p>

                  <p className="text-sm mt-1">
                    {ticket.bookId.isbn}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Genre
                  </p>

                  <p className="text-sm mt-1">
                    {ticket.bookId.genre || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Publication Date
                  </p>

                  <p className="text-sm mt-1">
                    {ticket.bookId.publicationDate
                      ? new Date(
                          ticket.bookId.publicationDate
                        ).toLocaleDateString("en-IN")
                      : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Book Status
                  </p>

                  <p className="text-sm mt-1">
                    {ticket.bookId.status || "—"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
                General / Account Level Query
              </div>
            )}
          </section>
        </aside>

        {/* CENTER - QUERY + CONVERSATION */}
        <main className="space-y-6">
          {/* QUERY */}
          <section className="bg-white border border-black/5 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                  Support Query
                </p>

                <h2 className="text-2xl font-serif text-gray-900">
                  {ticket.subject}
                </h2>
              </div>

              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs">
                  {ticket.category}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs text-gray-400 mb-2">
                Author's Query
              </p>

              <p className="text-gray-700 leading-7 whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>

            <div className="border-t border-gray-100 mt-6 pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex gap-3">
                <Calendar
                  size={17}
                  className="text-gray-400"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Created
                  </p>

                  <p className="text-sm mt-1">
                    {formatDate(ticket.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock
                  size={17}
                  className="text-gray-400"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Last Updated
                  </p>

                  <p className="text-sm mt-1">
                    {formatDate(ticket.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CONVERSATION */}
          <section className="bg-white border border-black/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare size={20} />

              <h2 className="font-semibold">
                Conversation
              </h2>

              <span className="text-xs text-gray-400">
                {messages.filter(
                  (message) => !message.isInternal
                ).length}{" "}
                messages
              </span>
            </div>

            <div className="space-y-5">
              {messages.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  No messages yet.
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message._id}
                    className={
                      message.isInternal
                        ? "bg-amber-50 border border-amber-200 rounded-xl p-4"
                        : message.senderRole === "admin"
                        ? "ml-8 bg-[#f1eee7] rounded-2xl p-5"
                        : "mr-8 bg-gray-50 border border-gray-100 rounded-2xl p-5"
                    }
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {message.isInternal ? (
                          <StickyNote
                            size={15}
                            className="text-amber-600"
                          />
                        ) : message.senderRole ===
                          "admin" ? (
                          <Sparkles
                            size={15}
                            className="text-gray-600"
                          />
                        ) : (
                          <User
                            size={15}
                            className="text-gray-500"
                          />
                        )}

                        <span className="text-sm font-medium">
                          {message.isInternal
                            ? "Internal Note"
                            : message.senderRole ===
                              "admin"
                            ? "Admin"
                            : "Author"}
                        </span>
                      </div>

                      <span className="text-xs text-gray-400">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 leading-6 whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* ADMIN RESPONSE */}
          <section className="bg-white border border-black/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <Send size={19} />

              <div>
                <h2 className="font-semibold">
                  Respond to Author
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Edit the AI-generated response before sending.
                </p>
              </div>
            </div>

            <textarea
              value={response}
              onChange={(e) =>
                setResponse(e.target.value)
              }
              placeholder="Write your response to the author..."
              rows={7}
              className="w-full border border-gray-200 rounded-xl p-4 text-sm outline-none focus:border-black resize-none"
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={sendResponse}
                disabled={
                  sending || !response.trim()
                }
                className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-xl text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={16} />
                )}

                Send Response
              </button>
            </div>
          </section>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-6">
          {/* TICKET CONTROLS */}
          <section className="bg-white border border-black/5 rounded-2xl p-6">
            <h2 className="font-semibold mb-5">
              Ticket Controls
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Status
                </label>

                <select
                  value={ticket.status}
                  onChange={(e) =>
                    updateTicket(
                      "status",
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm bg-white outline-none"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Resolved">
                    Resolved
                  </option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Priority
                </label>

                <select
                  value={ticket.priority}
                  onChange={(e) =>
                    updateTicket(
                      "priority",
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm bg-white outline-none"
                >
                  <option value="Critical">
                    Critical
                  </option>

                  <option value="High">High</option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Category
                </label>

                <select
                  value={ticket.category}
                  onChange={(e) =>
                    updateTicket(
                      "category",
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm bg-white outline-none"
                >
                  <option value="Royalty & Payments">
                    Royalty & Payments
                  </option>

                  <option value="ISBN & Metadata Issues">
                    ISBN & Metadata Issues
                  </option>

                  <option value="Printing & Quality">
                    Printing & Quality
                  </option>

                  <option value="Distribution & Availability">
                    Distribution & Availability
                  </option>

                  <option value="Book Status & Production Updates">
                    Book Status & Production Updates
                  </option>

                  <option value="General Inquiry">
                    General Inquiry
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* AI ANALYSIS */}
          <section className="bg-[#171717] text-white rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <Sparkles size={19} />

              <h2 className="font-semibold">
                AI Analysis
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xs text-gray-400">
                  AI Category
                </p>

                <p className="text-sm mt-1">
                  {ticket.aiCategory ||
                    ticket.category ||
                    "Not classified"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  AI Priority
                </p>

                <p className="text-sm mt-1">
                  {ticket.aiPriority ||
                    ticket.priority ||
                    "Not classified"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  AI Draft Response
                </p>

                <p className="text-sm text-gray-300 leading-6 mt-2">
                  {ticket.aiDraftResponse ||
                    "No AI draft available."}
                </p>
              </div>
            </div>
          </section>

          {/* INTERNAL NOTE */}
          <section className="bg-white border border-black/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <StickyNote size={19} />

              <div>
                <h2 className="font-semibold">
                  Internal Note
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Only admins can see this.
                </p>
              </div>
            </div>

            <textarea
              value={internalNote}
              onChange={(e) =>
                setInternalNote(e.target.value)
              }
              placeholder="Add a private note..."
              rows={5}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black resize-none"
            />

            <button
              onClick={addInternalNote}
              disabled={
                sending || !internalNote.trim()
              }
              className="w-full mt-3 px-4 py-3 border border-black rounded-xl text-sm hover:bg-black hover:text-white transition disabled:opacity-50"
            >
              Add Internal Note
            </button>
          </section>

          {/* ASSIGNED ADMIN */}
          <section className="bg-white border border-black/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <User size={18} />

              <h2 className="font-semibold">
                Assigned To
              </h2>
            </div>

            {ticket.assignedTo ? (
              <div>
                <p className="text-sm font-medium">
                  {ticket.assignedTo.name ||
                    "Admin"}
                </p>

                {ticket.assignedTo.email && (
                  <p className="text-xs text-gray-500 mt-1">
                    {ticket.assignedTo.email}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                Not assigned
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
};

export default TicketDetail;
