import type { Prisma, PrismaClient } from "../../generated/prisma/client.js";
import { prisma } from "../../shared/lib/prisma.lib.js";

type DB = PrismaClient | Prisma.TransactionClient;

export const create = async (
  db: DB,
  {
    orderId,
    amount,
    method,
    status,
    proofImage,
  }: {
    orderId: string;
    amount: number;
    method: "MANUAL_TRANSFER" | "E_WALLET" | "CREDIT_CARD";
    status:
      | "PENDING"
      | "WAITING_CONFIRMATION"
      | "APPROVED"
      | "REJECTED"
      | "FAILED"
      | undefined;
    proofImage?: string | undefined;
  },
) => {
  return await db.payment.create({
    data: {
      order_id: orderId,
      amount,
      method,
      status: status ?? "WAITING_CONFIRMATION",
      proof_image: proofImage ?? null,
      paid_at: new Date(),
    },
  });
};

export const get = async () => {
  return await prisma.payment.findMany();
};
