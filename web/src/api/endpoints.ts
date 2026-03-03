export const API_ENDPOINTS = {
  ORDERS: {
    GET: "/orders",
    CUSTOMER: "/orders/customer",
    CREATE: "/orders",
    COUPON: "/orders/:id/coupon",
    VOUCHER: "/vouchers/check",
    DELETE: "/orders/:orderId",
    REVENUE_BY_WEEK: "/orders/:organizerId/revenue",
  },
  REVIEW: {
    CREATE: "/reviews",
  },
  AUTH: {
    ME: "/auth/me",
  },
  EVENT: {
    SEARCH: "/events/search",
    CREATE: "/events",
  },
  PROFILE: {
    ORGANIZER: "/user/organizer",
  },
  VOUCHER: {
    CREATE: "/vouchers",
  },
};
