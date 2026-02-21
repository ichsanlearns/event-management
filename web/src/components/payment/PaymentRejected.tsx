import { useState } from "react";

function PaymentRejected() {
  const [isOpen, setIsOpen] = useState<string | null>(null);
  return (
    <div className="lg:col-span-8 space-y-6">
      <section className="bg-white dark:bg-[#1a162e] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex flex-col justify-between gap-6">
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
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3 w-full">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400 mt-0.5">
              error
            </span>
            <div>
              <h4 className="text-sm font-bold text-red-800 dark:text-red-300">
                Payment Rejected
              </h4>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                Payment proof unclear. Please re-upload a clear image of your
                transaction receipt showing the transfer amount and date.
              </p>
            </div>
          </div>
        </div>
      </section>
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
                <span className="font-bold text-blue-800 italic">BCA</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Bank Central Asia
                </p>
                <p className="text-sm text-slate-500">Virtual Account</p>
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
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                content_copy
              </span>
              Copy Number
            </button>
          </div>
        </div>
        <div className="mt-4 flex gap-4 text-sm text-slate-500">
          <button
            onClick={() => setIsOpen(isOpen === "atm" ? null : "atm")}
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <span
              className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isOpen === "atm" ? "rotate-180" : ""}`}
            >
              expand_more
            </span>
            How to pay via ATM
          </button>
          <button
            onClick={() => setIsOpen(isOpen === "banking" ? null : "banking")}
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <span
              className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isOpen === "banking" ? "rotate-180" : ""}`}
            >
              expand_more
            </span>
            How to pay via M-Banking
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen === "atm" ? "max-h-125 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
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
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen === "banking" ? "max-h-125 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
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
      <section className="bg-white dark:bg-[#1a162e] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Previous Upload
          </h3>
          <div className="bg-slate-50 dark:bg-[#25203b] p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-4">
            <div
              className="size-16 rounded bg-slate-200 dark:bg-slate-800 flex-shrink-0 bg-cover bg-center opacity-70"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNd6nfumOyOaGStunmqgtgZ2fD-6FwF9JLShHQPWohL-f5xWn3TRPXC9NKXOgkMgCiOWjL8OzY-9b7MzXLFz9Ok1ALB3BVpX0Z2VTdPEhC6NVWEvli_2pugAnrdMAQFWsI9ntonPV6wj1bF6Aj9lldfmTwGOxOGOevBUAM4lwhJyW1_oYz4afJ9inOmSofRUKNZg6wMd16QibjBeU1nCWNo5HlbuwXCGdMN5JA0P94MyPp3_-SNgfPxGf0rNJNEgRl6jaSUNS0yJA')",
              }}
            ></div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                transfer_receipt_001.jpg
              </p>
              <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[14px]">
                  cancel
                </span>
                Rejected
              </p>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Re-upload Payment Proof
        </h3>
        <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 transition-colors hover:border-primary hover:bg-slate-50 dark:hover:bg-[#25203b] group cursor-pointer text-center">
          <input
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            type="file"
          />
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">
                cloud_upload
              </span>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-slate-500 mt-1">
                SVG, PNG, JPG or GIF (max. 2MB)
              </p>
            </div>
          </div>
        </div>
      </section>
      <button className="w-full bg-primary hover:bg-primary/90 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2">
        Resubmit Payment
        <span className="material-symbols-outlined">refresh</span>
      </button>
    </div>
  );
}

export default PaymentRejected;
