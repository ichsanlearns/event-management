import type { Order } from "../../api/types";
import { Link } from "react-router";
import { formatEventDateYear, formattedPrice } from "../../utils/format.util";

function WaitingPayment({ data }: { data: Order }) {
  return (
    <Link
      to={`/payment/${data.id}`}
      className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-amber-200 dark:border-amber-800/50 p-4 flex gap-4 hover:border-amber-400 dark:hover:border-amber-600 transition-all cursor-pointer shadow-sm hover:shadow-md ring-1 ring-amber-50 dark:ring-amber-900/10"
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700 relative">
        <img
          alt="Summer Vibes Concert"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={data.ticket.eventName.heroImage}
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-text-light dark:text-text-dark truncate pr-4 text-lg">
              {data.ticket.eventName.name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
              <span className="material-icons text-[14px]">event</span>
              {formatEventDateYear(data.createdAt)}
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              <span className="material-icons text-[14px]">location_on</span>
              {data.ticket.eventName.city}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              WAITING PAYMENT
            </span>
            <span className="text-xs font-bold text-text-light dark:text-text-dark mt-1">
              IDR {formattedPrice(data.total)}
            </span>
            <span className="text-[10px] font-medium text-red-600 dark:text-red-400">
              Expires in 01:23:45
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2">
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
            {data.ticket.type} • {data.quantity} Tickets
          </p>
          <button className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-medium rounded-lg shadow-sm shadow-indigo-200 dark:shadow-none transition-colors flex items-center gap-1">
            Pay Now
            <span className="material-icons text-[14px]">payment</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default WaitingPayment;
