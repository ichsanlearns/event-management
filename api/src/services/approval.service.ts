import { prisma } from "../lib/prisma.lib.js";
import { Status } from "../generated/prisma/client.js";
import { sendEmail } from "../utils/email.util.js";
import { approvedTemplate, rejectedTemplate } from "../utils/email-template.util.js";

export async function getOrdersByStatus(status: Status) {
  return prisma.order.findMany({
    where: { status },
    include: {
      Customer: true,
      Ticket: true,
    },
  });
}

export async function getApprovalQueue(organizerId: string) {
  return prisma.order.findMany({
    where: {
      status: Status.WAITING_CONFIRMATION,
      Ticket: {
        EventName: {
          organizer_id: organizerId,
        },
      },
    },
    include: {
      Customer: true,
      Ticket: {
        include: {
          EventName: true,
        },
      },
      Payments: true,
      Voucher: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export async function approveOrder(orderId: string, organizerId: string) {
  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: {
        Customer: true,
        Ticket: { include: { EventName: true } },
      },
    });

    if (!order) throw new Error("Order not found");

    if (order.Ticket.EventName.organizer_id !== organizerId) {
      throw new Error("Forbidden");
    }

    if (order.status !== Status.WAITING_CONFIRMATION) {
      throw new Error("Order not in approvable state");
    }

    // ✅ VALIDASI SEATS CUKUP
    if (order.Ticket.EventName.available_seats < order.quantity) {
      throw new Error("Seats not enough");
    }

    // ✅ UPDATE COUNTER
    await tx.ticket.update({
      where: { id: order.ticket_id },
      data: {
        bought: { increment: order.quantity },
      },
    });

    // ✅ KURANGI SEATS EVENT
    await tx.event.update({
      where: { id: order.Ticket.event_id },
      data: {
        available_seats: { decrement: order.quantity },
      },
    });

    // ✅ UPDATE STATUS ORDER
    const updated = await tx.order.update({
      where: { id: orderId },
      data: { status: Status.DONE },
    });

    return {
      updated,
      customerEmail: order.Customer.email,
      customerName: order.Customer.name,
      orderCode: order.order_code,
      eventName: order.Ticket.EventName.name,
      qty: order.quantity,
      total: Number(order.total),
    };
  });

  // kirim email di luar transaction
  await sendEmail(result.customerEmail, "Payment Approved", approvedTemplate(result.customerName, result.orderCode, result.eventName, result.qty, result.total));

  return result.updated;
}

export async function rejectOrder(orderId: string, organizerId: string) {
  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: {
        Customer: true,
        Ticket: { include: { EventName: true } },
        Voucher: true,
      },
    });

    if (!order) throw new Error("Order not found");

    if (order.Ticket.EventName.organizer_id !== organizerId) {
      throw new Error("Forbidden");
    }

    await tx.ticket.update({
      where: { id: order.ticket_id },
      data: {
        bought: { decrement: order.quantity },
      },
    });

    await tx.event.update({
      where: { id: order.Ticket.event_id },
      data: {
        available_seats: { increment: order.quantity },
      },
    });

    if (order.voucher_id) {
      await tx.voucher.update({
        where: { id: order.voucher_id },
        data: { quota: { increment: 1 } },
      });
    }

    if (order.using_point > 0) {
      await tx.point.create({
        data: {
          user_id: order.customer_id,
          amount: order.using_point,
          expired_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        },
      });
    }

    const updated = await tx.order.update({
      where: { id: orderId },
      data: { status: Status.REJECTED },
    });

    return {
      updated,
      customerEmail: order.Customer.email,
      customerName: order.Customer.name,
      orderCode: order.order_code,
    };
  });

  await sendEmail(result.customerEmail, "Order Rejected", rejectedTemplate(result.customerName, result.orderCode));

  return result.updated;
}
