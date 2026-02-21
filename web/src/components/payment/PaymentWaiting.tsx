function PaymentWaiting() {
  return (
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
                &nbsp;{order?.ticket.eventName.name}
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
                  {hoursState}
                </span>
              </div>
              <span className="text-xl">:</span>
              <div className="bg-slate-800 rounded px-2 py-1">
                <span className="text-2xl font-bold font-mono">
                  {minutesState}
                </span>
              </div>
              <span className="text-xl">:</span>
              <div className="bg-slate-800 rounded px-2 py-1 text-red-400 animate-pulse">
                <span className="text-2xl font-bold font-mono">
                  {secondsState}
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
              className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${open === "atm" ? "rotate-180" : ""}`}
            >
              expand_more
            </span>
            How to pay via ATM
          </button>
          <button
            onClick={() => setOpen(open === "banking" ? null : "banking")}
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <span
              className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${open === "banking" ? "rotate-180" : ""}`}
            >
              expand_more
            </span>
            How to pay via M-Banking
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${open === "atm" ? "max-h-125 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
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
          className={`overflow-hidden transition-all duration-300 ease-in-out ${open === "banking" ? "max-h-125 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
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
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Upload Payment Proof
        </h3>

        {!file ? (
          <label
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            htmlFor="proofImage"
            className={`block relative border-2 border-dashed  dark:border-slate-600 rounded-xl p-8 transition-colors hover:border-primary hover:bg-slate-50 dark:hover:bg-[#25203b] group cursor-pointer text-center ${isDragging ? "border-primary bg-slate-50" : " border-slate-300"}`}
          >
            <input
              id="proofImage"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              onChange={handleInputChange}
              accept="image/*"
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
          </label>
        ) : (
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
              <div>
                <p className="text-sm text-gray-600 truncate text-center">
                  {file.name}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <button className="w-full bg-primary hover:bg-primary/90 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2">
        Submit Payment
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  );
}

export default PaymentWaiting;
