import {
  HelpCircle,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  Clock,
  Circle,
  FileText,
  Download,
  Lock,
  BookOpen,
  Sparkles
} from 'lucide-react';

const BookDetail = () => {
  const publicationStages = [
    {
      stage: '01',
      title: 'Manuscript Acceptance & Legal Clearance',
      description: 'Folio contract executed, copyright registration assigned.',
      status: 'completed',
      date: 'Completed Aug 12',
    },
    {
      stage: '02',
      title: 'Substantive Line Editing',
      description: 'Editorial notes resolved with Lead Editor Alistair Vance.',
      status: 'completed',
      date: 'Completed Sep 04',
    },
    {
      stage: '03',
      title: 'Cover Illustration & Foil Typography',
      description: 'Debossing plate created, spine measurement verified.',
      status: 'completed',
      date: 'Completed Sep 28',
    },
    {
      stage: '04',
      title: 'Interior Typesetting & Proof Galleys',
      description: 'Applying Caslon Pro layout, deep text margins, drop caps, and chapter titles. Galleys generating.',
      status: 'active',
      date: 'Est. Completion: Nov 04',
      meta: 'Typesetter: Marcus Thorne • Est. Completion: Nov 04',
    },
    {
      stage: '05',
      title: 'Author Final Galley Sign-Off',
      description: 'Digital author approval benchmark.',
      status: 'upcoming',
      date: 'Scheduled Nov 08',
    },
    {
      stage: '06',
      title: 'Bindery Run & Foil Debossing',
      description: '500 GSM Natural Mūken spine run in hardbound catalog.',
      status: 'upcoming',
      date: 'Scheduled Nov 18',
    },
    {
      stage: '07',
      title: 'Global Distribution & Escrow Settlement',
      description: 'Ingram, Amazon Direct fulfillment & escrow release.',
      status: 'upcoming',
      date: 'Launch: Nov 28',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- TOP BANNER / HEADER --- */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-orange-100 text-orange-800 border border-orange-200 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                IN PRODUCTION
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Milestone: Stage 04 Interior Typesetting
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs font-mono text-gray-500">
                ISBN 978-93-89324-45-6
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 tracking-tight">
              The Art of Starting Again
            </h1>

            <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
              A reflective philosophical inquiry into renewal, cyclical beginnings, and contemporary stillness. Bound in natural cloth Octavo with foil stamped typography.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-[#1C1A17] hover:bg-black text-white rounded-md text-xs font-medium transition shadow-sm">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <div className="font-semibold leading-tight">Raise Query</div>
                <div className="text-[10px] text-gray-400 leading-none">About This Book</div>
              </div>
            </button>

            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-[#F2EDE4] hover:bg-[#EAE4D8] border border-gray-300/80 text-gray-900 rounded-md text-xs font-medium transition">
              <ShoppingBag className="w-4 h-4 text-gray-700" />
              <div className="text-left">
                <div className="font-semibold leading-tight">Order Author Copies</div>
                <div className="text-[10px] text-amber-800 font-bold leading-none">(40% OFF)</div>
              </div>
            </button>
          </div>
        </div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT COLUMN (COVER, COLOPHON, VAULT) --- */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Archival Cover Mockup */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                <span>ARCHIVAL COVER MOCKUP</span>
                <span className="text-gray-600 font-mono text-[10px]">Silkscreen Spine</span>
              </div>

              <div className="relative rounded overflow-hidden shadow-md border border-gray-300/60 aspect-[3/4] bg-gray-900 group">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"
                  alt="The Art of Starting Again Book Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-xs text-white p-3 rounded flex items-center justify-between">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">EMBOSSED SPEC NO. 07</div>
                    <div className="text-xs font-serif font-semibold">Talcum Gold Foil Finish</div>
                  </div>
                  <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded">
                    PROOFS APPROVED
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 mt-4 pt-3 border-t border-gray-200/80">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Typeset Spec: 11.5 / 16pt Garamond Premier</span>
                </div>
                <button className="text-gray-900 font-semibold hover:underline text-[11px] flex items-center gap-1">
                  <span>View Proof Sheets</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Folio Colophon */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-3 mb-4">
                <div className="flex items-center gap-2 font-serif font-bold text-gray-900 text-base">
                  <BookOpen className="w-4 h-4 text-amber-800" />
                  <span>Folio Colophon</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">Press Reg. No. 310318</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-gray-200/40">
                  <span className="text-gray-500">Author</span>
                  <span className="font-serif font-bold text-gray-900 text-sm">Riya Sharma</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-200/40">
                  <span className="text-gray-500">10-Digit & 13-Digit ISBN</span>
                  <span className="font-mono text-gray-800 font-medium">978-93-89324-45-6</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-200/40">
                  <span className="text-gray-500">Genre</span>
                  <span className="font-medium text-gray-800 bg-[#F2EDE4] px-2 py-0.5 rounded text-[11px]">
                    Self-Help / Essays
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-200/40">
                  <span className="text-gray-500">Publication Date</span>
                  <span className="font-medium text-gray-900">November 28, 2025</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-200/40">
                  <span className="text-gray-500">Print Format</span>
                  <span className="font-medium text-gray-900">Hardcover w/ Flaps & POD</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-200/40">
                  <span className="text-gray-500">Volume / Format</span>
                  <span className="font-medium text-gray-900">248 Pages • 5.5" x 8.5" Octavo</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-200/40">
                  <span className="text-gray-500">Paper Stock</span>
                  <span className="font-medium text-gray-800 bg-[#F2EDE4] px-2 py-0.5 rounded text-[11px]">
                    80 GSM Natural Mūken Bond
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500">Lead Managing Editor</span>
                  <span className="font-serif font-semibold text-gray-900">Alistair Vance</span>
                </div>
              </div>
            </div>

            {/* Manuscript Legal Vault */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  MANUSCRIPT LEGAL VAULT
                </span>
                <Lock className="w-3.5 h-3.5 text-gray-400" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded hover:border-gray-300 transition group cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-amber-800" />
                    <div>
                      <div className="text-xs font-semibold text-gray-800 group-hover:underline">
                        Proofreading Codex Key.pdf
                      </div>
                      <div className="text-[10px] text-gray-400">Annotated layout guidelines • 1.4 MB</div>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700" />
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded hover:border-gray-300 transition group cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-emerald-800" />
                    <div>
                      <div className="text-xs font-semibold text-gray-800 group-hover:underline">
                        Pre-order Escrow Agreement.pdf
                      </div>
                      <div className="text-[10px] text-gray-400">Executed via Digilock Seal • 840 KB</div>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700" />
                </div>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN (COMMERCIAL YIELD & PUBLICATION CHRONICLE) --- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Commercial Yield / Sales & Royalty Ledger */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    COMMERCIAL YIELD
                  </span>
                  <h2 className="text-xl font-serif font-bold text-gray-900">
                    Sales & Royalty Ledger
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Official List MSRP: </span>
                  <span className="font-serif font-bold text-gray-900 text-lg">₹699.00</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-[#F2EDE4] p-3.5 rounded border border-gray-300/40">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    PRE-ORDERS SOLD
                  </div>
                  <div className="text-2xl font-serif font-bold text-gray-900 mt-1">
                    324
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Copies Reserved</div>
                </div>

                <div className="bg-[#F2EDE4] p-3.5 rounded border border-gray-300/40">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    ROYALTY ACCRUED
                  </div>
                  <div className="text-2xl font-serif font-bold text-gray-900 mt-1">
                    ₹18,450
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Gross Yield</div>
                </div>

                <div className="bg-[#F2EDE4] p-3.5 rounded border border-gray-300/40">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    DISBURSED
                  </div>
                  <div className="text-2xl font-serif font-bold text-gray-900 mt-1">
                    ₹10,000
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium mt-0.5">NEFT Settled</div>
                </div>

                <div className="bg-amber-100/60 p-3.5 rounded border border-amber-200/80">
                  <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                    PENDING RELEASE
                  </div>
                  <div className="text-2xl font-serif font-bold text-amber-900 mt-1">
                    ₹8,450
                  </div>
                  <div className="text-[10px] text-amber-800 font-medium mt-0.5">Scheduled Nov 12</div>
                </div>
              </div>

              {/* Breakdown Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>Pre-order Distribution by Channel</span>
                  <span className="font-mono">324 Units Total</span>
                </div>
                
                {/* Progress Visual */}
                <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden flex">
                  <div className="bg-gray-900 h-full w-[55%]" title="Amazon Direct (180 copies)" />
                  <div className="bg-amber-700 h-full w-[28%]" title="Bookleaf Store (94 copies)" />
                  <div className="bg-amber-400 h-full w-[17%]" title="Kindle Pre-orders (50 copies)" />
                </div>

                <div className="flex items-center gap-4 text-[11px] text-gray-600 pt-1 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-900" />
                    <span>Amazon Direct (180 copies)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-700" />
                    <span>Bookleaf Store (94 copies)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Kindle Pre-order (50 copies)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Production Ledger / Chronicle of Publication */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    PRODUCTION LEDGER
                  </span>
                  <h2 className="text-xl font-serif font-bold text-gray-900">
                    Chronicle of Publication
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-gray-900 block">Stage 4 of 7 Active</span>
                  <span className="text-[11px] text-gray-500">Target Release: Nov 28</span>
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {publicationStages.map((item, idx) => {
                  const isCompleted = item.status === 'completed';
                  const isActive = item.status === 'active';

                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Timeline Node Icon */}
                      <div className="absolute -left-6 translate-x-[-2px] bg-[#F8F5EE] py-0.5">
                        {isCompleted && (
                          <CheckCircle2 className="w-5 h-5 text-gray-900 fill-gray-900 stroke-white" />
                        )}
                        {isActive && (
                          <Clock className="w-5 h-5 text-orange-600 fill-orange-100 animate-pulse" />
                        )}
                        {!isCompleted && !isActive && (
                          <Circle className="w-5 h-5 text-gray-300 fill-gray-100" />
                        )}
                      </div>

                      {/* Content Card */}
                      <div
                        className={`flex-1 p-4 rounded-md border transition ${
                          isActive
                            ? 'bg-amber-50/70 border-amber-300/80 shadow-xs'
                            : isCompleted
                            ? 'bg-white/60 border-gray-200/60'
                            : 'bg-transparent border-dashed border-gray-300 opacity-60'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-gray-400">
                              Stage {item.stage}
                            </span>
                            {isActive && (
                              <span className="bg-orange-200 text-orange-900 font-bold text-[9px] px-1.5 py-0.5 rounded tracking-wide uppercase">
                                ACTIVE WORKBENCH
                              </span>
                            )}
                            <h3 className="font-serif font-bold text-base text-gray-900">
                              {item.title}
                            </h3>
                          </div>
                          <span
                            className={`text-[11px] font-medium whitespace-nowrap ${
                              isCompleted
                                ? 'text-gray-500'
                                : isActive
                                ? 'text-orange-900 font-bold'
                                : 'text-gray-400'
                            }`}
                          >
                            {item.date}
                          </span>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed">
                          {item.description}
                        </p>

                        {item.meta && (
                          <div className="mt-2 pt-2 border-t border-amber-200/60 text-[11px] font-medium text-amber-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>{item.meta}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default BookDetail;