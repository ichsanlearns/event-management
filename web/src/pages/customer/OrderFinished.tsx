import toast from "react-hot-toast";
import { getOrderByCustomer } from "../../services/order.service";
import { useEffect, useState } from "react";
import type { Order } from "../../api/types";
import { formatEventDate } from "../../utils/format.util";
import Review from "../../components/order/Review";

function OrderFinished() {
  const [events, setEvents] = useState<Order[]>([]);
  const [isReview, setIsReview] = useState(false);
  const [reviewing, setReviewing] = useState<Order | null>(null);

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event: Order) => (
        <div
          key={event.id}
          className="bg-white dark:bg-card-dark rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col transition-transform hover:translate-y-[-4px] duration-300"
        >
          <div className="relative h-48">
            <div className="absolute inset-0 bg-black/40 z-10 flex flex-col items-center justify-center backdrop-blur-[1px]">
              <span className="bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-2 flex items-center shadow-lg">
                <span className="material-icons-outlined text-sm mr-1">
                  check_circle
                </span>
                Event Completed
              </span>
            </div>
            <img
              alt="Concert Crowd"
              className="w-full h-full object-cover grayscale-30"
              src={event.ticket.eventName.heroImage}
            />
            <div className="absolute top-4 right-4 z-20 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center animate-bounce">
              <span className="material-icons-outlined text-sm mr-1">
                stars
              </span>
              +50 pts
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                {event.ticket.eventName.name}
              </h3>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="material-icons-outlined text-sm mr-1">
                event
              </span>
              {formatEventDate(event.ticket.eventName.startDate)}
              <span className="mx-2">•</span>
              <span className="material-icons-outlined text-sm mr-1">
                place
              </span>
              {event.ticket.eventName.venue}
            </div>
            <div className="bg-primary-soft/50 dark:bg-gray-800 rounded-lg p-4 mb-6 flex flex-col items-center justify-center border border-dashed border-primary/30 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">
                How was your experience?
              </p>
              <div className="flex space-x-1">
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
                <span className="material-icons-outlined text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer text-2xl transition-colors">
                  star
                </span>
              </div>
            </div>
            <div className="mt-auto">
              <button
                onClick={() => {
                  setIsReview(true);
                  setReviewing(event);
                }}
                className="w-full py-3 rounded-xl border-2 border-primary text-primary dark:text-primary-soft dark:border-primary font-semibold hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-200 flex items-center justify-center group"
              >
                <span className="material-icons-outlined mr-2 group-hover:animate-pulse">
                  rate_review
                </span>
                Review &amp; Earn Points
              </button>
            </div>
          </div>
        </div>
      ))}
      {isReview && (
        <Review onClick={() => setIsReview(false)} data={reviewing!} />
      )}
    </div>
  );
}

export default OrderFinished;
