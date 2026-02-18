import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import type { TEvent } from "../types/event.type";
import { Link } from "react-router";
import { cityArray } from "../constants/city.constant";

function Home() {
  const [events, setEvents] = useState<TEvent[] | null>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState<
    "search" | "category" | "location" | null
  >(null);
  const [city, setCity] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events`);
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEvents();
  }, []);

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        locationRef.current &&
        !locationRef.current.contains(e.target as Node)
      ) {
        setIsOpen(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // search with query
  useEffect(() => {
    if (!query) return;

    const id = setTimeout(() => {
      async function fetchSearchResults() {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/events?search=${query}`,
          );
          const data = await response.json();

          setEvents(data.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchSearchResults();
      console.log("test");
    }, 300);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <div className="relative w-full h-175 lg:h-200 flex items-center justify-center ">
        <div className="absolute inset-0 z-0">
          <img
            alt="High energy music festival"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUvDnYowdfgxkqfFk3zOhWziFg5ZAs6Go8Aqvi8QzdQj0aIbN13F_-VTfUqLrgTCdbHxFQcMYyZNVyHlqvp_O0_okGZnMXnDRkoLmpHeadjAu4jdUWVK2kaY9-n09PMvMICBm69TLn6zYwZKUqhjeFu6PVZoIhz309JwDtuvY-272zJdOEWYWR-UFBOHo33xE51v6NwGMgxaPVzswvUJAlUGbdKLPu-WHdk6UmvhT6X1IASQ9XzWVkzN3uUG11vBmED3r9NB4DPWM"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-20">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            Unforgettable Moments Await
          </span>
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight mb-8 drop-shadow-xl max-w-5xl">
            Live the music.
            <br />
            Feel the rhythm.
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light drop-shadow-md">
            Discover the world's most immersive festivals and exclusive events.
            Your next great memory starts with a ticket.
          </p>
          <button className="bg-primary hover:bg-blue-900 text-white text-lg font-bold py-4 px-10 rounded-full transition-all shadow-xl shadow-indigo-900/40 hover:scale-105 active:scale-95">
            Get Tickets
          </button>
        </div>
        <div className="absolute bottom-0 w-full z-20 translate-y-1/2 px-4">
          <div className="max-w-250 mx-auto bg-white dark:bg-[#1E1B2E] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-3 md:p-4">
            <form className="flex flex-col lg:flex-row gap-3">
              <div ref={containerRef} className="relative grow group ">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">
                    search
                  </span>
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsOpen("search")}
                  className="block w-full pl-12 pr-4 py-4 border-none rounded-t-2xl bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 focus:bg-white dark:focus:bg-gray-800 transition-all text-lg font-medium"
                  placeholder="Search events, artists, or venues..."
                  type="text"
                />
                {isOpen === "search" && query && (
                  <>
                    {/* dropdown */}
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700  rounded-b-xl shadow-xl z-50">
                      {/* scroll area */}
                      <div className="max-h-72 overflow-y-auto overscroll-contain">
                        {events?.map((event) => (
                          <Link
                            to={`/event/${event.id}`}
                            key={event.id}
                            className="block px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            {event.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2 no-scrollbar py-1 sm:py-0">
                  <div className="relative h-full">
                    <button
                      className="h-full flex items-center justify-between gap-2 px-5 py-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors whitespace-nowrap border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                      type="button"
                    >
                      <span>Category</span>
                      <span className="material-symbols-outlined text-lg text-gray-400">
                        keyboard_arrow_down
                      </span>
                    </button>
                  </div>
                  <div ref={locationRef} className="relative">
                    <button
                      onClick={() => {
                        console.log(city);
                        setIsOpen("location");
                      }}
                      className="h-full flex items-center justify-between gap-2 px-5 py-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors whitespace-nowrap border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                      type="button"
                    >
                      <span>{city || "location"}</span>
                      <span className="material-symbols-outlined text-lg text-gray-400">
                        keyboard_arrow_down
                      </span>
                    </button>
                    {isOpen === "location" && (
                      <>
                        {/* dropdown */}
                        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700  rounded-b-xl shadow-xl z-50">
                          {/* scroll area */}
                          <div className="max-h-72 overflow-y-auto overscroll-contain">
                            {cityArray.map((c, indx) => (
                              <div
                                onMouseDown={() => {
                                  setCity(c);
                                  console.log(city);
                                }}
                                key={indx}
                                className="block px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                              >
                                {c}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <button
                  className="shrink-0 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2 text-lg r"
                  type="button"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* card */}
      <div className="bg">
        <Card />
      </div>
    </main>
  );
}

export default Home;
