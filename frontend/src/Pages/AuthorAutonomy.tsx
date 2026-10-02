import { CreditCard, BookOpen, UserCheck, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: CreditCard,
    title: 'Real-Time Royalties & Ledgers',
    description:
      'Every copy sold across Amazon, Flipkart, or international channels registers directly into your personal author portal ledger with zero black-box deductions.',
    badge: 'DIRECT LEDGER SYNC',
    href: '#royalties',
  },
  {
    icon: BookOpen,
    title: 'Galley & Binding Proofing',
    description:
      'Inspect your folio digitally or receive bound test prints. Manuscripts never advance to production without explicit chapter-by-chapter approval gates.',
    badge: 'ZERO AUTOMATED PRINTING',
    href: '#proofing',
  },
  {
    icon: UserCheck,
    title: 'Human-in-the-Loop Care',
    description:
      'Work directly with real editors like Sonam who understand your work, supported by rapid bibliographic indexing for automated channel distributions.',
    badge: 'DEDICATED DESK STEWARD',
    href: '#editorial-care',
  },
];

const AuthorAutonomy = () => {
  return (
    <section className="relative w-full bg-[#f6f2ea] text-[#2c2825] py-20 md:py-28 px-6 md:px-12 lg:px-20 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Tagline */}
        <p className="text-[11px] font-bold tracking-[0.2em] text-[#a09383] uppercase mb-3 text-center">
          AUTHOR AUTONOMY BY DESIGN
        </p>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1c1917] tracking-tight text-center leading-tight mb-4 max-w-3xl">
          The Stewardship Infrastructure
        </h2>

        {/* Subtitle / Description */}
        <p className="text-sm sm:text-base text-[#6e6357] font-normal text-center leading-relaxed max-w-2xl mb-16">
          Traditional publishers lock information behind closed doors. Vanity presses cut corners.
          BookLeaf provides authors with operational transparency.
        </p>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#eee6d8]/70 border border-[#dfd5c3] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-11 h-11 rounded-lg bg-[#f6f2ea] border border-[#dfd5c3] flex items-center justify-center text-[#9c6a3a] mb-6 shadow-inner">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-serif font-medium text-[#1c1917] mb-3 group-hover:text-[#9c6a3a] transition-colors">
                    {feature.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-[#6e6357] leading-relaxed mb-8 font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Card Footer: Badge & Link Arrow */}
                <div className="pt-4 border-t border-[#dfd5c3]/60 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider text-[#8c7457] uppercase">
                    {feature.badge}
                  </span>
                  <a
                    href={feature.href}
                    className="text-[#6e6357] group-hover:text-[#1c1917] group-hover:translate-x-1 transition-all duration-200"
                    aria-label={`Learn more about ${feature.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AuthorAutonomy;