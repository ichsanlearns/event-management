import {
  Category,
  Role,
  Types,
  Status,
} from "../src/generated/prisma/enums.js";
import {
  type User,
  type Event,
  type Ticket,
  type Voucher,
  type Order,
  Prisma,
} from "../src/generated/prisma/client.js";
import { prisma } from "../src/lib/prisma.lib.js";
import { Faker, id_ID } from "@faker-js/faker";

import bcrypt from "bcrypt";
import { generateReferralCode } from "../src/utils/referral.util.js";

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

const EVENT_IMAGE_MAP = {
  Konser: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
  Festival: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  Seminar: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
  Workshop: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
  Tech: "https://images.unsplash.com/photo-1518770660439-4636190af475",
};

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
    await prisma.payment.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.ticket.deleteMany({});
    await prisma.voucher.deleteMany({});
    await prisma.point.deleteMany({});
    await prisma.coupon.deleteMany({});
    await prisma.event.deleteMany({});
    await prisma.user.deleteMany({});

    console.info("🌱 Seeding started...");

    const tickets: Ticket[] = [];
    const vouchers: Voucher[] = [];
    const orders: Order[] = [];

    // =============================
    // USERS
    // =============================
    const users = [
      {
        // JAVA JAZZ FESTIVAL
        id: "012e717a-2429-4757-945f-e24724bcd7ac",
        name: "PT Java Festival Production",
        email: "java.festivalproduction@mail.com",
        password: await bcrypt.hash("password123", 10),
        role: Role.EVENT_ORGANIZER,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
      },
      {
        // DWP
        id: "17a6619c-f6b5-469a-adf4-66196a67d187",
        name: "Ismaya Live",
        email: "ismaya.live@mail.com",
        password: await bcrypt.hash("password123", 10),
        role: Role.EVENT_ORGANIZER,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
      },
      {
        // Hammersonic Festival
        id: "1aab8418-5347-4d4a-8243-b4cc5cb02200",
        name: "Ravel Entertainment",
        email: "ravel.entertainment@mail.com",
        password: await bcrypt.hash("password123", 10),
        role: Role.EVENT_ORGANIZER,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1506157786151-b8491531f063",
      },
      {
        // Synchronize Festival
        id: "1c7627d7-6582-4ec0-833c-46278a5b390b",
        name: "Rajawali Indonesia",
        email: "rajawali.indonesia@mail.com",
        password: await bcrypt.hash("password123", 10),
        role: Role.EVENT_ORGANIZER,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1497032205916-ac775f0649ae",
      },
      {
        // Jazz goes to Campus
        id: "2a340993-2618-4dc8-bd30-22bde8ff31ec",
        name: "BEM UI",
        email: "bem.ui@mail.com",
        password: await bcrypt.hash("password123", 10),
        role: Role.EVENT_ORGANIZER,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
      },
      {
        // Djakarta Artmosphere
        id: "405aec92-d64d-46ed-9c01-aab197217fe1",
        name: "G Productions",
        email: "g.productions@mail.com",
        password: await bcrypt.hash("password123", 10),
        role: Role.EVENT_ORGANIZER,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      },
      {
        // Joyland Festival
        id: "4af6aa73-3aea-48ea-8ecb-9507edfd4d9c",
        name: "Associated Production",
        email: "associated.production@mail.com",
        password: await bcrypt.hash("password123", 10),
        role: Role.EVENT_ORGANIZER,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1464375117522-1311dd6d0cd7",
      },
      {
        id: "1c92f1d5-7b6e-4b8a-9d33-2a6c7b1e5f10",
        name: "Putri Amelia",
        email: "putri.amelia@mail.com",
        password: await bcrypt.hash("password123", 10),
        role: Role.CUSTOMER,
        referral_code: generateReferralCode(),
      },
      {
        id: "9e8c2d44-5b71-4d6f-b2e9-cc3a8a7f21d4",
        name: "Customer One",
        email: "customer.one@mail.com",
        password: await bcrypt.hash("password123", 10),
        role: Role.CUSTOMER,
        referral_code: generateReferralCode(),
      },
      {
        // Nihon No Matsuri (Japanese cultural fest)
        id: "58c4a937-88c4-42ee-a99a-a5b6c32899cd",
        name: "Nihon No Matsuri Event Organizer",
        email: "nihonnomatsuri@mail.com",
        password: await bcrypt.hash("password123", 10),
        role: Role.EVENT_ORGANIZER,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1526481280691-3c4696d3f5b1",
      },
      {
        id: "a7c5e2d1-98f3-4b6a-82d4-1f7e3c9a5b20",
        name: "ichsan",
        email: "michsanudin03@gmail.com",
        password: await bcrypt.hash("password123", 10),
        role: Role.CUSTOMER,
        referral_code: generateReferralCode(),
        profile_image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      },
    ];

    await prisma.user.createMany({
      data: users,
    });

    // =============================
    // REFERRALS
    // =============================
    // for (let i = 0; i < 8; i++) {
    //   const referrer = faker.helpers.arrayElement(customers);
    //   const referred = faker.helpers.arrayElement(
    //     customers.filter((c) => c.id !== referrer.id),
    //   );

    //   await prisma.point.create({
    //     data: {
    //       user_id: referrer.id,
    //       amount: 10000,
    //       expired_at: faker.date.soon({ days: 90 }),
    //     },
    //   });

    //   await prisma.coupon.create({
    //     data: {
    //       user_id: referred.id,
    //       amount: 25000,
    //       expired_at: faker.date.soon({ days: 90 }),
    //       referrer_id: referrer.id,
    //     },
    //   });
    // }

    // =============================
    // EVENTS (SAME NAME = SAME ORGANIZER)
    // =============================
    const events = [
      {
        id: "5ff8500f-b903-4fa1-9efb-5eaa161b0802",
        name: "Java Jazz Festival",
        price: new Prisma.Decimal(150000),
        tagline: "Java Jazz Festival Beyond the Horizon",
        category: Category.MUSIC,
        venue: "Jakarta International Expo",
        city: "Jakarta",
        available_seats: 1000,
        organizer_id: "012e717a-2429-4757-945f-e24724bcd7ac",
        hero_image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475",
        about: `lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit`,
        start_date: new Date("2022-01-01"),
        end_date: new Date("2022-01-02"),
      },
      {
        id: "695145ee-242c-45ad-a192-dc05c9c6b8de",
        name: "Djakarta Warehouse Project",
        price: new Prisma.Decimal(200000),
        tagline: "DWP Beyond the Horizon",
        category: Category.MUSIC,
        venue: "Jakarta International Expo",
        city: "Jakarta",
        available_seats: 1000,
        organizer_id: "17a6619c-f6b5-469a-adf4-66196a67d187",
        hero_image: EVENT_IMAGE_MAP.Konser,
        about: `lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit`,
        start_date: new Date("2023-01-01"),
        end_date: new Date("2023-01-03"),
      },
      {
        id: "6b8667ea-c524-4500-b5ba-a605022910b4",
        name: "Hammersonic Festival",
        price: new Prisma.Decimal(250000),
        tagline: "Hammersonic Festival Beyond the Horizon",
        category: Category.MUSIC,
        venue: "Jakarta International Expo",
        city: "Jakarta",
        available_seats: 1000,
        organizer_id: "1aab8418-5347-4d4a-8243-b4cc5cb02200",
        hero_image: EVENT_IMAGE_MAP.Seminar,
        about: `lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit`,
        start_date: new Date("2024-01-01"),
        end_date: new Date("2024-01-03"),
      },
      {
        id: "737a5d9e-52df-47b8-b96c-7fbdd05e05cc",
        name: "Synchronize Festival",
        price: new Prisma.Decimal(300000),
        tagline: "Synchronize Festival Beyond the Horizon",
        category: Category.MUSIC,
        venue: "Jakarta International Expo",
        city: "Jakarta",
        available_seats: 1000,
        organizer_id: "1c7627d7-6582-4ec0-833c-46278a5b390b",
        hero_image: EVENT_IMAGE_MAP.Tech,
        about: `lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit`,
        start_date: new Date("2025-01-01"),
        end_date: new Date("2025-01-03"),
      },
      {
        id: "7390e609-1ab5-45d9-828f-f2adefa34d0c",
        name: "Jazz goes to Campus",
        price: new Prisma.Decimal(85000),
        tagline: "Jazz goes to Campus Beyond the Horizon",
        category: Category.THEATRE,
        venue: "International Convention Center",
        city: "Bandung",
        available_seats: 1000,
        organizer_id: "2a340993-2618-4dc8-bd30-22bde8ff31ec",
        hero_image: EVENT_IMAGE_MAP.Workshop,
        about: `lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit`,
        start_date: new Date("2026-03-01"),
        end_date: new Date("2026-03-03"),
      },
      {
        id: "7b8aee32-542d-4727-92a1-6363676fd940",
        name: "Djakarta Artmosphere",
        price: new Prisma.Decimal(120000),
        tagline: "Djakarta Artmosphere Beyond the Horizon",
        category: Category.THEATRE,
        venue: "International Convention Center",
        city: "Bandung",
        available_seats: 1000,
        organizer_id: "405aec92-d64d-46ed-9c01-aab197217fe1",
        hero_image: EVENT_IMAGE_MAP.Workshop,
        about: `lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit`,
        start_date: new Date("2026-04-01"),
        end_date: new Date("2026-04-03"),
      },
      {
        id: "7d2c367d-fe52-429e-8554-a26e2d092a18",
        name: "Joyland Festival",
        price: new Prisma.Decimal(150000),
        tagline: "Joyland Festival Beyond the Horizon",
        category: Category.MUSIC,
        venue: "International Convention Center",
        city: "Bandung",
        available_seats: 1000,
        organizer_id: "4af6aa73-3aea-48ea-8ecb-9507edfd4d9c",
        hero_image: EVENT_IMAGE_MAP.Konser,
        about: `lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit`,
        start_date: new Date("2026-05-01"),
        end_date: new Date("2026-05-03"),
      },
      {
        id: "7dcf8cd3-f966-43ff-8782-11ad68dff25a",
        name: "Nihon No Matsuri",
        price: new Prisma.Decimal(100000),
        tagline: "Nihon No Matsuri Beyond the Horizon",
        category: Category.SPORT,
        venue: "International Convention Center",
        city: "Bandung",
        available_seats: 1000,
        organizer_id: "4af6aa73-3aea-48ea-8ecb-9507edfd4d9c",
        hero_image: EVENT_IMAGE_MAP.Konser,
        about: `lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit`,
        start_date: new Date("2026-02-01"),
        end_date: new Date("2026-02-03"),
      },
    ];

    await prisma.event.createMany({
      data: events,
    });

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
            quota: 50,
          },
          {
            event_id: event.id,
            type: Types.REGULER,
            price: base,
            quota: 200,
          },
          {
            event_id: event.id,
            type: Types.VIP,
            price: Math.floor(base * 1.8),
            quota: 30,
          },
        ],
      });

      const eventTickets = await prisma.ticket.findMany({
        where: { event_id: event.id },
      });

      tickets.push(...eventTickets);
    }
    // =============================
    // ORDERS
    // =============================
    const user = "a7c5e2d1-98f3-4b6a-82d4-1f7e3c9a5b20";
    const dwp = "695145ee-242c-45ad-a192-dc05c9c6b8de";
    const joyland = "7d2c367d-fe52-429e-8554-a26e2d092a18";

    const eventJoylandTickets = await prisma.event.findUnique({
      where: {
        id: joyland,
      },
      select: {
        Tickets: { select: { id: true } },
      },
    });

    const eventDwpTickets = await prisma.event.findUnique({
      where: {
        id: dwp,
      },
      select: {
        Tickets: { select: { id: true } },
      },
    });

    const ticketDwpId = eventDwpTickets?.Tickets[1]!.id;
    const ticketJoylandId = eventJoylandTickets?.Tickets[1]!.id;

    await prisma.order.createMany({
      data: [
        {
          order_code: "DWP-WP-000001",
          customer_id: user,
          ticket_id: ticketJoylandId!,
          quantity: 1,
          expired_at: new Date(Date.now() + 2 * 60 * 60 * 1000),
          status: "WAITING_PAYMENT",
          using_point: 0,
          total: 150000,
        },
        {
          order_code: "DWP-WC-000001",
          customer_id: user,
          ticket_id: ticketJoylandId!,
          quantity: 2,
          expired_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          status: "WAITING_CONFIRMATION",
          using_point: 0,
          total: 300000,
        },
        {
          order_code: "DWP-P-000001",
          customer_id: user,
          ticket_id: ticketJoylandId!,
          quantity: 3,
          expired_at: new Date(Date.now()),
          status: "PAID",
          using_point: 0,
          total: 450000,
        },
        {
          order_code: "DWP-D-000001",
          customer_id: user,
          ticket_id: ticketJoylandId!,
          quantity: 1,
          expired_at: new Date(Date.now()),
          status: "DONE",
          using_point: 0,
          total: 150000,
        },
        {
          order_code: "DWP-R-000001",
          customer_id: user,
          ticket_id: ticketDwpId!,
          quantity: 4,
          expired_at: new Date(Date.now()),
          status: "REVIEWED",
          using_point: 0,
          total: 800000,
        },
        {
          order_code: "DWP-C-000001",
          customer_id: user,
          ticket_id: ticketDwpId!,
          quantity: 2,
          expired_at: new Date(Date.now()),
          status: "CANCELED",
          using_point: 0,
          total: 400000,
        },
        {
          order_code: "DWP-E-000001",
          customer_id: user,
          ticket_id: ticketDwpId!,
          quantity: 2,
          expired_at: new Date(Date.now()),
          status: "EXPIRED",
          using_point: 0,
          total: 400000,
        },
        {
          order_code: "DWP-RJ-000001",
          customer_id: user,
          ticket_id: ticketDwpId!,
          quantity: 3,
          expired_at: new Date(Date.now()),
          status: "REJECTED",
          using_point: 0,
          total: 600000,
        },
      ],
    });
    // =============================
    // VOUCHERS
    // =============================
    await prisma.voucher.create({
      data: {
        event_id: dwp,
        code: "DWP-2000",
        discount_amount: 20000,
        quota: 50,
        start_date: new Date("2025-02-06"),
        end_date: new Date("2025-04-30"),
      },
    });

    // =============================
    // COUPON
    // =============================
    await prisma.coupon.createMany({
      data: [
        {
          user_id: user,
          amount: 10000,
          expired_at: new Date("2026-06-01"),
          referrer_id: "9e8c2d44-5b71-4d6f-b2e9-cc3a8a7f21d4",
        },
        {
          user_id: user,
          amount: 20000,
          expired_at: new Date("2026-06-01"),
          referrer_id: "9e8c2d44-5b71-4d6f-b2e9-cc3a8a7f21d4",
        },
        {
          user_id: user,
          amount: 30000,
          expired_at: new Date("2026-06-01"),
          referrer_id: "9e8c2d44-5b71-4d6f-b2e9-cc3a8a7f21d4",
        },
      ],
    });

    // =============================
    // POINTS
    // =============================

    for (const user of users) {
      await prisma.point.createMany({
        data: [
          {
            user_id: user.id,
            amount: 696,
            expired_at: new Date("2026-06-01"),
          },
        ],
      });
    }

    // =============================
    // (REST: vouchers, orders, reviews — unchanged)
    // =============================

    console.info("✅ Seeding completed successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
