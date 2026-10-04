
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Send,
  Ticket,
  User,
  LogOut,
} from "lucide-react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

interface LoggedInUser {
  id?: string;
  authorId?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  role?: "author" | "admin";
}

const AuthorLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) return;

    try {
      const parsedUser: LoggedInUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Unable to read user data:", error);
    }
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      shortLabel: "Home",
      path: "/author/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Books",
      shortLabel: "Books",
      path: "/author/books",
      icon: BookOpen,
    },
    {
      label: "Submit Query",
      shortLabel: "Query",
      path: "/author/submit-query",
      icon: Send,
    },
    {
      label: "My Tickets",
      shortLabel: "Tickets",
      path: "/author/tickets",
      icon: Ticket,
    },
    {
      label: "Account",
      shortLabel: "Account",
      path: "/author/account",
      icon: User,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen w-full bg-[#e4dac9]/70 overflow-hidden">
      <aside
        className="
          hidden
          md:flex
          fixed
          left-0
          top-0
          z-40
          h-screen
          w-56
          lg:w-64
          shrink-0
          bg-[#F8F5EE]
          border-r
          border-gray-200
          flex-col
          justify-between
          p-4
          lg:p-6
        "
      >

        <div>


          <div className="mb-8 px-2 lg:px-1">
            <div className="font-serif text-xl lg:text-2xl font-bold text-[#9c6a3a]">
               Author Portal
            </div>

            
          </div>


          <nav className="space-y-1.5">

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-3
                    lg:px-4
                    py-2.5
                    lg:py-3
                    rounded-xl
                    text-xs
                    lg:text-sm
                    transition-all
                    duration-200
                    ${
                      active
                        ? "bg-[#9c6a3a] text-white shadow-sm"
                        : "text-[#574f46] hover:bg-[#ede7dc]"
                    }
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />

                  <span className="truncate">
                    {item.label}
                  </span>
                </Link>
              );
            })}

          </nav>
        </div>


        <div>

          <div className="border-t border-gray-200 pt-5">

            {/* USER */}

            <div className="flex items-center gap-3 mb-4 min-w-0">

              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#E8DED0]
                  flex
                  items-center
                  justify-center
                  text-[#6B4F35]
                  font-serif
                  shrink-0
                "
              >
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "A"}
              </div>

              <div className="min-w-0">

                <p className="text-sm font-semibold text-[#2c2825] truncate">
                  {user?.name || "Author"}
                </p>

                <p className="text-[11px] text-[#8b8176] truncate">
                  {user?.email || "Author Account"}
                </p>

              </div>

            </div>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                gap-3
                px-3
                lg:px-4
                py-2.5
                lg:py-3
                rounded-xl
                text-xs
                lg:text-sm
                text-[#574f46]
                hover:bg-[#ede7dc]
                transition
              "
            >
              <LogOut className="w-4 h-4 shrink-0" />

              <span>
                Logout
              </span>
            </button>

          </div>
        </div>

      </aside>

      {/* ===================================================== */}
      {/* MOBILE BOTTOM NAVIGATION */}
      {/* ===================================================== */}

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
          shadow-[0_-4px_20px_rgba(0,0,0,0.06)]
          px-1
          pt-2
          pb-[calc(0.5rem+env(safe-area-inset-bottom))]
        "
      >

        <div className="grid grid-cols-5 gap-1">

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
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
                    active
                      ? "text-black"
                      : "text-[#8b8176]"
                  }
                `}
              >

                <div
                  className={`
                    flex
                    items-center
                    justify-center
                    w-9
                    h-7
                    rounded-lg
                    transition
                    ${
                      active
                        ? "bg-black text-white"
                        : "bg-transparent"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span
                  className={`
                    text-[9px]
                    font-medium
                    leading-none
                    ${
                      active
                        ? "text-black font-semibold"
                        : "text-[#8b8176]"
                    }
                  `}
                >
                  {item.shortLabel}
                </span>

              </Link>
            );
          })}

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

export default AuthorLayout;
