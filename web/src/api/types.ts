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
  ticket: ITicket;
};

export type ReviewPayload = {
  userId: string;
  eventId: string;
  orderId: string;
  comment: string;
  rating: number;
};
