/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  ShieldCheck,
  Loader2,
  Send,
  MessageSquare,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://bookleaf-1-backend.onrender.com";

interface Message {
  _id: string;
  ticketId?: string;
  senderId: string;
  senderRole: "author" | "admin";
  message: string;
  isInternal: boolean;
  createdAt: string;
}

interface Ticket {
  _id: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  bookId?: {
    _id: string;
    title: string;
    isbn: string;
  } | null;
}

const AuthorTicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [reply, setReply] = useState("");
    const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      const response = await fetch(
        `${API_URL}/api/tickets/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const contentType =
        response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        const text = await response.text();

        console.error(
          "Backend returned non-JSON response:",
          text
        );

        throw new Error(
          `Server returned an unexpected response (${response.status})`
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load ticket"
        );
      }

      setTicket(data.ticket);
      setMessages(data.messages || []);
    } catch (error) {
      console.error("FETCH TICKET ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load ticket"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleSendReply = async () => {
    if (!id) return;

    const trimmedReply = reply.trim();

    if (!trimmedReply) {
      return;
    }

    try {
      setSending(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
      const response = await fetch(
        `${API_URL}/api/tickets/${id}/reply`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmedReply,
          }),
        }
      );
const contentType =
        response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        const text = await response.text();

        console.error(
          "Reply endpoint returned non-JSON response:",
          text
        );

        throw new Error(
          `Server returned an unexpected response (${response.status})`
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send reply"
        );
      }

      if (data.data) {
        setMessages((previousMessages) => [
          ...previousMessages,
          data.data,
        ]);
      } else {
        await fetchTicket();
      }
      if (data.ticket) {
        setTicket(data.ticket);
      }
      setReply("");
    } catch (error) {
      console.error("SEND REPLY ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to send reply"
      );
    } finally {
      setSending(false);
    }
  };
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
 

    if (
      event.key === "Enter" &&
      (event.ctrlKey || event.metaKey)
    ) {
      event.preventDefault();

      if (!sending && reply.trim()) {
        handleSendReply();
      }
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            className="animate-spin text-[#9C6A3A]"
            size={28}
          />

          <p className="text-xs text-gray-500">
            Loading conversation...
          </p>
        </div>
      </div>
    );
  }
  if (!ticket) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] p-6 font-sans">
        <div className="mx-auto max-w-3xl py-20 text-center">
          <MessageSquare
            className="mx-auto mb-4 text-gray-300"
            size={40}
          />

          <h2 className="font-serif text-xl font-bold text-gray-800">
            Ticket not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error || "We couldn't find this support ticket."}
          </p>

          <button
            onClick={() => navigate("/author/tickets")}
            className="mt-6 rounded-md bg-black px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800"
          >
            Back to My Tickets
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 font-sans text-gray-800 sm:p-6 lg:p-10">
      <div className="mx-auto w-full space-y-6">
        <div className="flex flex-col gap-3 text-xs font-medium text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/author/tickets")}
            className="flex w-fit items-center gap-1.5 text-gray-600 transition hover:text-black"
          >
            <ArrowLeft size={14} />

            <span>Back to My Tickets</span>
          </button>

          <div className="flex items-center gap-1.5 text-gray-500">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />

            <span>Priority Desk Dispatch</span>
          </div>
        </div>
        <div className="relative flex w-full flex-col justify-between gap-6 overflow-hidden rounded-lg bg-[#9c6a3a] p-5 text-white shadow-sm sm:p-6 lg:flex-row lg:items-center lg:p-8">

          <div className="relative z-10 max-w-4xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200/90">
                Support Ticket
              </span>

              <span
                className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                  ticket.status === "Open"
                    ? "bg-white/15 text-white"
                    : "bg-white/15 text-white"
                }`}
              >
                {ticket.status}
              </span>
            </div>
            <h1 className="break-words font-serif text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {ticket.subject}
            </h1>

            <p className="pt-1 text-xs leading-relaxed text-gray-200 sm:text-sm">
              {ticket.bookId
                ? `Associated Folio: ${ticket.bookId.title} (ISBN: ${
                    ticket.bookId.isbn || "N/A"
                  })`
                : "Editorial support and tracking history"}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded bg-black/15 px-2.5 py-1 text-[10px] font-medium text-white/90">
                {ticket.category}
              </span>

              <span className="rounded bg-black/15 px-2.5 py-1 text-[10px] font-medium text-white/90">
                Priority: {ticket.priority}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-xs text-red-700">
              {error}
            </p>
          </div>
        )}
        <div className="w-full space-y-6 rounded-lg border border-gray-200/80 bg-[#F8F5EE] p-4 shadow-sm sm:p-6 lg:p-8">


          <div className="flex items-center gap-3 border-b border-gray-200/80 pb-4">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EBE5D8] text-gray-700">
              <ShieldCheck size={16} />
            </div>

            <div className="min-w-0">
              <h2 className="font-serif text-base font-bold text-gray-900">
                Conversation
              </h2>

              <p className="text-xs text-gray-500">
                Messages between you and BookLeaf support
              </p>
            </div>
          </div>


          <div className="space-y-6">

            {messages.length === 0 ? (
              <div className="py-10 text-center">
                <MessageSquare
                  className="mx-auto mb-3 text-gray-300"
                  size={32}
                />

                <p className="text-xs italic text-gray-500">
                  No response yet. Our team will get back to
                  you soon.
                </p>
              </div>
            ) : (
              messages.map((message, idx) => {
                const isAdmin =
                  message.senderRole === "admin";

                return (
                  <div
                    key={message._id}
                    className={`space-y-3 rounded-lg border p-4 transition-all sm:p-5 ${
                      isAdmin
                        ? "border-gray-300/70 bg-[#FAF8F3]"
                        : "border-transparent bg-[#9C6A3A] text-white"
                    }`}
                  >

                    <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex flex-wrap items-center gap-2">

                        {isAdmin ? (
                          <ShieldCheck
                            size={14}
                            className="text-[#9C6A3A]"
                          />
                        ) : (
                          <User
                            size={14}
                            className="text-white/80"
                          />
                        )}

                        <span
                          className={`font-bold ${
                            isAdmin
                              ? "text-gray-900"
                              : "text-white"
                          }`}
                        >
                          {isAdmin
                            ? "BookLeaf Support"
                            : "You (Author)"}
                        </span>

                        {isAdmin && (
                          <span className="rounded bg-[#EBE5D8] px-1.5 py-0.5 text-[10px] font-medium uppercase text-gray-700">
                            Official Desk
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-[10px] font-mono ${
                          isAdmin
                            ? "text-gray-400"
                            : "text-white/70"
                        }`}
                      >
                        Entry #{idx + 1}
                      </span>
                    </div>

                    <p
                      className={`whitespace-pre-wrap break-words text-xs leading-relaxed sm:text-sm ${
                        isAdmin
                          ? "text-gray-800"
                          : "text-white/95"
                      }`}
                    >
                      {message.message}
                    </p>
                    <div
                      className={`flex flex-col gap-1 border-t pt-2 text-[10px] sm:flex-row sm:items-center sm:justify-between ${
                        isAdmin
                          ? "border-gray-200/60 text-gray-400"
                          : "border-white/10 text-white/70"
                      }`}
                    >
                      <span>
                        {formatDate(message.createdAt)}
                      </span>

                      <span>
                        {isAdmin
                          ? "Official Response"
                          : "Delivered"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="space-y-4 border-t border-gray-200/80 pt-5">

            <div>
              <div className="flex items-center gap-2">
                <MessageSquare
                  size={15}
                  className="text-[#9C6A3A]"
                />

                <h3 className="font-serif text-sm font-bold text-gray-900">
                  Reply to Support
                </h3>
              </div>

              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                Continue this conversation without creating a
                new ticket.
              </p>
            </div>
            <div className="space-y-3">

              <textarea
                rows={4}
                value={reply}
                onChange={(event) =>
                  setReply(event.target.value)
                }
                onKeyDown={handleKeyDown}
                disabled={
                  sending || ticket.status === "Closed"
                }
                placeholder={
                  ticket.status === "Closed"
                    ? "This ticket is closed."
                    : "Type your message here... Share any updates or clarification required."
                }
                className="w-full resize-y rounded border border-gray-300 bg-white p-3.5 text-xs leading-relaxed text-gray-800 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-100 sm:text-sm"
              />
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">

                <div className="text-[10px] text-gray-400">
                  <span className="hidden sm:inline">
                    Press Ctrl + Enter to send
                  </span>

                  <span className="sm:hidden">
                    Your reply will be added to this ticket.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSendReply}
                  disabled={
                    sending ||
                    !reply.trim() ||
                    ticket.status === "Closed"
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded bg-[#9C6A3A] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#85582e] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {sending ? (
                    <>
                      <Loader2
                        size={13}
                        className="animate-spin"
                      />

                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reply</span>

                      <Send size={13} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

  
        <div className="pb-4 text-center">
          <p className="text-[10px] text-gray-400">
            Ticket ID: {ticket._id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorTicketDetail;