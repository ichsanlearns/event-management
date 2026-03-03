import { useEffect, useState } from "react";
import { getEventByOrganizer } from "../../services/event.service";
import {
  Plus,
  TrendingUp,
  Ticket,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import { getRevenueByWeek } from "../../services/order.service";

function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<any[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const organizerId = user?.id;

  async function fetchDashboardData() {
    if (!organizerId) return;

    try {
      setLoading(true);
      const res = await getEventByOrganizer(organizerId, 1, 100);
      const data = res.data || [];
      setEvents(data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, [organizerId]);

  // Menghitung total revenue dari semua event
  const totalRevenue = events.reduce(
    (acc, event) => acc + (Number(event.total_revenue) || 0),
    0,
  );

  // Menghitung total tiket terjual dari semua event
  const totalTicketsSold = events.reduce(
    (acc, event) => acc + (Number(event.tickets_sold) || 0),
    0,
  );

  // Format Mata Uang
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    async function fetchRevenueData() {
      try {
        const res = await getRevenueByWeek();
        console.log(res.data);
        setRevenueData(res.data);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
    fetchRevenueData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex">
      <section className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black dark:text-white tracking-tight">
              Organizer Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Welcome back, {user.name}! Here is what's happening today.
            </p>
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
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Total Revenue
              </p>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {loading ? "..." : formatIDR(totalRevenue)}
            </h2>
          </div>

          {/* Card Tickets */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-lg">
                <Ticket size={20} />
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Tickets Sold
              </p>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {loading ? "..." : totalTicketsSold.toLocaleString("id-ID")}
            </h2>
          </div>

          {/* Card Active Events */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-500/10 text-purple-600 rounded-lg">
                <Plus size={20} />
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Active Events
              </p>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {loading ? "..." : events.length}
            </h2>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border-light dark:border-border-dark flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-text-primary-light dark:text-white">
                Ticket Sales Overview
              </h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Daily ticket sales performance
              </p>
            </div>
            <div className="flex bg-background-light dark:bg-background-dark rounded-lg p-1">
              <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-surface-dark text-text-primary-light dark:text-white shadow-sm transition-all">
                Daily
              </button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-md text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white transition-all">
                Weekly
              </button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-md text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-white transition-all">
                Monthly
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="w-full h-64">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 1200 300"
              >
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stop-color="#3211d4"
                      stop-opacity="0.1"
                    ></stop>
                    <stop
                      offset="100%"
                      stop-color="#3211d4"
                      stop-opacity="0"
                    ></stop>
                  </linearGradient>
                </defs>
                <line
                  className="dark:stroke-slate-700"
                  stroke="#e9e7f3"
                  stroke-width="1"
                  x1="0"
                  x2="1200"
                  y1="299"
                  y2="299"
                ></line>
                <line
                  className="dark:stroke-slate-800"
                  stroke="#e9e7f3"
                  stroke-dasharray="4 4"
                  stroke-width="1"
                  x1="0"
                  x2="1200"
                  y1="225"
                  y2="225"
                ></line>
                <line
                  className="dark:stroke-slate-800"
                  stroke="#e9e7f3"
                  stroke-dasharray="4 4"
                  stroke-width="1"
                  x1="0"
                  x2="1200"
                  y1="150"
                  y2="150"
                ></line>
                <line
                  className="dark:stroke-slate-800"
                  stroke="#e9e7f3"
                  stroke-dasharray="4 4"
                  stroke-width="1"
                  x1="0"
                  x2="1200"
                  y1="75"
                  y2="75"
                ></line>
                <path
                  className="transition-all duration-1000 ease-out"
                  d="M0,250 Q100,200 200,220 T400,150 T600,100 T800,180 T1000,80 T1200,120"
                  fill="url(#chartGradient)"
                  stroke="#3211d4"
                  stroke-linecap="round"
                  stroke-width="3"
                ></path>
                <circle
                  cx="200"
                  cy="220"
                  fill="white"
                  r="4"
                  stroke="#3211d4"
                  stroke-width="2"
                ></circle>
                <circle
                  cx="400"
                  cy="150"
                  fill="white"
                  r="4"
                  stroke="#3211d4"
                  stroke-width="2"
                ></circle>
                <circle
                  cx="600"
                  cy="100"
                  fill="white"
                  r="4"
                  stroke="#3211d4"
                  stroke-width="2"
                ></circle>
                <circle
                  cx="800"
                  cy="180"
                  fill="white"
                  r="4"
                  stroke="#3211d4"
                  stroke-width="2"
                ></circle>
                <circle
                  className="animate-pulse"
                  cx="1000"
                  cy="80"
                  fill="#3211d4"
                  r="6"
                  stroke="white"
                  stroke-width="2"
                ></circle>
              </svg>
            </div>
            <div className="flex justify-between mt-4 text-xs text-text-secondary-light dark:text-text-secondary-dark px-2">
              <span>Oct 01</span>
              <span>Oct 05</span>
              <span>Oct 10</span>
              <span>Oct 15</span>
              <span>Oct 20</span>
              <span>Oct 25</span>
              <span>Oct 31</span>
            </div>
          </div>
        </div>

        {/* Event Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
            <h2 className="font-black text-slate-900 dark:text-white tracking-tight">
              Recent Events
            </h2>
            <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:underline">
              View All
            </button>
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
                    <tr
                      key={event.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group"
                    >
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {event.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium italic">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="bg-white/90 dark:bg-surface-dark/90 text-slate-900 dark:text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                          {event.category || "Event"}
                        </span>
                      </td>
                      <td className="text-center font-semibold">
                        {event.tickets_sold || 0}
                      </td>
                      <td className="text-right font-black text-slate-900 dark:text-white">
                        {formatIDR(event.total_revenue || 0)}
                      </td>
                      <td className="p-6 text-right">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                          Manage <ExternalLink size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-10 text-center text-slate-400 italic"
                    >
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
