import { FileText, Eye, ShieldCheck } from 'lucide-react';

const CTASectionDark = () => {
  return (
    <section className="relative w-full bg-[#f6f2ea] py-16 md:py-24 px-6 md:px-12 lg:px-20 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Dark Container Card */}
        <div className="relative bg-[#231f1d] text-[#f6f2ea] rounded-xl p-8 sm:p-12 md:p-14 shadow-xl overflow-hidden">
          
          {/* Right Gradient Glow Overlay */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#36302c]/40 to-transparent pointer-events-none" 
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            
            {/* Top Tag Header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c2a682]"></span>
              <span className="text-[11px] font-bold tracking-widest text-[#a69580] uppercase">
                YOUR MANUSCRIPT AWAITS
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#faf8f5] tracking-tight leading-tight mb-6">
              Ready to give your words their permanent form?
            </h2>

            {/* Description Text */}
            <p className="text-sm sm:text-base text-[#c5b9ab] font-normal leading-relaxed mb-10 max-w-2xl">
              Submit your draft for complimentary editorial assessment. Our literary team
              reviews every manuscript within 48 business hours with detailed feedback.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              
              {/* Gold/Bronze Primary Button */}
              <button className="bg-[#9c6a3a] hover:bg-[#85582e] text-[#ffffff] text-xs font-bold tracking-wider px-6 py-3.5 rounded-md flex items-center gap-2 uppercase transition-colors shadow-sm">
                <FileText className="w-4 h-4" />
                <span>BEGIN MANUSCRIPT SUBMISSION</span>
              </button>

              {/* Off-White Light Secondary Button */}
              <button className="bg-[#eee6d8] hover:bg-[#e4d8c5] text-[#1c1917] text-xs font-bold tracking-wider px-6 py-3.5 rounded-md flex items-center gap-2 uppercase transition-colors shadow-sm">
                <Eye className="w-4 h-4 text-[#8c6d48]" />
                <span>EXPLORE AUTHOR WORKROOM (RIYA SHARMA DEMO)</span>
              </button>

            </div>

            {/* Bottom Divider Line */}
            <div className="w-full border-t border-[#3b342e] mb-6" />

            {/* Sub-Footer Trust Note */}
            <div className="flex items-center gap-2 text-[11px] font-normal text-[#a69580]">
              <ShieldCheck className="w-4 h-4 text-[#c2a682] shrink-0" />
              <span>
                BookLeaf Press adheres to the International Publishers Association standards for ethical author rights.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTASectionDark;