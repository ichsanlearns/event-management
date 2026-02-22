import { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import { useParams } from "react-router";

import type { TEvent } from "../types/event.type";
import {
  formatEventDetailDate,
  formatEventDetailHour,
  formattedPrice,
} from "../utils/format.util";
import { generateOrderId } from "../utils/order.util";
import toast from "react-hot-toast";
import { getProfile } from "../services/user.service";
import type { CreateOrderPayload, TUser } from "../api/types";
import { createOrder } from "../services/order.service";
import { getEventById } from "../services/event.service";
import { useForm } from "react-hook-form";
import { orderSchema, type TOrderSchema } from "../schemas/order.schema";
import { zodResolver } from "@hookform/resolvers/zod";

function Event() {
  const params = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  // const [selectedTicket, setSelectedTicket] = useState<{
  //   id: string;
  //   type: string;
  //   price: number;
  // } | null>(null);

  const navigate = useNavigate();

  const [event, setEvent] = useState<TEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [usePoint, setUsePoint] = useState(false);

  const orderNumber = event?.tickets?.reduce(
    (total, ticket) => total + ticket.bought,
    0,
  );

  let day: string;
  let month: string;
  let year: string;
  if (event) {
    ({ day, month, year } = formatEventDetailDate(event?.startDate!));
  }

  const form = useForm<TOrderSchema>({
    resolver: zodResolver(orderSchema),
  });

  const {
    register,
    formState: { errors },
  } = form;

  const selectedTicketId = form.watch("ticketId");

  const selectedTicket = event?.tickets?.find(
    (ticket) => ticket.id === selectedTicketId,
  );

  const currentPrice = selectedTicket ? selectedTicket.price * quantity : 0;

  useEffect(() => {
    async function getUser() {
      try {
        const user = await getProfile();

        setUser(user);
      } catch (error: any) {
        toast.error(error.response.data.message || "Failed to get profile");
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getEvent() {
      try {
        const response = await getEventById(params.id!);

        setEvent(response.data.data);
      } catch (error: any) {
        toast.error(error.response.data.message || "Failed to get event");
      }
    }

    getEvent();
  }, []);

  async function handleSubmit() {
    setIsLoading(true);
    toast.loading("Loading...");

    if (!user) {
      toast.error("Login first");
      navigate("/login");
      return;
    }

    const payload: CreateOrderPayload = {
      orderCode: generateOrderId(
        event!.name,
        event?.startDate!,
        orderNumber! + event!.orderCancelled + 1,
      ),
      customerId: user!.id,
      ticketId: selectedTicket!.id,
      quantity: quantity,
      status: "WAITING_PAYMENT",
      usingPoint: usePoint ? user.Points.amount : 0,
      total: currentPrice,
      email: user.email,
    };

    try {
      const response = await createOrder(payload);
      toast.dismiss();

      toast.success(response.message);
      navigate(`/payment/${response.data.id}`);
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-background-dark dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased overflow-x-hidden">
      {/* Hero Section  */}
      <div className="relative w-full h-[50vh] min-h-100 ">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          data-alt="Blurred crowd at a jazz concert with blue and purple stage lighting"
          style={{
            backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuDKophNC69nmEztimWXz0jlrcYs189Nb32QLe-vkvsPNjtTeTDQV0GLK0TnGwJB1aiybWTO06z7p1P2V8irdShY_n9NTzXjB232FBx9zZB7342qPAOi5_guD2oYZcLSHypljdy-Vav9UQ0hQzVIQYNIjthC3ZWjtbzz5X2g2mBwk2ROClFhcoqFxqzCgx8NR0v3GlzLRzK2bEm9us7o2S3GrPphWOiwqRM7XDy4fMyK6r0wmt1K-sHC-nONim0aTaSq9nB-GqT-zaY)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#101622] via-[#101622]/80 to-transparent"></div>
        {/* Hero Content */}
        <div className="relative h-full flex items-end pb-12 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="w-full">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              {/* Event Poster */}
              <div className="hidden md:block w-48 lg:w-56 shrink-0 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 relative -mb-20 z-10">
                <img
                  alt="Vintage style jazz poster"
                  className="w-full h-auto object-cover aspect-2/3"
                  data-alt="Vintage style poster for the Midnight Jazz Festival featuring a saxophone silhouette"
                  src={event?.heroImage}
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
                  {event?.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="grow w-full mx-auto max-w-7xl px-6 lg:px-10 py-12 ">
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
                  <p className="font-semibold text-white whitespace-pre">
                    {event
                      ? `${month!}${"   "}${day!}${" "},${"   "} ${year!}`
                      : "-"}
                  </p>
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
                    {event ? formatEventDetailHour(event?.startDate) : "-"}
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
                    {event?.venue}, {event?.city}
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
                {event?.about ? (
                  <>
                    <p>{event.about}</p>
                  </>
                ) : (
                  <>
                    <p className="mb-4">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Nesciunt, atque dolores. Obcaecati, numquam. Alias debitis
                      reiciendis asperiores earum vel excepturi.
                    </p>
                    <p>
                      The Grand Hall will be transformed into an intimate jazz
                      club experience on a massive scale. Enjoy curated
                      cocktails, artisanal food stalls, and a sound system
                      designed to capture every nuance of the saxophone and
                      double bass. Whether you are a hardcore jazz aficionado or
                      just looking for a magical night ou t, the Midnight Jazz
                      Festival promises memories that will last a lifetime.
                      lorem1000
                    </p>
                  </>
                )}
              </div>
            </section>
          </div>
          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-4">
              {/* Main Booking Card */}
              <div className="bg-surface-dark border border-white/5 rounded-2xl p-6 shadow-2xl ring-1 ring-white/5">
                <h3 className="text-xl font-bold text-white mb-6">
                  Select Tickets
                </h3>
                {/* Ticket Selection Form */}
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  id="ticketForm"
                  className={`space-y-4`}
                >
                  {event?.tickets!.map((ticket) => (
                    <label
                      key={ticket.id}
                      className="relative  block cursor-pointer group"
                    >
                      <input
                        // defaultChecked
                        className="peer sr-only"
                        {...register("ticketId", {
                          required: "Ticket ID is required",
                        })}
                        onClick={() => {
                          form.clearErrors("ticketId");
                        }}
                        type="radio"
                        value={ticket.id}
                      />

                      <div
                        className={`p-4 bg-white/90  rounded-xl transition-all peer-checked:ring-4 peer-checked:ring-primary/50 peer-checked:scale-[1.02] hover:bg-white relative overflow-hidden ${errors.ticketId ? "ring-2 ring-red-500/60" : ""}`}
                      >
                        {/* VIP badge */}
                        {ticket.type === "VIP" ? (
                          <>
                            <div className="absolute -right-6 top-7 bg-yellow-400 text-[10px] font-bold px-8 py-1 rotate-45 text-black shadow-sm uppercase tracking-widest">
                              Best Value
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-lg text-slate-900">
                            {ticket.type}
                          </span>
                          <div
                            className={`flex items-center justify-center pt-1 size-6 rounded-full border-2 border-gray-300 ${selectedTicket?.id === ticket.id ? "border-primary bg-primary" : ""}`}
                          >
                            <div
                              className={`text-white ${selectedTicket?.id === ticket.id ? "block" : "hidden"}`}
                            >
                              <span className="material-symbols-outlined text-[16px] font-bold">
                                check
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`text-2xl font-black ${ticket.type === "VIP" ? "text-primary" : "text-slate-900"}  mb-1`}
                        >
                          Rp. {formattedPrice(ticket.price)}
                        </div>
                        <p
                          className={`text-sm ${ticket.type === "EARLYBIRD" ? "text-red-500" : "text-slate-500"} font-medium`}
                        >
                          {ticket.type === "EARLYBIRD"
                            ? "Early entry before 15:00 · Limited quota"
                            : ticket.type === "REGULER"
                              ? "General admission · Standard entry"
                              : "Priority entry · Best viewing area"}
                        </p>
                      </div>
                      {errors.ticketId && (
                        <p className="text-red-500 text-sm">
                          {errors.ticketId.message}
                        </p>
                      )}
                    </label>
                  ))}

                  {/* Quantity Selector */}
                  <div className="pt-4 border-t border-white/10 mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 font-medium">
                        Quantity
                      </span>
                      <div className="flex items-center bg-[#111722] rounded-lg p-1 border border-white/10">
                        <button
                          onClick={() => {
                            quantity === 1
                              ? setQuantity(1)
                              : setQuantity(quantity - 1);
                          }}
                          className="size-8 flex items-center justify-center rounded bg-surface-dark hover:bg-gray-700 text-white transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-sm">
                            remove
                          </span>
                        </button>
                        <span className="w-10 text-center font-bold text-white">
                          {quantity}
                        </span>
                        <input type="hidden" name="quantity" value={quantity} />
                        <button
                          onClick={() => {
                            setQuantity(quantity + 1);
                          }}
                          className="size-8 flex items-center justify-center rounded bg-surface-dark hover:bg-gray-700 text-white transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-sm">
                            add
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 mt-2">
                    <div className="p-4 rounded-xl bg-[#171f2e] border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex flex-col">
                          <span className="text-white font-semibold">
                            Use {user ? user?.Points?.amount : 0} points
                          </span>
                          <span className="text-xs text-green-400 font-medium">
                            Save IDR {user ? user?.Points?.amount : 0}
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            checked={usePoint}
                            onChange={() => setUsePoint(!usePoint)}
                            className="sr-only peer"
                            type="checkbox"
                            value=""
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          info
                        </span>
                        All available points will be applied.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2 border-t border-white/10 pt-4">
                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <span>Subtotal</span>
                        <span>
                          IDR {currentPrice ? formattedPrice(currentPrice) : 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-[#a78bfa]">
                        <span>Points Discount</span>
                        <span>
                          - IDR {user && usePoint ? user?.Points?.amount : 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-end pt-2">
                        <span className="text-gray-300 font-medium">Total</span>
                        <span className="text-3xl font-bold text-white">
                          IDR{" "}
                          {currentPrice && user && usePoint
                            ? formattedPrice(
                                currentPrice - user?.Points?.amount,
                              )
                            : !user
                              ? formattedPrice(currentPrice)
                              : !usePoint
                                ? formattedPrice(currentPrice)
                                : 0}
                        </span>
                      </div>
                    </div>
                    <button
                      form="ticketForm"
                      disabled={isLoading}
                      className="w-full h-14 bg-primary hover:bg-blue-600 active:scale-[0.98] text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-900/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      {isLoading ? "Loading..." : "Buy Ticket"}
                      {isLoading ? null : (
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-2">
                      Secure payment powered by Stripe.
                    </p>
                  </div>
                </form>
              </div>
              {/* Mini Help Card */}
              <div className="bg-surface-dark/50 border border-white/5 rounded-xl p-4 flex gap-3 items-start backdrop-blur-sm">
                <span className="material-symbols-outlined text-gray-400 mt-0.5">
                  info
                </span>
                <div>
                  <p className="text-sm text-gray-300 leading-snug">
                    <strong>Need help?</strong> Contact our support team for
                    group bookings or accessibility requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer  */}
      <footer className="bg-[#0b0f17] border-t border-[#232f48] py-12 mt-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
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
