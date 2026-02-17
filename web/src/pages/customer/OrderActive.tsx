import { useEffect, useState } from "react";
import { getOrderByCustomer } from "../../services/order.service";
import toast from "react-hot-toast";
import type { Order } from "../../api/types";
import { formatEventDate } from "../../utils/format.util";

function OrderActive() {
  const [events, setEvents] = useState<Order[]>();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getOrderByCustomer(
          "54dbb77d-8ad0-4df0-981f-f9de9d1ef9fd",
          "active",
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {events?.map((event: Order) => (
        <article
          key={event.id}
          className="bg-black rounded-[24px] overflow-hidden flex flex-col custom-shadow relative h-[500px]"
          data-purpose="event-card"
        >
          <div className="absolute inset-0">
            <img
              alt="Neon Nights Festival 2024"
              className="w-full h-full object-cover opacity-60"
              src={event.ticket.eventName.heroImage}
            />
            <div className="absolute inset-0 card-gradient-overlay"></div>
          </div>
          <div className="relative p-6 flex flex-col h-full justify-between">
            <div className="flex justify-end">
              <span className="bg-white/95 backdrop-blur text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-lg">
                Start in{" "}
                {event
                  ? formatEventDate(event.ticket.eventName.startDate)
                  : "Event Started"}
              </span>
            </div>
            <div className="mt-auto">
              <h4 className="text-white text-2xl font-bold mb-4 leading-tight">
                {event.ticket.eventName.name}
              </h4>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                    ON
                  </p>
                  <p className="text-sm text-white font-medium">
                    {formatEventDate(event.ticket.eventName.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                    VENUE
                  </p>
                  <div className="flex items-center text-sm text-white font-medium">
                    <svg
                      className="w-3.5 h-3.5 mr-1 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                    {event.ticket.eventName.venue},{" "}
                    {event.ticket.eventName.city}
                  </div>
                </div>
              </div>
              <button className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-opacity-90 transition">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </svg>
                <span>View QR Code</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default OrderActive;
