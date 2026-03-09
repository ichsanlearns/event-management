import { Prisma, PrismaClient } from "../../generated/prisma/client.js";

export type dB = Prisma.TransactionClient | PrismaClient;
