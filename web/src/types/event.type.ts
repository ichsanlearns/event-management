const Category = {
  MUSIC: "MUSIC",
  SPORT: "SPORT",
  THEATRE: "THEATRE",
};
type Category = (typeof Category)[keyof typeof Category];

export interface ITicket {
  id: string;
  type: "EARLYBIRD" | "REGULER" | "VIP";
  price: number;
  quota: number;
  bought: number;
}

export type TEvent = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  category: Category;
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
  order_code: string;
  customer_id: string;
  ticket_id: string;
  voucher_id: string;
  status: OrderStatus;
  quantity: number;
  using_point: number;
  total: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  Ticket: ITicket;
}
