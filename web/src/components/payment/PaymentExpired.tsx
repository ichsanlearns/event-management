function PaymentExpired() {
  return (
    <div className="lg:col-span-8 space-y-6">
      <section className="bg-white dark:bg-[#1a162e] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
              Payment Status
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Order for
              <span className="font-semibold text-primary">
                Neon Nights Music Festival 2024
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-[#1a162e] rounded-xl p-12 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-red-500 text-4xl">
            timer_off
          </span>
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Order Expired
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 text-lg">
          This payment was not completed within the 2-hour window. Please create
          a new order to proceed.
        </p>
        <button className="bg-primary hover:bg-primary/90 text-white text-lg font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2">
          Create New Order
          <span className="material-symbols-outlined">add_circle</span>
        </button>
      </section>
    </div>
  );
}

export default PaymentExpired;
