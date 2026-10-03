import {
  BookOpen,
  Users,
  TrendingUp,
  CreditCard,
  MessageSquare,
  ArrowUpRight,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  HelpCircle,
  FileText,
} from 'lucide-react';

const Dashboard = () => {
  const topStats = [
    {
      title: 'TITLES BOUND',
      value: '04',
      subtext: '+1 In Development • 1 Archived',
      icon: BookOpen,
    },
    {
      title: 'TOTAL READERSHIP REACH',
      value: '1,511',
      subtext: '+12% vs last 30 days',
      icon: Users,
    },
    {
      title: 'TOTAL ROYALTY (Gross)',
      value: '₹67,790',
      subtext: 'Accrued through Q3 2026',
      icon: TrendingUp,
    },
    {
      title: 'OUTSTANDING PAYOUT',
      value: '₹8,450',
      subtext: 'Scheduled Nov 12, 2026',
      icon: CreditCard,
      highlight: true,
    },
  ];

  const bookCollection = [
    {
      id: 1,
      title: 'The Art of Starting...',
      subtitle: 'HARDCOVER EDITION • VOL 01',
      status: 'IN PRODUCTION',
      statusBg: 'bg-orange-100 text-orange-800 border-orange-200',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
      circulation: '324 PRE-ORDERS',
      price: '₹699',
    },
    {
      id: 2,
      title: 'The Silent Shore',
      subtitle: 'PAPERBACK EDITION • VOL 02',
      status: 'PUBLISHED',
      statusBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
      circulation: '742 COPIES',
      price: '₹349',
    },
    {
      id: 3,
      title: 'Meditations on...',
      subtitle: 'CLOTHBOUND EDITION • VOL 03',
      status: 'PUBLISHED',
      statusBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
      circulation: '445 COPIES',
      price: '₹499',
    },
    {
      id: 4,
      title: 'Lost Words...',
      subtitle: 'POCKET EDITION • VOL 04',
      status: 'IN ARCHIVE',
      statusBg: 'bg-gray-100 text-gray-700 border-gray-300',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
      circulation: '110 COPIES',
      price: '₹220',
    },
  ];

  const supportTickets = [
    {
      id: 'TICK-1024',
      date: 'Oct 28, 2026',
      title: 'Royalty payment schedule for Q3',
      desc: 'Inquiry regarding payout date & bank transfer memo...',
      status: 'ACTION REQUIRED',
      statusBg: 'bg-amber-100 text-amber-900 border-amber-200',
    },
    {
      id: 'TICK-0988',
      date: 'Oct 14, 2026',
      title: 'Cover debossing foil sample review',
      desc: 'Reviewing gold foil opacity on 500 GSM Natural Mūken...',
      status: 'RESOLVED',
      statusBg: 'bg-gray-100 text-gray-600 border-gray-200',
    },
    {
      id: 'TICK-0912',
      date: 'Sep 22, 2026',
      title: 'Wholesale copies discount code',
      desc: 'Direct bulk buying code request for launch event in Delhi...',
      status: 'RESOLVED',
      statusBg: 'bg-gray-100 text-gray-600 border-gray-200',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* --- TOP HEADER & ACTIONS --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              EDITORIAL OVERVIEW | AUTUMN 2026
            </span>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-0.5">
              Good morning, Riya
            </h1>
            <p className="text-xs lg:text-sm text-gray-600 mt-1 max-w-2xl">
              Welcome back to your Bookleaf publishing portal. Your editorial team is currently typesetting your forthcoming volume with archival precision.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F2EDE4] hover:bg-[#EAE4D8] text-gray-800 rounded-md text-xs font-semibold border border-gray-300/60 transition">
              <Clock className="w-3.5 h-3.5 text-gray-600" />
              View Active Milestones
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 text-white rounded-md text-xs font-semibold shadow-sm transition">
              <MessageSquare className="w-3.5 h-3.5" />
              Submit a Support Query
            </button>
          </div>
        </div>

        {/* --- TOP STATS ROW --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-lg border bg-[#F8F5EE] border-gray-200/80 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    {stat.title}
                  </span>
                  <div className="p-1.5 rounded bg-white border border-gray-200 text-gray-700">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="my-3">
                  <span className={`text-3xl font-serif font-bold ${stat.highlight ? 'text-amber-900' : 'text-gray-900'}`}>
                    {stat.value}
                  </span>
                </div>

                <div className="text-xs pt-2 border-t border-gray-200/80 text-gray-500 truncate">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- MIDDLE FEATURE: ACTIVE PRODUCTION WORKBENCH --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Active Book Showcase (4 Columns) */}
          <div className="lg:col-span-5 bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-orange-100 text-orange-800 border border-orange-200 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                  IN PRODUCTION
                </span>
                <span className="text-[11px] font-mono text-gray-400">FOLIO NO. 04</span>
              </div>

              <div className="flex gap-4 items-start">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400"
                  alt="The Art of Starting Again"
                  className="w-28 h-36 object-cover rounded border border-gray-300 shadow-sm flex-shrink-0"
                />

                <div className="space-y-1">
                  <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase block">
                    OLIVIA LITERARY PRESS
                  </span>
                  <h3 className="font-serif font-bold text-xl text-gray-900 leading-tight">
                    The Art of Starting Again
                  </h3>
                  <p className="text-xs text-gray-500">Riya Sharma</p>

                  <div className="pt-2 text-xs space-y-1 text-gray-600">
                    <div className="font-mono text-[11px]">ISBN: 978-93-89324-45-6</div>
                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Hardcover Proof Signed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">TYPESETTING BENCH PROOF</span>
              <button className="text-gray-900 font-semibold hover:underline flex items-center gap-1">
                <span>Detailed Status</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Milestone Progress & Editorial Note (7 Columns) */}
          <div className="lg:col-span-7 bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    CURRENT MILESTONE
                  </span>
                  <h3 className="font-serif font-bold text-lg text-gray-900">
                    Stage 04 of 07 – Master Typesetting Active
                  </h3>
                </div>
                <span className="bg-amber-100 text-amber-900 font-mono text-xs font-bold px-2.5 py-1 rounded border border-amber-200">
                  55% Completed
                </span>
              </div>

              {/* Progress Steps Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-5">
                <div className="bg-[#F2EDE4] p-2 rounded">
                  <span className="text-[10px] text-gray-400 block font-bold">01. Manuscript</span>
                  <span className="font-semibold text-gray-800">Cleared Aug 12</span>
                </div>
                <div className="bg-[#F2EDE4] p-2 rounded">
                  <span className="text-[10px] text-gray-400 block font-bold">02. Copyedit</span>
                  <span className="font-semibold text-gray-800">Approved Sep 04</span>
                </div>
                <div className="bg-[#F2EDE4] p-2 rounded border border-amber-300 bg-amber-50">
                  <span className="text-[10px] text-amber-800 block font-bold">03. Typesetting</span>
                  <span className="font-semibold text-amber-900">In Progress</span>
                </div>
                <div className="bg-[#F2EDE4] p-2 rounded opacity-60">
                  <span className="text-[10px] text-gray-400 block font-bold">04. Final Press</span>
                  <span className="font-semibold text-gray-700">Est. Nov 18</span>
                </div>
              </div>

              {/* Editorial Quote Box */}
              <div className="bg-[#F2EDE4] p-4 rounded-md border border-gray-300/50 relative">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-800 text-white font-serif font-bold flex items-center justify-center text-xs flex-shrink-0">
                    AV
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-gray-900 text-sm">Alistair Vance</span>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase">Lead Typesetter</span>
                    </div>
                    <p className="text-xs text-gray-700 italic mt-1 leading-relaxed">
                      "Currently laying body text in Garamond Premier Pro with 15.5pt leading on 80gsm natural Mūken cream stock. Proof galleys mockup will be dispatched for your review next Wednesday."
                    </p>
                    <div className="mt-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                      12 hours ago • Typesetting Section
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs text-gray-500">
              <span className="truncate">Expected Sign-off window: November 10–12, 2026</span>
              <button className="text-gray-900 font-semibold hover:underline whitespace-nowrap flex items-center gap-1">
                <span>Read Typesetter Notes</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* --- MY BOOKS COLLECTION (4 CARDS GRID) --- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                COLOPHON & BIBLIOGRAPHY
              </span>
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                My Books Collection
              </h2>
            </div>
            <button className="text-xs font-semibold text-gray-800 hover:underline flex items-center gap-1">
              <span>View All Books</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bookCollection.map((book) => (
              <div
                key={book.id}
                className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 flex flex-col justify-between hover:shadow-sm transition"
              >
                <div>
                  <div className="relative aspect-[3/4] rounded overflow-hidden mb-3 bg-gray-200 border border-gray-300/60">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold border ${book.statusBg}`}>
                      {book.status}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-gray-900 truncate">
                    {book.title}
                  </h3>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                    {book.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] text-gray-400 font-semibold block">CIRCULATION</span>
                    <span className="font-semibold text-gray-800 text-[11px]">{book.circulation}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-gray-400 font-semibold block">MSRP</span>
                    <span className="font-serif font-bold text-gray-900">{book.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM SECTION: SUPPORT TICKETS & HELP CARD --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Recent Support Activity (8 Columns) */}
          <div className="lg:col-span-8 bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6">
            <div className="flex items-center justify-between border-b border-gray-200/80 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  AUTHOR SUPPORT DESK
                </span>
                <h3 className="text-lg font-serif font-bold text-gray-900">
                  Recent Support Activity
                </h3>
              </div>
              <button className="text-xs font-semibold text-gray-700 hover:underline">
                View All Tickets (4)
              </button>
            </div>

            <div className="space-y-2.5">
              {supportTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-[#F2EDE4] p-3.5 rounded border border-gray-300/40 flex items-center justify-between gap-4 hover:border-gray-400/60 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-white rounded border border-gray-200 text-gray-700 flex-shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                        <span>{ticket.id}</span>
                        <span>•</span>
                        <span>{ticket.date}</span>
                      </div>
                      <h4 className="font-semibold text-xs text-gray-900 truncate">
                        {ticket.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 truncate">{ticket.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${ticket.statusBg}`}>
                      {ticket.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs text-gray-500">
              <span>Average Response Time: 3–6 Business Hours</span>
              <button className="text-gray-900 font-semibold hover:underline flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                <span>New Ticket</span>
              </button>
            </div>
          </div>

          {/* Need Help CTA Banner (4 Columns) */}
          <div className="lg:col-span-4 bg-[#1C1A17] text-white rounded-lg p-6 flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-amber-400 mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase block">
                EDITORIAL CONCIERGE
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                Need Help with Your Publication?
              </h3>

              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Have questions regarding ISBN assignment, typesetting timelines, distribution queries, or ordering author copies?
              </p>

              <ul className="mt-4 space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Direct access to lead typesetters</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Royalty statement audit assistance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sample proof sign-off approval</span>
                </li>
              </ul>
            </div>

            <button className="mt-6 w-full py-2.5 bg-[#B87A4B] hover:bg-[#A36A3F] text-white text-xs font-semibold rounded transition flex items-center justify-center gap-2 shadow-sm">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Submit a Support Query</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;