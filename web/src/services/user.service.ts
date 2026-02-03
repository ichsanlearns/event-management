import api from "../lib/api";

export function getProfile() {
  return api.get("/auth/me").then((res) => res.data);
}
