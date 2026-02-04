import { prisma } from "../lib/prisma.lib.js";

export async function autoConfirmOrders() {
  await prisma.order.updateMany({
    where: {
      expired_at: {
        lt: new Date(),
      },
      status: "WAITING_CONFIRMATION",
    },
    data: {
      status: "DONE",
    },
  });
}
