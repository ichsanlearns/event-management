import api from "../lib/api";

export const getOrderByCustomer = async (
  customerId: string,
  status?: string,
) => {
  const res = await api.get(`/orders/customer/${customerId}`, {
    params: {
      status,
    },
  });

  return res.data;
};
