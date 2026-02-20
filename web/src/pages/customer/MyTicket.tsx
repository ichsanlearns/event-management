import OrderFinished from "./OrderFinished";
import OrderAll from "./OrderAll";
import OrderActive from "./OrderActive";
import { NavLink, useSearchParams } from "react-router";

function MyTicket() {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "active";

  const baseClass =
    "block flex-1 py-3 text-sm transition-colors relative text-center";

  const activeClass = "font-bold bg-primary text-white rounded-lg shadow-md";

  const inactiveClass =
    "font-medium text-subtext-light dark:text-subtext-dark hover:text-primary";

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark">
      <div className="mb-8">
        <nav className="flex text-sm text-subtext-light dark:text-subtext-dark mb-2">
          <a className="hover:text-primary" href="#">
            Dashboard
          </a>
          <span className="mx-2">/</span>
          <span className="font-medium text-text-light dark:text-white">
            My Profile
          </span>
        </nav>
        <h2 className="text-3xl font-bold text-text-light dark:text-white">
          My Profile
        </h2>
        <p className="text-subtext-light dark:text-subtext-dark mt-1">
          Manage your Digital Ticket Wallet - Feedback &amp; Rewards
        </p>
      </div>
      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              alt="Profile Picture"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwmy6TYkp1NwYJlRXvOdoGXP-dV8i-qatbqIYB0RXRWNXwBxs9W5vBLgH7wMa0zpDeYzFthwwDZUPn3p-kGSPHEoKaqfh1EjbLe8aORmPWnctkqIWPEaK66A2DSEM1tc7EDqmDaHfyUa688fjnMs7W7v799abmtgkWrTDxahAn4HPkPw19s7FYw--IPIal59ZNtLvd9BOM_6ojVThNHeQVcjXMZyUqqEBFHLYIhmb_G-40rHXGwIdHut2mKBrQDxsIsz40_k3YBwQ"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-light dark:text-white">
              test
            </h3>
            <div className="flex items-center mt-1">
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded font-mono">
                Referral Code: NAQQTEH
              </span>
            </div>
          </div>
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium dark:text-white">
          <span className="material-icons-outlined mr-2 text-lg">logout</span>
          Logout
        </button>
      </div>
      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-1 mb-8 flex">
        <NavLink
          to="?tab=active"
          className={`${baseClass} ${currentTab === "active" ? activeClass : inactiveClass}`}
        >
          Active
          {currentTab === "active" ? (
            <span className="absolute top-2 right-4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          ) : null}
        </NavLink>
        <NavLink
          to="?tab=need_review"
          className={`${baseClass} ${currentTab === "need_review" ? activeClass : inactiveClass}`}
        >
          Need Review
          {currentTab === "need_review" ? (
            <span className="absolute top-2 right-4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          ) : null}
        </NavLink>
        <NavLink
          to="?tab=all"
          className={`${baseClass} ${currentTab === "all" ? activeClass : inactiveClass}`}
        >
          All Orders
          {currentTab === "all" ? (
            <span className="absolute top-2 right-4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          ) : null}
        </NavLink>
      </div>
      {/* Order list */}
      {currentTab === "active" && <OrderActive />}
      {currentTab === "need_review" && <OrderFinished />}
      {currentTab === "all" && <OrderAll />}
    </main>
  );
}

export default MyTicket;
