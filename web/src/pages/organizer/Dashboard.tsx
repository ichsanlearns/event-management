import { useEffect, useState } from "react";
import { getEventByOrganizer } from "../../services/event.service";
import { Plus, TrendingUp, Ticket, DollarSign, ExternalLink } from "lucide-react";

function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const organizerId = user?.id;

  async function fetchDashboardData() {
    if (!organizerId) return;

    try {
      setLoading(true);
      const res = await getEventByOrganizer(organizerId, 1, 100);
      const data = res.data || [];
      setEvents(data);
    } catch (error) {
      console.error("failed load dashboard data", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, [organizerId]);

  // Menghitung total revenue dari semua event
  const totalRevenue = events.reduce((acc, event) => acc + (Number(event.total_revenue) || 0), 0);

  // Menghitung total tiket terjual dari semua event
  const totalTicketsSold = events.reduce((acc, event) => acc + (Number(event.tickets_sold) || 0), 0);

  // Format Mata Uang
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex">
      <section className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black dark:text-white tracking-tight">Organizer Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back, {user.name}! Here is what's happening today.</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95">
            <Plus size={20} /> Create New Event
          </button>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card Revenue */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
            <div className="absolute -right-2.5 -top-2.5 text-slate-50 opacity-5 dark:opacity-10 group-hover:scale-110 transition-transform">
              <DollarSign size={100} />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 rounded-lg">
                <TrendingUp size={20} />
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Revenue</p>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">{loading ? "..." : formatIDR(totalRevenue)}</h2>
          </div>

          {/* Card Tickets */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-lg">
                <Ticket size={20} />
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Tickets Sold</p>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">{loading ? "..." : totalTicketsSold.toLocaleString("id-ID")}</h2>
          </div>

          {/* Card Active Events */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-500/10 text-purple-600 rounded-lg">
                <Plus size={20} />
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Events</p>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">{loading ? "..." : events.length}</h2>
          </div>
        </div>

        {/* Event Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
            <h2 className="font-black text-slate-900 dark:text-white tracking-tight">Recent Events</h2>
            <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="p-6 text-left">Event Name</th>
                  <th className="text-left">Category</th>
                  <th className="text-center">Sold</th>
                  <th className="text-right">Revenue</th>
                  <th className="p-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                {events.length > 0 ? (
                  events.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-white">{event.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium italic">{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td>
                        <span className="bg-white/90 dark:bg-surface-dark/90 text-slate-900 dark:text-white text-[10px] font-bold px-2 py-1 rounded uppercase">{event.category || "Event"}</span>
                      </td>
                      <td className="text-center font-semibold">{event.tickets_sold || 0}</td>
                      <td className="text-right font-black text-slate-900 dark:text-white">{formatIDR(event.total_revenue || 0)}</td>
                      <td className="p-6 text-right">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                          Manage <ExternalLink size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-400 italic">
                      No events found. Start by creating one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
