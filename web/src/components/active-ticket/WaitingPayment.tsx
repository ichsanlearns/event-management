import { Link } from "react-router";
import type { Order } from "../../api/types";
import { formatEventDateYear } from "../../utils/format.util";

function WaitingPayment({ event }: { event: Order }) {
  return (
    <article
      className="bg-black rounded-3xl overflow-hidden flex flex-col custom-shadow relative h-125"
      data-purpose="event-card"
    >
      <div className="absolute inset-0">
        <img
          alt="Jazz Junction 2024"
          className="w-full h-full object-cover opacity-60"
          src={event.ticket.eventName.heroImage}
        />
        <div className="absolute inset-0 card-gradient-overlay"></div>
      </div>
      <div className="relative p-6 flex flex-col h-full justify-between">
        <div className="flex justify-end">
          <span className="bg-red-100/95 backdrop-blur text-red-800 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">
              schedule
            </span>
            Waiting Payment
          </span>
        </div>
        <div className="mt-auto">
          <h4 className="text-white text-2xl font-bold mb-4 leading-tight">
            {event.ticket.eventName.name}
          </h4>
          <div className="space-y-3 mb-6">
            <div>
              <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                DATE
              </p>
              <p className="text-sm text-white font-medium">
                {formatEventDateYear(event.ticket.eventName.startDate)}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                VENUE
              </p>
              <div className="flex items-center text-sm text-white font-medium">
                <span className="material-symbols-outlined text-gray-400 text-sm mr-1">
                  location_on
                </span>
                {event.ticket.eventName.venue}, {event.ticket.eventName.city}
              </div>
            </div>
          </div>
          <div className="mb-3 flex items-center text-red-400 text-xs font-semibold">
            <span className="material-symbols-outlined text-sm mr-1">
              timer
            </span>
            You have 2 hour from order to complete payment
          </div>
          <Link
            to={`/payment/${event.id}`}
            className="w-full bg-[#8346AA] text-white py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-opacity-90 transition shadow-lg shadow-purple-900/20"
          >
            <span>Complete Payment</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default WaitingPayment;
