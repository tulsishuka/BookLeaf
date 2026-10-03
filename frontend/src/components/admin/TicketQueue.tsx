import { useState } from 'react';
import {
  UserCheck,
  Tag,
  AlertTriangle,
  Lock,
  Send,
  Sparkles,
  Paperclip,
  Copy,
  MessageSquare,
  CheckCircle2,
 
  ArrowRight,
  RefreshCw,
  Edit,
 
} from 'lucide-react';

const TicketQueue = () => {
  const [responseMsg, setResponseMsg] = useState('');
  const [ticketStatus, setTicketStatus] = useState('Open');
  const [ticketPriority, setTicketPriority] = useState('High');
  const [ticketCategory, setTicketCategory] = useState('Royalty & Payments');

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans space-y-6">
      
      {/* --- TOP NAV / BREADCRUMB --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase">
          <span>TICKET INSPECTION</span>
          <span>/</span>
          <span className="text-gray-900 font-bold">#FL-10892</span>
          <span>/</span>
          <span>EDITORIAL DESK</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 transition shadow-2xs flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-gray-500" />
            <span>Assign</span>
          </button>

          <button
            type="button"
            className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 transition shadow-2xs flex items-center gap-1.5"
          >
            <Tag className="w-3.5 h-3.5 text-gray-500" />
            <span>Change Priority</span>
          </button>

          <button
            type="button"
            className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 transition shadow-2xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
            <span>Change Status</span>
          </button>

          <button
            type="button"
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold transition shadow-2xs flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Close Ticket</span>
          </button>
        </div>
      </div>

      {/* --- MAIN HEADER --- */}
      <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-black text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                TKT-10892
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                OPEN
              </span>
              <span className="bg-red-100 text-red-800 border border-red-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-red-600" />
                PRIORITY: HIGH
              </span>
              <span className="text-xs text-gray-500">Royalty & Payments</span>
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Royalty Payment Missing
            </h1>
            
            <p className="text-xs text-gray-600 mt-1 max-w-3xl leading-relaxed">
              Quarterly disbursement reconciliation inquiry regarding Kindle & Print sales distribution for Q3 statement audit portal.
            </p>
          </div>

          <div className="text-right text-xs space-y-1 bg-[#F2EDE4] p-3 rounded border border-gray-300/40 flex-shrink-0">
            <div className="text-gray-500">
              Created: <span className="font-semibold text-gray-900">03 Oct 2026, 10:14 AM</span>
            </div>
            <div className="text-gray-500">
              SLA Target: <span className="font-semibold text-red-700 font-mono">03 Oct 2026, 11:30 AM *</span>
            </div>
            <div className="text-[10px] text-gray-400 font-mono">
              Promoted via Priority Queue (Target breached: 2 hrs ago)
            </div>
          </div>
        </div>

        {/* AUTHOR & BOOK BANNER */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-gray-200/80">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
              alt="Riya Sharma"
              className="w-10 h-10 rounded object-cover border border-gray-300"
            />
            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 block">AUTHOR OF RECORD</span>
              <span className="font-serif font-bold text-sm text-gray-900 block">Riya Sharma</span>
              <span className="text-[11px] text-gray-500">riya.sharma@author.press</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 border border-amber-300 rounded flex items-center justify-center font-serif font-bold text-amber-900 text-sm">
              TAS
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 block">REGISTERED BOOK</span>
              <span className="font-serif font-bold text-sm text-gray-900 block">The Art of Starting Again</span>
              <span className="text-[11px] text-gray-500 font-mono">ISBN: 978-93-94818-12-8</span>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">SYSTEM ACCOUNT ID</span>
              <span className="font-mono font-bold text-sm text-gray-900 block">#BL-10224</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded inline-block mt-0.5">
                Folio Tier 1
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT LAYOUT (2 COLUMNS) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT MAIN THREAD (8 COLUMNS) ================= */}
        <div className="lg:col-span-8 space-y-6">

          {/* 1. ORIGINAL AUTHOR INQUIRY */}
          <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-800 text-white font-serif font-bold text-xs flex items-center justify-center">
                  RS
                </span>
                <div>
                  <h3 className="font-serif font-bold text-base text-gray-900">Original Author Inquiry</h3>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Submitted via Author Portal on 03 Oct 2026 at 10:14 AM
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-semibold">
                ORIGINAL INBOUND DISPATCH
              </span>
            </div>

            <div className="bg-[#F2EDE4] p-4 rounded-md border border-gray-300/40 text-xs text-gray-800 leading-relaxed font-serif italic">
              "Hello, I noticed that my royalty payment for the last quarter has not appeared in my account. According to my author dashboard, over 420 copies were sold across paperback and Kindle editions, but the accrual status is still showing pending. Could someone please clarify when the disbursement will occur or if action is required on my part to verify my PAN / bank details? I have verified my bank account and routing info already."
            </div>

            <div className="flex items-center justify-between bg-white/60 p-3 rounded border border-gray-300/40 text-xs">
              <div className="flex items-center gap-2 text-gray-700 font-mono text-[11px]">
                <Paperclip className="w-4 h-4 text-gray-500" />
                <span>Screenshot_royalty_dashboard.png</span>
                <span className="text-gray-400">(420 KB, PNG) Uploaded with inquiry</span>
              </div>
              <button
                type="button"
                className="text-[11px] font-semibold text-gray-800 hover:underline flex items-center gap-1"
              >
                <span>Download Attachment</span>
              </button>
            </div>
          </div>

          {/* 2. AI RESPONSE DRAFT */}
          <div className="bg-[#F8F5EE] border border-amber-300/80 rounded-lg p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-800" />
                <h3 className="font-serif font-bold text-base text-gray-900">AI Response Draft</h3>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                  89% Match
                </span>
                <span className="text-gray-500">Based on Royalty Matrix v4.2</span>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 bg-amber-50/60 p-2 rounded border border-amber-200/50 flex items-center justify-between">
              <span>🤖 Autonomic draft compiled — Review & customize before sending to author account.</span>
            </div>

            <div className="bg-white p-4 rounded border border-gray-300/60 font-serif text-xs leading-relaxed space-y-3 text-gray-800">
              <p>Dear Riya,</p>
              <p>
                Thank you for reaching out regarding your royalty payment for <em>The Art of Starting Again</em>. We have audited your sales ledger: 420 copies have been recorded across print services and digital distributions, representing <strong>₹16,420.00 in net Q3 royalties</strong>.
              </p>
              <p>
                Under BookLeaf Publishing Section 3.2, quarterly royalty disbursements are processed within 45 days of quarter-close to allow distributor reconciliations. Your bank (HDFC Bank Account ending in 5289) is Auto-Verified and...
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-800 hover:bg-gray-50 transition flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5 text-gray-500" />
                  <span>Regenerate Draft</span>
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-800 hover:bg-gray-50 transition flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                  <span>Copy to Response</span>
                </button>
              </div>

              <button
                type="button"
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded text-xs font-semibold flex items-center gap-2 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Response to Author</span>
              </button>
            </div>
          </div>

          {/* 3. CONVERSATION LEDGER */}
          <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-800" />
                <h3 className="font-serif font-bold text-base text-gray-900">Conversation Ledger</h3>
              </div>
              <span className="text-[10px] font-mono text-gray-400">2 MESSAGES RECORDED</span>
            </div>

            {/* Message 1 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-xs text-gray-900">Riya Sharma</span>
                  <span className="bg-gray-200 text-gray-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                    AUTHOR
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">03 Oct 2026 • 10:14 AM</span>
              </div>
              <div className="bg-[#F2EDE4] p-3.5 rounded text-xs text-gray-800 leading-relaxed font-sans">
                Hello, I noticed that my royalty payment for the last quarter has not appeared in my account. According to my author dashboard, over 420 copies were sold across paperback and Kindle distributions, but the payout status still shows pending. Could someone please clarify when the disbursement will occur or if I need to re-touch my bank details, as confirmation: I have an urgent expense arriving this month.
              </div>
            </div>

            {/* Message 2 */}
            <div className="space-y-2 pl-4 border-l-2 border-amber-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-xs text-gray-900">Tulasi Shukla</span>
                  <span className="bg-amber-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                    EDITORIAL DESK AGENT
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">03 Oct 2026 • 10:32 AM</span>
              </div>
              <div className="bg-white p-3.5 rounded border border-gray-300/50 text-xs text-gray-800 leading-relaxed">
                Greetings Riya. Thank you for your inquiry. Our finance audit balance is currently reconciling the Q3 disbursements bench with our bank settlement gateway. I have placed an escalation note with our treasury desk to verify reserve processing speed for your account. You will receive an immediate confirmation once cleared.
              </div>
            </div>

            {/* Reply Input Box */}
            <div className="pt-4 border-t border-gray-200/80 space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                REPLY TO AUTHOR
              </label>
              
              <div className="bg-white border border-gray-300 rounded overflow-hidden">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#F2EDE4] border-b border-gray-300 text-xs text-gray-600">
                  <div className="flex items-center gap-3 font-mono">
                    <button type="button" className="font-bold hover:text-black">B</button>
                    <button type="button" className="italic hover:text-black">I</button>
                    <button type="button" className="underline hover:text-black">U</button>
                    <span>|</span>
                    <button type="button" className="hover:text-black">Link</button>
                    <button type="button" className="hover:text-black">Quote</button>
                  </div>
                  <Paperclip className="w-3.5 h-3.5 text-gray-500 cursor-pointer hover:text-black" />
                </div>

                <textarea
                  rows={4}
                  value={responseMsg}
                  onChange={(e) => setResponseMsg(e.target.value)}
                  placeholder="Write a direct correspondence dispatch to Riya Sharma..."
                  className="w-full p-3 text-xs text-gray-900 focus:outline-none resize-y"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 italic">
                  Delivered via official email and Author Financial Research.
                </span>
                <button
                  type="button"
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded text-xs font-semibold flex items-center gap-2 transition shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Response</span>
                </button>
              </div>
            </div>

          </div>

          {/* 4. INTERNAL NOTES */}
          <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200/80 pb-2">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-amber-800" />
                <h4 className="font-serif font-bold text-sm text-gray-900">Internal Notes (Staff Only)</h4>
              </div>
              <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                DESK INTERNAL
              </span>
            </div>
            <p className="text-[10px] text-gray-500 italic">
              Private annotations regarding this ticket — strictly confidential, never visible to author or on Author Portal.
            </p>

            <div className="bg-[#F2EDE4] p-3 rounded border border-gray-300/40 text-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span className="font-semibold text-gray-800">Tulas Sharma (Treasury Desk)</span>
                <span>03 Oct 2026 • 11:02 AM</span>
              </div>
              <p className="text-gray-800 leading-relaxed">
                "Checked ledger with Treasury desk. Q3 escrow disbursement batch was stalled during RTGS gateway queue run. Manual clearance approved for this $16,420 INR. Author bank account verified."
              </p>
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDEBAR (4 COLUMNS) ================= */}
        <div className="lg:col-span-4 space-y-6">

          {/* SIDEBAR 1: AI CLASSIFICATION & TRIAGE */}
          <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200/80 pb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-800" />
                <h4 className="font-serif font-bold text-base text-gray-900">AI Classification & Triage</h4>
              </div>
              <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                Model v4
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold">
                  <span>CLASSIFIED CATEGORY</span>
                  <span className="font-mono text-gray-600">94% Confidence</span>
                </div>
                <div className="mt-1 bg-amber-100 text-amber-900 p-2 rounded border border-amber-200 font-semibold">
                  Royalty & Payments
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Reasoning: Statements contain "royalty", "payment", "payout", "disbursement", "bank details", and "Q3".
                </p>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold">
                  <span>CALCULATED PRIORITY</span>
                  <span className="font-mono text-gray-600">89% Confidence</span>
                </div>
                <div className="mt-1 bg-red-100 text-red-900 p-2 rounded border border-red-200 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>High Priority</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Reasoning: Financial escalation terms present; target SLA window under 2 hours.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded transition uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Accept Classification</span>
            </button>

            <div className="pt-2 border-t border-gray-200/80">
              <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                Override Category
              </span>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded p-1.5 text-xs text-gray-800 focus:outline-none"
              >
                <option value="Royalty & Payments">Royalty & Payments</option>
                <option value="Printing & Quality">Printing & Quality</option>
                <option value="ISBN & Metadata">ISBN & Metadata</option>
                <option value="Book Design & Production">Book Design & Production</option>
              </select>
            </div>
          </div>

          {/* SIDEBAR 2: TICKET MANAGEMENT */}
          <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 space-y-4">
            <div className="border-b border-gray-200/80 pb-2">
              <h4 className="font-serif font-bold text-base text-gray-900">Ticket Management</h4>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                  ASSIGNED STATUS
                </label>
                <select
                  value={ticketStatus}
                  onChange={(e) => setTicketStatus(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-semibold text-gray-900 focus:outline-none"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending Author Response">Pending Author Response</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                  PRIORITY LEVEL
                </label>
                <select
                  value={ticketPriority}
                  onChange={(e) => setTicketPriority(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-semibold text-gray-900 focus:outline-none"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                  EDITORIAL CATEGORY
                </label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900 focus:outline-none"
                >
                  <option value="Royalty & Payments">Royalty & Payments</option>
                  <option value="Printing & Quality">Printing & Quality</option>
                  <option value="ISBN & Metadata">ISBN & Metadata</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                  ASSIGNED DESK OFFICER
                </label>
                <select className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-semibold text-gray-900 focus:outline-none">
                  <option>Tulasi Shukla (Lead Administrator)</option>
                  <option>Devrat Grover</option>
                  <option>Marcus Vance</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-gray-200/80 text-[10px]">
                <div className="bg-[#F2EDE4] p-2 rounded">
                  <span className="text-gray-400 block font-bold">LAST UPDATED</span>
                  <span className="font-mono text-gray-800 font-semibold">03 Oct 2026</span>
                </div>
                <div className="bg-[#F2EDE4] p-2 rounded">
                  <span className="text-gray-400 block font-bold">SLA REMAINING</span>
                  <span className="font-mono text-red-700 font-bold">Breached</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  className="py-2 bg-black hover:bg-gray-800 text-white font-semibold text-xs rounded transition"
                >
                  Update Ticket
                </button>
                <button
                  type="button"
                  className="py-2 bg-red-100 hover:bg-red-200 border border-red-200 text-red-900 font-semibold text-xs rounded transition"
                >
                  Close Ticket
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR 3: AUTHOR DOSSIER */}
          <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200/80 pb-2">
              <h4 className="font-serif font-bold text-base text-gray-900">Author Dossier</h4>
              <span className="text-[10px] font-mono text-gray-400">#BL-10224</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-200 border border-amber-300 rounded-md flex items-center justify-center font-serif font-bold text-amber-900 text-lg">
                RS
              </div>
              <div>
                <h5 className="font-serif font-bold text-base text-gray-900">Riya Sharma</h5>
                <span className="text-xs text-gray-500 block">PBL - 10224</span>
                <span className="text-[10px] text-gray-400">Riya Sharma (Calm Literary)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-[#F2EDE4] p-2 rounded border border-gray-300/40">
                <span className="text-[9px] font-bold text-gray-400 uppercase block">CATALOG TITLES</span>
                <span className="font-serif font-bold text-base text-gray-900 block">4 Books</span>
                <span className="text-[9px] text-gray-500">Active Publishing</span>
              </div>
              <div className="bg-[#F2EDE4] p-2 rounded border border-gray-300/40">
                <span className="text-[9px] font-bold text-gray-400 uppercase block">LIFETIME SALES</span>
                <span className="font-serif font-bold text-base text-gray-900 block">₹87,240</span>
                <span className="text-[9px] text-emerald-800 font-semibold">Verified Escrow</span>
              </div>
            </div>

            {/* Escrow Bank Info Summary */}
            <div className="bg-white/80 p-3 rounded border border-gray-300/50 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">REGISTERED BANK ACCOUNT</span>
              <div className="font-semibold text-gray-900 flex items-center justify-between">
                <span>HDFC Bank Ltd.</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
                  Verified
                </span>
              </div>
              <p className="text-[10px] font-mono text-gray-500">
                A/C: •••• •••• •••• 5289 (Fort Branch, Mumbai)
              </p>
            </div>

            {/* Recent Book */}
            <div className="bg-[#F2EDE4] p-3 rounded border border-gray-300/40 space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">LATEST PUBLISHED WORK</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-10 bg-black text-white text-[9px] font-serif font-bold p-1 flex items-center justify-center text-center leading-tight rounded-xs">
                  The Art
                </div>
                <div>
                  <span className="font-serif font-bold text-xs text-gray-900 block">The Art of Starting...</span>
                  <span className="text-[10px] text-gray-500 block">3rd Edition Print Run (Hardcover)</span>
                  <span className="text-[10px] font-mono text-gray-400">ISBN: 978-93-94818-12-8</span>
                </div>
              </div>
              <div className="text-[10px] text-gray-500 flex justify-between border-t border-gray-300/40 pt-1.5">
                <span>Q3 Reported: <strong className="text-gray-900">420 copies</strong></span>
                <span>Payout: <strong className="text-emerald-800">₹16,420.00</strong></span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-semibold text-xs rounded transition flex items-center justify-center gap-1.5"
            >
              <span>VIEW AUTHOR FULL PROFILE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TicketQueue;