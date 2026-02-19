import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Calendar, Users, BarChart3, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import type { UserProfile } from "../types/user.type";

function SideBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menu = [
    { label: "Dashboard", path: "/organizer", icon: LayoutDashboard },
    { label: "Events", path: "/organizer/events", icon: Calendar },
    { label: "Approval", path: "/organizer/approval", icon: Users },
    { label: "Reports", path: "/organizer/report", icon: BarChart3 },
  ];

  /* =======================
     LOGOUT
  ======================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-[20%] min-w-55 h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden lg:flex flex-col">
      {/* Logo */}
      <div className="p-6 text-xl font-bold text-indigo-600">EventFlow</div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 text-xl">
        <p className="px-3 py-2 text-xs text-slate-400 uppercase tracking-wide">Management</p>

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/organizer"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
        ${isActive ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"}`
              }
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          {/* Profile Link Area */}
          <NavLink to="/profile" className="flex items-center gap-3 flex-1 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            {/* Avatar */}
            <img src={user?.profile_image || "/avatar-placeholder.png"} alt="User Avatar" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-600" />

            {/* User Info */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.name || "User"}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role === "EVENT_ORGANIZER" ? "Organizer" : "Attendee"}</p>
            </div>
          </NavLink>

          {/* Logout */}
          <button onClick={handleLogout} className="text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition" aria-label="Logout" title="Logout">
            <LogOut size={25} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
