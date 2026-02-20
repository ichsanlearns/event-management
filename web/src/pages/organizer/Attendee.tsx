import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttendees } from "../../services/attendee.service";

import type { Attendee } from "../../types/attendee.type";

function attendeePage() {
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

  if (loading) return <p className="p-8">Loading attendees...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-extrabold mb-6">Attendee List</h1>

      {attendees.length === 0 ? (
        <p className="text-slate-500">No attendees yet.</p>
      ) : (
        <div className="bg-white dark:bg-[#1a2233] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-left">
              <tr>
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold">Ticket Qty</th>
                <th className="p-4 font-bold">Total Paid</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee, index) => (
                <tr key={index} className="border-t border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-semibold">{attendee.Customer.name}</td>
                  <td className="p-4">{attendee.Customer.email}</td>
                  <td className="p-4">{attendee.quantity}</td>
                  <td className="p-4 font-bold text-indigo-600">Rp {Number(attendee.total).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default attendeePage;
