export interface Point {
  id: string;
  amount: number;
  expired_at: string;
}

export interface Coupon {
  id: string;
  amount: number;
  expired_at: string;
}

export interface UserRewards {
  total_point: number;
  points: Point[];
  coupons: Coupon[];
}
