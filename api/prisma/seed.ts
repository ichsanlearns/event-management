import {
  Category,
  Role,
  Types,
  Status,
} from "../src/generated/prisma/enums.js";
import type {
  User,
  Event,
  Ticket,
  Voucher,
  Order,
} from "../src/generated/prisma/client.js";
import { prisma } from "../src/lib/prisma.lib.js";
import { faker } from "@faker-js/faker";

async function seed() {
  try {
    console.log("🌱 Seeding started...");

    const users: User[] = [];
    const events: Event[] = [];
    const tickets: Ticket[] = [];
    const vouchers: Voucher[] = [];
    const orders: Order[] = [];

    // =============================
    // USERS
    // =============================
    const TOTAL_USERS = 35;
    const ORGANIZER_COUNT = 10;

    for (let i = 0; i < TOTAL_USERS; i++) {
      const role = i < ORGANIZER_COUNT ? Role.EVENT_ORGANIZER : Role.CUSTOMER;

      const user = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          password: "password123",
          role,
          referral_code: faker.string.alphanumeric(8).toUpperCase(),
        },
      });

      users.push(user);
    }

    const organizers = users.filter((u) => u.role === Role.EVENT_ORGANIZER);
    const customers = users.filter((u) => u.role === Role.CUSTOMER);

    // =============================
    // REFERRALS
    // =============================
    for (let i = 0; i < 8; i++) {
      const referrer = faker.helpers.arrayElement(customers);
      const referred = faker.helpers.arrayElement(
        customers.filter((c) => c.id !== referrer.id),
      );

      await prisma.point.create({
        data: {
          user_id: referrer.id,
          amount: 10000,
          expired_at: faker.date.soon({ days: 90 }),
        },
      });

      await prisma.coupon.create({
        data: {
          user_id: referred.id,
          amount: 25000,
          expired_at: faker.date.soon({ days: 90 }),
          referrer_id: referrer.id,
        },
      });
    }

    // =============================
    // EVENTS
    // =============================
    for (const organizer of organizers) {
      const eventCount = faker.number.int({ min: 1, max: 3 });

      for (let i = 0; i < eventCount; i++) {
        const start = faker.date.between({
          from: new Date("2024-01-01"),
          to: new Date("2026-12-31"),
        });

        const event = await prisma.event.create({
          data: {
            name: faker.company.catchPhrase(),
            price: faker.number.int({ min: 100_000, max: 1_500_000 }),
            description: faker.lorem.paragraph(),
            category: faker.helpers.enumValue(Category),
            city: faker.location.city(),
            available_seats: faker.number.int({ min: 100, max: 500 }),
            organizer_id: organizer.id,
            start_date: start,
            end_date: faker.date.soon({ days: 1, refDate: start }),
          },
        });

        events.push(event);
      }
    }

    // =============================
    // TICKETS
    // =============================
    for (const event of events) {
      const base = Number(event.price);

      await prisma.ticket.createMany({
        data: [
          {
            event_id: event.id,
            type: Types.EARLYBIRD,
            price: base * 0.7,
            Quota: 50,
          },
          { event_id: event.id, type: Types.REGULER, price: base, Quota: 200 },
          { event_id: event.id, type: Types.VIP, price: base * 1.8, Quota: 30 },
        ],
      });

      const eventTickets = await prisma.ticket.findMany({
        where: { event_id: event.id },
      });

      tickets.push(...eventTickets);
    }

    // =============================
    // VOUCHERS
    // =============================
    for (const event of events) {
      const count = faker.number.int({ min: 1, max: 2 });

      for (let i = 0; i < count; i++) {
        const voucher = await prisma.voucher.create({
          data: {
            event_id: event.id,
            code: faker.string.alphanumeric(6).toUpperCase(),
            discount_amount: faker.helpers.arrayElement([25000, 50000, 75000]),
            start_date: faker.date.past(),
            end_date: faker.date.future(),
          },
        });

        vouchers.push(voucher);
      }
    }

    // =============================
    // ORDERS + PAYMENTS
    // =============================
    for (let i = 0; i < 40; i++) {
      const customer = faker.helpers.arrayElement(customers);
      const ticket = faker.helpers.arrayElement(tickets);
      const quantity = faker.number.int({ min: 1, max: 3 });
      const totalBefore = Number(ticket.price) * quantity;

      const usingPoint = faker.datatype.boolean();
      const status = faker.helpers.arrayElement(Object.values(Status));

      const order = await prisma.order.create({
        data: {
          customer_id: customer.id,
          status,
          using_point: usingPoint,
          total: usingPoint ? totalBefore - 10000 : totalBefore,
        },
      });

      await prisma.orderItem.create({
        data: {
          order_id: order.id,
          ticket_id: ticket.id,
          quantity,
          price: ticket.price,
        },
      });

      if (
        status === Status.WAITING_PAYMENT ||
        status === Status.WAITING_CONFIRMATION
      ) {
        const voucher =
          vouchers.length > 0 && faker.datatype.boolean()
            ? faker.helpers.arrayElement(vouchers)
            : null;

        await prisma.payment.create({
          data: {
            order_id: order.id,
            voucher_id: voucher ? voucher.id : null,
            total_before: totalBefore,
            total: order.total,
            deadline: faker.date.soon(),
          },
        });
      }

      orders.push(order);
    }

    // =============================
    // REVIEWS
    // =============================
    const doneOrders = orders.filter((o) => o.status === Status.DONE);

    for (const order of doneOrders.slice(0, 15)) {
      const item = await prisma.orderItem.findFirst({
        where: { order_id: order.id },
      });

      if (!item) continue;

      const ticket = tickets.find((t) => t.id === item.ticket_id);
      if (!ticket) continue;

      await prisma.review.create({
        data: {
          user_id: order.customer_id,
          event_id: ticket.event_id,
          rating: faker.number.float({
            min: 3.5,
            max: 5,
            multipleOf: 0.1,
          }),
          comment: faker.helpers.arrayElement([
            "Seru banget sih 🔥 worth it parah!",
            "Eventnya rapi, vibes dapet 😍",
            "Overall oke, bakal nonton lagi sih",
            "Gokil sih ini, gak nyesel 🎶✨",
            "Lumayan rame tapi puas 👍",
          ]),
        },
      });
    }

    console.log("✅ Seeding completed successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
