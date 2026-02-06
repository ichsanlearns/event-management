import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import { formattedPrice, formatTime } from "../utils/format.util";
import { useCountdown } from "../utils/countdown.util";
import type { IOrder } from "../types/event.type";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { paymentSchema, type PaymentInput } from "../schemas/payment.schema";
import toast from "react-hot-toast";

function Payment() {
  const { id } = useParams();

  const [voucher, setVoucher] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [open, setOpen] = useState<"atm" | "banking" | null>(null);
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState<IOrder | null>(null);

  const expiredAtRef = useRef(Date.now() + 2 * 60 * 60 * 1000);

  async function handleCopy() {
    await navigator.clipboard.writeText("8800 1234 5678 900");
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  const form = useForm<PaymentInput>({
    resolver: zodResolver(paymentSchema),
  });

  async function submitPromo() {
    try {
      const id = form.getValues("voucherCode");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/vouchers/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        },
      );

      const data = await response.json();

      if (!data.id) {
        return console.log("voucher not found");
      }

      setVoucher({ code: data.id, discount: data.discount_amount });
    } catch (error) {}
  }

  const timeLeft = useCountdown(expiredAtRef.current);
  const { hours, minutes, seconds } = formatTime(timeLeft);

  useEffect(() => {
    try {
      async function getOrder() {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/${id}`,
        );
        const data = await response.json();

        setOrder(data);
      }

      getOrder();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function handleSubmit(data: PaymentInput) {
    try {
      toast.loading("Processing payment...");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          orderId: id,
          amount: order?.total,
          method: "MANUAL_TRANSFER",
        }),
      });

      console.log(response);

      const result = await response.json();

      toast.success("Payment successful");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="max-w-full bg-background-dark p-30">
      <div className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        {/* Progress Steps */}
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
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Payment Actions (Cards) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Header & Timer Section */}
              <section className="bg-white dark:bg-[#1a162e] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                      Complete Your Payment
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Secure transaction for
                      <span className="font-semibold text-primary">
                        &nbsp;Neon Nights Music Festival 2024
                      </span>
                    </p>
                  </div>
                  {/* High Contrast Timer */}
                  <div className="flex flex-col items-center p-4 bg-slate-900 dark:bg-black rounded-xl text-white min-w-70">
                    <span className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                      Time Remaining
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="bg-slate-800 rounded px-2 py-1">
                        <span className="text-2xl font-bold font-mono">
                          {hours}
                        </span>
                      </div>
                      <span className="text-xl">:</span>
                      <div className="bg-slate-800 rounded px-2 py-1">
                        <span className="text-2xl font-bold font-mono">
                          {minutes}
                        </span>
                      </div>
                      <span className="text-xl">:</span>
                      <div className="bg-slate-800 rounded px-2 py-1 text-red-400 animate-pulse">
                        <span className="text-2xl font-bold font-mono">
                          {seconds}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Payment Method Selection */}
              <section className="bg-white dark:bg-[#1a162e] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    account_balance
                  </span>
                  Bank Transfer
                </h3>
                <div className="bg-slate-50 dark:bg-[#25203b] border border-slate-200 dark:border-slate-700 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-1 rounded border border-slate-200 h-10 w-16 flex items-center justify-center">
                        {/* Simple text logo representation */}
                        <span className="font-bold text-blue-800 italic">
                          BCA
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          Bank Central Asia
                        </p>
                        <p className="text-sm text-slate-500">
                          Virtual Account
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-green-600">
                      check_circle
                    </span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-600 my-4"></div>
                  <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                        Virtual Account Number
                      </p>
                      <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white tracking-wider">
                        8800 1234 5678 900
                      </p>
                    </div>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${copied ? "text-primary bg-primary/10" : "bg-blue-100 text-blue-700"} hover:bg-primary/20 rounded-lg transition-colors`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        content_copy
                      </span>
                      {copied ? "Copied ✓" : "Copy Number"}
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex gap-4 text-sm text-slate-500">
                  <button
                    onClick={() => setOpen(open === "atm" ? null : "atm")}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${
                        open === "atm" ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                    How to pay via ATM
                  </button>
                  <button
                    onClick={() =>
                      setOpen(open === "banking" ? null : "banking")
                    }
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${
                        open === "banking" ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                    How to pay via M-Banking
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    open === "atm"
                      ? "max-h-125 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-2">
                    <li> Insert your BCA ATM card and enter your PIN</li>
                    <li>
                      Select <strong>Transaksi Lainnya</strong>
                    </li>
                    <li>
                      Choose <strong>Transfer</strong>
                    </li>
                    <li>
                      Select <strong>Ke Rek BCA Virtual Account</strong>
                    </li>
                    <li>
                      Enter your <strong>Virtual Account Number</strong>
                    </li>
                    <li> Check the payment details shown on the screen</li>
                    <li> Confirm the transaction</li>
                    <li> Payment completed successfully</li>
                  </ol>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    open === "banking"
                      ? "max-h-125 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-2">
                    <li>
                      Open the <strong>BCA Mobile</strong> app
                    </li>
                    <li>
                      Select <strong>m-BCA</strong> and enter your PIN
                    </li>
                    <li>
                      Choose <strong>m-Transfer</strong>
                    </li>
                    <li>
                      Select <strong>BCA Virtual Account</strong>
                    </li>
                    <li>
                      Enter your <strong>Virtual Account Number</strong>
                    </li>
                    <li> Verify the payment details</li>
                    <li>
                      Enter your <strong>m-BCA PIN</strong> to confirm
                    </li>
                    <li> Payment completed successfully</li>
                  </ol>
                </div>
              </section>
              {/* Upload Proof */}
              <section className="bg-white dark:bg-[#1a162e] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Upload Payment Proof
                </h3>
                <p className="text-sm text-slate-900 dark:text-white mb-4">
                  (link to upload proof)
                </p>
                <input
                  {...form.register("proofImage")}
                  placeholder="https://..."
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2"
                />
                {form.formState.errors.proofImage && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.proofImage.message}
                  </p>
                )}
              </section>
              {/* CTA */}
              <button className="w-full bg-primary hover:bg-primary/90 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2">
                Submit Payment
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            {/* Right Column: Order Summary (Sticky) */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-24 space-y-6">
                {/* Order Summary Card */}
                <div className="bg-white dark:bg-[#1a162e] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                  <div
                    className="h-32 w-full bg-cover bg-center relative"
                    data-alt="Neon festival crowd with lasers and stage lights"
                    style={{
                      backgroundImage: `url(${order?.Ticket.EventName.image})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h4 className="text-white font-bold text-lg leading-tight">
                        {order?.Ticket.EventName.name}
                      </h4>
                      <p className="text-white/80 text-xs mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          location_on
                        </span>
                        {order?.Ticket.EventName.city}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-sm text-slate-500 font-medium">
                          Order ID: {order?.order_code}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {order?.created_at}
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
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-300">
                          {order?.Ticket.type} Access ({order?.quantity}x)
                        </span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          Rp {order?.Ticket.price}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-300">
                          Processing Fee
                        </span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          Rp 50.000
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            loyalty
                          </span>
                          Points Redeemed
                        </span>
                        <span className="font-medium">- Rp 50.000</span>
                      </div>
                      {voucher ? (
                        <>
                          {/* Discounts */}
                          <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">
                                local_offer
                              </span>
                              Promo (PROMOCODE)
                            </span>
                            <span className="font-medium">
                              - Rp {voucher.discount}
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

                      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                        <div className="flex justify-between items-end">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">
                            Total Amount
                          </span>
                          <span className="text-2xl font-black text-primary">
                            Rp {order ? formattedPrice(order?.total) : ""}
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
      </div>
    </main>
  );
}

export default Payment;
