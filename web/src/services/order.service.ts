import { API_ENDPOINTS } from "../api/endpoints";
import api from "../api/client";
import type { CreateOrderPayload } from "../api/types";

export const createOrder = async (order: CreateOrderPayload) => {
  const res = await api.post(API_ENDPOINTS.ORDERS.CREATE, order);
  return res.data;
};

export const getOrderByCustomer = async (
  customerId: string,
  status?: string,
) => {
  const res = await api.get(`${API_ENDPOINTS.ORDERS.CUSTOMER}/${customerId}`, {
    params: {
      status,
    },
  });

  return res.data;
};

export const getOrderById = async (orderId: string) => {
  const res = await api.get(`${API_ENDPOINTS.ORDERS.GET}/${orderId}`);
  return res.data;
};
