export const API_ENDPOINTS = {
  ORDERS: {
    GET: "/orders",
    CUSTOMER: "/orders/customer",
    CREATE: "/orders",
    COUPON: "/orders/:id/coupon",
    VOUCHER: "/vouchers/check",
    DELETE: "/orders/:orderId",
  },
  REVIEW: {
    CREATE: "/reviews",
  },
  AUTH: {
    ME: "/auth/me",
  },
};
