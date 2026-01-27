import { useState, useEffect } from "react";

import { useParams } from "react-router";

import type { TEvent } from "../types/event.type";

function Event() {
  const params = useParams();

  const [event, setEvent] = useState<TEvent | null>(null);

  useEffect(() => {
    async function getEventById() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/events/${params.id}`,
        );
        const data = await response.json();

        setEvent(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    getEventById();
  });

  return (
    <div className="bg-background-dark dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased overflow-x-hidden">
      {/* Hero Section  */}
      <div className="relative w-full h-[50vh] min-h-[400px] ">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          data-alt="Blurred crowd at a jazz concert with blue and purple stage lighting"
          style={{
            backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuDKophNC69nmEztimWXz0jlrcYs189Nb32QLe-vkvsPNjtTeTDQV0GLK0TnGwJB1aiybWTO06z7p1P2V8irdShY_n9NTzXjB232FBx9zZB7342qPAOi5_guD2oYZcLSHypljdy-Vav9UQ0hQzVIQYNIjthC3ZWjtbzz5X2g2mBwk2ROClFhcoqFxqzCgx8NR0v3GlzLRzK2bEm9us7o2S3GrPphWOiwqRM7XDy4fMyK6r0wmt1K-sHC-nONim0aTaSq9nB-GqT-zaY)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#101622] via-[#101622]/80 to-transparent"></div>
        {/* Hero Content */}
        <div className="relative h-full flex items-end pb-12 mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="w-full">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              {/* Event Poster */}
              <div className="hidden md:block w-48 lg:w-56 shrink-0 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 relative -mb-20 z-10">
                <img
                  alt="Vintage style jazz poster"
                  className="w-full h-auto object-cover aspect-[2/3]"
                  data-alt="Vintage style poster for the Midnight Jazz Festival featuring a saxophone silhouette"
                  src={event?.image}
                />
              </div>
              {/* Title & Key Info */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-white backdrop-blur-md uppercase tracking-wider">
                    {event?.category} Festival
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-semibold text-blue-300 backdrop-blur-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      star
                    </span>
                    Featured
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-2 text-gradient">
                  {event?.name}
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl font-medium">
                  {event?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="flex-grow w-full mx-auto max-w-[1280px] px-6 lg:px-10 py-12 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Content */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Metadata Bar (Mobile/Tablet friendly placement) */}
            <div className="flex flex-wrap gap-6 p-6 rounded-xl bg-surface-dark border border-white/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">
                    calendar_today
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="font-semibold text-white">Oct 24, 2024</p>
                </div>
              </div>
              <div className="w-px bg-white/10 hidden sm:block"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="font-semibold text-white">
                    19:00 PM - 23:00 PM
                  </p>
                </div>
              </div>
              <div className="w-px bg-white/10 hidden sm:block"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Venue</p>
                  <p className="font-semibold text-white">
                    Grand Hall, {event?.city}
                  </p>
                </div>
              </div>
            </div>
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                About the Event
              </h2>
              <div className="prose prose-invert prose-lg text-gray-300 leading-relaxed">
                <p className="mb-4">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt, atque dolores. Obcaecati, numquam. Alias debitis
                  reiciendis asperiores earum vel excepturi.
                </p>
                <p>
                  The Grand Hall will be transformed into an intimate jazz club
                  experience on a massive scale. Enjoy curated cocktails,
                  artisanal food stalls, and a sound system designed to capture
                  every nuance of the saxophone and double bass. Whether you are
                  a hardcore jazz aficionado or just looking for a magical night
                  out, the Midnight Jazz Festival promises memories that will
                  last a lifetime.
                </p>
              </div>
            </section>
          </div>
          {/* Right Column: Sticky Booking Widget */}
        </div>
      </main>
      {/* Footer  */}
      <footer className="bg-[#0b0f17] border-t border-[#232f48] py-12 mt-12">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-white opacity-50">
            <span className="text-sm">
              © 2024 TicketMaster. All rights reserved.
            </span>
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <a className="hover:text-white" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-white" href="#">
              Terms of Service
            </a>
            <a className="hover:text-white" href="#">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Event;
