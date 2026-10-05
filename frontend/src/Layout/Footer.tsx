import screenImg from '../assets/screen.png';

const Footer = () => {
  return (
    <footer className="w-full bg-[#1e1b18] text-[#c5b9ab] font-sans pt-16 pb-8 px-6 md:px-12 lg:px-20 border-t border-[#312b26]">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16">
                    <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 overflow-hidden flex items-center justify-center">
                  <img
                    src={screenImg}
                    alt="BookLeaf Logo"
                    className="w-full h-full object-contain filter brightness-200"
                  />
                </div>
                <span className="text-2xl font-serif font-bold text-[#faf8f5] tracking-tight">
                  BookLeaf
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#a69580] font-normal leading-relaxed max-w-md mb-6">
                Helping authors carry their stories from the page into the
                world with archival dignity, careful typography, and
                steadfast stewardship.
              </p>

              <p className="text-sm font-serif italic text-[#c2a682] mb-8">
                “Every story deserves a reader.”
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-bold tracking-widest text-[#8c7457] uppercase mb-3">
                PORTALS
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#a69580]">
                <li>
                  <a href="#workroom" className="hover:text-[#faf8f5] transition-colors">
                    Author Workroom (Riya)
                  </a>
                </li>
                <li>
                  <a href="#editorial" className="hover:text-[#faf8f5] transition-colors">
                    Editorial Desk (Sonam)
                  </a>
                </li>
                <li>
                  <a href="#submission" className="hover:text-[#faf8f5] transition-colors">
                    Manuscript Submission
                  </a>
                </li>
                <li>
                  <a href="#royalties" className="hover:text-[#faf8f5] transition-colors">
                    Royalty Ledgers
                  </a>
                </li>
              </ul>
            </div>
          </div>

  <div className="hidden lg:block lg:col-span-1"></div>

          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 sm:grid-cols-2 gap-8 items-start">
            
          
            <div>
              <h4 className="text-[11px] font-bold tracking-widest text-[#8c7457] uppercase mb-4">
                EXPLORE
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-[#a69580]">
                <li>
                  <a href="#press" className="hover:text-[#faf8f5] transition-colors">
                    The Press
                  </a>
                </li>
                <li>
                  <a href="#method" className="hover:text-[#faf8f5] transition-colors">
                    Publishing Method
                  </a>
                </li>
                <li>
                  <a href="#standards" className="hover:text-[#faf8f5] transition-colors">
                    Manuscript Standards
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="hover:text-[#faf8f5] transition-colors">
                    Catalog & Folios
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-widest text-[#8c7457] uppercase mb-4">
                SUPPORT
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-[#a69580]">
                <li>
                  <a href="#author-desk" className="hover:text-[#faf8f5] transition-colors">
                    Author Desk
                  </a>
                </li>
                <li>
                  <a href="#galley-corrections" className="hover:text-[#faf8f5] transition-colors">
                    Galley Corrections
                  </a>
                </li>
                <li>
                  <a href="#distribution-faqs" className="hover:text-[#faf8f5] transition-colors">
                    Distribution FAQs
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#faf8f5] transition-colors">
                    Contact Stewards
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>
        <div className="pt-8 border-t border-[#2e2823] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7d7063] gap-4">
          <p>© 2026 BookLeaf Stewardship Press. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#a69580] transition-colors">
              Archival Privacy
            </a>
            <a href="#terms" className="hover:text-[#a69580] transition-colors">
              Publishing Terms
            </a>
            <a href="#colophon" className="hover:text-[#a69580] transition-colors">
              Colophon
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;