import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../shared/lib/prisma.lib.js";
import { AppError } from "../../shared/utils/app-error.util.js";

import * as OrderRepository from "../order/order.repository.js";
import * as PaymentRepository from "./payment.repository.js";

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
  const order = await OrderRepository.isExist(orderId)

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
    await OrderRepository.updateStatus({db: prisma, orderId, status: "EXPIRED"})
    throw new AppError(400, "Order has expired");
  }

  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const payment = await PaymentRepository.create(tx, {orderId, amount, method, status, proofImage})

    await OrderRepository.updateStatus({db: tx, orderId, status: "WAITING_CONFIRMATION"})

    return payment;
  });
}

export async function get() {
  return await PaymentRepository.get()
}
