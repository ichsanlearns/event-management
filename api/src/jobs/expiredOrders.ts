import { prisma } from "../lib/prisma.lib.js";

export async function expiredOrders() {
  await prisma.order.updateMany({
    where: {
      expired_at: {
        lt: new Date(),
      },
      status: "WAITING_PAYMENT",
    },
    data: {
      status: "EXPIRED",
    },
  });
}
