import { useEffect, useState } from "react";

import { QRCodeSVG } from "qrcode.react";

import { getOrderByCustomer } from "../../services/order.service";
import toast from "react-hot-toast";
import type { Order } from "../../api/types";
import { formatEventDate } from "../../utils/format.util";

function OrderActive() {
  const [events, setEvents] = useState<Order[]>();
  const [isQrOpen, setIsQrOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getOrderByCustomer(user?.id, "active");

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
      {events?.map((event: Order) => {
        const startDate = new Date(event.ticket.eventName.startDate);
        const diff = startDate.getTime() - Date.now();
        const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

        let label = "Event Finished";

        if (daysLeft > 1) label = `Starts in ${daysLeft} days`;
        else if (daysLeft === 1) label = "Starts tomorrow";
        else if (daysLeft === 0) label = "Starts today";
        return (
          <article
            key={event.id}
            className="bg-black rounded-3xl overflow-hidden flex flex-col custom-shadow relative h-125"
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
                  {event ? label : "Event Started"}
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
                <button
                  onClick={() => setIsQrOpen(true)}
                  className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-opacity-90 transition cursor-pointer"
                >
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
                {isQrOpen && (
                  <div className="bg-white p-4 rounded-xl">
                    <div
                      aria-labelledby="modal-title"
                      aria-modal="true"
                      className="fixed inset-0 z-50 flex items-center justify-center"
                      role="dialog"
                    >
                      <div className="fixed inset-0 bg-black/40 bg-opacity-75 transition-opacity backdrop-blur-sm"></div>
                      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-100 mx-4 transform transition-all overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                          <h3 className="text-lg font-bold text-gray-900 leading-snug">
                            {event.ticket.eventName.name}
                          </h3>
                          <button
                            onClick={() => setIsQrOpen(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                            type="button"
                          >
                            <span className="sr-only">Close</span>
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M6 18L18 6M6 6l12 12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </button>
                        </div>
                        <div className="p-8 flex flex-col items-center">
                          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 w-56 h-56 flex items-center justify-center">
                            <QRCodeSVG value={"test"} />
                          </div>
                          <div className="text-center space-y-1">
                            <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                              Scan at Entrance
                            </p>
                            <p className="text-lg text-gray-700 font-medium">
                              Ticket for:{" "}
                              <span className="text-gray-900 font-semibold">
                                {user.name}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="p-5 pt-0">
                          <button
                            onClick={() => setIsQrOpen(false)}
                            className="w-full bg-brand-primary text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#4E50DB] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary shadow-lg shadow-brand-primary/20 cursor-pointer"
                            type="button"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default OrderActive;
