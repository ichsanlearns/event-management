import { Link } from "react-router";
import type { Order } from "../../api/types";
import { formatEventDateYear, formattedPrice } from "../../utils/format.util";

function Paid({ data }: { data: Order }) {
  return (
    <Link
      to={`/payment/${data.id}`}
      className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-4 flex gap-4 hover:border-primary dark:hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md"
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700 relative">
        <img
          alt="Neon Nights Festival"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
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
              {formatEventDateYear(data.ticket.eventName.startDate)}
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              <span className="material-icons text-[14px]">location_on</span>
              {data.ticket.eventName.city}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              PAID
            </span>
            <span className="text-xs font-bold text-text-light dark:text-text-dark mt-1">
              IDR {formattedPrice(data.total)}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2">
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
            {data.ticket.type} • {data.quantity} Tickets
          </p>
          <Link
            to={`/payment/${data.id}`}
            className="text-xs font-medium text-primary hover:text-primary-hover dark:text-primary dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
          >
            View Details
            <span className="material-icons text-[14px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </Link>
  );
}

export default Paid;
