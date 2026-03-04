import OrderFinished from "./OrderFinished";
import OrderAll from "./OrderAll";
import { NavLink, useSearchParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Paid from "../../components/active-ticket/Paid";

function MyTicket() {
  const { user } = useAuth();

  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "active";

  const baseClass =
    "block flex-1 py-3 text-sm transition-colors relative text-center";

  const activeClass = "font-bold bg-primary text-white rounded-lg shadow-md";

  const inactiveClass =
    "font-medium text-subtext-light dark:text-subtext-dark hover:text-primary";

  return (
    <div className="relative min-h-screen overflow-x-hidden font-display px-4">
      <div className="fixed inset-0 bg-black/70 -z-10" />
      <div className="mb-8 mt-5">
        <nav className="flex text-sm text-subtext-light dark:text-subtext-dark mb-2">
          <span className="mx-2 text-white">/</span>
          <span className="font-medium text-black dark:text-white">
            My Ticket
          </span>
        </nav>
        <h2 className="text-3xl font-bold text-black dark:text-white text-center mt-20">
          My Ticket
        </h2>
        <p className="text-black dark:text-subtext-dark mt-1 text-center">
          Manage your Digital Ticket Wallet - Feedback &amp; Rewards
        </p>
      </div>
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              alt="Profile Picture"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900"
              src={user?.profile_image}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-light dark:text-white">
              {user?.name}
            </h3>
            <div className="flex items-center mt-1">
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded font-mono">
                Referral Code: {user?.referral_code}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-1 mb-8 flex">
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
      {currentTab === "active" && <Paid />}
      {currentTab === "need_review" && <OrderFinished />}
      {currentTab === "all" && <OrderAll />}
    </div>
  );
}

export default MyTicket;
