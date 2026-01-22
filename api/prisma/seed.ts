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
import { Faker, id_ID } from "@faker-js/faker";

// 🇮🇩 Use Indonesian locale
const faker = new Faker({ locale: [id_ID] });

// =============================
// INDONESIA DATA
// =============================
const INDONESIAN_CITIES = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Semarang",
  "Solo",
  "Malang",
  "Denpasar",
  "Medan",
  "Palembang",
  "Pekanbaru",
  "Balikpapan",
  "Banjarmasin",
  "Pontianak",
  "Makassar",
  "Manado",
  "Kupang",
];

const EVENT_NAMES = [
  "Konser Musik Nusantara",
  "Festival Jazz Indonesia",
  "Pameran UMKM Lokal",
  "Seminar Startup Digital",
  "Workshop UI/UX Design",
  "Konser Akustik Senja",
  "Festival Kuliner Nusantara",
  "Tech Conference Indonesia",
  "Indonesia Creative Expo",
  "Music Fest Akhir Tahun",
];

const EVENT_DESCRIPTIONS = [
  "Acara seru dengan konsep modern dan bintang tamu menarik.",
  "Event eksklusif yang menghadirkan pengalaman tak terlupakan.",
  "Cocok untuk semua kalangan, dari pemula hingga profesional.",
  "Jangan lewatkan event spesial dengan hiburan dan networking.",
  "Pengalaman terbaik dengan konsep rapi dan suasana yang seru.",
];

async function seed() {
  try {
    // =============================
    // CLEAN DB
    // =============================
    await prisma.orderItem.deleteMany({});
    await prisma.payment.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.ticket.deleteMany({});
    await prisma.voucher.deleteMany({});
    await prisma.point.deleteMany({});
    await prisma.coupon.deleteMany({});
    await prisma.event.deleteMany({});
    await prisma.user.deleteMany({});

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
    // ASSIGN EVENT NAMES PER ORGANIZER
    // =============================
    const shuffledNames = faker.helpers.shuffle(EVENT_NAMES);
    const namesPerOrganizer = Math.ceil(
      shuffledNames.length / organizers.length,
    );

    const organizerEventNames = new Map<string, string[]>();

    organizers.forEach((org, index) => {
      organizerEventNames.set(
        org.id,
        shuffledNames.slice(
          index * namesPerOrganizer,
          (index + 1) * namesPerOrganizer,
        ),
      );
    });

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
    // EVENTS (SAME NAME = SAME ORGANIZER)
    // =============================
    for (const organizer of organizers) {
      const eventNames = organizerEventNames.get(organizer.id) ?? [];

      if (eventNames.length === 0) continue;

      const eventCount = faker.number.int({
        min: 1,
        max: eventNames.length,
      });

      for (let i = 0; i < eventCount; i++) {
        const city = faker.helpers.arrayElement(INDONESIAN_CITIES);

        const timeline = faker.helpers.arrayElement([
          { from: new Date("2022-01-01"), to: new Date("2023-12-31") },
          { from: new Date("2024-01-01"), to: new Date("2025-12-31") },
          { from: new Date("2026-01-01"), to: new Date("2028-12-31") },
        ]);

        const start = faker.date.between(timeline);
        const baseName = eventNames[i];

        const event = await prisma.event.create({
          data: {
            name: `${baseName} ${city}`,
            price: faker.number.int({ min: 100_000, max: 1_500_000 }),
            description: faker.helpers.arrayElement(EVENT_DESCRIPTIONS),
            category: faker.helpers.enumValue(Category),
            city,
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
            price: Math.floor(base * 0.7),
            Quota: 50,
          },
          {
            event_id: event.id,
            type: Types.REGULER,
            price: base,
            Quota: 200,
          },
          {
            event_id: event.id,
            type: Types.VIP,
            price: Math.floor(base * 1.8),
            Quota: 30,
          },
        ],
      });

      const eventTickets = await prisma.ticket.findMany({
        where: { event_id: event.id },
      });

      tickets.push(...eventTickets);
    }

    // =============================
    // (REST: vouchers, orders, reviews — unchanged)
    // =============================

    console.log("✅ Seeding completed successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
