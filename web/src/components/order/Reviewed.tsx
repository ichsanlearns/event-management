import type { Order } from "../../api/types";
import { formatEventDateYear, formattedPrice } from "../../utils/format.util";
import { Link } from "react-router";

function Reviewed({ data }: { data: Order }) {
  return (
    <Link
      to={`/payment/${data.id}`}
      className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-4 flex gap-4 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all cursor-pointer shadow-sm hover:shadow-md"
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700 relative">
        <img
          alt="Year End Party"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={data.ticket.eventName.heroImage}
        />
        <div className="absolute top-1 right-1 bg-yellow-400 text-white rounded-full p-0.5 shadow-sm w-5 h-5 flex items-center justify-center">
          <span className="material-icons text-[10px] block">star</span>
        </div>
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
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
              REVIEWED
            </span>
            <span className="text-xs font-bold text-text-light dark:text-text-dark mt-1">
              IDR {formattedPrice(data.total)}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2">
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
            {data.ticket.type} • {data.quantity} Ticket
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

export default Reviewed;
