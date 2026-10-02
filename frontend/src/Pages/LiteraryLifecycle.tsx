
import { useEffect, useRef, useState } from 'react';
import {
  FileText,
  PenTool,
  Type,
  Palette,
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
];

const headingWords = [
  'Seven',
  'Milestones',
  'of',
  'Preservation',
];

const descriptionWords = [
  'Every',
  'stage',
  'is',
  'tracked',
  'with',
  'precision,',
  'ensuring',
  'authors',
  'maintain',
  'creative',
  'voice,',
  'copyright',
  'ownership,',
  'and',
  'absolute',
  'financial',
  'clarity',
  'from',
  'rough',
  'leaf',
  'to',
  'bookstore',
  'shelf.',
];

const LiteraryLifecycle = () => {
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false);

          requestAnimationFrame(() => {
            setIsVisible(true);
          });
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f4efe6] text-[#2c2825] py-10 sm:py-16 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-16 font-sans overflow-hidden min-h-fit"
    >

      <img
        src={butterflyImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-20 select-none mix-blend-multiply"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#8c6d48_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(250,247,240,0.2)_0%,rgba(235,224,206,0.65)_60%,rgba(218,203,180,0.85)_100%)] mix-blend-multiply"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5">

          <div className="max-w-2xl">

            <p
              className={`
                text-[11px]
                font-bold
                tracking-[0.2em]
                text-[#a09383]
                uppercase
                mb-2
                flex
                items-center
                gap-2

                transition-all
                duration-700
                ease-out

                ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }
              `}
            >
              <span>→0</span>
              <span>THE LITERARY LIFECYCLE</span>
            </p>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-medium text-[#1c1917] tracking-tight leading-tight mb-3">

              {headingWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`
                    inline-block
                    mr-[0.25em]

                    transition-all
                    duration-700
                    ease-out

                    ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'
                    }
                  `}
                  style={{
                    transitionDelay: isVisible
                      ? `${400 + index * 150}ms`
                      : '0ms',
                  }}
                >
                  {word}
                </span>
              ))}

            </h2>

            <p className="text-xs sm:text-base text-[#6e6357] font-normal leading-relaxed">

              {descriptionWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`
                    inline-block
                    mr-[0.28em]

                    transition-all
                    duration-500
                    ease-out

                    ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-3'
                    }
                  `}
                  style={{
                    transitionDelay: isVisible
                      ? `${1050 + index * 35}ms`
                      : '0ms',
                  }}
                >
                  {word}
                </span>
              ))}

            </p>

          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="
            flex md:grid
            grid-cols-1 md:grid-cols-2 lg:grid-cols-4
            gap-4 sm:gap-6
            overflow-x-auto md:overflow-x-visible
            snap-x snap-mandatory md:snap-none
            pb-6 md:pb-0
            -mx-4 px-4 sm:-mx-8 sm:px-8 md:mx-0 md:px-0
            no-scrollbar scroll-smooth
          "
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >

          {milestones.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.number}
                className={`
                  snap-center
                  flex-shrink-0 md:flex-shrink
                  w-[82vw] sm:w-[320px] md:w-full

                  bg-[#eee6d8]/70
                  backdrop-blur-sm
                  border border-[#ded1be]/80
                  rounded-lg
                  p-5 sm:p-6

                  flex flex-col justify-between

                  shadow-sm
                  hover:shadow-md

                  transition-all
                  duration-700
                  ease-out

                  ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }
                `}
                style={{
                  transitionDelay: isVisible
                    ? `${1900 + index * 180}ms`
                    : '0ms',
                }}
              >

                <div>

                  <div className="flex items-center justify-between mb-4">

                    <span className="text-2xl font-serif font-bold text-[#8c7457]">
                      {item.number}
                    </span>

                    <span className="bg-[#ebd0b8]/60 text-[#7a6449] text-[10px] font-bold px-2.5 py-1 rounded tracking-wider">
                      {item.timeline}
                    </span>

                  </div>

                  <div className="w-9 h-9 rounded bg-[#f4efe6]/90 border border-[#ded1be] flex items-center justify-center text-[#8c7457] mb-5 shadow-sm">
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <span className="block text-[10px] font-bold tracking-[0.15em] text-[#a09383] uppercase mb-1.5">
                    {item.category}
                  </span>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1c1917] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#6e6357] leading-relaxed mb-5 font-normal">
                    {item.description}
                  </p>

                </div>

                <div className="pt-3 border-t border-[#ded1be]/60 flex items-center gap-2 mt-auto">

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

      </div>
    </section>
  );
};

export default LiteraryLifecycle;
