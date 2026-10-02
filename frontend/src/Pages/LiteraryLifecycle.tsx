import { useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  PenTool,
  Type,
  Palette,
  ShieldCheck,
  Printer,
  Globe
} from 'lucide-react';

import butterflyImg from '../assets/butterfly.png';

const milestones = [
  {
    number: '01',
    timeline: 'Week 1 - 2',
    icon: FileText,
    category: 'INTAKE & SCOPE',
    title: 'The Blank Page',
    description:
      'Intake of raw chapters, structural consultation, manuscript genre assessment, and discovery of author intention with your dedicated publishing steward.',
    deliverable: 'Project Charter',
  },
  {
    number: '02',
    timeline: 'Week 3 - 5',
    icon: PenTool,
    category: 'DEVELOPMENT',
    title: 'Refining the Voice',
    description:
      'Editorial developmental pass, proofreading, grammar rhythm, copyediting, and respectful annotations that sharpen tone without diluting your spirit.',
    deliverable: 'Annotated Galley',
  },
  {
    number: '03',
    timeline: 'Week 6 - 7',
    icon: Type,
    category: 'TYPESETTING',
    title: 'Typography & Galleys',
    description:
      'Interior layout craftsmanship, drop caps, archival font selection (Garamond, Caslon, Baskerville), line pacing, and full author proofing review.',
    deliverable: 'Master Typeset PDF',
  },
  {
    number: '04',
    timeline: 'Week 8 - 9',
    icon: Palette,
    category: 'AESTHETICS',
    title: 'Cover & Tactile Design',
    description:
      'Jacket artwork, spine thickness calculation, paper stock selection (Off-white Ivory 80gsm), debossing, and foil configuration.',
    deliverable: 'Print-Ready Jacket Art',
  },
  {
    number: '05',
    timeline: 'Week 10',
    icon: Printer,
    category: 'PROOFING',
    title: 'Physical Proof Galley',
    description:
      'A physical prototype edition is printed and delivered directly to your doorstep for personal review, binding inspection, and sign-off.',
    deliverable: 'Author Approval Sign-Off',
  },
  {
    number: '06',
    timeline: 'Week 11',
    icon: ShieldCheck,
    category: 'COPYRIGHT & ISBN',
    title: 'Rights & Legal Registration',
    description:
      'Filing of formal copyright, cataloging in publication, allocation of unique ISBNs, and full legal ownership protection under author sovereignty.',
    deliverable: 'ISBN Certificate & Copyright Registration',
  },
  {
    number: '07',
    timeline: 'Week 12+',
    icon: Globe,
    category: 'DISTRIBUTION',
    title: 'Global Archival Release',
    description:
      'Worldwide distribution across online retailers, bookstores, and academic libraries with automated royalty settlement tracking.',
    deliverable: 'Live Book Portal & Distribution Active',
  },
];

const LiteraryLifecycle = () => {
  const scrollContainerRef = useRef(null);

  return (
    <section className="relative w-full bg-[#f4efe6] text-[#2c2825] py-12 md:py-16 px-5 md:px-10 lg:px-16 font-sans overflow-hidden min-h-screen">

      {/* Butterfly Background - Same as Home */}
      <img
        src={butterflyImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-20 select-none"
        aria-hidden="true"
      />

      {/* Subtle Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#8c6d48_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Soft Overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(250,247,240,0.1)_0%,rgba(250,247,240,0.5)_100%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full">

        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-5">

          <div className="max-w-2xl">

            <p className="text-[11px] font-bold tracking-[0.2em] text-[#a09383] uppercase mb-2 flex items-center gap-2">
              <span>→0</span>
              <span>THE LITERARY LIFECYCLE</span>
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#1c1917] tracking-tight leading-tight mb-3">
              Seven Milestones of Preservation
            </h2>

            <p className="text-sm sm:text-base text-[#6e6357] font-normal leading-relaxed">
              Every stage is tracked with precision, ensuring authors maintain creative voice,
              copyright ownership, and absolute financial clarity from rough leaf to bookstore shelf.
            </p>

          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              className="w-10 h-10 rounded bg-[#eee7da]/90 hover:bg-[#e4dcce] text-[#4a423a] flex items-center justify-center transition-colors border border-[#ded5c5] shadow-sm active:scale-95"
              aria-label="Previous milestone"
            >
              <ArrowLeft className="w-4 h-4 text-[#5c5247]" />
            </button>

            <button
              className="w-10 h-10 rounded bg-[#eee7da]/90 hover:bg-[#e4dcce] text-[#4a423a] flex items-center justify-center transition-colors border border-[#ded5c5] shadow-sm active:scale-95"
              aria-label="Next milestone"
            >
              <ArrowRight className="w-4 h-4 text-[#5c5247]" />
            </button>
          </div>

        </div>

        {/* Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-6 -mx-5 px-5 md:mx-0 md:px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {milestones.map((item) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.number}
                className="flex-shrink-0 w-[290px] sm:w-[320px] bg-[#ebd0b8]/30 backdrop-blur-sm border border-[#ded1be]/80 rounded-lg p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
              >

                {/* Card Top */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-serif font-bold text-[#8c7457]">
                    {item.number}
                  </span>

                  <span className="bg-[#ebd0b8]/60 text-[#7a6449] text-[10px] font-bold px-2.5 py-1 rounded tracking-wider">
                    {item.timeline}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-9 h-9 rounded bg-[#f4efe6]/90 border border-[#ded1be] flex items-center justify-center text-[#8c7457] mb-5 shadow-sm">
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Category */}
                <span className="block text-[10px] font-bold tracking-[0.15em] text-[#a09383] uppercase mb-1.5">
                  {item.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-[#1c1917] mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#6e6357] leading-relaxed mb-5 font-normal">
                  {item.description}
                </p>

                {/* Deliverable */}
                <div className="pt-3 border-t border-[#ded1be]/60 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8c7457] shrink-0"></span>

                  <p className="text-[11px] text-[#4a423a]">
                    <span className="font-bold text-[#1c1917]">
                      Deliverable:{' '}
                    </span>
                    {item.deliverable}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Phase Indicator */}
        <div className="mt-4">

          <div className="w-full bg-[#e3d9c8]/80 h-[3px] relative mb-3 rounded-full">
            <div className="absolute left-0 top-0 h-full w-[65%] bg-[#9c6a3a] rounded-full" />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs text-[#8c7457]">
            <div>
              <span className="font-bold text-[#1c1917]">Phase 01:</span> Formulation
            </div>

            <div className="sm:text-center">
              <span className="font-bold text-[#1c1917]">Phase 02:</span> Craftsmanship & Proofing
            </div>

            <div className="sm:text-right">
              <span className="font-bold text-[#1c1917]">Phase 03:</span> Global Stewardship
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LiteraryLifecycle;