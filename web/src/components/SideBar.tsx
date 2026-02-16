import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Calendar, Users, BarChart3 } from "lucide-react";
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
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition">
          {/* Avatar */}
          <img src={user?.profile_image} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />

          {/* User Info */}
          <NavLink to={"/profile"}>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name || "User"}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role === "EVENT_ORGANIZER" ? "Organizer" : "Attendee"}</p>
            </div>
          </NavLink>

          {/* Dropdown Icon */}
          <p onClick={handleLogout} className="block px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 ">
            {" "}
            ← Back
          </p>
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
