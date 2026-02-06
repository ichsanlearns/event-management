const Category = {
  MUSIC: "MUSIC",
  SPORT: "SPORT",
  THEATRE: "THEATRE",
};
type Category = (typeof Category)[keyof typeof Category];

export interface ITicket {
  id: string;
  event_id: string;
  type: "EARLYBIRD" | "REGULER" | "VIP";
  price: number;
  quota: number;
  bought: number;

  created_at: Date;
  updated_at: Date;
  deleted_at: string | null;

  EventName: TEvent;
}

export type TEvent = {
  id?: string;
  name: string;
  price: number;
  tagline: string;
  category: Category;
  city: string;
  available_seats: number;
  organizer_id: string;
  start_date: Date;
  end_date?: Date;
  image?: string;
  about?: string;
  Tickets?: ITicket[];
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
