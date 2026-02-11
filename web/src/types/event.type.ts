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

type OrderStatus =
  | "WAITING_PAYMENT"
  | "WAITING_CONFIRMATION"
  | "DONE"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELLED";

export interface IOrder {
  id: string;
  orderCode: string;
  customerId: string;
  ticketId: string;
  voucherId: string;
  status: OrderStatus;
  quantity: number;
  usingPoint: number;
  total: number;
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  ticket: ITicket;
}
