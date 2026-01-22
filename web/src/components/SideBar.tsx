import { Link, useLocation } from "react-router";

function SideBar() {
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "" },
    { label: "Events", path: "events" },
    { label: "Approval", path: "approval" },
    { label: "Reports", path: "report" },
  ];

  return (
    <aside className="w-[20%] min-w-[220px] h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden lg:flex flex-col">
      {/* Logo */}
      <div className="p-6 text-xl font-bold text-indigo-600">EventFlow</div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 text-sm">
        {menu.map((item) => {
          const isActive = location.pathname === `/dashboard/${item.path}` || (item.path === "" && location.pathname === "/dashboard");

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition
                ${isActive ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition">
          {/* Avatar */}
          <img src="https://i.pravatar.cc/40?img=12" alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />

          {/* User Info */}
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Alex Morgan</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Organizer</p>
          </div>

          {/* Dropdown Icon */}
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
