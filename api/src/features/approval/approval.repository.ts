import { Status } from "../../generated/prisma/client.js";
import type { dB } from "../../shared/types/db.type.js";

export async function getOrdersByStatus({
  db,
  status,
}: {
  db: dB;
  status: Status;
}) {
  return db.order.findMany({
    where: { status },
    include: {
      Customer: true,
      Ticket: true,
    },
  });
}

export const getApprovalQueue = async ({
  db,
  organizerId,
}: {
  db: dB;
  organizerId: string;
}) => {
  return db.order.findMany({
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
};
