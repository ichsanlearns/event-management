const Category = {
  MUSIC: "MUSIC",
  SPORT: "SPORT",
  THEATRE: "THEATRE",
};
type Category = (typeof Category)[keyof typeof Category];

export interface ITicket {
  id: string;
  eventId: string;
  type: "EARLYBIRD" | "REGULER" | "VIP";
  price: number;
  quota: number;
  bought: number;
  eventName: TEvent;
}

export interface IVoucher {
  id: string;
  code: string;
  discountAmount: number;
  quota: number;
}

export interface ICoupon {
  id: string;
  amount: number;
  expiredAt: Date;
  referrerId: string;
}

export type TUserCoupon = ICoupon[];

export type TEvent = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  category: Category;
  venue: string;
  city: string;
  availableSeats: number;
  organizerId: string;
  heroImage: string;
  about: string;
  startDate: Date;
  endDate?: Date;
  tickets?: ITicket[];
  orderCancelled: number;
  lowestPrice: number;
};

type OrderStatus =
  | "WAITING_PAYMENT"
  | "WAITING_CONFIRMATION"
  | "DONE"
  | "PAID"
  | "REVIEWED"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED";

export interface IOrder {
  id: string;
  orderCode: string;
  customerId: string;
  ticketId: string;
  voucherId: string;
  couponId: string;
  status: OrderStatus;
  quantity: number;
  usingPoint: number;
  total: number;
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  voucher: IVoucher;
  coupon: ICoupon;
  ticket: ITicket;
  userCoupons: TUserCoupon;
}
