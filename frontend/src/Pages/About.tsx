import { Feather } from 'lucide-react';

import book from '../assets/book.png';

const BOOK_IMAGE_URL = book;

const About = () => {
  return (
    <section className="relative w-full bg-[#f6f2ea] text-[#2c2825] font-sans overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">

        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col px-5 md:px-10 lg:px-0 py-8 md:py-10">

          <div>

            {/* Chapter Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#a09383] uppercase whitespace-nowrap">
                CHAPTER I • ATELIER FOUNDATIONS
              </span>

              <div className="h-[1px] bg-[#dcd3c5] flex-grow"></div>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#1c1917] tracking-tight leading-[1.15] mb-5">
              The Dignity of the Printed Word
            </h2>

            {/* Paragraph 1 */}
            <p className="text-base sm:text-lg text-[#524a42] leading-relaxed mb-4 font-normal">
              In an era where literature is too frequently reduced to algorithms and
              ephemeral feeds, BookLeaf treats the book as an enduring physical and
              spiritual artifact. We bridge the timeless heritage of private presses with the
              contemporary velocity of global archival printing.
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm sm:text-base text-[#706353] leading-relaxed mb-6">
              Every manuscript that passes over our editorial desk is received not as raw transactional
              volume, but as an intellectual legacy. Authors retain complete ownership of their copyright,
              creative autonomy over typesetting and typography, and uncompromised visibility through
              auditable, real-time royalty ledgers.
            </p>

          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">

            {/* Stat 1 */}
            <div className="bg-[#ebd0b8]/40 p-4 rounded-lg border border-[#ded1be]/60">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mb-1">
                100%
              </span>

              <span className="block text-[10px] font-bold tracking-widest text-[#8c7457] uppercase">
                RIGHTS RETAINED
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#ebd0b8]/40 p-4 rounded-lg border border-[#ded1be]/60">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mb-1">
                80 gsm
              </span>

              <span className="block text-[10px] font-bold tracking-widest text-[#8c7457] uppercase">
                ARCHIVAL COTTON
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#ebd0b8]/40 p-4 rounded-lg border border-[#ded1be]/60">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mb-1">
                48 Hrs
              </span>

              <span className="block text-[10px] font-bold tracking-widest text-[#8c7457] uppercase">
                STEWARD DESK SLA
              </span>
            </div>

          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 flex flex-col gap-4 px-5 md:px-10 lg:px-0 py-8 md:py-10">

          {/* Publisher's Creed */}
          <div className="relative bg-[#221f1d] text-[#e8e2d8] rounded-xl p-6 sm:p-7 shadow-lg overflow-hidden">

            {/* Decorative Quote */}
            <span className="absolute top-2 right-6 text-8xl font-serif text-[#36312d] select-none pointer-events-none leading-none">
              “
            </span>

            {/* Card Header */}
            <div className="flex items-center gap-2.5 mb-4 relative z-10">
              <Feather className="w-4 h-4 text-[#c89868]" />

              <span className="text-[11px] font-bold tracking-[0.2em] text-[#c89868] uppercase">
                PUBLISHER'S CREED
              </span>
            </div>

            {/* Quote */}
            <blockquote className="text-xl sm:text-2xl font-serif italic text-[#f3ede4] leading-relaxed mb-5 relative z-10">
              “A manuscript is not raw material for a content mill; it is the culmination of years of quiet courage.”
            </blockquote>

            {/* Author Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#38332f] relative z-10">

              <div>
                <h4 className="font-bold text-sm text-[#f3ede4]">
                  Sonam & Editorial Council
                </h4>

                <p className="text-xs text-[#a09383] mt-0.5">
                  Principal Manuscript Stewards
                </p>
              </div>

              {/* B Badge */}
              <div className="w-10 h-10 rounded-lg bg-[#8c5a2b] text-[#f3ede4] font-serif italic font-bold flex items-center justify-center text-lg shadow-md">
                B
              </div>

            </div>

          </div>

          {/* Book Image Card */}
          <div className="bg-[#eee6d8]/80 border border-[#dfd5c3] rounded-xl overflow-hidden shadow-sm">

            {/* Image - NO PADDING */}
            <div className="relative overflow-hidden h-44 sm:h-52 w-full">
              <img
                src={BOOK_IMAGE_URL}
                alt="Archival Galley Specimen"
                className="w-full h-full object-cover select-none"
              />
            </div>

            {/* Caption - Padding */}
            <div className="px-3 py-2 text-[11px] font-medium text-[#706353]">
              Archival Galley Specimen • Binding Folio No. 41
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;

