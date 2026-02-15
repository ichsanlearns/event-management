import { useState } from "react";
import { CheckCircle2, Download, CheckCheck, Search, Filter, Calendar as CalendarIcon, Check, X, Paperclip, FileText, ChevronLeft, ChevronRight, Menu, Clock } from "lucide-react";

function Approval() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen w-full font-['Manrope'] bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 antialiased overflow-hidden">
      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#1a2233] border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-primary" size={20} />
            <span className="font-bold text-lg">Approvals</span>
          </div>
          <button className="text-slate-500">
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-300 mx-auto flex flex-col gap-6">
            {/* Header Title & Actions */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <span>Dashboard</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 dark:text-white font-bold">Transaction Approvals</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Transaction Approvals</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Review and verify pending ticket purchases for upcoming events.</p>
                </div>
                <div className="flex gap-2">
                  <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all">
                    <Download size={18} /> Export CSV
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-primary/20">
                    <CheckCheck size={18} /> Bulk Approve
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsCard title="Pending Review" value="12" badge="High Priority" icon={<Clock />} color="text-orange-500" />
              <StatsCard title="Approved Today" value="45" badge="+12% vs avg" icon={<CheckCircle2 />} color="text-emerald-500" />
              <StatsCard title="Rejected" value="3" badge="Suspicious" icon={<X />} color="text-rose-500" />
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-white dark:bg-[#1a2233] p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center w-full sm:flex-1 h-10 px-3 gap-2 bg-[#f6f6f8] dark:bg-[#101622] rounded-lg border border-transparent focus-within:border-primary transition-all">
                <Search className="text-slate-400" size={18} />
                <input
                  className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-slate-400 font-medium"
                  placeholder="Search by buyer name, transaction ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                <FilterButton icon={<Filter size={16} />} label="All Status" />
                <FilterButton icon={<CalendarIcon size={16} />} label="Oct 2023" />
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-[#1a2233] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full min-w-200 table-auto">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 font-bold">
                    <tr>
                      <th className="px-6 py-4 text-left w-12">
                        <input type="checkbox" className="rounded border-slate-300 text-primary size-4" />
                      </th>
                      <th className="px-6 py-4 text-left text-xs text-slate-500 uppercase tracking-widest">Buyer</th>
                      <th className="px-6 py-4 text-left text-xs text-slate-500 uppercase tracking-widest">Date & Time</th>
                      <th className="px-6 py-4 text-left text-xs text-slate-500 uppercase tracking-widest">Ticket Type</th>
                      <th className="px-6 py-4 text-right text-xs text-slate-500 uppercase tracking-widest">Amount</th>
                      <th className="px-6 py-4 text-left text-xs text-slate-500 uppercase tracking-widest">Proof</th>
                      <th className="px-6 py-4 text-center text-xs text-slate-500 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    <TransactionRow initial="AF" name="Alice Freeman" id="#TRX-8821" date="Oct 24, 2023" time="14:30 PM" type="VIP Access" amount="$150.00" proof="receipt_442.jpg" proofIcon={<Paperclip size={14} />} />
                    <TransactionRow initial="MC" name="Marcus Chen" id="#TRX-8822" date="Oct 24, 2023" time="13:15 PM" type="Early Bird" amount="$85.00" proof="invoice.pdf" proofIcon={<FileText size={14} />} />
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-transparent">
                <p className="text-sm text-slate-500">
                  Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">5</span> of 12
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-bold text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50 flex items-center gap-1">
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <button className="px-3 py-1.5 text-xs font-bold text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 flex items-center gap-1">
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Komponen Pendukung (Sub-components) ---

function StatsCard({ title, value, badge, icon, color }: any) {
  return (
    <div className="p-5 rounded-xl bg-white dark:bg-[#1a2233] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-4 right-4 opacity-10 group-hover:opacity-25 transition-opacity ${color}`}>{icon}</div>
      <p className="text-slate-500 text-sm font-bold">{title}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <p className="text-3xl font-black">{value}</p>
        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 uppercase tracking-tighter">{badge}</span>
      </div>
    </div>
  );
}

function TransactionRow({ initial, name, id, date, time, type, amount, proof, proofIcon }: any) {
  return (
    <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
      <td className="px-6 py-4">
        <input type="checkbox" className="rounded border-slate-300 text-primary size-4" />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-[10px] font-black">{initial}</div>
          <div className="flex flex-col">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{name}</p>
            <p className="text-[11px] text-slate-500 font-medium">{id}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm font-bold">{date}</p>
        <p className="text-[11px] text-slate-500">{time}</p>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 uppercase">{type}</span>
      </td>
      <td className="px-6 py-4 text-right font-black text-sm">{amount}</td>
      <td className="px-6 py-4">
        <button className="flex items-center gap-1.5 text-primary hover:text-blue-800 dark:hover:text-blue-400 text-xs font-bold transition-colors underline decoration-transparent hover:decoration-current">
          {proofIcon} {proof}
        </button>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all active:scale-90 border border-transparent hover:border-emerald-100" title="Approve">
            <Check size={18} />
          </button>
          <button className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-90 border border-transparent hover:border-rose-100" title="Reject">
            <X size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function FilterButton({ icon, label }: any) {
  return (
    <button className="flex items-center gap-2 px-3 h-10 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold transition-all">
      {icon} {label}
    </button>
  );
}

export default Approval;
