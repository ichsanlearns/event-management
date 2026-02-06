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
  await prisma.$transaction(async (tx) => {
    await tx.payment.create({
      data: {
        order_id: orderId,
        amount,
        method,
        status: status ?? "WAITING_CONFIRMATION",
        proof_image: proofImage ?? null,
        paid_at: paidAt ?? new Date(),
        confirmed_at: confirmedAt ?? null,
      },
    });

    await tx.order.update({
      where: { id: orderId },
      data: { status: "WAITING_CONFIRMATION" },
    });
  });
}

export async function get() {
  return await prisma.payment.findMany();
}
