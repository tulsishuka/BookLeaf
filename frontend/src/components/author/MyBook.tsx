import { useState } from 'react';
import {
  Search,
  Plus,
  ArrowUpRight,
  ChevronDown,
  Globe,
  Award,
  BookOpen,
  TrendingUp,
  Download,
  Info,
  Sparkles,
  MessageSquare
} from 'lucide-react';

const MyBook = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    {
      title: 'WORKS CATALOGUED',
      value: '04',
      unit: 'Titles bound',
      subtext: '100% active log & copyright secured',
      icon: BookOpen,
      isDark: false,
    },
    {
      title: 'WORLDWIDE DISTRIBUTION',
      value: '03',
      unit: 'Channels active',
      subtext: 'Amazon, Ingram, Press Pass',
      icon: Globe,
      isDark: false,
    },
    {
      title: 'IMPACT & STATUS',
      value: '01',
      unit: 'Sponsorship in Proof',
      subtext: 'Proof Sign-off by Friday',
      icon: Award,
      isDark: false,
    },
    {
      title: 'LIFETIME ACCRUALS',
      value: '₹42,860',
      unit: 'Net INR',
      subtext: '₹34,000 Settled | ₹8,860 Pending',
      icon: TrendingUp,
      isDark: true,
    },
  ];

  const books = [
    {
      id: 1,
      title: 'The Art of Starting Again',
      subtitle: 'Modern Contemporary Work',
      status: 'In Production',
      statusColor: 'bg-orange-100 text-orange-800 border-orange-200',
      season: 'Autumn 2024',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
      imageTag: 'DELUXE HARDCOVER',
      isbn: '978-93-9...',
      retail: '₹699.00',
      preOrders: '325 copies',
      accrued: '₹18,200',
      progress: 70,
      progressText: 'Sponsorship & Artwork 70% Complete',
      footerNote: 'Proof review required before Oct 12',
      primaryAction: 'Inspect Folio & Production Details',
      primaryDark: true,
    },
    {
      id: 2,
      title: 'Whispers in the Monsoon',
      subtitle: 'Poetry Collection with Canvas',
      status: 'Published',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      season: 'Spring 2024',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
      imageTag: 'PAPERBACK EDITION',
      isbn: '978-93-9...',
      retail: '₹299.00',
      circulation: '880 copies',
      accrued: '₹14,410',
      badge: 'French Flaps & Custom Spine',
      footerNote: 'Global rights active on Ingram Content',
      primaryAction: 'Impact Folio & Distribution',
      primaryDark: false,
    },
    {
      id: 3,
      title: 'Echoes of the Nilgiris',
      subtitle: 'Literary Fiction • 212 Pages',
      status: 'Published',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      season: 'Autumn 2023',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
      imageTag: 'VINTAGE HARDCOVER',
      isbn: '978-93-9...',
      retail: '₹450.00',
      circulation: '410 copies',
      accrued: '₹10,250',
      badge: 'Regional Library & Press Distribution',
      footerNote: 'Replacement copies available at press hub',
      primaryAction: 'Impact Folio & Distribution',
      primaryDark: false,
    },
    {
      id: 4,
      title: 'A Quiet Season',
      subtitle: 'Essays & Vignettes on Limited Release',
      status: 'In Archive',
      statusColor: 'bg-gray-100 text-gray-700 border-gray-300',
      season: 'Spring 2023',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
      imageTag: 'ARCHIVAL EDITION',
      isbn: '978-93-9...',
      retail: '₹249.00',
      circulation: '150 copies',
      accrued: '₹5,400',
      archivedNote: 'Archival print run complete. Available on-demand for special orders.',
      footerNote: 'Catalog preserved in national repository',
      primaryAction: 'Inspect Folio & Ledger',
      primaryDark: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              AUTHOR CATALOG & PORTFOLIO | VOL. 04
            </span>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-1">
              My Books
            </h1>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              Your published stories, archival records, and multi-channel circulation performance recorded under Bookleaf press mark.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F2EDE4] hover:bg-[#EAE4D8] text-gray-800 rounded-md text-xs font-semibold border border-gray-300/60 transition">
              <Download className="w-3.5 h-3.5" />
              Export Catalog Ledger
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 text-white rounded-md text-xs font-semibold shadow-sm transition">
              <Plus className="w-4 h-4" />
              Submit New Manuscript
            </button>
          </div>
        </div>

        {/* --- STATS CARDS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-lg border flex flex-col justify-between transition-all ${
                  stat.isDark
                    ? 'bg-[#1C1A17] text-white border-black shadow-md'
                    : 'bg-[#F8F5EE] text-gray-900 border-gray-200/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold tracking-wider uppercase ${
                      stat.isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {stat.title}
                  </span>
                  <div
                    className={`p-1.5 rounded ${
                      stat.isDark ? 'bg-white/10 text-white' : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="my-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold tracking-tight">
                      {stat.value}
                    </span>
                    <span
                      className={`text-xs ${
                        stat.isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {stat.unit}
                    </span>
                  </div>
                </div>

                <div
                  className={`text-xs pt-3 border-t ${
                    stat.isDark
                      ? 'border-white/10 text-gray-400'
                      : 'border-gray-200/80 text-gray-500'
                  }`}
                >
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- FILTER & SEARCH BAR --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, ISBN, or edition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F8F5EE] border border-gray-300/70 rounded-md text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Filter Pills & Dropdowns */}
          <div className="flex items-center gap-2 flex-wrap">
            {['All', 'Published', 'In Production', 'Draft'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                  activeFilter === filter
                    ? 'bg-black text-white'
                    : 'bg-[#F2EDE4] text-gray-700 hover:bg-gray-200/70'
                }`}
              >
                {filter}
                {filter === 'Published' && <span className="ml-1 text-[10px] opacity-75">2</span>}
                {filter === 'In Production' && <span className="ml-1 text-[10px] opacity-75">1</span>}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-gray-300 mx-1 hidden sm:block" />

            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F2EDE4] hover:bg-gray-200/70 rounded text-xs font-medium text-gray-700 border border-gray-300/50">
              <span>All Genres</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F2EDE4] hover:bg-gray-200/70 rounded text-xs font-medium text-gray-700 border border-gray-300/50">
              <span>Sort: Most Recent</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* --- BOOK CARDS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Card Top Header */}
                <div className="flex gap-5">
                  {/* Book Image */}
                  <div className="relative w-28 sm:w-36 h-40 sm:h-48 flex-shrink-0 bg-gray-200 rounded overflow-hidden shadow-sm border border-gray-300/60">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-xs text-white text-[9px] font-bold py-0.5 px-1.5 rounded text-center uppercase tracking-wider">
                      {book.imageTag}
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${book.statusColor}`}
                      >
                        {book.status}
                      </span>
                      <span className="text-[11px] font-medium text-gray-400">
                        {book.season}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-gray-900 leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 mb-3">
                      {book.subtitle}
                    </p>

                    {/* Metadata Table Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-[#F2EDE4] p-2.5 rounded text-xs mb-3">
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase block">
                          ISBN-13
                        </span>
                        <span className="font-medium text-gray-800">{book.isbn}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase block">
                          Retail Listing
                        </span>
                        <span className="font-medium text-gray-800">{book.retail}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase block">
                          {book.preOrders ? 'Pre-Orders' : 'Total Circulation'}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {book.preOrders || book.circulation}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase block">
                          Accrued Royalties
                        </span>
                        <span className="font-semibold text-gray-900">{book.accrued}</span>
                      </div>
                    </div>

                    {/* Progress Bar (if in production) */}
                    {book.progress && (
                      <div className="space-y-1 mb-2">
                        <div className="flex justify-between text-[10px] font-semibold text-gray-600">
                          <span>{book.progressText}</span>
                          <span>{book.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-orange-500 h-1.5 rounded-full"
                            style={{ width: `${book.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Special Badge / Tag */}
                    {book.badge && (
                      <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 rounded px-2 py-1 text-[11px] font-medium">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>{book.badge}</span>
                      </div>
                    )}

                    {/* Archival note */}
                    {book.archivedNote && (
                      <div className="text-xs text-gray-600 bg-gray-200/50 p-2 rounded border border-gray-300/40 leading-relaxed">
                        {book.archivedNote}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-3 border-t border-gray-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Info className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{book.footerNote}</span>
                </div>

                <button
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-semibold whitespace-nowrap transition ${
                    book.primaryDark
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-[#EAE4D8] hover:bg-gray-300/70 text-gray-900'
                  }`}
                >
                  <span>{book.primaryAction}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM BANNER --- */}
        <div className="bg-[#EFEAE1] border border-gray-300/80 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-md border border-gray-200 text-gray-700">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900">
                Need an extra print run or revised edition?
              </h4>
              <p className="text-xs text-gray-600">
                Request a dedicated reprint consultation, gallery re-printing, or expansion to digital distribution rights with your assigned managing editor.
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-medium rounded whitespace-nowrap transition">
            <span>Escalate With Managing Editor</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyBook;