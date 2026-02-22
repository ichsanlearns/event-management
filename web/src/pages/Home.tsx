import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import type { TEvent } from "../types/event.type";
import { Link } from "react-router";
import { cityArray } from "../constants/city.constant";
import { getSearchEvents } from "../services/event.service";
import toast from "react-hot-toast";
import { formatEventDate } from "../utils/format.util";
import { categoryArray } from "../constants/category,constant";

function Home() {
  const [events, setEvents] = useState<TEvent[] | null>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState<
    "search" | "location" | "category" | null
  >(null);
  const [category, setCategory] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events`);
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {}
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

  useEffect(() => {
    if (!query && !category && !location) return;

    const id = setTimeout(() => {
      async function fetchSearchResults() {
        try {
          const payload = {
            search: query,
            category,
            location,
          };

          const response = await getSearchEvents(payload);

          setEvents(response.data);
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      }
      fetchSearchResults();
    }, 300);
    return () => clearTimeout(id);
  }, [query, category, location]);

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
              {/* <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                /> */}
              {/* {isOpen === "search" && query && (
                  <>
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700  rounded-b-xl shadow-xl z-50">
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
                )} */}

              {/* Form */}

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
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#1E1B2E] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 transform origin-top transition-all duration-200 opacity-100 visible">
                    <div className="flex gap-2 p-3 border-b border-gray-100 dark:border-gray-800 overflow-x-auto no-scrollbar">
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors whitespace-nowrap"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-sm">
                          filter_list
                        </span>
                        All Filters
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                        type="button"
                      >
                        Category
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                        type="button"
                      >
                        Location
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                        type="button"
                      >
                        Price
                      </button>
                    </div>

                    {/* Event List */}
                    <div className="py-2">
                      {events?.map((event) => (
                        <Link
                          to={`/event/${event.id}`}
                          key={event.id}
                          className="flex items-center gap-4 px-4 py-3 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors group cursor-pointer border-l-4 border-transparent hover:border-primary"
                        >
                          <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                            <img
                              alt="Thumbnail"
                              className="w-full h-full object-cover"
                              src={event.heroImage}
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h5 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                {event.name}
                              </h5>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                {event.category}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <span>
                                {event.venue}, {event.city}
                              </span>
                              <span className="w-0.5 h-0.5 rounded-full bg-gray-400"></span>
                              <span>{formatEventDate(event.startDate)}</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="text-[10px] text-gray-400 uppercase font-medium">
                              Starting from
                            </div>
                            <div className="text-sm font-bold text-primary">
                              IDR {event.lowestPrice}
                            </div>
                          </div>
                        </Link>
                      ))}
                      {/* <a
                        className="flex items-center gap-4 px-4 py-3 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors group cursor-pointer border-l-4 border-transparent hover:border-primary"
                        href="#"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                          <img
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbqfCDuMAq20_jhytFOwa1ZZRsSh-zJo31Zqrb04bCKcaC_-NRg8rSg4gzpSjznFolKyqIIcHnP_g_I8-5_QKniSaYYLY7E--JiG53z8h9Lh90rsfiM2MkbCmbhHC2T_iz5oiNr9D0OH3gRX3xHoG3Ninjn1aEn7C9koTY7WAmfGntAug29lJFW_aOsg4eCGxpgYD7tI34AZPg9pG2JqEgJSxK8LQn_3xR99M7e4P2r2-d8-m2dFO68P5wm18KMuLxjv8PIOchgXg"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h5 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                              Future Tech Summit Asia
                            </h5>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              Conf
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <span>Convention Center, SG</span>
                            <span className="w-0.5 h-0.5 rounded-full bg-gray-400"></span>
                            <span>Aug 28</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-[10px] text-gray-400 uppercase font-medium">
                            Starting from
                          </div>
                          <div className="text-sm font-bold text-primary">
                            IDR 1.2M
                          </div>
                        </div>
                      </a>
                      <a
                        className="flex items-center gap-4 px-4 py-3 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors group cursor-pointer border-l-4 border-transparent hover:border-primary"
                        href="#"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                          <img
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL67BJLc-Z1NOQTGfX8BaIfnEbdnBLTUWEdflHKvxt81bEK5QweipV3m3Wa4VMUjFW0azudMOzzVifkOaUIAHXeKEwYnnG_bH4Dk7M0flJRtr4X3EATVSzbbDQ3z5ghOlWc3gVpqIZZMSs_xsYjBRYjKR_mmUseeQCX_pPGxHylFTXjpYKtM7wmpgAN0UWExziYqihXqLILTJ4IfmZTMAdscTfzM3w5_lfSJi8lE329-5Nai-6MJArQlYreP0bWOG3zeATPIoLm1s"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h5 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                              Modern Art &amp; Culture Expo
                            </h5>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
                              Art
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <span>National Gallery</span>
                            <span className="w-0.5 h-0.5 rounded-full bg-gray-400"></span>
                            <span>Sep 06</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-[10px] text-gray-400 uppercase font-medium">
                            Price
                          </div>
                          <div className="text-sm font-bold text-green-600 dark:text-green-400">
                            Free Entry
                          </div>
                        </div>
                      </a> */}
                    </div>

                    {/* NO EVENT FOUND */}
                    {/* <div className="hidden flex-col items-center justify-center py-8 px-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-gray-400 text-2xl">
                        search_off
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                      No events found
                    </h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      We couldn't find any matches for "Underwater Basket
                      Weaving". Try adjusting your keywords.
                    </p>
                  </div> */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">
                        Press
                        <kbd className="font-sans px-1 py-0.5 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-xs">
                          Enter
                        </kbd>
                        to search all results
                      </span>
                      <a
                        className="text-[10px] font-bold text-primary hover:underline"
                        href="#"
                      >
                        View all 24 results
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2 no-scrollbar py-1 sm:py-0">
                  <div className="relative h-full">
                    <button
                      onClick={() => setIsOpen("category")}
                      className="h-full flex items-center justify-between gap-2 px-5 py-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors whitespace-nowrap border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                      type="button"
                    >
                      <span>{category || "Category"}</span>
                      <span className="material-symbols-outlined text-lg text-gray-400">
                        keyboard_arrow_down
                      </span>
                    </button>
                    {isOpen === "category" && (
                      <>
                        {/* dropdown */}
                        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700  rounded-b-xl shadow-xl z-50">
                          {/* scroll area */}
                          <div className="max-h-72 overflow-y-auto overscroll-contain">
                            {categoryArray.map((category, indx) => (
                              <div
                                onMouseDown={() => {
                                  setCategory(
                                    category === "Category" ? null : category,
                                  );
                                  setIsOpen(null);
                                }}
                                key={indx}
                                className="block px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                              >
                                {category}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div ref={locationRef} className="relative">
                    <button
                      onClick={() => setIsOpen("location")}
                      className="w-40 h-full flex items-center justify-between gap-2 px-5 py-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors whitespace-nowrap border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                      type="button"
                    >
                      <span>{location || "Location"}</span>
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
                                  setLocation(c === "Location" ? null : c);
                                  setIsOpen(null);
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
              </div>
              {/* Form */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="shrink-0 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2 text-lg r"
                  type="button"
                >
                  Search
                </button>
                {/* Search */}
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
