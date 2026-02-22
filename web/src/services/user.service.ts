import { API_ENDPOINTS } from "../api/endpoints";
import api from "../lib/api";

export function getProfile() {
  return api.get("/auth/me").then((res) => res.data);
}

export const updateProfile = (data: { name: string; email: string }) =>
  api.put("/user/me", data);

export function changePassword(payload: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  return api.put("/user/change-password", payload);
}

export function getOrganizerProfile(organizerId: string) {
  return api.get(`${API_ENDPOINTS.PROFILE.ORGANIZER}/${organizerId}`);
}
