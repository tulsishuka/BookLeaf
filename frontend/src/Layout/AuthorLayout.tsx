import {
  LayoutDashboard,
  BookOpen,
  Send,
  Ticket,
  User,
  LogOut,
} from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AuthorLayout = () => {
  const location = useLocation();

  const navItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/author/dashboard',
    },
    {
      label: 'My Books',
      icon: BookOpen,
      path: '/author/books',
    },
    {
      label: 'Submit Query',
      icon: Send,
      path: '/author/submit-query',
    },
    {
      label: 'My Tickets',
      icon: Ticket,
      path: '/author/tickets',
    },
    {
      label: 'Account',
      icon: User,
      path: '/author/account',
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#FDFBF7]">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 shrink-0 bg-[#F8F5EE] border-r border-gray-200 flex flex-col justify-between p-6">

        {/* ================= TOP SECTION ================= */}
        <div>

          {/* Logo / Header */}
          <div className="flex items-center justify-between pb-8 mb-6 border-b border-gray-200/60">

            {/* Bookleaf Logo */}
            <Link
              to="/author/dashboard"
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-amber-800 flex items-center justify-center text-white font-serif font-bold text-sm">
                B
              </div>

              <span className="font-serif font-bold text-gray-900 tracking-wide">
                Bookleaf
              </span>
            </Link>

            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider text-right leading-tight">
              BOOKLEAF
              <br />
              AUTHOR PORTAL
            </div>

          </div>

          {/* Section Heading */}
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
            AUTHOR'S DASHBOARD
          </div>

          {/* ================= NAVIGATION ================= */}
          <nav className="space-y-1">

            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                location.pathname === item.path ||
                (
                  item.path === '/author/books' &&
                  location.pathname.startsWith('/author/books/')
                );

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-200/50'
                  }`}
                >

                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-600'
                    }`}
                  />

                  <span>{item.label}</span>

                </Link>
              );
            })}

          </nav>

        </div>

        {/* ================= SIDEBAR FOOTER ================= */}
        <div className="pt-6 border-t border-gray-200/60">

          {/* Folio Reference */}
          <div className="flex items-center justify-between mb-1">

            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              FOLIO REFERENCE
            </span>

            <span className="text-[10px] font-mono text-gray-500">
              #BL-1234
            </span>

          </div>

          {/* User */}
          <Link
            to="/author/account"
            className="block mb-4"
          >
            <h4 className="font-serif font-semibold text-gray-900 text-lg">
              Riya Sharma
            </h4>

            <p className="text-xs text-gray-500">
              Independent Author
            </p>
          </Link>

          {/* Logout */}
          <Link
            to="/login"
            className="w-full bg-gray-200/70 hover:bg-gray-200 text-gray-800 text-xs font-medium py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
          >

            <LogOut className="w-3.5 h-3.5" />

            <span>Not Sharma</span>

          </Link>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 min-w-0 w-full overflow-y-auto">

        <div className="w-full p-8">

          <Outlet />

        </div>

      </main>

    </div>
  );
};

export default AuthorLayout;