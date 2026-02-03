import { prisma } from "../lib/prisma.lib.js";

export async function getById(code: string) {
  return prisma.voucher.findUnique({ where: { code } });
}
