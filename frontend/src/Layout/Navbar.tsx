import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import screenImg from '../assets/screen.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full font-sans">

      <nav className="bg-[#f7f3ec] text-[#2c2825] px-3 sm:px-4 py-2 flex items-center justify-between border-b border-[#e8dfd1]/60">
        <div className="flex items-center">
          <Link to="/">
            <div className="w-14 h-10 sm:w-16 sm:h-12 flex items-center justify-center overflow-hidden">
              <img
                src={screenImg}
                alt="BookLeaf"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-[#6e6357]">

          <Link
            to="/"
            className="hover:text-[#1c1917] transition-colors whitespace-nowrap"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-[#1c1917] font-semibold relative py-1 whitespace-nowrap"
          >
            About & Process
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8c6d48] rounded-full"></span>
          </Link>

       

          <Link
             to="/"
            className="hover:text-[#1c1917] transition-colors whitespace-nowrap"
          >
            Support
          </Link>

        </div>
        <div className="flex items-center gap-2 sm:gap-3">
         
          <Link
            to="/login"
            className="bg-[#22201e] hover:bg-[#11100f] text-[#f7f3ec] text-[10px] sm:text-xs font-bold tracking-wider px-3 sm:px-4 py-2 rounded-sm uppercase transition-colors shadow-sm whitespace-nowrap"
          >
            ENTER AUTHOR PORTAL
          </Link>
        
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-[#2c2825] hover:bg-[#eae2d5] rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#f7f3ec] border-b border-[#e8dfd1] px-4 py-3 flex flex-col gap-2 text-sm font-medium text-[#6e6357]">

          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[#1c1917] transition-colors py-1"
          >
            Home
          </Link>

          <Link
            to="/About"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#1c1917] font-semibold py-1 border-l-2 border-[#8c6d48] pl-2"
          >
            About & Process
          </Link>

         

          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[#1c1917] transition-colors py-1"
          >
            Support
          </Link>

          <div className="pt-2 border-t border-[#e8dfd1] flex items-center justify-between sm:hidden">
     </div>
        </div>
      )}
      <div className="bg-[#eae2d5] text-[#706353] px-3 sm:px-4 py-1.5 flex flex-col md:flex-row items-center justify-between text-xs font-medium tracking-wide border-t border-[#dfd5c5] gap-1">

        <div className="flex items-center gap-1.5 text-center md:text-left flex-wrap justify-center md:justify-start">

          <span className="w-1.5 h-1.5 rounded-full bg-[#9c6a3a] inline-block shrink-0"></span>

          <span className="font-bold text-[#9c6a3a] uppercase tracking-wider text-[10px]">
            EDITORIAL EDITION 2026
          </span>

          <span className="text-[#a09383] hidden sm:inline">
            •
          </span>

          <span className="text-[#706353] text-[10px] hidden lg:inline">
            Guiding writers from rough leaf to permanent binding
          </span>

        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-center md:text-right">

          <span className="text-[#968775] font-normal hidden sm:inline">
            Portals Active:
          </span>

          <span className="font-semibold text-[#9c6a3a]">
            Manuscript Desk • Royalties • Proofreading Galley
          </span>

        </div>

      </div>

    </header>
  );
};

export default Navbar;