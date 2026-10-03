import  { useState } from 'react';
import {
  BookOpen,
  Plus,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Printer,
  AlertCircle,
  TrendingUp,
  Layers,
  ArrowUpRight
} from 'lucide-react';

const BooksCatalog = () => {
  const [activeTab, setActiveTab] = useState('ALL TITLES');
  const [selectedBookId, setSelectedBookId] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const booksData = [
    {
      id: '1',
      title: 'The Art of Starting Again',
      isbn: '978-93-89528-01-4',
      author: 'Riya Sharma',
      authorId: 'PBL-A1024',
      format: 'Archival Octavo',
      imprint: 'Calm Library',
      status: 'In Production',
      statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
      sales: '1,511',
      royalties: '₹67,790',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300',
      binding: 'Hardcover Smyth-Sewn',
      paperStock: '80 GSM Antique Cream',
      typesetting: 'Garamond Prem. Pro / 11pt',
      cadence: 'Stage 4 of 7 (57%)',
      stageNote: 'Interior Galleys Under Review',
      ticketId: '#FL-10892',
      ticketPriority: 'Priority Escalated',
      ticketDesc: 'Author reported royalty report discrepancy for Amazon IN channel during Q3 reconciliation.'
    },
    {
      id: '2',
      title: 'Chronicles of Sand',
      isbn: '978-93-89528-78-1',
      author: 'Vikram Sethi',
      authorId: 'PBL-A1082',
      format: 'Linen Casebound',
      imprint: 'Quill & Quill',
      status: 'Published',
      statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      sales: '3,840',
      royalties: '₹1,84,200',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300',
      binding: 'Cloth Bound Hardcover',
      paperStock: '70 GSM Off-White Book',
      typesetting: 'Caslon Pro / 10.5pt',
      cadence: 'Complete (100%)',
      stageNote: 'Active Distribution Worldwide'
    },
    {
      id: '3',
      title: 'Echoes of the Nilgiris',
      isbn: '978-93-89528-91-0',
      author: 'Ananya Iyer',
      authorId: 'PBL-A1120',
      format: 'Trade Paperback',
      imprint: 'Calm Press',
      status: 'In Production',
      statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
      sales: '890',
      royalties: '₹34,150',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300',
      binding: 'Perfect Bound Softcover',
      paperStock: '80 GSM Cream Uncoated',
      typesetting: 'Baskerville / 11pt',
      cadence: 'Stage 2 of 7 (28%)',
      stageNote: 'Proofing & Cover Layout'
    },
    {
      id: '4',
      title: 'Whispers in the Monsoon',
      isbn: '978-93-89528-11-2',
      author: 'Devraj Sen',
      authorId: 'PBL-A0994',
      format: 'Quarter-Bound Cloth',
      imprint: 'Leaf Classics',
      status: 'Proofing',
      statusColor: 'bg-blue-100 text-blue-900 border-blue-300',
      sales: '620',
      royalties: '₹28,900',
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=300',
      binding: 'Quarter Bound Hardcover',
      paperStock: '90 GSM Natural Shade',
      typesetting: 'Minion Pro / 11.5pt',
      cadence: 'Stage 5 of 7 (71%)',
      stageNote: 'Galley Verification'
    },
    {
      id: '5',
      title: 'The Cartography of Memory',
      isbn: '978-93-89528-02-8',
      author: 'Dr. Aric Thorne',
      authorId: 'PBL-A1001',
      format: 'Library Hardbound',
      imprint: 'Veritas Imprint',
      status: 'Published',
      statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      sales: '4,120',
      royalties: '₹2,10,400',
      cover: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=300',
      binding: 'Smyth-Sewn Hardcover',
      paperStock: '80 GSM Smooth Finish',
      typesetting: 'Sabon Lt Std / 10pt',
      cadence: 'Complete (100%)',
      stageNote: 'Active In Library Catalog'
    },
    {
      id: '6',
      title: 'A Quiet Season',
      isbn: '978-93-89528-62-3',
      author: 'Clara E. Harper',
      authorId: 'PBL-A0862',
      format: 'Limited Chapbook',
      imprint: 'Leaf Classics',
      status: 'Archived',
      statusColor: 'bg-gray-200 text-gray-700 border-gray-300',
      sales: '350',
      royalties: '₹12,400',
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=300',
      binding: 'Saddle-Stitched Softcover',
      paperStock: '100 GSM Textured Linen',
      typesetting: 'Adobe Garamond / 11pt',
      cadence: 'Archived Run',
      stageNote: 'Out of Active Print Run'
    }
  ];

  const selectedBook = booksData.find((b) => b.id === selectedBookId) || booksData[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans space-y-6">
      
      {/* --- TOP BREADCRUMB --- */}
      <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase">
        <span>ARCHIVAL DIRECTORY</span>
        <span>/</span>
        <span>VOL. IX</span>
        <span>/</span>
        <span className="text-gray-900 font-bold">MASTER TITLE REGISTER</span>
      </div>

      {/* --- PAGE HEADER & ACTIONS --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Books Catalog
          </h1>
          <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Manage BookLeaf manuscripts, production stages, ISBN allocations, royalties, print runs, and distribution across all literary imprints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 transition shadow-2xs flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Catalog Ledger</span>
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded text-xs font-bold transition shadow-2xs flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register New Manuscript</span>
          </button>
        </div>
      </div>

      {/* --- STAT CARDS GRID (4 METRICS) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 space-y-2 relative">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              TOTAL CATALOG TITLES
            </span>
            <div className="p-1.5 bg-amber-100 rounded border border-amber-200">
              <BookOpen className="w-4 h-4 text-amber-900" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-gray-900">312</span>
            <span className="text-xs text-emerald-700 font-semibold">+18 this Qtr</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Hardcover, Folio & Paperback print editions
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 space-y-2 relative">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              IN PRODUCTION / BINDERY
            </span>
            <div className="p-1.5 bg-amber-100 rounded border border-amber-200">
              <Printer className="w-4 h-4 text-amber-900" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-gray-900">24</span>
            <span className="text-xs text-amber-800 font-semibold">Active Press</span>
          </div>
          <p className="text-[11px] text-gray-500">
            14 interior typesetting, 10 proofs & galleys
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 space-y-2 relative">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              ACTIVE DISTRIBUTION
            </span>
            <div className="p-1.5 bg-amber-100 rounded border border-amber-200">
              <Layers className="w-4 h-4 text-amber-900" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-gray-900">284</span>
            <span className="text-xs text-gray-600 font-mono">91.0%</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Ingram, Amazon Direct & BookLeaf Guild
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 space-y-2 relative">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              CUMULATIVE ROYALTIES
            </span>
            <div className="p-1.5 bg-amber-100 rounded border border-amber-200">
              <TrendingUp className="w-4 h-4 text-amber-900" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-gray-900">₹18,42,850</span>
          </div>
          <p className="text-[11px] text-gray-500">
            FY2025–26 Year-to-Date Accrued Ledger
          </p>
        </div>
      </div>

      {/* --- FILTERS & SEARCH ROW --- */}
      <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or ISBN..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded text-xs text-gray-900 focus:outline-none"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="md:col-span-2">
            <select className="w-full bg-white border border-gray-300 rounded py-2 px-3 text-xs text-gray-700 focus:outline-none">
              <option>All Genres</option>
              <option>Literary Fiction</option>
              <option>Poetry & Essays</option>
              <option>Memoir & Biography</option>
              <option>Philosophy</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select className="w-full bg-white border border-gray-300 rounded py-2 px-3 text-xs text-gray-700 focus:outline-none">
              <option>All Statuses</option>
              <option>In Production</option>
              <option>Published</option>
              <option>Proofing & Galleys</option>
              <option>Archived</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select className="w-full bg-white border border-gray-300 rounded py-2 px-3 text-xs text-gray-700 focus:outline-none">
              <option>All Imprints</option>
              <option>Calm Library</option>
              <option>Quill & Quill</option>
              <option>Calm Press</option>
              <option>Leaf Classics</option>
              <option>Veritas Imprint</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select className="w-full bg-white border border-gray-300 rounded py-2 px-3 text-xs text-gray-700 focus:outline-none">
              <option>Sort: Recently Updated</option>
              <option>Title (A-Z)</option>
              <option>Sales (Highest)</option>
              <option>Royalties (Highest)</option>
            </select>
          </div>
        </div>

        {/* TABS ROW */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200/80">
          {[
            { label: 'ALL TITLES', count: 312 },
            { label: 'PUBLISHED', count: 284 },
            { label: 'IN PRODUCTION', count: 24 },
            { label: 'PROOFING & GALLEYS', count: 10 },
            { label: 'ARCHIVED', count: 4 }
          ].map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                activeTab === tab.label
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* --- MAIN SPLIT LAYOUT (TABLE + RIGHT DETAIL DOSSIER) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT TABLE AREA (8 COLUMNS) */}
        <div className="lg:col-span-8 bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <h3 className="font-serif font-bold text-base text-gray-900">
                Master Folio Registry
              </h3>
            </div>
            <span className="text-[10px] font-mono text-gray-500">
              Showing 1-6 of 312 titles
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300/80 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-2.5 px-3">TITLE & FOLIO INFO</th>
                  <th className="py-2.5 px-3">AUTHOR</th>
                  <th className="py-2.5 px-3">FORMAT / IMPRINT</th>
                  <th className="py-2.5 px-3 text-right">PRODUCTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/80 text-xs">
                {booksData.map((book) => {
                  const isSelected = book.id === selectedBookId;
                  return (
                    <tr
                      key={book.id}
                      onClick={() => setSelectedBookId(book.id)}
                      className={`cursor-pointer transition ${
                        isSelected
                          ? 'bg-amber-100/60 font-medium'
                          : 'hover:bg-[#F2EDE4]'
                      }`}
                    >
                      {/* Title & ISBN */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-8 h-11 object-cover rounded shadow-2xs border border-gray-300"
                          />
                          <div>
                            <span className="font-serif font-bold text-gray-900 block leading-snug">
                              {book.title}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500">
                              ISBN: {book.isbn}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="py-3 px-3">
                        <span className="font-serif font-semibold text-gray-900 block">
                          {book.author}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {book.authorId}
                        </span>
                      </td>

                      {/* Format & Imprint */}
                      <td className="py-3 px-3">
                        <span className="font-serif text-gray-800 block">
                          {book.format}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {book.imprint}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-3 text-right">
                        <span
                          className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${book.statusColor}`}
                        >
                          {book.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* TABLE PAGINATION */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200/80 text-xs">
            <span className="text-gray-500 text-[11px]">Page 1 of 52</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button type="button" className="px-2.5 py-1 bg-black text-white font-bold rounded">
                1
              </button>
              <button type="button" className="px-2.5 py-1 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                2
              </button>
              <button type="button" className="px-2.5 py-1 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                3
              </button>
              <span className="px-1 text-gray-400">...</span>
              <button type="button" className="px-2.5 py-1 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                52
              </button>
              <button
                type="button"
                className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: SELECTED FOLIO DOSSIER (4 COLUMNS) */}
        <div className="lg:col-span-4 bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-200/80 pb-2">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
              SELECTED FOLIO
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              {selectedBook.id} / 312
            </span>
          </div>

          {/* Book Cover & Title Header */}
          <div className="space-y-3">
            <img
              src={selectedBook.cover}
              alt={selectedBook.title}
              className="w-full h-48 object-cover rounded-md border border-gray-300 shadow-xs"
            />
            <div>
              <h3 className="font-serif font-bold text-xl text-gray-900 leading-tight">
                {selectedBook.title}
              </h3>
              <p className="text-xs text-gray-600 font-serif mt-0.5">
                {selectedBook.author}{' '}
                <span className="font-mono text-[10px] text-gray-400">
                  (Author ID: {selectedBook.authorId})
                </span>
              </p>
              <span className="text-[10px] text-amber-900 font-semibold block mt-1">
                Imprint: {selectedBook.imprint}
              </span>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="bg-[#F2EDE4] p-3 rounded border border-gray-300/40 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500">ISBN-13:</span>
              <span className="font-bold text-gray-900">{selectedBook.isbn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Binding:</span>
              <span className="text-gray-900 font-serif font-semibold">{selectedBook.binding}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Paper Stock:</span>
              <span className="text-gray-900 font-serif">{selectedBook.paperStock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Typesetting:</span>
              <span className="text-gray-900 font-serif">{selectedBook.typesetting}</span>
            </div>
          </div>

          {/* Production Cadence Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold uppercase text-[10px] text-gray-400">
                PRODUCTION CADENCE
              </span>
              <span className="font-mono text-xs font-bold text-amber-900">
                {selectedBook.cadence}
              </span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-800 h-full rounded-full transition-all duration-300"
                style={{
                  width: selectedBook.cadence.includes('57%')
                    ? '57%'
                    : selectedBook.cadence.includes('100%')
                    ? '100%'
                    : selectedBook.cadence.includes('28%')
                    ? '28%'
                    : selectedBook.cadence.includes('71%')
                    ? '71%'
                    : '10%'
                }}
              />
            </div>

            <div className="bg-white p-2.5 rounded border border-gray-300/50 flex items-center gap-2 text-xs">
              <FileText className="w-4 h-4 text-amber-800 flex-shrink-0" />
              <div>
                <span className="font-serif font-bold text-gray-900 block leading-tight">
                  {selectedBook.stageNote}
                </span>
                <span className="text-[10px] text-gray-500">
                  Updated 2 days ago by Press Master
                </span>
              </div>
            </div>
          </div>

          {/* Distribution & Yield Metrics */}
          <div className="space-y-1.5">
            <span className="font-bold uppercase text-[10px] text-gray-400 block">
              DISTRIBUTION & YIELD
            </span>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-[#F2EDE4] p-2.5 rounded border border-gray-300/40">
                <span className="text-[9px] text-gray-500 uppercase font-bold block">
                  Total Units Sold
                </span>
                <span className="font-serif font-bold text-lg text-gray-900 block">
                  {selectedBook.sales}
                </span>
                <span className="text-[9px] text-gray-400">Amazon, Ingram & Guild</span>
              </div>

              <div className="bg-[#F2EDE4] p-2.5 rounded border border-gray-300/40">
                <span className="text-[9px] text-gray-500 uppercase font-bold block">
                  Accrued Royalties
                </span>
                <span className="font-serif font-bold text-lg text-gray-900 block">
                  {selectedBook.royalties}
                </span>
                <span className="text-[9px] text-amber-900 font-semibold">
                  Pending Reconciliation
                </span>
              </div>
            </div>
          </div>

          {/* Actionable Ticket Link (If present) */}
          {selectedBook.ticketId && (
            <div className="bg-red-50/80 border border-red-200 p-3 rounded space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-red-900 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                  <span>Active Inquiry: {selectedBook.ticketId}</span>
                </div>
                <span className="text-[9px] bg-red-200 text-red-900 font-bold px-1.5 py-0.5 rounded uppercase">
                  {selectedBook.ticketPriority}
                </span>
              </div>
              <p className="text-[11px] text-red-800 leading-snug">
                {selectedBook.ticketDesc}
              </p>
              <button
                type="button"
                className="text-[11px] font-bold text-red-900 hover:underline flex items-center gap-1"
              >
                <span>View Ticket Workspace</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-gray-200/80">
            <button
              type="button"
              className="w-full py-2.5 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded transition flex items-center justify-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Open Full Production Dossier</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-semibold text-xs rounded transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-3 h-3 text-gray-500" />
                <span>Download CIP Sheet</span>
              </button>
              <button
                type="button"
                className="py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-semibold text-xs rounded transition flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3 h-3 text-gray-500" />
                <span>Log Batch Proof</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BooksCatalog;