export const Category = [
  "Music",
  "Theatre",
  "Sport",
  "Art",
  "Food",
  "Fashion",
  "Travel",
];

type Category = (typeof Category)[number];

export type EventInput = {
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
  endDate: Date;
};
