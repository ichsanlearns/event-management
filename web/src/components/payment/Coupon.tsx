import type { ICoupon } from "../../types/event.type";

function Coupon({ data }: { data: ICoupon[] }) {
  const submitCoupon = () => {
    try {
    } catch (error) {}
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-[#1a162e] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-[#1a162e] rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Select a Coupon
          </h2>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex gap-2 mb-6">
            <div className="relative grow">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[20px]">
                  sell
                </span>
              </span>
              <input
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#25203b] text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="Enter coupon code"
                type="text"
              />
            </div>
            <button className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              Apply
            </button>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Available Coupons
            </p>
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-purple-600 rounded-xl opacity-75 blur-sm"></div>
              {data.map((item) => (
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
                          Rp 50.000 OFF
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Min. spend Rp 500.000
                        </p>
                      </div>
                      <div className="flex items-center justify-center size-6 rounded-full bg-primary text-white">
                        <span className="material-symbols-outlined text-sm font-bold">
                          check
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-mono font-bold rounded border border-slate-200 dark:border-slate-700">
                        SUPERFAN50
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          schedule
                        </span>
                        Expires in 2 days
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#201c36] rounded-b-2xl flex justify-end gap-3">
          <button className="px-5 py-2.5 rounded-lg font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Cancel
          </button>
          <button className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
            Apply Coupon
          </button>
        </div>
      </div>
    </div>
  );
}

export default Coupon;
