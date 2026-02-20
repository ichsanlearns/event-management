export interface Attendee {
  quantity: number;
  total: number;
  Customer: {
    id: string;
    name: string;
    email: string;
  };
}
