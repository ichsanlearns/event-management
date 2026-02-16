import { API_ENDPOINTS } from "../api/endpoints";
import api from "../api/client";

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
