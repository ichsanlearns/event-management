export type UserRole = "CUSTOMER" | "EVENT_ORGANIZER";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  referral_code?: string;
  profile_image?: string;
  points?: number;
}
