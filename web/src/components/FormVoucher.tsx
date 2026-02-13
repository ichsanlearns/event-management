import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { voucherSchema, type VoucherOutput } from "../schemas/voucher.schema";
import toast from "react-hot-toast";
import type { TEvent } from "../types/event.type";

function FormVoucher({ data, onClose }: { data: TEvent; onClose: () => void }) {
  const form = useForm({
    resolver: zodResolver(voucherSchema),
  });

  const voucherEvents = data;

  const {
    formState: { errors },
  } = form;

  async function handleSubmitButton(data: VoucherOutput) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/vouchers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, eventId: voucherEvents?.id }),
      });

      if (!response.ok) {
        toast.error("Failed to create voucher");
        return;
      }

      toast.success("Voucher created successfully");
    } catch (error) {}
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(handleSubmitButton)}>
        <div
          aria-labelledby="modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
        >
          <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity"></div>
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-border-light dark:border-border-dark">
              <div className="flex items-start gap-4 p-6 border-b border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800/50">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${voucherEvents?.heroImage})`,
                    }}
                  ></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Create New Voucher
                  </h3>
                  <div></div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    For
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      &nbsp;{voucherEvents?.name}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    form.reset();
                    onClose();
                  }}
                  className="text-slate-400 hover:text-slate-500 focus:outline-none"
                  type="button"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              {/*  */}

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Voucher Code
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      {...form.register("code")}
                      className="block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-slate-900 dark:text-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      placeholder="e.g. EARLYBIRD2024"
                      type="text"
                    />

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"></div>
                  </div>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Code must be unique and alphanumeric.
                  </p>
                  {errors.code && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.code.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Discount Amount
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-slate-500 sm:text-sm">IDR</span>
                      </div>
                      <input
                        {...form.register("discountAmount", {
                          valueAsNumber: true,
                        })}
                        className="block w-full rounded-md border-0 py-2.5 pl-12 pr-3 text-slate-900 dark:text-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        placeholder="0"
                        type="number"
                      />
                    </div>
                    {errors.discountAmount && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.discountAmount.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Quota
                    </label>
                    <input
                      {...form.register("quota", { valueAsNumber: true })}
                      className="block w-full rounded-md border-0 pl-5 pr-2 py-2.5 text-slate-900 dark:text-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      placeholder="100"
                      type="number"
                    />
                    {errors.quota && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.quota.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Start Date
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        {...form.register("startDate")}
                        className="block w-full rounded-md border-0 py-2.5 pl-3 pr-5 text-slate-900 dark:text-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        type="date"
                      />
                    </div>
                    {errors.startDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.startDate.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      End Date
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        {...form.register("endDate")}
                        className="block w-full rounded-md border-0 py-2.5 pl-3 pr-5 text-slate-900 dark:text-white dark:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        type="date"
                      />
                    </div>
                    {errors.endDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.endDate.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/*  */}
              <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 sm:flex sm:flex-row-reverse sm:gap-3 border-t border-border-light dark:border-border-dark">
                <button
                  className="inline-flex w-full justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark sm:w-auto transition-colors"
                  type="submit"
                >
                  Create Voucher
                </button>
                <button
                  onClick={() => {
                    form.reset();
                    onClose();
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-lg bg-white dark:bg-transparent px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 sm:mt-0 sm:w-auto transition-colors"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormVoucher;
