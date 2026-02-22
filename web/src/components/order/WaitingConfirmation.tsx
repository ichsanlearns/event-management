import type { Order } from "../../api/types";
import { Link } from "react-router";
import { formatEventDateYear, formattedPrice } from "../../utils/format.util";

function WaitingConfirmation({ data }: { data: Order }) {
  return (
    <Link
      to={`/payment/${data.id}`}
      className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-blue-200 dark:border-blue-800/50 p-4 flex gap-4 hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer shadow-sm hover:shadow-md"
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700 relative">
        <img
          alt="Design Workshop"
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
            <div className="flex items-center gap-1.5 mt-2">
              <span className="material-icons text-[14px] text-blue-500">
                info
              </span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                Payment proof uploaded. Awaiting verification...
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              WAITING CONFIRMATION
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

export default WaitingConfirmation;
