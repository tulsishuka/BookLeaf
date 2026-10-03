import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  UserCheck,
  Users,
  BookOpen,
  
  LogOut,
  Feather,
} from 'lucide-react';

const AdminLayout = () => {
  const navigationItems = [
    {
      name: 'Overview',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Ticket Queue',
      path: '/admin/tickets',
      icon: Inbox,
      badge: '48',
    },
    {
      name: 'My Tickets',
      path: '/admin/tickets',
      icon: UserCheck,
      badge: '3',
      badgeColor: 'bg-amber-600 text-white',
    },
    {
      name: 'Authors',
      path: '/admin/admin',
      icon: Users,
      badge: null,
    },
    {
      name: 'Books',
      path: '/admin/books',
      icon: BookOpen,
      badge: null,
    },
   
   
  
  ];

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] text-gray-800 font-sans">

      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-[#F8F5EE] border-r border-gray-200/80 flex flex-col justify-between flex-shrink-0 min-h-screen sticky top-0 h-screen select-none">

        {/* ================= TOP SECTION ================= */}
        <div className="p-5 space-y-6 overflow-y-auto">

          {/* LOGO & BRAND HEADER */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200/80">

            <div className="flex items-center gap-2.5">

              <div className="w-9 h-9 rounded bg-amber-900 text-amber-100 flex items-center justify-center font-serif font-bold shadow-2xs">
                <Feather className="w-5 h-5 text-amber-200" />
              </div>

              <div>
                <h1 className="font-serif font-bold text-lg text-gray-900 leading-tight">
                  BookLeaf
                </h1>

                <span className="text-[10px] font-mono tracking-wider text-gray-500 uppercase block">
                  ADMIN PORTAL
                </span>
              </div>

            </div>

          </div>

          {/* OPERATIONS CONSOLE */}
          <div>

            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-900/80 font-bold flex items-center gap-1">

              <span className="w-1.5 h-1.5 rounded-full bg-amber-800 inline-block" />

              OPERATIONS CONSOLE

            </span>

            <span className="text-[10px] font-bold tracking-widest text-gray-400 block mt-3 uppercase">
              ADMINISTRATION
            </span>

          </div>

          {/* ================= NAVIGATION MENU ================= */}
          <nav className="space-y-1">

            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded transition text-xs font-semibold ${
                      isActive
                        ? 'bg-black text-white shadow-2xs'
                        : 'text-gray-700 hover:bg-[#F2EDE4] hover:text-gray-900'
                    }`
                  }
                >

                  {/* Icon + Name */}
                  <div className="flex items-center gap-3">

                    <Icon className="w-4 h-4 flex-shrink-0" />

                    <span>{item.name}</span>

                  </div>

                  {/* Badge */}
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        item.badgeColor ||
                        'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                </NavLink>
              );
            })}

          </nav>

        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="p-4 bg-[#F2EDE4]/60 border-t border-gray-200/80 space-y-3">

          {/* ADMIN PROFILE */}
          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded bg-black text-white font-serif font-bold text-xs flex items-center justify-center flex-shrink-0">
              TS
            </div>

            <div className="overflow-hidden">

              <h4 className="font-serif font-bold text-xs text-gray-900 truncate">
                Tulasi Sharma
              </h4>

              <span className="text-[10px] text-gray-500 block truncate">
                Operations Admin
              </span>

              <span className="text-[9px] font-mono text-gray-400 truncate block">
                admin@bookleaf.example
              </span>

            </div>

          </div>

          {/* LOGOUT */}
          <button
            type="button"
            className="w-full py-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded transition flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5 text-gray-500" />

            <span>LOG OUT</span>
          </button>

        </div>

      </aside>

      {/* ================= RIGHT MAIN CONTENT ================= */}
      <main className="flex-1 min-w-0 overflow-y-auto">

        <Outlet />

      </main>

    </div>
  );
};

export default AdminLayout;