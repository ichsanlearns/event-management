import { prisma } from "../lib/prisma.lib";
import { AppError } from "../utils/app-error.util";

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
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new AppError(404, "Order not found");
  }

  if (order.status !== "WAITING_PAYMENT" && order.status !== "REJECTED") {
    throw new AppError(400, "Order not waiting for payment or rejected");
  }

  if (
    (order.status === "WAITING_PAYMENT" || order.status === "REJECTED") &&
    order.expired_at &&
    order.expired_at < new Date()
  ) {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "EXPIRED",
      },
    });
    throw new AppError(400, "Order has expired");
  }

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
      data: {
        status: "WAITING_CONFIRMATION",
        expired_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    });

    return payment;
  });
}

export async function get() {
  return await prisma.payment.findMany();
}
