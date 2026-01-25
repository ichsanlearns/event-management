import {prisma} from "../lib/prisma.lib.js";

import { Category } from "../generated/prisma/enums.js";

export async function getAll() {
    return await prisma.event.findMany({
        select: {
            name: true,
            price: true,
            description: true,
            category: true,
            city: true,
            available_seats: true,
            organizer_id: true,
            start_date: true,
            end_date: true,
        }
    })
}

export async function getById(id: string) {
    return await prisma.event.findUnique({
        where: { id },
        select: {
            name: true,
            price: true,
            description: true,
            category: true,
            city: true,
            available_seats: true,
            organizer_id: true,
            start_date: true,
            end_date: true,
        }
    })
}