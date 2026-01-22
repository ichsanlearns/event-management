function Dashboard() {
  return (
    <main className="min-h-screen mi bg-slate-100 dark:bg-slate-900 flex">
      {/* Content */}
      <section className="flex-1 p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Organizer Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Overview of your event performance</p>
          </div>

          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">+ Create Event</button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <p className="text-sm text-slate-500">Total Revenue</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">IDR 124.500.000</h2>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <p className="text-sm text-slate-500">Tickets Sold</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3.420</h2>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <p className="text-sm text-slate-500">Active Events</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4</h2>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-10 shadow">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Ticket Sales Statistics</h2>
          <div className="h-64 flex items-center justify-center border border-dashed rounded-lg text-slate-400">Chart (Daily / Monthly / Yearly)</div>
        </div>

        {/* Event Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="p-4 text-left">Event</th>
                <th>Status</th>
                <th>Tickets Sold</th>
                <th>Revenue</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t dark:border-slate-700">
                <td className="p-4 font-medium text-slate-900 dark:text-white">Music Festival 2024</td>
                <td>
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">Published</span>
                </td>
                <td>850</td>
                <td>IDR 42.000.000</td>
                <td className="p-4 text-right">
                  <button className="text-indigo-600 hover:underline">Manage</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
