import toast from "react-hot-toast";
import { getOrderByCustomer } from "../../services/order.service";
import { useEffect, useState } from "react";

function OrderFinished() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getOrderByCustomer(
          "54dbb77d-8ad0-4df0-981f-f9de9d1ef9fd",
          "need_review",
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
      {events.map(() => (
        <div className="bg-white dark:bg-card-dark rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col transition-transform hover:translate-y-[-4px] duration-300">
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
              className="w-full h-full object-cover grayscale-[30%]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZnRROcvjiC1AISHnN6DLwOirgEU4JBmsOGkPsDmkughWIecf3v_XPJjPyJYjdUHBpPtpY2qp93fVckUJkGcbWTqO5O8WD2wpsyeDsELld9SqJFUPzSf1rMYR3kFohOa0efTU7Yx8mdPDok6qsus0Sb4CbLFOC0DbRHUiRjgtst9yLKadDp0ro-6qSxyYSHBLzB6qKQmXA6fuACrRs1yJFoc1bqkupWp02IPgMMqadk3H9JJG3l2df5W-MJDhnOjJqjmzNQ1bu-Qs"
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
                Neon Nights Festival 2024
              </h3>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="material-icons-outlined text-sm mr-1">
                event
              </span>
              Dec 15-17, 2024
              <span className="mx-2">•</span>
              <span className="material-icons-outlined text-sm mr-1">
                place
              </span>
              Gelora Bung Karno
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
              <button className="w-full py-3 rounded-xl border-2 border-primary text-primary dark:text-primary-soft dark:border-primary font-semibold hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-200 flex items-center justify-center group">
                <span className="material-icons-outlined mr-2 group-hover:animate-pulse">
                  rate_review
                </span>
                Review &amp; Earn Points
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderFinished;
