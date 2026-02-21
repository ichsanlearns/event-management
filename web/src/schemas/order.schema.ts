import { z } from "zod";

export const orderSchema = z.object({
  ticketId: z.string("Please select a ticket"),
});

export type TOrderSchema = z.infer<typeof orderSchema>;
