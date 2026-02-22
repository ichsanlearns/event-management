import { prisma } from "../lib/prisma.lib.js";

export async function autoExpirePaymentOrders() {
  const now = new Date();

  await prisma.$transaction(async (tx) => {
    const expiredOrders = await tx.order.findMany({
      where: {
        expired_at: { lt: now },
        status: "WAITING_PAYMENT",
      },
    });

    for (const order of expiredOrders) {
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: "EXPIRED",
          deleted_at: now,
        },
      });

      await tx.ticket.update({
        where: { id: order.ticket_id },
        data: {
          bought: { decrement: order.quantity },
        },
      });

      if (order.voucher_id) {
        await tx.voucher.update({
          where: { id: order.voucher_id },
          data: {
            quota: { increment: 1 },
          },
        });
      }

      if (order.coupon_id) {
        await tx.coupon.update({
          where: { id: order.coupon_id },
          data: {
            deleted_at: null,
          },
        });
      }

      if (order.using_point > 0) {
        await tx.point.update({
          where: { user_id: order.customer_id },
          data: {
            amount: { increment: order.using_point },
          },
        });
      }
    }

    if (expiredOrders.length > 0) {
      console.log(
        `Auto-expired ${expiredOrders.length} orders at ${now.toISOString()}`,
      );
    }
  });
}
