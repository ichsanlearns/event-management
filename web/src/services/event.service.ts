import api from "../lib/api";

export const createEvent = async (data: any) => {
  const res = await api.post("/events/", data);
  return res.data;
};

export const getEventByOrganizer = async (organizerId: string, page: number, limit: number) => {
  const res = await api.get(`/events/organizer/${organizerId}?page=${page}&limit=${limit}`);
  return res.data;
};

export const getEventById = (id: string) => api.get(`/events/${id}`);

export const updateEventApi = async (id: string, data: any) => {
  const res = await api.patch(`/events/${id}`, data);
  return res.data;
};

export const deleteEvent = async (id: string) => {
  const res = await api.delete(`/events/${id}`);
  return res.data;
};
