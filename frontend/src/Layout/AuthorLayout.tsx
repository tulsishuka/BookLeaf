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
      path: "/author/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Books",
      path: "/author/books",
      icon: BookOpen,
    },
    {
      label: "Submit Query",
      path: "/author/submit-query",
      icon: Send,
    },
    {
      label: "My Tickets",
      path: "/author/tickets",
      icon: Ticket,
    },
    {
      label: "Account",
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
    <div className="h-screen w-full bg-[#F7F3EC] flex overflow-hidden">

      {/* SIDEBAR */}
      <aside
        className="
          h-screen
          w-64
          shrink-0
          bg-[#F8F5EE]
          border-r
          border-gray-200
          flex
          flex-col
          justify-between
          p-6
        "
      >

        {/* TOP */}
        <div>

          {/* LOGO */}
          <div className="flex items-center gap-3 mb-10">

            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-serif text-lg">
              B
            </div>

            <div>
              <h1 className="font-serif text-lg text-[#1c1917]">
                BookLeaf
              </h1>

              <p className="text-[10px] uppercase tracking-[0.18em] text-[#9c6a3a]">
                Author Portal
              </p>
            </div>

          </div>

          {/* NAVIGATION */}
          <nav className="space-y-2">

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    text-sm
                    transition-all
                    ${
                      active
                        ? "bg-black text-white"
                        : "text-[#574f46] hover:bg-[#ede7dc]"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />

                  <span>{item.label}</span>
                </Link>
              );
            })}

          </nav>

        </div>


        {/* BOTTOM USER */}
        <div>

          <div className="border-t border-gray-200 pt-5">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-full bg-[#E8DED0] flex items-center justify-center text-[#6B4F35] font-serif">
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
                px-4
                py-3
                rounded-xl
                text-sm
                text-[#574f46]
                hover:bg-[#ede7dc]
                transition
              "
            >
              <LogOut className="w-4 h-4" />

              <span>Logout</span>
            </button>

          </div>

        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">

        <Outlet />

      </main>

    </div>
  );
};

export default AuthorLayout;