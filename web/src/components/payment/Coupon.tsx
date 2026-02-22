import toast from "react-hot-toast";
import { patchOrderCoupon } from "../../services/order.service";
import type { IOrder, TUserCoupon } from "../../types/event.type";

function Coupon({
  data,
  orderId,
  onClose,
  onApply,
}: {
  data: TUserCoupon;
  orderId: string;
  onClose: () => void;
  onApply: (order: IOrder) => void;
}) {
  const submitCoupon = async (couponId: string) => {
    try {
      const response = await patchOrderCoupon({
        couponId,
        orderId,
      });

      toast.success("Coupon applied successfully");
      onApply(response.data.data);
      onClose();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-[#1a162e] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-[#1a162e] rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Select a Coupon
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Available Coupons
            </p>
            {data.map((item) => {
              const startDate = new Date(item.expiredAt);
              const diff = startDate.getTime() - Date.now();
              const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

              let label = "Coupon expired";

              if (daysLeft > 1) label = `Starts in ${daysLeft} days`;
              else if (daysLeft === 1) label = "Starts tomorrow";
              else if (daysLeft === 0) label = "Starts today";
              return (
                <div
                  key={item.id}
                  onClick={() => submitCoupon(item.id)}
                  className="relative group cursor-pointer flex flex-col gap-2"
                >
                  <div
                    className={`absolute -inset-0.5 bg-linear-to-r from-primary group-hover:to-purple-600 rounded-xl opacity-75 blur-sm`}
                  ></div>
                  <div className="relative p-4 bg-white dark:bg-[#1e1a34] rounded-xl border-2 border-primary shadow-sm flex items-start gap-4 ">
                    <div className="shrink-0 size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">
                        local_activity
                      </span>
                    </div>
                    <div className="grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                            Rp {item.amount} OFF
                          </h3>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-mono font-bold rounded border border-slate-200 dark:border-slate-700">
                          Referrer
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            schedule
                          </span>
                          Expires in {daysLeft} days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#201c36] rounded-b-2xl flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Coupon;
