export interface Order {
  id: number;
  user: { name: string };
  event: { title: string };
  status: string;
}
