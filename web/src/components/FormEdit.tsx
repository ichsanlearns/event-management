import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditEventSchema, type EditEventType } from "../schemas/editevent.schema";
import toast from "react-hot-toast";
import { updateEventApi } from "../services/event.service";
import { X, Calendar, Sparkles, CreditCard, Tag, MapPin, Building2, Users } from "lucide-react";

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
    formState: { errors },
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
      startDate: event.startDate ? new Date(event.startDate).toISOString().slice(0, 10) : "",
      endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 10) : "",
    } as any);
  }, [event, form]);

  async function handleSubmit(data: EditEventType) {
    try {
      const payload: any = { ...data };
      if (data.startDate) payload.startDate = new Date(data.startDate).toISOString();
      if (data.endDate) payload.endDate = new Date(data.endDate).toISOString();

      await updateEventApi(event.id, payload);
      toast.success("Event updated successfully ✨");
      onSuccess?.();
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update event");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Event</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* BODY */}
          <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="space-y-5">
              {/* Event Name */}
              <div>
                <Label>Event Name</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Calendar size={18} />
                  </div>
                  <input {...form.register("name")} className={`input-field w-full pl-10 ${errors.name ? "border-red-500" : ""}`} placeholder="e.g. Summer Music Festival" />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Tagline */}
              <div>
                <Label>Tagline</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Sparkles size={18} />
                  </div>
                  <input {...form.register("tagline")} className="input-field w-full pl-10" placeholder="Short description for your event" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-6">
              {/* Price */}
              <div>
                <Label>Price ($)</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <CreditCard size={18} />
                  </div>
                  <input type="number" {...form.register("price", { valueAsNumber: true })} className="input-field pl-10" />
                </div>
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Tag size={18} />
                  </div>
                  <select {...form.register("category")} className="input-field pl-10">
                    <option value="MUSIC">Music</option>
                    <option value="SPORT">Sport</option>
                    <option value="THEATRE">Theatre</option>
                  </select>
                </div>
              </div>

              {/* Venue */}
              <div>
                <Label>Venue</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin size={18} />
                  </div>
                  <input {...form.register("venue")} className="input-field pl-10" placeholder="Building name" />
                </div>
              </div>

              {/* City */}
              <div>
                <Label>City</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Building2 size={18} />
                  </div>
                  <input {...form.register("city")} className="input-field pl-10" placeholder="City name" />
                </div>
              </div>

              {/* Start Date */}
              <div>
                <Label>Start Date</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Calendar size={18} />
                  </div>
                  <input type="date" {...form.register("startDate")} className="input-field pl-10" />
                </div>
              </div>

              {/* End Date */}
              <div>
                <Label>End Date</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Calendar size={18} />
                  </div>
                  <input type="date" {...form.register("endDate")} className="input-field pl-10" />
                </div>
              </div>

              {/* Seats */}
              <div className="md:col-span-2">
                <Label>Available Seats</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Users size={18} />
                  </div>
                  <input type="number" {...form.register("availableSeats", { valueAsNumber: true })} className="input-field pl-10" />
                </div>
              </div>

              {/* About */}
              <div className="md:col-span-2">
                <Label>About Event</Label>
                <textarea
                  {...form.register("about")}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-white outline-none resize-none"
                  placeholder="Describe your event..."
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/50">
            <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all active:scale-95">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95">
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper Components
const Label = ({ children }: { children: React.ReactNode }) => <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">{children}</label>;

export default FormEditEvent;
