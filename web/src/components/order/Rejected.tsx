import { Link } from "react-router";
import type { Order } from "../../api/types";
import { formatEventDateYear, formattedPrice } from "../../utils/format.util";

function Rejected({ data }: { data: Order }) {
  return (
    <Link
      to={`/payment/${data.id}`}
      className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-border-light dark:border-border-dark p-4 flex gap-4 hover:border-red-300 dark:hover:border-red-800 transition-all cursor-pointer opacity-90 hover:opacity-100"
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-700 relative grayscale">
        <img
          alt="Jazz Night"
          className="w-full h-full object-cover opacity-60"
          src={data.ticket.eventName.heroImage}
        />
        <div className="absolute inset-0 bg-red-500/10 dark:bg-red-900/20"></div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-gray-600 dark:text-gray-400 truncate pr-4 text-lg line-through decoration-red-400/50">
              {data.ticket.eventName.name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
              <span className="material-icons text-[14px]">event</span>
              {formatEventDateYear(data.createdAt)}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
              REJECTED
            </span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-500 mt-1 line-through">
              {formattedPrice(data.total)}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2">
          <p className="text-xs text-red-600/80 dark:text-red-400/80 truncate font-medium">
            {data.status}
          </p>
          <button className="text-xs font-medium text-text-secondary-light hover:text-text-light dark:text-text-secondary-dark dark:hover:text-text-dark flex items-center gap-1 transition-colors">
            Retry
            <span className="material-icons text-[14px]">refresh</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Rejected;
