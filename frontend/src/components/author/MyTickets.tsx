import  { useState } from 'react';
import {
  Search,
  Plus,
  ChevronDown,
  ArrowUpRight,
  BookOpen,
  Clock,
  
  Sparkles,
  FileText,

  ShieldCheck
} from 'lucide-react';

const MyTickets = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookFilter, setSelectedBookFilter] = useState('All Books (4)');
  const [sortOrder, setSortOrder] = useState('Latest Updated');

  // Dummy Ticket Data matching the screenshot details
  const tickets = [
    {
      id: 'ITKL-1042',
      title: 'Royalty payment not received for Q3',
      excerpt:
        'I published my book 4 months ago and still haven\'t received any royalty payout. My dashboard shows over 420 copies sold across physical distributors and digital impressions, yet the ledger remains...',
      book: 'The Art of Starting Again',
      loggedDate: 'Sep 28, 2026',
      updatedDate: '2 hours ago',
      category: 'Royalty & Payments',
      status: 'IN PROGRESS',
      priority: 'HIGH PRIORITY',
      assignedEditor: {
        initials: 'TV',
        name: 'Tariq Vance',
        role: 'Senior Curator & Editorial Lead',
      },
      actionLabel: 'Open Ticket Dossier',
      actionIcon: ArrowUpRight,
      statusClass: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'ITKL-1019',
      title: 'Cover embossing foil sample review',
      excerpt:
        'Production confirmed brass stamping press test on 140gsm Mūken cream stock approved by author. Gold foil specimen dispatched via courier docket for physical verification.',
      book: 'The Art of Starting Again',
      loggedDate: null,
      archivedDate: '9 days ago',
      category: 'Production & Bindery',
      status: 'RESOLVED',
      priority: null,
      caseMeta: 'Case Closed & Registered',
      actionLabel: 'View Archival Proof',
      actionIcon: ArrowUpRight,
      statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'ITKL-0988',
      title: 'Wholesale author copies discount code',
      excerpt:
        'Requested a batch discount token for an upcoming private reading tour at Chennai Literary Guild. Author code WIL-MONSOON-50 issued with 50% waiver applied directly in carton print-fulfillment.',
      book: 'Whispers in the Monsoon',
      loggedDate: null,
      resolvedDate: 'Sep 14, 2026',
      category: 'Distribution',
      status: 'RESOLVED',
      priority: null,
      caseMeta: 'Author Redeemed',
      actionLabel: 'View Archival Proof',
      actionIcon: ArrowUpRight,
      statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'ITKL-0912',
      title: 'ISBN barcode registration verification',
      excerpt:
        'Raja Rammohun Roy National Agency metadata sync confirmed for paperback and hardbound impressions. EAN-13 barcodes rendered and deposited in National Digital Depository.',
      book: 'Echoes of the Nilgiris',
      loggedDate: null,
      archivedDate: 'Aug 20, 2026',
      category: 'Compliance',
      status: 'CLOSED',
      priority: null,
      caseMeta: 'Archival Complete',
      actionLabel: 'View Archival Proof',
      actionIcon: ArrowUpRight,
      statusClass: 'bg-gray-100 text-gray-700 border-gray-300',
    },
  ];

  const filterTabs = [
    { label: 'All', count: 4 },
    { label: 'Open', count: 0 },
    { label: 'In Progress', count: 1 },
    { label: 'Resolved', count: 2 },
    { label: 'Closed', count: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* --- BREADCRUMB & HEADER TOP --- */}
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-semibold text-gray-900">My Tickets</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>DESPATCH QUEUE SYNCED</span>
            <span>• Registry BL - A1024</span>
          </div>
        </div>

        {/* --- PAGE HEADING & MAIN CTA --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#F2EDE4] border border-gray-300/50 text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-amber-800" />
              <span>Editorial Docket & Author Correspondence</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">
              My Support Tickets & Archival Inquiries
            </h1>
            <p className="text-xs lg:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Track your inquiries, follow direct dialogue with your managing editor, and inspect historical resolutions across your published bibliography.
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-md text-xs font-semibold shadow-sm transition whitespace-nowrap self-start md:self-auto">
            <Plus className="w-4 h-4" />
            <span>+ New Support Query</span>
          </button>
        </div>

        {/* --- CONTROLS BAR: SEARCH, DROPDOWNS & FILTER PILLS --- */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-4">
          
          {/* Row 1: Search and Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ticket ID, subject, or manuscript..."
                className="w-full bg-white border border-gray-300 rounded pl-9 pr-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="md:col-span-3 relative">
              <select
                value={selectedBookFilter}
                onChange={(e) => setSelectedBookFilter(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 font-medium appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option>All Books (4)</option>
                <option>The Art of Starting Again</option>
                <option>Whispers in the Monsoon</option>
                <option>Echoes of the Nilgiris</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="md:col-span-3 relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 font-medium appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option>Sort: Latest Updated</option>
                <option>Sort: Oldest First</option>
                <option>Sort: Priority</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Row 2: Status Tabs & SLA Note */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-200/60">
            <div className="flex flex-wrap items-center gap-1.5">
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab.label;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition flex items-center gap-1 ${
                      isActive
                        ? 'bg-black text-white'
                        : 'bg-[#F2EDE4] text-gray-700 hover:bg-gray-200 border border-gray-300/40'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] ${isActive ? 'opacity-80' : 'text-gray-500'}`}>
                      ({tab.count})
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-800" />
              <span>Guaranteed Desk Response: within 24 business hours</span>
            </div>
          </div>

        </div>

        {/* --- TICKETS LIST --- */}
        <div className="space-y-4">
          {tickets.map((ticket) => {
            const ActionIcon = ticket.actionIcon;
            return (
              <div
                key={ticket.id}
                className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 lg:p-6 transition hover:shadow-sm space-y-4 relative"
              >
                {/* Card Header Tag Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gray-900">{ticket.id}</span>
                    
                    {ticket.priority && (
                      <span className="bg-red-100 text-red-800 border border-red-200 text-[9px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                        {ticket.priority}
                      </span>
                    )}

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${ticket.statusClass}`}>
                      {ticket.status}
                    </span>

                    <span className="text-gray-300">•</span>
                    <span className="text-[11px] font-medium text-gray-500">{ticket.category}</span>
                  </div>

                  {ticket.caseMeta && (
                    <span className="text-[11px] text-gray-500 flex items-center gap-1 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      {ticket.caseMeta}
                    </span>
                  )}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  
                  <div className="md:col-span-8 space-y-2">
                    <h3 className="text-lg font-serif font-bold text-gray-900 leading-snug hover:underline cursor-pointer">
                      {ticket.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed italic bg-[#F2EDE4]/60 p-3 rounded border border-gray-200/60">
                      "{ticket.excerpt}"
                    </p>
                  </div>

                  {/* Right Side Editor Info or Action */}
                  <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between h-full space-y-3">
                    {ticket.assignedEditor && (
                      <div className="bg-[#F2EDE4] p-2.5 rounded border border-gray-300/50 flex items-center gap-2.5 max-w-xs w-full">
                        <div className="w-8 h-8 rounded bg-amber-800 text-white font-serif font-bold flex items-center justify-center text-xs flex-shrink-0">
                          {ticket.assignedEditor.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-xs text-gray-900 truncate">
                            {ticket.assignedEditor.name}
                          </div>
                          <div className="text-[10px] text-gray-500 truncate">
                            {ticket.assignedEditor.role}
                          </div>
                        </div>
                      </div>
                    )}

                    <button className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-900 text-xs font-semibold rounded flex items-center gap-1.5 transition shadow-2xs">
                      <span>{ticket.actionLabel}</span>
                      <ActionIcon className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </div>

                </div>

                {/* Card Footer Meta Row */}
                <div className="pt-3 border-t border-gray-200/80 flex flex-wrap items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                    <span className="font-medium text-gray-800">{ticket.book}</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px]">
                    {ticket.loggedDate && <span>Logged: {ticket.loggedDate}</span>}
                    {ticket.updatedDate && (
                      <span className="font-semibold text-amber-900">• Updated {ticket.updatedDate}</span>
                    )}
                    {ticket.archivedDate && <span>Archived Resolution: {ticket.archivedDate}</span>}
                    {ticket.resolvedDate && <span>Resolved: {ticket.resolvedDate}</span>}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* --- BOTTOM CALLOUT BANNER --- */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F2EDE4] border border-gray-300/50 rounded text-amber-800 flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-gray-900">
                Need an immediate editorial clarification?
              </h4>
              <p className="text-xs text-gray-500">
                Managing editors review manuscript and ledger inquiries Mon–Fri, 9:00 AM – 6:00 PM IST.
              </p>
            </div>
          </div>

          <button className="px-4 py-2.5 bg-black hover:bg-gray-800 text-white rounded text-xs font-semibold transition whitespace-nowrap shadow-xs">
            Draft New Dispatch
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyTickets;