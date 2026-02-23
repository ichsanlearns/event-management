import { API_ENDPOINTS } from "../api/endpoints";
import type { createVoucherPayloads } from "../api/types";
import api from "../lib/api";

export const createVoucher = async ({
  eventId,
  ...data
}: createVoucherPayloads) => {
  const res = await api.post(`${API_ENDPOINTS.VOUCHER.CREATE}`, {
    ...data,
    eventId,
  });

  return res.data;
};
