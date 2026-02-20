import { X, Fullscreen, AlertTriangle } from "lucide-react";
import type { OrderApproval } from "../types/approval.type";

type Props = {
  open: boolean;
  onClose: () => void;
  order: OrderApproval | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  loading?: boolean;
};

export default function PaymentVerificationModal({ open, onClose, order, onApprove, onReject, loading }: Props) {
  if (!order) return null;

  const paymentInfo = order.Payments?.[0];
  const proofImage = paymentInfo?.proof_image;

  return (
    <>
      <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={onClose} />

      <aside
        className={`fixed right-0 top-0 h-full w-full sm:w-112.5 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Verifikasi Pembayaran</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {/* Info Attendee */}
          <div className="mb-8">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Detail Pemesan</p>
            <div className="flex items-center gap-4 mb-4">
              <img src={order.Customer.profile_image || `https://ui-avatars.com/api/?name=${order.Customer.name}`} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 p-0.5" alt="Avatar" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{order.Customer.name}</h3>
                <p className="text-sm text-slate-500">{order.Customer.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Order Code</p>
                <p className="text-sm font-bold">{order.order_code}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Bayar</p>
                <p className="text-sm font-bold text-primary">Rp {Number(order.total).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Bukti Transfer */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Bukti Pembayaran</p>
              {proofImage && (
                <button onClick={() => window.open(proofImage, "_blank")} className="text-primary text-xs font-bold flex items-center gap-1">
                  <Fullscreen size={14} /> View Full
                </button>
              )}
            </div>

            <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="aspect-3/4 bg-slate-100 dark:bg-slate-800">
                {proofImage ? (
                  <img src={proofImage} className="w-full h-full object-cover" alt="Proof" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                    <AlertTriangle size={32} className="mb-2 opacity-20" />
                    <p className="text-xs italic">User belum mengunggah bukti pembayaran (Metode: {paymentInfo?.method || "N/A"})</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Event Context */}
          <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Untuk Event</p>
            <h4 className="text-sm font-bold">{order.Ticket.EventName.name}</h4>
            <p className="text-xs text-slate-500 mt-1">
              {order.Ticket.type} Ticket • {order.quantity} Qty
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
          <div className="grid grid-cols-2 gap-4">
            <button
              disabled={loading}
              onClick={() => onReject(order.id)}
              className="flex items-center justify-center gap-2 py-3 border border-red-200 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              Reject
            </button>
            <button disabled={loading} onClick={() => onApprove(order.id)} className="flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50">
              Approve
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
