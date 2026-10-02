
 import { Feather, BookOpen, ShieldCheck } from 'lucide-react';
import butterflyImg from '../assets/butterfly.png';

const Home = () => {
  return (
    <section className="relative w-full bg-[#faf7f0] text-[#2c2825] min-h-[500px] flex flex-col items-center justify-center px-6 py-20 overflow-hidden font-sans">

      {/* Full Screen Width & Height Butterfly Background Image */}
      <img
        src={butterflyImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-35 select-none"
        aria-hidden="true"
      />

      {/* Background Subtle Constellation / Dot Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#8c6d48_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Very Soft Vignette / Center Glow */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(250,247,240,0.05)_0%,rgba(250,247,240,0.45)_100%)]"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Top Tag / Badge */}
        <div className="inline-flex items-center gap-2 bg-[#f3ecdf]/80 backdrop-blur-sm border border-[#dfd5c3] px-4 py-1.5 rounded-full text-[11px] font-semibold text-[#8c7457] tracking-wider uppercase mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9c6a3a]"></span>

          <span>
            THE BOOKLEAF ATELIER • ESSAY & CHRONICLE
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1c1917] tracking-tight leading-tight mb-6">
          We believe stories should{' '}
          <span className="italic font-normal text-[#9c6a3a]">
            travel.
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="max-w-2xl text-base sm:text-lg text-[#6e6357] font-normal leading-relaxed mb-10">
          From an author’s imagination to a reader’s hands, every book has a sacred
          journey. BookLeaf was founded on a simple conviction: that self-publishing
          should never mean solitary publishing.
        </p>

        {/* Info Pill Badge Container */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-[#f3ecdf]/85 backdrop-blur-sm border border-[#dfd5c3] px-6 py-2.5 rounded-full text-xs font-medium text-[#6e6357] shadow-sm">

          {/* Item 1 */}
          <div className="flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-[#9c6a3a]" />
            <span>Established in 2021</span>
          </div>

          <span className="text-[#c5b9a8] hidden sm:inline">
            •
          </span>

          {/* Item 2 */}
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#9c6a3a]" />
            <span>4,200+ Registered Folios</span>
          </div>

          <span className="text-[#c5b9a8] hidden sm:inline">
            •
          </span>

          {/* Item 3 */}
          <div className="flex items-center gap-1.5 text-[#1c1917] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#9c6a3a]" />
            <span>100% Author Sovereignty</span>
          </div>

        </div>

      </div>

      {/* Bottom Separator Line */}
      <div className="w-full max-w-5xl mt-20 border-b border-[#e2d7c5] relative z-10" />

    </section>
  );
};

export default Home;