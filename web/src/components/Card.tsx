import { useState, useEffect } from "react";

import { type TEvent } from "../types/event.type";
import { Link } from "react-router";

function Card() {
  const [events, setEvents] = useState<TEvent[] | null>(null);

  useEffect(() => {
    async function getEvents() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
          method: "GET",
        });
        const data = await response.json();

        setEvents(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getEvents();
  }, []);

  const formatEventDate = (iso: Date) =>
    new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .format(new Date(iso))
      .replace(",", " •");

  function optimizeImage(url: string): string {
    const hasQuery = url.includes("?");
    const joiner = hasQuery ? "&" : "?";

    return `${url}${joiner}w=600&h=400&fit=crop&auto=format&q=70`;
  }

  return (
    <div className="p-20">
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Discover Nearby
          </h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                chevron_left
              </span>
            </button>
            <button className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                chevron_right
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {/* card main */}
          {events?.map((event) => {
            const imageUrl = event.image
              ? optimizeImage(event.image)
              : "/placeholder-event.jpg";

            const formattedPrice = new Intl.NumberFormat("id-ID").format(
              event.Tickets![0].price,
            );

            return (
              <Link to={`/event/${event.id}`}>
                <article className="group bg-white dark:bg-[#1E1B2E] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      alt="Workshop setting"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      src={imageUrl}
                    />
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-green-600">
                      {event.category}
                    </div>
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-white text-white hover:text-red-500 backdrop-blur-sm transition-colors">
                      <span className="material-symbols-outlined text-lg block">
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="p-5 flex flex-col grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-primary font-bold text-sm tracking-wide">
                        {/* Sun, 01 Sep • 13:00  */}
                        {formatEventDate(event.start_date)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {event.name}
                    </h3>
                    <div className="flex items-start gap-1.5 text-gray-500 dark:text-gray-400 text-sm mb-4">
                      <span className="material-symbols-outlined text-lg shrink-0 mt-0.5">
                        location_on
                      </span>
                      <span className="line-clamp-1">{event.city}</span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium">
                          Starting from
                        </span>
                        <span className="text-primary font-bold text-lg">
                          IDR {formattedPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/*  */}
        <div className="mt-16 flex justify-center">
          <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 font-bold py-3.5 px-10 rounded-2xl transition-colors shadow-sm text-lg">
            Load More Events
          </button>
        </div>
      </section>
    </div>
  );
}
export default Card;
