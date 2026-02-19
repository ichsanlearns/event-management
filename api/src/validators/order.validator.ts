import { z } from "zod";
import { Status } from "../generated/prisma/enums.js";

export const createOrderSchema = z.object({
  orderCode: z.string(),
  customerId: z.string(),
  ticketId: z.string(),
  quantity: z.number().positive("Quantity need to be greater than 0"),
  status: z.enum(Status),
  usingPoint: z.number(),
  total: z.number().positive("Total cant be negative"),
  email: z.email(),
});
