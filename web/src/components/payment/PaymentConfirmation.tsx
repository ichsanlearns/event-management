function PaymentConfirmation() {
  return (
    <div className="lg:col-span-8 space-y-6">
      <section className="bg-white dark:bg-[#1a162e] rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6 text-blue-600 dark:text-blue-400">
          <span className="material-symbols-outlined text-5xl">
            manage_search
          </span>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
          Payment Under Review
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-lg leading-relaxed">
          Thank you for your payment. We are currently verifying your
          transaction details. This process typically takes up to
          <span className="font-semibold text-slate-900 dark:text-white">
            &nbsp;3 business days
          </span>
          . You will receive an email confirmation once approved.
        </p>
        <div className="mt-10 bg-slate-50 dark:bg-[#25203b] border border-slate-100 dark:border-slate-800 rounded-xl p-6 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-700 pb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Uploaded Proof
            </h3>
            <span className="text-xs text-slate-500">Submitted just now</span>
          </div>
          <div className="flex items-center gap-4 text-left">
            <div className="size-16 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden relative">
              <span className="material-symbols-outlined text-3xl text-slate-300">
                receipt_long
              </span>
              <div className="absolute inset-0 bg-primary/5"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                transfer_receipt_bca_8839.jpg
              </p>
              <p className="text-xs text-slate-500 mt-1">245 KB • JPEG Image</p>
            </div>
            <div className="flex items-center justify-center size-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <span className="material-symbols-outlined text-sm">check</span>
            </div>
          </div>
        </div>
      </section>
      <button
        className="w-full bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-lg font-bold py-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
        disabled
      >
        Verifying Payment
        <span className="material-symbols-outlined animate-spin text-xl">
          progress_activity
        </span>
      </button>
    </div>
  );
}

export default PaymentConfirmation;
