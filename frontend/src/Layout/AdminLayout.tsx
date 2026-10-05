


import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  LogOut,
} from 'lucide-react';

interface NavigationItem {
  name: string;
  shortName: string;
  path: string;
  icon: typeof LayoutDashboard;
  badge?: string | null;
  badgeColor?: string;
}

const AdminLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login', { replace: true });
  };
  const navigationItems: NavigationItem[] = [
    {
      name: 'Overview',
      shortName: 'Overview',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Ticket Queue',
      shortName: 'Tickets',
      path: '/admin/tickets',
      icon: Inbox,
      badge: '48',
    },
  ];

  return (
    <div className="min-h-screen w-full flex bg-[#FDFBF7] text-gray-800 font-sans overflow-x-hidden">
    <aside className="hidden md:flex fixed left-0 top-0 z-40 w-56 lg:w-64 h-screen bg-[#F8F5EE] border-r border-gray-200/80 flex-col justify-between flex-shrink-0 select-none">
        <div className="p-4 lg:p-5 space-y-5 lg:space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200/80">

            <div className="flex items-center gap-2.5 min-w-0">
     <div className="min-w-0">
      <Link to="/">
                <h1 className="font-serif font-bold text-lg text-gray-900 leading-tight">
                 ADMIN PORTAL
                </h1>
</Link>

              </div>

            </div>

          </div><div>
   </div>
          <nav className="space-y-1">

            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex
                    items-center
                    justify-between
                    gap-2
                    px-3
                    lg:px-3
                    py-2.5
                    rounded
                    transition
                    text-[11px]
                    lg:text-xs
                    font-semibold
                    ${
                      isActive
                        ? 'bg-[#9c6a3a] text-white shadow-sm'
                        : 'text-gray-700 hover:bg-[#F2EDE4] hover:text-gray-900'
                    }
                    `
                  }
                >

                  <div className="flex items-center gap-3 min-w-0">

                    <Icon className="w-4 h-4 flex-shrink-0" />

                    <span className="truncate">
                      {item.name}
                    </span>

                  </div>
                  {item.badge && (
                    <span
                      className={`
                        flex-shrink-0
                        text-[9px]
                        lg:text-[10px]
                        font-mono
                        font-bold
                        px-1.5
                        py-0.5
                        rounded
                        ${
                          item.badgeColor ||
                          'bg-gray-200 text-gray-700'
                        }
                      `}
                    >
                      {item.badge}
                    </span>
                  )}

                </NavLink>
              );
            })}

          </nav>

        </div>
        <div
          className="
            p-3
            lg:p-4
            bg-[#F2EDE4]/60
            border-t
            border-gray-200/80
            space-y-3
          "
        >

          

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              w-full
              py-2
              bg-white
              border
              border-gray-300
              hover:bg-gray-100
              text-gray-700
              text-[10px]
              lg:text-xs
              font-semibold
              rounded
              transition
              flex
              items-center
              justify-center
              gap-1.5
              shadow-sm
            "
          >
            <LogOut className="w-3.5 h-3.5 text-gray-500" />

            <span>LOG OUT</span>
          </button>

        </div>

      </aside>
      <nav
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          z-50
          bg-[#F8F5EE]
          border-t
          border-gray-200
          shadow-[0_-4px_20px_rgba(0,0,0,0.07)]
          px-2
          pt-2
          pb-[calc(0.5rem+env(safe-area-inset-bottom))]
        "
      >

        <div className="grid grid-cols-3 gap-1">

          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `
                  relative
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  py-1.5
                  rounded-xl
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? 'text-black'
                      : 'text-gray-500'
                  }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    {/* ICON */}

                    <div
                      className={`
                        relative
                        w-9
                        h-7
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        ${
                          isActive
                            ? 'bg-black text-white'
                            : 'bg-transparent'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />

                      {/* MOBILE BADGE */}

                      {item.badge && (
                        <span
                          className="
                            absolute
                            -top-1
                            -right-1
                            min-w-[16px]
                            h-4
                            px-1
                            rounded-full
                            bg-amber-800
                            text-white
                            text-[8px]
                            font-bold
                            flex
                            items-center
                            justify-center
                            border-2
                            border-[#F8F5EE]
                          "
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* LABEL */}

                    <span
                      className={`
                        text-[9px]
                        leading-none
                        ${
                          isActive
                            ? 'font-bold text-black'
                            : 'font-medium text-gray-500'
                        }
                      `}
                    >
                      {item.shortName}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* MOBILE LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-1
              py-1.5
              rounded-xl
              text-gray-500
              hover:text-gray-900
              transition
            "
          >
            <div
              className="
                w-9
                h-7
                rounded-lg
                flex
                items-center
                justify-center
              "
            >
              <LogOut className="w-4 h-4" />
            </div>

            <span className="text-[9px] leading-none font-medium">
              Logout
            </span>
          </button>

        </div>

      </nav>
      <main
        className="
          min-h-screen
          w-full
          md:ml-56
          lg:ml-64
          md:w-[calc(100%-14rem)]
          lg:w-[calc(100%-16rem)]
          overflow-x-hidden
          overflow-y-auto
          pb-24
          md:pb-0
        "
      >
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
