import { prisma } from "../lib/prisma.lib.js";

export async function create(
  orderId: string,
  amount: number,
  method: "MANUAL_TRANSFER" | "E_WALLET" | "CREDIT_CARD",
  status:
    | "PENDING"
    | "WAITING_CONFIRMATION"
    | "APPROVED"
    | "REJECTED"
    | "FAILED",
  proofImage?: string,
  paidAt?: string,
  confirmedAt?: string,
) {
  return await prisma.payment.create({
    data: {
      order_id: orderId,
      amount,
      method,
      status,
      proof_image: proofImage ?? null,
      paid_at: paidAt ?? null,
      confirmed_at: confirmedAt ?? null,
    },
  });
}

export async function get() {
  return await prisma.payment.findMany();
}
