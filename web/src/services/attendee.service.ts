import api from "../lib/api";

export async function getAttendees(eventId: string) {
  const res = await api.get(`/events/${eventId}/attendees`);
  return res.data.data;
}
