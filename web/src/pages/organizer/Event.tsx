import { useEffect, useState } from "react";
import { cityArray } from "../../constants/city.constant";
import type { TEvent } from "../../types/event.type";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  voucherSchema,
  type VoucherOutput,
} from "../../schemas/voucher.schema";

import toast from "react-hot-toast";
import {
  EventInputSchema,
  type EventInputType,
} from "../../schemas/event.schema";
import FormVoucher from "../../components/FormVoucher";

function Event() {
  const [formState, setFormState] = useState<"voucher" | "event" | null>(null);
  const [events, setEvents] = useState<TEvent[] | null>(null);
  const [voucherEvents, setVoucherEvents] = useState<TEvent | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/events?limit=100`,
        );

        const data = await response.json();

        setEvents(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEvents();
  }, []);

  const form = useForm({
    resolver: zodResolver(voucherSchema),
  });

  const formEvent = useForm({
    resolver: zodResolver(EventInputSchema),
  });
  const {
    formState: { errors: errorsEvent },
  } = formEvent;

  async function handleSubmitEvent(data: EventInputType) {
    try {
      console.log("test");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          category: "MUSIC",
          heroImage: "http://imageprooftest.com",
        }),
      });

      if (!response.ok) {
        toast.error("Failed to create new event");
      }
    } catch (error: any) {
      toast.error(error);
    }
  }

  return (
    <>
      <main className="min-h-screen flex flex-col justify-center gap-5 p-10">
        {events?.map((event) => (
          <div
            key={event.id}
            className="border rounded-2xl pl-5 pr-10 h-20 flex items-center justify-between "
          >
            <p>{event.name}</p>
            <button
              onClick={() => {
                setFormState("voucher");
                setVoucherEvents(event);
              }}
              className="border rounded-2xl p-2 hover:bg-blue-400 active:scale-[0.98]"
            >
              Create Voucher
            </button>
          </div>
        ))}
      </main>
      {formState === "voucher" && (
        <FormVoucher
          data={voucherEvents!}
          onClose={() => {
            setFormState(null);
            setVoucherEvents(null);
          }}
        />
      )}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-30">
        <button
          onClick={() => setFormState("event")}
          className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-base border-2 border-white dark:border-slate-800 ring-2 ring-indigo-600/20"
        >
          <span className="material-symbols-outlined text-[24px]">add</span>
          Create New Event
        </button>
      </div>
      {formState === "event" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-3xl mx-4 rounded-2xl dark:bg-surface-dark shadow-2xl transform transition-all">
            {/* modal content */}
            <form
              onSubmit={() => {
                console.log("test");
                formEvent.handleSubmit(handleSubmitEvent);
              }}
            >
              <div className="inline-block align-bottom bg-surface-light dark:bg-surface-dark rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full border border-border-light dark:border-border-dark">
                <div className="px-6 py-5 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                  <div>
                    <h3 className="text-lg font-bold leading-6 text-slate-900 dark:text-white">
                      Create New Event
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Fill in the details to publish your next big event.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormState(null)}
                    className="text-slate-400 hover:text-slate-500 focus:outline-none transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 p-1"
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      close
                    </span>
                  </button>
                </div>
                <div className="px-6 py-6 md:px-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
                  <div className="space-y-6">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Event Cover Image
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-border-light dark:border-border-dark rounded-xl hover:border-primary transition-colors bg-slate-50 dark:bg-slate-900/50 cursor-pointer group">
                        <div className="space-y-1 text-center">
                          <div className="mx-auto size-12 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[24px]">
                              add_photo_alternate
                            </span>
                          </div>
                          <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                            <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                              <span>Upload a file</span>
                              <input className="sr-only" type="file" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Event Name
                        </label>
                        <input
                          {...formEvent.register("name")}
                          className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3"
                          placeholder="e.g. Summer Music Festival 2024"
                          type="text"
                        />
                      </div>
                      {errorsEvent.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsEvent.name.message}
                        </p>
                      )}
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Tagline
                        </label>
                        <input
                          {...formEvent.register("tagline")}
                          className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3"
                          placeholder="e.g. A full-beat night you won’t ever forget"
                          type="text"
                        />
                      </div>
                      {errorsEvent.tagline && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsEvent.tagline.message}
                        </p>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Price
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-slate-500 sm:text-sm">
                              Rp.{" "}
                            </span>
                          </div>
                          <input
                            {...formEvent.register("price", {
                              valueAsNumber: true,
                            })}
                            className="block w-full pl-10 pr-12 rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                            placeholder="0.00"
                            type="number"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-slate-500 sm:text-sm">
                              IDR
                            </span>
                          </div>
                        </div>
                      </div>
                      {errorsEvent.price && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsEvent.price.message}
                        </p>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Category
                        </label>
                        <select
                          {...formEvent.register("category")}
                          className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3"
                        >
                          {cityArray.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errorsEvent.category && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsEvent.category.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Venue
                        </label>
                        <div className="mt-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 text-[18px]">
                              location_on
                            </span>
                          </div>
                          <input
                            {...formEvent.register("venue")}
                            className="block w-full pl-10 rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                            placeholder="e.g. Grand Convention Center"
                            type="text"
                          />
                        </div>
                        {errorsEvent.venue && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsEvent.venue.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          City
                        </label>
                        <input
                          {...formEvent.register("city")}
                          className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3"
                          placeholder="e.g. Jakarta"
                          type="text"
                        />
                      </div>
                      {errorsEvent.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsEvent.city.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Start Date &amp; Time
                        </label>
                        <input
                          {...formEvent.register("startDate", {
                            valueAsDate: true,
                          })}
                          className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3"
                          type="datetime-local"
                        />
                      </div>
                      {errorsEvent.startDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsEvent.startDate.message}
                        </p>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          End Date &amp; Time
                        </label>
                        <input
                          {...formEvent.register("endDate", {
                            valueAsDate: true,
                          })}
                          className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3"
                          type="datetime-local"
                        />
                      </div>
                      {errorsEvent.endDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsEvent.endDate.message}
                        </p>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Available Seats
                        </label>
                        <div className="mt-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 text-[18px]">
                              group
                            </span>
                          </div>
                          <input
                            {...formEvent.register("availableSeats", {
                              valueAsNumber: true,
                            })}
                            className="block w-full pl-10 rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                            placeholder="100"
                            type="number"
                          />
                        </div>
                        {errorsEvent.availableSeats && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsEvent.availableSeats.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        About the Event
                      </label>
                      <div className="mt-1">
                        <textarea
                          {...formEvent.register("about")}
                          className="block w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2.5"
                          placeholder="Describe the event, agenda, speakers..."
                          rows={4}
                        ></textarea>
                      </div>
                      {errorsEvent.about && (
                        <p className="text-red-500 text-sm mt-1">
                          {errorsEvent.about.message}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Brief description for your event listing. URLs are
                        hyperlinked.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row sm:justify-end gap-3">
                  <button
                    onClick={() => setFormState(null)}
                    className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2.5 border border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[18px] mr-2">
                      add
                    </span>
                    Create Event
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Event;
