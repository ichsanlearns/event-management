import api from "../lib/api";

export const approveOrderApi = async (id: string) => {
  const res = await api.patch(`approval/orders/${id}/approve`);
  return res.data;
};

export const rejectOrderApi = async (id: string) => {
  const res = await api.patch(`approval/orders/${id}/reject`);
  return res.data;
};

export const getPendingOrdersApi = async () => {
  const res = await api.get("approval/orders/pending");
  return res.data;
};

export const getPendingOrders = () => api.get("/approval/orders/pending");

export const getApprovedOrders = () => api.get("/approval/orders/approved");

export const getRejectedOrders = () => api.get("/approval/orders/rejected");

export const getOrdersByStatusApi = (status: string) => api.get(`/approval/orders/status/${status}`);
