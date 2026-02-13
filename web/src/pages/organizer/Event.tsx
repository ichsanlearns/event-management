import { useEffect, useState } from "react";
import {
  CalendarDays,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  MapPin,
  Ticket,
  Eye,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react"; // Menggunakan Lucide React
import type { TEvent } from "../../types/event.type";

import FormVoucher from "../../components/FormVoucher";

import FormEdit from "../../components/FormEdit";

import { getEventByOrganizer, deleteEvent } from "../../services/event.service";

import toast from "react-hot-toast";
import FormEvent from "../../components/FormEvent";

function Event() {
  const [formState, setFormState] = useState<"voucher" | "event" | null>(null);
  const [events, setEvents] = useState<TEvent[] | null>(null);
  const [voucherEvents, setVoucherEvents] = useState<TEvent | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const organizerId = user?.id;

  async function fetchEvents() {
    console.log("test");
    if (!organizerId) return;

    try {
      const res = await getEventByOrganizer(organizerId, page, limit);

      console.log(res);

      setEvents(res.data);
      setTotalPages(res.meta?.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [organizerId, page]);

  async function handleDeleteEvent(id: string) {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <span className="font-semibold">Delete this event?</span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={async () => {
              toast.dismiss(t.id);

              const promise = deleteEvent(id);

              toast.promise(promise, {
                loading: "Deleting event...",
                success: "Event deleted",
                error: "Failed to delete event",
              });

              try {
                await promise;
                setEvents((prev) => prev?.filter((e) => e.id !== id) || null);
              } catch {}
            }}
          >
            Yes
          </button>

          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div className="flex h-screen w-full relative font-['Manrope'] bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 antialiased overflow-hidden">
      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32">
          <div className="max-w-300 mx-auto flex flex-col gap-6">
            {/* Breadcrumb & Header */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[13px] text-slate-400 dark:text-slate-500 font-medium">
                <span className="hover:text-indigo-600 cursor-pointer transition-colors">
                  Dashboard
                </span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 dark:text-white">
                  My Events
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    My Events
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    Manage your upcoming and past events efficiently.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <ActionButton
                    icon={<SlidersHorizontal size={16} />}
                    label="Filter"
                    hideMobile
                  />
                  <ActionButton icon={<ArrowUpDown size={16} />} label="Sort" />

                  {/* CREATE EVENT */}
                  <button
                    onClick={() => setFormState("event")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-sm active:scale-95 transition"
                  >
                    <Plus size={16} />
                    Create Event
                  </button>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="flex bg-white dark:bg-[#1a2233] p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center w-full h-11 px-3 gap-3 bg-[#f6f6f8] dark:bg-[#101622] rounded-lg border border-transparent focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all">
                <Search className="text-slate-400" size={18} />
                <input
                  className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-slate-400 font-medium"
                  placeholder="Search events by name, venue, or status..."
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Events List */}
            <div className="flex flex-col gap-4">
              {events ? (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-[#1a2233] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex flex-col md:flex-row gap-6 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all group"
                  >
                    {/* Event Image */}
                    <div className="w-full md:w-48 h-44 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${event.heroImage || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"})`,
                        }}
                      ></div>
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/95 dark:bg-[#1a2233]/95 text-slate-900 dark:text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider border border-slate-100 dark:border-slate-700">
                          {event.category || "General"}
                        </span>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="max-w-[70%]">
                            <h3 className="text-xl font-extrabold mb-1 group-hover:text-indigo-600 transition-colors truncate">
                              {event.name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
                              <MapPin size={14} className="text-indigo-500" />
                              <span className="truncate">
                                {event.city || "Online Event"}
                              </span>
                            </div>
                          </div>
                          <StatusBadge status="Published" />
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <InfoBox
                            label="Date"
                            value={new Date(event.startDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          />
                          <InfoBox
                            label="Start Price"
                            value={
                              event.price === 0
                                ? "Free"
                                : `IDR ${event.price.toLocaleString()}`
                            }
                          />
                          <InfoBox label="Seats" value={event.availableSeats} />
                          <InfoBox label="Revenue" value={event.venue} />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => {
                            setFormState("voucher");
                            setVoucherEvents(event);
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-bold px-4 py-2.5 rounded-lg shadow-sm shadow-indigo-200 dark:shadow-none transition-all flex items-center gap-2 active:scale-95"
                        >
                          <Ticket size={16} />
                          Create Voucher
                        </button>

                        <div className="flex-1"></div>

                        <div className="flex items-center gap-1">
                          <IconButton icon={<Eye size={18} />} label="View" />
                          <IconButton
                            icon={<Pencil size={18} />}
                            label="Edit"
                            onClick={() => {
                              setSelectedEvent(event);
                              setOpenEdit(true);
                            }}
                          />
                          <button onClick={() => handleDeleteEvent(event.id)}>
                            <IconButton
                              icon={<Trash2 size={18} />}
                              label="Delete"
                              variant="danger"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-4">
                  <CalendarDays size={48} className="opacity-20" />
                  <p className="font-medium">Fetching your awesome events...</p>
                </div>
              )}

              {/* Pagination */}

              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2 bg-white dark:bg-[#1a2233] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 shadow-sm">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <span className="px-3 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-200">
                    {page} / {totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODALS */}
      {formState === "event" && (
        <FormEvent
          // data={voucherEvents!}
          onClose={() => {
            setFormState(null);
            setVoucherEvents(null);
          }}
        />
      )}
      {formState === "voucher" && (
        <FormVoucher
          data={voucherEvents!}
          onClose={() => {
            setFormState(null);
            setVoucherEvents(null);
          }}
        />
      )}
      {openEdit && selectedEvent && (
        <FormEdit
          event={selectedEvent}
          onClose={() => {
            setOpenEdit(false);
            setSelectedEvent(null);
            fetchEvents();
          }}
          // onSuccess={fetchEvents}
        />
      )}
    </div>
  );
}

// Komponen Kecil agar Code Reusable & Bersih
const ActionButton = ({ icon, label, hideMobile = false }: any) => (
  <button
    className={`${hideMobile ? "hidden md:flex" : "flex"} items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1a2233] border border-slate-200 dark:border-slate-800 rounded-lg text-[13px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95`}
  >
    {icon} {label}
  </button>
);

const IconButton = ({ icon, variant = "default", onClick }: any) => (
  <button
    onClick={onClick}
    className={`p-2.5 rounded-lg transition-all active:scale-90 ${
      variant === "danger"
        ? "text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
        : "text-slate-400 dark:text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10"
    }`}
  >
    {icon}
  </button>
);

const InfoBox = ({ label, value }: any) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest">
      {label}
    </span>
    <span className="text-[13px] font-bold text-slate-800 dark:text-slate-200 truncate">
      {value}
    </span>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 shadow-sm shadow-emerald-100/50 dark:shadow-none uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
      {status}
    </span>
  );
};

export default Event;
