

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   User,
 
//   Calendar,
//   AlertTriangle,
//   Clock,
//   MessageSquare,
//   Sparkles,
//   Send,
//   StickyNote,
//   Loader2,
// } from "lucide-react";

// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:3000";

// // --------------------------------------------------
// // Types
// // --------------------------------------------------

// type TicketStatus =
//   | "Open"
//   | "In Progress"
//   | "Resolved"
//   | "Closed";

// type TicketPriority =
//   | "Critical"
//   | "High"
//   | "Medium"
//   | "Low";

// interface Book {
//   _id: string;
//   title: string;
//   isbn: string;
//   genre?: string;
//   publicationDate?: string;
//   status?: string;
// }

// interface AssignedAdmin {
//   _id: string;
//   name?: string;
//   email?: string;
// }

// interface Ticket {
//   _id: string;
//   authorId: string;
//   subject: string;
//   description: string;
//   category: string;
//   priority: TicketPriority;
//   status: TicketStatus;

//   bookId?: Book | null;

//   assignedTo?: AssignedAdmin | null;

//   // AI fields
//   aiCategory?: string | null;
//   aiPriority?: string | null;
//   aiDraftResponse?: string | null;

//   createdAt: string;
//   updatedAt: string;
// }

// interface Message {
//   _id: string;
//   senderId: string;
//   senderRole: "author" | "admin";
//   message: string;
//   isInternal: boolean;
//   createdAt: string;
// }

// // --------------------------------------------------
// // Component
// // --------------------------------------------------

// const TicketDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   // --------------------------------------------------
//   // State
//   // --------------------------------------------------

//   const [ticket, setTicket] = useState<Ticket | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Editable admin response
//   const [response, setResponse] = useState("");

//   // Internal note
//   const [internalNote, setInternalNote] = useState("");

//   const [sending, setSending] = useState(false);

//   // --------------------------------------------------
//   // Fetch Ticket
//   // --------------------------------------------------

//   useEffect(() => {
//     if (!id) return;

//     const fetchTicket = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const token = localStorage.getItem("token");

//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         const res = await fetch(
//           `${API_URL}/api/tickets/admin/${id}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(
//             data.message || "Failed to fetch ticket"
//           );
//         }

//         // Save ticket
//         setTicket(data.ticket);

//         // Save messages
//         setMessages(data.messages || []);

//         // --------------------------------------------------
//         // Load AI draft into editable response box
//         // --------------------------------------------------

//         if (data.ticket?.aiDraftResponse) {
//           setResponse(data.ticket.aiDraftResponse);
//         } else {
//           setResponse("");
//         }
//       } catch (err) {
//         console.error("FETCH TICKET ERROR:", err);

//         setError(
//           err instanceof Error
//             ? err.message
//             : "Something went wrong"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTicket();
//   }, [id, navigate]);

//   // --------------------------------------------------
//   // Send Admin Response
//   // --------------------------------------------------

//   const sendResponse = async () => {
//     if (!id || !response.trim()) return;

//     try {
//       setSending(true);

//       const token = localStorage.getItem("token");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       const res = await fetch(
//         `${API_URL}/api/tickets/${id}/respond`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             message: response.trim(),
//           }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           data.message || "Failed to send response"
//         );
//       }

//       // Add new message to conversation
//       setMessages((prev) => [
//         ...prev,
//         data.newMessage ||
//           data.message || {
//             _id: Date.now().toString(),
//             senderRole: "admin",
//             message: response.trim(),
//             isInternal: false,
//             createdAt: new Date().toISOString(),
//             senderId: "",
//           },
//       ]);

//       // Clear response box
//       setResponse("");

//       // Update local status
//       setTicket((prev) =>
//         prev
//           ? {
//               ...prev,
//               status: "In Progress",
//             }
//           : prev
//       );
//     } catch (err) {
//       console.error("SEND RESPONSE ERROR:", err);

//       alert(
//         err instanceof Error
//           ? err.message
//           : "Failed to send response"
//       );
//     } finally {
//       setSending(false);
//     }
//   };

//   // --------------------------------------------------
//   // Add Internal Note
//   // --------------------------------------------------

//   const addInternalNote = async () => {
//     if (!id || !internalNote.trim()) return;

//     try {
//       setSending(true);

//       const token = localStorage.getItem("token");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       const res = await fetch(
//         `${API_URL}/api/tickets/${id}/internal-note`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             message: internalNote.trim(),
//           }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           data.message || "Failed to add note"
//         );
//       }

//       setMessages((prev) => [
//         ...prev,
//         data.newMessage ||
//           data.message || {
//             _id: Date.now().toString(),
//             senderRole: "admin",
//             message: internalNote.trim(),
//             isInternal: true,
//             createdAt: new Date().toISOString(),
//             senderId: "",
//           },
//       ]);

//       setInternalNote("");
//     } catch (err) {
//       console.error("INTERNAL NOTE ERROR:", err);

//       alert(
//         err instanceof Error
//           ? err.message
//           : "Failed to add internal note"
//       );
//     } finally {
//       setSending(false);
//     }
//   };

//   // --------------------------------------------------
//   // Update Ticket
//   // --------------------------------------------------

//   const updateTicket = async (
//     field: "status" | "priority" | "category",
//     value: string
//   ) => {
//     if (!id) return;

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       const res = await fetch(
//         `${API_URL}/api/tickets/${id}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             [field]: value,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           data.message || "Failed to update ticket"
//         );
//       }

//       setTicket(data.ticket || data);
//     } catch (err) {
//       console.error("UPDATE TICKET ERROR:", err);

//       alert(
//         err instanceof Error
//           ? err.message
//           : "Failed to update ticket"
//       );
//     }
//   };

//   // --------------------------------------------------
//   // Format Date
//   // --------------------------------------------------

//   const formatDate = (date?: string) => {
//     if (!date) return "—";

//     return new Date(date).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // --------------------------------------------------
//   // Priority Styling
//   // --------------------------------------------------

//   const getPriorityClass = (priority?: string) => {
//     switch (priority) {
//       case "Critical":
//         return "bg-red-100 text-red-700 border-red-200";

//       case "High":
//         return "bg-orange-100 text-orange-700 border-orange-200";

//       case "Medium":
//         return "bg-yellow-100 text-yellow-700 border-yellow-200";

//       case "Low":
//         return "bg-green-100 text-green-700 border-green-200";

//       default:
//         return "bg-gray-100 text-gray-700 border-gray-200";
//     }
//   };

//   // --------------------------------------------------
//   // Status Styling
//   // --------------------------------------------------

//   const getStatusClass = (status?: string) => {
//     switch (status) {
//       case "Open":
//         return "bg-blue-100 text-blue-700";

//       case "In Progress":
//         return "bg-purple-100 text-purple-700";

//       case "Resolved":
//         return "bg-green-100 text-green-700";

//       case "Closed":
//         return "bg-gray-200 text-gray-700";

//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   // --------------------------------------------------
//   // Loading
//   // --------------------------------------------------

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f7f4ee] flex items-center justify-center">
//         <div className="flex items-center gap-3 text-gray-600">
//           <Loader2 className="w-5 h-5 animate-spin" />

//           Loading ticket details...
//         </div>
//       </div>
//     );
//   }

//   // --------------------------------------------------
//   // Error
//   // --------------------------------------------------

//   if (error || !ticket) {
//     return (
//       <div className="min-h-screen bg-[#f7f4ee] p-8">
//         <button
//           onClick={() => navigate("/admin/tickets")}
//           className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-8"
//         >
//           <ArrowLeft size={17} />

//           Back to Ticket Queue
//         </button>

//         <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">
//           <AlertTriangle className="mx-auto mb-3 text-red-500" />

//           <h2 className="text-xl font-semibold">
//             Unable to load ticket
//           </h2>

//           <p className="text-gray-500 mt-2">
//             {error || "Ticket not found"}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // --------------------------------------------------
//   // Main UI
//   // --------------------------------------------------

//   return (
//     <div className="min-h-screen bg-[#f7f4ee] p-6 md:p-8">
//       {/* ================================================= */}
//       {/* HEADER */}
//       {/* ================================================= */}

//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//         <div>
//           <button
//             onClick={() => navigate("/admin/tickets")}
//             className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-4 transition"
//           >
//             <ArrowLeft size={17} />

//             Back to Ticket Queue
//           </button>

//           <div className="flex items-center gap-3">
//             <h1 className="text-3xl font-serif text-gray-900">
//               Ticket Details
//             </h1>

//             <span
//               className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
//                 ticket.status
//               )}`}
//             >
//               {ticket.status}
//             </span>
//           </div>

//           <p className="text-sm text-gray-500 mt-2">
//             Ticket #{ticket._id}
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <span
//             className={`px-4 py-2 rounded-full border text-sm font-medium ${getPriorityClass(
//               ticket.priority
//             )}`}
//           >
//             <span className="inline-flex items-center gap-2">
//               <AlertTriangle size={15} />

//               {ticket.priority} Priority
//             </span>
//           </span>
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* MAIN GRID */}
//       {/* ================================================= */}

//       <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr_320px] gap-6">
       

//         {/* ================================================= */}
//         {/* CENTER */}
//         {/* ================================================= */}

//         <main className="space-y-6">
//           {/* SUPPORT QUERY */}

//           <section className="bg-white border border-black/5 rounded-2xl p-6">
//             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
//               <div>
//                 <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
//                   Support Query
//                 </p>

//                 <h2 className="text-2xl font-serif text-gray-900">
//                   {ticket.subject}
//                 </h2>
//               </div>

//               <div className="flex gap-2 flex-wrap">
//                 <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs">
//                   {ticket.category}
//                 </span>
//               </div>
//             </div>

//             <div className="border-t border-gray-100 pt-6">
//               <p className="text-xs text-gray-400 mb-2">
//                 Author's Query
//               </p>

//               <p className="text-gray-700 leading-7 whitespace-pre-wrap">
//                 {ticket.description}
//               </p>
//             </div>

//             <div className="border-t border-gray-100 mt-6 pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div className="flex gap-3">
//                 <Calendar
//                   size={17}
//                   className="text-gray-400"
//                 />

//                 <div>
//                   <p className="text-xs text-gray-400">
//                     Created
//                   </p>

//                   <p className="text-sm mt-1">
//                     {formatDate(ticket.createdAt)}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <Clock
//                   size={17}
//                   className="text-gray-400"
//                 />

//                 <div>
//                   <p className="text-xs text-gray-400">
//                     Last Updated
//                   </p>

//                   <p className="text-sm mt-1">
//                     {formatDate(ticket.updatedAt)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* ================================================= */}
//           {/* CONVERSATION */}
//           {/* ================================================= */}

//           <section className="bg-white border border-black/5 rounded-2xl p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <MessageSquare size={20} />

//               <h2 className="font-semibold">
//                 Conversation
//               </h2>

//               <span className="text-xs text-gray-400">
//                 {
//                   messages.filter(
//                     (message) => !message.isInternal
//                   ).length
//                 }{" "}
//                 messages
//               </span>
//             </div>

//             <div className="space-y-5">
//               {messages.length === 0 ? (
//                 <div className="text-center py-10 text-gray-400">
//                   No messages yet.
//                 </div>
//               ) : (
//                 messages.map((message) => (
//                   <div
//                     key={message._id}
//                     className={
//                       message.isInternal
//                         ? "bg-amber-50 border border-amber-200 rounded-xl p-4"
//                         : message.senderRole === "admin"
//                         ? "ml-8 bg-[#f1eee7] rounded-2xl p-5"
//                         : "mr-8 bg-gray-50 border border-gray-100 rounded-2xl p-5"
//                     }
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center gap-2">
//                         {message.isInternal ? (
//                           <StickyNote
//                             size={15}
//                             className="text-amber-600"
//                           />
//                         ) : message.senderRole ===
//                           "admin" ? (
//                           <Sparkles
//                             size={15}
//                             className="text-gray-600"
//                           />
//                         ) : (
//                           <User
//                             size={15}
//                             className="text-gray-500"
//                           />
//                         )}

//                         <span className="text-sm font-medium">
//                           {message.isInternal
//                             ? "Internal Note"
//                             : message.senderRole ===
//                               "admin"
//                             ? "Admin"
//                             : "Author"}
//                         </span>
//                       </div>

//                       <span className="text-xs text-gray-400">
//                         {formatDate(message.createdAt)}
//                       </span>
//                     </div>

//                     <p className="text-sm text-gray-700 leading-6 whitespace-pre-wrap">
//                       {message.message}
//                     </p>
//                   </div>
//                 ))
//               )}
//             </div>
//           </section>

//           {/* ================================================= */}
//           {/* ADMIN RESPONSE */}
//           {/* ================================================= */}

//           <section className="bg-white border border-black/5 rounded-2xl p-6">
//             <div className="flex items-start justify-between gap-4 mb-5">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-xl bg-[#171717] text-white flex items-center justify-center">
//                   <Sparkles size={18} />
//                 </div>

//                 <div>
//                   <h2 className="font-semibold text-gray-900">
//                     Respond to Author
//                   </h2>

//                   <p className="text-xs text-gray-400 mt-1">
//                     Review and edit the AI-generated response
//                     before sending.
//                   </p>
//                 </div>
//               </div>

//               {ticket.aiDraftResponse && (
//                 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-xs font-medium">
//                   <Sparkles size={13} />

//                   AI Draft
//                 </span>
//               )}
//             </div>

//             {/* AI DRAFT NOTICE */}

//             {ticket.aiDraftResponse && (
//               <div className="mb-4 rounded-xl bg-[#f7f4ee] border border-[#e5dfd2] p-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Sparkles
//                     size={15}
//                     className="text-purple-600"
//                   />

//                   <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
//                     AI-generated draft
//                   </span>
//                 </div>

//                 <p className="text-xs text-gray-500 leading-5">
//                   Gemini generated this response based on the
//                   author's support query. Please review the
//                   response before sending it to the author.
//                 </p>
//               </div>
//             )}

//             {/* RESPONSE TEXTAREA */}

//             <textarea
//               value={response}
//               onChange={(e) =>
//                 setResponse(e.target.value)
//               }
//               placeholder="Write your response to the author..."
//               rows={8}
//               className="w-full border border-gray-200 rounded-xl p-4 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black/10 resize-none"
//             />

//             {/* RESPONSE ACTIONS */}

//             <div className="flex items-center justify-between mt-4">
//               <p className="text-xs text-gray-400">
//                 {response.length} characters
//               </p>

//               <button
//                 onClick={sendResponse}
//                 disabled={
//                   sending || !response.trim()
//                 }
//                 className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-xl text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
//               >
//                 {sending ? (
//                   <Loader2
//                     size={16}
//                     className="animate-spin"
//                   />
//                 ) : (
//                   <Send size={16} />
//                 )}

//                 {sending
//                   ? "Sending..."
//                   : "Send Response"}
//               </button>
//             </div>
//           </section>
//         </main>

//         {/* ================================================= */}
//         {/* RIGHT SIDEBAR */}
//         {/* ================================================= */}

//         <aside className="space-y-6">
//           {/* ================================================= */}
//           {/* TICKET CONTROLS */}
//           {/* ================================================= */}

//           <section className="bg-white border border-black/5 rounded-2xl p-6">
//             <h2 className="font-semibold mb-5">
//               Ticket Controls
//             </h2>

//             <div className="space-y-5">
//               {/* STATUS */}

//               <div>
//                 <label className="text-xs text-gray-400 block mb-2">
//                   Status
//                 </label>

//                 <select
//                   value={ticket.status}
//                   onChange={(e) =>
//                     updateTicket(
//                       "status",
//                       e.target.value
//                     )
//                   }
//                   className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm bg-white outline-none"
//                 >
//                   <option value="Open">
//                     Open
//                   </option>

//                   <option value="In Progress">
//                     In Progress
//                   </option>

//                   <option value="Resolved">
//                     Resolved
//                   </option>

//                   <option value="Closed">
//                     Closed
//                   </option>
//                 </select>
//               </div>

//               {/* PRIORITY */}

//               <div>
//                 <label className="text-xs text-gray-400 block mb-2">
//                   Priority
//                 </label>

//                 <select
//                   value={ticket.priority}
//                   onChange={(e) =>
//                     updateTicket(
//                       "priority",
//                       e.target.value
//                     )
//                   }
//                   className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm bg-white outline-none"
//                 >
//                   <option value="Critical">
//                     Critical
//                   </option>

//                   <option value="High">
//                     High
//                   </option>

//                   <option value="Medium">
//                     Medium
//                   </option>

//                   <option value="Low">
//                     Low
//                   </option>
//                 </select>
//               </div>

//               {/* CATEGORY */}

//               <div>
//                 <label className="text-xs text-gray-400 block mb-2">
//                   Category
//                 </label>

//                 <select
//                   value={ticket.category}
//                   onChange={(e) =>
//                     updateTicket(
//                       "category",
//                       e.target.value
//                     )
//                   }
//                   className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm bg-white outline-none"
//                 >
//                   <option value="Royalty & Payments">
//                     Royalty & Payments
//                   </option>

//                   <option value="ISBN & Metadata Issues">
//                     ISBN & Metadata Issues
//                   </option>

//                   <option value="Printing & Quality">
//                     Printing & Quality
//                   </option>

//                   <option value="Distribution & Availability">
//                     Distribution & Availability
//                   </option>

//                   <option value="Book Status & Production Updates">
//                     Book Status & Production Updates
//                   </option>

//                   <option value="General Inquiry">
//                     General Inquiry
//                   </option>
//                 </select>
//               </div>
//             </div>
//           </section>

//           {/* ================================================= */}
//           {/* AI ANALYSIS */}
//           {/* ================================================= */}

//           <section className="bg-[#171717] text-white rounded-2xl p-6">
//             <div className="flex items-center gap-3 mb-5">
//               <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
//                 <Sparkles size={18} />
//               </div>

//               <div>
//                 <h2 className="font-semibold">
//                   AI Analysis
//                 </h2>

//                 <p className="text-xs text-gray-500 mt-0.5">
//                   Generated when ticket was created
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-5">
//               {/* AI CATEGORY */}

//               <div>
//                 <p className="text-xs text-gray-400">
//                   AI Category
//                 </p>

//                 <div className="mt-2">
//                   {ticket.aiCategory ? (
//                     <span className="inline-flex px-3 py-1.5 rounded-full bg-white/10 text-sm">
//                       {ticket.aiCategory}
//                     </span>
//                   ) : (
//                     <p className="text-sm text-gray-500">
//                       Not classified
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* AI PRIORITY */}

//               <div>
//                 <p className="text-xs text-gray-400">
//                   AI Priority
//                 </p>

//                 <div className="mt-2">
//                   {ticket.aiPriority ? (
//                     <span
//                       className={`inline-flex px-3 py-1.5 rounded-full border text-xs font-medium ${getPriorityClass(
//                         ticket.aiPriority
//                       )}`}
//                     >
//                       {ticket.aiPriority}
//                     </span>
//                   ) : (
//                     <p className="text-sm text-gray-500">
//                       Not classified
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* AI DRAFT */}

//               <div>
//                 <div className="flex items-center justify-between">
//                   <p className="text-xs text-gray-400">
//                     AI Draft Response
//                   </p>

//                   {ticket.aiDraftResponse && (
//                     <Sparkles
//                       size={14}
//                       className="text-purple-400"
//                     />
//                   )}
//                 </div>

//                 {ticket.aiDraftResponse ? (
//                   <div className="mt-2 bg-white/5 border border-white/10 rounded-xl p-4">
//                     <p className="text-sm text-gray-300 leading-6 whitespace-pre-wrap">
//                       {ticket.aiDraftResponse}
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-500 mt-2">
//                     No AI draft available.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* ================================================= */}
//           {/* INTERNAL NOTE */}
//           {/* ================================================= */}

//           <section className="bg-white border border-black/5 rounded-2xl p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
//                 <StickyNote
//                   size={18}
//                   className="text-amber-600"
//                 />
//               </div>

//               <div>
//                 <h2 className="font-semibold">
//                   Internal Note
//                 </h2>

//                 <p className="text-xs text-gray-400 mt-1">
//                   Only admins can see this.
//                 </p>
//               </div>
//             </div>

//             <textarea
//               value={internalNote}
//               onChange={(e) =>
//                 setInternalNote(e.target.value)
//               }
//               placeholder="Add a private note..."
//               rows={5}
//               className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-black resize-none"
//             />

//             <button
//               onClick={addInternalNote}
//               disabled={
//                 sending || !internalNote.trim()
//               }
//               className="w-full mt-3 px-4 py-3 border border-black rounded-xl text-sm hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Add Internal Note
//             </button>
//           </section>

         
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default TicketDetail;





import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
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

// --------------------------------------------------
// Types
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

// --------------------------------------------------
// Component
// --------------------------------------------------

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

  // --------------------------------------------------
  // Fetch Ticket
  // --------------------------------------------------

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

        if (data.ticket?.aiDraftResponse) {
          setResponse(data.ticket.aiDraftResponse);
        } else {
          setResponse("");
        }
      } catch (err) {
        console.error("FETCH TICKET ERROR:", err);

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

  // --------------------------------------------------
  // Send Admin Response
  // --------------------------------------------------

  const sendResponse = async () => {
    if (!id || !response.trim()) return;

    try {
      setSending(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(
        `${API_URL}/api/tickets/${id}/respond`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: response.trim(),
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
        data.newMessage ||
          data.message || {
            _id: Date.now().toString(),
            senderRole: "admin",
            message: response.trim(),
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
      console.error("SEND RESPONSE ERROR:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Failed to send response"
      );
    } finally {
      setSending(false);
    }
  };

  // --------------------------------------------------
  // Add Internal Note
  // --------------------------------------------------

  const addInternalNote = async () => {
    if (!id || !internalNote.trim()) return;

    try {
      setSending(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(
        `${API_URL}/api/tickets/${id}/internal-note`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: internalNote.trim(),
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
        data.newMessage ||
          data.message || {
            _id: Date.now().toString(),
            senderRole: "admin",
            message: internalNote.trim(),
            isInternal: true,
            createdAt: new Date().toISOString(),
            senderId: "",
          },
      ]);

      setInternalNote("");
    } catch (err) {
      console.error("INTERNAL NOTE ERROR:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Failed to add internal note"
      );
    } finally {
      setSending(false);
    }
  };

  // --------------------------------------------------
  // Update Ticket
  // --------------------------------------------------

  const updateTicket = async (
    field: "status" | "priority" | "category",
    value: string
  ) => {
    if (!id) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

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
      console.error("UPDATE TICKET ERROR:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Failed to update ticket"
      );
    }
  };

  // --------------------------------------------------
  // Format Date
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Priority Styling
  // --------------------------------------------------

  const getPriorityClass = (priority?: string) => {
    switch (priority) {
      case "Critical":
        return "bg-[#fff0ef] text-[#b42318] border-[#f5c7c3]";

      case "High":
        return "bg-[#fff4e8] text-[#b54708] border-[#f5d6ae]";

      case "Medium":
        return "bg-[#fff9df] text-[#946200] border-[#eadca7]";

      case "Low":
        return "bg-[#eef8f0] text-[#26734d] border-[#c9e4d1]";

      default:
        return "bg-[#f3f1ec] text-[#55524b] border-[#dedbd3]";
    }
  };

  // --------------------------------------------------
  // Status Styling
  // --------------------------------------------------

  const getStatusClass = (status?: string) => {
    switch (status) {
      case "Open":
        return "bg-[#eef5ff] text-[#315f9d] border border-[#d5e4f8]";

      case "In Progress":
        return "bg-[#f4efff] text-[#7045a5] border border-[#e3d7f7]";

      case "Resolved":
        return "bg-[#eef8f0] text-[#26734d] border border-[#c9e4d1]";

      case "Closed":
        return "bg-[#f1f0ed] text-[#5e5b55] border border-[#dedbd3]";

      default:
        return "bg-[#f3f1ec] text-[#55524b] border border-[#dedbd3]";
    }
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f4ee] flex items-center justify-center px-5">
        <div className="flex items-center gap-3 rounded-2xl border border-[#e5dfd2] bg-white px-6 py-4 shadow-sm">
          <Loader2 className="w-5 h-5 animate-spin text-[#171717]" />

          <span className="text-sm text-[#68645d]">
            Loading ticket details...
          </span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-[#f7f4ee] p-5 sm:p-8">
        <button
          onClick={() => navigate("/admin/tickets")}
          className="group flex items-center gap-2 text-sm text-[#6d6962] hover:text-[#171717] mb-8 transition-colors"
        >
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />

          Back to Ticket Queue
        </button>

        <div className="max-w-2xl mx-auto bg-white border border-[#ead1ce] rounded-[24px] p-8 sm:p-12 text-center shadow-sm">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#fff0ef] flex items-center justify-center">
            <AlertTriangle
              size={24}
              className="text-[#b42318]"
            />
          </div>

          <h2 className="text-xl font-serif text-[#171717]">
            Unable to load ticket
          </h2>

          <p className="text-sm text-[#77736b] mt-2">
            {error || "Ticket not found"}
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Main UI
  // --------------------------------------------------

  return (
    // <div className="min-h-screen bg-[#f7f4ee] px-4 py-5 sm:px-6 md:px-8 lg:px-10">
    //   <div className="max-w-[1500px] mx-auto">

    //     {/* ================================================= */}
    //     {/* HEADER */}
    //     {/* ================================================= */}

    //     <div className="mb-8">
    //       <button
    //         onClick={() => navigate("/admin/tickets")}
    //         className="group flex items-center gap-2 text-sm text-[#77736b] hover:text-[#171717] mb-5 transition-colors"
    //       >
    //         <ArrowLeft
    //           size={17}
    //           className="transition-transform group-hover:-translate-x-1"
    //         />

    //         Back to Ticket Queue
    //       </button>

    //       <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
    //         <div>
    //           <div className="flex flex-wrap items-center gap-3 mb-2">
    //             <h1 className="text-3xl sm:text-4xl font-serif tracking-[-0.02em] text-[#171717]">
    //               Ticket Details
    //             </h1>

    //             <span
    //               className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClass(
    //                 ticket.status
    //               )}`}
    //             >
    //               {ticket.status}
    //             </span>
    //           </div>

    //           <p className="text-sm text-[#8a857c]">
    //             Ticket #{ticket._id}
    //           </p>
    //         </div>

    //         <span
    //           className={`w-fit px-4 py-2.5 rounded-full border text-sm font-semibold shadow-sm ${getPriorityClass(
    //             ticket.priority
    //           )}`}
    //         >
    //           <span className="inline-flex items-center gap-2">
    //             <AlertTriangle size={15} />
    //             {ticket.priority} Priority
    //           </span>
    //         </span>
    //       </div>
    //     </div>

    //     {/* ================================================= */}
    //     {/* MAIN GRID */}
    //     {/* ================================================= */}

    //     <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">

    //       {/* ================================================= */}
    //       {/* CENTER */}
    //       {/* ================================================= */}

    //       <main className="space-y-6 min-w-0">

    //         {/* SUPPORT QUERY */}

    //         <section className="bg-white border border-[#e5dfd2] rounded-[24px] p-5 sm:p-7 shadow-[0_8px_30px_rgba(23,23,23,0.03)]">
    //           <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-7">
    //             <div className="min-w-0">
    //               <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#a09a90] mb-2">
    //                 Support Query
    //               </p>

    //               <h2 className="text-2xl sm:text-3xl font-serif leading-tight text-[#171717] break-words">
    //                 {ticket.subject}
    //               </h2>
    //             </div>

    //             <div className="flex gap-2 flex-wrap shrink-0">
    //               <span className="px-3 py-1.5 bg-[#f1eee7] border border-[#e5dfd2] rounded-full text-xs text-[#5f5b54]">
    //                 {ticket.category}
    //               </span>
    //             </div>
    //           </div>

    //           <div className="border-t border-[#eeeae2] pt-6">
    //             <p className="text-[11px] uppercase tracking-[0.12em] text-[#a09a90] mb-3">
    //               Author's Query
    //             </p>

    //             <div className="rounded-2xl bg-[#faf9f6] border border-[#eeeae2] p-5 sm:p-6">
    //               <p className="text-[14px] sm:text-[15px] text-[#4e4b46] leading-7 whitespace-pre-wrap">
    //                 {ticket.description}
    //               </p>
    //             </div>
    //           </div>

    //           <div className="border-t border-[#eeeae2] mt-6 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
    //             <div className="flex items-center gap-3 rounded-xl bg-[#faf9f6] border border-[#eeeae2] p-4">
    //               <div className="w-9 h-9 rounded-lg bg-[#f1eee7] flex items-center justify-center shrink-0">
    //                 <Calendar
    //                   size={16}
    //                   className="text-[#77736b]"
    //                 />
    //               </div>

    //               <div className="min-w-0">
    //                 <p className="text-[10px] uppercase tracking-wider text-[#aaa49a]">
    //                   Created
    //                 </p>

    //                 <p className="text-sm text-[#37342f] mt-1 truncate">
    //                   {formatDate(ticket.createdAt)}
    //                 </p>
    //               </div>
    //             </div>

    //             <div className="flex items-center gap-3 rounded-xl bg-[#faf9f6] border border-[#eeeae2] p-4">
    //               <div className="w-9 h-9 rounded-lg bg-[#f1eee7] flex items-center justify-center shrink-0">
    //                 <Clock
    //                   size={16}
    //                   className="text-[#77736b]"
    //                 />
    //               </div>

    //               <div className="min-w-0">
    //                 <p className="text-[10px] uppercase tracking-wider text-[#aaa49a]">
    //                   Last Updated
    //                 </p>

    //                 <p className="text-sm text-[#37342f] mt-1 truncate">
    //                   {formatDate(ticket.updatedAt)}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </section>

    //         {/* CONVERSATION */}

    //         <section className="bg-white border border-[#e5dfd2] rounded-[24px] p-5 sm:p-7 shadow-[0_8px_30px_rgba(23,23,23,0.03)]">
    //           <div className="flex items-center justify-between gap-4 mb-7">
    //             <div className="flex items-center gap-3">
    //               <div className="w-10 h-10 rounded-xl bg-[#171717] text-white flex items-center justify-center">
    //                 <MessageSquare size={18} />
    //               </div>

    //               <div>
    //                 <h2 className="font-semibold text-[#171717]">
    //                   Conversation
    //                 </h2>

    //                 <p className="text-xs text-[#9b968d] mt-0.5">
    //                   {
    //                     messages.filter(
    //                       (message) => !message.isInternal
    //                     ).length
    //                   }{" "}
    //                   messages
    //                 </p>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="space-y-4">
    //             {messages.length === 0 ? (
    //               <div className="text-center py-12 rounded-2xl border border-dashed border-[#ded9cf] bg-[#faf9f6] text-[#9b968d]">
    //                 <MessageSquare
    //                   size={22}
    //                   className="mx-auto mb-2 opacity-50"
    //                 />
    //                 <p className="text-sm">
    //                   No messages yet.
    //                 </p>
    //               </div>
    //             ) : (
    //               messages.map((message) => (
    //                 <div
    //                   key={message._id}
    //                   className={
    //                     message.isInternal
    //                       ? "bg-[#fff9e9] border border-[#eadca7] rounded-2xl p-4 sm:p-5"
    //                       : message.senderRole === "admin"
    //                       ? "ml-0 sm:ml-10 bg-[#f1eee7] border border-[#e5dfd2] rounded-2xl p-4 sm:p-5"
    //                       : "mr-0 sm:mr-10 bg-[#faf9f6] border border-[#eeeae2] rounded-2xl p-4 sm:p-5"
    //                   }
    //                 >
    //                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
    //                     <div className="flex items-center gap-2">
    //                       <div
    //                         className={`w-7 h-7 rounded-lg flex items-center justify-center ${
    //                           message.isInternal
    //                             ? "bg-[#fff0bd]"
    //                             : message.senderRole === "admin"
    //                             ? "bg-[#171717] text-white"
    //                             : "bg-white border border-[#e5dfd2]"
    //                         }`}
    //                       >
    //                         {message.isInternal ? (
    //                           <StickyNote
    //                             size={14}
    //                             className="text-[#946200]"
    //                           />
    //                         ) : message.senderRole ===
    //                           "admin" ? (
    //                           <Sparkles size={14} />
    //                         ) : (
    //                           <User
    //                             size={14}
    //                             className="text-[#77736b]"
    //                           />
    //                         )}
    //                       </div>

    //                       <span className="text-sm font-semibold text-[#37342f]">
    //                         {message.isInternal
    //                           ? "Internal Note"
    //                           : message.senderRole ===
    //                             "admin"
    //                           ? "Admin"
    //                           : "Author"}
    //                       </span>
    //                     </div>

    //                     <span className="text-[11px] text-[#aaa49a]">
    //                       {formatDate(message.createdAt)}
    //                     </span>
    //                   </div>

    //                   <p className="text-sm text-[#55514a] leading-6 whitespace-pre-wrap">
    //                     {message.message}
    //                   </p>
    //                 </div>
    //               ))
    //             )}
    //           </div>
    //         </section>

    //         {/* ADMIN RESPONSE */}

    //         <section className="bg-white border border-[#e5dfd2] rounded-[24px] p-5 sm:p-7 shadow-[0_8px_30px_rgba(23,23,23,0.03)]">
    //           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
    //             <div className="flex items-center gap-3">
    //               <div className="w-11 h-11 rounded-xl bg-[#171717] text-white flex items-center justify-center shadow-sm">
    //                 <Sparkles size={18} />
    //               </div>

    //               <div>
    //                 <h2 className="font-semibold text-[#171717]">
    //                   Respond to Author
    //                 </h2>

    //                 <p className="text-xs text-[#918c83] mt-1">
    //                   Review and edit the AI-generated response
    //                   before sending.
    //                 </p>
    //               </div>
    //             </div>

    //             {ticket.aiDraftResponse && (
    //               <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5f0ff] text-[#7045a5] border border-[#e4d8f7] text-xs font-semibold">
    //                 <Sparkles size={13} />
    //                 AI Draft
    //               </span>
    //             )}
    //           </div>

    //           {ticket.aiDraftResponse && (
    //             <div className="mb-5 rounded-2xl bg-[#f7f4ee] border border-[#e5dfd2] p-4 sm:p-5">
    //               <div className="flex items-center gap-2 mb-2">
    //                 <div className="w-7 h-7 rounded-lg bg-[#eee4ff] flex items-center justify-center">
    //                   <Sparkles
    //                     size={14}
    //                     className="text-[#7045a5]"
    //                   />
    //                 </div>

    //                 <span className="text-xs font-semibold text-[#504b44] uppercase tracking-wide">
    //                   AI-generated draft
    //                 </span>
    //               </div>

    //               <p className="text-xs text-[#77736b] leading-5">
    //                 Gemini generated this response based on the
    //                 author's support query. Please review the
    //                 response before sending it to the author.
    //               </p>
    //             </div>
    //           )}

    //           <textarea
    //             value={response}
    //             onChange={(e) =>
    //               setResponse(e.target.value)
    //             }
    //             placeholder="Write your response to the author..."
    //             rows={8}
    //             className="w-full border border-[#ddd8ce] bg-[#fcfbf9] rounded-2xl p-4 sm:p-5 text-sm text-[#37342f] placeholder:text-[#aaa49a] outline-none focus:border-[#171717] focus:ring-4 focus:ring-black/[0.04] resize-none transition"
    //           />

    //           <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
    //             <p className="text-xs text-[#aaa49a]">
    //               {response.length} characters
    //             </p>

    //             <button
    //               onClick={sendResponse}
    //               disabled={
    //                 sending || !response.trim()
    //               }
    //               className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#171717] text-white rounded-xl text-sm font-medium hover:bg-[#2c2c2c] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
    //             >
    //               {sending ? (
    //                 <Loader2
    //                   size={16}
    //                   className="animate-spin"
    //                 />
    //               ) : (
    //                 <Send size={16} />
    //               )}

    //               {sending
    //                 ? "Sending..."
    //                 : "Send Response"}
    //             </button>
    //           </div>
    //         </section>
    //       </main>

    //       {/* ================================================= */}
    //       {/* RIGHT SIDEBAR */}
    //       {/* ================================================= */}

    //       <aside className="space-y-6">

    //         {/* TICKET CONTROLS */}

    //         <section className="bg-white border border-[#e5dfd2] rounded-[24px] p-5 sm:p-6 shadow-[0_8px_30px_rgba(23,23,23,0.03)]">
    //           <div className="flex items-center gap-3 mb-6">
    //             <div className="w-9 h-9 rounded-xl bg-[#f1eee7] flex items-center justify-center">
    //               <AlertTriangle
    //                 size={17}
    //                 className="text-[#55514a]"
    //               />
    //             </div>

    //             <div>
    //               <h2 className="font-semibold text-[#171717]">
    //                 Ticket Controls
    //               </h2>

    //               <p className="text-xs text-[#9b968d] mt-0.5">
    //                 Manage ticket details
    //               </p>
    //             </div>
    //           </div>

    //           <div className="space-y-5">

    //             {/* STATUS */}

    //             <div>
    //               <label className="text-[11px] uppercase tracking-wider text-[#9b968d] block mb-2">
    //                 Status
    //               </label>

    //               <select
    //                 value={ticket.status}
    //                 onChange={(e) =>
    //                   updateTicket(
    //                     "status",
    //                     e.target.value
    //                   )
    //                 }
    //                 className="w-full border border-[#ddd8ce] bg-[#fcfbf9] rounded-xl px-3.5 py-3 text-sm text-[#37342f] outline-none focus:border-[#171717] focus:ring-4 focus:ring-black/[0.04] transition cursor-pointer"
    //               >
    //                 <option value="Open">
    //                   Open
    //                 </option>

    //                 <option value="In Progress">
    //                   In Progress
    //                 </option>

    //                 <option value="Resolved">
    //                   Resolved
    //                 </option>

    //                 <option value="Closed">
    //                   Closed
    //                 </option>
    //               </select>
    //             </div>

    //             {/* PRIORITY */}

    //             <div>
    //               <label className="text-[11px] uppercase tracking-wider text-[#9b968d] block mb-2">
    //                 Priority
    //               </label>

    //               <select
    //                 value={ticket.priority}
    //                 onChange={(e) =>
    //                   updateTicket(
    //                     "priority",
    //                     e.target.value
    //                   )
    //                 }
    //                 className="w-full border border-[#ddd8ce] bg-[#fcfbf9] rounded-xl px-3.5 py-3 text-sm text-[#37342f] outline-none focus:border-[#171717] focus:ring-4 focus:ring-black/[0.04] transition cursor-pointer"
    //               >
    //                 <option value="Critical">
    //                   Critical
    //                 </option>

    //                 <option value="High">
    //                   High
    //                 </option>

    //                 <option value="Medium">
    //                   Medium
    //                 </option>

    //                 <option value="Low">
    //                   Low
    //                 </option>
    //               </select>
    //             </div>

    //             {/* CATEGORY */}

    //             <div>
    //               <label className="text-[11px] uppercase tracking-wider text-[#9b968d] block mb-2">
    //                 Category
    //               </label>

    //               <select
    //                 value={ticket.category}
    //                 onChange={(e) =>
    //                   updateTicket(
    //                     "category",
    //                     e.target.value
    //                   )
    //                 }
    //                 className="w-full border border-[#ddd8ce] bg-[#fcfbf9] rounded-xl px-3.5 py-3 text-sm text-[#37342f] outline-none focus:border-[#171717] focus:ring-4 focus:ring-black/[0.04] transition cursor-pointer"
    //               >
    //                 <option value="Royalty & Payments">
    //                   Royalty & Payments
    //                 </option>

    //                 <option value="ISBN & Metadata Issues">
    //                   ISBN & Metadata Issues
    //                 </option>

    //                 <option value="Printing & Quality">
    //                   Printing & Quality
    //                 </option>

    //                 <option value="Distribution & Availability">
    //                   Distribution & Availability
    //                 </option>

    //                 <option value="Book Status & Production Updates">
    //                   Book Status & Production Updates
    //                 </option>

    //                 <option value="General Inquiry">
    //                   General Inquiry
    //                 </option>
    //               </select>
    //             </div>
    //           </div>
    //         </section>

    //         {/* AI ANALYSIS */}

    //         <section className="bg-[#171717] text-white rounded-[24px] p-5 sm:p-6 shadow-[0_12px_35px_rgba(23,23,23,0.12)] overflow-hidden">
    //           <div className="flex items-center gap-3 mb-6">
    //             <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center">
    //               <Sparkles size={18} />
    //             </div>

    //             <div>
    //               <h2 className="font-semibold">
    //                 AI Analysis
    //               </h2>

    //               <p className="text-xs text-white/40 mt-0.5">
    //                 Generated when ticket was created
    //               </p>
    //             </div>
    //           </div>

    //           <div className="space-y-5">

    //             {/* AI CATEGORY */}

    //             <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-4">
    //               <p className="text-[10px] uppercase tracking-wider text-white/40">
    //                 AI Category
    //               </p>

    //               <div className="mt-2">
    //                 {ticket.aiCategory ? (
    //                   <span className="inline-flex px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.08] text-sm text-white/85">
    //                     {ticket.aiCategory}
    //                   </span>
    //                 ) : (
    //                   <p className="text-sm text-white/35">
    //                     Not classified
    //                   </p>
    //                 )}
    //               </div>
    //             </div>

    //             {/* AI PRIORITY */}

    //             <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-4">
    //               <p className="text-[10px] uppercase tracking-wider text-white/40">
    //                 AI Priority
    //               </p>

    //               <div className="mt-2">
    //                 {ticket.aiPriority ? (
    //                   <span
    //                     className={`inline-flex px-3 py-1.5 rounded-full border text-xs font-medium ${getPriorityClass(
    //                       ticket.aiPriority
    //                     )}`}
    //                   >
    //                     {ticket.aiPriority}
    //                   </span>
    //                 ) : (
    //                   <p className="text-sm text-white/35">
    //                     Not classified
    //                   </p>
    //                 )}
    //               </div>
    //             </div>

    //             {/* AI DRAFT */}

    //             <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-4">
    //               <div className="flex items-center justify-between">
    //                 <p className="text-[10px] uppercase tracking-wider text-white/40">
    //                   AI Draft Response
    //                 </p>

    //                 {ticket.aiDraftResponse && (
    //                   <Sparkles
    //                     size={14}
    //                     className="text-[#b58cf5]"
    //                   />
    //                 )}
    //               </div>

    //               {ticket.aiDraftResponse ? (
    //                 <div className="mt-3 bg-black/20 border border-white/[0.08] rounded-xl p-4">
    //                   <p className="text-sm text-white/65 leading-6 whitespace-pre-wrap">
    //                     {ticket.aiDraftResponse}
    //                   </p>
    //                 </div>
    //               ) : (
    //                 <p className="text-sm text-white/35 mt-2">
    //                   No AI draft available.
    //                 </p>
    //               )}
    //             </div>
    //           </div>
    //         </section>

    //         {/* INTERNAL NOTE */}

    //         <section className="bg-white border border-[#e5dfd2] rounded-[24px] p-5 sm:p-6 shadow-[0_8px_30px_rgba(23,23,23,0.03)]">
    //           <div className="flex items-center gap-3 mb-5">
    //             <div className="w-10 h-10 rounded-xl bg-[#fff7dd] border border-[#eee0af] flex items-center justify-center">
    //               <StickyNote
    //                 size={18}
    //                 className="text-[#946200]"
    //               />
    //             </div>

    //             <div>
    //               <h2 className="font-semibold text-[#171717]">
    //                 Internal Note
    //               </h2>

    //               <p className="text-xs text-[#9b968d] mt-1">
    //                 Only admins can see this.
    //               </p>
    //             </div>
    //           </div>

    //           <textarea
    //             value={internalNote}
    //             onChange={(e) =>
    //               setInternalNote(e.target.value)
    //             }
    //             placeholder="Add a private note..."
    //             rows={5}
    //             className="w-full border border-[#ddd8ce] bg-[#fcfbf9] rounded-2xl p-4 text-sm text-[#37342f] placeholder:text-[#aaa49a] outline-none focus:border-[#171717] focus:ring-4 focus:ring-black/[0.04] resize-none transition"
    //           />

    //           <button
    //             onClick={addInternalNote}
    //             disabled={
    //               sending || !internalNote.trim()
    //             }
    //             className="w-full mt-3 px-4 py-3.5 bg-[#f7f4ee] border border-[#171717] text-[#171717] rounded-xl text-sm font-medium hover:bg-[#171717] hover:text-white active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    //           >
    //             Add Internal Note
    //           </button>
    //         </section>
    //       </aside>
    //     </div>
    //   </div>
    // </div>

      // --------------------------------------------------
  // Main UI
  // --------------------------------------------------

  
    <div className="min-h-screen bg-[#FDFBF7] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-[1500px] mx-auto">

        {/* Header */}
        <div className="mb-7">
          <button
            onClick={() => navigate("/admin/tickets")}
            className="group inline-flex items-center gap-2 text-sm text-[#6F6A63] hover:text-[#2B241E] transition-colors mb-5"
          >
            <ArrowLeft
              size={17}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Ticket Queue
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#9C6A3A] mb-2">
                Author Support
              </p>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1C1C] tracking-tight">
                Ticket Details
              </h1>

              <p className="text-sm text-[#99938A] mt-2">
                #{ticket._id}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border ${getStatusClass(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </span>

              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border ${getPriorityClass(
                  ticket.priority
                )}`}
              >
                {ticket.priority} Priority
              </span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">

          {/* Main Content */}
          <main className="space-y-6 min-w-0">

            {/* Support Query */}
            <section className="bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl overflow-hidden">
              <div className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#9C6A3A] mb-2">
                      Support Query
                    </p>

                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] leading-tight">
                      {ticket.subject}
                    </h2>
                  </div>

                  <span className="shrink-0 w-fit px-3 py-1.5 bg-[#F2EDE4] border border-[#D8CFC4] rounded-full text-xs text-[#6F6A63]">
                    {ticket.category}
                  </span>
                </div>

                <div className="mt-7 pt-6 border-t border-[#E5DED4]">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#99938A] mb-3">
                    Author's Query
                  </p>

                  <div className="bg-[#FDFBF7] border border-[#E5DED4] rounded-xl p-5">
                    <p className="text-sm sm:text-[15px] leading-7 text-[#4F4A44] whitespace-pre-wrap">
                      {ticket.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-3 bg-[#FDFBF7] border border-[#E5DED4] rounded-xl p-4">
                    <div className="w-9 h-9 rounded-lg bg-[#F2EDE4] flex items-center justify-center shrink-0">
                      <Calendar
                        size={16}
                        className="text-[#9C6A3A]"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-[#99938A]">
                        Created
                      </p>

                      <p className="text-sm text-[#4F4A44] mt-1 truncate">
                        {formatDate(ticket.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-[#FDFBF7] border border-[#E5DED4] rounded-xl p-4">
                    <div className="w-9 h-9 rounded-lg bg-[#F2EDE4] flex items-center justify-center shrink-0">
                      <Clock
                        size={16}
                        className="text-[#9C6A3A]"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-[#99938A]">
                        Last Updated
                      </p>

                      <p className="text-sm text-[#4F4A44] mt-1 truncate">
                        {formatDate(ticket.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Conversation */}
            <section className="bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl overflow-hidden">
              <div className="px-5 sm:px-7 py-5 border-b border-[#E5DED4]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2B241E] flex items-center justify-center">
                    <MessageSquare
                      size={18}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <h2 className="font-serif text-xl text-[#1C1C1C]">
                      Conversation
                    </h2>

                    <p className="text-xs text-[#99938A] mt-0.5">
                      Author and support communication
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7 space-y-4">
                {messages.length === 0 ? (
                  <div className="py-12 text-center border border-dashed border-[#D8CFC4] rounded-xl bg-[#FDFBF7]">
                    <MessageSquare
                      size={24}
                      className="mx-auto mb-3 text-[#B5AEA4]"
                    />

                    <p className="text-sm text-[#99938A]">
                      No messages yet.
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message._id}
                      className={`rounded-xl border p-4 sm:p-5 ${
                        message.isInternal
                          ? "bg-[#FFF9E6] border-[#E7D99F]"
                          : message.senderRole === "admin"
                          ? "bg-[#2B241E] border-[#2B241E] ml-0 sm:ml-12"
                          : "bg-[#FDFBF7] border-[#E5DED4] mr-0 sm:mr-12"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              message.isInternal
                                ? "bg-[#F5E9B7]"
                                : message.senderRole === "admin"
                                ? "bg-white/10"
                                : "bg-[#F2EDE4]"
                            }`}
                          >
                            {message.isInternal ? (
                              <StickyNote
                                size={14}
                                className="text-[#946200]"
                              />
                            ) : message.senderRole === "admin" ? (
                              <Sparkles
                                size={14}
                                className="text-white"
                              />
                            ) : (
                              <User
                                size={14}
                                className="text-[#6F6A63]"
                              />
                            )}
                          </div>

                          <span
                            className={`text-sm font-semibold ${
                              message.isInternal
                                ? "text-[#6F5200]"
                                : message.senderRole === "admin"
                                ? "text-white"
                                : "text-[#2B241E]"
                            }`}
                          >
                            {message.isInternal
                              ? "Internal Note"
                              : message.senderRole === "admin"
                              ? "Support Team"
                              : "Author"}
                          </span>
                        </div>

                        <span
                          className={`text-[11px] ${
                            message.senderRole === "admin" &&
                            !message.isInternal
                              ? "text-white/50"
                              : "text-[#99938A]"
                          }`}
                        >
                          {formatDate(message.createdAt)}
                        </span>
                      </div>

                      <p
                        className={`text-sm leading-6 whitespace-pre-wrap ${
                          message.isInternal
                            ? "text-[#5E5330]"
                            : message.senderRole === "admin"
                            ? "text-white/85"
                            : "text-[#4F4A44]"
                        }`}
                      >
                        {message.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Respond */}
            <section className="bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl overflow-hidden">
              <div className="px-5 sm:px-7 py-5 border-b border-[#E5DED4]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2B241E] flex items-center justify-center">
                      <Send
                        size={17}
                        className="text-white"
                      />
                    </div>

                    <div>
                      <h2 className="font-serif text-xl text-[#1C1C1C]">
                        Respond to Author
                      </h2>

                      <p className="text-xs text-[#99938A] mt-0.5">
                        Review the response before sending
                      </p>
                    </div>
                  </div>

                  {ticket.aiDraftResponse && (
                    <span className="w-fit inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F1E9FC] border border-[#DCC8F0] text-[#7045A5] text-xs font-medium">
                      <Sparkles size={13} />
                      AI Draft
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 sm:p-7">
                {ticket.aiDraftResponse && (
                  <div className="mb-5 bg-[#F2EDE4] border border-[#D8CFC4] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles
                        size={14}
                        className="text-[#9C6A3A]"
                      />

                      <span className="text-xs font-semibold text-[#6F6A63]">
                        AI-generated draft
                      </span>
                    </div>

                    <p className="text-xs leading-5 text-[#777169]">
                      This response was generated from the author's
                      support query. Review and edit it before sending.
                    </p>
                  </div>
                )}

                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Write your response to the author..."
                  rows={7}
                  className="w-full resize-none rounded-xl border border-[#D8CFC4] bg-[#FDFBF7] px-4 py-4 text-sm text-[#1C1C1C] placeholder:text-[#AAA39A] outline-none focus:border-[#9C6A3A] focus:ring-4 focus:ring-[#9C6A3A]/10 transition"
                />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                  <span className="text-xs text-[#AAA39A]">
                    {response.length} characters
                  </span>

                  <button
                    onClick={sendResponse}
                    disabled={sending || !response.trim()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2B241E] hover:bg-[#1C1C1C] text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <Send size={16} />
                    )}

                    {sending ? "Sending..." : "Send Response"}
                  </button>
                </div>
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">

            {/* Ticket Controls */}
            <section className="bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#F2EDE4] flex items-center justify-center">
                  <AlertTriangle
                    size={16}
                    className="text-[#9C6A3A]"
                  />
                </div>

                <div>
                  <h2 className="font-serif text-xl text-[#1C1C1C]">
                    Ticket Controls
                  </h2>

                  <p className="text-xs text-[#99938A]">
                    Manage ticket
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#99938A] mb-2">
                    Status
                  </label>

                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      updateTicket("status", e.target.value)
                    }
                    className="w-full rounded-lg border border-[#D8CFC4] bg-[#FDFBF7] px-3.5 py-3 text-sm text-[#2B241E] outline-none focus:border-[#9C6A3A] focus:ring-4 focus:ring-[#9C6A3A]/10 transition"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#99938A] mb-2">
                    Priority
                  </label>

                  <select
                    value={ticket.priority}
                    onChange={(e) =>
                      updateTicket("priority", e.target.value)
                    }
                    className="w-full rounded-lg border border-[#D8CFC4] bg-[#FDFBF7] px-3.5 py-3 text-sm text-[#2B241E] outline-none focus:border-[#9C6A3A] focus:ring-4 focus:ring-[#9C6A3A]/10 transition"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.16em] text-[#99938A] mb-2">
                    Category
                  </label>

                  <select
                    value={ticket.category}
                    onChange={(e) =>
                      updateTicket("category", e.target.value)
                    }
                    className="w-full rounded-lg border border-[#D8CFC4] bg-[#FDFBF7] px-3.5 py-3 text-sm text-[#2B241E] outline-none focus:border-[#9C6A3A] focus:ring-4 focus:ring-[#9C6A3A]/10 transition"
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

            {/* Book Information */}
            {ticket.bookId && (
              <section className="bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-[#F2EDE4] flex items-center justify-center">
                    <MessageSquare
                      size={16}
                      className="text-[#9C6A3A]"
                    />
                  </div>

                  <div>
                    <h2 className="font-serif text-xl text-[#1C1C1C]">
                      Book Information
                    </h2>

                    <p className="text-xs text-[#99938A]">
                      Related publication
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#99938A]">
                      Title
                    </p>

                    <p className="text-sm font-medium text-[#2B241E] mt-1">
                      {ticket.bookId.title}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5DED4]">
                    <p className="text-[10px] uppercase tracking-wider text-[#99938A]">
                      ISBN
                    </p>

                    <p className="text-sm text-[#6F6A63] mt-1">
                      {ticket.bookId.isbn}
                    </p>
                  </div>

                  {ticket.bookId.genre && (
                    <div className="pt-3 border-t border-[#E5DED4]">
                      <p className="text-[10px] uppercase tracking-wider text-[#99938A]">
                        Genre
                      </p>

                      <p className="text-sm text-[#6F6A63] mt-1">
                        {ticket.bookId.genre}
                      </p>
                    </div>
                  )}

                  {ticket.bookId.status && (
                    <div className="pt-3 border-t border-[#E5DED4]">
                      <p className="text-[10px] uppercase tracking-wider text-[#99938A]">
                        Status
                      </p>

                      <p className="text-sm text-[#6F6A63] mt-1">
                        {ticket.bookId.status}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* AI Analysis */}
            <section className="bg-[#2B241E] rounded-2xl p-5 sm:p-6 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <Sparkles size={16} />
                </div>

                <div>
                  <h2 className="font-serif text-xl">
                    AI Analysis
                  </h2>

                  <p className="text-xs text-white/45">
                    Ticket intelligence
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-4">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    AI Category
                  </p>

                  <p className="text-sm text-white/85 mt-2">
                    {ticket.aiCategory || "Not classified"}
                  </p>
                </div>

                <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-4">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    AI Priority
                  </p>

                  <div className="mt-2">
                    {ticket.aiPriority ? (
                      <span
                        className={`inline-flex px-3 py-1.5 rounded-full border text-xs font-medium ${getPriorityClass(
                          ticket.aiPriority
                        )}`}
                      >
                        {ticket.aiPriority}
                      </span>
                    ) : (
                      <span className="text-sm text-white/40">
                        Not classified
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-wider text-white/40">
                      AI Draft Response
                    </p>

                    {ticket.aiDraftResponse && (
                      <Sparkles
                        size={13}
                        className="text-[#C49A70]"
                      />
                    )}
                  </div>

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

            {/* Internal Note */}
            <section className="bg-[#F8F5EE] border border-[#D8CFC4] rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#F5EBC8] flex items-center justify-center">
                  <StickyNote
                    size={16}
                    className="text-[#946200]"
                  />
                </div>

                <div>
                  <h2 className="font-serif text-xl text-[#1C1C1C]">
                    Internal Note
                  </h2>

                  <p className="text-xs text-[#99938A]">
                    Visible only to admins
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
                className="w-full resize-none rounded-xl border border-[#D8CFC4] bg-[#FDFBF7] px-4 py-3.5 text-sm text-[#1C1C1C] placeholder:text-[#AAA39A] outline-none focus:border-[#9C6A3A] focus:ring-4 focus:ring-[#9C6A3A]/10 transition"
              />

              <button
                onClick={addInternalNote}
                disabled={
                  sending || !internalNote.trim()
                }
                className="w-full mt-3 px-4 py-3 bg-[#F2EDE4] hover:bg-[#E5DED4] border border-[#D8CFC4] text-[#2B241E] rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Internal Note
              </button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};
  
export default TicketDetail;

