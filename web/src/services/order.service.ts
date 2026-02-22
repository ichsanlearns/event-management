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

export const patchOrderCoupon = async ({
  couponId,
  orderId,
}: {
  couponId: string;
  orderId: string;
}) => {
  const endpoint = API_ENDPOINTS.ORDERS.COUPON.replace(":id", orderId);
  return api.patch(endpoint, {
    couponId,
  });
};

export const patchOrderVoucher = async ({
  voucherCode,
  orderId,
  eventId,
}: {
  voucherCode: string;
  orderId: string;
  eventId: string;
}) => {
  return api.patch(API_ENDPOINTS.ORDERS.VOUCHER, {
    code: voucherCode,
    orderId,
    eventId,
  });
};
