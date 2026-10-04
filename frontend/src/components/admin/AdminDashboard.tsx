import {
  Calendar,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
 
  SlidersHorizontal,
  Bot,
  Sparkles
} from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-10 text-gray-800 font-sans space-y-8">
      
      {/* --- TOP BREADCRUMB & HEADER --- */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          EDITORIAL COMMAND / ADMINISTRATION
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">
              Good morning, Tulasi.
            </h1>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">
              Here is what's happening across author support today. <span className="font-semibold text-gray-900">6 CRITICAL</span> tickets require immediate administrative review.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>Today: Oct 03, 2026</span>
            </div>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded text-xs font-semibold text-gray-700 shadow-2xs transition"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>EXPORT DAILY REPORT</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-gray-800 text-white rounded text-xs font-semibold shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>CREATE NEW TICKET</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- STAT CARDS GRID --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Card 1 */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">OPEN TICKETS</span>
            <span className="p-1 bg-gray-200/60 rounded text-gray-600">📋</span>
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-gray-900">48</span>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 mt-1 font-semibold">
              <ArrowDownRight className="w-3 h-3" />
              <span>-12% vs yesterday</span>
            </div>
          </div>
        </div>

        {/* Card 2 - Critical Highlight */}
        <div className="bg-[#FFF0F0] border border-red-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider bg-red-100 px-1.5 py-0.5 rounded">
              CRITICAL
            </span>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-red-900">6</span>
            <div className="flex items-center gap-1 text-[10px] text-red-700 mt-1 font-semibold">
              <ArrowUpRight className="w-3 h-3" />
              <span>2 over SLA limit</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">UNASSIGNED</span>
            <span className="p-1 bg-amber-100/60 rounded text-amber-800">⏳</span>
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-gray-900">12</span>
            <div className="flex items-center gap-1 text-[10px] text-amber-800 mt-1 font-semibold">
              <span>Requires triage assignment</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">IN PROGRESS</span>
            <span className="p-1 bg-blue-100/60 rounded text-blue-800">⚙️</span>
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-gray-900">19</span>
            <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
              <span>Active in desk investigation</span>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">RESOLVED TODAY</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-gray-900">27</span>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 mt-1 font-semibold">
              <ArrowUpRight className="w-3 h-3" />
              <span>+84% success rate</span>
            </div>
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">AVG RESPONSE TIME</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-gray-900">2h 18m</span>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 mt-1 font-semibold">
              <ArrowDownRight className="w-3 h-3" />
              <span>18m faster than SLA</span>
            </div>
          </div>
        </div>

      </div>

      {/* --- TICKETS REQUIRING ATTENTION --- */}
      <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <h2 className="font-serif font-bold text-xl text-gray-900">
              Tickets Requiring Attention
            </h2>
            <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              HIGH PRIORITY QUEUE
            </span>
          </div>
          <span className="text-[11px] text-gray-500">Auto-prioritized by SLA & Escalation level</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-2.5 px-3">PRIORITY</th>
                <th className="py-2.5 px-3">TICKET TITLE</th>
                <th className="py-2.5 px-3">AUTHOR</th>
                <th className="py-2.5 px-3">CATEGORY</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3">ASSIGNED TO</th>
                <th className="py-2.5 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 font-medium">
              
              {/* Row 1 */}
              <tr className="hover:bg-[#F2EDE4] transition">
                <td className="py-3 px-3">
                  <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                    CRITICAL
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="font-bold text-gray-900">Royalty payment missing for Q3</div>
                  <div className="text-[10px] font-mono text-gray-400">TKT-10892</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-gray-900">Riya Sharma</div>
                  <div className="text-[10px] text-gray-500">riya.sharma@author.press</div>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] px-2 py-0.5 rounded font-semibold">
                    Royalty & Payments
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-red-700 font-bold text-[11px]">2 hours ago</span>
                  <div className="text-[10px] text-red-600 italic">SLA Overdue</div>
                </td>
                <td className="py-3 px-3 text-gray-500 italic">
                  Unassigned
                </td>
                <td className="py-3 px-3 text-right">
                  <button type="button" className="px-3 py-1 bg-black text-white rounded text-[11px] font-semibold hover:bg-gray-800 transition">
                    Open
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-[#F2EDE4] transition">
                <td className="py-3 px-3">
                  <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                    CRITICAL
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="font-bold text-gray-900">Bound foil debossing defective on 250 hardcovers</div>
                  <div className="text-[10px] font-mono text-gray-400">TKT-10884</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-gray-900">Vikram Joshi</div>
                  <div className="text-[10px] text-gray-500">vikram.j@literary.com</div>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-gray-200 text-gray-800 text-[10px] px-2 py-0.5 rounded font-semibold">
                    Printing & Quality
                  </span>
                </td>
                <td className="py-3 px-3 text-gray-600">
                  <span>3 hours ago</span>
                  <div className="text-[10px] text-gray-400">In review</div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5 text-gray-900 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">TS</span>
                    <span>Tulas Shukla</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <button type="button" className="px-3 py-1 bg-white border border-gray-300 text-gray-800 rounded text-[11px] font-semibold hover:bg-gray-100 transition">
                    In Triage
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-[#F2EDE4] transition">
                <td className="py-3 px-3">
                  <span className="bg-amber-600 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                    HIGH
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="font-bold text-gray-900">Ingram distribution feed metadata mismatch</div>
                  <div className="text-[10px] font-mono text-gray-400">TKT-10878</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-gray-900">Ananya Sen</div>
                  <div className="text-[10px] text-gray-500">ananya.s@writer.co</div>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-blue-100 text-blue-900 text-[10px] px-2 py-0.5 rounded font-semibold">
                    ISBN & Metadata Issue
                  </span>
                </td>
                <td className="py-3 px-3 text-gray-600">
                  <span>5 hours ago</span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5 text-gray-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] flex items-center justify-center font-bold">DG</span>
                    <span>Devrat Grover</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <button type="button" className="px-3 py-1 bg-black text-white rounded text-[11px] font-semibold hover:bg-gray-800 transition">
                    Open
                  </button>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-[#F2EDE4] transition">
                <td className="py-3 px-3">
                  <span className="bg-amber-600 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                    HIGH
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="font-bold text-gray-900">Typesetting drop-caps overlapping chapter titles</div>
                  <div className="text-[10px] font-mono text-gray-400">TKT-10870</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-gray-900">Karan Jain</div>
                  <div className="text-[10px] text-gray-500">karan.j@musescape.net</div>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-purple-100 text-purple-900 text-[10px] px-2 py-0.5 rounded font-semibold">
                    Book Design & Production
                  </span>
                </td>
                <td className="py-3 px-3 text-gray-600">
                  <span>6 hours ago</span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5 text-gray-900 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">TS</span>
                    <span>Tulasi Shukla</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <button type="button" className="px-3 py-1 bg-white border border-gray-300 text-gray-800 rounded text-[11px] font-semibold hover:bg-gray-100 transition">
                    Working
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* --- MIDDLE SECTION: TWO COLUMNS (CHARTS & TRIAGE) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Category Breakdown */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase block">ANALYTICS & VOLUME</span>
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Category Volume Breakdown
              </h3>
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase">Past 30 Days</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
            {/* Donut Chart Visual Representation */}
            <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-amber-800"
                  strokeWidth="4"
                  strokeDasharray="35, 100"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-gray-800"
                  strokeWidth="4"
                  strokeDasharray="25, 100"
                  strokeDashoffset="-35"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-500"
                  strokeWidth="4"
                  strokeDasharray="20, 100"
                  strokeDashoffset="-60"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600"
                  strokeWidth="4"
                  strokeDasharray="20, 100"
                  strokeDashoffset="-80"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-serif font-bold text-gray-900 block">642</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-wider block">TOTAL TICKETS</span>
              </div>
            </div>

            {/* Category Breakdown List */}
            <div className="space-y-2 w-full text-xs font-medium">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-800"></span>
                  <span>Royalty & Payments</span>
                </div>
                <span className="font-bold font-mono">189</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-800"></span>
                  <span>Printing & Quality</span>
                </div>
                <span className="font-bold font-mono">152</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>ISBN & Metadata</span>
                </div>
                <span className="font-bold font-mono">118</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  <span>Book Design & Production</span>
                </div>
                <span className="font-bold font-mono">109</span>
              </div>

              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span>Distribution & Channels</span>
                </div>
                <span className="font-bold font-mono text-gray-800">42</span>
              </div>

              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span>General Inquiries</span>
                </div>
                <span className="font-bold font-mono text-gray-800">32</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 italic pt-2 border-t border-gray-200/80">
            Printing & Quality issue reporting increased +18% following recent press expansion.
          </div>
        </div>

        {/* Right Column: Triage Progression */}
        <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase block">OPERATIONAL PERFORMANCE</span>
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Triage Progression & SLA Status
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              98.2% SLA Compliance
            </span>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-800">1. Fast-Track (Instant)</span>
                <span className="font-bold font-mono">32 Tickets</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-black h-full rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-800">2. Desk-Assigned Desk Review</span>
                <span className="font-bold font-mono">19 Tickets</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-700 h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-800">3. Resolved & Dispatched Today</span>
                <span className="font-bold font-mono">27 Tickets</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-700 h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>

          {/* SLA Performance Box */}
          <div className="bg-[#F2EDE4] p-4 rounded-md border border-gray-300/50 grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="text-[9px] text-gray-400 font-bold uppercase block">FIRST ACTION</span>
              <span className="font-serif font-bold text-base text-gray-900 block">1e 01m</span>
              <span className="text-[9px] text-emerald-800 font-semibold">Target: &lt;15m</span>
            </div>
            <div className="border-x border-gray-300/60 px-2">
              <span className="text-[9px] text-gray-400 font-bold uppercase block">RESOLUTION</span>
              <span className="font-serif font-bold text-base text-gray-900 block">2h 18m</span>
              <span className="text-[9px] text-emerald-800 font-semibold">Target: &lt;4h</span>
            </div>
            <div>
              <span className="text-[9px] text-gray-400 font-bold uppercase block">SATISFACTION</span>
              <span className="font-serif font-bold text-base text-gray-900 block">4.93 / 5</span>
              <span className="text-[9px] text-gray-500">41 Ratings</span>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 italic">
            Prioritization algorithms active for tickets coming in via main portal and email API.
          </div>
        </div>

      </div>

      {/* --- RECENT TICKETS TABLE --- */}
      <div className="bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-xl text-gray-900">Recent Tickets</h3>
            <span className="text-[10px] font-mono text-gray-500">ALL DEPARTMENTS</span>
          </div>
          
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-black"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>STREAM LOG SHOW ALL (48)</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-2.5 px-3">FOLIO ID</th>
                <th className="py-2.5 px-3">SUBJECT MATTER</th>
                <th className="py-2.5 px-3">AUTHOR</th>
                <th className="py-2.5 px-3">CATEGORY</th>
                <th className="py-2.5 px-3">PRIORITY</th>
                <th className="py-2.5 px-3">STAGE</th>
                <th className="py-2.5 px-3">CREATED</th>
                <th className="py-2.5 px-3">ASSIGNEE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 font-medium">
              
              {/* Row 1 */}
              <tr className="hover:bg-[#F2EDE4] transition">
                <td className="py-3 px-3 font-mono font-semibold text-gray-900">#FL - 2472</td>
                <td className="py-3 px-3 font-semibold text-gray-900">ePub reflowable chapter page break failure</td>
                <td className="py-3 px-3 text-gray-700">Marcus Thorne</td>
                <td className="py-3 px-3">
                  <span className="bg-purple-100 text-purple-900 text-[10px] px-2 py-0.5 rounded font-semibold">
                    Book Design & Production
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded font-semibold">Medium</span>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">Open</span>
                </td>
                <td className="py-3 px-3 text-gray-500">11m ago</td>
                <td className="py-3 px-3 text-gray-400 italic">Unassigned</td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-[#F2EDE4] transition">
                <td className="py-3 px-3 font-mono font-semibold text-gray-900">#FL - 2471</td>
                <td className="py-3 px-3 font-semibold text-gray-900">Design proof change request for hardbound dust jacket</td>
                <td className="py-3 px-3 text-gray-700">Victoria R. Vance</td>
                <td className="py-3 px-3">
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] px-2 py-0.5 rounded font-semibold">
                    General Inquiry
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-gray-200 text-gray-800 text-[10px] px-2 py-0.5 rounded font-semibold">Low</span>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Assigned</span>
                </td>
                <td className="py-3 px-3 text-gray-500">31m ago</td>
                <td className="py-3 px-3 text-gray-800 font-semibold">Marcus Vance</td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-[#F2EDE4] transition">
                <td className="py-3 px-3 font-mono font-semibold text-gray-900">#FL - 2470</td>
                <td className="py-3 px-3 font-semibold text-gray-900">Author loyalty statement for 2nd edition print run</td>
                <td className="py-3 px-3 text-gray-700">Felix Tan-Morales</td>
                <td className="py-3 px-3">
                  <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded font-semibold">
                    Royalty & Payments
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded font-semibold">Medium</span>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold uppercase">In Progress</span>
                </td>
                <td className="py-3 px-3 text-gray-500">1h ago</td>
                <td className="py-3 px-3 text-gray-800 font-semibold">
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-black text-white text-[9px] flex items-center justify-center font-bold">TS</span>
                    <span>Tulasi Shukla</span>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-[#F2EDE4] transition">
                <td className="py-3 px-3 font-mono font-semibold text-gray-900">#FL - 2469</td>
                <td className="py-3 px-3 font-semibold text-gray-900">Wholesale seller discount order invoice reprint</td>
                <td className="py-3 px-3 text-gray-700">Lionel M. Chen</td>
                <td className="py-3 px-3">
                  <span className="bg-blue-100 text-blue-900 text-[10px] px-2 py-0.5 rounded font-semibold">
                    Distribution & Channels
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded font-semibold">Medium</span>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">Open</span>
                </td>
                <td className="py-3 px-3 text-gray-500">2h ago</td>
                <td className="py-3 px-3 text-gray-400 italic">Unassigned</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* --- BOTTOM BANNER: AUTONOMIC TRIAGE ASSISTANT --- */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2B2B2B] text-white rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif font-bold text-base">Autonomic Triage Assistant is active.</h4>
              <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider">
                System Normal
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              14 tickets auto-routed, 3 critical alerts dispatched to managing editor team today.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            className="px-3 py-2 bg-transparent hover:bg-white/10 text-xs font-semibold text-gray-300 rounded border border-gray-700 transition"
          >
            VIEW BOT LOGS
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-black text-xs font-bold rounded flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>RUN AUTONOMIC SWEEP</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;