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
  Quota: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: string | null;
}

export type TEvent = {
  id?: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  city: string;
  available_seats: number;
  organizer_id: string;
  start_date: Date;
  end_date?: Date;
  image?: string;
  Tickets?: ITicket[];
};
