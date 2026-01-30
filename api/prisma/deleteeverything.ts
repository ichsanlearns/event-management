import { prisma } from "../src/lib/prisma.lib.js";

async function deleteSeed() {
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

    console.log("✅ Seeding completed successfully");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

deleteSeed();
