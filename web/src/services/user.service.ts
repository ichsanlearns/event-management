import api from "../lib/api";

export function getProfile() {
  return api.get("/auth/me").then((res) => res.data);
}

export const updateProfile = (data: { name: string; email: string }) => api.put("/user/me", data);
