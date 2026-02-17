import type { Order } from "../../api/types";

function Canceled({ data }: { data: Order }) {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-900/30 rounded-xl border border-dashed border-border-light dark:border-border-dark p-3 flex gap-4 opacity-70 hover:opacity-100 transition-opacity">
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 relative grayscale">
        <div className="flex items-center justify-center w-full h-full text-gray-300 dark:text-gray-600">
          <span className="material-icons">block</span>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-gray-500 dark:text-gray-500 truncate pr-4 text-base line-through">
              Startup Weekend
            </h4>
            <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
              Oct 15, 2023
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500">
              CANCELED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canceled;
