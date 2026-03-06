import {prisma} from "../lib/prisma.lib.js";

export const update = async (ticketId: string, quantity: number)=>{
    await prisma.ticket.update({
        where: { id: ticketId },
        data: { bought: { increment: quantity } },
      });
}