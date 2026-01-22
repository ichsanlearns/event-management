import { prisma } from "../src/lib/prisma.lib.js";
import {
  type User,
  type Event,
  type Review,
  type Ticket,
  type OrderItem,
  type Order,
  type Payment,
  type Voucher,
  type Point,
  type Coupon,
} from "../src/generated/prisma/client.js";

async function Seed() {
  try {
    /* ----------------------------- Delete all data ---------------------------- */
    await prisma.user.deleteMany();
    await prisma.event.deleteMany();
    await prisma.review.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    /* ----------------------------- Create new data ---------------------------- */

    const user: User[] = [];
  } catch (error) {}
}

export default Seed;
