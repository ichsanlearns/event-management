import { prisma } from "../lib/prisma.lib.js";

export async function getAll(query?: string) {
  if (query) {
    return await prisma.event.findMany({
      where: {
        OR: [
          { name: { startsWith: query, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { Tickets: true },
    });
  }

  return await prisma.event.findMany({
    include: { Tickets: true },
  });
}

export async function getById(id: string) {
  return await prisma.event.findUnique({
    where: { id },
    include: { Tickets: true },
  });
}
