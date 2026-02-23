import { Link } from "react-router";
import type { Order } from "../../api/types";
import { formatEventDateYear } from "../../utils/format.util";

function WaitingConfirmation({ event }: { event: Order }) {
  return (
    <article className={newFunction()} data-purpose="event-card">
      <div className="absolute inset-0">
        <img
          alt={event.ticket.eventName.name}
          className="w-full h-full object-cover opacity-60"
          src={event.ticket.eventName.heroImage}
        />
        <div className="absolute inset-0 card-gradient-overlay"></div>
      </div>
      <div className="relative p-6 flex flex-col h-full justify-between">
        <div className="flex justify-end">
          <span className="bg-amber-100/95 backdrop-blur text-amber-800 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] animate-[spin_1s_linear_infinite_reverse]">
              sync
            </span>
            Waiting Confirmation
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
          <div className="mb-3 flex items-center text-amber-300/80 text-xs font-medium">
            Verifying payment...
          </div>
          <Link
            to={`/payment/${event.id}`}
            className="w-full border-2 border-white/20 hover:border-white/40 text-white py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 bg-transparent transition"
          >
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </article>
  );

  function newFunction(): string | undefined {
    return "bg-black rounded-[24px] overflow-hidden flex flex-col custom-shadow relative h-[500px]";
  }
}

export default WaitingConfirmation;
