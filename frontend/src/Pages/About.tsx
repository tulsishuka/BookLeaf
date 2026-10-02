
import { useEffect, useRef, useState } from 'react';
import { Feather } from 'lucide-react';

import book1 from '../assets/book1.png';

const BOOK_IMAGE_URL = book1;

const titleWords = [
  'The',
  'Dignity',
  'of',
  'the',
  'Printed',
  'Word',
];

const paragraph1Words = ['In',
  'an',
  'era',
  'where',
  'literature',
  'is',
  'too',
  'frequently',
  'reduced',
  'to',
  'algorithms',
  'and',
  'ephemeral',
  'feeds,',
  'BookLeaf',
  'treats',
  'the',
  'book',
  'as',
  'an',
  'enduring',
  'physical',
  'and',
  'spiritual',
  'artifact.',
  'We',
  'bridge',
  'the',
  'timeless',
  'heritage',
  'of',
  'private',
  'presses',
  'with',
  'the',
  'contemporary',
  'velocity',
  'of',
  'global',
  'archival',
  'printing.',
];

const paragraph2Words = [
  'Every',
  'manuscript',
  'that',
  'passes',
  'over',
  'our',
  'editorial',
  'desk',
  'is',
  'received',
  'not',
  'as',
  'raw',
  'transactional',
  'volume,',
  'but',
  'as',
  'an',
  'intellectual',
  'legacy.',
  'Authors',
  'retain',
  'complete',
  'ownership',
  'of',
  'their',
  'copyright,',
  'creative',
  'autonomy',
  'over',
  'typesetting',
  'and',
  'typography,',
  'and',
  'uncompromised',
  'visibility',
  'through',
  'auditable,',
  'real-time',
  'royalty',
  'ledgers.',
];

const About = () => {
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
      className="relative w-full bg-[radial-gradient(#8c6d48_1px,transparent_1px)] text-[#2c2825] font-sans overflow-hidden"
    >

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">

        <div className="lg:col-span-7 flex flex-col px-5 md:px-10 lg:px-0 py-8 md:py-10">

          <div>

            <div
              className={`
                flex items-center gap-3 mb-4
                transition-all duration-700 ease-out
                ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }
              `}
            >
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#a09383] uppercase whitespace-nowrap">
                CHAPTER I • ATELIER FOUNDATIONS
              </span>

              <div className="h-[1px] bg-[#dcd3c5] flex-grow"></div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#1c1917] tracking-tight leading-[1.15] mb-5">

              {titleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`
                    inline-block mr-[0.25em]
                    transition-all duration-700 ease-out
                    ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'
                    }
                  `}
                  style={{
                    transitionDelay: isVisible
                      ? `${400 + index * 130}ms`
                      : '0ms',
                  }}
                >
                  {word}
                </span>
              ))}

            </h2>

            <p className="text-base sm:text-lg text-[#524a42] leading-relaxed mb-4 font-normal">

              {paragraph1Words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`
                    inline-block mr-[0.28em]
                    transition-all duration-500 ease-out
                    ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-3'
                    }
                  `}
                  style={{
                    transitionDelay: isVisible
                      ? `${1250 + index * 25}ms`
                      : '0ms',
                  }}
                >
                  {word}
                </span>
              ))}

            </p>

            <p className="text-sm sm:text-base text-[#706353] leading-relaxed mb-6">

              {paragraph2Words.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`
                    inline-block mr-[0.28em]
                    transition-all duration-500 ease-out
                    ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-3'
                    }
                  `}
                  style={{
                    transitionDelay: isVisible
                      ? `${2500 + index * 25}ms`
                      : '0ms',
                  }}
                >
                  {word}
                </span>
              ))}

            </p>

          </div>

          <div
            className={`
              grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1
              transition-all duration-700 ease-out
              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }
            `}
            style={{
              transitionDelay: isVisible ? '3700ms' : '0ms',
            }}
          >

            <div className="bg-[#eee6d8]/70 p-4 rounded-lg border border-[#ded1be]/60">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mb-1">
                100%
              </span>

              <span className="block text-[10px] font-bold tracking-widest text-[#8c7457] uppercase">
                RIGHTS RETAINED
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#eee6d8]/70 p-4 rounded-lg border border-[#ded1be]/60">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mb-1">
                80 gsm
              </span>

              <span className="block text-[10px] font-bold tracking-widest text-[#8c7457] uppercase">
                ARCHIVAL COTTON
              </span>
            </div>

            <div className="bg-[#eee6d8]/70 p-4 rounded-lg border border-[#ded1be]/60">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mb-1">
                48 Hrs
              </span>

              <span className="block text-[10px] font-bold tracking-widest text-[#8c7457] uppercase">
                STEWARD DESK SLA
              </span>
            </div>

          </div>

        </div>

        <div className="lg:col-span-5 flex flex-col gap-4 px-5 md:px-10 lg:px-0 py-8 md:py-10">

          <div
            className={`
              relative bg-[#221f1d] text-[#e8e2d8]
              rounded-xl p-6 sm:p-7 shadow-lg overflow-hidden
              transition-all duration-1000 ease-out
              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }
            `}
            style={{
              transitionDelay: isVisible ? '700ms' : '0ms',
            }}
          >

            <span className="absolute top-2 right-6 text-8xl font-serif text-[#36312d] select-none pointer-events-none leading-none">
              “
            </span>

            <div className="flex items-center gap-2.5 mb-4 relative z-10">
              <Feather className="w-4 h-4 text-[#c89868]" />

              <span className="text-[11px] font-bold tracking-[0.2em] text-[#c89868] uppercase">
                PUBLISHER'S CREED
              </span>
            </div>

            <blockquote className="text-xl sm:text-2xl font-serif italic text-[#f3ede4] leading-relaxed mb-5 relative z-10">
              “A manuscript is not raw material for a content mill; it is the culmination of years of quiet courage.”
            </blockquote>

            <div className="flex items-center justify-between pt-4 border-t border-[#38332f] relative z-10">

              <div>
                <h4 className="font-bold text-sm text-[#f3ede4]">
                  Sonam & Editorial Council
                </h4>

                <p className="text-xs text-[#a09383] mt-0.5">
                  Principal Manuscript Stewards
                </p>
              </div>

              <div className="w-10 h-10 rounded-lg bg-[#8c5a2b] text-[#f3ede4] font-serif italic font-bold flex items-center justify-center text-lg shadow-md">
                B
              </div>

            </div>

          </div>

          <div
            className={`
              bg-[#eee6d8]/80
              border border-[#dfd5c3]
              rounded-xl
              overflow-hidden
              shadow-sm
              transition-all duration-1000 ease-out
              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }
            `}
            style={{
              transitionDelay: isVisible ? '1100ms' : '0ms',
            }}
          >

            <div className="relative overflow-hidden h-44 sm:h-52 w-full">
              <img
                src={BOOK_IMAGE_URL}
                alt="Archival Galley Specimen"
                className="w-full h-full object-cover select-none"
              />
            </div>

            <div className="px-3 py-2 text-[11px] font-medium text-[#706353]">
              Archival Galley Specimen • Binding Folio No. 41
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About