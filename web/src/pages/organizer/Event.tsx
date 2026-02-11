import { useEffect, useState } from "react";
import { cityArray } from "../../constants/city.constant";
import type { TEvent } from "../../types/event.type";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import {
  EventInputSchema,
  type EventInputType,
} from "../../schemas/event.schema";
import FormVoucher from "../../components/FormVoucher";
import FormEvent from "../../components/FormEvent";

function Event() {
  const [formState, setFormState] = useState<"voucher" | "event" | null>(null);
  const [events, setEvents] = useState<TEvent[] | null>(null);
  const [voucherEvents, setVoucherEvents] = useState<TEvent | null>(null);

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
        <FormEvent
          onClose={() => {
            setFormState(null);
          }}
        />
      )}
    </>
  );
}

export default Event;
