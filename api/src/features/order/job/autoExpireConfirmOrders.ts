import { Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../../shared/lib/prisma.lib.js";

export async function autoExpireConfirmOrders() {
  const now = new Date();

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const orders = await tx.order.findMany({
      where: {
        status: "WAITING_CONFIRMATION",
        updated_at: {
          lt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        },
      },
    });

    for (const order of orders) {
      // mark canceled
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: "CANCELED",
          deleted_at: now,
        },
      });

      // restore ticket stock
      await tx.ticket.update({
        where: { id: order.ticket_id },
        data: {
          bought: { decrement: order.quantity },
        },
      });

      if (order.voucher_id) {
        await tx.voucher.update({
          where: { id: order.voucher_id },
          data: { quota: { increment: 1 } },
        });
      }

      if (order.coupon_id) {
        await tx.coupon.update({
          where: { id: order.coupon_id },
          data: { deleted_at: null },
        });
      }

      if (order.using_point > 0) {
        await tx.point.update({
          where: { user_id: order.customer_id },
          data: { amount: { increment: order.using_point } },
        });
      }
    }

    if (orders.length > 0) {
      console.log(
        `Auto-canceled ${orders.length} unreviewed orders at ${now.toISOString()}`,
      );
    }
  });
}
