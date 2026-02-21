import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { formattedPrice, formatTime } from "../utils/format.util";
import { useCountdown } from "../utils/countdown.util";
import type { ICoupon, IOrder } from "../types/event.type";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { paymentSchema, type PaymentInput } from "../schemas/payment.schema";
import toast from "react-hot-toast";
import api from "../lib/api";
import { getOrderById } from "../services/order.service";
import Coupon from "../components/payment/Coupon";
import PaymentConfirmation from "../components/payment/PaymentConfirmation";
import PaymentPaid from "../components/payment/PaymentPaid";
import PaymentRejected from "../components/payment/PaymentRejected";
import PaymentExpired from "../components/payment/PaymentExpired";
import PaymentWaiting from "../components/payment/PaymentWaiting";

function Payment() {
  const { id } = useParams();

  const [openCoupon, setOpenCoupon] = useState(false);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [voucher, setVoucher] = useState<{
    id: string;
    code: string;
    discountAmount: number;
    quota: number;
  } | null>();

  const [coupon, setCoupon] = useState<ICoupon[] | null>();

  useEffect(() => {
    try {
      async function getOrder() {
        const response = await getOrderById(id!);

        setOrder(response.data);
        setVoucher(response.data.voucher);
        setOrderStatus(response.data.status);
        setCoupon(response.data.coupon);
      }

      getOrder();
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  const form = useForm<PaymentInput>({
    resolver: zodResolver(paymentSchema),
  });

  async function submitPromo() {
    try {
      const code = form.getValues("voucherCode");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/vouchers/check`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            eventId: order?.ticket.eventId,
            orderId: order?.id,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setVoucher(data.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function handleSubmit(data: PaymentInput) {
    if (!order) {
      return;
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("singleImage", data.proofImage);
      formData.append("orderId", order?.id);
      formData.append("amount", finalAmount.toString());
      formData.append("method", "MANUAL_TRANSFER");
      formData.append("status", "WAITING_CONFIRMATION");

      toast.loading("Processing payment...");

      await api.post("/payments", formData);

      toast.dismiss();
      toast.success("Payment successful");
      const updatedOrder = await getOrderById(id!);

      setOrder(updatedOrder.data);
      setVoucher(updatedOrder.data.voucher);
      setOrderStatus(updatedOrder.data.status);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  const processingFee = order ? (order.ticket.price * order.quantity) / 10 : 0;

  const finalAmount = order
    ? Number(order.total) +
      processingFee -
      Number(order.usingPoint || 0) -
      (voucher?.discountAmount ?? 0)
    : 0;

  return (
    <main className="max-w-full bg-background-dark p-30">
      <div className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <div className="mb-8 max-w-3xl">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end mb-1">
              <p className="text-slate-900 dark:text-white text-lg font-bold">
                Payment Details
              </p>
              <p className="text-primary text-sm font-semibold">Step 3 of 4</p>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              <span>Selection</span>
              <span>Details</span>
              <span className="text-primary">Payment</span>
              <span>Confirmation</span>
            </div>
          </div>
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit, (error) =>
              console.log(error),
            )}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-6">
                {/* Left Column: Payment Actions (Cards) */}
                {order?.status === "WAITING_CONFIRMATION" && (
                  <PaymentConfirmation />
                )}
                {order?.status === "PAID" && <PaymentPaid />}
                {order?.status === "REJECTED" && <PaymentRejected />}
                {order?.status === "EXPIRED" && <PaymentExpired />}
                {order?.status === "WAITING_PAYMENT" && (
                  <PaymentWaiting order={order} />
                )}
                {order?.status === "WAITING_PAYMENT" ||
                  (order?.status === "REJECTED" && (
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Submit Payment
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </button>
                  ))}
              </div>

              <div className="lg:col-span-4 relative">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white dark:bg-[#1a162e] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div
                      className="h-32 w-full bg-cover bg-center relative"
                      data-alt="Neon festival crowd with lasers and stage lights"
                      style={{
                        backgroundImage: `url(${order?.ticket.eventName.heroImage})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-3 left-4 right-4">
                        <h4 className="text-white font-bold text-lg leading-tight">
                          {order?.ticket.eventName.name}
                        </h4>
                        <p className="text-white/80 text-xs mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            location_on
                          </span>
                          {order?.ticket.eventName.city}
                        </p>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-sm text-slate-500 font-medium">
                            Order ID: {order?.orderCode}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {order?.createdAt}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800">
                          <span className="size-2 rounded-full bg-amber-500 animate-pulse"></span>
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                            Pending Payment
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {/* Items */}
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-600 dark:text-slate-300">
                            {order?.ticket.type} Access
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            Rp {order?.ticket.price}
                          </span>
                        </div>
                        <div className="border-slate-300 border-t" />
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300">
                            Subtotal Produk ({order?.quantity}x)
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            Rp {order?.total}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300">
                            Processing Fee
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            Rp{" "}
                            {order
                              ? formattedPrice(
                                  (order?.ticket.price * order.quantity) / 10,
                                )
                              : 0}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">
                              loyalty
                            </span>
                            Points Redeemed
                          </span>
                          <span className="font-medium">
                            - Rp {formattedPrice(order?.usingPoint || 0)}
                          </span>
                        </div>

                        {voucher?.code ? (
                          <>
                            {/* Discounts */}
                            <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">
                                  local_offer
                                </span>
                                Promo ({voucher?.code})
                              </span>
                              <span className="font-medium">
                                - Rp {formattedPrice(voucher?.discountAmount)}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Promo Code Input */}
                            <div className="flex items-center gap-2">
                              <div className="relative flex-1">
                                <input
                                  {...form.register("voucherCode")}
                                  placeholder="Enter promo code..."
                                  className="w-full pl-4 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700
                 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200
                 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40"
                                />
                                {form.formState.errors.voucherCode && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {form.formState.errors.voucherCode.message}
                                  </p>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => submitPromo()}
                                disabled={form.formState.isSubmitting}
                                className="px-4 py-2 text-sm font-semibold rounded-xl
               bg-primary text-white hover:bg-primary/90
               transition-colors disabled:opacity-50 active:scale-[0.99]"
                              >
                                {form.formState.isSubmitting
                                  ? "Applying..."
                                  : "Apply"}
                              </button>
                            </div>
                          </>
                        )}
                        <div className="border-t border-slate-100 dark:border-slate-800" />
                        <div className="flex justify-between items-center text-sm pt-2 pb-2">
                          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-[16px]">
                              confirmation_number
                            </span>
                            No coupon applied
                          </span>
                          <button
                            onClick={() => setOpenCoupon(true)}
                            className="text-primary hover:text-primary/80 font-semibold text-xs transition-colors cursor-pointer"
                          >
                            View Available Coupons (2)
                          </button>
                        </div>
                        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                          <div className="flex justify-between items-end">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">
                              Total Amount
                            </span>
                            <span className="text-2xl font-black text-primary">
                              Rp {order ? formattedPrice(finalAmount) : 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Security Footer */}
                    <div className="bg-slate-50 dark:bg-[#25203b] px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-4 text-slate-400">
                      <span className="material-symbols-outlined text-xl">
                        lock
                      </span>
                      <span className="text-xs font-medium">
                        SSL Secure Payment
                      </span>
                    </div>
                  </div>
                  {/* Help Card */}
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-1">
                      support_agent
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">
                        Need Help?
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Having trouble with payment? Contact our 24/7 support
                        team.
                      </p>
                      <a
                        className="text-primary text-xs font-bold mt-2 inline-block hover:underline"
                        href="#"
                      >
                        Chat with Support
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      {openCoupon && <Coupon data={coupon!} />}
    </main>
  );
}

export default Payment;
