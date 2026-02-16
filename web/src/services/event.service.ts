import api from "../lib/api";

export const createEvent = async (data: any) => {
  const res = await api.post("/events/", data);
  return res.data;
};

export const getEventByOrganizer = async (
  organizerId: string,
  page: number,
  limit: number,
  search?: string,
) => {
  const res = await api.get(`/events/organizer/${organizerId}`, {
    params: {
      page,
      limit,
      search,
    },
  });

  return res.data;
};

export const getEventsApi = async (params?: { search?: string }) => {
  const res = await api.get("/events", {
    params,
  });
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
