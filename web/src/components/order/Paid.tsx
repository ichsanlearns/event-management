import type { Order } from "../../api/types";

function Paid({ data }: { data: Order }) {
  return (
    <div className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-4 flex gap-4 hover:border-primary dark:hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md">
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700 relative">
        <img
          alt="Neon Nights Festival"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpl-nYtsKPQ7kNmwcnBuyZgF4V2RTBburNbMnyMbYvru08ZGujcCXZ3ofNgS-XsxOtT66J2in4yDHYk1VVM1hAlOlIAaiZmJqDFLR51ucKwaAGrvAUokAs6EhH9VPw0JIdIUe42yIN8RU6BEmReRUzhdZslKLhJKopbcSmv5Bj5jOQ3LHr4rVZQriWx4iQql-lncVhGSqw9iFX3T1ws5bgDCJzCYqogeIMiFsjEXhrdCCQ_ROtKtQZt9gIuGy_V17hnnKT6Q19jYo"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-text-light dark:text-text-dark truncate pr-4 text-lg">
              Neon Nights Festival 2023
            </h4>
            <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
              <span className="material-icons text-[14px]">event</span>
              Dec 15, 2023
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              <span className="material-icons text-[14px]">location_on</span>
              Jakarta
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              PAID
            </span>
            <span className="text-xs font-bold text-text-light dark:text-text-dark mt-1">
              $150.00
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2">
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
            VIP Access • 2 Tickets
          </p>
          <button className="text-xs font-medium text-primary hover:text-primary-hover dark:text-primary dark:hover:text-indigo-400 flex items-center gap-1 transition-colors">
            View Details
            <span className="material-icons text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Paid;
