import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditEventSchema, type EditEventType } from "../schemas/editevent.schema";
import toast from "react-hot-toast";
import { updateEventApi } from "../services/event.service";

type Props = {
  event: any;
  onClose: () => void;
  onSuccess?: () => void;
};

function FormEditEvent({ event, onClose, onSuccess }: Props) {
  const form = useForm<EditEventType>({
    resolver: zodResolver(EditEventSchema),
  });

  const {
    formState: { errors: errorsEvent },
  } = form;
  useEffect(() => {
    if (!event) return;

    form.reset({
      name: event.name,
      tagline: event.tagline,
      category: event.category,
      price: event.price,
      venue: event.venue,
      city: event.city,
      about: event.about,
      availableSeats: event.availableSeats,
      startDate: event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : "",
      endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : "",
    } as any);
  }, [event, form]);

  async function handleSubmit(data: EditEventType) {
    try {
      const payload: any = {
        ...data,
      };

      if (data.startDate) payload.startDate = new Date(data.startDate).toISOString();
      if (data.endDate) payload.endDate = new Date(data.endDate).toISOString();

      await updateEventApi(event.id, payload); // PATCH

      toast.success("Event updated successfully ✨");

      onSuccess?.();
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update event");
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl mx-4 rounded-2xl dark:bg-surface-dark shadow-2xl">
        <form onSubmit={form.handleSubmit(handleSubmit, (err) => console.log("FORM ERROR", err))}>
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-2xl border border-border-light dark:border-border-dark">
            {/* HEADER */}
            <div className="px-6 py-5 border-b border-border-light dark:border-border-dark flex justify-between items-center">
              <h3 className="text-lg font-bold">Edit Event</h3>
              <button type="button" onClick={onClose} className="p-1 hover:bg-slate-200 rounded-lg">
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <input {...form.register("name")} placeholder="Event name" className="input" />
              {errorsEvent.name && <p className="text-red-500 text-sm">{errorsEvent.name.message}</p>}

              <input {...form.register("tagline")} placeholder="Tagline" className="input" />

              <input type="number" {...form.register("price", { valueAsNumber: true })} placeholder="Price" className="input" />

              <input {...form.register("category")} placeholder="Category" className="input" />

              <input {...form.register("venue")} placeholder="Venue" className="input" />

              <input {...form.register("city")} placeholder="City" className="input" />

              <input type="datetime-local" {...form.register("startDate")} className="input" />

              <input type="datetime-local" {...form.register("endDate")} className="input" />

              <input type="number" {...form.register("availableSeats", { valueAsNumber: true })} placeholder="Seats" className="input" />

              <textarea {...form.register("about")} placeholder="About event" className="input h-28" />
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Update Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormEditEvent;
