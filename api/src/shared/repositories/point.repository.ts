import {prisma} from "../lib/prisma.lib.js";

export const update = async (userId: string, amount: number)=>{
    await prisma.point.update({
        where: { user_id: userId },
        data: { amount: { decrement: amount } },
      });
}