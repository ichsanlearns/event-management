export interface OrderApproval {
  id: string;
  order_code: string;
  quantity: number;
  total: string | number;
  status: string;

  Customer: {
    name: string;
    email: string;
    profile_image: string | null;
  };

  Ticket: {
    type: string;
    EventName: {
      name: string;
      hero_image: string | null;
    };
  };

  Payments: {
    method: string;
    proof_image: string | null;
    status: string;
  }[];
}
