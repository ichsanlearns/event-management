import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAttendees } from "../../services/attendee.service";
import type { Attendee } from "../../types/attendee.type";

function AttendeePage() {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!eventId) {
        setLoading(false);
        return;
      }
      try {
        const data = await getAttendees(eventId);
        setAttendees(data);
      } catch (error) {
        console.error("Error fetching attendees:", error);
        setAttendees([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [eventId]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium italic">Loading guest list...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      {/* Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link to="/dashboard/events" className="hover:text-primary transition-colors">
              Events
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-900 dark:text-slate-300 font-medium">Attendee Management</span>
          </nav>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Attendee Management</h2>
          <p className="text-slate-500 mt-1">Real-time tracking of guest list, ticket types, and revenue.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary px-4 py-2.5 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 transition-all">
            <span className="material-symbols-outlined text-lg">download</span> Export CSV
          </button>
        </div>
      </div>

      {/* Summary Metrics (Opsional - Data statis berdasarkan array) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Total Attendees" value={attendees.length.toString()} icon="groups" color="blue" />
        <StatsCard label="Tickets Sold" value={attendees.reduce((acc, curr) => acc + curr.quantity, 0).toString()} icon="local_activity" color="purple" />
        <StatsCard label="Total Revenue" value={formatCurrency(attendees.reduce((acc, curr) => acc + Number(curr.total), 0))} icon="payments" color="emerald" />
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-primary rounded-lg text-sm transition-all" placeholder="Search attendee..." />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Attendee Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ticket Quantity</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Total Paid</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {attendees.length > 0 ? (
                attendees.map((attendee, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">{attendee.Customer.name.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{attendee.Customer.name}</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400">Buyer</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{attendee.Customer.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200">{attendee.quantity} Tickets</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-black text-slate-900 dark:text-white">{formatCurrency(Number(attendee.total))}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-primary transition-all">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                    No attendees found for this event.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

// Sub-komponen
function StatsCard({ label, value, icon, color }: any) {
  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20",
    purple: "bg-purple-50 text-primary dark:bg-purple-900/20",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20",
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-1">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black">{value}</p>
      </div>
      <div className={`${colorMap[color]} p-3 rounded-lg`}>
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
    </div>
  );
}

export default AttendeePage;
