import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { EventInputSchema, type EventInputType } from "../schemas/event.schema";
import toast from "react-hot-toast";
import { cityArray } from "../constants/city.constant";

import { createEvent } from "../services/event.service";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface UploadedFile {
  id: string;
  preview: string;
  name: string;
  rawFile: File;
}

function FormEvent({ onClose }: { onClose: () => void }) {
  const form = useForm({
    resolver: zodResolver(EventInputSchema),
  });

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors: errorsEvent },
  } = form;

  async function handleSubmit(data: EventInputType) {
    try {
      setIsLoading(true);
      toast.loading("Creating event...");
      const user = JSON.parse(localStorage.getItem("user") as string);

      const formData = new FormData();
      formData.append("heroImage", file?.rawFile as File);

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      formData.append("organizerId", user.id);

      // const payload = {
      //   ...data,
      //   organizerId: user.id,
      //   heroImage: file?.rawFile,
      //   startDate: new Date(data.startDate).toISOString(),
      //   endDate: new Date(data.endDate).toISOString(),
      // };

      await createEvent(formData);

      toast.dismiss();

      toast.success("Event created successfully 🎉");

      form.reset();

      // ⬇️ TUTUP MODAL SETELAH BERHASIL
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create event");
    } finally {
      setIsLoading(false);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      form.setValue("heroImage", files[0]);
      handleFileSelect(files[0]);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      form.setValue("heroImage", e.target.files?.[0]);
      handleFileSelect(e.target.files?.[0]);
    }
  }

  function handleFileSelect(selectedFile: File) {
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5 MB");
        return;
      }

      if (!selectedFile.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        const preview = e.target?.result as string;
        setFile({
          id: uuidv4(),
          preview: preview,
          name: selectedFile.name,
          rawFile: selectedFile,
        });
      };

      reader.readAsDataURL(selectedFile);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl mx-4 rounded-2xl dark:bg-surface-dark shadow-2xl transform transition-all">
        {/* modal content */}
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                onClick={() => {
                  form.reset();
                  onClose();
                }}
                disabled={isLoading}
                className={`text-slate-400 hover:text-slate-500 focus:outline-none transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 p-1 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
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
                  {!file ? (
                    <label
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-border-light dark:border-border-dark rounded-xl hover:border-primary transition-colors bg-slate-50 dark:bg-slate-900/50 cursor-pointer group ${isDragging ? "border-primary bg-slate-50" : "border-slate-300"}`}
                    >
                      <div className="space-y-1 text-center">
                        <div className="mx-auto size-12 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-[24px]">
                            add_photo_alternate
                          </span>
                        </div>
                        <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                          <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                            <span>Upload a file</span>
                            <input
                              accept="image/*"
                              className="sr-only"
                              type="file"
                              onChange={handleInputChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </label>
                  ) : (
                    <div className="border p-5 border-primary bg-slate-50 rounded-xl">
                      <div className="space-y-4">
                        <div className="relative">
                          <img
                            className="h-64 object-contain rounded-lg w-full"
                            src={file.preview || "/placeholder.svg"}
                            alt={file.name}
                          />
                          <button
                            onClick={() => {
                              setFile(null);
                              setError(null);
                            }}
                            type="button"
                            className="absolute flex items-center justify-center top-2 right-2 bg-red-500 hover:bg-red-600 hover:scale-110 text-white rounded-full p-1 min-h-7 min-w-7"
                          >
                            <span className="text-sm leading-none">x</span>
                          </button>
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 truncate text-center">
                              {file.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Event Name
                    </label>
                    <input
                      {...form.register("name")}
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
                      {...form.register("tagline")}
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
                        <span className="text-slate-500 sm:text-sm">Rp. </span>
                      </div>
                      <input
                        {...form.register("price", {
                          valueAsNumber: true,
                        })}
                        className="block w-full pl-10 pr-12 rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                        placeholder="0.00"
                        type="number"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-slate-500 sm:text-sm">IDR</span>
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
                      {...form.register("category")}
                      className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5 px-3"
                    >
                      <option value="MUSIC">Music</option>
                      <option value="SPORT">Sport</option>
                      <option value="THEATRE">Theatre</option>
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
                        {...form.register("venue")}
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
                      {...form.register("city")}
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
                      {...form.register("startDate", {
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
                      {...form.register("endDate", {
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
                        {...form.register("availableSeats", {
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
                      {...form.register("about")}
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
                onClick={() => {
                  form.reset();
                  onClose();
                }}
                disabled={isLoading}
                className={`w-full sm:w-auto inline-flex justify-center items-center px-4 py-2.5 border border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                type="button"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                className={`w-full sm:w-auto inline-flex justify-center items-center px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                type="submit"
              >
                <span className="material-symbols-outlined text-[18px] mr-2">
                  {isLoading ? "" : "add"}
                </span>
                {isLoading ? "Creating..." : "Create Event"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormEvent;
