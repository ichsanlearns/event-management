import { Prisma, PrismaClient } from "@/generated/prisma/client.js";

type DB = PrismaClient | Prisma.TransactionClient;

export const getById = async ({ db, userId }: { db: DB; userId: string }) => {
  return await db.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true },
  });
};
