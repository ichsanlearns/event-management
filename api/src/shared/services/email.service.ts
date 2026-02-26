import { transporterEvent } from "../utils/email.util.js";
import type { SendMailOptions } from "nodemailer";

interface HbsMailOptions extends SendMailOptions {
  template: string;
  context: Record<string, any>;
}

interface AdminReminderPayload {
  email: string;
  orderCode: string;
  userName: string;
  total: string;
  paidAt: string;
  deadline: string;
  adminUrl: string;
}

interface OrderCreatedEmailPayload {
  email: string;
  name: string;
  orderCode: string;
  total: string;
  expiredAt: string;
  paymentUrl: string;
}

interface OrderExpiringPayload {
  email: string;
  name: string;
  orderCode: string;
  total: string;
  expiredAt: string;
  paymentUrl: string;
}

export async function sendOrderExpiringEmail(payload: OrderExpiringPayload) {
  await transporterEvent.sendMail({
    from: `"Event App" <${process.env.EMAIL_USER}>`,
    to: payload.email,
    subject: "⏰ Your Order Is About to Expire",
    template: "order-expiring", // order-expiring.hbs
    context: {
      name: payload.name,
      orderCode: payload.orderCode,
      total: payload.total,
      expiredAt: payload.expiredAt,
      timeLeft: "30 minutes",
      paymentUrl: payload.paymentUrl,
    },
  } as HbsMailOptions);
}

export async function sendAdminReminderEmail(payload: AdminReminderPayload) {
  await transporterEvent.sendMail({
    from: `"Event App System" <${process.env.EMAIL_USER}>`,
    to: payload.email,
    subject: "⚠️ Order Waiting for Confirmation",
    template: "admin-confirmation-reminder",
    context: {
      orderCode: payload.orderCode,
      userName: payload.userName,
      total: payload.total,
      paidAt: payload.paidAt,
      deadline: payload.deadline,
      pendingDuration: "48 hours",
      adminUrl: payload.adminUrl,
    },
  } as HbsMailOptions);
}

export async function sendOrderCreatedEmail(payload: OrderCreatedEmailPayload) {
  await transporterEvent.sendMail({
    from: `"Event App" <${process.env.EMAIL_USER}>`,
    to: payload.email,
    subject: "🎉 Your Order Has Been Created",
    template: "order-created",
    context: {
      name: payload.name,
      orderCode: payload.orderCode,
      total: payload.total,
      expiredAt: payload.expiredAt,
      paymentUrl: payload.paymentUrl,
    },
  } as HbsMailOptions);
}
