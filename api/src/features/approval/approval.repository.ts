import {prisma } from "../../shared/lib/prisma.lib.js";
import { Status } from "../../generated/prisma/client.js";

export async function getOrdersByStatus(status: Status) {
    return prisma.order.findMany({
        where: { status },
        include: {
            Customer: true,
            Ticket: true,
        },
    });
}
