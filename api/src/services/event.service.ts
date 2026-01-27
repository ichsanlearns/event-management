import { prisma } from "../lib/prisma.lib.js";

import { Category } from "../generated/prisma/enums.js";

export async function getAll() {
  return await prisma.event.findMany();
}

export async function getById(id: string) {
  return await prisma.event.findUnique({
    where: { id },
  });
}
