import { useEffect, useState } from "react";
import { getOrderByCustomer } from "../../services/order.service";
import toast from "react-hot-toast";

function OrderAll() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getOrderByCustomer(
          "54dbb77d-8ad0-4df0-981f-f9de9d1ef9fd",
          "all",
        );
        setEvents(res.data);
        toast.success("Event fetched successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch event");
      }
    };
    fetchEvent();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        {events.map(() => (
          <div className="space-y-3">
            <div className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-4 flex gap-4 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700 relative grayscale group-hover:grayscale-0 transition-all">
                <img
                  alt="Tech Summit"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIzaVKxFX0xbSNx2UnTFAcTSQX685jNqEk9GO-gHC1RsclcdeZtc2Na7htUsNylyFJZijwONuyoRTLvFfhgfP5VG0eBdHAmblaqiTs5q-lctn0RUmm7qO1DXf2Xe73FgrrwjLl0f1SeoUgpVnoYZasRT8vRJj3yBnThsMR-a9fXHZXzBxZr53iPagd-K94Mh772pcX0J5v6F_S8qemuhHVjO1wCrPIjPni49hiMN2NmtvWEahE_Dcq8cclwBfWUImHDkfatqkbUXA"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-text-light dark:text-text-dark truncate pr-4 text-lg">
                      TechSummit Indonesia 2023
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      <span className="material-icons text-[14px]">event</span>
                      Dec 02, 2023
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                      <span className="material-icons text-[14px]">
                        location_on
                      </span>
                      Tangerang
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      DONE
                    </span>
                    <span className="text-xs font-bold text-text-light dark:text-text-dark mt-1">
                      $75.00
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
                    Regular Pass • 1 Ticket
                  </p>
                  <button className="text-xs font-medium text-text-secondary-light hover:text-text-light dark:text-text-secondary-dark dark:hover:text-text-dark flex items-center gap-1 transition-colors">
                    Receipt
                    <span className="material-icons text-[14px]">
                      description
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderAll;
