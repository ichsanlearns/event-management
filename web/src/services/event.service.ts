import api from "../lib/api";

export const createEvent = async (data: any) => {
  const res = await api.post("/events/", data);
  return res.data;
};
