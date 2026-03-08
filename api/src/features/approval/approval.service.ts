import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../shared/lib/prisma.lib.js";
import { Status } from "../../generated/prisma/client.js";
import { sendEmail } from "../../shared/utils/email.util.js";
import {
  approvedTemplate,
  rejectedTemplate,
} from "../../shared/utils/email-template.util.js";
import * as ApprovalRepository from "./approval.repository.js";
import * as OrderRepository from "../order/order.repository.js";
import * as TicketRepository from "../../shared/repositories/ticket.repository.js";
import * as VoucherRepository from "../voucher/voucher.repository.js";
import * as PointRepository from "@/shared/repositories/point.repository.js";

export async function getOrdersByStatus(status: Status) {
  return ApprovalRepository.getOrdersByStatus({ db: prisma, status });
}

export async function getApprovalQueue(organizerId: string) {
  return await ApprovalRepository.getApprovalQueue({ db: prisma, organizerId });
}

export async function approveOrder(orderId: string, organizerId: string) {
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const order = await OrderRepository.findWithCustomerEvent({
        db: tx,
        orderId,
      });

      if (!order) throw new Error("Order not found");

      if (order.Ticket.EventName.organizer_id !== organizerId) {
        throw new Error("Forbidden");
      }

      if (order.status !== Status.WAITING_CONFIRMATION) {
        throw new Error("Order not in approvable state");
      }

      // VALIDASI SEATS CUKUP
      if (order.Ticket.EventName.available_seats < order.quantity) {
        throw new Error("Seats not enough");
      }

      //  UPDATE STATUS ORDER
      const updated = await OrderRepository.updateStatus({
        db: tx,
        orderId,
        status: Status.DONE,
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
    },
  );

  await sendEmail(
    result.customerEmail,
    "Payment Approved",
    approvedTemplate(
      result.customerName,
      result.orderCode,
      result.eventName,
      result.qty,
      result.total,
    ),
  );

  return result.updated;
}

export async function rejectOrder(orderId: string, organizerId: string) {
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const order = await OrderRepository.findWithCustomerEvent({
        db: tx,
        orderId,
      });

      if (!order) throw new Error("Order not found");

      if (order.Ticket.EventName.organizer_id !== organizerId) {
        throw new Error("Forbidden");
      }

      await TicketRepository.update({
        db: tx,
        ticketId: order.ticket_id,
        quantity: -order.quantity,
      });

      if (order.voucher_id) {
        await VoucherRepository.updateQuota({
          db: tx,
          voucherId: order.voucher_id,
          quantity: 1,
        });
      }

      if (order.using_point > 0) {
        await PointRepository.update({
          db: tx,
          userId: order.customer_id,
          amount: order.using_point,
        });
      }

      const updated = await OrderRepository.updateStatus({
        db: tx,
        orderId,
        status: Status.REJECTED,
      });

      return {
        updated,
        customerEmail: order.Customer.email,
        customerName: order.Customer.name,
        orderCode: order.order_code,
      };
    },
  );

  await sendEmail(
    result.customerEmail,
    "Order Rejected",
    rejectedTemplate(result.customerName, result.orderCode),
  );

  return result.updated;
}
