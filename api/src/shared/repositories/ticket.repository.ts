import { prisma } from "../lib/prisma.lib.js";
import type { PrismaClient, Prisma } from "@/generated/prisma/client.js";

type DB = PrismaClient | Prisma.TransactionClient;

export const update = async ({
  db,
  ticketId,
  quantity,
}: {
  db: DB;
  ticketId: string;
  quantity: number;
}) => {
  await db.ticket.update({
    where: { id: ticketId },
    data: { bought: { increment: quantity } },
  });
};
