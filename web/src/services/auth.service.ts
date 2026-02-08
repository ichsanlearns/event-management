import api from "../lib/api";

export const register = (payload: { name: string; email: string; password: string; role: "CUSTOMER" | "EVENT_ORGANIZER"; referred_by?: string }) => api.post("/auth/register", payload);

export async function login(data: { email: string; password: string }) {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export const forgotPassword = (email: string) => api.post("/auth/forgot-password", { email });
