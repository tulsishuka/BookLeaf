/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  ShieldCheck,
  Send,
  Loader2,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

interface Message {
  _id: string;
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

  const [reply, setReply] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load ticket"
        );
      }

      setTicket(data.ticket);
      setMessages(data.messages || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="p-8">
        <p>Ticket not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee] p-6 md:p-8">

      {/* BACK */}
      <button
        onClick={() => navigate("/author/tickets")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6"
      >
        <ArrowLeft size={17} />
        Back to My Tickets
      </button>

      {/* HEADER */}
      <div className="bg-white rounded-2xl border border-black/5 p-6 mb-6">

        <div className="flex flex-col md:flex-row md:justify-between gap-4">

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              Support Ticket
            </p>

            <h1 className="text-2xl md:text-3xl font-serif">
              {ticket.subject}
            </h1>

            <p className="text-sm text-gray-400 mt-2">
              Ticket #{ticket._id}
            </p>
          </div>

          <div className="flex items-start gap-2">

            <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs">
              {ticket.category}
            </span>

            <span className="px-3 py-1.5 bg-black text-white rounded-full text-xs">
              {ticket.status}
            </span>

          </div>

        </div>

        {/* ORIGINAL QUERY */}
        <div className="border-t border-gray-100 mt-6 pt-6">

          <p className="text-xs text-gray-400 mb-2">
            Your Query
          </p>

          <p className="text-gray-700 leading-7 whitespace-pre-wrap">
            {ticket.description}
          </p>

        </div>

      </div>

      {/* CONVERSATION */}
      <div className="bg-white rounded-2xl border border-black/5 p-6">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-9 h-9 rounded-full bg-[#e9e3d7] flex items-center justify-center">
            <ShieldCheck size={17} />
          </div>

          <div>
            <h2 className="font-semibold">
              Conversation
            </h2>

            <p className="text-xs text-gray-400">
              Messages between you and BookLeaf support
            </p>
          </div>

        </div>

        {/* MESSAGES */}
        <div className="space-y-5">

          {messages.length === 0 ? (

            <div className="text-center py-10 text-gray-400">
              No response yet. Our team will get back to you soon.
            </div>

          ) : (

            messages.map((message) => {

              const isAdmin =
                message.senderRole === "admin";

              return (
                <div
                  key={message._id}
                  className={`flex ${
                    isAdmin
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      isAdmin
                        ? "bg-[#f1eee7]"
                        : "bg-black text-white"
                    }`}
                  >

                    {/* SENDER */}
                    <div className="flex items-center gap-2 mb-2">

                      {isAdmin ? (
                        <ShieldCheck size={14} />
                      ) : (
                        <User size={14} />
                      )}

                      <span className="text-xs font-medium">
                        {isAdmin
                          ? "BookLeaf Support"
                          : "You"}
                      </span>

                    </div>

                    {/* MESSAGE */}
                    <p className="text-sm leading-6 whitespace-pre-wrap">
                      {message.message}
                    </p>

                    {/* DATE */}
                    <p
                      className={`text-[10px] mt-3 ${
                        isAdmin
                          ? "text-gray-400"
                          : "text-gray-300"
                      }`}
                    >
                      {formatDate(
                        message.createdAt
                      )}
                    </p>

                  </div>

                </div>
              );
            })

          )}

        </div>

        {/* REPLY */}
        {ticket.status !== "Closed" && (
          <div className="border-t border-gray-100 mt-8 pt-6">

            <h3 className="font-medium text-sm mb-3">
              Reply to Support
            </h3>

            <textarea
              value={reply}
              onChange={(e) =>
                setReply(e.target.value)
              }
              rows={4}
              placeholder="Write a reply..."
              className="w-full border border-gray-200 rounded-xl p-4 text-sm resize-none outline-none focus:border-black"
            />

            <div className="flex justify-end mt-3">

              <button
                disabled={
                  sending || !reply.trim()
                }
                className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-xl text-sm disabled:opacity-50"
              >
                {sending ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={15} />
                )}

                Send Reply
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default AuthorTicketDetail;