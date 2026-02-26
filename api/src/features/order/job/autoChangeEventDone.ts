import { prisma } from "../../../shared/lib/prisma.lib.js";

export async function autoChangeEventDone() {
  const now = new Date();
  const result = await prisma.order.updateMany({
    where: {
      Ticket: { EventName: { start_date: { lt: now } } },
      status: "PAID",
    },
    data: {
      status: "DONE",
    },
  });

  if (result.count > 0) {
    console.log(
      `Auto-changed event done, ${result.count} orders at ${now.toISOString()}`,
    );
  }
}
