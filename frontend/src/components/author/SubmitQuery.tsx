import React, { useState } from 'react';
import {
  Send,
  Upload,
  ChevronDown,
  Paperclip,
  X,
  Lock,
  Globe,
  HelpCircle,
  FileText,
  PhoneCall,
  CheckCircle2,
  Clock,
  Sparkles,
  Eye
} from 'lucide-react';

const SubmitQuery = () => {
  const [selectedBook, setSelectedBook] = useState(
    'The Art of Starting Again (ISBN 978-93-89324-45-6) - In Prod'
  );
  const [category, setCategory] = useState('Royalty & Payout Timelines');
  const [subject, setSubject] = useState('Royalty payment not received for Q3');
  const [description, setDescription] = useState(
    'I published my book 4 months ago and still haven\'t received any royalty payout. My dashboard shows over 420 copies sold between paperback and Kindle versions. Can someone please clarify the payout timeline?'
  );
  const [attachedFile, setAttachedFile] = useState({
    name: 'screenshot_royalty_dashboard.png',
    size: '360 KB • Image Proof Attached',
  });

  const categories = [
    'Royalty & Payout Timelines',
    'Typesetting & Layout Formatting',
    'Cover Embossing & Foil Proofs',
    'ISBN & Legal Deposit Filing',
    'Author Copies & Distribution Logistics',
  ];

  const faqItems = [
    {
      q: 'When are quarterly royalties disbursed?',
      a: 'Quarterly disbursements are processed within 15 business days following the end of each calendar quarter (Q1: April 15, Q2: July 15, Q3: Oct 15, Q4: Jan 15).',
    },
    {
      q: 'Can I adjust cover foil embossing after printing?',
      a: 'Minor foil debossing adjustments can be requested before final bindery runs. Contact your lead editor directly or log an urgent request.',
    },
    {
      q: 'How do I order discounted author copies?',
      a: 'Authors receive a permanent 40% discount on all direct print runs from the Bookleaf portal. Navigate to your Book Detail page to place a print order.',
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- TOP BREADCRUMB & BANNER --- */}
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-semibold text-gray-900">Submit Support Query</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded">
              DOCKET NO. DISPATCH-FO
            </span>
            <span>• Registry Active</span>
          </div>
        </div>

        {/* --- HEADER HERO --- */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 lg:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>EDITORIAL CHAMBER DISPATCH</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 leading-tight">
              How can we help with your book?
            </h1>
            <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
              Tell us what you need, and our publishing team and dedicated managing editor will review your folio promptly.
            </p>
          </div>

          {/* Decorative Globe Illustration Overlay */}
          <div className="w-28 h-28 opacity-15 pointer-events-none absolute right-4 bottom-2 text-gray-900">
            <Globe className="w-full h-full stroke-[1]" />
          </div>
        </div>

        {/* --- FORM & SIDEBAR GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT FORM COLUMN (7 COLUMNS) --- */}
          <div className="lg:col-span-7 bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 lg:p-8 space-y-6">
            
            {/* Field 1: Select Book */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-900">
                  1. Which book is this inquiry about? <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] font-mono text-gray-400">ISBN Auto-matched</span>
              </div>
              <div className="relative">
                <select
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:outline-none focus:ring-1 focus:ring-black appearance-none pr-10"
                >
                  <option>The Art of Starting Again (ISBN 978-93-89324-45-6) - In Prod</option>
                  <option>The Silent Shore (ISBN 978-93-89324-12-8) - Published</option>
                  <option>Meditations on Quietude (ISBN 978-93-89324-99-1) - Published</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Field 2: Category Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-900">
                  2. Category / Auto-routing classification
                </label>
                <span className="text-[10px] text-gray-400 font-medium">Assigned Desk</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {categories.map((cat) => {
                  const isSelected = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                        isSelected
                          ? 'bg-black text-white'
                          : 'bg-[#F2EDE4] text-gray-700 hover:bg-gray-200 border border-gray-300/50'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 3: Subject Line */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-900">
                  3. Subject Line
                </label>
                <span className="text-[10px] text-gray-400">Concise summary</span>
              </div>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your query..."
                className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Field 4: Detailed Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-900">
                  4. Detailed Description
                </label>
                <span className="text-[10px] font-mono text-gray-400">
                  {description.length} Characters (Min 50 required)
                </span>
              </div>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe your query with details like page numbers, transaction IDs, or layout specs..."
                className="w-full bg-white border border-gray-300 rounded p-3.5 text-xs text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-black resize-y"
              />
              <p className="text-[10px] text-gray-400 italic">
                Cite relevant ledger dates, Folio Colophon, or spec IDs for faster editorial team resolution.
              </p>
            </div>

            {/* Field 5: Attachment Upload Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-900">
                  5. Manuscript Excerpts or Reference Proofs
                </label>
                <span className="text-[10px] font-mono text-gray-400">PDF, DOCX, PNG up to 20MB</span>
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-gray-300 hover:border-gray-400 bg-white/60 rounded-lg p-6 text-center space-y-2 cursor-pointer transition">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-500">
                  <Upload className="w-4 h-4" />
                </div>
                <div className="text-xs font-medium text-gray-800">
                  Drag manuscript sheets, statements, or browse files
                </div>
                <div className="text-[10px] text-gray-400">
                  Acceptable archival documents include book proofs, printer markups, and sales ledgers.
                </div>
              </div>

              {/* Attached File Pill */}
              {attachedFile && (
                <div className="bg-[#F2EDE4] border border-gray-300/60 rounded p-2.5 flex items-center justify-between text-xs mt-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Paperclip className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {attachedFile.name}
                      </div>
                      <div className="text-[10px] text-gray-500">{attachedFile.size}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <button type="button" className="hover:text-gray-900" title="Preview">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      className="hover:text-red-600"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Form Action Buttons */}
            <div className="pt-4 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition"
              >
                Cancel / Return to Dashboard
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-black hover:bg-gray-800 text-white rounded text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Editorial Query</span>
              </button>
            </div>

          </div>

          {/* --- RIGHT SIDEBAR COLUMN (5 COLUMNS) --- */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Assigned Editorial Desk Card */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3 border-b border-gray-200/80 pb-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  ASSIGNED EDITORIAL DESK
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded">
                  Senior Desk
                </span>
              </div>

              <div className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Alistair Vance"
                  className="w-12 h-12 rounded object-cover border border-gray-300"
                />
                <div>
                  <h4 className="font-serif font-bold text-base text-gray-900">
                    Alistair Vance
                  </h4>
                  <p className="text-xs text-gray-500">Lead Managing Editor • Fiction & Philosophy</p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span>Avg. response time: 3 hrs 45 mins</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-[#F2EDE4] p-3 rounded text-xs text-gray-700 italic border border-gray-300/40">
                "Every submission receives personal inspection from editorial leads. If this concern is Q3 payouts, our accounts ledger reconciles on the 15th of each fiscal month."
              </div>
            </div>

            {/* Before You Submit Instructions */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-amber-800" />
                <h4 className="font-serif font-bold text-sm text-gray-900">
                  Before You Submit
                </h4>
              </div>

              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Specific questions receive faster resolutions from our editorial team. Review your materials:
              </p>

              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span><strong>Mention exact page numbers</strong> or chapter titles for formatting corrections.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span><strong>Verify your book IFSC</strong> and routing code in the Account Tab for royalty queries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span><strong>Provide 300 DPI assets</strong> if uploading replacement jacket cover proofs.</span>
                </li>
              </ul>
            </div>

            {/* Folio Knowledge Base (Accordion FAQ) */}
            <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5">
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-3 mb-3">
                <h4 className="font-serif font-bold text-sm text-gray-900">
                  Folio Knowledge Base
                </h4>
                <span className="text-[10px] font-mono text-gray-400">Frequently Resolved</span>
              </div>

              <div className="space-y-2">
                {faqItems.map((item, idx) => (
                  <div key={idx} className="bg-[#F2EDE4] rounded border border-gray-300/40 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-3 text-left text-xs font-semibold text-gray-900 flex items-center justify-between gap-2"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-gray-500 transition-transform ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-3 pb-3 text-xs text-gray-600 border-t border-gray-300/30 pt-2 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Author Hotline */}
            <div className="bg-[#EFEAE1] border border-gray-300/80 rounded-lg p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-black text-amber-400 rounded">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-xs text-gray-900">Priority Author Hotline</h5>
                  <p className="text-[10px] text-gray-500">Urgent manuscript & print halts</p>
                </div>
              </div>

              <a
                href="tel:+918000005323"
                className="px-3 py-1.5 bg-white border border-gray-300 text-gray-900 font-mono text-xs font-bold rounded shadow-2xs hover:bg-gray-50 transition"
              >
                +91 (800) BOOK-LEAF
              </a>
            </div>

          </div>

        </div>

        {/* --- FOOTER NOTICE & QUEUE METRIC --- */}
        <div className="pt-4 border-t border-gray-200/80 space-y-4">
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span>
              Queries are encrypted and permanently recorded under your Author Folio (#BL-89324) for archival stewardship.
            </span>
          </div>

          <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded border border-gray-200 text-gray-700">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-semibold text-xs text-gray-900">Current Editorial Chamber Queue</h5>
                <p className="text-[11px] text-gray-500">
                  14 queries active today across all publishing projects. 98.1% addressed within standard SLA.
                </p>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="text-lg font-serif font-bold text-gray-900 block">1.8 hrs</span>
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Median Resolution</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubmitQuery;