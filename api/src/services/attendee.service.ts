import { prisma } from "../lib/prisma.lib.js";
import { Status } from "../generated/prisma/enums.js";

export async function getAttendeesByEvent(eventId: string) {
  const orders = await prisma.order.findMany({
    where: {
      status: Status.DONE,
      Ticket: {
        event_id: eventId,
      },
    },
    select: {
      quantity: true,
      total: true,
      Customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return orders;
}
