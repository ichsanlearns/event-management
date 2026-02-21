export const Status = {
  WAITING_PAYMENT: "WAITING_PAYMENT",
  PAID: "PAID",
  CANCELLED: "CANCELLED",
  FAILED: "FAILED",
};
export type Status = (typeof Status)[keyof typeof Status];

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
};

export type Order = {
  id: string;
  orderCode: string;
  ticketId: string;
  voucherId: string;
  status: string;
  quantity: number;
  usingPoint: number;
  total: number;
  expiredAt: Date;
  ticket: ITicket;
};

export type ReviewPayload = {
  userId: string;
  eventId: string;
  orderId: string;
  comment: string;
  rating: number;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  referralCode: string;
  profileImage: string;
  Points: { amount: number };
};

export type CreateOrderPayload = {
  orderCode: string;
  customerId: string;
  ticketId: string;
  quantity: number;
  status: Status;
  usingPoint: number;
  total: number;
  email: string;
};
