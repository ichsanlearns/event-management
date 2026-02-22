import { Link } from "react-router";
import type { IOrder } from "../../types/event.type";
import { formatEventDateYear } from "../../utils/format.util";

function PaymentPaid({ order }: { order: IOrder }) {
  return (
    <div className="lg:col-span-8 space-y-6">
      <section className="bg-white dark:bg-[#1a162e] rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 text-center">
        <div className="flex justify-center mb-6">
          <div className="size-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-6xl">
              check_circle
            </span>
          </div>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
          Payment Successful!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">
          Thank you for your purchase. Your payment has been processed
          successfully and your tickets for
          <span className="font-semibold text-primary">
            &nbsp;{order.ticket.eventName.name}&nbsp;
          </span>
          have been secured.
        </p>
        <div className="bg-slate-50 dark:bg-[#25203b] border border-slate-200 dark:border-slate-700 rounded-lg p-6 max-w-xl mx-auto mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1">
                Payment Date
              </p>
              <p className="text-slate-900 dark:text-white font-medium">
                {order.payments && order.payments.length > 0
                  ? formatEventDateYear(new Date(order.payments[0].createdAt))
                  : "-"}
              </p>
              <p className="text-slate-500 text-sm">14:30 WIB</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1">
                Transaction ID
              </p>
              <p className="text-slate-900 dark:text-white font-mono font-medium">
                {order.payments && order.payments.length > 0
                  ? order.payments[0].id
                  : "-"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1">
                Amount Paid
              </p>
              <p className="text-primary font-bold text-xl">
                Rp{" "}
                {order.payments && order.payments.length > 0
                  ? order.payments[0].amount
                  : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={`/myticket`}
            className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">
              confirmation_number
            </span>
            View Ticket
          </Link>
        </div>
      </section>
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 mt-0.5">
          info
        </span>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
            Check your email
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            We've sent the receipt and ticket details to your email address
            associated with this account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentPaid;
