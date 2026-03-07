import type { PrismaClient, Prisma } from "@/generated/prisma/client.js";

type DB = PrismaClient | Prisma.TransactionClient;

export const update = async ({
  db,
  userId,
  amount,
}: {
  db: DB;
  userId: string;
  amount: number;
}) => {
  await db.point.update({
    where: { user_id: userId },
    data: { amount: { increment: amount } },
  });
};
