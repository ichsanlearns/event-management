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
) {
  return await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.create({
      data: {
        order_id: orderId,
        amount,
        method,
        status: status ?? "WAITING_CONFIRMATION",
        proof_image: proofImage ?? null,
        paid_at: new Date(),
      },
    });

    await tx.order.update({
      where: { id: orderId },
      data: { status: "WAITING_CONFIRMATION" },
    });

    return payment;
  });
}

export async function get() {
  return await prisma.payment.findMany();
}
